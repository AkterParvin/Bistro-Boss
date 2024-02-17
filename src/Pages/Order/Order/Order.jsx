import Cover from "../../Shared/Cover/Cover";
import bg1 from "../../../assets/shop/banner2.jpg";
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../Shared/Hooks/useMenu";
import RecomCard from "../../Home/Recommend/RecommendationCards/RecomCard";
import { useParams } from "react-router-dom";



const Order = () => {
    const categories = ["salads", "pizzas", "soups", "desserts", "drinks"];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    
    const allDrinks = useMenu("drinks");
    const [drinks] = allDrinks;

    const dessert = useMenu("dessert");
    const [desserts] = dessert;
    const Starter = useMenu("Starter");
    const [Starters] = Starter;

    const salad = useMenu("salad");
    const [salads] = salad;

    const soup = useMenu("soup");
    const [soups] = soup;

    const pizza = useMenu("pizza");
    const [pizzas] = pizza;
    return (
        <div >
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <div className="-mt-24 mb-24">
                <Cover bg={bg1} title={'ORDER FOOD'} para={"Would you like to try a dish?"}   />
            </div>
            <div className="max-w-5xl mx-auto my-10">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className='text-red-700 flex items-center justify-center mb-12'>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Starter</Tab>
                        <Tab>Drinks</Tab>
                       
                    </TabList>
                    <TabPanel >
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {
                                salads.map(item => <RecomCard key={item._id} item={item}></RecomCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {
                                pizzas.map(item => <RecomCard key={item._id} item={item}></RecomCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {
                                soups.map(item => <RecomCard key={item._id} item={item}></RecomCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {
                                desserts.map(item => <RecomCard key={item._id} item={item}></RecomCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {
                                Starters.map(item => <RecomCard key={item._id} item={item}></RecomCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {
                                drinks.map(item => <RecomCard key={item._id} item={item}></RecomCard>)
                            }
                        </div>
                    </TabPanel>
                    
                </Tabs>
            </div>
        </div>
    );
};

export default Order;