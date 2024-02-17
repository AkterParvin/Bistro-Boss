import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { FaTrash, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
           
            return res.data;

        }
    })

    const handleDeleteUser = _id => {
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
                axiosSecure.delete(`/users/${_id}`)
                    .then(res => {

                        if (res.data.deletedCount > 0) {
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
    };

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Completed!",
                                text: `${user.name} is an ADMIN now!`,
                                icon: "success"
                            });
                        }
                    })
            }
        })

    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <div className="bg-[#F6F6F6] min-h-screen pb-10">
                <div className="pt-10">
                    <SectionTitle
                        heading={"MANAGE ALL USERS"}
                        subHeading={"---How many??---"}
                    />
                </div>
                <div className="max-w-4xl h-[80%] bg-white mx-auto space  p-5 md:p-8 lg:p-12 shadow-xl rounded-md">
                    <div className=" mb-8">
                        <h2 className="text-4xl text-center font-bold">Total Users: {users.length}</h2>

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
                                        <th>IMAGE AND NAME</th>
                                        <th>Email</th>
                                        <th>ROLE</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        users.map((user, index) => <tr key={user._id} >
                                            <th>
                                                {index + 1}
                                                {/* name, recipe, image, price, _id */}
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar shadow-md rounded-lg shadow-amber-950">
                                                        <div className="mask mask-squircle  w-12 h-12">
                                                            <img src={""} alt="Avatar Tailwind CSS Component" />
                                                        </div>

                                                    </div>
                                                    <h2>{user.name}</h2>
                                                </div>
                                            </td>
                                            <td>

                                                <span
                                                    className="badge badge-ghost badge-sm">
                                                    {user.email}</span>
                                            </td>
                                            <td>
                                                {
                                                    user.role === "admin" ? "ADMIN" : <button onClick={() => handleMakeAdmin(user)}
                                                        className="btn btn-warning btn-sm text-white
                                                     bg-[#D1A054]">
                                                        <FaUsers />
                                                    </button>
                                                }

                                            </td>
                                            <th>
                                                <button onClick={() => handleDeleteUser(user._id)}
                                                    className="btn btn-error btn-sm text-white
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

export default AllUsers;