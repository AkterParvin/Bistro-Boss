import { useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import MenuCard from "../../Shared/MenuCard/MenuCard";
import useMenu from "../../Shared/Hooks/useMenu";


const PopularMenu = () => {
   
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => setShowAll(!showAll);
    const [menu, loading, data]   = useMenu("popular",showAll);
    // console.log("Fetched data:", menu);
    return (
        <div className="max-w-5xl mx-auto">
            <div>
                <SectionTitle heading={"FROM OUR MENU"} subHeading={"---Check it out---"}></SectionTitle>
            </div>
            <div className="grid md:grid-cols-2 gap-6 ">
                {
                    loading ? (<p> Loading......</p>) : (showAll ?
                        data.map(item => <MenuCard key={item._id} item={item} />) : menu.map(item => <MenuCard key={item._id} item={item} />))
               }
             
            </div>
            <div className="my-8 flex justify-center items-center">
                <button className="border-b-2 px-3 py-2 border-b-black hover:text-[#8a6204]" onClick={toggleShowAll}>
                    {showAll ? "View Less" : "View Full"}
                    Menu</button>
            </div>
            <div className="flex items-center justify-center my-12 lg:my-20 h-[250px] bg-black">
                <p className="text-white text-4xl md:text-9xl font-semibold">Call Us: +88 0192345678910</p>
            </div>

        </div>
    );
};

export default PopularMenu;
 // const [menu, setMenu] = useState([]);
    // const popularCategories = menu.filter(item => item.category === "popular");
    // { showAll ? setMenus(menu) : setMenus(popularCategories) }
  
    // useEffect(() => {
    //     fetch("menu.json")
    //     .then(res=>res.json())
    //         .then(data => {
    //             const popularCategories = data.filter(item => item.category === "popular");
    //             { showAll ? setMenu(data):setMenu(popularCategories) }
                

    //     })
    // },[showAll])
    // console.log(menu)