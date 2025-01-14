import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home/Home";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path:"/",
            element:<Home></Home>
        }
      ]
    },
    {
      path:"/login",
      element:<Login></Login>
    },
   {
      path:"/register",
      element:<Register></Register>
   },
  ]);

  export default router;