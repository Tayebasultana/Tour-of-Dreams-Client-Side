import Banner from "../HomeDetails/Banner";
import Deals from "../HomeDetails/Deals";
import OverView from "../HomeDetails/OverView";
import PackageAndGuide from "../HomeDetails/PackageAndGuide";
import Testimonial from "../HomeDetails/Testimonial";
import TouristStory from "../HomeDetails/TouristStory";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OverView></OverView>
            <PackageAndGuide></PackageAndGuide>
            <TouristStory></TouristStory>
            <Deals></Deals>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;