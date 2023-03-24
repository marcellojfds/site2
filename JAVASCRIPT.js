const objects = ['maçã', 'banana', 'carro', 'gato', 'avião', 'barco', 'casa', 'sol', 'árvore', 'estrela'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let selectedCards = [];

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function createCard(number, object) {
	let card = document.createElement('div');
	card.className = 'card';
	card.dataset.number = number;
	card.addEventListener('click', function() {
		if (selectedCards.length < 2 && !card.classList.contains('selected')) {
			card.classList.add('selected');
			selectedCards.push(card);
		}
		if (selectedCards.length === 2) {
			let firstCard = selectedCards[0];
			let secondCard = selectedCards[1];
			if (firstCard.dataset.number === secondCard.dataset.number) {
				firstCard.classList.add('matched');
				secondCard.classList.add('matched');
				selectedCards = [];
			} else {
				setTimeout(function() {
					firstCard.classList.remove('selected');
					secondCard.classList.remove('selected');
					selectedCards = [];
				}, 1000);
			}
		}
	});
	let numberElement = document.createElement('div');
	numberElement.textContent = number;
	let objectElement = document.createElement('div');
	objectElement.textContent = object;
	card.appendChild(numberElement);
	card.appendChild(objectElement);
	return card;
}

function createCards() {
	let cardContainer = document.getElementById('card-container');
	let cardData = [];
	for (let i = 0; i < numbers.length; i++) {
		cardData.push({
			number: numbers[i],
			object: objects[i]
		});
	}
	cardData = shuffle(cardData);
	for (let i = 0; i < cardData.length; i++) {
		let card = createCard(cardData[i].number, cardData[i].object);
		cardContainer.appendChild(card);
	}
}

function checkGame() {
	let matchedCards = document.querySelectorAll('.card.matched');
	if (matchedCards.length === numbers.length * 2) {
		let result = document.getElementById('result');
		result.textContent = 'Parabéns, você ganhou!';
	}
}

document.addEventListener('DOMContentLoaded', function() {
	createCards();
	let checkButton = document.getElementById('check-button');
	checkButton.addEventListener('click', checkGame);
});
