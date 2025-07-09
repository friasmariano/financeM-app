"use client";

import { potService } from "@/services/potService";


export default function PotsClient() {
  const createPot = async () => {
    const newPot = {
      name: "Camry 2021",
      goalAmount: "1400000",
      currentAmount: "0",
    };

    try {
      const response = await potService.create(newPot);

      if (!response) {
        alert("I couldn't create the pot");
        return;
      }

      console.log(response)
      // alert("Pot created successfully!");
    } catch (error: any) {
      console.log("Error on pot creation", error);
      alert("There was an error creating the pot");
    }
  };

  return (
    <button className="button is-green"
            style={{ cursor: 'pointer' }}
            onClick={createPot}>
      Create
    </button>
  );
}
