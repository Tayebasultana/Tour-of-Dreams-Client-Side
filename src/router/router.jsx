import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home/Home";
import Community from "../Pages/Community/Community/Community";
import Dashboard from "../layout/Dashboard/Dashboard";
import AddStory from "../Pages/Dashboard/AddStory/AddStory";
import ManageProfile from "../Pages/Dashboard/UserDashboad/ManageProfile/ManageProfile";
import StoryDetails from "../components/Shared/StoryDetails";
import UserAddedStory from "../Pages/Dashboard/UserDashboad/UserAddedStory/UseraddedStory";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import TourGuideProfile from "../Pages/Dashboard/TourGuideDashboard/TourGuideProfile/TourGuideProfile";
import AdminProfile from "../Pages/Dashboard/AdminDashboard/AdminProfile/AdminProfile";
import JoinAsTourGuide from "../Pages/Dashboard/UserDashboad/JoinAsTourGuide/JoinAsTourGuide";
import PackageDetails from "../Pages/Home/HomeDetails/PackageDetails";
import ManageCandidates from "../Pages/Dashboard/AdminDashboard/ManageCandidates/ManageCandidates";
import PackageForm from "../Pages/Dashboard/AdminDashboard/PackageForm/PackageForm";
import TourGuideDetails from "../components/Shared/TourGuideDetails/TourGuideDetails";
import Trips from "../Pages/Trips/Trips/Trips";
import AboutUs from "../Pages/AboutUs/AboutUs/AboutUs";
import TouristStoryDetails from "../Pages/Home/HomeDetails/TouristStoryDetails/TouristStoryDetails";
import MyBooking from "../Pages/Dashboard/UserDashboad/MyBooking/MyBooking";
import StoryUpdate from "../components/Shared/StoryUpdate";
import MyAssignedTour from "../Pages/Dashboard/TourGuideDashboard/MyAssignedTour/MyAssignedTour";
import Payment from "../Pages/Dashboard/UserDashboad/Payment/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/UserDashboad/Payment/PaymentHistry/PaymentHistory";
import UpdateProfile from "../components/Shared/UpdateProfile/UpdateProfile";



  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/package/:id",
          element:<PackageDetails></PackageDetails>
        },
        {
          path:"/tourGuides/:id",
          element:<TourGuideDetails></TourGuideDetails>
        },
        {
          path:"/story/:id",
          element:<TouristStoryDetails></TouristStoryDetails>
        },
        {
          path:"/community",
          element:<Community></Community>
        },
        {
          path:"/all-package",
          element:<Trips></Trips>
        },
        {
          path:"/about-us",
          element:<AboutUs></AboutUs>
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
   {
    path:"/dashboard",
    element:<Dashboard></Dashboard>,
    children:[
      // tourist 
      {
        path:"userProfile",
        element:<ManageProfile></ManageProfile>
      },
      {
        path:"updateProfile",
        element:<UpdateProfile></UpdateProfile>
      },
      {
        path:"addStory",
        element:<AddStory></AddStory>
      },
      {
       path:"story/:id",
       element:<StoryDetails></StoryDetails>,
      },
      {
        path:"story-update/:id",
        element:<StoryUpdate></StoryUpdate>
      },
      {
        path:"stories/:email",
        element:<UserAddedStory></UserAddedStory>
      },
      {
        path:"bookings/:email",
        element:<MyBooking></MyBooking>
      },
      {
        path:"joinAsTourGuide",
        element:<JoinAsTourGuide></JoinAsTourGuide>
      },
      {
        path:"payment/:bookingId/:price",
        element:<Payment></Payment>
      },
      {
        path:"payments/:email",
        element:<PaymentHistory></PaymentHistory>
      },
      // tourGuide
      {
        path:"tourGuideProfile",
        element:<TourGuideProfile></TourGuideProfile>
      },
      {
        path:"my-assigned-tour",
        element:<MyAssignedTour></MyAssignedTour>
      },
      // admin
      {
        path:"adminProfile",
        element:<AdminProfile></AdminProfile>
      },
      {
        path:"packageForm",
        element:<PackageForm></PackageForm>
      },
      {
        path:"users",
        element:<ManageUsers></ManageUsers>
      },
      {
        path:"manageCandidates",
        element:<ManageCandidates></ManageCandidates>
      }
    ]
   }
  ]);

  export default router;