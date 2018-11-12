class Subscriber {
    constructor() {
        this.isConnected = false;
        this.pvName = "";
        this.id = -1;
        this.callback = null;
    }
}

export default class WSManager {

    constructor() {
    	
	    var wsUri = "ws://" + window.location.host + "/CSS/ws/pv";	

	    this.channelIDIndex = 0;
	    this.subscriptionMap = new Map();

		let output = document.getElementById("output");

		this.websocket = new WebSocket(wsUri);
		let that = this;

		this.websocket.onopen = function(evt) {			
			console.log("Connected to Endpoint!");
		    that.isConnected = true;
		    that.handleConnected();
		};
		
		this.websocket.onmessage = function(evt) {
	        var json;
	        json = JSON.parse(evt.data);
	        that.dispatchMessage(json);
		};
		
		this.websocket.onerror = function(evt) {
			console.log('ERROR: ' + evt.data);
			that.handleConnection(false);
		};
		
		this.websocket.onclose = function(evt) {
			console.log('CLOSE: ' + evt.data);
            that.isConnected = false;
			that.handleConnection(false);
		};
		
	}

    handleConnected() {
    	this.handleConnection(true);
    	
        for (let [key, subscriber] of this.subscriptionMap) {
            subscriber.isConnected = this.isConnected;

            var message = JSON.stringify({
                  "message" : "subscribe",
                  "id" : subscriber.id,
                  "channel" : subscriber.name
              });

            this.websocket.send(message);
        }
    }

    handleConnection(isConnected) {
    	if (this.connectionHandler)
    		this.connectionHandler(isConnected);
    }
    
    setConnectionHandler(callback) {
    	this.connectionHandler = callback;
    	this.handleConnection(this.isConnected);
    }
    
    subscribe(pvname, callback) {
	    this.channelIDIndex++;
	
	    let subscriber = new Subscriber();
	    subscriber.name = pvname;
	    subscriber.callback = callback;
	    subscriber.id = this.channelIDIndex;
	
	    subscriber.isConnected = this.isConnected;
	
	    if (this.isConnected) {
	        var message = JSON.stringify({
	                  "message" : "subscribe",
	                  "id" : this.channelIDIndex,
	                  "channel" : pvname
	              });
	
	        this.websocket.send(message);
	    }
	    this.subscriptionMap.set(this.channelIDIndex, subscriber);
	    return this.channelIDIndex;
    }

    unsubscribe(id) {
	    this.subscriptionMap.delete(id);
	
	    var message = JSON.stringify({
                "message" : "unsubscribe",
                "id" : this.channelIDIndex,
            });
	    this.websocket.send(message);
	    this.websocket.close();
    }
    
    write(id, type, value) {
    	var valueObj = {
    	    "type": type,
    	    "value": value
    	}
    	
	    var message = JSON.stringify({
            "message" : "write",
            "id" : id,
            "value" : JSON.stringify(valueObj)
        });
	    this.websocket.send(message);
    	
    }

    dispatchMessage(messages) {

	    	if (!messages)
	    			return;
    		
		for (var i=0; i<messages.length; i++) {
			var message = messages[i];
		    if (message.id) {
		        let subscriber = this.subscriptionMap.get(message.id);
		        if (subscriber)
		            subscriber.callback(message);
		    }
		}
	}
}
