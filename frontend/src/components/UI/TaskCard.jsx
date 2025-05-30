import { useState } from "react";

export default function TaskCard({
  task,
  onComplete,
  onEdit,
  onDelete,
  isExpanded,
  onToggleExpand,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const getCardGradient = () => {
    switch (task.priority) {
      case "High":
        return "bg-gradient-to-br from-red-400 to-pink-500";
      case "Medium":
        return "bg-gradient-to-br from-blue-400 to-indigo-500";
      case "Low":
        return "bg-gradient-to-br from-green-400 to-teal-500";
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-500";
    }
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    onComplete(task.id, { completed: !task.completed });
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    onEdit(task.id, { title: editedTitle, description: editedDescription });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <div
      className={`relative rounded-lg shadow-md flex flex-col items-center justify-center text-center ${getCardGradient()} transition-all duration-300`}
      style={{
        width: isExpanded ? "24rem" : "12rem",
        height: isExpanded ? "24rem" : "12rem",
        zIndex: isExpanded ? 10 : 0,
        position: "relative",
      }}
      onClick={onToggleExpand} // Use the passed toggle function
    >
      <h3 className="text-lg font-semibold mb-2 text-white sm:text-xl md:text-2xl">{task.title}</h3>
      <p className="text-2xl font-bold mb-2 text-white sm:text-3xl md:text-4xl">
        {task.completed ? "Done" : new Date(task.due_date).toLocaleDateString() || "No Due Date"}
      </p>
      {isExpanded && (
        <div className="mt-2 max-h-40 overflow-auto text-sm text-white sm:max-h-60 md:max-h-80">
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full border-b text-sm bg-transparent text-white border-white/50 sm:text-base md:text-lg"
              rows={4}
            />
          ) : (
            <p>{task.description || `Priority: ${task.priority}`}</p>
          )}
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 w-full px-2">
        <button
          onClick={handleComplete}
          className={`w-5 h-5 border-2 rounded-full ${task.completed ? "border-green-300" : "border-gray-300"} sm:w-6 sm:h-6 md:w-7 md:h-7`}
        ></button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isEditing) handleSave(e);
            else setIsEditing(true);
          }}
          className="text-sm px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2 sm:mt-0 sm:ml-2 md:text-base md:px-3 md:py-2"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={handleDelete}
          className="text-sm px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 mt-2 sm:mt-0 sm:ml-2 md:text-base md:px-3 md:py-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}