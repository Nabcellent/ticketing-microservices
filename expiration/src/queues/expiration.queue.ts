import Queue from 'bull';

interface Payload {
    order_id: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});

expirationQueue.process(async job => {
    console.log(`I want to publish an expiration:complete event for order_id - `, job.data.order_id);
});

export {expirationQueue};
