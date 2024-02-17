/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuCard from "../../Shared/MenuCard/MenuCard";


const MenuCategory = ({ img, title ,items}) => {
    const category = title.toLowerCase();
 
    return (
        <div className="my-10">
            <div>
                <Cover bg={img} title={title} para={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
            </div>
            <div className="grid md:grid-cols-2 gap-6 ">
                {

                    items.map(item => <MenuCard key={item._id} item={item} />)
                }
            </div>
            <div className="my-8 flex justify-center items-center">
                <Link to={`/order/${category}`}> <button className="border-b-2 px-3 py-2 font-bold rounded-lg border-b-black hover:bg-[#1F2937] hover:text-[#f6c95f]">ORDER YOUR FAVOURITE FOOD</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;