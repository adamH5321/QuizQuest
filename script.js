document.addEventListener('DOMContentLoaded', () => {
    const categoryElements = document.querySelectorAll('.category');

    categoryElements.forEach(category => {
        category.addEventListener('click', () => {
            category.classList.toggle('expand');
        });
    });

    const difficultyElements = document.querySelectorAll('.difficulty');
    difficultyElements.forEach(difficulty => {
        difficulty.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the category click event
            const selectedCategory = difficulty.closest('.category').dataset.category;
            const selectedDifficulty = difficulty.dataset.difficulty;

            let targetPage;
            if (selectedCategory === 'math') {
                if (selectedDifficulty === 'easy') {
                    targetPage = 'math-easy.html';
                } else if (selectedDifficulty === 'medium') {
                    targetPage = 'math-medium.html';
                } else if (selectedDifficulty === 'hard') {
                    targetPage = 'math-hard.html';
                }
            }
            // geography
            if (selectedCategory === 'geography') {
               if (selectedDifficulty === 'easy') {
                    targetPage = 'geography-easy.html';
             } else if (selectedDifficulty === 'medium') {
                  targetPage = 'geography-medium.html';
             } else if (selectedDifficulty === 'hard') {
                  targetPage = 'geography-hard.html';
             }
             }
            
             // general knoweledge
             if (selectedCategory === 'general') {
                if (selectedDifficulty === 'easy') {
                     targetPage = 'general-easy.html';
              } else if (selectedDifficulty === 'medium') {
                   targetPage = 'general-medium.html';
              } else if (selectedDifficulty === 'hard') {
                   targetPage = 'general-hard.html';
              }
              }
            

            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });
});