const userGuess = document.getElementById("user-guess");
const guessButton = document.getElementById("guess");
const newGame = document.getElementById("new-game");
const attempts = document.getElementById("attempts");
const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");
const developer = document.getElementById("developer");
let secretNumber;
const beginner = document.getElementById("beginner")
const normal = document.getElementById("normal")
const hard = document.getElementById("hard")
const nightmare = document.getElementById("nightmare")
const message3 = document.getElementById("message3")
let attemptCount = 0;
let minNum = 0;
let maxNum = 0;

guessButton.addEventListener("click", () => {
    if(minNum == 0 || maxNum == 0){
        return message2.textContent = "Please select a difficulty."
    }

    let guess = Number(userGuess.value);

    if(userGuess.value == ""){
        return message2.textContent = `Enter a number from ${minNum}-${maxNum}`
    }

    else if(guess < minNum || guess > maxNum){
        return message2.textContent = `Enter a valid number from ${minNum}-${maxNum}`
    }

    attemptCount++;
    attempts.textContent = `Attempts: ${attemptCount}`;
    const difference = Math.abs(guess - secretNumber);

    if(guess == secretNumber){
        message2.textContent = `🎯 You got it! Congratulations. The number was ${secretNumber}. it took you ${attemptCount} attempts.`
        newGame.style.display = "block";
        guessButton.disabled = true;
        userGuess.disabled = true;
    }

    else if(difference <= 5){
        if(guess < secretNumber){
            message2.textContent = "🔥 You are close! But still a bit low."

        }

        else if(guess > secretNumber){
            message2.textContent = "🔥 You are close! But still a bit high."
        }
    }

    else if(guess > secretNumber){
        message2.textContent = "⬆️ Too high! Try again.";
    }

    else if(guess < secretNumber){
        message2.textContent = "⬇️ Too low! Try again";
    }

});

beginner.addEventListener("click", () => {
    minNum = 1;
    maxNum = 100;
    message3.textContent = "Beginner selected. Select a number from 1-100."
    secretNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    attemptCount = 0;
    attempts.textContent = `Attempts: ${attemptCount}`
    userGuess.value = ""
    message2.textContent = "Make your guess!"
    newGame.style.display = "none"
    guessButton.disabled = false;
    userGuess.disabled = false;
})

normal.addEventListener("click", () => {
    minNum = 1;
    maxNum = 1000;
    message3.textContent = "Normal selected. Select a number from 1-1000."
    secretNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    attemptCount = 0;
    attempts.textContent = `Attempts: ${attemptCount}`
    userGuess.value = ""
    message2.textContent = "Make your guess!"
    newGame.style.display = "none"
    guessButton.disabled = false;
    userGuess.disabled = false;

})

hard.addEventListener("click", () => {
    minNum = 1;
    maxNum = 10000;
    message3.textContent = "Hard selected. Select a number from 1-10000."
    secretNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    attemptCount = 0;
    attempts.textContent = `Attempts: ${attemptCount}`
    userGuess.value = ""
    message2.textContent = "Make your guess!"
    newGame.style.display = "none"
    guessButton.disabled = false;
    userGuess.disabled = false;
})

nightmare.addEventListener("click", () => {
    minNum = 1;
    maxNum = 100000;
    message3.textContent = "Nightmare selected. Select a number from 1-100000."
    secretNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    attemptCount = 0;
    attempts.textContent = `Attempts: ${attemptCount}`
    userGuess.value = ""
    message2.textContent = "Make your guess!"
    newGame.style.display = "none"
    guessButton.disabled = false;
    userGuess.disabled = false;
})

newGame.addEventListener("click", () => {
    attemptCount = 0;
    attempts.textContent = `Attempts: ${attemptCount}`
    secretNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    userGuess.value = ""
    message2.textContent = "Make your guess!"
    newGame.style.display = "none"
    guessButton.disabled = false;
    userGuess.disabled = false; 
})

