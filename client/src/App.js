import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			apiResponse: ''
		};
	}

	componentDidMount() {
		fetch('http://localhost:9000/testAPI')
			.then(response => response.text())
			.then(test => this.setState({
				apiResponse: test
			}));
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						{ this.state.apiResponse }
					</p>
				</header>
			</div>
		);
	}
}

export default App;
