import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import jQuery from 'jquery'

import SummaryTable from './SummaryTable'
import WSManager from './WSManager'
import LabelWidget from './Label'
import SwitchMenu from './summary-base'

class Header extends React.Component {
	
	constructor() {
		super();
		this.state = {connectedHeart: 'icon-heart hideHeart',
				brokenHeart: 'icon-heart-broken showHeart'};
	}

	componentDidMount() {
		this.wsManager = new WSManager();
		this.wsManager.setConnectionHandler((isConnected)=>this.processWebsocketConnection(isConnected));		
	}
	
	processWebsocketConnection(isConnected) {
		if (isConnected) {
			this.setState({
				connectedHeart: 'icon-heart showHeart',
					brokenHeart: 'icon-heart-broken hideHeart'				
			})
		} else {
			this.setState({
				connectedHeart: 'icon-heart hideHeart',
					brokenHeart: 'icon-heart-broken showHeart'				
			})			
		}
	}
	
	render() {
		
	    var location = window.location.href.split('/');
	    var antenna = location[5];
	    var subsystem = location[6];

	    return (
	      <div className="summary-menu">
			<div>
				<span className={this.state.connectedHeart}></span>
				<span className={this.state.brokenHeart} ></span>
			</div>
	      </div>
      )
	}
}

const app = (
		<Router>
		  <div>
			<Header/>
			<SwitchMenu/>
		  </div>
		</Router>
)

jQuery(function() {
	  ReactDOM.render(
		  app,
		  document.getElementById('AlarmSummary')
	  );
})

