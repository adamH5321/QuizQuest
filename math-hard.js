document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Five years ago, Jessika was four times as old as her cousin, Sabrina. In five years, Jessika will be twice as old as Sabrina. How old is Jessika now?",
            answers: [
                { text: "25", correct: false },
                { text: "30", correct: true },
                { text: "28", correct: false },
                { text: "35", correct: false }
            ]
        },
        {
            question: "A train travels 60 kilometers in 1.5 hours. What is the average speed of the train in kilometers per hour?",
            answers: [
                { text: "30 km/h", correct: false },
                { text: "40 km/h", correct: true },
                { text: "50 km/h", correct: false },
                { text: "60 km/h", correct: false }
            ]
        },
        {
            question: "A bakery sells cupcakes in boxes of 6 and muffins in boxes of 8.If they sold a totalof 70 items and the number of cupcakes sold was twice the number of muffins, how many boxes of cupcakes did they sell?",
            answers: [
                { text: "4", correct: false },
                { text: "6", correct: false },
                { text: "8", correct: true },
                { text: "10", correct: false }
            ]
        },
        {
            question: "What is the name of a Polygon with 14 sides?",
            answers: [
                { text: "Hexadecagon", correct: false },
                { text: "Dodecagon", correct: false },
                { text: "Tridecagon", correct: false },
                { text: "Tetradecagon", correct: true }
            ]
        },
        {
            question: "If 4 times a number decreased by 7 equals 25, what is the number?",
            answers: [
                { text: "6", correct: false },
                { text: "8", correct: true },
                { text: "10", correct: false },
                { text: "12", correct: false }
            ]
        },
        {
            question: "In a school, there are twice as many girls as boys. If the total number of students is 270, how many girls are there?",
            answers: [
                { text: "90", correct: false },
                { text: "120", correct: false },
                { text: "180", correct: true },
                { text: "200", correct: false }
            ]
        },
        {
            question: "If the paper costs 1.50$ on Sundays and 50 cents other days, how much does a week of papers cost?",
            answers: [
                { text: "4.5", correct: true },
                { text: "4", correct: false },
                { text: "3.5", correct: false },
                { text: "3", correct: false }
            ]
        },
        {
            question: "A cyclist covers a distance of 48 km at a constant speed. If he had gone 4 km/h faster, he would have taken one hour less. What is his original speed?",
            answers: [
                { text: "8 km/h", correct: false },
                { text: "10 km/h", correct: true },
                { text: "12 km/h", correct: true },
                { text: "16 km/h", correct: false }
            ]
        },
        {
            question: "A store owner marks up his merchandise by 40%. During a sale, he offers a discount of 25% on the marked up price. if an item originally cost him 50$, what is the final selling price after the discount?",
            answers: [
                { text: "$55.5", correct: false },
                { text: "$52.5", correct: true },
                { text: "$54", correct: false },
                { text: "$60", correct: false }
            ]
        },
        {
            question: "A shop sells two types of pens: regular pens for $1.50 each and deluxe pens for $2.50 each. If a customer buys 4 regular pens and 3 deluxe pens, what is the total cost of the pens?",
            answers: [
                { text: "$14.50", correct: false },
                { text: "$14.50", correct: false },
                { text: "$10.50", correct: false },
                { text: "$13.50", correct: true }
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