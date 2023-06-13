import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
    const isAuth = false;

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} Component={Component} />
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} Component={Component} />
            ))}
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    );
};

export default AppRouter;