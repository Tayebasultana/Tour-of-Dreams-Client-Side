import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole"; 
import PropTypes from "prop-types"; 
import useAuth from "../hooks/useAuth"; 

const GuideRoute = ({ children }) => {
   const { user, isLoading: authLoading } = useAuth();  
   const [role, roleLoading] = useRole(); 
   const location = useLocation();

   if (authLoading || roleLoading) return <div>Loading...</div>;

   if (user && role === 'tourGuide') return children;

   return <Navigate to="/login" state={{ from: location }} replace />;
};

GuideRoute.propTypes = {
   children: PropTypes.element.isRequired, 
};

export default GuideRoute;
