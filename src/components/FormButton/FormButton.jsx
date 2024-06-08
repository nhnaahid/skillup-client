
const FormButton = ({ text }) => {
    return (
        <div className="pt-3">
            <input type="submit" value={`${text}`} className="w-full btn btn-sm md:btn-md btn-outline bg-transparent rounded-none border-[#0B68CD] text-[#0B68CD] hover:border-[#0B68CD] hover:bg-gray-200 hover:text-blue-700" />
        </div>
    );
};

export default FormButton;