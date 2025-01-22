import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import PropTypes from "prop-types";



const AdminRoute = () => {
    const { user, isLoading: authLoading } = useAuth();  
    const [role, roleLoading] = useRole(); 
    
 
    if (authLoading || roleLoading) return <div>Loading...</div>;
 
    if (user && role === 'admin') return children;
 
    return <Navigate to="/login" replace />;
};

AdminRoute.propTypes = {
   children: PropTypes.element.isRequired, 
};

export default AdminRoute;