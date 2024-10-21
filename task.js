const fs = require('fs');
const path = './tasks.json';

let tasks = [];

if (fs.existsSync(path)) {
    tasks = JSON.parse(fs.readFileSync(path, 'utf-8'));
}

const saveTasks = () => {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
};

const addTask = (name, priority = 'low') => {
    tasks.push({ id: tasks.length + 1, name, priority, status: 'pending' });
    saveTasks();
    console.log(`Task "${name}" added with priority: ${priority}`);
};

const listTasks = () => {
    console.log('Tasks List:');
    tasks.forEach(task => {
        console.log(`${task.id}. ${task.name} [${task.priority}] - ${task.status}`);
    });
};

const updateTask = (id, status) => {
    const task = tasks.find(t => t.id === Number(id));
    if (task) {
        task.status = status;
        saveTasks();
        console.log(`Task "${task.name}" updated to ${status}`);
    } else {
        console.log('Task not found!');
    }
};

const deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== Number(id));
    saveTasks();
    console.log(`Task ${id} deleted!`);
};

const [,, command, arg, option] = process.argv;

switch (command) {
    case 'add':
        addTask(arg, option);
        break;
    case 'list':
        listTasks();
        break;
    case 'update':
        updateTask(arg, option);
        break;
    case 'delete':
        deleteTask(arg);
        break;
    default:
        console.log('Command not recognized.');
}
