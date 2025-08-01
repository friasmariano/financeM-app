'use client'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';
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
                    hasButtons={false} size='large'

                    onSave={formik.handleSubmit}
                    savingDisabled={!formik.isValid || formik.isSubmitting}
                    isSaving={formik.isSubmitting}>
                <div style={{ display: 'flex',
                              justifyContent: 'left',
                              alignItems: 'left',
                              width: '100%',
                              height: '245px',
                              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0),  rgba(0, 0, 0, 0.2))',
                              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)' }}>
                    {/* <div></div> */}
                    <div style={{ padding: '39px 30px 0px 50px' }}>
                        <BudgetIcon
                            title=""
                            fillIcons={true}
                            allowHoverEffect={false} />
                    </div>
                    <div style={{ display: 'flex',
                                  flexDirection: 'column',
                                  padding: '35px 0px 0px 30px',
                                  borderLeft: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(24, 83, 102, 0.2)' }}>
                        <p style={{ margin: '0px 0px 7px 14px',
                                    fontSize: '1.9rem',
                                    fontWeight: '450' }}>New Home</p>
                        {/* <p style={{ margin: '0px 0px 4px 14px' }}>Limit Amount</p> */}

                        <div style={{ display: 'flex',
                                      flexDirection: 'column',
                                      gap: '3px' }}>
                            <input type="text"
                                    name="name"
                                    placeholder="Name"
                                    style={{ width: '240px', height: '40px', margin: '0px' }} />
                            <input type="text"
                                name="limitAmount"
                                placeholder="Limit Amount"
                                style={{ width: '240px', height: '40px', margin: '0px' }} />
                            <button style={{ width: '100px',
                                             height: '32px',
                                             borderRadius: '30px',
                                             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                             margin: '9px 0px 0px 0px' }}
                                    className='is-green'>Save</button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex',
                                  alignItems: 'left',
                                  gap: '20px',
                                  margin: '25px 0px 40px 0px' }}>
                        {/* Related pots: */}

                        <div style={{ width: '350px',
                                    //   height: '50px',
                                      borderRadius: '20px',
                                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.075))',
                                      boxShadow: '0 3px 25px rgba(0, 0, 0, 0.1)',
                                      display: 'flex', padding: '8px 20px 0px 23px',
                                      flexDirection: 'column' }}>

                            <div style={{ display: 'flex', padding: '10px 0px 0px 10px' }}>
                                <i className="bi bi-piggy-bank-fill" style={{ fontSize: '1.5rem' }}></i>
                                <p style={{ padding: '4px 0px 0px 10px', fontSize: '1.2rem' }}>New Home</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0px 25px 30px' }}>
                                <p><b>Current Amount</b><span className="ml-2">1500.00</span></p>
                                <p><b>Goal</b><span className="ml-2">2000.00</span></p>
                            </div>

                            <div style={{ display: 'flex',
                                          width: '50px',
                                          height: '40px',
                                          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(233, 11, 11, 0.8), rgba(233, 11, 11, 1))',
                                          margin: '0px 0px 25px 30px',
                                          padding: '20px',
                                          borderRadius: '15px',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}>
                                <FontAwesomeIcon icon={faLinkSlash} style={{ fontSize: '0.9rem' }} />
                            </div>
                        </div>

                        <div style={{ width: '350px',
                                    //   height: '50px',
                                      borderRadius: '20px',
                                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.075))',
                                      boxShadow: '0 3px 25px rgba(0, 0, 0, 0.1)',
                                      display: 'flex', padding: '8px 20px 0px 23px',
                                      flexDirection: 'column' }}>

                            <div style={{ display: 'flex', padding: '10px 0px 0px 10px' }}>
                                <i className="bi bi-piggy-bank-fill" style={{ fontSize: '1.5rem' }}></i>
                                <p style={{ padding: '4px 0px 0px 10px', fontSize: '1.2rem' }}>New Home</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0px 25px 30px' }}>
                                <p><b>Current Amount</b><span className="ml-2">1500.00</span></p>
                                <p><b>Goal</b><span className="ml-2">2000.00</span></p>
                            </div>

                            <div style={{ display: 'flex',
                                          width: '50px',
                                          height: '40px',
                                          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(233, 11, 11, 0.8), rgba(233, 11, 11, 1))',
                                          margin: '0px 0px 25px 30px',
                                          padding: '20px',
                                          borderRadius: '15px',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}>
                                <FontAwesomeIcon icon={faLinkSlash} style={{ fontSize: '0.9rem' }} />
                            </div>
                        </div>
                    </div>
            </Modal>
        </section>
    )
}