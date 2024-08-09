document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Sarah has 3 boxes of crayons. Each box has 12 crayons. How many crayons does Sarah have in total?",
            answers: [
                { text: "24 crayons", correct: false },
                { text: "36 crayons", correct: true },
                { text: "48 crayons", correct: false },
                { text: "60 crayons", correct: false }
            ]
        },
        {
            question: "The bakery delivered 8 cupcakes to each of 5 parties. How many cupcakes did they deliver in total?",
            answers: [
                { text: "13 cupcakes", correct: false },
                { text: "20 cupcakes", correct: false },
                { text: "40 cupcakes", correct: true },
                { text: "48 cupcakes", correct: false }
            ]
        },
        {
            question: "Michael is reading a 100-page book. He has already read 27 pages. How many pages does he have left to read?",
            answers: [
                { text: "73 pages", correct: true },
                { text: "63 pages", correct: false },
                { text: "53 pages", correct: false },
                { text: "43 pages", correct: false }
            ]
        },
        {
            question: "There are 4 birds on a fence. If 2 more birds fly in, how many birds will be on the fence in total?",
            answers: [
                { text: "2 birds", correct: false },
                { text: "4 birds", correct: false },
                { text: "5 birds", correct: false },
                { text: "6 birds", correct: true }
            ]
        },
        {
            question: "David has 48 marbles. He wants to share them equally with 4 friends. How many marbles will each friend get?",
            answers: [
                { text: "16 marbles", correct: false },
                { text: "12 marbles", correct: true },
                { text: "10 marbles", correct: false },
                { text: "8 marbles", correct: false }
            ]
        },
        {
            question: "A rectangular garden is 7 meters long and 5 meters wide. What is the perimeter of the garden ?",
            answers: [
                { text: "12 meters", correct: false },
                { text: "24 meters", correct: true },
                { text: "35 meters", correct: false },
                { text: "60 meters", correct: false }
            ]
        },
        {
            question: "What is the following addition problem written in numerals: twenty-three + twelve",
            answers: [
                { text: "23 + 12", correct: true },
                { text: "12 + 35", correct: false },
                
                { text: "32 + 21", correct: false },
                { text: "55 + 13", correct: false }
            ]
        },
        {
            question: "Which fraction is equivalent to 1/2 (cutting a whole pizza into 2 slices and taking 1 slice)?",
            answers: [
                { text: "1/3", correct: false },
                
                { text: "3/6", correct: false },
                { text: "4/8", correct: false },
                { text: "2/4", correct: true },
            ]
        },
        {
            question: "If 1 orange costs $0.25, what is the cost of 4 oranges?",
            answers: [
                { text: "$0.75", correct: false },
                
                { text: "$1.25", correct: false },
                { text: "$1.00", correct: true },
                { text: "$1.50", correct: false }
            ]
        },
        {
            question: "The movie starts at 2:00 pm and lasts 1 hour and 30 minutes. What time will the movie end?",
            answers: [
                { text: "3:15 pm", correct: false },
                { text: "3:30 pm", correct: true },
                { text: "3:45 pm", correct: false },
                { text: "4:00 pm", correct: false }
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
            window.location.href = 'math-medium.html';
        });
    }

    function updateTracker() {
        questionTracker.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    startGame();
});
