const expressionElement = document.getElementById('expression');
const resultElement = document.getElementById('resultValue');

export const renderCalculator = ({ currentValue, previousValue, operator, overwrite }) => {
    const expression = previousValue && operator
        ? `${formatNumber(previousValue)} ${getOperatorLabel(operator)} ${overwrite ? '' : formatNumber(currentValue)}`
        : '';

    expressionElement.textContent = expression.trim();
    resultElement.textContent = formatDisplayValue(currentValue);
};

export const bindCalculatorEvents = (handlers) => {
    document.querySelectorAll('[data-number]').forEach((button) => {
        button.addEventListener('click', () => {
            handlers.onNumber(button.dataset.number);
        });
    });

    document.querySelectorAll('[data-operator]').forEach((button) => {
        button.addEventListener('click', () => {
            handlers.onOperator(button.dataset.operator);
        });
    });

    document.querySelectorAll('[data-action]').forEach((button) => {
        button.addEventListener('click', () => {
            handlers.onAction(button.dataset.action);
        });
    });
};

const formatDisplayValue = (value) => {
    if (value === 'Error') {
        return value;
    }

    return formatNumber(value);
};

const formatNumber = (value) => {
    const stringValue = String(value);

    if (stringValue === '' || stringValue === '-') {
        return stringValue || '0';
    }

    const [integerPart, decimalPart] = stringValue.split('.');
    const formattedInteger = Number(integerPart).toLocaleString('en-US');

    if (decimalPart === undefined) {
        return formattedInteger;
    }

    return `${formattedInteger}.${decimalPart}`;
};

const getOperatorLabel = (operator) => {
    switch (operator) {
        case '/':
            return '÷';
        case '*':
            return '×';
        case '-':
            return '−';
        default:
            return operator;
    }
};
