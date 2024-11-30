// Obtener las tareas almacenadas en localStorage
const getTasksFromStorage = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

// Guardar las tareas en localStorage
const saveTasksToStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Crear un elemento de tarea (li) para agregarlo a la lista
const createTaskElement = (task, index) => {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = task.name;
  span.style.textDecoration = task.completed ? "line-through" : "none";
  li.appendChild(span);

  const toggleButton = document.createElement("button");
  toggleButton.textContent = task.completed ? "Desmarcar" : "Completar";
  toggleButton.onclick = () => toggleComplete(index);
  li.appendChild(toggleButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.onclick = () => deleteTask(index);
  if (task.completed) {
    deleteButton.disabled = true;
  }
  li.appendChild(deleteButton);

  return li;
};

// Cargar y mostrar las tareas en la lista
const loadTasks = () => {
  const tasks = getTasksFromStorage();
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Limpiar la lista actual

  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index);
    taskList.appendChild(taskElement);
  });
};

// Agregar una nueva tarea
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();

  if (taskName) {
    const tasks = getTasksFromStorage();
    tasks.push({ name: taskName, completed: false });
    saveTasksToStorage(tasks);
    taskInput.value = "";
    loadTasks();
  }
};

// Alternar el estado de completado de una tarea
const toggleComplete = (index) => {
  const tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  loadTasks();
};

// Eliminar una tarea
const deleteTask = (index) => {
  const tasks = getTasksFromStorage();
  if (!tasks[index].completed) {
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    loadTasks();
  }
};

// Inicializar las tareas al cargar la página
window.onload = loadTasks;
