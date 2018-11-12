import React, {Component} from 'react';
import WSManager from './WSManager'

export default class BaseWidget extends React.Component {

	constructor() {
		super();
	}

	componentWillMount() {
		this.wsManager = new WSManager();
		this.subId = this.wsManager.subscribe(this.props.pv, (message)=>this.processUpdate(message));
	}

	componentWillUnmount() {
		this.wsManager.unsubscribe(this.subId);
	}
};

