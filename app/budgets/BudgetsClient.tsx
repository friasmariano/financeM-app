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
        <div style={{ padding: '20px 50px 0px 20px', maxHeight: '72vh', overflow: 'scroll'}}>
            Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
    )
}