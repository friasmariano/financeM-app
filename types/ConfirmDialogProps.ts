
export interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;

    onSave?: () => void;
    isSaving: boolean;
}