/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Shared/Hooks/useAxiosSecure";
import useCart from "../../../Shared/Hooks/useCart";


const RecomCard = ({ item }) => {
    const { name, recipe, image, price, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    
    const handleClick = () => {
        // 

        if (user && user.email) {
            // TODO:send cart item to the database

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            };
            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire(`${name} added to Cart!`);
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "Login First!!!",
                text: "Please login to proceed!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    }
    return (

        <div className="card card-compact  max-w-xs   bg-gray-50/40 shadow-xl shadow-[#6b6351] border ">
            <img src={image} alt="Shoes" className="w-full h-[200px] object-cover rounded-t-2xl" />
            <p className="text-lg font-semibold absolute top-0 right-0 m-5
             bg-[#1F2937] text-white px-3 py-1 rounded-lg"> ${price}</p>
            <div className="flex flex-col items-center flex-grow justify-start px-3 py-3 space-y-2 text-center  ">
                <h2 className="card-title flex-grow">{name}</h2>
                <p className="flex-grow">{recipe}</p>

                <div className="card-actions justify-center ">

                    <button onClick={handleClick}
                        className="py-2 text-lg rounded-lg font-medium hover:bg-[#1F2937] hover:text-[#896103] px-7 border-b-2 border-[#BB8506]">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>

    );
};

export default RecomCard;