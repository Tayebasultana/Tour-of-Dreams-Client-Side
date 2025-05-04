import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import RandomPackage from "./RandomPackage";
import TourGuide from "../../../components/Shared/TourGuide/TourGuide";

const PackageAndGuide = () => {
    return (
        <div className="min-h-screen">
            <Tabs>
                <TabList className="bg-[#F6FCDF] items-center justify-center p-4 rounded-lg shadow-md gap-7 flex">
                    <Tab
                        className="px-4 py-2 cursor-pointer text-lg font-semibold transition-all duration-300 text-gray-700 dark:text-black"
                        selectedClassName="border-b-4 border-[#859F3D] text-[#859F3D]"
                    >
                        Our Packages
                    </Tab>
                    <Tab
                        className="px-4 py-2 cursor-pointer text-lg font-semibold transition-all duration-300 text-gray-700 dark:text-black"
                        selectedClassName="border-b-4 border-[#859F3D] text-[#859F3D]"
                    >
                        Meet Our Tour Guides
                    </Tab>
                </TabList>

                <TabPanel>
                    <RandomPackage />
                </TabPanel>
                <TabPanel>
                    <TourGuide />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default PackageAndGuide;
