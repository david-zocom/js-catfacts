// CORS = Cross-Origin Resource Sharing
// Because of security, when we try to send a JavaScript AJAX request, the server must support CORS. Not all open APIs do this. We cannot control this, it falls on the programmer who made the API.
// A solution is to use another API as a "proxy". cors-anywhere makes a "backend ajax request". Therefore it is able to ignore CORS settings. Then it returns the result with the correct CORS settings to us.
// Another solution is to use another API, that supports CORS.
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://cat-fact.herokuapp.com/facts/random?';


window.addEventListener('load', () => {
	console.log('Window load');
	let getFactsButton = document.querySelector('#getFacts');
	getFactsButton.addEventListener('click', event => {
		// Disable the button to prevent the user from sending multiple requests if they double-click the button. (yes, many users do this!)
		getFactsButton.disabled = 'disabled';

		// Let the user select the animal
		let input = document.querySelector('#animalTypeInput');
		sendRequest(getFactsButton, input.value, 4);
		// TODO: let the user select the amount as well, don't use a MAGIC NUMBER
	})
});  // window load ends here


// Move code to functions. Now the window load function is shorter and easier to read. We can also make repeated requests easier.
function sendRequest(button, animalType = 'cat', amount = 2) {
	// Build the request URL
	let url = `${proxyUrl}${apiUrl}animal_type=${animalType}&amount=${amount}`;
	console.log('Clicked button - get facts');

	fetch(url)  // Send request
	.then(response => {
		// console.log('Got response from API', response);
		return response.json();
	})
	.then(data => {
		// The data objects contain: { type, text }
		let factsDiv = document.querySelector('.facts');
		factsDiv.innerHTML = '';  // clear the container
		data.forEach(fact => {
			// For each object in the array we got from the server, create an element and add it to the facts container
			let factElement = document.createElement('div');
			factElement.className = 'fact';
			factElement.innerText = fact.text;
			factsDiv.appendChild(factElement);
		})
		console.log('All facts added to web page');
		button.disabled = '';  // enable button
	})
	console.log('End of sendRequest function');
	// Important! The function ends BEFORE the request from the server arrives. That's why we enable the button inside the function instead of here. (Unless you use async/await)
}
