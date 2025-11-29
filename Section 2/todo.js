const prompt = require('prompt-sync')({ sigint: true });

const tasks = [];

function addTask() {
    const task = prompt('Enter the new task: ').trim();
    if (task) {
        tasks.push(task);
        console.log(`\nTask "${task}" added.`);
    } else {
        console.log('\nError: Task cannot be empty.');
    }
}

function removeTask() {
    if (tasks.length === 0) {
        console.log('\nTo-do list is empty. Nothing to remove.');
        return;
    }

    displayTasks(false);

    const indexStr = prompt('Enter the number of the task to remove: ').trim();
    const index = parseInt(indexStr);

    if (isNaN(index) || index < 1 || index > tasks.length) {
        console.log('\nError: Invalid task number. Please enter a number from 1 to ' + tasks.length + '.');
    } else {
        const removedTask = tasks.splice(index - 1, 1);
        console.log(`\nTask "${removedTask[0]}" removed.`);
    }
}

function displayTasks(showEmptyMessage = true) {
    if (tasks.length === 0) {
        if (showEmptyMessage) {
            console.log('\nThe to-do list is currently empty.');
        }
        return;
    }

    console.log('\n--- TO-DO LIST ---');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
    console.log('------------------');
}

function clearTasks() {
    if (tasks.length === 0) {
        console.log('\nList is already empty.');
        return;
    }

    tasks.length = 0;
    console.log('\nAll tasks have been cleared.');
}

function main() {
    let running = true;
    console.log('Welcome to the CLI To-Do List Manager!');

    while (running) {
        console.log('\nAvailable commands: add, remove, view, clear, exit');
        
        const command = prompt('Enter command: ').toLowerCase().trim();

        switch (command) {
            case 'add':
                addTask();
                break;
            case 'remove':
                removeTask();
                break;
            case 'view':
                displayTasks();
                break;
            case 'clear':
                clearTasks();
                break;
            case 'exit':
                running = false;
                console.log('\nGoodbye! Program exiting.');
                break;
            default:
                console.log('\nError: Invalid command. Please try one of: add, remove, view, clear, or exit.');
                break;
        }
    }
}

main();