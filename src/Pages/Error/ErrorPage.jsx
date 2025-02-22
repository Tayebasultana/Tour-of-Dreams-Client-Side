import { NavLink } from "react-router-dom";
import bgCover from "../../assets/5423411.jpg";

const ErrorPage = () => {
    return (
        <div
            className="h-screen w-screen flex items-center justify-center"
            // style={{
            //     backgroundImage: "url('../../assets/5423411.jpg')",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            // }}
        >
            <img src={bgCover} alt="bgCover" className="absolute h-full w-full object-cover" />
            <div className="absolute h-full w-full bg-black opacity-60"></div>
            <h1 className=" text-4xl z-40 font-bold">Page Not Found</h1>
            <NavLink to="/" className="text-4xl z-40 text-[#b9e83a]">Go Back</NavLink>
        </div>
    );
};

export default ErrorPage;