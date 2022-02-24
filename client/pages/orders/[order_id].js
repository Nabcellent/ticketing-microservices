import {useEffect, useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({order, currentUser}) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expires_at) - new Date();

            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => clearInterval(timerId);
    }, [order]);

    return (
        <div>
            {
                timeLeft < 0
                ? <div>Order expired!</div>
                : <div>
                    You have <strong>{timeLeft}s</strong> to pay.
                    <StripeCheckout token={token => console.log(token)}
                                    stripeKey={'pk_test_51KWLjbAH2VkaPSj0pIfz2HNBBBpnUHrQ9Ocxe0ppNrgXWZdm9h3TpCpFA610r6v9hNHontj3mYM0udWySEfAgJVF00qBuFiXvG'}
                                    amount={order.ticket.price * 100} email={currentUser.email}/>
                </div>
            }
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const {order_id} = context.query;
    const {data} = await client.get(`/api/orders/${order_id}`);

    return {order: data};
};

export default OrderShow;