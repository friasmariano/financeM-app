
export interface PotProps {
    id: number;
    name: string;
    goalAmount: string;
    currentAmount: string;
    onEdit: () => void;
}