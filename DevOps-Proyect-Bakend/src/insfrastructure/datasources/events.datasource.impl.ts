import { EventsMapper } from "..";
import { EventModel } from "../../data/mongodb";
import { CustomError, EventsEntity, EventsDatasource } from "../../domain";
import { Request } from "express";

export class EventsDatasourceImpl implements EventsDatasource {
    constructor(
    ) { }

    async getEvents(): Promise<EventsEntity[]> {
        try {
            const events = await EventModel.find().populate('user', 'name');
            if (!events) throw CustomError.notFound('No events found');

            const mappedEvents: EventsEntity[] = events.map(event => EventsMapper.EventEntityFromObject(event));

            return mappedEvents;

        } catch (error) {
            console.log(error);

            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async createEvent(event: EventsEntity): Promise<EventsEntity> {
        try {
            const newEvent = await EventModel.create({
                title: event.title,
                notes: event.notes,
                start: event.start,
                bgColor: event.bgColor,
                end: event.end,
                user: event.user,
            });

            await newEvent.save();
            // Asegura que el campo user esté poblado con el nombre para devolver {_id, name}
            await newEvent.populate('user', 'name');

            return EventsMapper.EventEntityFromObject(newEvent);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async updateEvent(event: Request): Promise<EventsEntity> {
        const eventId = event.params.id;
        try {
            const existingEvent = await EventModel
                .findById(eventId);
            if (!existingEvent) throw CustomError.notFound('Event not found');

            if (existingEvent.user.toString() !== event.body.user.id) {
                throw CustomError.unauthorized('You do not have permission to edit this event');
            }

            const updatedEvent = await EventModel.findByIdAndUpdate(eventId, event.body, { new: true });
            if (!updatedEvent) throw CustomError.notFound('Event not found after update');

            await updatedEvent.populate('user', 'name');

            console.log(updatedEvent);


            return EventsMapper.EventEntityFromObject(updatedEvent);
        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async deleteEvent(event: Request): Promise<EventsEntity> {
        const eventId = event.params.id;
        try {
            const existingEvent = await EventModel
                .findById(eventId);

            if (!existingEvent) throw CustomError.notFound('Event not found');

            if (existingEvent.user.toString() !== event.body.user.id) {
                throw CustomError.unauthorized('You do not have permission to delete this event');
            }

            const deletedEvent = await EventModel.findByIdAndDelete(eventId);
            if (!deletedEvent) throw CustomError.notFound('Event not found after delete');

            await deletedEvent.populate('user', 'name');

            return EventsMapper.EventEntityFromObject(deletedEvent);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}