document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What is the largest continent in the world?",
            answers: [
                { text: "Africa", correct: false },
                { text: "Asia", correct: true },
                { text: "Europe", correct: false },
                { text: "South America", correct: false }
            ]
        },
        {
            question: "What is the hottest continent on Earth?",
            answers: [
                { text: "Africa", correct: true },
                { text: "Asia", correct: false },
                { text: "Australia", correct: false },
                { text: "Eurupe", correct: false }
            ]
        },
        {
            question: "What is the largest ocean on earth?",
            answers: [
                { text: "Atlantic Ocean", correct: false},
                { text: "Arctic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Pacific Ocean", correct: true }
            ]
        },
        {
            question: "Which animal is often considered a symbol of Australia?",
            answers: [
                { text: "Kangaroo", correct: true },
                { text: "Eagle", correct: false },
                { text: "Lion", correct: false },
                { text: "Zebra", correct: false }
            ]
        },
        {
            question: "What is the highest mountain on earth?",
            answers: [
                { text: "Mount Kilimanjaro", correct: false },
                { text: "Mount Everest", correct: true },
                { text: "Mount McKinley", correct: false },
                { text: "Mount Fuji", correct: false }
            ]
        },
        {
            question: "Which is the smallest continent in the world?",
            answers: [
                { text: "Europe", correct: false },
                { text: "Antartica", correct: false },
                { text: "Australia", correct: true },
                { text: "South America", correct: false }
            ]
        },
        {
            question: "What is the capital of the United States?",
            answers: [
                { text: "California", correct: false },
                { text: "Texas", correct: false },
                { text: "Washington D.C", correct: true },
                { text: "Chicago", correct: false }
            ]
        },
        {
            question: "The Amazon Rainforestt is primarly located in which country?",
            answers: [
                { text: "Brazil", correct: true },
                { text: "Colombia", correct: false },
                { text: "Peru", correct: false },
                { text: "Vanezuela", correct: false },
            ]
        },
        {
            question: "Which country is home to the Taj Mahal?",
            answers: [
                { text: "Pakistan", correct: false },
                { text: "Bangladesh", correct: false },
                { text: "Napal", correct: false },
                { text: "India", correct: true }
            ]
        },
        {
            question: "What is the largest country by land area?",
            answers: [
                { text: "Canada", correct: false },
                { text: "Russia", correct: true },
                { text: "China", correct: false },
                { text: "United States", correct: false }
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
            window.location.href = 'geography-medium.html';
        });
    }

    function updateTracker() {
        questionTracker.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    startGame();
});