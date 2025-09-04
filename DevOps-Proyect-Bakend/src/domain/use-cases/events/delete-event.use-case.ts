import { EventDelete, EventsEntity, EventsRepository } from "../..";
import { Request } from "express";

interface DeleteEventUseCase {
    deleteEvent(event: Request): Promise<EventDelete>;
}

export class DeleteEvent implements DeleteEventUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async deleteEvent(event: Request): Promise<EventDelete> {

        const deletedEvent = await this.eventsRepository.deleteEvent(event);

        return {
            msg: 'Event deleted successfully',
            event: deletedEvent
        };
    }
}