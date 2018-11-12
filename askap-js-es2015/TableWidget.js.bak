import React, {Component} from 'react';
import ListBaseWidget from './ListBaseWidget'
import ReactTable from "react-table";


export default class TableWidget extends ListBaseWidget {

	constructor(props) {
		super(props);
		
		this.virtualData = [];
		var pvs = [];
		
		for (var i=0; i<props.pvdescription.length; i++) {
			var row = props.rows;
			var rowData = {};
			var pvrow = {};

			rowData['description'] = props.pvdescription[i].description;
			rowData['unit'] = props.pvdescription[i].units;
			rowData['pvname'] = props.pvdescription[i].name;
				
			for (var r in row) {
				var pvName = props.antenna + ":" + props.subsystem + ":" + row[r] + ":" + props.pvdescription[i].name;
				rowData[row[r]] = {'value': 'N/A', 'state': 'disconnected'};
				pvrow[row[r]]  = pvName;
			}
			
			this.virtualData.push(rowData);		
			pvs.push(pvrow)
		}
		
		this.numUpdates = 0;
		this.state = { data: this.virtualData, showPVName: false };
		this.connect(pvs);
	}

	update() {
		this.setState({data: this.virtualData});		
	}
	
	processUpdate(message) {
		if (message.type == 'connection') {
			var indexes = this.subIdList.get(message.id);
			
			if (message.connected)				
				this.virtualData[indexes[0]][indexes[1]]['state'] = 'connected';				
			else 
				this.virtualData[indexes[0]][indexes[1]]['state'] = 'disconnected';
		}
		
		if (message.type == 'value') {
			var indexes = this.subIdList.get(message.id);
			
			var val = message.value.value;			
			if (!isNaN(val)) {
				if (val.toFixed)
					val = val.toFixed(2);
			}
				
			this.virtualData[indexes[0]][indexes[1]]['value'] = val;		
			this.virtualData[indexes[0]][indexes[1]]['state'] = message.value.alarm.severity;		
		}
	}
	
	toggleDisplayPVName(event) {
		this.setState({showPVName: event.target.checked});
	}
	
	render() {
		
		var columns = [];
		
		columns.push({Header: "Description",	        		    		
				      accessor: "description",
				      minWidth: 100
					});
		    	
		columns.push({Header: "Unit",
				      accessor: "unit",
				      minWidth: 50
				    });

		columns.push({Header: "PV Name",	        		    		
				      accessor: "pvname",
				      minWidth: 100,
				      show: this.state.showPVName
	    			});

		var rows = this.props.rows;
		for (var r in rows) {
			columns.push({Header: rows[r],	        		    		
  		      accessor: rows[r],
  		      Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
    		      minWidth: 50
  		    });
		}
	
        return (
        	<div>	
        		<input type='checkbox'
        			onChange={this.toggleDisplayPVName.bind(this)}
        		    defaultChecked={this.state.showPVName}
        		/>
        		<p>display PV names</p>
        		<ReactTable data={this.state.data}
        		    columns={columns}
        			defaultPageSize= {this.virtualData.length}
        			showPagination= {false}
        		    className="-striped -highlight"
        		/>
        	</div>
        );
	}
}