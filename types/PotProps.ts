
export interface PotProps {
    id: number;
    name: string;
    goalAmount: number;
    currentAmount: number;
    onEdit: () => void;
    onDelete: () => void;
}