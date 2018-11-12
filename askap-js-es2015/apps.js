import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import jQuery from 'jquery'

import Combined from './combined'

class Header extends React.Component {
	
	constructor() {
		super();
	}
	
	render() {
	    return (
	      <div>
	        <div className="top-menu">
	          <ul>
	            <li>
	              <Link to="/welcome">Main</Link>
	            </li>
	            <li>
	              <Link to="/shelf1">Shelf 1</Link>
	            </li>
	            <li>
	              <Link to="/shelf2">Shelf 2</Link>
	            </li>
	          </ul>
	        </div>
	      </div>
      )
	}
}

const Main = () => {
	return (<div><span>Hello world!</span></div>)
}

const Shelf1 = () => {
  return (<Combined initial='xwu90' subsystem='adx' shelf='c01'/>)
}

const Shelf2 = () => {
	  return (<Combined initial='xwu90' subsystem='adx' shelf='c02'/>)
}

const app = (
		<Router>
		  <div>
			<Header />
		    <Switch>
		      <Route exact path="/" component={Main} />
		      <Route path="/welcome" component={Main} />
		      <Route path="/shelf1" component={Shelf1} />
		      <Route path="/shelf2" component={Shelf2} />
		   </Switch>   		
		  </div>
		</Router>
)

jQuery(function() {
	  ReactDOM.render(
		  app,
		  document.getElementById('test')
	  );
})

