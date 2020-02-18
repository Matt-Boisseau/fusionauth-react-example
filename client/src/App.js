import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			apiResponse: ''
		};
	}

	componentDidMount() {
		console.log(document.cookie);
		fetch('http://localhost:9000/profile', {
			credentials: 'include'
		})
			.then(response => response.text())
			.then((test) => {
				console.log(test);
				this.setState({
					apiResponse: test
				});
			});
	}

	render() {
		return (
			<div className="App">
				<p>
					{ this.state.apiResponse }
				</p>
				<a href="http://localhost:9011/oauth2/authorize?client_id=5603c20d-3e32-4971-b7eb-8e9f023fc524&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Foauth-redirect">
					login
				</a>
			</div>
		);
	}
}

export default App;
