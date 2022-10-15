/**
 * TODO:
 * 1. Store the access_token, refresh_token, role in the store.
 * 2. Check if the access_token is valid and exists.
 * 3. If the access_token is valid, then return the Outlet otherwise return the Login/Unauthorized component.
 * 
 * @assigned aayushchugh
 */

import { Outlet } from "react-router-dom"

const ProtectedRoutes = () => {

    return <Outlet />;
}

export default ProtectedRoutes;