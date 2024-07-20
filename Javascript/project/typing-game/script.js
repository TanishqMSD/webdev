document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text p');
    const input = document.querySelector('.wrapper .input-field');
    const timeElement = document.querySelector('.time span b');
    const mistakesElement = document.querySelector('.mistake span');
    const wpmElement = document.querySelector('.wpm span');
    const cpmElement = document.querySelector('.cpm span');
    const btn = document.querySelector('#retry');

    let timer = null;
    let maxTime = 60;
    let timeLeft = maxTime;
    let charIndex = 0;
    let mistake = 0;
    let isTyping = false;

    async function getRandomParagraph() {
        try {
            const response = await axios.get('https://api.quotable.io/random?minLength=100&maxLength=300');
            return response.data.content;
        } catch (error) {
            console.error('Error fetching paragraph:', error);
            return "Sorry, we couldn't load a new paragraph. Please try again.";
        }
    }

    async function setRandomParagraph() {
        const paragraph = await getRandomParagraph();
        typingText.innerHTML = '';
        paragraph.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerText = char;
            typingText.appendChild(span);
        });
        input.value = '';
        charIndex = 0;
        mistake = 0;
        timeLeft = maxTime;
        clearInterval(timer);
        timer = null;
        isTyping = false;
        timeElement.innerText = timeLeft;
        mistakesElement.innerText = mistake;
        wpmElement.innerText = 0;
        cpmElement.innerText = 0;
    }

    function initTyping() {
        const characters = typingText.querySelectorAll('span');
        let typedChar = input.value.split('')[charIndex];

        if (charIndex < characters.length && timeLeft > 0) {
            if (!isTyping) {
                timer = setInterval(startTimer, 1000);
                isTyping = true;
            }

            if (typedChar == null) {
                if (charIndex > 0) {
                    charIndex--;
                    if (characters[charIndex].classList.contains('incorrect')) {
                        mistake--;
                    }
                    characters[charIndex].classList.remove('correct', 'incorrect');
                }
            } else {
                if (characters[charIndex].innerText === typedChar) {
                    characters[charIndex].classList.add('correct');
                } else {
                    characters[charIndex].classList.add('incorrect');
                    mistake++;
                }
                charIndex++;
            }

            characters.forEach(span => span.classList.remove('active'));
            characters[charIndex]?.classList.add('active');

            mistakesElement.innerText = mistake;
            calculateWPM();

            if (charIndex === characters.length) {
                clearInterval(timer);
                input.disabled = true;
                checkWPM();
            }
        }
    }

    function startTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timeElement.innerText = timeLeft;
            calculateWPM();
        } else {
            clearInterval(timer);
            input.disabled = true;
            checkWPM();
        }
    }

    function calculateWPM() {
        const elapsedTime = (maxTime - timeLeft) / 60;
        const wordsTyped = (charIndex - mistake) / 5;
        const wpm = Math.round(wordsTyped / elapsedTime);
        const cpm = charIndex - mistake;
        wpmElement.innerText = wpm > 0 ? wpm : 0;
        cpmElement.innerText = cpm > 0 ? cpm : 0;
    }

    function checkWPM() {
        const wpm = parseInt(wpmElement.innerText);
        if (wpm > 50) {
            alert("GG!! Google hire karel ata job pakka");
        }
    }

    btn.addEventListener('click', () => {
        setRandomParagraph();
        input.disabled = false;
        input.focus();
    });

    input.addEventListener('input', initTyping);

    setRandomParagraph();
});
