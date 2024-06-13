import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const CheckoutForm = ({ course }) => {
    // console.log("From checkout: ", course);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();


    const coursePrice = course.price;

    useEffect(() => {
        if (coursePrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: coursePrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, coursePrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            // console.log('confirm error')
        }
        else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const paymentInfo = {
                    studentName: user.displayName,
                    studentEmail: user.email,
                    studentImage: user.photoURL,
                    courseId: course._id,
                    courseTitle: course.title,
                    courseImage: course.courseImage,
                    coursePrice: coursePrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to do that
                }
                const enrollInfo = {
                    studentName: user.displayName,
                    studentEmail: user.email,
                    studentImage: user.photoURL,
                    teacherName: course.name,
                    teacherEmail: course.email,
                    teacherImage: course.teacherImage,
                    courseId: course._id,
                    courseTitle: course.title,
                    courseImage: course.courseImage,
                    coursePrice: coursePrice,
                    date: new Date(), // utc date convert. use moment js to do that
                }

                const resEnrolls = await axiosSecure.post('/enrolls', enrollInfo)
                // console.log('enrolls: ', resEnrolls.data);

                const resPayment = await axiosSecure.post('/payments', paymentInfo);
                // console.log('payment saved', resPayment.data);
                if (resPayment.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successful.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // console.log("Okay");
                    navigate('/dashboard/my-enrolls');
                }
            }

        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="w-1/5 mx-auto">
                <button className="btn btn-sm text-xs md:text-sm bg-transparent rounded-none border-[#0B68CD] text-[#0B68CD] hover:border-[#0B68CD] hover:bg-gray-200 hover:text-blue-700 mt-5 w-full" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
            <p className="text-red-600 text-center mt-5">{error}</p>
            {transactionId && <p className="text-green-600 text-center mt-5"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;