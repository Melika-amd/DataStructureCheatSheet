class StackVisualizer {
    constructor() {
        this.stack = [];
        this.maxSize = 8;
        this.colors = [
            '#4CAF50', '#2196F3', '#9C27B0', '#FF9800',
            '#E91E63', '#00BCD4', '#FFC107', '#3F51B5'
        ];
        
        this.stackVisual = document.getElementById('stack-visual');
        this.pushBtn = document.getElementById('push-btn');
        this.popBtn = document.getElementById('pop-btn');
        this.peekBtn = document.getElementById('peek-btn');
        this.messageDiv = document.getElementById('stack-message');
        
        this.initializeControls();
        this.isAnimating = false;
    }

    initializeControls() {
        this.pushBtn.addEventListener('click', () => {
            if (!this.isAnimating) this.push();
        });
        this.popBtn.addEventListener('click', () => {
            if (!this.isAnimating) this.pop();
        });
        this.peekBtn.addEventListener('click', () => {
            if (!this.isAnimating) this.peek();
        });

        [this.pushBtn, this.popBtn, this.peekBtn].forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'scale(0.95)';
            });
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'scale(1)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });
        });
    }

    async push() {
        if (this.stack.length >= this.maxSize) {
            this.showMessage('Stack is full!');
            this.shakeButton(this.pushBtn);
            return;
        }

        this.isAnimating = true;
        const randomNum = Math.floor(Math.random() * 100);
        const plateColor = this.colors[this.stack.length % this.colors.length];
        
        const plate = document.createElement('div');
        plate.className = 'stack-plate pushing';
        plate.style.backgroundColor = plateColor;
        plate.textContent = randomNum;
        
        if (this.stackVisual.firstChild) {
            this.stackVisual.insertBefore(plate, this.stackVisual.firstChild);
        } else {
            this.stackVisual.appendChild(plate);
        }
        
        this.stack.push({
            element: plate,
            value: randomNum
        });

        this.animateButton(this.pushBtn);

        await this.wait(500);
        this.isAnimating = false;
        this.showMessage(`Pushed: ${randomNum}`);
    }

    async pop() {
        if (this.stack.length === 0) {
            this.showMessage('Stack is empty!');
            this.shakeButton(this.popBtn);
            return;
        }

        this.isAnimating = true;
        const plateData = this.stack.pop();
        const plate = plateData.element;
        
        plate.classList.add('popping');
        this.animateButton(this.popBtn);

        await this.wait(500);
        plate.remove();
        this.isAnimating = false;
        this.showMessage(`Popped: ${plateData.value}`);
    }

    async peek() {
        if (this.stack.length === 0) {
            this.showMessage('Stack is empty!');
            this.shakeButton(this.peekBtn);
            return;
        }

        this.isAnimating = true;
        const plateData = this.stack[this.stack.length - 1];
        const plate = plateData.element;
        
        plate.style.transform = 'translateY(-10px) scale(1.05)';
        plate.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
        plate.style.zIndex = '1000';
    
        this.animateButton(this.peekBtn);

        await this.wait(800);
        
        plate.style.transform = '';
        plate.style.boxShadow = '';
        plate.style.zIndex = '';
        
        this.isAnimating = false;
        this.showMessage(`Peek: ${plateData.value}`);
    }

    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        button.style.backgroundColor = this.lightenColor(getComputedStyle(button).backgroundColor, 20);
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.backgroundColor = '';
        }, 200);
    }

    shakeButton(button) {
        button.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace('#',''), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
    }

    showMessage(message) {
        this.messageDiv.textContent = message;
        this.messageDiv.style.opacity = '1';
        this.messageDiv.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            this.messageDiv.style.opacity = '0';
            this.messageDiv.style.transform = 'translateY(-10px)';
        }, 2000);
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new StackVisualizer();
});