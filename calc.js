class calculator {
    constructor( previousoperandtextElement, currentoperandtextElement) {
        this.previousoperandtextElement = previousoperandtextElement
        this.currentoperandtextElement = currentoperandtextElement
        this.clear()
    }

    clear() {
        this.currentoperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentoperand = this.currentoperand.tostring().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.tostring() + number.tostring()
    }

    chooseOperation(operation) {
        if (this.currentoperand === '') return
        if (this.previousoperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousoperand = this.currentoperand
        this.currentoperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousoperand)
        const current = parseFloat(this.currentoperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break  
            case '÷':
                computation = prev / current
                break  
            default:
                return
        }
        this.currentoperand = computation
        this.operation = undefined
        this.previousoperand = ''
    }

    getdisplaynumber(number) {
        const stringnumber = number.tostring() 
        const integerDigits = parseFloat(stringnumber.split('.')[0])
        const decimalDigits = stringnumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerdigits)) {
            integerDisplay = ''
        } else{
            integerDisplay = integerdigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        }
        if(decimaldigits != null) {
            return '$(intergerDisplay).$(decimaldigits)'
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentoperandtextElement.innerText = 
        this.getdisplaynumber(this.currentoperand)
        if (this.operation != null) {
        this.previousoperandtextElement.innerText = 
        '$( this.getdisplaynumber(this.previousoperand)) $(this.operation)'
        } else {
            this.previousoperandtextElement.innerText = ''
        }
    }
}


const numberbuttons = document.querySelectorAll('[data-number]')
const operationbuttons = document.querySelectorAll('[data-operation]')
const equalsbutton = document.querySelector('[data-equals]')
const deletebutton = document.querySelector('[data-delete]')
const allclearbutton = document.querySelector('[ data-all-clear]')
const previousoperandtextElement = document.querySelector('[data-previous-operand]')
const currentoperandtextElement = document.querySelector('[data-current-operand]')

const calculator = new calculator(previousoperandtextElement, currentoperandtextElement)

numberbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsbutton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allclearbutton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deletebutton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})