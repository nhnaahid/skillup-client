
const PageHeadline = ({ headline, text }) => {
    return (
        <div className="w-full md:w-1/2 mx-auto space-y-3 mt-12 px-2">
            <h1 className="font-merri font-semibold text-xl md:text-3xl text-center">{headline}</h1>
            <p className="text-xs md:text-sm text-center">{text}</p>
        </div>

    );
};

export default PageHeadline;