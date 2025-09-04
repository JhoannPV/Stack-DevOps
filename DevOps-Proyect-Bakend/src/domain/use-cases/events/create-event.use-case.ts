import { EventsEntity, EventsRepository } from "../..";
import { Request } from 'express';

interface CreateEventUseCase {
    createEvent(event: EventsEntity): Promise<EventsEntity>;
}

export class CreateEvent implements CreateEventUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async createEvent(event: EventsEntity): Promise<EventsEntity> {

        const newEvent = await this.eventsRepository.createEvent(event);

        return newEvent;
    }
}