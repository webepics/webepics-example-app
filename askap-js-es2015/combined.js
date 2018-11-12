import {TextWidget, LEDButton} from './widgets'
import TableWidget from './TableWidget'
import React, {Component} from 'react';
import jQuery from 'jquery'

export default class Combined extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.pvs = [{name:':bul:fpga:temp', description:'tempurature', unit:'C'}, 
			{name:':bul:fpga:vccAux', description:'Aux Voltage', unit:'V'}, 
			{name:':bul:fpga:vccInt', description:'Int Voltage', unit:'V'}, 
			{name:':bul:fpga:status', description:'fpga status', unit:'C'}, 
			{name:':bul:atxInPower', description:'atx In power', unit:'W'},
			{name:':bul:atxOutPower', description:'atx Out power', unit:'W'}, 
			{name:':bul:atx12V:iout', description:'atx 12 v current out', unit:'amp'}, 
			{name:':bul:atx3V3:iout', description:'atx 3 v3 current out', unit:'amp'}, 
			{name:':bul:atx3V3:vout', description:'atx 3 v3 voltage out', unit:'V'}, 
			{name:':bul:atx5V:iout', description:'atx 5V current out', unit:'amp'}];
	}
	
	render() {
		return (
			<div>
			<div>
				<span className="icon-heart" id='connected-heart'></span>
				<span className="icon-heart-broken" id='broken-heart'></span>
			</div>
			<div>
				<div className='col-md-4'>
					<TextWidget label="My label:" pv={this.props.initial + ":" + this.props.subsystem + ":c01:bul:fpga:temp"} />
				</div>
				<div className='col-md-2 col-md-offset-6'>
					<LEDButton pv={this.props.initial + ":" + this.props.subsystem + ":F_startup:center_O"} />
				</div>
				<div className='col-md-12'>
					<TableWidget pvdescription={this.pvs} antenna={this.props.initial} subsystem={this.props.subsystem} />
				</div>										
			</div>
			</div>
		)
	}
}
