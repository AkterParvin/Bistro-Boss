/* eslint-disable react/prop-types */


const Cover = ({ bg, title, para }) => {
    return (
        <div className='relative  h-[700px] rounded-xl shadow-xl my-16 md:my-24'>
            <img src={bg} alt="" className='w-full h-full object-cover bg-fixed  shadow-xl' />
            <div className='absolute flex flex-col justify-center text-white items-center bg-gray-900/70 h-[50%] w-[80%] mx-auto left-[10%]  top-[20%] rounded-md shadow-xl'>
                <h2 className='text-3xl md:text-8xl lg:text-9xl font-bold'>{title}</h2>
                <p className='text-base text-center px-4 '>{para}</p>
            </div>
        </div>
    );
};

export default Cover;