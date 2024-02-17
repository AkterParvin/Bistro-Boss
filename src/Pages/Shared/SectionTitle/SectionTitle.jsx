/* eslint-disable react/prop-types */


const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className=" flex flex-col items-center justify-center space-y-4 mb-6">
            <p className="text-[#D99904] text-xl ">
                {subHeading}</p>

            <h2 className="border-t-4 border-gray-100 rounded border-b-4 py-2 px-8 text-3xl md:text-8xl ">{ heading}</h2>
        </div>
    );
};

export default SectionTitle;