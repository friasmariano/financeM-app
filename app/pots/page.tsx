
import getAuthenticatedUser from "@/lib/auth";
import { redirect } from "next/navigation";
import PotsClient from "./PotsClient";

export default async function PotsPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section>

      <div style={{ margin: "20px 0px 0px 30px" }}>
        <PotsClient />
      </div>
    </section>
  );
}
