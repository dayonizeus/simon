const app = new Vue({
    el: '#app',
    data: {
        sequence: [],
        button1: 'default',
        button2: 'default',
        button3: 'default',
        button4: 'default',
        userChoice: [],
        appState: 'Нажмите старт для начала',
        isStartDisabled: false,
        isUserChoiceDisabled: true,
        difficulty: '',
        sound1: new Audio('1.mp3'),
        sound2: new Audio('2.mp3'),
        sound3: new Audio('3.mp3'),
        sound4: new Audio('4.mp3')
    },
    computed: {
        timeout: function() {
            if (this.difficulty === 'hard') {
                return 400
            } else if (this.difficulty === 'normal') {
                return 1000
            } else {
                return 1500
            }
        },
        round: function() {
            return this.sequence.length
        }
    },
    methods: {
        toggleToSelected: function(iterNum) {
            if (iterNum === 1) {
                this.sound1.play();
                return this.button1 = 'selected'
            } else if (iterNum === 2) {
                this.sound2.play();
                return this.button2 = 'selected'
            } else if (iterNum === 3) {
                this.sound3.play();
                return this.button3 = 'selected'
            } else if (iterNum === 4) {
                this.sound4.play()
                return this.button4 = 'selected'
            }
        },
        toggleToDefault: function() {
            if (this.button1 != 'default') {
                return this.button1 = 'default'
            } else if (this.button2 != 'default') {
                return this.button2 = 'default'
            } else if (this.button3 != 'default') {
                return this.button3 = 'default'
            } else if (this.button4 != 'default'){
                return this.button4 = 'default'
            }
        },
        showSequence: async function() {
            const delay = delayed => (
                new Promise(resolve => setTimeout(resolve, delayed))
            );
            this.isUserChoiceDisabled = true
            await delay(1000);
            for (i of this.sequence) {
                app.toggleToSelected(i);
                await delay(this.timeout);
                app.toggleToDefault();
                await delay(100)
            }
            this.isUserChoiceDisabled = false
            this.appState = 'Повторите за мной'
        },
        increaseSequence: function() {
            return this.sequence.push(Math.floor(Math.random() * 4 + 1))
        },
        startGame: function() {
            this.isStartDisabled = true;
            this.userChoice = [];
            this.sequence = [];
            app.toggleToDefault();
            app.increaseSequence();
            app.showSequence();
            this.appState = 'Повторите за мной'
        },
        userInput: function(choice) {
            choice = Number(choice);
            if (choice === 1) {
                this.sound1.play()
            } else if (choice === 2) {
                this.sound2.play()
            } else if (choice === 3) {
                this.sound3.play()
            } else if (choice === 4) {
                this.sound4.play()
            }
            this.userChoice.push(choice);
            var iterElement = this.userChoice.length - 1;
            if (this.sequence[iterElement] === choice) {
                if (this.sequence.length > this.userChoice.length) {
                    this.appState = 'Правильно! Вводите ещё'
                } else if (this.sequence.length === this.userChoice.length) {
                    this.appState = 'Следующий раунд'
                    this.userChoice = [];
                    app.increaseSequence();
                    app.showSequence();
                }
            } else {
                this.appState = 'Неправильно. Вы проиграли';
                this.isStartDisabled = false;
                this.isUserChoiceDisabled = true
            }
        }
    }
});