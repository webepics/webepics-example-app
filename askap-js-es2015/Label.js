import BaseWidget from './BaseWidget'
import React, {Component} from 'react';

// https://www.npmjs.com/package/react-toggle-switch
import Switch from 'react-toggle-switch'

export default class LabelWidget extends BaseWidget {

	constructor() {
		super();
		this.state = {currentValue: "N/A", state: 'disconnected'};
	}

	processUpdate(message) {
		
		var connectStr = 'disconnected';
		if (message.type == 'connection') {
			if (message.connected) {
				this.setState({state: "connected"});
				connectStr = "connected";
			} else
				this.setState({state: "disconnected"});
				
			this.setState({tooltip: this.props.pv + "\n" + "connection: " + connectStr});
			return;
		}
		
		if (message.type == 'value')
			this.setState(
				{currentValue: message.value.value,
				 state: message.value.alarm.severity
				});
	}

	render() {
	    return (
		    <div>
		      <label title={this.state.tooltip} className={'alarm-label ' + this.state.state}>{this.state.currentValue}</label>
		  	</div>
	    );
	}
}