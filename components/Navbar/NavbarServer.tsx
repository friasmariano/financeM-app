
import NavbarClient from "./NavbarClient";
import getAuthenticatedUser from "@/lib/auth";

export default async function NavbarServer() {

    const user = await getAuthenticatedUser();
    const isAuthenticated = user !== null ? true : false;

    return <NavbarClient isAuthenticated={isAuthenticated} />;
}