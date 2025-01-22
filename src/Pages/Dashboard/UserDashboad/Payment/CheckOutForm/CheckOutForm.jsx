import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckOutForm = ( { bookingId, price } ) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error', confirmError);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // Save the payment information in the database
                const payment = {
                    email: user.email,
                    price: parseFloat(price),
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    bookingId: bookingId, 
                };

                try {
                    const res = await axiosSecure.post('/payments', payment);
                    if (res.data?.paymentResult?.insertedId) {
                        const updateBookingRes = await axiosSecure.patch(`/bookings/${bookingId}`, { status: 'in-review' });
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Payment successful and booking updated",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(`/dashboard/bookings/${user?.email}`);
                        
                    } else {
                        throw new Error("Payment not saved properly");
                    }
                } catch (error) {
                    setError('Error saving payment information: ' + error.message);
                    console.error("Error saving payment:", error);
                }
                
            }
        }
    };

    return (
        <div className="w-96">
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckOutForm;
