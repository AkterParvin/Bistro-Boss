
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import './Styles.css';
import img1 from '../../../assets/home/slide1.jpg';
import img2 from '../../../assets/home/slide2.jpg';
import img3 from '../../../assets/home/slide3.jpg';
import img4 from '../../../assets/home/slide4.jpg';
import img5 from '../../../assets/home/slide5.jpg';
import img6 from '../../../assets/home/slide3.jpg';
import bg from '../../../assets/home/chef-service.jpg';
// import required modules
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className="max-w-5xl mx-auto my-12 md:my-16 lg:my-20">
            <SectionTitle heading={"ORDER ONLINE"} subHeading={"---From 11:00am to 10:00pm---"}></SectionTitle>
            <div className='my-12'>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='bg'>
                        <img src={img1} alt="" />
                        <h2 className='uppercase text-4xl  -mt-16  text-center -ml-3  text-gray-500 font-bold '>Salad</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img2} alt="" />
                        <h2 className='uppercase text-4xl  -mt-16  text-center -ml-3  text-gray-500 font-bold '>Pizza</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img3} alt="" />
                        <h2 className='uppercase text-4xl  -mt-16  text-center -ml-3  text-gray-500 font-bold '>Soup</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img4} alt="" />
                        <h2 className='uppercase text-4xl  -mt-16  text-center -ml-3  text-gray-500 font-bold '>Dessert</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img5} alt="" />
                        <h2 className='uppercase text-4xl  -mt-16  text-center -ml-3  text-gray-500 font-bold '>Salad</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img6} alt="" />
                        <h2 className='uppercase text-4xl  -mt-16  text-center -ml-3  text-gray-500 font-bold '>Salad</h2>
                    </SwiperSlide>
                   
                </Swiper>
               
            </div>
            <div className='relative  h-[50vh] rounded-xl shadow-xl my-16 md:my-24'>
                <img src={bg} alt="" className='w-full h-full object-cover rounded-xl shadow-xl' />
                <div className='absolute flex flex-col justify-center items-center bg-gray-50/90 h-[30vh] w-[80%] mx-auto left-[10%]  top-[20%] rounded-md shadow-xl'>
                    <h2 className='text-3xl md:text-8xl '>Bistro Boss</h2>
                    <p className='text-base text-center px-4 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                </div>
            </div>
        </div>
    );
};

export default Category;