
const LargeButton = ({name}) => {
    return (
        <button className="btn btn-sm md:btn-md text-xs md:text-sm bg-transparent rounded-none border-[#0B68CD] text-[#0B68CD] hover:border-[#0B68CD] hover:bg-gray-200 hover:text-blue-700 mt-3">{name}</button>
    );
};

export default LargeButton;