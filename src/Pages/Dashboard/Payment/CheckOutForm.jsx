import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure";
import useCart from "../../Shared/Hooks/useCart";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
// import { set } from "react-hook-form";
// import { loadStripe } from "@stripe/stripe-js";




const CheckOutForm = () => {

    const [err, setErr] = useState();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async event => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod(
            {
                type: "card",
                card,
            }
        );
        if (error) {
            console.log("[error]", error);
            setErr(error.message);
        } else {
            console.log("[PaymentMethod]", paymentMethod);
            setErr(' ');
        }

        // confirm payment system 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"

                }
            }
        })

        if (confirmError) {
            console.log(confirmError);
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("transaction id", paymentIntent.id);
                setTransactionId(paymentIntent.id);

                //now save the payment to the database 
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), //utc date convert .use moment js
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: "Pending"
                }
                console.log(totalPrice);
                const res = await axiosSecure.post("/payments", payment);
                console.log(res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire("Thank you for your purchase");
                }




            }
        }

    }


    return (
        <>
            <Helmet>
                <title>Bistro Boss | Checkout</title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: '#424770',
                                "::placeholder": {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <button 
                   
                    type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>

            </form>
            <p className="text-red-600 font-medium text-sm">{err}</p>
            {
                transactionId && <p className="text-green-700 font-medium text-sm">Your Transction Id :{transactionId} </p>
            }
        </>
    );
};

export default CheckOutForm;