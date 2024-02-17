import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import PopularMenu from "./PopularMenu/PopularMenu";
import Recommend from "./Recommend/Recommend";
import Testimonial from "./Testimonial/Testimonial";



const Home = () => {
    return (
        <div className=" ">
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
         <Banner></Banner>
         
         <Category></Category>
         <PopularMenu></PopularMenu>
         <Recommend></Recommend>
         <Featured></Featured>
         <Testimonial></Testimonial>

        </div>
    );
};

export default Home;