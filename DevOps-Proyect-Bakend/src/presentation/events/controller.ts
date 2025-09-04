import { Request, Response } from 'express';
import { CreateEvent, CustomError, DeleteEvent, GetEvents, UpdateEvent } from '../../domain';
import { EventsRepository } from '../../domain/repositories/events.repository';

export class EventsController {

    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    getEvents = (req: Request, res: Response) => {
        new GetEvents(this.eventsRepository).getEvents()
            .then((events) => res.status(200).json({
                events,
            }))
            .catch((error) => this.handleError(error, res));
    }

    createEvent = (req: Request, res: Response) => {
        new CreateEvent(this.eventsRepository).createEvent(req.body)
            .then((event) => res.status(201).json({ event }))
            .catch((error) => this.handleError(error, res));
    }

    updateEvent = (req: Request, res: Response) => {
        new UpdateEvent(this.eventsRepository).updateEvent(req)
            .then((event) => res.status(200).json({ event }))
            .catch((error) => this.handleError(error, res));
    }

    deleteEvent = (req: Request, res: Response) => {
        new DeleteEvent(this.eventsRepository).deleteEvent(req)
            .then((event) => res.status(200).json({ event }))
            .catch((error) => this.handleError(error, res));
    }
}