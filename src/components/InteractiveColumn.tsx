import { useState } from "react";
import { Card } from "../types/card";
import DropIndicator from "./DropIndicator";
import InteractiveCard from "./InteractiveCard";
import AddCard from "./AddCard";
import { TrashIcon } from "@heroicons/react/24/outline"; // Ensure this package is installed

interface InteractiveColumnProps {
  title: string;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  column: string;
  headingColor: string;
  handleColumnDragStart: (e: React.DragEvent<HTMLDivElement>, column: string) => void;
  onCardClick: (card: Card) => void;
  onDeleteList: (column: string) => void;
}

const InteractiveColumn = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  handleColumnDragStart,
  onCardClick,
  onDeleteList,
}: InteractiveColumnProps) => {
    const [active, setActive] = useState(false);
  
    // Move the getIndicators function to the top
    const getIndicators = (): HTMLElement[] => {
      return Array.from(document.querySelectorAll(`[data-column="${column}"]`)) as HTMLElement[];
    };
  
    // Handling card drag events
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
      e.stopPropagation();
      e.dataTransfer.setData("cardId", card.id);
    };
  
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
      const cardId = e.dataTransfer.getData("cardId");
      setActive(false);
      clearHighlights();
      const indicators = getIndicators(); // Now accessible because it's declared above
      const { element } = getNearestIndicator(e, indicators);
      const before = element.dataset.before || "-1";
  
      if (before !== cardId) {
        let updatedCards = [...cards];
        const cardToMove = updatedCards.find((card) => card.id === cardId);
  
        if (cardToMove) {
          cardToMove.column = column;
          updatedCards = updatedCards.filter((card) => card.id !== cardId);
  
          const insertAtBack = before === "-1";
          if (insertAtBack) {
            updatedCards.push(cardToMove);
          } else {
            const insertAtIndex = updatedCards.findIndex((card) => card.id === before);
            if (insertAtIndex !== undefined) {
              updatedCards.splice(insertAtIndex, 0, cardToMove);
            }
          }
        }
        setCards(updatedCards);
      }
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      highlightIndicator(e);
      setActive(true);
    };
  
    const clearHighlights = (els?: NodeListOf<HTMLElement>) => {
      const indicators = els || getIndicators();
      indicators.forEach((indicator) => {
        (indicator as HTMLElement).style.opacity = "0";
      });
    };
  
    const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
      const indicators = getIndicators();
      clearHighlights(indicators as any);
      const closest = getNearestIndicator(e, indicators);
      closest.element.style.opacity = "1";
    };
  
    const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
      const DISTANCE_OFFSET = 50;
      return indicators.reduce(
        (closest, currentIndicator) => {
          const box = currentIndicator.getBoundingClientRect();
          const offset = e.clientY - (box.top + DISTANCE_OFFSET);
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: currentIndicator };
          }
          return closest;
        },
        { offset: Number.NEGATIVE_INFINITY, element: indicators[indicators.length - 1] }
      );
    };
  
    const handleDragLeave = () => {
      clearHighlights();
      setActive(false);
    };
  
    const filteredCards = cards.filter((card) => card.column === column);
  
    // Delete confirmation modal (simple confirmation)
    const confirmDeleteColumn = () => {
      if (window.confirm("Are you sure you want to delete this column and all its cards?")) {
        onDeleteList(column);
      }
    };
  
    return (
      <div
        className="w-44 sm:w-48 md:w-52 lg:w-56 shrink-0"
        draggable="true"
        onDragStart={(e) => handleColumnDragStart(e, column)}
      >
        <div className="mb-2 md:mb-3 flex items-center justify-between cursor-grab active:cursor-grabbing">
          <h3 className={`text-sm md:text-base font-medium ${headingColor}`}>
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="rounded text-xs md:text-sm text-neutral-400">
              {filteredCards.length}
            </span>
            <button
              onClick={confirmDeleteColumn} // Trigger confirmation dialog
              className="text-neutral-400 hover:text-red-500 transition-colors"
              title="Delete list"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full transition-colors ${
            active ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
        >
         {filteredCards.map((card) => (
         <InteractiveCard
         key={card.id}
         title={card.title}
         id={card.id}
         column={card.column}
         description={card.description}
         dueDate={card.dueDate}
         handleDragStart={handleDragStart}
         onCardClick={onCardClick}
         headingColor={headingColor} // Only if you need this in the card
       />
))}
          <DropIndicator beforeId={null} column={column} />
          <AddCard column={column} setCards={setCards} />
        </div>
      </div>
    );
  };
  
  
export default InteractiveColumn;
