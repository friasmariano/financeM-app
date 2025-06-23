
import getAuthenticatedUser from "@/lib/auth";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
    const user = await getAuthenticatedUser();
    const isAuthenticated = user != null ? true : false;

    console.log("NavbarServer: isAuthenticated:", isAuthenticated);

    return <NavbarClient isAuthenticated={isAuthenticated} />;
}