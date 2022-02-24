const Orders = ({orders}) => {
    return (
        <div className={'row justify-content-center'}>
            <div className="col-6">
                <ul className="list-group list-group-flush">
                    {
                        orders.map(order => {
                            let statusColor = 'primary';

                            if(order.status === 'COMPLETE') {
                                statusColor = 'success'
                            } else if(order.status === 'CANCELLED') {
                                statusColor = 'danger'
                            }

                            return (
                                <li key={order.id} className="list-group-item d-flex justify-content-between align-items-start">
                                    {order.ticket.title}
                                    <span className={`badge bg-${statusColor} rounded-pill`}>{order.status}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

Orders.getInitialProps = async (context, client) => {
    const {data} = await client.get('/api/orders');
    console.log(data);

    return {orders: data};
};

export default Orders;