import { EventsEntity } from "..";
import { Request } from "express";



export abstract class EventsDatasource {

    abstract getEvents(): Promise<EventsEntity[]>;

    abstract createEvent(event: EventsEntity): Promise<EventsEntity>;

    abstract updateEvent(event: Request): Promise<EventsEntity>;

    abstract deleteEvent(event: Request): Promise<EventsEntity>;

}