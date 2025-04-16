import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Card } from "../types/card";

const AddList = ({ setColumns }: any) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newColumn = {
      title: text.trim(),
      column: Math.random().toString(),
      headingColor: "text-blue-400",
    };

    setColumns((prev: Card[]) => [...prev, newColumn]);
    setAdding(false);
  };

  return (
    <div className="w-44 sm:w-48 md:w-52 lg:w-56 shrink-0 transition-all">
      {adding ? (
        <motion.form
          layout
          onSubmit={handleSubmit}
          className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg"
        >
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Enter list title..."
            className="w-full rounded-md border-2 border-purple-300 bg-white/20 p-2 text-lg font-semibold text-gray-200 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setAdding(false)}
              className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-xl hover:bg-blue-600 transition-all"
            >
              <span className="font-semibold">Add List</span>
              <FiPlus className="text-lg" />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all"
        >
          <span className="font-semibold text-lg">Add New List</span>
          <FiPlus className="text-lg" />
        </motion.button>
      )}
    </div>
  );
};

export default AddList;
