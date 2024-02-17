import { Helmet } from "react-helmet-async";
import useCart from "../../Shared/Hooks/useCart";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart,refetch] = useCart();
    const price = cart.reduce((total, item) => total + item.price, 0);
    const totalPrice = price.toFixed(2);
    const axiosPublic = useAxiosPublic();
    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/carts/${_id}`)
                    .then(res => {
                      
                        if (res.data.deletedCount>0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        
                })
                // 
            }
        });
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <div className="bg-[#F6F6F6] min-h-screen pb-10">
                <div className="pt-10">
                    <SectionTitle
                        heading={"WANNA ADD MORE?"} subHeading={"---My Cart---"}>
                    </SectionTitle>
                </div>
                <div className="max-w-4xl h-[80%] bg-white mx-auto space  p-5 md:p-8 lg:p-12 shadow-xl rounded-md">
                    <div className="flex items-center justify-evenly mb-8">
                        <h2 className="text-4xl text-center font-bold">Total orders: {cart.length}</h2>
                        <h2 className="text-4xl text-center font-bold">total price: ${totalPrice} </h2>
                        {cart.length ?
                            <Link to={"/dashboard/payment"}>
                            <button  className="btn btn-square bg-[#D1A054]">Pay</button>
                            </Link>
                            :
                            <button disabled className="btn btn-square bg-[#D1A054]">Pay</button>
                        }
                    </div>
                    <div className="">
                        <div className="overflow-x-auto rounded-t-xl ">
                            <table className="table  ">
                                {/* head */}
                                <thead className="bg-[#D1A054] ">
                                    <tr >
                                        <th>
                                            #
                                        </th>
                                        <th>ITEM IMAGE</th>
                                        <th>ITEM NAME</th>
                                        <th>PRICE</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        cart.map((item, index) => <tr key={item._id}>
                                            <th>
                                                {index + 1}
                                                {/* name, recipe, image, price, _id */}
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar shadow-lg shadow-amber-950">
                                                        <div className="mask mask-squircle  w-16 h-16">
                                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>

                                                <span className="badge badge-ghost badge-sm">{item.name}</span>
                                            </td>
                                            <td>${item.price}</td>
                                            <th>
                                                <button onClick={()=>handleDelete(item._id)}
                                                    className="btn btn-warning btn-sm text-white
                                                     bg-[#B91C1C]">
                                                    <FaTrash />
                                                </button>
                                            </th>
                                        </tr>)
                                    }
                                    {/* row 1 */}


                                </tbody>
                                {/* foot */}


                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;