import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { authContext } from "../../../../../components/AuthProvider/AuthProvider";


const PaymentHistory = () => {
    const { user } = useContext(authContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/payments/${user?.email}`);
            return res.data;
        }
    });


    return (
        <div className="overflow-x-auto">
    <table className="table table-zebra">
        <thead>
            <tr>
                <th>#</th>
                <th>price</th>
                <th>Transaction Id</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {payments.map((payment, index) => <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>${payment.price}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.date}</td>
            </tr>)}
        </tbody>
    </table>
</div>

    );
};

export default PaymentHistory;