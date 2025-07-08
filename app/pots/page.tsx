
import { potService } from "@/services/potService"
import getAuthenticatedUser from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PotsPage() {
    const user = await getAuthenticatedUser();

      if(!user) {
        redirect('/login');
      }

    const createPot = async () => {
        const newPot = {
            name: "",
            goalAmount: "",
            currentAmount: ""
        }

        try {
            const response = await potService.create(newPot);

            if (!response) {
                alert("I couldn't create the pot");
                return;
            }
        } catch (error: any) {
            console.log("Error on pot creation", error);
            alert("There was an error creating the pot");
        }
    }

    return(
        <section>
            <div style={{ height: '230px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: 'auto',
                          right: '0px',
                          background: 'var(--sidebar-gradient', backdropFilter: 'blur(25px)' }}>

            </div>

            <button className="button is">Create</button>
        </section>
    )
}