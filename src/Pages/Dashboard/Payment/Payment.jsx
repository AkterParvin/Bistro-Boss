import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY_PK);
const Payment = () => {
    return (
        <>

            <Helmet>
                <title>Bistro Boss | Payment</title>
            </Helmet>
            <div className="bg-[#F6F6F6] min-h-screen pb-10">
                <div className="pt-10">
                    <SectionTitle heading={"PAYMENT"} subHeading={"---Pay To Eat---"} />
                </div>
                <div className="max-w-4xl h-[80%] bg-white mx-auto space  p-5 md:p-8 lg:p-12 shadow-xl rounded-md">
                    <Elements stripe={stripePromise}>
                        <CheckOutForm></CheckOutForm>
                    </Elements>
                </div>
            </div>

        </>
    );
};

export default Payment;
/**
 * 1. install stripe and stripe react
 * 2. create card element 
 * 3. create stripe account and get publishable key
 * 4. use publishable key and use stripe to get card information and error
 * 5. create payment intent post on the server. and return client secret. install stripe on the server side and get client secret. make sure you used the payment method types: ['card']
 * 6. from client side get the client secret and save it. 
 * 7. use confirm card payment and pass user information, card and client secret
 * 8. display transaction id
 * 
*/