const Home = ({currentUser, tickets}) => {
    const ticketList = tickets.map((ticket, i) => <tr key={ticket.id}>
        <td>{i + 1}</td>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
            <button className={'btn btn-sm btn-primary'}>Purchase</button>
        </td>
    </tr>);

    return (
        <div>
            <h1>Tickets</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {ticketList}
                </tbody>
            </table>
        </div>
    );
};

Home.getInitialProps = async (context, client, currentUser) => {
    const {data} = await client.get('/api/tickets');

    return {tickets: data};
};

export default Home;