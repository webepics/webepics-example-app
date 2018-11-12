import BaseWidget from './BaseWidget'
import React, {Component} from 'react';

// https://www.npmjs.com/package/react-toggle-switch
import Switch from 'react-toggle-switch'

export class LED extends BaseWidget {

	constructor() {
		super();
		this.state = {currentValue: "led-yellow"};
	}

	processUpdate(message) {
		if (message.type == 'connection') {
			if (message.connected)
				this.setState({currentValue: "led-blue"});
			
			return;
		}
		
		if (message.type == 'value') {			
			if (message.value.value == 0)
				this.setState({currentValue: "led-red"});
			else if (message.value.value == 1)
				this.setState({currentValue: "led-green"});
			else
				this.setState({currentValue: "led-blue"});
		}
	}

	render() {
        return (
			<div className={this.state.currentValue}></div>
        );
	}
}

export class LEDButton extends BaseWidget {

	constructor() {
		super();
		this.state = {connected: false,
					  currentValue: false};
	}

	processUpdate(message) {
		if (message.type == 'connection') {
			if (message.connected) {
				this.setState({connected: true});
			}
			
			this.forceUpdate()
			return;
		}
		
		if (message.type == 'value') {			
			if (message.value.value == 0)
				this.setState({currentValue: false});
			else if (message.value.value == 1)
				this.setState({currentValue: true});
			else
				this.setState({currentValue: false});
			
		}
	}
	
	toggleSwitch = (e) => {
		var newValue = 0;		
		// if currentValue=true => newvalue=false which is 0
		// else currentValue=false => newvalue=true which is 1
		if (!this.state.currentValue)
			newValue = 1;
		
		wsManager.write(this.subId, 'int', newValue);
	}
	
	render() {
        return (
        		<Switch onClick={this.toggleSwitch} on={this.state.currentValue} enabled={this.state.connected}/>
        );
	}
}

export class TextWidget extends BaseWidget {

	constructor() {
		super();
		this.state = {currentValue: ""};
	}

	processUpdate(message) {
		if (message.type == 'value')
			this.setState({currentValue: message.value.value});

	}

	render() {
	    return (
		    <div>
		      <label className='col-md-6'>{this.props.label}</label>
		      <input type="text" className='col-md-6' value={this.state.currentValue}/>
		  	</div>
	    );
	}
}