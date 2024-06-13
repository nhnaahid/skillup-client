
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const FeedbackCard = ({ image, title, ratings, description, name }) => {
    return (
        <div className="border p-3 md:p-4 font-inter space-y-2 h-[380px] md:h-[400px] lg:h-[420px]">
            <div>
                <div className="avatar">
                    <div className="w-12 md:w-24 rounded-full">
                        <img src={image} />
                    </div>
                </div>
            </div>
            {/* text */}
            <div className="space-y-2">
                <h1 className="md:text-xl font-bold font-merri">{title}</h1>
                <Rating
                    style={{ maxWidth: 100 }}
                    value={ratings}
                    readOnly
                />
                <p className="text-sm md:text-base">{description}</p>
                <h2 className="pt-3 text-sm md:text-base font-bold">{name}</h2>
            </div>
        </div>
    );
};

export default FeedbackCard;