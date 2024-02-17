/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: states = {}, isLoading } = useQuery({
        queryKey: ["admin-states"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-states");
            return res.data;
        }
    });


    const { data: chartData = [] } = useQuery({
        queryKey: ["order-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/order-stats");
            // console.log(res.data);
            return res.data;
        }
    });

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    // custom piechart functions 
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })

    if (isLoading) {
        return <p>Is Loading</p>
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Admin Home</title>
            </Helmet>
            <div className="p-6 bg-[#F6F6F6] ">
                <div className="mb-6">
                    <h2 className="text-3xl">Hi,{' '}
                        {user.displayName ?
                            user.displayName : " "
                        }{' '} Welcome Back!</h2>
                </div>
                <div className="stats shadow w-[90%] mx-auto">

                    <div className="stat bg-gradient-to-r from-purple-300 via-[#BB34F5] to-[#FCDBFF] text-white">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                                <g clipPath="url(#clip0_4_196)">
                                    <path d="M46.5906 40.9092H38.6362C33.6236 40.9092 29.5454 36.831 29.5454 31.8184C29.5454 26.8059 33.6236 22.7277 38.6362 22.7277H46.5906C47.2187 22.7277 47.727 22.2195 47.727 21.5913V18.1823C47.727 15.7994 45.8786 13.8615 43.5433 13.6735L37.0172 2.27457C36.4124 1.22033 35.4358 0.466825 34.2673 0.15394C33.1042 -0.156815 31.8881 0.00639266 30.8471 0.612242L8.47503 13.6369H4.5458C2.03899 13.6369 0.000383377 15.6754 0.000383377 18.1823V45.4546C0.000383377 47.9614 2.03888 50 4.5458 50H43.1816C45.6884 50 47.727 47.9615 47.727 45.4546V42.0456C47.727 41.4174 47.2187 40.9092 46.5906 40.9092ZM38.4265 9.3121L40.9025 13.6369H30.9981L38.4265 9.3121ZM12.992 13.6369L31.9912 2.57638C32.505 2.27564 33.1053 2.19574 33.6791 2.34893C34.2595 2.50426 34.7433 2.87936 35.0441 3.40424L35.0464 3.4084L17.4782 13.6369H12.992Z" fill="white" />
                                    <path d="M46.5905 25.0004H38.6361C34.8764 25.0004 31.818 28.0587 31.818 31.8184C31.818 35.5782 34.8764 38.6365 38.6361 38.6365H46.5905C48.4704 38.6365 49.9996 37.1074 49.9996 35.2275V28.4094C49.9996 26.5295 48.4704 25.0004 46.5905 25.0004ZM38.6361 34.0911C37.3833 34.0911 36.3634 33.0713 36.3634 31.8184C36.3634 30.5656 37.3833 29.5458 38.6361 29.5458C39.8889 29.5458 40.9087 30.5656 40.9087 31.8184C40.9088 33.0713 39.889 34.0911 38.6361 34.0911Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4_196">
                                        <rect width="50" height="50" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <div className="stat-title text-white">Revenue</div>
                        <div className="stat-value">${states.revenue}</div>
                        <div className="stat-desc text-white">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat bg-gradient-to-r from-[#D3A256]  to-[#FDE8C0] text-white">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="51" viewBox="0 0 50 51" fill="none">
                                <g clipPath="url(#clip0_4_255)">
                                    <path d="M25 20.5178C29.6923 20.5178 33.4961 16.7139 33.4961 12.0217C33.4961 7.32941 29.6923 3.52558 25 3.52558C20.3077 3.52558 16.5039 7.32941 16.5039 12.0217C16.5039 16.7139 20.3077 20.5178 25 20.5178Z" fill="white" />
                                    <path d="M42.1875 20.5177C45.1539 20.5177 47.5586 18.113 47.5586 15.1466C47.5586 12.1802 45.1539 9.77548 42.1875 9.77548C39.2211 9.77548 36.8164 12.1802 36.8164 15.1466C36.8164 18.113 39.2211 20.5177 42.1875 20.5177Z" fill="white" />
                                    <path d="M7.8125 20.5177C10.7789 20.5177 13.1836 18.113 13.1836 15.1466C13.1836 12.1802 10.7789 9.77548 7.8125 9.77548C4.84613 9.77548 2.44141 12.1802 2.44141 15.1466C2.44141 18.113 4.84613 20.5177 7.8125 20.5177Z" fill="white" />
                                    <path d="M13.1045 25.341C10.9902 23.6088 9.07549 23.8381 6.63086 23.8381C2.97461 23.8381 0 26.7951 0 30.4289V41.0939C0 42.6721 1.28809 43.9553 2.87207 43.9553C9.71055 43.9553 8.88672 44.079 8.88672 43.6603C8.88672 36.1031 7.9916 30.561 13.1045 25.341Z" fill="white" />
                                    <path d="M27.3252 23.877C23.0553 23.5209 19.3439 23.8811 16.1426 26.5235C10.7855 30.8145 11.8164 36.5922 11.8164 43.6602C11.8164 45.5303 13.3379 47.0802 15.2363 47.0802C35.8498 47.0802 36.6702 47.7451 37.8926 45.0382C38.2935 44.1227 38.1836 44.4137 38.1836 35.6563C38.1836 28.7007 32.1609 23.877 27.3252 23.877Z" fill="white" />
                                    <path d="M43.3691 23.838C40.9111 23.838 39.0069 23.611 36.8955 25.3409C41.9702 30.5222 41.1133 35.6861 41.1133 43.6602C41.1133 44.0815 40.4294 43.9552 47.0254 43.9552C48.666 43.9552 50 42.6261 50 40.9923V30.4288C50 26.795 47.0254 23.838 43.3691 23.838Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4_255">
                                        <rect width="50" height="50" fill="white" transform="translate(0 0.338959)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="stat-title text-white">Customers</div>
                        <div className="stat-value text-white">{states.users}</div>
                        <div className="stat-desc text-white">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat bg-gradient-to-r from-[#FE4880]  to-[#FECDE9] text-white">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                                <path d="M16.0992 34.779L12.9905 35.37C10.054 35.9284 7.84856 38.0415 7.36418 40.7573L5.79319 48.234C5.70236 48.6658 5.81125 49.1156 6.08938 49.4583C6.3675 49.801 6.78528 50 7.22658 50H17.1874V42.3817C17.1874 41.8596 17.4654 41.3769 17.917 41.1147L22.6646 38.3596C20.1099 37.868 17.8327 36.5864 16.0992 34.779Z" fill="white" />
                                <path d="M44.2069 48.2335L42.6331 40.7558C42.1482 38.0407 39.9426 35.9284 37.0065 35.3706L33.8994 34.7804C32.7402 35.9886 31.3377 36.9612 29.7722 37.6206C29.7648 37.6251 20.1171 43.2253 20.1171 43.2253V50H42.7734C43.2148 50 43.6327 49.801 43.9108 49.4581C44.189 49.1153 44.2978 48.6654 44.2069 48.2335ZM25.4883 46.4845H24.5118C23.7028 46.4845 23.0469 45.8286 23.0469 45.0196C23.0469 44.2106 23.7028 43.5548 24.5118 43.5548H25.4883C26.2973 43.5548 26.9532 44.2106 26.9532 45.0196C26.9532 45.8286 26.2973 46.4845 25.4883 46.4845Z" fill="white" />
                                <path d="M15.5761 16.8354H34.4238V19.7827H15.5761V16.8354Z" fill="white" />
                                <path d="M15.5761 12.2467V13.9057H34.4238V12.2467C36.3204 11.3479 37.5622 9.4166 37.5622 7.28857C37.5622 4.26465 35.102 1.80449 32.078 1.80449C31.3682 1.80449 30.6636 1.94297 30.0103 2.2084C28.7256 0.798047 26.9305 0 25 0C23.0694 0 21.2743 0.797949 19.9896 2.2083C19.3363 1.94287 18.6317 1.80439 17.9218 1.80439C14.8979 1.80439 12.4377 4.26455 12.4377 7.28848C12.4377 9.4166 13.6795 11.3479 15.5761 12.2467Z" fill="white" />
                                <path d="M25 35.6525C30.187 35.6525 34.407 31.4326 34.407 26.2456V22.7124H15.593V26.2456C15.593 31.4326 19.8129 35.6525 25 35.6525Z" fill="white" />
                            </svg>
                        </div>
                        <div className="stat-title text-white">Products</div>
                        <div className="stat-value text-white">{states.menuItems}</div>
                        <div className="stat-desc text-white">↗︎ 400 (22%)</div>
                    </div>
                    <div className="stat bg-gradient-to-r from-[#6AAEFF]  to-[#B6F7FF] text-white">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                                <g clipPath="url(#clip0_4_319)">
                                    <path d="M43.1818 15.9091H36.3636V6.81818H4.54549C2.03406 6.81818 0 8.85224 0 11.3637V36.3637H4.54549C4.54549 40.1251 7.60228 43.1819 11.3637 43.1819C15.1251 43.1819 18.1819 40.1251 18.1819 36.3637H31.8182C31.8182 40.1251 34.875 43.1819 38.6364 43.1819C42.3978 43.1819 45.4546 40.1251 45.4546 36.3637H50.0001V25.0001L43.1818 15.9091ZM11.3637 39.7727C9.47728 39.7727 7.95459 38.25 7.95459 36.3636C7.95459 34.4772 9.47728 32.9545 11.3637 32.9545C13.2501 32.9545 14.7728 34.4772 14.7728 36.3636C14.7728 38.25 13.25 39.7727 11.3637 39.7727ZM38.6364 39.7727C36.75 39.7727 35.2273 38.25 35.2273 36.3636C35.2273 34.4772 36.75 32.9545 38.6364 32.9545C40.5228 32.9545 42.0455 34.4772 42.0455 36.3636C42.0455 38.25 40.5227 39.7727 38.6364 39.7727ZM36.3636 25.0001V19.3183H42.0454L46.5113 25.0001H36.3636Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4_319">
                                        <rect width="50" height="50" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="stat-title text-white">Orders</div>
                        <div className="stat-value text-white">{states.orde}</div>
                        <div className="stat-desc text-white">↗︎ 400 (22%)</div>
                    </div>



                </div>
                <div className="flex items-center justify-between">
                    <div className="w-1/2">
                        <BarChart
                            width={500}
                            height={300}
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </div>
                    <div className="w-1/2">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend/>
                        </PieChart>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;