import { Card } from "../types/card";

export type Column = {
    title: string;
    column: string;
    headingColor: string;
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}