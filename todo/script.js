// Task class to create task objects
class Task {
    constructor(title, assignee) {
      this.id = Date.now().toString();
      this.title = title;
      this.assignee = assignee;
      this.completed = false;
      this.status = 'NEW';
    }
  }
  
  // TodoList class to manage tasks
  class TodoList {
    constructor() {
      this.tasks = [];
      this.init();
    }
  
    init() {
      // Add event listeners
      document.querySelector('.btn-primary').addEventListener('click', () => this.showAddTaskModal());
      
      // Initialize existing checkboxes
      document.querySelectorAll('.custom-control-input').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => this.toggleTaskComplete(e));
      });
  
      // Initialize existing delete buttons
      document.querySelectorAll('.fa-trash').forEach(button => {
        button.addEventListener('click', (e) => this.deleteTask(e));
      });
    }
  
    showAddTaskModal() {
      // Create modal HTML
      const modalHtml = `
        <div class="modal fade" id="addTaskModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add New Task</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="addTaskForm">
                  <div class="mb-3">
                    <label class="form-label">Task Title</label>
                    <input type="text" class="form-control" id="taskTitle" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Assignee</label>
                    <input type="text" class="form-control" id="taskAssignee" required>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="saveTask">Add Task</button>
              </div>
            </div>
          </div>
        </div>
      `;
  
      // Add modal to document
      document.body.insertAdjacentHTML('beforeend', modalHtml);
  
      // Get modal instance
      const modal = new bootstrap.Modal(document.getElementById('addTaskModal'));
      modal.show();
  
      // Add save task handler
      document.getElementById('saveTask').addEventListener('click', () => {
        const title = document.getElementById('taskTitle').value;
        const assignee = document.getElementById('taskAssignee').value;
  
        if (title && assignee) {
          this.addTask(title, assignee);
          modal.hide();
          document.getElementById('addTaskModal').remove();
        }
      });
    }
  
    addTask(title, assignee) {
      const task = new Task(title, assignee);
      this.tasks.push(task);
  
      const taskHtml = `
        <li class="list-group-item" data-task-id="${task.id}">
          <div class="todo-indicator bg-info"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left mr-2">
                <div class="custom-checkbox custom-control">
                  <input class="custom-control-input" id="task-${task.id}" type="checkbox">
                  <label class="custom-control-label" for="task-${task.id}">&nbsp;</label>
                </div>
              </div>
              <div class="widget-content-left">
                <div class="widget-heading">${task.title}</div>
                <div class="widget-subheading">By ${task.assignee}</div>
              </div>
              <div class="widget-content-right">
                <button class="border-0 btn-transition btn btn-outline-success">
                  <i class="fa fa-check"></i>
                </button>
                <button class="border-0 btn-transition btn btn-outline-danger">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
      `;
  
      const taskList = document.querySelector('.list-group');
      taskList.insertAdjacentHTML('beforeend', taskHtml);
  
      // Add event listeners to new task
      const newTaskEl = taskList.lastElementChild;
      newTaskEl.querySelector('.custom-control-input').addEventListener('change', (e) => this.toggleTaskComplete(e));
      newTaskEl.querySelector('.btn-outline-danger').addEventListener('click', (e) => this.deleteTask(e));
    }
  
    toggleTaskComplete(event) {
      const taskEl = event.target.closest('.list-group-item');
      const taskId = taskEl.dataset.taskId;
      const task = this.tasks.find(t => t.id === taskId);
  
      if (task) {
        task.completed = event.target.checked;
        if (task.completed) {
          taskEl.classList.add('completed');
        } else {
          taskEl.classList.remove('completed');
        }
      }
    }
  
    deleteTask(event) {
      const taskEl = event.target.closest('.list-group-item');
      const taskId = taskEl.dataset.taskId;
      
      // Remove from array
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      
      // Remove from DOM
      taskEl.remove();
    }
  }
  
  // Add CSS for completed tasks
  const style = document.createElement('style');
  style.textContent = `
    .completed .widget-heading {
      text-decoration: line-through;
      opacity: 0.7;
    }
  `;
  document.head.appendChild(style);
  
  // Initialize TodoList
  document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList();
  });