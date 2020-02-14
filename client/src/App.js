import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			apiResponse: ''
		};
	}

	componentDidMount() {
		fetch('http://localhost:9000/profile')
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
				<a href="http://localhost:9011/oauth2/authorize?client_id=ce8b4b31-f7f9-48d5-bbb1-5ced1720340f&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Foauth-redirect">
					login
				</a>
			</div>
		);
	}
}

export default App;
