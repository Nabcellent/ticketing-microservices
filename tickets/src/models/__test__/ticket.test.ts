import {Ticket} from '../ticket';

it('should implement Optimistic Concurrency Control.', async () => {
    //  Create a ticket
    const ticket = await Ticket.create({
        title: 'Concert',
        price: 5,
        user_id: '123'
    });

    //  Fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    //  Make two separate changes to the ticket we fetched
    firstInstance!.set({price: 10});
    secondInstance!.set({price: 15});

    //  Save the first fetched ticket
    await firstInstance!.save();

    //  Save the second fetched ticket and expect an error
    try {
        await secondInstance!.save();
    } catch (err) {
        return;
    }

    throw new Error('Should not reach this point!');
});

it('should increment the version number on multiple saves.', async function () {
    //  Create a ticket
    const ticket = await Ticket.create({
        title: 'Concert',
        price: 20,
        user_id: '123'
    });

    expect(ticket.version).toEqual(0)
    await ticket.save()
    expect(ticket.version).toEqual(1)
    await ticket.save()
    expect(ticket.version).toEqual(2)
});