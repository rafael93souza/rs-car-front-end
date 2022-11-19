import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "../Contexts/GlobalContexts";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import { getItem } from "../utils/storage";

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem("token");
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function VerifyLoginUser({ redirectTo }) {
    const isAuthenticated = getItem("token");
    return isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet />;
}

function Routers() {

    return (
        <GlobalProvider>
            <Routes>
                <Route element={<VerifyLoginUser redirectTo='/dashboard' />}>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Route>

                <Route element={<ProtectedRoutes redirectTo='/sign-in' />} >
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </GlobalProvider>

    )
}

export default Routers;