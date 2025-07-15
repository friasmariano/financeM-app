
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    hasButtons?: boolean;
    size?: ModalSize;

    onSave?: () => void;
    savingDisabled: boolean;
    isSaving: boolean;
}