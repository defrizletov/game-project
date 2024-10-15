function getResults (score) {
    const result = score / gameLevels.length;

    let markStr = 'плохо, попробуй ещё раз', color = '255, 50, 50';

    if(result >= 0.25) {
        markStr = 'нужно постараться';

        color = '255, 100, 50';
    };
    if(result >= 0.45) {
        markStr = 'нормально';

        color = '255, 255, 50';
    };
    if(result >= 0.65) {
        markStr = 'хорошо';

        color = '155, 255, 50';
    };
    if(result === 1) {
        markStr = 'отлично';

        color = '50, 255, 50';
    };

    return [markStr, 'rgb('+color+')'];
};

function loadResults () {
    document.querySelector('link[href="./css/game.css"]').setAttribute('disabled', '');

    document.querySelector('link[href="./css/results.css"]').removeAttribute('disabled');

    const { score, questions } = getGameData(selectedSave), [markStr, color] = getResults(score);

    document.querySelector('game').innerHTML = `<div id="game">
    <span class="title">ИГРА ПРОЙДЕНА!</span>
    <div class="results">
        <div class="block">
            <span class="header">Ваша оценка: <span style="color: ${color};">${markStr}</span> (${score}/${gameLevels.length})</span>
            <span class="header">Результаты:</span>
            <span class="info">
                ${questions.map(([text,rAnswer,uAnswer, name], i) => `
                ${i+1}. «${name}»
                <br>
                Вопрос: «${text}»
                <br>
                Правильный ответ: «${rAnswer}»
                <br>
                Ваш ответ: <span style="color: ${'rgb(' + (rAnswer === uAnswer ? '50, 255, 50' : '255, 50, 50') + ')'};">«${uAnswer}»</span>
                `).join('<br></br>') + '<br>'}
            </span>
            <br>
            <span class="button">В МЕНЮ</span>
        </div>
    </div>
    </div>`;

    document.querySelector('.button').addEventListener('click', quitToMenu, false);
};