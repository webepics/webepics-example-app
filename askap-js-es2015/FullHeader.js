import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import jQuery from 'jquery'

import LabelWidget from './Label'

export default class Header extends React.Component {
	
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
	      
	        <div className='alarm-menu'>
	          <h4>Online Critical Alarms</h4>
	          <ul>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/alignment"}>Alignment</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_alignment:alarm'}/>
	            </li>
	          </ul>

	          
	          <h4>Summary Alarms</h4>
	          <ul className='alarm-menu'>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/bat"}>Bat</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_batStatus:alarm'}/>
	            </li>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/fanspeed"}>Fanspeed</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_fans:alarm'}/>
	            </li>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/temperature"}>Temperature</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_temps:alarm'}/>
	            </li>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/voltage"}>Voltage</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_voltage:alarm'}/>
	            </li>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/current"}>Current</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_current:alarm'}/>
	            </li>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/txpower"}>TX Power & Bias</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_txPower:alarm'}/>
	            </li>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/txpower"}>RX Power</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_rxPower:alarm'}/>
	            </li>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/linkstatus10G"}>10G Links</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_linkStatus10G:alarm'}/>
	            </li>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/linkstatusComms"}>Bull FPGA</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_linkStatusComms:alarm'}/>
	            </li>
	            <li className='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/commsErrors"}>Eth Comms</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_commsErrors:alarm'}/>
	            </li>
	              
	          </ul>
	          	          
	        </div>
	      </div>
      )
	}
}