export interface Card {
  id: string;
  title: string;
  column: string;
  description?: string;
  dueDate?: string;
}

export interface CardModalProps {
  card: Card | null;
  onClose: () => void;
  onSave: (updatedCard: Card) => void;
  onDelete: (id: string) => void;
}

export interface ColumnDropIndicatorProps {
  beforeId: string | null;
}
