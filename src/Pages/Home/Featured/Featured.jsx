import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import img from '../../../assets/home/featured.jpg';

const Featured = () => {
    return (
        <div className="max-w-5xl mx-auto  bg-cover bg-fixed my-10 -z-20" style={{ backgroundImage: `url(${img})`, backgroundPosition: 'cover' }}>
            
          
            <div className="bg-gradient-to-r  from-[#151515]/60 to-[#1d1818]/40 ">
                <div className="pt-5 ">
                    <SectionTitle
                        heading={"FROM OUR MENU"}
                        subHeading={"---Check it out---"}
                    ></SectionTitle>
                </div>
                <div className="md:flex md:gap-10 items-center justify-center pt-8 pb-12 px-16 ">
                    <div>
                        <img src={img} alt="" className="rounded-md " />
                    </div>

                    <div className="text-white">
                        <h3 className="text-lg">March 20, 2023</h3>
                        <h1 className="text-xl">WHERE CAN I GET SOME?</h1>
                        <p className="text-lg ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button className="py-3 text-lg rounded-lg font-medium hover:bg-[#1F2937] hover:text-[#896103] px-7 border-b-2 border-[#1F2937]">Order Now</button>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default Featured;