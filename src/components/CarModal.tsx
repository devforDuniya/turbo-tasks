import React, { useState, useEffect } from "react";

const CardModal = ({ card, onClose, onSave, onDelete }: any) => {
  const [title, setTitle] = useState<string>(card?.title || "");
  const [description, setDescription] = useState<string>(
    card?.description || ""
  );
  const [dueDate, setDueDate] = useState<string>(card?.dueDate || "");

  // Update state when card prop changes
  useEffect(() => {
    if (card) {
      setTitle(card.title || "");
      setDescription(card.description || "");
      setDueDate(card.dueDate || "");
    }
  }, [card]);

  const handleSave = () => {
    onSave({ ...card, title, description, dueDate });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      onDelete(card.id);
      onClose();
    }
  };

  if (!card) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ease-in-out duration-300 opacity-0 group-hover:opacity-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all ease-in-out duration-300 scale-95 group-hover:scale-100">
        <h2 className="text-lg font-semibold mb-4">Edit Card</h2>

        {/* Title Input */}
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition duration-200"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description Input */}
        <label className="block text-sm font-medium mt-3 mb-1">
          Description
        </label>
        <textarea
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition duration-200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Due Date Input */}
        <label className="block text-sm font-medium mt-3 mb-1">Due Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition duration-200"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-between mt-4 gap-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
