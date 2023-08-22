import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeTask, clearCompletedTasks } from "../utils/taskUtils";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInput: "",
      pomodorosInput: 1, // default number of pomodoros
      tasks: this.props.tasks || [], // tasks from props
      isAddingTask: false, // Track whether the user is adding a task
    };
  }
  addTask = () => {
    const { taskInput, pomodorosInput } = this.state;
    if (taskInput.trim() === "") {
      return;
    }
    this.props.onUpdateTasks("add", null, taskInput, pomodorosInput);
    this.setState({ taskInput: "", pomodorosInput: 1 });
  };

  toggleTaskCompleted = (index) => {
    const updatedTasks = [...this.state.tasks];
    if (updatedTasks[index]) {
      updatedTasks[index].completed = !updatedTasks[index].completed;
      this.setState({ tasks: updatedTasks });
    }
  };

  toggleInputForm = () => {
    this.setState({ isAddingTask: !this.state.isAddingTask });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.tasks !== this.props.tasks) {
      this.setState({ tasks: this.props.tasks || [] });
    }
  }

  removeTask = (index) => {
    const updatedTasks = removeTask(this.props.tasks, index);
    this.props.onUpdateTasks("remove", null, null, null, null, updatedTasks);
  };

  clearCompletedTasks = () => {
    const updatedTasks = clearCompletedTasks(this.props.tasks);
    this.props.onUpdateTasks("clear", null, null, null, null, updatedTasks);
  };

  render() {
    const { isAddingTask, taskInput, pomodorosInput } = this.state;
    const hasCompletedTasks = this.props.tasks.some((task) => task.completed);

    return (
      <div className="rounded-lg p-8 shadow-md space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Task List</h2>

        {/* Toggle input form */}
        <button
          onClick={this.toggleInputForm}
          className="text-white hover:bg-blue-800 hover:text-white bg-blue-500 font-semibold py-2 px-2 rounded-md mx-auto block"
        >
          {isAddingTask ? "Cancel" : "Add Task"}
        </button>

        {/* Input form */}
        {isAddingTask && (
          <div className="task-list__input mb-2 flex items-center mt-2 ">
            <input
              type="text"
              placeholder="Enter a task ..."
              onChange={(e) => this.setState({ taskInput: e.target.value })}
              value={taskInput}
              className="rounded-md py-2 px-2 w-40 mr-2 text-white"
              style={{ backgroundColor: "transparent" }}
            />
            <div className="flex items-center">
              <label className="mr-2 text-gray-600">Pomodoros:</label>
              <input
                type="number"
                placeholder="Pomodoros"
                onChange={(e) =>
                  this.setState({ pomodorosInput: e.target.value })
                }
                value={pomodorosInput}
                className="rounded-md py-2 px-4 w-16 text-white"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <button
              onClick={this.addTask}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-md ml-2 w-full"
            >
              Add Task
            </button>
          </div>
        )}
        {/* Task list */}
        <ul className="task-list__list">
          {this.props.tasks.map((task, index) => (
            <li key={index} className="mb-0 flex items-center">
              <input
                type="checkbox"
                onChange={() => this.toggleTaskCompleted(index)}
                checked={task.completed}
                className="mr-2"
              />
              <span
                className={task.completed ? "line-through text-lg" : "text-lg"}
              >
                {task.text}
              </span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md ml-auto"
                onClick={() => this.removeTask(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
        {hasCompletedTasks && (
          <button
            onClick={this.clearCompletedTasks}
            className="text-white hover:bg-red-800 hover:text-white te bg-blue-500 font-semibold py-2 px-2 rounded-md mx-auto block mt-4"
          >
            Clear Completed Tasks
          </button>
        )}
      </div>
    );
  }
}

export default TaskList;
