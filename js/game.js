function loadGame () {
    const gameData = getGameData(selectedSave);

    if(gameData.ended) return loadResults();

    document.querySelector('.game_actions').style.display = 'none';

    document.querySelector('#startTest').style.display = 'block';

    changeButtonsColor(['rgb(255, 255, 255)'], null);

    document.querySelector('.level').innerHTML = `УРОВЕНЬ ${gameData.level+1}/${gameLevels.length}`;
    
    document.querySelector('.text span').innerText = gameLevels[gameData.level][0].text;

    document.querySelector('.picture').src = gameLevels[gameData.level][0].image;

    document.querySelector('#gameSettings').addEventListener('click', toggleMenu, false);

    document.querySelector('#startTest').addEventListener('click', startTest, false);

    document.querySelector('.menu').addEventListener('click', ({ target: { attributes: [{ value }] } }) => menuActionList?.[+value]?.(selectedSave, gameData), false);
};

function startTest () {
    const gameData = getGameData(selectedSave),
    randomQuestion = gameLevels[gameData.level][1].questions.shuffle().random();

    document.querySelector('.text span').innerText = randomQuestion.text;

    document.querySelector('.picture').src = gameLevels[gameData.level][1].image;

    gameData.question = randomQuestion;
    
    saveGameData(selectedSave, gameData);

    [...randomQuestion.wrongAnswers, randomQuestion.rightAnswer].shuffle().map((answer, i) => document.querySelector('.game_actions').children[i].innerText = answer);

    document.querySelector('.game_actions').style.display = 'block';
    document.querySelector('#startTest').style.display = 'none';
};

function changeButtonsColor (colors, value) {
    [...document.querySelector('.game_actions').children].map(button => {
        if(!value) return button.removeAttribute('style');

        const resultColor = colors[+(button.innerText === value)] || colors[0];

        button.style.boxShadow = resultColor + ' 0px 0px 5px';

        button.style.color = resultColor;
    });
};

function answerQuestion ({ innerText }) {
    if((window.cooldownAnswer - Date.now()) >= 0) return; 

    const gameData = getGameData(selectedSave);

    changeButtonsColor(['rgb(255, 75, 75)','rgb(75, 255, 75)'], gameData.question.rightAnswer);

    gameData.score += +(innerText === gameData.question.rightAnswer);

    gameData.questions.push([gameData.question.text,gameData.question.rightAnswer,innerText,gameLevels[gameData.level][0].name]);

    if((gameData.level+1) === gameLevels.length) gameData.ended = true;
    else gameData.level++;

    saveGameData(selectedSave, gameData);

    window.cooldownAnswer = Date.now() + window.delayAfterAnswer;

    setTimeout(loadGame, window.delayAfterAnswer);
};

const toggleMenu = () => {
    const menuBox = document.querySelector('.menu');

    menuBox.style.display = ['none','flex'][+(menuBox.style.display === 'none')];
};

const menuActionList = [toggleMenu,saveGameData,quitToMenu];