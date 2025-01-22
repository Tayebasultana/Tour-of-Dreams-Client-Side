import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    const { bookingId, price } = useParams();  

    return (
        <div>
            <div className="mb-4">
            <h1>Proceed with Payment for Booking: {bookingId}</h1>
            <p>Amount: ${price}</p>
            </div>
            <Elements stripe={stripePromise}>
                <CheckOutForm bookingId={bookingId} price={price} />
            </Elements>
        </div>
    );
};

export default Payment;