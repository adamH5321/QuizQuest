document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Which is the largest country in South America?",
            answers: [
                { text: "Brazil", correct: true },
                { text: "Argentina", correct: false },
                { text: "Peru", correct: false },
                { text: "Colombia", correct: false }
            ]
        },
        {
            question: "What is the longest river in the world?",
            answers: [
                { text: "Amazon River", correct: false },
                { text: "Nile River", correct: true },
                { text: "Yangtze River", correct: false },
                { text: "Mississippi", correct: false }
            ]
        },
        {
            question: "The Sahara Desert is located in which continent?",
            answers: [
                { text: "Africa", correct: true},
                { text: "Asia", correct: false },
                { text: "Australia", correct: false },
                { text: "North America", correct: false }
            ]
        },
        {
            question: "Which country is home to the world's largest freshwater lake, Lake Baikal?",
            answers: [
                { text: "Russia", correct: true },
                { text: "Canada", correct: false },
                { text: "United States Of America", correct: false },
                { text: "Mongolia", correct: false }
            ]
        },
        {
            question: "Which is the capital of Australia",
            answers: [
                { text: "Sydney", correct: false },
                { text: "Brisbane", correct: false },
                { text: "Melborne", correct: false },
                { text: "Canberra", correct: true }
            ]
        },
        {
            question: "What is the oficial language of Brazil?",
            answers: [
                { text: "Spanish", correct: false },
                { text: "Portuguese", correct: true },
                { text: "English", correct: false },
                { text: "Greek", correct: false }
            ]
        },
        {
            question: "The Panama Canal connects which two oceans?",
            answers: [
                { text: "Indian and Pacific", correct: false },
                { text: "Arctic and Pacific", correct: false },
                { text: "Atlantic and Pacific", correct: true },
                { text: "Arctic and Atlantic", correct: false }
            ]
        },
        {
            question: "Which country is known for its tulips?",
            answers: [
                { text: "Netherlands", correct: true },
                { text: "Germany", correct: false },
                { text: "France", correct: false },
                { text: "Belgium", correct: false },
            ]
        },
        {
            question: "How many countries are in the United Kingdom?",
            answers: [
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: true },
                { text: "5", correct: false }
            ]
        },
        {
            question: "What is the capital of Canada",
            answers: [
                { text: "Toronto", correct: false },
                { text: "Montreal", correct: false },
                { text: "Vancouver", correct: false },
                { text: "Ottowa", correct: true }
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
            window.location.href = 'geography-hard.html';
        });
    }

    function updateTracker() {
        questionTracker.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    startGame();
});