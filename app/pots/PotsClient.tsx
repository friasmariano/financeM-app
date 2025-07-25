"use client";

import { useEffect, useState } from "react";
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { Pot } from "@/types/Pot";
import Modal from "@/components/Modal";
import PotCard from "@/components/PotCard";
import { useFormik } from "formik";
import {ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup";
import { FormMode } from "@/types/FormMode";
import { useAppSelector } from "@/lib/hooks";
import { PotService } from "@/services/PotService";
import { formatErrorMessages } from "@/utils/formatErrorMessages";
import { formatError, set } from "zod";
import { useRouter } from "next/navigation";
import hasErrorMessages from "@/utils/hasErrorMessages";
import { PotRequest } from "@/types/requests/PotRequest";
import PotResponse from "@/types/responses/PotResponse";
import { apiErrorHandler } from "@/utils/apiErrorHandler";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function PotsClient() {
  const [formMode, setFormMode] = useState<FormMode>('create');
  const isDark = useAppSelector((state) => state.theme.data.isDark);
  const [modalTitle, setModalTitle] = useState('');
  const [potId, setPotId] = useState<number>(0);
  const [potName, setPotName] = useState<string>('');

  const service = new PotService();
  const router = useRouter();

  const [errors, setErrors] = useState<string[]>([]);

  const [pots, setPots] = useState<PotResponse[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const getAll = async () => {
    try {
      const result: ApiDefaultResponse<PotResponse[]> = await service.getAll();

      if (apiErrorHandler(result, { router, setErrors, setIsModalOpen }))
        return;

      setPots(result.data);
    } catch (error: any) {
        toast.error('Error getting pots');
        console.log(error);
    }
  }

  const create = async (setSubmitting: (isSubmitting: boolean) => void, values: PotRequest) => {
    try {
      const result = await service.create(values);

      if (apiErrorHandler(result, { router, setErrors, setIsModalOpen }))
        return;

      toast.success(result.message.toString());
      setIsModalOpen(false);

      await getAll();

    } catch (error: any) {
        toast.error('Error creating the pot');
        console.log(error);
    } finally {
        setSubmitting(false);
    }
  }

  const update = async (setSubmitting: (isSubmitting: boolean) => void, id: number, values: PotRequest) => {
    try {
      const result = await service.update(id, values);

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

  const deletePot = async(id: number) => {
    try {
      const result = await service.delete(id);

      if (!result.success) {
          if (result.status === 401) {
              setIsModalOpen?.(false);
              toast.error(result.message.toString());

              setTimeout(() => { router.push('/login') }, 3000);
              return;
          }

          if (!hasErrorMessages(result.data)) {
              toast.error(result.message.toString());
              return;
          }

          Object.entries(result.data).forEach(([key, message]) => {
            if (typeof message === 'string') {
              toast.error(message);
            }
          });

          console.log(result);

          return;
        }

      toast.success(result.message.toString());

      await getAll();

    } catch (error: any) {
      toast.error('Error deleting the pot.');
      console.log(error);
    } finally {
      //
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      goalAmount: '',
      currentAmount: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
               .required('Name is required')
               .min(3, 'Name must be at least 3 characters')
               .max(20, 'Name must be at most 20 characters'),
      goalAmount: Yup.number()
                     .required('Goal amount is required')
                     .min(0, 'Goal amount must be greater than 0')
                     .max(99999999.99, 'Goal amount is too high'),
      currentAmount: Yup.number()
                        .required('Current amount is required')
                        .min(0, 'Current amount must be greater than 0')
                        .max(99999999.99, 'Current amount is too high'),
    }),
    validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
        if (formMode === 'create') {
          await create(setSubmitting, values);

          return;
        }

        if (formMode === 'edit') {
          await update(setSubmitting, potId, values);
        }
    }
  })

  const createPot = () => {
    if (pots.length >= 20) {
      toast.info('You can only create up to 20 pots.');
      return;
    }

    setFormMode('create');
    setModalTitle('New Pot');

    formik.setValues({
      name: '',
      goalAmount: '',
      currentAmount: ''
    });

    formik.resetForm();

    setIsModalOpen(true);
  };

  const editPot = (potId: number) => {
    formik.resetForm();

    const potToEdit = pots.find(p => p.id === potId);

    if (!potToEdit) {
      toast.error('Pot not found.');
      return;
    }

    setPotId(potToEdit.id);
    setFormMode('edit');
    setModalTitle('Edit Pot');
    setPotId(potId);

    formik.setValues({
      name: potToEdit.name,
      goalAmount: potToEdit.goalAmount.toString(),
      currentAmount: potToEdit.currentAmount.toString()
    });

    setIsModalOpen(true);
  }

  const deletePotItem = (id: number, name: string) => {
    const potToEdit = pots.find(p => p.id === id);

    if (!potToEdit) {
      toast.error('Pot not found.');
      return;
    }

    setPotId(id);
    setPotName(name);

    // Open confirm dialog
    setConfirmOpen(true);
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <section style={{ padding: '20px 50px 0px 20px', maxHeight: '72vh', overflow: 'scroll'}}>
      <div className="flex justify-between py-[10px] pb-[40px]">
        <div>
          <p>
            <span style={{ fontSize: '2rem', fontWeight: '500' }}>Total</span>
            <span style={{ marginLeft: '10px', fontSize: '1.2rem' }}>{pots.length}/20</span>
          </p>
        </div>

        {/* Blank space */}
        <div></div>

        <button className="cursor-pointer px-[35px] py-[9px] rounded-[20px]"
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                         background: 'var(--white-semitransparent-gradient)',
                         height: '45px' }}
                onClick={createPot}>
          <i className="bi bi-plus-circle mr-2"></i>
          New Pot
        </button>
      </div>

      <div>
        {/* Pots */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '0px 0px 60px 0px' }}>
          {pots.map((pot) => (
            <div key={pot.id}>
                <PotCard
                  id={pot.id}
                  name={pot.name}
                  goalAmount={pot.goalAmount}
                  currentAmount={pot.currentAmount}
                  onEdit={() => {
                      editPot(pot.id);
                    }
                  }
                  onDelete={() => {
                    deletePotItem(pot.id, pot.name);
                  }}
                />
            </div>
          ))}
        </div>
      </div>

      <Modal
             isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             title={modalTitle}
             hasButtons={true} size='medium'

             onSave={formik.handleSubmit}
             savingDisabled={!formik.isValid || formik.isSubmitting}
             isSaving={formik.isSubmitting}>

            <div style={{ display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          gap: '20px',
                          minHeight: '300px',
                          padding: '50px 0px 40px 0px'}}>
              <form onSubmit={formik.handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center'}}>
                  <div style={{ display: 'flex',
                                margin: '0px 0px 25px 0px',
                                flexDirection: 'column',
                                alignItems: 'center' }}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...formik.getFieldProps('name')}
                    />
                    <div className={` text-sm ${isDark ? 'text-red-400': 'text-red-500'}`}>
                      {!!formik.errors.name && formik.touched.name && (<p>{formik.errors.name}</p>)}
                    </div>
                  </div>

                  <div style={{ display: 'flex',
                                margin: '0px 0px 25px 0px',
                                flexDirection: 'column',
                                alignItems: 'center' }}>
                    <label htmlFor="goalAmount">Goal amount</label>
                    <input
                        id="goalAmount"
                        type="number"
                        {...formik.getFieldProps('goalAmount')}
                    />
                    <div className={` text-sm ${isDark ? 'text-red-400': 'text-red-500'}`}>
                      {!!formik.errors.goalAmount && formik.touched.goalAmount && (<p>{formik.errors.goalAmount}</p>)}
                    </div>
                  </div>


                  <div style={{ display: 'flex',
                                margin: '0px 0px 25px 0px',
                                flexDirection: 'column',
                                alignItems: 'center' }}>
                    <label htmlFor="currentAmount">Current amount</label>
                    <input
                        id="currentAmount"
                        type="number"
                        {...formik.getFieldProps('currentAmount')}
                    />
                    <div className={` text-sm ${isDark ? 'text-red-400': 'text-red-500'}`}>
                      {!!formik.errors.currentAmount && formik.touched.currentAmount && (<p>{formik.errors.currentAmount}</p>)}
                    </div>
                  </div>
                </div>

                {errors.length > 0 ? (
                    <div
                      className={`
                        text-sm text-center
                        ${isDark ? 'text-red-400' : 'text-red-500'}
                        transition-opacity duration-500
                        opacity-100
                      `}>
                        {errors.map((msg, index) => (
                          <p key={index}>{msg}</p>
                        ))}
                    </div>
                  ) : (
                    <div
                      className="transition-opacity duration-500 opacity-0 h-0 overflow-hidden"></div>
                )}


              </form>
            </div>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete Pot"
        onSave={() => {
          deletePot(potId);
          setConfirmOpen(false);
        }}
        isSaving={false}>
          <p>Do you want to delete pot</p>
          <p style={{}}>
            <span style={{ fontWeight: '500', fontSize: '2rem'  }}>{potName}</span>
            <span style={{ fontSize: '2rem'  }}> ?</span>
          </p>
      </ConfirmDialog>

      <ToastContainer theme={isDark ? 'dark' : 'light' } />
    </section>
  );
}
