document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Where was the first Olympics held?",
            answers: [
                { text: "Paris", correct: false },
                { text: "London", correct: false },
                { text: "Stockholm", correct: false },
                { text: "Greece", correct: true }
            ]
        },
        {
            question: "Where in the human body would you find the medulla oblongata?",
            answers: [
                { text: "Brain", correct: true },
                { text: "Abdomen", correct: true },
                { text: "Heart", correct: false },
                { text: "Liver", correct: false }
            ]
        },
        {
            question: "If you have cryophobia, what are you afraid of?",
            answers: [
                { text: "Fire/Heat", correct: false },
                { text: "Ice/Cold", correct: true },
                { text: "Crying", correct: false },
                { text: "Death", correct: false }
            ]
        },
        {
            question: "How many chambers are found in the human heart",
            answers: [
                { text: "4", correct: true },
                { text: "1", correct: false },
                { text: "3", correct: false },
                { text: "2", correct: false }
            ]
        },
        {
            question: "What is the rarest blood type?",
            answers: [
                { text: "A+", correct: false },
                { text: "AB+", correct: false },
                { text: "AB-", correct: true },
                { text: "O-", correct: false }
            ]
        },
        {
            question: "What is the spiciest chilli in the world?",
            answers: [
                { text: "Ghost Pepper", correct: false },
                { text: "Pepper X", correct: true },
                { text: "Trinidad Scorpion", correct: false },
                { text: "The Carolina Reaper", correct: false }
            ]
        },
        {
            question: "How long is an elephant pregnant before it gives birth?",
            answers: [
                { text: "9 months", correct: false },
                { text: "12 months", correct: false },
                { text: "16 months", correct: false },
                { text: "22 months", correct: true }
            ]
        },
        {
            question: "Which animal is known to spend 90% of its day, sleeping?",
            answers: [
                { text: "Sloth", correct: false },
                { text: "Brown Bat", correct: true },
                { text: "Koala", correct: true },
                { text: "Giant armadillo", correct: false }
            ]
        },
        {
            question: "Which animal has the strongest bite in the world?",
            answers: [
                { text: "Saltwater crocodile", correct: true },
                { text: "Great white shark", correct: false },
                { text: "Hippopotamus", correct: false },
                { text: "Gorilla", correct: false }
            ]
        },
        {
            question: "Which country gifted the Statue of Liberty to the U.S?",
            answers: [
                { text: "United Kingdom", correct: false },
                { text: "Russia", correct: false },
                { text: "France", correct: true },
                { text: "Germany", correct: false }
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
            
        `;
        document.getElementById('exit-btn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        document.getElementById('next-level-btn').addEventListener('click', () => {
            window.location.href = 'math-hard.html';
        });
    }

    function updateTracker() {
        questionTracker.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    startGame();
});