import { useParams } from "react-router-dom";
import PageHeadline from "../Shared/PageHeadline/PageHeadline";
import useCourse from "../../hooks/useCourse";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();
    console.log('From payment id: ', id);
    const [oneCourse] = useCourse(id);
    console.log("From payment course: ", oneCourse);
    return (
        <div>
            <PageHeadline headline="Payment" text="Complete payment and get access to the courses you wish."></PageHeadline>
            <div className="w-full md:w-1/2 mx-auto mt-16 px-2">
                <Elements stripe={stripePromise}>
                    <CheckoutForm course={oneCourse}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;