import React, {Component} from 'react';
import WSManager from './WSManager'

export default class ListBaseWidget extends React.Component {
	
	constructor() {
		super();
		
		this.subIdList = new Map();
	}

	connect(pv) {
		this.wsManager = new WSManager();
		// need to subscribe to multiple pvs
		for (var i=0; i<pv.length; i++) {
			for (var property in pv[i]) {
				var subId = this.wsManager.subscribe(pv[i][property], (message)=>this.processUpdate(message));
				this.subIdList.set(subId, [i, property]);
			}
		}		
	}

	componentWillUnmount() {
		// need to unsubscribe to multiple pvs
		for (var subId of this.subIdList.keys())
				this.wsManager.unsubscribe(subId);
		
		this.subIdList.clear();
	}
	
};

