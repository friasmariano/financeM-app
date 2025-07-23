'use client'

import { useAppSelector } from "@/lib/hooks";
import { PotProps } from "@/types/PotProps";

export default function PotCard({ id, name, goalAmount, currentAmount, onEdit, onDelete }: PotProps) {

    const isDark = useAppSelector((state) => state.theme.data.isDark);

    return(
        <div id={`${id}`}
            className={`${isDark ? 'bg-[rgba(13,51,64,0.7)]' : 'bg-[rgba(255,255,255,1)]'}`}
             style={{ width: '300px', height: '170px',
                      padding: '20px 20px 30px 30px',
                      borderRadius: '20px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
             }}>

        <h2 className={`${isDark ? 'text-white' : 'text-[#10556b]'} font-semibold mb-2`} style={{ fontSize: '1.35rem' }}>
            {name}
        </h2>
        <p className="text-sm mt-1"
            style={{ opacity: '0.5' }}><b className="mr-1">Goal</b> {goalAmount}</p>
        <p className="text-sm mt-1"
            style={{ opacity: '0.5' }}><b className="mr-1">Current Amount</b>{currentAmount}</p>

        <div style={{ display: 'flex', gap: '5px' }}>
        <button style={{ background: 'var(--soft-brown-gradient)',
                            margin: '13px 0px 0px 0px',
                            padding: '5px 20px 5px 20px',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            cursor: 'pointer',
                            color: 'white'}}
                            onClick={() => onEdit() }>
            <i className="bi bi-pencil-square"></i>
        </button>
        <button style={{ background: 'var(--soft-red-gradient)',
                            margin: '13px 0px 0px 0px',
                            padding: '5px 20px 5px 20px',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            cursor: 'pointer',
                            color: 'white'}}
                            onClick={() => onDelete() }>
            <i className="bi bi-trash3"></i>
        </button>
        </div>
    </div>
    );
}