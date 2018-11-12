import React, {Component} from 'react';
import ListBaseWidget from './ListBaseWidget'
import ReactTable from "react-table";


export default class TableWidget extends ListBaseWidget {

	constructor(props) {
		super(props);
		this.virtualData = [];
		this.state = { data: this.virtualData, showPVName: false, showDisabled: false };

	}
	
	componentWillMount() {
		this.virtualData = [];
		var pvs = [];
		
		for (var i=0; i<this.props.pvdescription.length; i++) {
			var row = this.props.shelves;
			var rowData = {};
			var pvrow = {};

			rowData['description'] = this.props.pvdescription[i].description;
			rowData['index'] = this.props.pvdescription[i].index;
			rowData['unit'] = this.props.pvdescription[i].units;
			rowData['pvname'] = this.props.pvdescription[i].pvname.replace('$(p)', '').replace('$(card)', '');
				
			for (var r in row) {
				var pvName =  this.props.pvdescription[i].pvname.replace('$(p)', this.props.antenna + ":" + this.props.subsystem + ":")
				
				if (row[r] && row[r].trim()) {					
					pvName = pvName.replace('$(card)', row[r] + ":");				
				} else {
					pvName = pvName.replace('$(card)', '');						
				}
				rowData[row[r]] = {'value': 'N/A', 'state': 'disconnected', 'status': 'invalid'};
				pvrow[row[r]]  = pvName;
			}
			
			this.virtualData.push(rowData);		
			pvs.push(pvrow)
		}
		
		this.numUpdates = 0;
		this.setState({ data: this.virtualData, showPVName: false, showDisabled: false });
		this.connect(pvs);
		
		this.interval = setInterval(() => this.update(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	update() {
		this.setState({data: this.virtualData});		
	}

	processUpdate(message) {
		var indexes = this.subIdList.get(message.id);

		if (message.type=='error') {
			this.virtualData[indexes[0]][indexes[1]]['value'] = 'N/A';		
			this.virtualData[indexes[0]][indexes[1]]['state'] = 'disconnected';		
			this.virtualData[indexes[0]][indexes[1]]['status'] = 'invalid';		
			
			return;
		}
		if (message.type == 'connection') {
			if (message.connected)				
				this.virtualData[indexes[0]][indexes[1]]['state'] = 'connected';				
			else 
				this.virtualData[indexes[0]][indexes[1]]['state'] = 'disconnected';
		}
		
//		if (message.type == 'value') {
			var indexes = this.subIdList.get(message.id);
			
			var val = message.value.value;
			
			if (message.value.type == 'double' && message.value.value =='Infinity') {
				val = '∞';
			}
			
			if (!isNaN(val)) {
				if (val.toFixed)
					val = val.toFixed(2);
			}
				
			this.virtualData[indexes[0]][indexes[1]]['value'] = val;		
			this.virtualData[indexes[0]][indexes[1]]['state'] = message.value.alarm.severity;		
			this.virtualData[indexes[0]][indexes[1]]['status'] = message.value.alarm.severity;		
//		}
	}
	
	toggleDisplayPVName(event) {
		this.setState({showPVName: event.target.checked});
	}

	toggleShowDisabled(event) {
		this.setState({showDisabled: event.target.checked});
//		this.update();
	}

    row = row => (<label className={row.value.state}>
    					{ (!this.state.showDisabled && row.value.status.toUpperCase() == 'INVALID') ? '' : row.value.value }
    				</label>);
    
    filterMethod = (state, row, column) => {
    		if (this.state.showDisabled) {
    			return {
    				style : {
    					display: 'inline-flex'
    				}
    			};   			
    		}
    		    		
    		// if all shelves are disabled, do not display row
    		var showRow = false;
    		for (var property in row.row) {
    			if (row.row[property] && row.row[property].status) {
	    			if (row.row[property].status.toUpperCase() != 'INVALID') {
	    				showRow = true;
	    				break;
	    			}
    			}
    		}
    		
    		if (showRow)    		
			return {
				style : {
					display: 'inline-flex'
				}
			}; 
		else
			return {
			style : {
				display: 'none'
			}
		};
		
    };

	render() {
			
		var columns = [];
		
		columns.push({Header: "Description",	        		    		
				      accessor: "description",
				      minWidth: 100
					});

		columns.push({Header: "Item",
		      accessor: "index",
		      minWidth: 50
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
		
		var shelves = this.props.shelves;
		for (var s in shelves) {
			columns.push({
			  Header: shelves[s],	        		    		
  		      accessor: shelves[s],
  		      Cell: this.row,  		      
    		      minWidth: 50
  		    });
		}
		
        return (
            	<div>
            		<h1>{this.props.antenna} {this.props.title}</h1>
            		<input type='checkbox'
            			onChange={this.toggleDisplayPVName.bind(this)}
            		    defaultChecked={this.state.showPVName}
            		/>
            		<p>Show PV Names</p>

            		<input type='checkbox'
            			onChange={this.toggleShowDisabled.bind(this)}
            		    defaultChecked={this.state.showDisabled}
            		/>
            		<p>Show Disbled</p>
            		
            		<ReactTable
            			ref="reactTable"
            			data={this.state.data}
            		    columns={columns}
            			defaultPageSize= {this.virtualData.length}
            			showPagination= {false}
            		    className="-striped -highlight"
            		    	getTrProps={this.filterMethod}
            		/>
            	</div>
            );
	}	
}
