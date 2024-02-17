import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";


const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments=[] } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    console.log(payments);
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Payment History</title>
            </Helmet>
            <div className="bg-[#F6F6F6] min-h-screen pb-10">
                <div className="pt-10">
                    <SectionTitle
                        heading={"PAYMENT HISTORY"}
                        subHeading={"---At a Glance!---"}
                    />
                </div>
                <div className="max-w-4xl h-[80%] bg-white mx-auto space  p-5 md:p-8 lg:p-12 shadow-xl rounded-md">
                    <div className=" mb-8">
                        <h2 className="text-3xl text-center font-bold">
                            Total payments: {payments.length} times</h2>

                    </div>
                    <div className="">
                        <div className="overflow-x-auto rounded-t-xl ">
                            <table className="table  ">
                              
                                <thead className="bg-[#D1A054] ">
                                    <tr className="">
                                        <th>
                                            #
                                        </th>
                                        <th>EMAIL</th>
                                        <th>Transaction ID</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        payments.map((items, index) => <tr key={items._id}>
                                            <th>
                                                {index + 1}
                                               
                                            </th>
                                            <td>
                                                <p className="text-sm">{items.email} </p>
                                            </td>
                                            <td>
                                                <p className="text-sm">{items.transactionId} </p>

                                            </td>
                                            <td>
                                                <p className="text-sm">$ {items.price.toFixed(2)}   </p>
                                            </td>
                                            <td>
                                                <p className="text-sm">{items.status} </p>
                                            </td>
                                        </tr>
                                        )
                                    }
                                </tbody>
                            
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;