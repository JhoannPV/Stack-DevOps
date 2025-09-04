import { EventsEntity, EventsRepository } from "../..";
import { Request } from "express";

interface UpdateEventUseCase {
    updateEvent(event: Request): Promise<EventsEntity>;
}

export class UpdateEvent implements UpdateEventUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async updateEvent(event: Request): Promise<EventsEntity> {

        const updateEvent = await this.eventsRepository.updateEvent(event);

        return updateEvent;
    }
}