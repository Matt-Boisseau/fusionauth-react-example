import React, { Component } from 'react';

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
				<p>
					{ this.state.apiResponse }
				</p>
				<a href="http://localhost:9011/oauth2/authorize?client_id=656c1aaf-bf79-4538-bc36-854aace7de58&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Foauth-redirect">
					login
				</a>
			</div>
		);
	}
}

export default App;
