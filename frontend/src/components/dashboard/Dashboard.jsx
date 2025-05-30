import React, { useState, useEffect } from "react";
import TaskCreatingModal from "./TaskCreatingModal";
import DashboardHeader from "../dashboard/DashboardHeader.jsx";
import TaskCard from "../UI/TaskCard.jsx";
import api from "../utils/api.js"
// import axios from "axios";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null); // Track the expanded task

  useEffect(() => {
    api
      .get("http://localhost:8000/api/tasks/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleAddTask = (newTask) => {
    api
      .post("http://localhost:8000/api/tasks/", newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error("Error adding task:", error));
    setIsModalOpen(false);
  };

  const handleEditTask = (taskId, updatedTask) => {
    api
      .patch(`http://localhost:8000/api/tasks/${taskId}/`, updatedTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTasks(tasks.map((task) => (task.id === taskId ? response.data : task)));
      })
      .catch((error) => console.error("Error editing task:", error));
  };

  const handleDeleteTask = (taskId) => {
    api
      .delete(`http://localhost:8000/api/tasks/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        if (expandedTaskId === taskId) setExpandedTaskId(null); // Collapse if deleted task was expanded
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const toggleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId); // Toggle or collapse
  };

  return (
    <React.Fragment>
      <DashboardHeader userName={tasks.user}/>
      <div className="p-4 relative">
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-4 right-4 px-3 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 cursor-pointer transition-all md:bottom-6 md:right-6 md:px-4 md:py-2 lg:bottom-8 lg:right-8 lg:px-5 lg:py-3"
        >
          + Add New Task
        </button>

        <TaskCreatingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
        />

        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10 relative">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleEditTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              isExpanded={expandedTaskId === task.id} // Pass expanded state
              onToggleExpand={() => toggleExpand(task.id)} // Pass toggle function
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;