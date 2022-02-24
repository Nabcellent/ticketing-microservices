import {useEffect, useState} from 'react';

const OrderShow = ({order}) => {
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
                timeLeft < 0 ? <div>Order expired!</div> : <div>You have <strong>{timeLeft}s</strong> to pay.</div>
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