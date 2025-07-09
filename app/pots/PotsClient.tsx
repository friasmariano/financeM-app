"use client";

import { potService } from "@/services/potService";

export default function PotsClient() {
  const createPot = async () => {
    const newPot = {
      name: "Remote set up Update",
      goalAmount: "200000",
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

  const getRoles = async () => {
      fetch("http://localhost:8080/api/roles/getAll", {
        method: "GET",
        credentials: "include", // include cookies for authentication
        headers: {
          "Accept": "application/json"
        }
      })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log("Roles data:", data);
      })
      .catch(error => {
        console.warn("Error fetching roles:", error);
      });
  }

  return (
    <button className="button is-green"
            style={{ cursor: 'pointer' }}
            onClick={createPot}>
      Create
    </button>
  );
}
