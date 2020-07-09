class Calculator {
    private displayValue: number;

    public displayElement: HTMLElement;

    protected operator: string;
    protected operatorElements: NodeListOf<HTMLButtonElement>;

    protected numberElements: NodeListOf<HTMLButtonElement>;

    protected waitForSecondOperand: boolean;
    protected dotOperand: boolean;

    protected num1: number;
    protected num2: number;

    constructor(displayElementId: string, operatorElementClass: string, numberElementClass: string, displayElementClass: string) {

        this.displayElement = document.querySelector(displayElementClass);

        this.operatorElements = document.querySelectorAll(operatorElementClass);
        this.numberElements = document.querySelectorAll(numberElementClass);

        this.reset();

        this.writeEvents();
    }

    public writeEvents() {

        document.getElementById('equal').addEventListener('click', this.operateEqual);

        document.querySelector('.decimal').addEventListener('click', this.setDot);

        this.operatorElements.forEach(this.setOperatorValue);

        this.numberElements.forEach(this.setNumberValue);

        document.querySelector('.all-clear').addEventListener('click', this.reset);
    }

    protected setOperatorValue = (operator) => {
        operator.addEventListener('click', event => {
            if (this.operator !== null) {
                this.waitForSecondOperand = true;
                this.operateEqual();
            } else {
                this.updateDisplay(" ");
            }

            this.operator = operator.value;
        });
    }

    protected setNumberValue = (numButton) => {
        numButton.addEventListener('click', event => {
            if (this.operator == null) {
                this.setNum1(numButton.value);
            } else {
                this.setNum2(numButton.value);
            }
        });
    }

    protected operateEqual = () => {
        this.calculate();

        if (this.isInt(this.displayValue)) {
            this.updateDisplay(this.displayValue.toString());
        } else {
            this.updateDisplay(this.displayValue.toFixed(2).toString().replace("0", ""));
        }
    }

    protected isInt(n) {
        return n % 1 === 0;
    }

    protected setNum1 = (numValue) => {
        if (this.num1 == null) {
            //first value of mum1
            this.num1 = parseFloat(numValue);
            this.updateDisplay(this.num1.toString());

        } else {
            //check dot (point)
            if (this.dotOperand) {
                this.num1 = parseFloat(this.concatWithCurrentDisplay(numValue));
                this.dotOperand = false;
            } else {
                this.num1 = parseFloat(String(this.num1) + numValue);
                this.updateDisplay(this.num1.toString());
            }
        }
    }

    protected setNum2 = (numValue) => {
        //first value of num2 | check if user click any operator instead of equal
        if (this.num2 == null || this.waitForSecondOperand) {
            this.num2 = parseFloat(numValue);
            this.updateDisplay(this.num2.toString());
        } else {
            //check dot (point)
            if (this.dotOperand) {
                this.num2 = parseFloat(this.concatWithCurrentDisplay(numValue));
                this.dotOperand = false;
            } else {
                this.num2 = parseFloat(String(this.num2) + numValue);
                this.updateDisplay(this.num2.toString());
            }
        }
    }

    protected updateDisplay(result: string) {
        (this.displayElement as HTMLInputElement).value = result;
    }

    protected setDot = (): void => {
        this.concatWithCurrentDisplay();
        this.dotOperand = true;
    }

    protected concatWithCurrentDisplay = (glue: string = ".") => {
        let currentDisplay = (this.displayElement as HTMLInputElement).value;
        let newValue = currentDisplay + glue;

        (this.displayElement as HTMLInputElement).value = newValue;
        return newValue;
    }

    public reset = (): void => {
        this.displayValue = 0;
        this.operator = null;
        this.dotOperand = false;
        this.waitForSecondOperand = false;
        this.num1 = null;
        this.num2 = null;

        this.updateDisplay("");
    }

    protected calculate(): number {
        switch (this.operator) {
            case "+": {
                return this.add();
            }
            case "-": {
                return this.subtract();
            }
            case "*": {
                return this.multiply();
            }
            case "/": {
                return this.divide();
            }
            default: {
                return null;
            }
        }
    }

    protected add(): number {
        this.num1 = this.displayValue = this.num1 + this.num2;
        return this.displayValue;
    }

    protected subtract(): number {
        this.num1 = this.displayValue = this.num1 - this.num2;
        return this.displayValue;
    }

    protected multiply(): number {
        this.num1 = this.displayValue = this.num1 * this.num2;
        return this.displayValue;
    }

    protected divide(): number {
        this.num1 = this.displayValue = this.num1 / this.num2;
        return this.displayValue;
    }
}


window.onload = function () {
    let calc = new Calculator('result', '.operator', '.number', "#result");
}