import { Card } from "../types/card";
import { Column } from "./interactive";

export const DEFAULT_CARDS: Card[] = [
    // BACKLOG
    { title: "Look into render bug in dashboard", id: "1", column: "backend" },
    { title: "SOX compliance checklist", id: "2", column: "backend" },
    { title: "[SPIKE] Migrate to Azure", id: "3", column: "backend" },
    { title: "Document Notifications service", id: "4", column: "backend" },
    // TODO
    {
        title: "Research DB options for new microservice",
        id: "5",
        column: "frontend",
    },
    { title: "Postmortem for outage", id: "6", column: "frontend" },
    { title: "Sync with product on Q3 roadmap", id: "7", column: "frontend" },

    // DOING
    {
        title: "Refactor context providers to use Zustand",
        id: "8",
        column: "doing",
    },
    { title: "Add logging to daily CRON", id: "9", column: "doing" },
    // DONE
    {
        title: "Set up DD dashboards for Lambda listener",
        id: "10",
        column: "done",
    },
];

export const DEFAULT_COLUMNS = (
    cards: Card[],
    setCards: React.Dispatch<React.SetStateAction<Card[]>>
): Column[] => [
        {
            title: "Backend",
            column: "backend",
            headingColor: "text-neutral-500",
            cards: cards,
            setCards: setCards
        },
        {
            title: "Frontend",
            column: "frontend",
            headingColor: "text-yellow-200",
            cards: cards,
            setCards: setCards
        },
        {
            title: "In progress",
            column: "doing",
            headingColor: "text-blue-200",
            cards: cards,
            setCards: setCards
        },
        {
            title: "Complete",
            column: "done",
            headingColor: "text-emerald-200",
            cards: cards,
            setCards: setCards
        }
    ];