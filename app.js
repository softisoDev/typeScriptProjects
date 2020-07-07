var Calculator = /** @class */ (function () {
    function Calculator(displayElementId, operatorElementClass, numberElementClass, displayElementClass) {
        var _this = this;
        this.setOperatorValue = function (operator) {
            operator.addEventListener('click', function (event) {
                if (_this.operator !== null) {
                    _this.waitForSecondOperand = true;
                    _this.operateEqual();
                }
                else {
                    _this.updateDisplay(" ");
                }
                _this.operator = operator.value;
            });
        };
        this.setNumberValue = function (numButton) {
            numButton.addEventListener('click', function (event) {
                if (_this.operator == null) {
                    _this.setNum1(numButton.value);
                }
                else {
                    _this.setNum2(numButton.value);
                }
            });
        };
        this.operateEqual = function () {
            _this.calculate();
            if (_this.isInt(_this.displayValue)) {
                _this.updateDisplay(_this.displayValue.toString());
            }
            else {
                _this.updateDisplay(_this.displayValue.toFixed(2).toString().replace("0", ""));
            }
        };
        this.setNum1 = function (numValue) {
            if (_this.num1 == null) {
                //first value of mum1
                _this.num1 = parseFloat(numValue);
                _this.updateDisplay(_this.num1.toString());
            }
            else {
                //check dot (point)
                if (_this.dotOperand) {
                    _this.num1 = parseFloat(_this.concatWithCurrentDisplay(numValue));
                    _this.dotOperand = false;
                }
                else {
                    _this.num1 = parseFloat(String(_this.num1) + numValue);
                    _this.updateDisplay(_this.num1.toString());
                }
            }
        };
        this.setNum2 = function (numValue) {
            //first value of num2 | check if user click any operator instead of equal
            if (_this.num2 == null || _this.waitForSecondOperand) {
                _this.num2 = parseFloat(numValue);
                _this.updateDisplay(_this.num2.toString());
            }
            else {
                //check dot (point)
                if (_this.dotOperand) {
                    _this.num2 = parseFloat(_this.concatWithCurrentDisplay(numValue));
                    _this.dotOperand = false;
                }
                else {
                    _this.num2 = parseFloat(String(_this.num2) + numValue);
                    _this.updateDisplay(_this.num2.toString());
                }
            }
        };
        this.setDot = function () {
            _this.concatWithCurrentDisplay();
            _this.dotOperand = true;
        };
        this.concatWithCurrentDisplay = function (glue) {
            if (glue === void 0) { glue = "."; }
            var currentDisplay = _this.displayElement.value;
            var newValue = currentDisplay + glue;
            _this.displayElement.value = newValue;
            return newValue;
        };
        this.reset = function () {
            _this.displayValue = 0;
            _this.operator = null;
            _this.dotOperand = false;
            _this.waitForSecondOperand = false;
            _this.num1 = null;
            _this.num2 = null;
            _this.updateDisplay("");
        };
        this.displayElement = document.querySelector(displayElementClass);
        this.operatorElements = document.querySelectorAll(operatorElementClass);
        this.numberElements = document.querySelectorAll(numberElementClass);
        this.reset();
        this.writeEvents();
    }
    Calculator.prototype.writeEvents = function () {
        document.getElementById('equal').addEventListener('click', this.operateEqual);
        document.querySelector('.decimal').addEventListener('click', this.setDot);
        this.operatorElements.forEach(this.setOperatorValue);
        this.numberElements.forEach(this.setNumberValue);
        document.querySelector('.all-clear').addEventListener('click', this.reset);
    };
    Calculator.prototype.isInt = function (n) {
        return n % 1 === 0;
    };
    Calculator.prototype.updateDisplay = function (result) {
        this.displayElement.value = result;
    };
    Calculator.prototype.calculate = function () {
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
    };
    Calculator.prototype.add = function () {
        this.num1 = this.displayValue = this.num1 + this.num2;
        return this.displayValue;
    };
    Calculator.prototype.subtract = function () {
        this.num1 = this.displayValue = this.num1 - this.num2;
        return this.displayValue;
    };
    Calculator.prototype.multiply = function () {
        this.num1 = this.displayValue = this.num1 * this.num2;
        return this.displayValue;
    };
    Calculator.prototype.divide = function () {
        this.num1 = this.displayValue = this.num1 / this.num2;
        return this.displayValue;
    };
    return Calculator;
}());
window.onload = function () {
    var calc = new Calculator('result', '.operator', '.number', "#result");
};
