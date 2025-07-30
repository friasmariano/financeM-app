'use client'

import { useSessionGuard } from "@/hooks/useSessionGuard"
import { BudgetService } from '@/services/BudgetService'
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import BudgetResponse from "@/types/responses/BudgetResponse";
import { apiErrorHandler } from "@/utils/apiErrorHandler";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'
import { useAppSelector } from "@/lib/hooks";
import { BudgetRequest } from "@/types/requests/BudgetRequest";
import { ToastContainer, toast } from "react-toastify";
import { handleDeleteError } from "@/utils/handleDeleteError";
import BudgetIcon from "@/components/BudgetIcon";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { FormMode } from "@/types/FormMode";
import Modal from "@/components/Modal";

export default function BudgetsClient({ isAuthenticated }: { isAuthenticated: boolean }) {
    useSessionGuard(isAuthenticated);

    const isDark = useAppSelector((state) => state.theme.data.isDark);

    const router = useRouter();
    const [errors, setErrors] = useState<string[]>([]);
    const service = new BudgetService();

    const [budgets, setBudgets] = useState<BudgetResponse[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<FormMode>("create");

    const getAll = async () => {
        try {
            const result: ApiDefaultResponse<BudgetResponse[]> = await service.getAll();

            if (apiErrorHandler(result, { router, setErrors, setIsModalOpen }))
                return;

            setBudgets(result.data);
            console.log(result.data);
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

    const formik = useFormik({
        initialValues: {
            name: '',
            limitAmount: 0,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                    .required()
                    .min(3, 'Name must be at least 3 characters long')
                    .max(20, 'Name must be at most 20 characters long'),
            limitAmount: Yup.number()
                            .required()
                            .min(0, 'Limit amount must be greater than 0')
                            .max(99999999.99, 'Limit amount must be less than 99999999.99')
        }),
        validateOnMount: true,
        onSubmit: async (values, { setSubmitting }) => {
            if (formMode === 'create') {
                await create(setSubmitting, values);

                return;
            }

            if (formMode === 'edit') {
                // await update(setSubmitting, budgetId, values);
            }
        }
    });

    useEffect(() => {
        getAll();
    }, []);

    return(
        <section style={{ display: 'flex',
                          padding: '20px 50px 0px 20px',
                          maxHeight: '72vh', overflow: 'scroll',
                          flexDirection: 'column' }}>

            <div className="flex justify-between py-[10px] pb-[40px]">
                {/* Blank space */}
                <div></div>

                <button className="cursor-pointer px-[35px] py-[9px] rounded-[20px]"
                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                background: 'var(--white-semitransparent-gradient)',
                                height: '45px' }}
                                onClick={() => setIsModalOpen(true) }>
                <i className="bi bi-plus-circle mr-2"></i>
                    New Budget
                </button>
            </div>

            <div style={{ display: 'flex',
                          gap: '60px',
                          flexWrap: 'wrap',
                          padding: '20px 0px 0px 10px' }}>
                <BudgetIcon
                    title="New Home"
                    onClick={() => alert("Hello")} />
                <BudgetIcon title="Emergency Fund" />
                <BudgetIcon title="Car" />
            </div>

            <ToastContainer theme={isDark ? 'dark' : 'light' } />

            <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title='Budget'
                    hasButtons={true} size='medium'

                    onSave={formik.handleSubmit}
                    savingDisabled={!formik.isValid || formik.isSubmitting}
                    isSaving={formik.isSubmitting}>
                <div>
                    <BudgetIcon
                        title=""
                        fillIcons={true}
                        allowHoverEffect={false} />
                </div>
            </Modal>
        </section>
    )
}