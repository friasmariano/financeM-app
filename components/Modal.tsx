'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ModalProps } from '@/types/ModalProps'

export default function Modal({ isOpen, onClose, children}: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        }

    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative animate-fadeIn"
                 onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                        aria-label="Close Modal">
                    x
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}