class StackVisualizer {
    constructor() {
        this.stack = [];
        this.maxSize = 8;
        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
            '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
        ];
        
        this.stackVisual = document.getElementById('stack-visual');
        this.pushBtn = document.getElementById('push-btn');
        this.popBtn = document.getElementById('pop-btn');
        this.peekBtn = document.getElementById('peek-btn');
        this.messageDiv = document.getElementById('stack-message');
        
        this.initializeControls();
    }

    initializeControls() {
        this.pushBtn.addEventListener('click', () => this.push());
        this.popBtn.addEventListener('click', () => this.pop());
        this.peekBtn.addEventListener('click', () => this.peek());
    }

    push() {
        if (this.stack.length >= this.maxSize) {
            this.showMessage('Stack is full!');
            return;
        }

        const randomNum = Math.floor(Math.random() * 100);
        const plateColor = this.colors[this.stack.length % this.colors.length];
        
        const plate = document.createElement('div');
        plate.className = 'stack-plate';
        plate.style.backgroundColor = plateColor;
        plate.textContent = randomNum;
        
        plate.style.transform = 'translateY(-20px)';
        plate.style.opacity = '0';
        
        if (this.stackVisual.firstChild) {
            this.stackVisual.insertBefore(plate, this.stackVisual.firstChild);
        } else {
            this.stackVisual.appendChild(plate);
        }
        
        this.stack.push({
            element: plate,
            value: randomNum
        });

        setTimeout(() => {
            plate.style.transform = 'translateY(0)';
            plate.style.opacity = '1';
        }, 50);

        this.showMessage(`Pushed: ${randomNum}`);
    }

    pop() {
        if (this.stack.length === 0) {
            this.showMessage('Stack is empty!');
            return;
        }

        const plateData = this.stack.pop();
        const value = plateData.value;
        const plate = plateData.element;
        
        plate.style.transform = 'translateY(-20px)';
        plate.style.opacity = '0';

        setTimeout(() => {
            plate.remove();
        }, 300);

        this.showMessage(`Popped: ${value}`);
    }

    peek() {
        if (this.stack.length === 0) {
            this.showMessage('Stack is empty!');
            return;
        }

        const plateData = this.stack[this.stack.length - 1];
        const plate = plateData.element;
        
        plate.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            plate.style.transform = 'translateY(0)';
        }, 500);

        this.showMessage(`Peeking: ${plateData.value}`);
    }

    showMessage(message) {
        this.messageDiv.textContent = message;
        setTimeout(() => {
            this.messageDiv.textContent = '';
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StackVisualizer();
});