"use client";

import { useEffect, useState } from "react";
import { potService } from "@/services/potService";
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { Pot } from "@/types/Pot";
import Modal from "@/components/Modal";
import PotCard from "@/components/PotCard";
import { useFormik } from "formik";
import {ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup";
import { FormMode } from "@/types/FormMode";
import { useAppSelector } from "@/lib/hooks";

export default function PotsClient() {
  const [formMode, setFormMode] = useState<FormMode>('create');
  const isDark = useAppSelector((state) => state.theme.data.isDark);
  const [modalTitle, setModalTitle] = useState('');
  const [potId, setPotId] = useState<number>(0);

  const [pots, setPots] = useState<Pot[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPots = async () => {
    try {
      const response: ApiDefaultResponse<Pot[]> = await potService.getAll();

      if (!response) {
        alert("I couldn't get the pots");
        return;
      }

      setPots(response.data);

    } catch(error: any) {
        console.log("Error recoverying pots", error);
        alert("There was an error getting the pots");
    }
  }

  const createPot = () => {
    setFormMode('create');
    setModalTitle('New Pot');
    setIsModalOpen(true);
  };

  const editPot = (potId: number) => {
    setFormMode('edit');
    setModalTitle('Edit Pot');
    setPotId(potId);
    setIsModalOpen(true);
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
                     .min(0, 'Goal amount must be greater than 0'),
      currentAmount: Yup.number()
                        .required('Current amount is required')
                        .min(0, 'Current amount must be greater than 0')
    }),
    validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
        if (formMode === 'create') {
          try {
            const potResponse: ApiDefaultResponse<Pot> = await potService.create(values);

            if (!potResponse) {
              toast.error("Pot creation failed.");
            }

            toast.success("Pot created successfully!");

          }
          catch(error: any) {
            console.log("Error on pot creation", error);

            toast.error("There was an error creating the pot");
          }
        }

        if (formMode === 'edit') {
          try {
            const potResponse: ApiDefaultResponse<Pot> = await potService.update(1, values);

            if (!potResponse) {
              toast.error("Pot edition failed.");
            }

            toast.success("Pot updated successfully!");

          }
          catch(error: any) {
            console.log("Error on pot edition", error);

            toast.error("There was an error editing the pot");
          }
        }
    }
  })

  useEffect(() => {
    getPots();
  }, []);

  return (
    <section style={{ padding: '20px 50px 0px 30px'}}>
      <div className="flex justify-between py-[10px] pb-[40px]">
        {/* Blank space */}
        <div></div>

        <button className="cursor-pointer px-[35px] py-[9px] rounded-[20px]"
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                         background: 'var(--white-semitransparent-gradient)' }}
                onClick={createPot}>
          <i className="bi bi-plus-circle mr-2"></i>
          New Pot
        </button>
      </div>

      <div>
        {/* Pots */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
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
                        type="name"
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
                        type="goalAmount"
                        {...formik.getFieldProps('goalAmount')}
                    />
                    <div className="text-sm text-red-500">
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
                        type="currentAmount"
                        {...formik.getFieldProps('currentAmount')}
                    />
                    <div className="text-sm text-red-500">
                      {!!formik.errors.currentAmount && formik.touched.currentAmount && (<p>{formik.errors.currentAmount}</p>)}
                    </div>
                  </div>
                </div>
              </form>
            </div>
      </Modal>

      <ToastContainer />
    </section>
  );
}
