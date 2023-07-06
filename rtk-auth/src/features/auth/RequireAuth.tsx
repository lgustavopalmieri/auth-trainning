import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentToken } from "./authSlice";

interface IRequireAuthProps {
}

const RequireAuth: React.FunctionComponent<IRequireAuthProps> = (props) => {
    const token = useAppSelector(selectCurrentToken)
    const location = useLocation()
    return (
        token 
        ? <Outlet /> 
        : <Navigate 
            to="/login" 
            state={{ from: location }} 
            replace 
          />
    )
};

export default RequireAuth;
