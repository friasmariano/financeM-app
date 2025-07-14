
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    hasFooter?: boolean;
    size?: ModalSize;
}