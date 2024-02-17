import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import RecomCard from "./RecommendationCards/RecomCard";

const Recommend = () => {
    const [menu, setMenu] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => setShowAll(!showAll);
    useEffect(() => {
        fetch("menu2.json")
            .then(res => res.json())
            .then(data => {
                const popularCategories = data.filter(item => item.category === "popular");
                { showAll ? setMenu(data) : setMenu(popularCategories) }


            })
    }, [showAll])
    return (
        <div className="max-w-5xl mx-auto space-y-16 mb-5">
            <div>
                <SectionTitle heading={"CHEF RECOMMENDS"} subHeading={"---Should Try---"}></SectionTitle>
            </div>
            <div className="grid md:grid-cols-3 gap-4 ">
                {
                    menu.map(item => <RecomCard key={item._id} item={item}></RecomCard>)
                }
            </div>
            <div className="my-8 flex justify-center items-center">
                <button className="border-b-2 px-3 py-2 border-b-black font-medium hover:bg-[#39424d] hover:text-[#BB8506]" onClick={toggleShowAll}>
                    {showAll ? "View Less" : "View Full"}
                    Menu</button>
            </div>
        </div>
    );
};

export default Recommend;