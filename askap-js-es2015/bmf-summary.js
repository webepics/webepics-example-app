import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import jQuery from 'jquery'

import SummaryTable from './SummaryTable'
import WSManager from './WSManager'
import LabelWidget from './Label'

const SHELVES = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12'];

const SUBSYSTEM_FULLNAMES = {	
	'abf' : 'Beamformer',
	'acx:s01' : 'Correlator s01',
	'acx:s02' : 'Correlator s02',
	'acx:s03' : 'Correlator s03',
	'acx:s04' : 'Correlator s04',
	'acx:s05' : 'Correlator s05',
	'acx:s06' : 'Correlator s06',
	'acx:s07' : 'Correlator s07',
	'acx:s08' : 'Correlator s08'
};

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

/*
 * https://reacttraining.com/react-router/web/example/url-params
 */
const Alignment = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='alignment' 
    	shelves={SHELVES} 
    		 pvfiles='bullant_bullant_redback_dragonfly.json' filter={[{field:'name', filter:'alignment'}]}
    		 title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' Alignment Summary'} />);
}

const Bat = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='bat'
	     shelves={SHELVES} 
         pvfiles='bullant_BatFrame.json'        	 
        	 title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' BAT Summary'} />);
}

const FanSpeed = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='fanspeed'
    			shelves={SHELVES} 
		    pvfiles='bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json' filter={[{field:'units', filter:'RPM'}, {field:'name', filter:'tacho'}]}
		    	title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' Fan Speed Summary RPM'} />);
}

const Temperature = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='temperature'
    			shelves={SHELVES} 
		    pvfiles='bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json' filter={[{field:'units', filter:'C'}]}
			title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' Temperature Summary C'}
    />);
}

const Voltage = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='voltage'
    			shelves={SHELVES} 
		    pvfiles='bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json' filter={[{field:'units', filter:'V'}]}
			title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' Voltage Summary V'}
    />);
}

const Current = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='current'
    			shelves={SHELVES} 
		    pvfiles='bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json' filter={[{field:'units', filter:'A'}]}
			title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' Current Summary C'}
    />);
}

const TXPower = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='txPower'
    			shelves={SHELVES} 
		    pvfiles='bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json' filter={[{field:'name', filter:'txOptics.*power|txOptics.*bias:value'}]}
			title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' TX Power & Bias Summary'}
    />);
}

const RXPower = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='rxPower'
    			shelves={SHELVES} 
		    pvfiles='bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json' filter={[{field:'name', filter:'rxOptics.*power'}]}
			title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' RX Power Summary'}
    />);
}

const LinkStatus10G = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='linkStatus10G'
    			shelves={SHELVES} 
		    pvfiles='bullant_bullant_redback_dragonfly.json' filter={[{field:'name', filter:'LinkStatus10G'}]}
			title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' 10G Links Comms Errors/Min Summary'}
    />);
}

const LinkStatusComms = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='linkStatusComms'
    			shelves={SHELVES} 
		    pvfiles='bullant_bullant_redback_dragonfly.json' filter={[{field:'name', filter:'LinkStatusComms'}]}
			title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' Bullant <-> FPGA Comms Error/Min Summary'}
    />);
}

const CommsErrors = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='commsErrors'
    			shelves={SHELVES} 
		    pvfiles='bullant_EthCommsInfo.json'
			title={SUBSYSTEM_FULLNAMES[match.params.subsystem] + ' Eth Comms Summary'}
    />);
}

const app = (
		<Router>
		  <div>
			<Header/>
		    <Switch>
		      <Route path="/:antenna/:subsystem/alignment" component={Alignment} />
		      <Route path="/:antenna/:subsystem/bat" component={Bat} />
		      <Route path="/:antenna/:subsystem/fanspeed" component={FanSpeed} />
		      <Route path="/:antenna/:subsystem/temperature" component={Temperature} />
		      <Route path="/:antenna/:subsystem/voltage" component={Voltage} />
		      <Route path="/:antenna/:subsystem/current" component={Current} />
		      <Route path="/:antenna/:subsystem/txpower" component={TXPower} />
		      <Route path="/:antenna/:subsystem/rxpower" component={RXPower} />
		      <Route path="/:antenna/:subsystem/linkstatus10G" component={LinkStatus10G} />
		      <Route path="/:antenna/:subsystem/linkstatusComms" component={LinkStatusComms} />
		      <Route path="/:antenna/:subsystem/commsErrors" component={CommsErrors} />
		   </Switch>   		
		  </div>
		</Router>
)

jQuery(function() {
	  ReactDOM.render(
		  app,
		  document.getElementById('AlarmSummary')
	  );
})

