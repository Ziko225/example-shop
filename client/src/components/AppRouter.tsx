import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, notFoundPath, publicRoutes } from "../routes";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppRouter = () => {
    const auth = useContext(AuthContext);

    return (
        <Routes>
            {auth?.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} Component={Component} />
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} Component={Component} />
            ))}
            <Route path="*" element={<Navigate replace to={notFoundPath} />} />
        </Routes>
    );
};

export default AppRouter;