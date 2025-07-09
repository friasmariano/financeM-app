
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
      <div
        style={{
          height: "258px",
          display: "flex",
          margin: "auto",
          gap: "5px",
          right: "0px",
          flexDirection: "column",
          padding: "75px 0px 0px 70px",
          background: "var(--sidebar-gradient",
          backdropFilter: "blur(40px)",
          boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 style={{ fontSize: "2.6rem" }}>Pots</h1>
        <h2 style={{ fontSize: "1.23rem" }}>
          Easily create and manage pots to budget, save & more
        </h2>
      </div>

      <div style={{ margin: "20px 0px 0px 30px" }}>
        <PotsClient />
      </div>
    </section>
  );
}
