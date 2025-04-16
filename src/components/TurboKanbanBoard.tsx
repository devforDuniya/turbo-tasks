"use client";
import { useEffect, useState } from "react";
import { Card } from "../types/card";
import { DEFAULT_CARDS, DEFAULT_COLUMNS } from "../data/data";
import InteractiveColumn from "./InteractiveCard";
import AddList from "./AddList";
import ColumnDropIndicator from "./ColumnDropIndicator";
import CardModal from "./CarModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

export const TurboKanbanBoard = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50 overflow-hidden">
      <Board />
    </div>
  );
};

const Board = () => {
  // Initialize with default data
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);
  const [columns, setColumns] = useState(
    DEFAULT_COLUMNS(DEFAULT_CARDS, setCards)
  );
  const [activeColumn, setActiveColumn] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  // Function to handle column drag and drop
  const handleColumnDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    columnId: string
  ) => {
    e.dataTransfer.setData("columnId", columnId);
  };

  const handleColumnDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const columnId = e.dataTransfer.getData("columnId");
    setActiveColumn(false);

    clearColumnHighlights();

    const indicators = getColumnIndicators();
    const { element } = getNearestColumnIndicator(e, indicators);
    const before = element.dataset.before || "-1";

    if (before !== columnId) {
      let columnsCopy = [...columns];

      const columnToMove = columnsCopy.find((col) => col.column === columnId);
      if (!columnToMove) return;

      columnsCopy = columnsCopy.filter((col) => col.column !== columnId);

      const moveToEnd = before === "-1";
      if (moveToEnd) {
        columnsCopy.push(columnToMove);
      } else {
        const insertAtIndex = columnsCopy.findIndex(
          (col) => col.column === before
        );
        if (insertAtIndex === undefined) return;
        columnsCopy.splice(insertAtIndex, 0, columnToMove);
      }

      setColumns(columnsCopy);
    }
  };

  const handleColumnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightColumnIndicator(e);
    setActiveColumn(true);
  };

  const handleColumnDragLeave = () => {
    clearColumnHighlights();
    setActiveColumn(false);
  };

  const clearColumnHighlights = (els?: NodeListOf<Element>) => {
    const indicators = els || getColumnIndicators();
    indicators.forEach((i) => {
      (i as HTMLElement).style.opacity = "0";
    });
  };

  const highlightColumnIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getColumnIndicators();
    clearColumnHighlights(indicators as any);
    const el = getNearestColumnIndicator(e, indicators);
    if (el.element) (el.element as HTMLElement).style.opacity = "1";
  };

  const getNearestColumnIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: any
  ) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest: any, child: any) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientX - (box.left + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const getColumnIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-board="column-indicator"]`)
    );
  };

  const handleCardClick = (card: Card) => {
    // Find the complete card data
    const completeCard = cards.find((c) => c.id === card.id);
    setSelectedCard(completeCard || null);
  };

  // Update card details
  const handleCardSave = (updatedCard: Card) => {
    setCards((prevCards) =>
      prevCards.map((c) => (c.id === updatedCard.id ? updatedCard : c))
    );
  };

  const handleCardDelete = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((c) => c.id !== cardId));
  };

  // New function to delete a specific list
  const handleDeleteList = (columnId: string) => {
    setColumns(columns.filter((col) => col.column !== columnId));

    // Optionally, also remove all cards that were in that column
    setCards(cards.filter((card) => card.column !== columnId));
  };

  // New function to delete all lists and cards
  const handleDeleteAll = () => {
    if (
      window.confirm("Are you sure you want to delete all lists and cards?")
    ) {
      setColumns([]);
      setCards([]);
      localStorage.removeItem("cards");
      localStorage.removeItem("columns");
    }
  };

  // Initialize the state from localStorage or with defaults
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCards = localStorage.getItem("cards");
      const savedColumns = localStorage.getItem("columns");

      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }

      if (savedColumns) {
        setColumns(JSON.parse(savedColumns));
      }

      // Mark as initialized after we've checked localStorage
      setInitialized(true);
      setLoading(false); // Data has been loaded, set loading to false
    }
  }, []);

  // Save changes to localStorage whenever cards or columns change
  // But only after the initial load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && initialized) {
      localStorage.setItem("cards", JSON.stringify(cards));
      localStorage.setItem("columns", JSON.stringify(columns));
    }
  }, [cards, columns, initialized]);

  // If loading is true, show a loading indicator or the default data
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div>Loading...</div> {/* Show a loading indicator */}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center p-4 bg-neutral-900/80 border-b border-neutral-800">
        <h1 className="text-xl font-bold text-white">Turbo Kanban Board</h1>
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
          <span>Clear All</span>
        </button>
      </div>

      <div
        className="flex h-full w-full gap-4 md:gap-6 overflow-x-auto p-4 md:p-8 lg:p-12"
        onDragOver={handleColumnDragOver}
        onDragLeave={handleColumnDragLeave}
        onDrop={handleColumnDragEnd}
      >
      {columns.map((column, index) => (
  <React.Fragment key={column.column}>
    <ColumnDropIndicator beforeId={column.column} />
    <InteractiveColumn
      key={index}
      title={column.title}
      column={column.column}
      headingColor={column.headingColor} 
      cards={cards}
      setCards={setCards}
      handleColumnDragStart={handleColumnDragStart}
      onCardClick={handleCardClick}
      onDeleteList={handleDeleteList} 
    />
  </React.Fragment>
))}
        <ColumnDropIndicator beforeId={null} />
        <AddList setColumns={setColumns} />
        {selectedCard && (
          <CardModal
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
            onSave={handleCardSave}
            onDelete={handleCardDelete}
          />
        )}
      </div>
    </div>
  );
};

export default TurboKanbanBoard;
