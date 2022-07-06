import { logged } from './consoleFunc'

document.addEventListener('DOMContentLoaded', () => {
    init();
})

function init() {
    const foo = ['first', 'second', 1, 2, 3, 4];
    checkArray(foo);
}

function checkArray (arr) {
    arr.forEach( item => logged(item) )
}
