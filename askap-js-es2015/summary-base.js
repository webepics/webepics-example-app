import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import jQuery from 'jquery'

import SummaryTable from './SummaryTable'
import LabelWidget from './Label'

const SHELVES = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12'];

const PAF_SHELVES = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12',	
					 'd13', 'd14', 'd15', 'd16', 'd17', 'd18', 'd19', 'd20', 'd21', 'd22', 'd23', 'd24'];

const SUBSYSTEM_CONFIG = {
	'abf' : {fullname: 'Beamformer',
			defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json'},

	'trd' : {fullname: 'Timing Reference',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_TRDMonitorData.json'},

	'adx' : {fullname: 'Digital Receiver',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_DragonflyMonitorData.json'},
		
	'paf:fec' : {fullname: 'PAF FEC',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, ade_paf_FecEoInfo.json, ade_paf_PafCtrlInfo.json, ade_paf_PafPsuInfo.json, ade_paf_PafTecInfo.json'},

	'paf:paf' : {fullname: 'PAF PAF',
		defaultJsonFiles: 'ade_paf_PafCtrlInfo.json'},

	'acx:s01' : {fullname: 'Correlator s01',
			defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json'},
			
	'acx:s02' : {fullname: 'Correlator s02',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json'},

	'acx:s03' : {fullname: 'Correlator s03',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json'},
			
	'acx:s04' : {fullname: 'Correlator s04',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json'},
		
	'acx:s05' : {fullname: 'Correlator s05',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json'},
			
	'acx:s06' : {fullname: 'Correlator s06',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json'},
			
	'acx:s07' : {fullname: 'Correlator s07',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json'},
			
	'acx:s08' : {fullname: 'Correlator s08',
		defaultJsonFiles: 'bullant_CtrlMonitorData.json, bullant_RedbackMonitorData.json'}
			
}



/*
 * https://reacttraining.com/react-router/web/example/url-params
 */
const Alignment = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='alignment' 
    		shelves={SHELVES} 
    		pvfiles='bullant_bullant_redback_dragonfly.json' filter={[{field:'name', filter:'alignment'}]}
    		title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' Alignment Summary'} />);
}

const Bat = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='bat'
	    shelves={SHELVES} 
        pvfiles='bullant_BatFrame.json'        	 
        title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' BAT Summary'} />);
}

const FanSpeed = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='fanspeed'
    			shelves={SHELVES} 
		    pvfiles={SUBSYSTEM_CONFIG[match.params.subsystem].defaultJsonFiles} filter={[{field:'units', filter:'RPM'}, {field:'name', filter:'tacho'}]}
		    	title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' Fan Speed Summary RPM'} />);
}

const Temperature = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='temperature'
    			shelves={SHELVES} 
		    pvfiles={SUBSYSTEM_CONFIG[match.params.subsystem].defaultJsonFiles} filter={[{field:'units', filter:'C'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' Temperature Summary C'}
    />);
}

const Voltage = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='voltage'
    			shelves={SHELVES} 
		    pvfiles={SUBSYSTEM_CONFIG[match.params.subsystem].defaultJsonFiles} filter={[{field:'units', filter:'^V'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' Voltage Summary V'}
    />);
}

const Current = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='current'
    			shelves={SHELVES} 
		    pvfiles={SUBSYSTEM_CONFIG[match.params.subsystem].defaultJsonFiles} filter={[{field:'units', filter:'A'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' Current Summary C'}
    />);
}

const TXPower = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='txPower'
    			shelves={SHELVES} 
		    pvfiles={SUBSYSTEM_CONFIG[match.params.subsystem].defaultJsonFiles} filter={[{field:'name', filter:'txOptics.*power|txOptics.*bias:value'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' TX Power & Bias Summary'}
    />);
}

const RXPower = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='rxPower'
    			shelves={SHELVES} 
		    pvfiles={SUBSYSTEM_CONFIG[match.params.subsystem].defaultJsonFiles} filter={[{field:'name', filter:'rxOptics.*power'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' RX Power Summary'}
    />);
}

const LinkStatus10G = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='linkStatus10G'
    			shelves={SHELVES} 
		    pvfiles='bullant_bullant_redback_dragonfly.json' filter={[{field:'name', filter:'LinkStatus10G'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' 10G Links Comms Errors/Min Summary'}
    />);
}

const LinkStatusComms = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='linkStatusComms'
    			shelves={SHELVES} 
		    pvfiles='bullant_bullant_redback_dragonfly.json' filter={[{field:'name', filter:'LinkStatusComms'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' Bullant <-> FPGA Comms Error/Min Summary'}
    />);
}

const CommsErrors = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='commsErrors'
    			shelves={SHELVES} 
		    pvfiles='bullant_EthCommsInfo.json'
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' Eth Comms Summary'}
    />);
}

