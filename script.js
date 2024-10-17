document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-pane');
    const nestedTabs = document.querySelectorAll('.nested-tab-btn');
    const nestedTabContents = document.querySelectorAll('.nested-tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    nestedTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-nested-tab');
            nestedTabs.forEach(t => t.classList.remove('active'));
            nestedTabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    const stack = [];
    const stackElement = document.getElementById('stack');
    const pushBtn = document.getElementById('push-btn');
    const popBtn = document.getElementById('pop-btn');
    const peekBtn = document.getElementById('peek-btn');

    function updateStackVisualization() {
        stackElement.innerHTML = '';
        stack.forEach((item, index) => {
            const plate = document.createElement('div');
            plate.classList.add('plate');
            plate.textContent = item;
            plate.style.bottom = `${index * 30}px`;
            stackElement.appendChild(plate);
        });
    }

    pushBtn.addEventListener('click', () => {
        const item = prompt('Enter an item to push:');
        if (item) {
            stack.push(item);
            updateStackVisualization();
        }
    });

    popBtn.addEventListener('click', () => {
        if (stack.length > 0) {
            const item = stack.pop();
            alert(`Popped item: ${item}`);
            updateStackVisualization();
        } else {
            alert('Stack is empty');
        }
    });

    peekBtn.addEventListener('click', () => {
        if (stack.length > 0) {
            alert(`Top item: ${stack[stack.length - 1]}`);
        } else {
            alert('Stack is empty');
        }
    });

    const queue = [];
    const queueElement = document.getElementById('queue');
    const enqueueBtn = document.getElementById('enqueue-btn');
    const dequeueBtn = document.getElementById('dequeue-btn');
    const frontBtn = document.getElementById('front-btn');

    function updateQueueVisualization() {
        queueElement.innerHTML = '';
        queue.forEach((item, index) => {
            const block = document.createElement('div');
            block.classList.add('block');
            block.textContent = item;
            block.style.left = `${index * 60}px`;
            queueElement.appendChild(block);
        });
    }

    enqueueBtn.addEventListener('click', () => {
        const item = prompt('Enter an item to enqueue:');
        if (item) {
            queue.push(item);
            updateQueueVisualization();
        }
    });

    dequeueBtn.addEventListener('click', () => {
        if (queue.length > 0) {
            const item = queue.shift();
            alert(`Dequeued item: ${item}`);
            updateQueueVisualization();
        } else {
            alert('Queue is empty');
        }
    });

    frontBtn.addEventListener('click', () => {
        if (queue.length > 0) {
            alert(`Front item: ${queue[0]}`);
        } else {
            alert('Queue is empty');
        }
    });
});