import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { FiPlus } from "react-icons/fi";
import { Card } from "../types/card";

interface AddCardProps {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  // Memoize the handleSubmit function to prevent unnecessary re-renders
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!text.trim().length) return;

      const newCard: Card = {
        column,
        title: text.trim(),
        id: Math.random().toString(), // Consider a more reliable ID generation method (e.g., UUID)
      };

      setCards((prevCards) => [...prevCards, newCard]);
      setAdding(false); // Close the input field after submitting
    },
    [column, setCards, text]
  );

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-2 md:p-3 text-xs md:text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1 md:mt-1.5 flex items-center justify-end gap-1 md:gap-1.5">
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="px-2 md:px-3 py-1 md:py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
              aria-label="Close add card form"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1 md:gap-1.5 rounded bg-neutral-50 px-2 md:px-3 py-1 md:py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              aria-label="Add new card"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
          aria-label="Add a new card"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
