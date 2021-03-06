import {useState} from 'react';
import {useRequest} from '../../hooks/use-request';
import Router from 'next/router';

const CreateTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const {sendRequest, errors} = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {title, price},
        onSuccess: () => Router.push('/')
    });

    const onSubmit = (e) => {
        e.preventDefault();

        sendRequest();
    };

    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) return;

        setPrice(value.toFixed(2));
    };

    return (
        <div>
            <h1>Create ticket</h1>
            {errors}
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className={'form-control'} value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input type="number" className={'form-control'} value={price}
                           onBlur={onBlur}
                           onChange={(e) => setPrice(e.target.value)}/>
                </div>

                <button className={'btn btn-primary'}>Create</button>
            </form>
        </div>
    );
};

export default CreateTicket;