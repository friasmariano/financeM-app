"use client";

import { useEffect, useState } from "react";
import { potService } from "@/services/potService";
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { Pot } from "@/types/Pot";


export default function PotsClient() {
  const [pots, setPots] = useState<Pot[]>([]);

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
      <div style={{ display: "flex", gap: '20px', padding: '20px' }}>
        <button className="button is-green"
                style={{ cursor: 'pointer' }}
                onClick={createPot}>
          Create
        </button>
        <button className="button is-green"
                style={{ cursor: 'pointer' }}
                onClick={getPots}>
          Get Pots
        </button>
      </div>

      <div>
        <table className="table-auto w-full mt-4 rounded-lg overflow-hidden"
               style={{ border: "none" }}>
          <thead>
            <tr style={{ background: 'var(--theme-button-gradient)' }}>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Goal Amount</th>
              <th className="px-4 py-2">Current Amount</th>
            </tr>
          </thead>
          <tbody>
              {pots.map((pot) => {
                return (
                  <tr key={pot.id} className="border-t">
                    <td className="px-4 py-2">{pot.name}</td>
                    <td className="px-4 py-2">{pot.goalAmount}</td>
                    <td className="px-4 py-2">{pot.currentAmount}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
