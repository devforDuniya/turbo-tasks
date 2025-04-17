import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";

/**
 * @Component
 * 1. DropIndicator - Violet line to indicate where the card is being dropped/dragged.
 * @param title
 * @returns
 */
const InteractiveCard = ({
  title,
  id,
  column,
  description,
  dueDate,
  handleDragStart,
  onCardClick,
  headingColor,
}: {
  title: string;
  id: string;
  column: string;
  description?: string;
  dueDate?: string;
  handleDragStart: any;
  onCardClick?: any;
  headingColor?: string;
}) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, { title, id, column, description, dueDate })
        }
        onClick={() => onCardClick({ id, title, column, description, dueDate })}
        className="cursor-grab rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-3 transition-all shadow-xl hover:scale-105 hover:shadow-2xl active:cursor-grabbing"
      >
        <p className="text-sm sm:text-base font-medium text-neutral-50 truncate">{title}</p>
        {dueDate && (
          <p className="text-xs text-neutral-200 mt-1">
            Due: {new Date(dueDate).toLocaleDateString()}
          </p>
        )}
      </motion.div>
    </>
  );
};

export default InteractiveCard;
