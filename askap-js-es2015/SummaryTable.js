import {TextWidget, LEDButton} from './widgets'
import TableWidget from './TableWidget'
import React, {Component} from 'react';
import jQuery from 'jquery'

export default class SummaryTable extends React.Component {
	
	constructor(props) {
		super(props);
		
		// code here to work out number of colums from pv: <antenna>:<subsystem>:array:size
		this.shelves = props.shelves;
		
		if (!props.shelves) {
			this.shelves =[' '];
			
		} else if (props.shelves && props.shelves.length<24) {
			var pvurl = 'PVFetcher?pvname=' + props.antenna + ':' + props.subsystem + ":array:size";
			var that = this;
			
			$.ajax({
				  url: pvurl,
				  dataType: 'json',
				  async: false,
				  success: function(data) {
					  that.shelves = [];
					  
					  if (data.status=='ERROR') {
						  that.shelves = props.shelves;
					  } else {
						  var numColumns = data.value.value;
						  for (var i=0; i<numColumns; i++) {
							  that.shelves.push(props.shelves[i]);
						  }
					  }
				  }
			});
		}


		// code here to load pv and descriptions from file specified in this.props.type
		var jsonurl = 'DataFetcher?pvfiles=' + props.pvfiles;
		var that = this;
		$.ajax({
			  url: jsonurl,
			  dataType: 'json',
			  async: false,
			  success: function(data) {
				  that.pvs=[];
				  
				  // filter
				  var filters = props.filter;
				  for (var i=0; i<data.length; i++) {
					  var matched = true;
					  var pv = data[i];
					  if (!filters || filters.length<1) {
						  that.pvs.push(pv);
						  continue;
					  }
					  for (var j=0; j<filters.length; j++) {
						  var filter = filters[j];
						  var reg = new RegExp(filter.filter);
						  if (reg.test(pv[filter.field]))
							  matched = true;
						  else						  
							  matched = false;
					  }
					  if (matched)
						  that.pvs.push(pv);
				  }
			  }
		});
	}
	
	render() {
		return (
			<div className='summary-table'>
			    <TableWidget pvdescription={this.pvs} antenna={this.props.antenna} subsystem={this.props.subsystem} 
			    				type={this.props.type} shelves={this.shelves} title={this.props.title}/>
			</div>
		)
	}
}
