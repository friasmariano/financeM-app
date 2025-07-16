'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ModalProps } from '@/types/ModalProps'
import { useAppSelector } from '@/lib/hooks'
import { getSizeClass } from '@/utils/modalSize'
import Spinner from './Spinner'

export default function Modal({ isOpen, onClose, children,
                                title, size = 'medium',
                                hasButtons, savingDisabled,
                                onSave,
                                isSaving } : ModalProps) {
    const isDark = useAppSelector((state) => state.theme.data.isDark);

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
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 12000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                backdropFilter: 'blur(40px)'
            }}>
            <div
                style={{
                    backgroundColor: isDark ? 'rgba(13,51,64,0.5)' : 'rgba(232, 231, 231, 0.8)',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: getSizeClass(size),
                    position: 'relative',
                    animation: 'fadeIn 0.3s ease-in-out',
                }}
                onClick={(e) => e.stopPropagation()}>

                    <div style={{ display: 'flex', justifyContent: 'space-between',
                                  padding: '20px 22px 18px 30px',
                                  boxShadow: '0 4px 25px rgba(0, 0, 0, 0.2)',
                                  background: isDark ?
                                                    'var(--white-semitransparent-gradient)'
                                                    :
                                                    'var(--navbar-gradient)',
                                  borderRadius: '20px 20px 0px 0px'}}>
                       {/* Header */}
                        <h2 style={{ color: 'var(--foreground)', fontSize: '2.1rem', fontWeight: '0' }}>
                                {title}
                        </h2>

                        {/* Close button */}
                        <button
                            style={{
                                color: isDark ? 'rgb(24, 83, 102)' : 'rgba(0, 0, 0, 0.58)',
                                cursor: 'pointer',
                                background: isDark ?
                                                      'linear-gradient(to top, rgba(134, 134, 134, 1), rgb(255, 255, 255))'
                                                    : 'linear-gradient(0deg,#31a8c9 0%, #c1ecfc 100%)',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                padding: '',
                                width: '40px',
                                height: '30px',
                                borderRadius: '10px'
                            }}
                            onClick={onClose}
                            aria-label="Close Modal">
                            x
                        </button>
                    </div>

                    {/* Body */}
                    <div style={{ display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'column',
                                  minHeight: '300px' }}>
                        {children}
                    </div>

                    {/* Footer */}
                    <section>
                            <hr style={{ opacity: '0.07'}} />
                            <div style={{ display: 'flex',
                                      padding: '25px 25px 40px 25px',
                                      gap: '10px',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                                      borderRadius: '0px 0px 20px 20px',
                         }}>
                            {hasButtons ?
                                <div style={ { display: 'flex', gap: '10px'}}>
                                    <button className='button is-green text-white'
                                            style={{ fontWeight: '500',
                                                     cursor: savingDisabled ? 'not-allowed' : 'pointer',
                                                     opacity: savingDisabled ? '0.3' : '1' }}
                                            disabled={savingDisabled}
                                            type="submit"
                                            onClick={onSave}>
                                                {isSaving && <Spinner className="mr-2" /> }
                                                {isSaving ? 'Saving...' : 'Save'}
                                            </button>
                                    <button className='button is-red text-white'
                                            style={{ fontWeight: '500', cursor: 'pointer' }}
                                            onClick={onClose}>Cancel</button>
                                </div>

                            : null}
                        </div>
                    </section>
            </div>
        </div>,
    document.body
);

}