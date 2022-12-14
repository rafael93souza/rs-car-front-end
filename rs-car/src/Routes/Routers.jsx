import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { CarsProvider } from "../Contexts/CarsContexts";
import { GlobalProvider } from "../Contexts/GlobalContexts";
import { SalesProvider } from "../Contexts/SalesContexts";
import { SellersProvider } from "../Contexts/SellersContexts";
import Cars from "../pages/Cars";
import Dashboard from "../pages/Dashboard";
import Sales from "../pages/Sales";
import Sellers from "../pages/Sellers";
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
            <SellersProvider>
                <SalesProvider>
                    <CarsProvider>
                        <Routes>
                            <Route element={<VerifyLoginUser redirectTo='/dashboard' />}>
                                <Route path="/" element={<SignIn />} />
                                <Route path="/sign-in" element={<SignIn />} />
                            </Route>
                            <Route element={<ProtectedRoutes redirectTo='/sign-in' />} >
                                <Route path="/dashboard" element={<Header />} >
                                    <Route path="" element={<Dashboard />} />
                                </Route>
                                <Route path="/carros" element={<Header />} >
                                    <Route path="" element={<Cars />} />
                                </Route>
                                <Route path="/vendas" element={<Header />} >
                                    <Route path="" element={<Sales />} />
                                </Route>
                                <Route path="/vendedores" element={<Header />} >
                                    <Route path="" element={<Sellers />} />
                                </Route>
                            </Route>
                        </Routes>
                    </CarsProvider>
                </SalesProvider>
            </SellersProvider>
        </GlobalProvider>

    )
}

export default Routers;