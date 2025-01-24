// import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole"; 
import PropTypes from "prop-types"; 
import useAuth from "../hooks/useAuth"; 
import toast from "react-hot-toast";

const GuideRoute = ({ children }) => {
   const { user, isLoading: authLoading } = useAuth();  
   const [role, roleLoading] = useRole(); 
   // const location = useLocation();

   if (authLoading || roleLoading) return <div>Loading...</div>;

   if (user && role === 'tourGuide') return children;

   return toast.error("you are not authorized to access this page");
};

GuideRoute.propTypes = {
   children: PropTypes.element.isRequired, 
};

export default GuideRoute;
