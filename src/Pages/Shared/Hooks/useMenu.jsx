// import { useEffect, useState } from "react";


// const useMenu = ( category, showAll ) => {

//     const [menu, setMenu] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState(null);
//     // console.log(menu, loading, data)
//     useEffect(() => {
//         fetch("https://bistro-boss-server-chi-tawny.vercel.app/menu")
//             .then(res => res.json())
//             .then(fetchedData => {
//                 setLoading(true);
//                 setData(fetchedData);
//                 const filteredCategories = fetchedData.filter(item => item.category === category);

//                 const filteredMenu = showAll ? fetchedData : filteredCategories;

//                 setMenu(filteredMenu);
//                 // { showAll ? setMenu(data) : setMenu(popularCategories) }
//                 // setMenu(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.log("Error fetching menu data:", error);
//                 setLoading(false);
//         })
//     }, [category,showAll])
//     return [menu, loading,data]
// };

// export default useMenu;
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useMenu = (category, showAll) => {
    const axiosPublic = useAxiosPublic();
    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const response = await axiosPublic.get("/menu");
            return response.data;
        }
    });

    const filteredMenu = showAll ? menu :
        menu.filter((item) => item.category === category);

    return [filteredMenu, loading, menu, refetch];
};

export default useMenu;
