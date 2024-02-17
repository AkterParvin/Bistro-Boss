/* eslint-disable react/prop-types */


const MenuCard = ({ item }) => {
    const { name, recipe, image,  price } = item;
    return (
        <div className="flex flex-col md:flex-row  justify-between items-center space-x-4  p-2">
            <img style={{ borderRadius:' 0px 200px 200px 200px'}} src={image} alt="" className="w-24 shadow-xl"/>
            <div>
                <h2 className="text-xl">{name}------------------</h2>
                <p className="text-base">{ recipe} </p>
            </div>
            <p className="text-[#BB8506] text-xl">${ price}</p>
        </div>
    );
};

export default MenuCard;