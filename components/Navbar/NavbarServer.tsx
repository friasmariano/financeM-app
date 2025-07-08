
import getAuthenticatedUser from "@/lib/auth";
import NavbarNew from "./NavbarNew";

export default async function NavbarServer() {

    const user = await getAuthenticatedUser();
    const isAuthenticated = user !== null ? true : false;

    return <NavbarNew isAuthenticated={isAuthenticated} />;
}