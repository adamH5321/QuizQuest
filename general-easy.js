document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What country has won the most FIFA World Cups?",
            answers: [
                { text: "Brazil", correct: true },
                { text: "Spain", correct: false },
                { text: "Germany", correct: false },
                { text: "Italy", correct: false }
            ]
        },
        {
            question: "How many letters are there in the English alphabet?",
            answers: [
                { text: "24", correct: false },
                { text: "25", correct: false },
                { text: "26", correct: true },
                { text: "27", correct: false }
            ]
        },
        {
            question: " Rainbow consist of how many colours?",
            answers: [
                { text: "4", correct: false},
                { text: "5", correct: false },
                { text: "6", correct: false },
                { text: "7", correct: true }
            ]
        },
        {
            question: "What is the largest mammal in the world?",
            answers: [
                { text: "Blue Whale", correct: true },
                { text: "African elephant", correct: false },
                { text: "Colossal Squid", correct: false },
                { text: "Giraffe", correct: false }
            ]
        },
        {
            question: "What is the largest planet of our Solar System?",
            answers: [
                { text: "Uranus", correct: false },
                { text: "Neptune", correct: false },
                { text: "Saturn", correct: false },
                { text: "Jupiter", correct: true }
            ]
        },
        {
            question: "How many years are there in one Millenium?",
            answers: [
                { text: "10", correct: false },
                { text: "100", correct: false },
                { text: "1,000", correct: true },
                { text: "10,000", correct: false }
            ]
        },
        {
            question: "What type of gas is absorbed by plants?",
            answers: [
                { text: "Oxygen", correct: false },
                { text: "Carbon Dioxide", correct: true },
                { text: "Helium", correct: false },
                { text: "Nitrogen", correct: false }
            ]
        },
        {
            question: "How many days a February month have in the leap year?",
            answers: [
                { text: "29", correct: true },
                { text: "28", correct: false },
                { text: "30", correct: false },
                { text: "27", correct: false },
            ]
        },
        {
            question: "Which bird lays the largest eggs?",
            answers: [
                { text: "Cassowary", correct: false },
                { text: "Trumpeter Swan", correct: false },
                { text: "Emu", correct: false },
                { text: "Ostrich", correct: true }
            ]
        },
        {
            question: "What is the national game of the U.S",
            answers: [
                { text: "Football", correct: false },
                { text: "Baseball", correct: true },
                { text: "Soccer", correct: false },
                { text: "Basketball", correct: false }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const questionTracker = document.getElementById('question-tracker');
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            showScore();
        }
    });

    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.classList.add('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
        updateTracker();
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        if (correct) {
            correctSound.play();
            selectedButton.classList.add('correct');
            score++;
        } else {
            wrongSound.play();
            selectedButton.classList.add('wrong');
            Array.from(answerButtonsElement.children).forEach(button => {
                if (button.dataset.correct === 'true') {
                    button.classList.add('correct');
                }
            });
        }
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
        });
        if (currentQuestionIndex < questions.length - 1) {
            nextButton.classList.remove('hide');
        } else {
            showScore();
        }
    }

    function showScore() {
        questionContainer.innerHTML = `
            <h2>Your Score is: ${score} out of ${questions.length}!</h2>
            <button id="exit-btn" class="btn">Exit</button>
            <button id="next-level-btn" class="btn">Next Level</button>
        `;
        document.getElementById('exit-btn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        document.getElementById('next-level-btn').addEventListener('click', () => {
            window.location.href = 'general-medium.html';
        });
    }

    function updateTracker() {
        questionTracker.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    startGame();
});