const SynthLocked = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='synthLocked'
    			shelves={SHELVES} 
		    pvfiles='bullant_DragonflyMonitorData.json' filter={[{field:'name', filter:'synthLocked'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' Synth Locked Summary'}
    />);
}

const RFPower = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='rfPower'
    			shelves={SHELVES} 
    			pvfiles={SUBSYSTEM_CONFIG[match.params.subsystem].defaultJsonFiles} filter={[{field:'units', filter:'dBm'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' RFoF Power Summary dBm'}
    />);
}

const PLLLocked = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='pllLocked'
    			shelves={SHELVES} 
		    pvfiles='bullant_TRDMonitorData.json' filter={[{field:'name', filter:'pllLocked'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' PLL Locked Summary'}
    />);
}

const BatOK = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='batOK'
    			shelves={SHELVES} 
		    pvfiles='bullant_TRDMonitorData.json' filter={[{field:'name', filter:'batOK'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' BAT IN Summary'}
    />);
}

const RefOK = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='refOK'
    			shelves={SHELVES} 
		    pvfiles='bullant_TRDMonitorData.json' filter={[{field:'name', filter:'refOK'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' REF IN Summary'}
    />);
}

const VOCLevel = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='vocLevel'
    			shelves={SHELVES} 
		    pvfiles='bullant_TRDMonitorData.json' filter={[{field:'name', filter:'vocLevel'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' VOC Output Summary'}
    />);
}

const BATPhotoDiode = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='batPhotoDiode'
    			shelves={SHELVES} 
		    pvfiles='bullant_TRDMonitorData.json' filter={[{field:'name', filter:'batPD'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' BAT Photodiode Summary'}
    />);
}

const REFPhotoDiode = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='refPhotoDiode'
    			shelves={SHELVES} 
		    pvfiles='bullant_TRDMonitorData.json' filter={[{field:'name', filter:'refPD'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' REF Photodiode Summary'}
    />);
}

const LRDPowerA = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='lrdPowerA'
    			shelves={SHELVES} 
		    pvfiles='bullant_TRDMonitorData.json' filter={[{field:'name', filter:'lrdPowerA'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' LRD Power A Summary'}
    />);
}

const LRDPowerB = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='lrdPowerB'
    			shelves={SHELVES} 
		    pvfiles='bullant_TRDMonitorData.json' filter={[{field:'name', filter:'lrdPowerB'}]}
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' LRD Power B Summary'}
    />);
}

const SerialNVersions = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='serialNVersions'
    			shelves={SHELVES} 
		    pvfiles='bullant_SNData.json'
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' Serial & Versions... Summary'}
    />);
}

const TRDInfo = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='trdInfo'
    			shelves={SHELVES} 
		    pvfiles='bullant_TRDMonitorData.json'
			title={SUBSYSTEM_CONFIG[match.params.subsystem].fullname + ' TRD Info... Summary'}
    />);
}

const PAFFECTemperature = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='temperature'
		    pvfiles={SUBSYSTEM_CONFIG['paf:fec'].defaultJsonFiles} filter={[{field:'units', filter:'C'}]}
			title={SUBSYSTEM_CONFIG['paf:fec'].fullname + ' Temperature Summary C'}
    />);
}

const PAFFECVoltage = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='voltage'
		    pvfiles={SUBSYSTEM_CONFIG['paf:fec'].defaultJsonFiles} filter={[{field:'units', filter:'^V'}]}
			title={SUBSYSTEM_CONFIG['paf:fec'].fullname + ' Voltage Summary V'}
    />);
}

const PAFFECCurrent = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='current'
		    pvfiles={SUBSYSTEM_CONFIG['paf:fec'].defaultJsonFiles} filter={[{field:'units', filter:'A'}]}
			title={SUBSYSTEM_CONFIG['paf:fec'].fullname + ' Current Summary A'}
    />);
}

const PAFFECFanSpeed = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='fanspeed'
		    pvfiles='bullant_CtrlMonitorData.json' filter={[{field:'units', filter:'RPM'}, {field:'name', filter:'tacho'}]}
			title={SUBSYSTEM_CONFIG['paf:fec'].fullname + ' Fan Speed Summary RPM'}
    />);
}

