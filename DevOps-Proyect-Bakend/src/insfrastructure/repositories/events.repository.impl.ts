import { EventsRepository, EventsEntity, EventsDatasource } from "../../domain";
import { Request } from "express";

export class EventsRepositoryImpl implements EventsRepository {
    constructor(
        private readonly eventDatasource: EventsDatasource,
    ) { }

    getEvents(): Promise<EventsEntity[]> {
        return this.eventDatasource.getEvents();
    }

    createEvent(event: EventsEntity): Promise<EventsEntity> {
        return this.eventDatasource.createEvent(event);
    }

    updateEvent(event: Request): Promise<EventsEntity> {
        return this.eventDatasource.updateEvent(event);
    }

    deleteEvent(event: Request): Promise<EventsEntity> {
        return this.eventDatasource.deleteEvent(event);
    }
}