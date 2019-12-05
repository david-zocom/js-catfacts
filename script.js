// We need to use another API beecause of CORS settings
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://cat-fact.herokuapp.com/facts/random?';
//animal_type=cat&amount=2

window.addEventListener('load', () => {
	console.log('Window load');
	let getFactsButton = document.querySelector('#getFacts');
	getFactsButton.addEventListener('click', event => {
		getFactsButton.disabled = 'disabled';
		let input = document.querySelector('#animalTypeInput');
		sendRequest(getFactsButton, input.value, 4);
	})
});

function sendRequest(button, animalType = 'cat', amount = 2) {
	let url = `${proxyUrl}${apiUrl}animal_type=${animalType}&amount=${amount}`;
	console.log('Clicked button - get facts');
	fetch(url)
	.then(response => {
		// console.log('Got response from API', response);
		return response.json();
	})
	.then(data => {
		// console.log('Got data: ', data);
		// data: { type, text }
		let factsDiv = document.querySelector('.facts');
		factsDiv.innerHTML = '';
		data.forEach(fact => {
			let factElement = document.createElement('div');
			factElement.innerText = fact.text;
			factsDiv.appendChild(factElement);
		})
		console.log('All facts added to web page');
		button.disabled = '';  // enable button
	})
	console.log('End of sendRequest function');
}







//
