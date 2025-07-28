'use client'

import { useSessionGuard } from "@/hooks/useSessionGuard"
import { BudgetService } from '@/services/BudgetService'
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import BudgetResponse from "@/types/responses/BudgetResponse";
import { apiErrorHandler } from "@/utils/apiErrorHandler";
import { useRouter } from "next/navigation";
import { useState } from 'react'
import { useAppSelector } from "@/lib/hooks";
import { BudgetRequest } from "@/types/requests/BudgetRequest";
import { ToastContainer, toast } from "react-toastify";
import { handleDeleteError } from "@/utils/handleDeleteError";

export default function BudgetsClient({ isAuthenticated }: { isAuthenticated: boolean }) {
    useSessionGuard(isAuthenticated);

    const isDark = useAppSelector((state) => state.theme.data.isDark);

    const router = useRouter();
    const [errors, setErrors] = useState<string[]>([]);
    const service = new BudgetService();

    const [budgets, setBudgets] = useState<BudgetResponse[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAll = async () => {
        try {
            const result: ApiDefaultResponse<BudgetResponse[]> = await service.getAll();

            if (apiErrorHandler(result, { router, setErrors, setIsModalOpen }))
                return;

            setBudgets(result.data);
        } catch(error: any) {
            toast.error('Error getting budgets.');
            console.log(error);
        }
    }

    const create = async (setSubmitting: (isIsSubmitting: boolean) => void, values: BudgetRequest) => {
        try {
            const result = await service.create(values);

            if (apiErrorHandler(result, { router, setErrors, setIsModalOpen }))
                return;

            setIsModalOpen(false);
            toast.success(result.message.toString());

            await getAll();

        } catch(error: any) {
            toast.error('Error creating the pot');
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    const update = async (setSubmitting: (isSubmitting: boolean) => void, id: number, values: BudgetRequest) => {
        try {
            const result =  await service.update(id, values);

            if (apiErrorHandler(result, { router, setErrors, setIsModalOpen }))
                return;

            toast.success(result.message.toString());
            setIsModalOpen(false);

            await getAll();

        } catch(error: any) {
            toast.error('Error updating the pot');
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    const deleteBudget = async (id: number) => {
        try {
            const result = await service.delete(id);

            if (handleDeleteError(result, { router, toast, setIsModalOpen }))
                return;

            toast.success('Item deleted successfully!');
            await getAll();

        } catch (error: any) {
            toast.error('Error deleting the budget');
            console.log(error);
        } finally {
            //
        }
    }

    return(
        <section style={{ display: 'flex',
                          padding: '20px 50px 0px 20px',
                          maxHeight: '72vh', overflow: 'scroll'}}>

            <div style={{ display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0px' }}>
                <div style={{ position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'}}>
                    <i className="bi bi-folder"
                       style={{ fontSize: '5.5rem',
                                background: 'linear-gradient(0deg, rgba(255, 255, 255, 0), #ffffffff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                opacity: '0.5',
                                textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
                            }}></i>
                    <i className="bi bi-pie-chart"
                       style={{ position: 'absolute',
                                fontSize: '1.5rem',
                                transform: 'translate(0px, 2px)',
                                background: 'linear-gradient(0deg, rgba(255, 255, 255, 0), #ffffffff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                opacity: '0.6',
                                textShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
                            }}></i>
                </div>

                <p style={{ transform: 'translate(0px, -10px)' }}>New Home</p>
            </div>
        </section>
    )
}