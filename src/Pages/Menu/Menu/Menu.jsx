/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import bg from '../../../assets/menu/banner3.jpg';
// import PopularMenu from "../../Home/PopularMenu/PopularMenu";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useState } from "react";
import useMenu from "../../Shared/Hooks/useMenu";
import MenuCard from "../../Shared/MenuCard/MenuCard";
import bg2 from '../../../assets/menu/dessert-bg.jpeg';
import bg3 from '../../../assets/menu/pizza-bg.jpg';
import bg4 from '../../../assets/menu/salad-bg.jpg';
import bg5 from '../../../assets/menu/soup-bg.jpg';
import MenuCategory from "../MenuCategory/MenuCategory";




const Menu = () => {
    // const [showAll, setShowAll] = useState(false);
    // const toggleShowAll = () => setShowAll(!showAll);
    const offered = useMenu("offered");
    const [offers, offeresLoading] = offered;

    const dessert = useMenu("dessert");
    const [desserts, dessertsLoading] = dessert;

    const salad = useMenu("salad");
    const [salads, saladsLoading] = salad;

    const soup = useMenu("soup");
    const [soups, SoupLoading] = soup;

    const pizzas = useMenu("pizza");
    const [menu, loading] = pizzas;
    return (
        <div >
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <div className="-mt-24 mb-24">
                <Cover bg={bg} title={'OUR MENU'} para={'Would you like to try a dish?'}></Cover>
            </div>
            <div>
                <SectionTitle heading={"TODAY'S OFFER"} subHeading={"---Don't miss---"} />
            </div>

            {/* Offered food part  */}
            <div className="my-10">
                <div className="grid md:grid-cols-2 gap-6 ">
                    {
                        offeresLoading ? (<p> Loading......</p>) : (
                            offers.map(item => <MenuCard key={item._id} item={item} />))
                    }
                </div>
                <div className="my-8 flex justify-center items-center">
                    {/* <button className="border-b-2 px-3 py-2 border-b-black hover:text-[#8a6204]" onClick={toggleShowAll}>
                    {showAll ? "View Offered " : "View Full"}
                    Menu</button> */}
                    <button className="border-b-2 px-3 py-2 font-bold rounded-lg border-b-black hover:bg-[#1F2937] hover:text-[#f6c95f]">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </div>

            {/* dessert Part */}
            {/* <div className="my-10">
                <div>
                    <Cover bg={bg2} title={'DESSERTS'} para={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
                </div>
                <div className="grid md:grid-cols-2 gap-6 ">
                    {

                        desserts.map(item => <MenuCard key={item._id} item={item} />)
                    }
                </div>
                <div className="my-8 flex justify-center items-center">
                    <button className="border-b-2 px-3 py-2 font-bold rounded-lg border-b-black hover:bg-[#1F2937] hover:text-[#f6c95f]">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </div> */}
            <MenuCategory img={bg2} title={"DESSERTS"} items={desserts}></MenuCategory>

            {/* pizza part  */}
            <MenuCategory img={bg3} title={"PIZZAS"} items={menu}></MenuCategory>
            {/* Salad part  */}
            <MenuCategory img={bg4} title={"SALADS"} items={salads}></MenuCategory>
            {/* Soup part  */}
            <MenuCategory img={bg5} title={"SOUPS"} items={soups}></MenuCategory>

        </div>
    );
};

export default Menu;