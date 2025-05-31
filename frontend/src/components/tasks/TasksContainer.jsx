import React, { useState, useEffect } from "react";
import TaskCard from "../UI/TaskCard";
import api from "../utils/api";
import Calendar from "../UI/Calendar"; // Import the new Calendar component

function TaskContainer() {
  const [tasks, setTasks] = useState([]); // All tasks fetched from API
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered tasks based on date range
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  // Fetch all tasks on mount
  useEffect(() => {
    api
      .get("/api/tasks/")
      .then((response) => {
        setTasks(response.data);
        // Initially set filtered tasks to all tasks (or filter by today by default)
        setFilteredTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Handle date range change from Calendar
  const handleDateRangeChange = (startDate, endDate) => {
    const filtered = tasks.filter((task) => {
      const dueDate = new Date(task.due_date);
      return dueDate >= startDate && dueDate <= endDate;
    });
    setFilteredTasks(filtered);
  };

  // Handlers for task actions
  const handleComplete = (taskId, updatedTask) => {
    api
      .patch(`/api/tasks/${taskId}/`, updatedTask)
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? response.data : task))
        );
        setFilteredTasks((prevFiltered) =>
          prevFiltered.map((task) => (task.id === taskId ? response.data : task))
        );
      })
      .catch((error) => console.error("Error completing task:", error));
  };

  const handleEdit = (taskId, updatedTask) => {
    api
      .patch(`/api/tasks/${taskId}/`, updatedTask)
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? response.data : task))
        );
        setFilteredTasks((prevFiltered) =>
          prevFiltered.map((task) => (task.id === taskId ? response.data : task))
        );
      })
      .catch((error) => console.error("Error editing task:", error));
  };

  const handleDelete = (taskId) => {
    api
      .delete(`/api/tasks/${taskId}/`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setFilteredTasks((prevFiltered) =>
          prevFiltered.filter((task) => task.id !== taskId)
        );
        if (expandedTaskId === taskId) setExpandedTaskId(null);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const toggleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  return (
    <div className="p-4">
      {/* Render the new Calendar component */}
      <Calendar onDateRangeChange={handleDateRangeChange} />

      {/* Render filtered tasks */}
      <h2 className="text-2xl font-semibold mb-4">Filtered Tasks</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isExpanded={expandedTaskId === task.id}
              onToggleExpand={() => toggleExpand(task.id)}
            />
          ))
        ) : (
          <p>No tasks for the selected date range.</p>
        )}
      </div>
    </div>
  );
}

export default TaskContainer;