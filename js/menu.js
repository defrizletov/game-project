window.selectedSave = 1;

const getGameData = save => JSON.parse(localStorage.getItem('gameSave_' + save) || '{ "level": 0, "score": 0, "ended": false, "questions": [] }');

const saveGameData = (save, gameData) => localStorage.setItem('gameSave_' + save, JSON.stringify(gameData));

function toggleAuthorsTable (buttonId = 0) {
    if(isNaN(buttonId)) return;

    const boxEl = document.querySelector('.box');

    if(buttonId === 3) {
        ['block','flex'].map(x => [...document.querySelectorAll(`[style="display: ${x};"]`)].map(e => e.style.display = 'none'));

        return boxEl.style.display = 'none';
    };

    if([1,2].includes(buttonId)) {
        document.querySelector('.info').innerHTML = buttonId === 1 ? `
            <div style="position: absolute;top: 50%;transform: translateY(-50%);">
                <span>После выбора сохранения Вам будет нужно пройти уровни игры, в каждом уровне по 2 этапа: Информация и Вопрос.</span>
                <br>
                <br>
                <span>После ответа на вопрос Вы автоматически попадёте на следующий уровень через 3 секунды.</span>
            </div>
        ` : `
            <span>АВТОРЫ ИГРЫ</span>
            <p>Ученики школы №42 9Г класса</p>
            <div class="authors">
                <div class="author">
                    <img src="./img/rubick.png" alt="Алексей">
                    <span>Алексей К.</span>
                </div>
                <div class="author">
                    <img src="./img/razor.png" alt="Максим">
                    <span>Максим К.</span>
                </div>
            </div>
        `;
    };

    const pageToShow = document.querySelector(('.' + ['saves','info','info'][buttonId]));
    
    pageToShow.style.display = ['none',['block','block','flex'][buttonId - 1] || 'flex'][+(pageToShow.style.display === 'none')];

    boxEl.style.display = ['none','block'][+(boxEl.style.display === 'none')];
};

function playGame () {
    document.querySelector('link[href="./css/menu.css"]').setAttribute('disabled', '');

    document.querySelector('link[href="./css/game.css"]').removeAttribute('disabled');

    document.querySelector('game').innerHTML = `<div id="game">
        <span class="level">УРОВЕНЬ </span>
        <div id="gameSettings">
            <img src="./svg/settings.svg">
            <div class="background"></div>
        </div>
        <div class="menu" style="display: none;">
            <span data-id="0">ПРОДОЛЖИТЬ</span>
            <span data-id="1">СОХРАНИТЬ</span>
            <span data-id="2">ВЫЙТИ</span>
        </div>
        <img class="picture" src="">
        <footer>
            <background>
                <div class="text">
                    <span></span>
                </div>
            </background>
            <span id="startTest" style="display: block;">ПРОДОЛЖИТЬ</span>
            <div class="game_actions" style="display: none;">
                <span onclick="answerQuestion(this);"></span>
                <span onclick="answerQuestion(this);"></span>
                <span onclick="answerQuestion(this);"></span>
                <span onclick="answerQuestion(this);"></span>
            </div>
            <div class="characters">
                <div class="character" style="left: 10px;">
                    <img src="./img/rubick.png">
                </div>
                <div class="character" style="right: 10px;">
                    <img src="./img/razor.png">
                </div>
            </div>
        </footer>
    </div>`;

    loadGame();
};

function deleteSave () {
    document.querySelector(`.save[data-id="${selectedSave}"] img`).remove();

    document.querySelector(`.save[data-id="${selectedSave}"]`).prepend(document.createElement('img'));

    localStorage.removeItem('gameSave_' + selectedSave);
};

function quitToMenu () {
    window.selectedSave = 1;

    document.querySelector('#game').remove();

    createMenu();
};

function initMenu () {
    VanillaTilt.init(document.querySelector('[data-tilt]'), { max: window.maxTiltDegrees });

    document.querySelector('.close_button').addEventListener('click', () => toggleAuthorsTable(3), false);

    document.querySelector('.play').addEventListener('click', playGame, false);

    document.querySelector('.delete').addEventListener('click', deleteSave, false);

    document.querySelector('#menu').addEventListener('click', ({ target: { attributes: [{ value }] } }) => toggleAuthorsTable(+value), false);

    [...document.querySelectorAll('.save')].map(e => e.addEventListener('click', ({ target }) => {
        const saveDiv = target.tagName === 'DIV' ? target : target.parentElement;

        const { className, saveValue = saveDiv.getAttribute('data-id') } = saveDiv;

        if(className.includes('selected')) return;

        document.querySelector(`div[data-id="${selectedSave}"]`).setAttribute('class', 'save');

        window.selectedSave = saveValue;

        saveDiv.className = 'save selected';
    }));
};