"use client";

import { useEffect, useState } from "react";
import { potService } from "@/services/potService";
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { Pot } from "@/types/Pot";
import Modal from "@/components/Modal";

export default function PotsClient() {
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

  const createPot = async () => {
    const newPot = {
      name: "Trip to Israel",
      goalAmount: "600000",
      currentAmount: "0",
    };

    try {
      const response = await potService.create(newPot);

      if (!response) {
        alert("I couldn't create the pot");
        return;
      }

      // alert("Pot created successfully!");
    } catch (error: any) {
      console.log("Error on pot creation", error);
      alert("There was an error creating the pot");
    }
  };

  useEffect(() => {
    getPots();
  }, []);

  return (
    <section style={{ padding: '20px 50px 0px 30px'}}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: '10px 0px 40px 0px'}}>
        <div></div>
        <button style={{ cursor: 'pointer',
                         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                         padding: '9px 35px 9px 35px',
                         borderRadius: '20px',
                         background: 'var(--white-semitransparent-gradient)' }} onClick={() => setIsModalOpen(true)}>
          <i className="bi bi-plus-circle mr-2"></i>New Pot
        </button>
      </div>

      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {pots.map((pot) => (
            <div key={pot.id}
                 style={{ width: '300px', height: '170px',
                          padding: '20px 20px 30px 30px',
                          borderRadius: '20px',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                  }}>

                <h2 className="font-semibold mb-2" style={{ fontSize: '1.35rem' }}>{pot.name}</h2>
                <p className="text-sm mt-1"
                   style={{ opacity: '0.5' }}><b className="mr-1">Goal</b> {pot.goalAmount}</p>
                <p className="text-sm mt-1"
                   style={{ opacity: '0.5' }}><b className="mr-1">Current Amount</b>{pot.currentAmount}</p>

              <div style={{ display: 'flex', gap: '5px' }}>
                <button style={{ background: 'var(--soft-brown-gradient)',
                                 margin: '13px 0px 0px 0px',
                                 padding: '5px 20px 5px 20px',
                                 borderRadius: '20px',
                                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                 cursor: 'pointer',
                                 color: 'white'}}>
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button style={{ background: 'var(--soft-red-gradient)',
                                 margin: '13px 0px 0px 0px',
                                 padding: '5px 20px 5px 20px',
                                 borderRadius: '20px',
                                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                 cursor: 'pointer',
                                 color: 'white'}}>
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Welcome!</h2>
        <p className="mb-4">This is a custom modal component.</p>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </section>
  );
}
