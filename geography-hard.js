document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What season does Australia experience in December?",
            answers: [
                { text: "Winter", correct: false },
                { text: "Summer", correct: true },
                { text: "Spring", correct: false },
                { text: "Fall", correct: false }
            ]
        },
        {
            question: "What is the name of the driest continent on Earth",
            answers: [
                { text: "Antartica", correct: true },
                { text: "Africa", correct: false },
                { text: "Australia", correct: false },
                { text: "South America", correct: false }
            ]
        },
        {
            question: "Mt. Fuji is the highest point located in which Asian country?",
            answers: [
                { text: "China", correct: false},
                { text: "South Korea", correct: false },
                { text: "North Korea", correct: false },
                { text: "Japan", correct: true }
            ]
        },
        {
            question: "What is the name of the largest island in the world?",
            answers: [
                { text: "Greenland", correct: true },
                { text: "Madagascar", correct: false },
                { text: "Great Britain", correct: false },
                { text: "New Guinea", correct: false }
            ]
        },
        {
            question: "Which country is home to the most active volcanos?",
            answers: [
                { text: "Japan", correct: false },
                { text: "Indonesia", correct: true },
                { text: "United States", correct: false },
                { text: "France", correct: false }
            ]
        },
        {
            question: "How many countries are there in Africa?",
            answers: [
                { text: "36", correct: false },
                { text: "48", correct: false },
                { text: "54", correct: true },
                { text: "61", correct: false }
            ]
        },
        {
            question: "Byblos is often noted as one of the world's most ancient cities. Where would you find it?",
            answers: [
                { text: "Egypt", correct: false },
                { text: "Jordan", correct: false },
                { text: "Lebanon", correct: true },
                { text: "Iran", correct: false }
            ]
        },
        {
            question: "what is the smallest country in the world?",
            answers: [
                { text: "Vatican City", correct: true },
                { text: "Monaco", correct: false },
                { text: "San Marino", correct: false },
                { text: "Maldives", correct: false },
            ]
        },
        {
            question: "Which country was NOT part of the Soviet Union?",
            answers: [
                { text: "Georgia", correct: false },
                { text: "Latvia", correct: false },
                { text: "Ukraine", correct: false },
                { text: "Romania", correct: true }
            ]
        },
        {
            question: "Which of these countries has the most lakes in the world?",
            answers: [
                { text: "China", correct: false },
                { text: "Finland", correct: false },
                { text: "Canada", correct: true },
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
            
        `;
        document.getElementById('exit-btn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        document.getElementById('next-level-btn').addEventListener('click', () => {
            window.location.href = 'math-normal.html';
        });
    }

    function updateTracker() {
        questionTracker.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    startGame();
});