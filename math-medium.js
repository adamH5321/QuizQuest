document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What is the square root of 81?",
            answers: [
                { text: "7", correct: false },
                { text: "8", correct: false },
                { text: "9", correct: true },
                { text: "10", correct: false }
            ]
        },
        {
            question: "If a car travels at 60 miles per hour, how far will it travel in 3 hours?",
            answers: [
                { text: "120 miles", correct: false },
                { text: "140 miles", correct: false },
                { text: "160 miles", correct: false },
                { text: "180 miles", correct: true }
            ]
        },
        {
            question: "What is 15% of 200?",
            answers: [
                { text: "20", correct: false },
                { text: "25", correct: false },
                { text: "30", correct: true },
                { text: "35", correct: false }
            ]
        },
        {
            question: "Solve for x: 2x + 5 = 13",
            answers: [
                { text: "3", correct: false },
                { text: "4", correct: true },
                { text: "5", correct: false },
                { text: "6", correct: false }
            ]
        },
        {
            question: "What is the area of a triangle with base 8 units and height 5 units?",
            answers: [
                { text: "20 square units", correct: true },
                { text: "24 square units", correct: false },
                { text: "30 square units", correct: false },
                { text: "40 square units", correct: false }
            ]
        },
        {
            question: "What is the next prime number after 7?",
            answers: [
                { text: "8", correct: false },
                { text: "9", correct: false },
                { text: "10", correct: false },
                { text: "11", correct: true }
            ]
        },
        {
            question: "How many sides does a heptagon have?",
            answers: [
                { text: "5", correct: false },
                { text: "6", correct: false },
                { text: "7", correct: true },
                { text: "8", correct: false }
            ]
        },
        {
            question: "What is the value of π (pi) to two decimal places?",
            answers: [
                { text: "3.12", correct: false },
                { text: "3.14", correct: true },
                { text: "3.16", correct: false },
                { text: "3.18", correct: false }
            ]
        },
        {
            question: "If a triangle has angles of 90°, 30°, and x°, what is the value of x?",
            answers: [
                { text: "30°", correct: false },
                { text: "45°", correct: false },
                { text: "60°", correct: true },
                { text: "90°", correct: false }
            ]
        },
        {
            question: "If you buy two dozen doughnuts and 1/3 of them are glazed, how many doughnuts are glazed?",
            answers: [
                { text: "8", correct: true },
                { text: "4", correct: false },
                { text: "12", correct: false },
                { text: "6", correct: false }
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
            window.location.href = 'math-hard.html';
        });
    }

    function updateTracker() {
        questionTracker.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    startGame();
});