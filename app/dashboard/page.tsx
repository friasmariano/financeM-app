
import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  if(!user) {
    redirect('/login');
  }

  return(
    <section>
      <div style={{ margin: '20px 0px 0px 30px' }}>
        <DashboardClient isAuthenticated={user ? true: false } />
      </div>
    </section>
  )

}
