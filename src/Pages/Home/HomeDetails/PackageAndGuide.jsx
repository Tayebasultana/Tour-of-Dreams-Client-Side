import { Tab, TabList, TabPanel, Tabs } from "react-tabs";


const PackageAndGuide = () => {
    return (
        <div>
            <Tabs>
               <TabList className="items-center justify-center  p-4 rounded-lg gap-7 flex">
                 <Tab>Our Packages</Tab>
                 <Tab>Meet Our Tour Guides</Tab>
               </TabList>
           
               <TabPanel>
                 <h2>Any content 1</h2>
               </TabPanel>
               <TabPanel>
                 <h2>Any content 2</h2>
               </TabPanel>
            </Tabs>
        </div>
    );
};

export default PackageAndGuide;