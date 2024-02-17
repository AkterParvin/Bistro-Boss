import { Helmet } from "react-helmet-async";
import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useMenu from "../../Shared/Hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const ManageItems = () => {

    const [,, menu, refetch] = useMenu("", "showAll");
    const axiosSecure = useAxiosSecure(); 

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} item has been deleted.`,
                        icon: "success"
                    });
                }

          

            }
        });
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Manage Items</title>
            </Helmet>
            <div className="bg-[#F6F6F6] min-h-screen pb-10">
                <div className="pt-10">
                    <SectionTitle
                        heading={"MANAGE ALL BOOKINGS"}
                        subHeading={"---At a Glance!---"}>
                    </SectionTitle>
                </div>
                <div className="max-w-4xl h-[80%] bg-white mx-auto space  p-5 md:p-8 lg:p-12 shadow-xl rounded-md">
                    <div className=" mb-8">
                        <h2 className="text-4xl font-bold">Total Items: {menu.length }</h2>

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
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        menu.map((item, index) => <tr key={item._id}>
                                            <th>
                                                {index}
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
                                                {item.name}

                                            </td>
                                            <td>${item.price}</td>
                                            <th>
                                                <Link to={`/dashboard/updateItem/${item._id}`}>
                                                    <button 
                                                        className="btn btn-warning btn-sm text-white
                                                     bg-[#d49432]">
                                                        <FaEdit />
                                                    </button>
                                                </Link>
                                            </th>
                                            <th>
                                                <button onClick={() => handleDelete(item)}
                                                    className="btn btn-warning btn-sm text-white
                                                     bg-[#B91C1C]">
                                                    <FaTrash />
                                                </button>
                                            </th>
                                        </tr>


                                        )
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

export default ManageItems;