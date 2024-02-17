import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";


const useCart = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { refetch,data: cart = [] }=useQuery({
        queryKey:["cart",user?.email],
        queryFn: async () => {
            const result = await axiosPublic.get(`/carts?email=${user.email}`)
            return result.data;
        },
    })
    return [cart, refetch];
};

export default useCart;
/**
 * api call wuth tanstack query 
 * then using axios to get teh data 
 * then we are calling the query data do the full process again-
 * import useQuery
 * const useCart=()=>{
 * const axiosSecure=useAxios();
 * const {data:cart=[]}=useQuery({
 * queryKey:["cart"],
 * queryFn:async()=>{
 * const res=await axiosSecure.get("/carts");
 * return res.data
 * 
 * }
 * })
 * return [cart];
 * } 
 */