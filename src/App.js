import React, { Component } from 'react'
import './App.css'
// importing axios to make use of it. remember, since we installed axios with `npm i axios` it looks to our package.json file to see if it can find any package called `axios`
import axios from 'axios'

class App extends Component {
	//setting up a little state. here we have an empty array to hold all of our jokes.
	// if we wanted to just store a single joke on state we could have something like this
	// this.state = {
	// 	joke: null
	// }
	constructor() {
		super()
		this.state = {
			jokes: []
		}
	}
	// Here we are making use of the built in (by React) componentDidMount method. This method will fire any time a component mounts, or loads, onto the DOM
	// componentDidMount() {
	// 	axios.get('https://icanhazdadjoke.com', {
	// 			headers: {
	// 				Accept: 'text/plain'
	// 			}
	// 		})
	// 		.then((response) => {
	// 			this.setState({ joke: response.data })
	// 		})
	// 		.catch((error) => {
	// 			console.log(error)
	// 		})
	// }

	// Custom method that sends a get request to the provided api URL. This is hooked up to a button below. Whenver we click the button, it fires this method
	handleGetDadJoke() {
		// making a get request at the provided URL
		axios.get('https://icanhazdadjoke.com', {
			// setting some headers. this is not always necessary but is for this specific API. Remember, no one controls the internet. That means API's can be set up in a variety of ways and they may not be consistent at all
				headers: {
					Accept: 'text/plain'
				}
			})
			// once we receive a response from the API, we can run this `.then()`. It takes a response object which we can use dot notation to find data on
			.then((response) => {
				// creating a copy of the jokes array so we can push a new joke onto it each time
				const jokes = this.state.jokes.slice()
				jokes.push(response.data)
				// setting state with our newly modified jokes array
				this.setState({ jokes: jokes })
			})
			// `.catch()` is not required but a good practice as it will catch errors for you
			.catch((error) => {
				console.log(error)
			})
	}

	render() {
		// mapping over our jokes array on state. Remember, we use `joke` as a placeholder for each item of the array and `index` for our key since it is unique
		const displayJokes = this.state.jokes.map((joke, index) => (
			<h1 key={index}>{joke}</h1>
		))
		return (
			<div className='App'>
			{/* button that will fire our custom method above */}
				<button onClick={() => this.handleGetDadJoke()}>Get Dad Joke</button>
				{/* displaying our actual jokes that we mapped over above */}
				{displayJokes}
			</div>
		)
	}
}

export default App
