import Banner from "../HomeDetails/Banner";
import OverView from "../HomeDetails/OverView";
import PackageAndGuide from "../HomeDetails/PackageAndGuide";
import TouristStory from "../HomeDetails/TouristStory";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OverView></OverView>
            <PackageAndGuide></PackageAndGuide>
            <TouristStory></TouristStory>
        </div>
    );
};

export default Home;