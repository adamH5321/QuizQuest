document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "How many millimetres are there in a centimetre?",
            answers: [
                { text: "5mm", correct: false },
                { text: "10mm", correct: true},
                { text: "100mm", correct: false },
                { text: "1,000mm", correct: false }
            ]
        },
        {
            question: "What is the hardest substance available on Earth?",
            answers: [
                { text: "Titanum", correct: false },
                { text: "Steel", correct: false },
                { text: "Carbon nitride", correct: false },
                { text: "Diamond", correct: true }
            ]
        },
        {
            question: "Who gave the universal law of gravitation?",
            answers: [
                { text: "Albert Einstein", correct: false},
                { text: "Isaac Newton", correct: true },
                { text: "Stephen Hawking", correct: false },
                { text: "Thomas Edison", correct: false }
            ]
        },
        {
            question: "How many teeth does the adult human have?",
            answers: [
                { text: "32", correct: true },
                { text: "34", correct: false },
                { text: "30", correct: false },
                { text: "36", correct: false }
            ]
        },
        {
            question: "How many bones are there in the human body?",
            answers: [
                { text: "197", correct: false },
                { text: "200", correct: false },
                { text: "206", correct: true },
                { text: "203", correct: false }
            ]
        },
        {
            question: "Which direction does the sun rise from?",
            answers: [
                { text: "North", correct: false },
                { text: "South", correct: false },
                { text: "East", correct: true },
                { text: "West", correct: false }
            ]
        },
        {
            question: " What percentage of the human body is made up of water?",
            answers: [
                { text: "65%", correct: false },
                { text: "60%", correct: true },
                { text: "55%", correct: false },
                { text: "45%", correct: false }
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
            question: "What is the chemical symbol for gold?",
            answers: [
                { text: "G", correct: false },
                { text: "Go", correct: false },
                { text: "Au", correct: true },
                { text: "Aul", correct: false }
            ]
        },
        {
            question: "What is a human's largest organ?",
            answers: [
                { text: "Liver", correct: false },
                { text: "Brain", correct: false },
                { text: "Skin", correct: true },
                { text: "Lungs", correct: false }
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
            window.location.href = 'general-hard.html';
        });
    }

    function updateTracker() {
        questionTracker.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    startGame();
});