import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddItem = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        //image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        });
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url

            };
            const menuRes = await axiosSecure.post("/menu", menuItem);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been Added`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data);
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Add Item</title>
            </Helmet>
            <div className="bg-[#F6F6F6] min-h-screen pb-10">
                <div className="pt-10">
                    <SectionTitle heading={"ADD AN ITEM"} subHeading={"---What's new?---"} />
                </div>
                <div className="max-w-4xl h-[80%] bg-white mx-auto space  p-5 md:p-8 lg:p-12 shadow-xl rounded-md">
                    <div className=" mb-8">
                        <h2 className="text-4xl text-center font-bold">Total Users: {""}</h2>

                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium dark:text-yellow-500">Recipe Name</label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    name="name"
                                    placeholder="Type here" className="input input-bordered input-warning w-full " />

                                {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> Username available!</p> */}
                            </div>

                            <div className="flex justify-between items-center flex-col md:flex-row  gap-5 mb-6" >
                                <div className="flex-1 max-w-xl">

                                    <label className="label ">
                                        <span className="label-text">Category*</span>

                                    </label>
                                    <select
                                        defaultValue={"default"}
                                        {...register("category", { required: true })}
                                        className="select select-bordered w-full max-w-xs">
                                        <option disabled value={"default"}>Select a Category</option>
                                        <option value="salad">Salad</option>
                                        <option value="pizza">Pizza</option>
                                        <option value="soup">Soup</option>
                                        <option value="dessert">Dessert</option>
                                        <option value="drinks">Drinks</option>
                                        <option value="Starter">Starter</option>

                                    </select>
                                </div>

                                <div className=" flex-1 max-w-xl">
                                    <label className="label ">
                                        <span className="label-text">Price*</span>

                                    </label>
                                    <input
                                        {...register("price", { required: true })}
                                        name="price"
                                        type="text"
                                        placeholder="Type here" className="input input-bordered w-full "
                                    />

                                </div>


                            </div>
                            <div className="mb-6">

                                <textarea
                                    {...register("recipe", { required: true })}
                                    name="recipe"
                                    className="textarea w-full h-24 md:h-48 lg:h-60 textarea-warning" placeholder="Recipe Details"></textarea>
                            </div>
                            <div className="mb-6">

                                <input
                                    {...register("image", { required: true })}
                                    name="image"
                                    type="file"
                                    className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-md btn-wide
                                 btn-warning text-white
                                  bg-[#b97206]">
                                <span className="flex justify-between items-center gap-2">
                                    <p>Add Item</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 8.0001C12 3.58201 9.98338 0 7.5 0C5.01568 0 3 3.58201 3 8.0001C3 9.92279 4.21201 11.5518 5.90818 12.1953L5.4999 21.9999C5.4999 23.1045 6.39539 24 7.5 24C8.60461 24 9.5001 23.1045 9.5001 21.9999L9.09182 12.1962C10.7892 11.5518 12 9.92279 12 8.0001Z" fill="white" />
                                        <path d="M21 7.2501L20.7501 0H19.5L19.2501 7.2501H18.2499L18 0H16.5L16.2501 7.2501H15.2499L15 0H13.7499L13.5 7.2501C13.5 8.77529 14.4141 10.0818 15.7227 10.668L15.2499 21.9999C15.2499 23.1045 16.1454 24 17.25 24C18.3546 24 19.2501 23.1045 19.2501 21.9999L18.7773 10.668C20.0859 10.0818 21 8.77529 21 7.2501Z" fill="white" />
                                    </svg>

                                </span>

                            </button>

                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AddItem;