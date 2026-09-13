import { calculate } from './modules/math.js';
import { bindCalculatorEvents, renderCalculator } from './modules/ui.js';

const state = {
    currentValue: '0',
    previousValue: '',
    operator: '',
    overwrite: false,
};

const updateView = () => {
    renderCalculator(state);
};

const inputNumber = (number) => {
    if (state.currentValue === 'Error' || state.overwrite) {
        state.currentValue = number;
        state.overwrite = false;
        updateView();
        return;
    }

    if (state.currentValue === '0') {
        state.currentValue = number;
    } else {
        state.currentValue += number;
    }

    updateView();
};

const inputDecimal = () => {
    if (state.currentValue === 'Error' || state.overwrite) {
        state.currentValue = '0.';
        state.overwrite = false;
        updateView();
        return;
    }

    if (!state.currentValue.includes('.')) {
        state.currentValue += '.';
    }

    updateView();
};

const chooseOperator = (nextOperator) => {
    if (state.currentValue === 'Error') {
        clearAll();
    }

    if (state.previousValue && state.operator && !state.overwrite) {
        computeResult();
    }

    state.previousValue = state.currentValue;
    state.operator = nextOperator;
    state.overwrite = true;
    updateView();
};

const computeResult = () => {
    if (!state.previousValue || !state.operator) {
        return;
    }

    try {
        const result = calculate(
            Number(state.previousValue),
            Number(state.currentValue),
            state.operator
        );

        state.currentValue = String(roundResult(result));
        state.previousValue = '';
        state.operator = '';
        state.overwrite = true;
    } catch (error) {
        state.currentValue = 'Error';
        state.previousValue = '';
        state.operator = '';
        state.overwrite = true;
    }

    updateView();
};

const clearAll = () => {
    state.currentValue = '0';
    state.previousValue = '';
    state.operator = '';
    state.overwrite = false;
    updateView();
};

const backspace = () => {
    if (state.overwrite || state.currentValue === 'Error') {
        clearAll();
        return;
    }

    if (state.currentValue.length <= 1 || (state.currentValue.length === 2 && state.currentValue.startsWith('-'))) {
        state.currentValue = '0';
    } else {
        state.currentValue = state.currentValue.slice(0, -1);
    }

    updateView();
};

const toggleSign = () => {
    if (state.currentValue === '0' || state.currentValue === 'Error') {
        return;
    }

    state.currentValue = state.currentValue.startsWith('-')
        ? state.currentValue.slice(1)
        : `-${state.currentValue}`;

    updateView();
};

const convertPercent = () => {
    if (state.currentValue === 'Error') {
        return;
    }

    state.currentValue = String(roundResult(Number(state.currentValue) / 100));
    updateView();
};

const roundResult = (value) => {
    return Math.round((value + Number.EPSILON) * 1000000) / 1000000;
};

const handleKeyboardInput = (event) => {
    const { key } = event;

    if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        inputNumber(key);
        return;
    }

    switch (key) {
        case '.':
        case ',':
            event.preventDefault();
            inputDecimal();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            event.preventDefault();
            chooseOperator(key);
            break;
        case 'Enter':
        case '=':
            event.preventDefault();
            computeResult();
            break;
        case 'Backspace':
            event.preventDefault();
            backspace();
            break;
        case 'Escape':
        case 'Delete':
            event.preventDefault();
            clearAll();
            break;
        case '%':
            event.preventDefault();
            convertPercent();
            break;
        default:
            break;
    }
};

bindCalculatorEvents({
    onNumber: inputNumber,
    onOperator: chooseOperator,
    onAction: (action) => {
        switch (action) {
            case 'decimal':
                inputDecimal();
                break;
            case 'equals':
                computeResult();
                break;
            case 'clear':
                clearAll();
                break;
            case 'backspace':
                backspace();
                break;
            case 'toggle-sign':
                toggleSign();
                break;
            case 'percent':
                convertPercent();
                break;
            default:
                break;
        }
    },
});

window.addEventListener('keydown', handleKeyboardInput);

updateView();
