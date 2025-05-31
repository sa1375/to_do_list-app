import React, { useState, useEffect } from "react";
import TaskCreatingModal from "./TaskCreatingModal";
import DashboardHeader from "./DashboardHeader.jsx";
import TaskCard from "../UI/TaskCard.jsx";
import api from "../utils/api";

function Dashboard({ setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [tasks, setTasks] = useState([]); // Local state for tasks

  useEffect(() => {
    api
      .get("/api/tasks/")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleAddTask = (newTask) => {
    api
      .post("/api/tasks/", newTask)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => console.error("Error adding task:", error));
    setIsModalOpen(false);
  };

  const handleEditTask = (taskId, updatedTask) => {
    api
      .patch(`/api/tasks/${taskId}/`, updatedTask)
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? response.data : task))
        );
      })
      .catch((error) => console.error("Error editing task:", error));
  };

  const handleDeleteTask = (taskId) => {
    api
      .delete(`/api/tasks/${taskId}/`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        if (expandedTaskId === taskId) setExpandedTaskId(null);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const toggleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentPage("login");
  };

  return (
    <React.Fragment>
      <DashboardHeader handleLogout={handleLogout} />
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
              isExpanded={expandedTaskId === task.id}
              onToggleExpand={() => toggleExpand(task.id)}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;