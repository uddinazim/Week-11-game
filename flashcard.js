var json = require("./cards");

var inquirer = require("inquirer");

var counter = 0; 

var winCount = 0;


function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}

function ClozeCard(text, cloze) {
	this.text = text;
	this.cloze = cloze; 
	this.partial = function() {
		var partialText = text.replace(cloze, "...");
		return partialText;
	}
}


function start() {
	if (counter < json.length) {
		var card = new ClozeCard(json[counter].text, json[counter].cloze);

		inquirer.prompt([
			{
				message: card.partial() + "\nAnswer:",
				name: "question",
				validate: function(value) {
					if (value.length > 0) {
						return true;
					}
					return false;
				}
			}
		]).then(function(answer) {
			if (answer.question.toLowerCase() === card.cloze.toLowerCase()) {
				console.log("\nCorrect!");
				console.log(card.text);
				console.log("----------------------------------------\n")
				winCount++;
			}
			else {
				console.log("\nIncorrect!")
				console.log(card.text);
				console.log("----------------------------------------\n")
			}
			counter++;
			start();
		})
	}
	else {
		console.log("Game Over!\nYour score is: " + winCount);

		inquirer.prompt([
			{
				type: "confirm",
				message: "Play again?",
				name: "confirm",
				default: true
			}
		]).then(function(answer) {
			if (answer.confirm) {
				counter = 0;
				winCount = 0;
				start();
			}
		})
	}	
}

start();