const PAFFECEo = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='eo'
		    pvfiles='ade_paf_FecEoInfo.json'
			title={SUBSYSTEM_CONFIG['paf:fec'].fullname + ' EO Summary'}
    />);
}

const PAFFECCicada = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='eo'
		    pvfiles='bullant_CicadaMonitorData.json'
			title={SUBSYSTEM_CONFIG['paf:fec'].fullname + ' Cicada Summary'}
    />);
}

const PAFFECEthComms = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='ethcomms'
		    pvfiles='bullant_EthCommsInfo.json'
			title={SUBSYSTEM_CONFIG['paf:fec'].fullname + ' Eth Comms Summary'}
    />);
}

const PAFController = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='controller'
    			pvfiles={SUBSYSTEM_CONFIG['paf:paf'].defaultJsonFiles}
			title={SUBSYSTEM_CONFIG['paf:paf'].fullname + ' Controller'}
    />);
}

const PAFControllerErrorCount = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='errorcount'
    			pvfiles={SUBSYSTEM_CONFIG['paf:paf'].defaultJsonFiles} filter={[{field:'name', filter:'errorCount'}]}
			title={SUBSYSTEM_CONFIG['paf:paf'].fullname + ' Controller Error Counts'}
    />);
}

const PAFPsu = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='pafpsu'
    			pvfiles={'ade_paf_PafPsuInfo.json'}
			title={'PAF PAF PSU Summary'}
    />);
}

const PAFTECController = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='teccontroller'
    			pvfiles={'ade_paf_PafTecInfo.json'}
			title={'PAF PAF TEC Controller Summary'}
    />);
}

const PSUTECControllerErrorCount = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem='paf' type='errorcount'
    			pvfiles={'ade_paf_PafPsuInfo.json, ade_paf_PafTecInfo.json'} filter={[{field:'name', filter:'errorCount'}]}
			title={'PAF PAF PSU and TEC Controller Error Counts Summary'}
    />);
}

export default class SwitchMenu extends React.Component {
	
	render() {
		return (<Switch>
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
		      <Route path="/:antenna/:subsystem/synthLocked" component={SynthLocked} />
		      <Route path="/:antenna/:subsystem/rfPower" component={RFPower} />
		      <Route path="/:antenna/:subsystem/batOK" component={BatOK} />
		      <Route path="/:antenna/:subsystem/refOK" component={RefOK} />
		      <Route path="/:antenna/:subsystem/voclevel" component={VOCLevel} />
		      <Route path="/:antenna/:subsystem/batPhotoDiode" component={BATPhotoDiode} />
		      <Route path="/:antenna/:subsystem/refPhotoDiode" component={REFPhotoDiode} />
		      <Route path="/:antenna/:subsystem/lrdPowerA" component={LRDPowerA} />
		      <Route path="/:antenna/:subsystem/lrdPowerB" component={LRDPowerB} />
		      <Route path="/:antenna/:subsystem/serialNVersions" component={SerialNVersions} />
		      <Route path="/:antenna/:subsystem/trdInfo" component={TRDInfo} />		      		
		      <Route path="/:antenna/:subsystem/fecTemperature" component={PAFFECTemperature} />		      		
		      <Route path="/:antenna/:subsystem/fecVoltage" component={PAFFECVoltage} />		      		
		      <Route path="/:antenna/:subsystem/fecCurrent" component={PAFFECCurrent} />		      		
		      <Route path="/:antenna/:subsystem/fecFanspeed" component={PAFFECFanSpeed} />		      		
		      <Route path="/:antenna/:subsystem/fecEo" component={PAFFECEo} />		      		
		      <Route path="/:antenna/:subsystem/fecCicada" component={PAFFECCicada} />		      		
		      <Route path="/:antenna/:subsystem/fecCommsErrors" component={PAFFECEthComms} />		      		
		      <Route path="/:antenna/:subsystem/pafController" component={PAFController} />		      		
		      <Route path="/:antenna/:subsystem/pafCommsErrors" component={PAFControllerErrorCount} />	
		      
		      <Route path="/:antenna/:subsystem/pafpsu" component={PAFPsu} />		      		
		      <Route path="/:antenna/:subsystem/paftec" component={PAFTECController} />		      		
		      <Route path="/:antenna/:subsystem/pafPsuTecErrors" component={PSUTECControllerErrorCount} />		      		
	      </Switch>);
	}
}