import { EventsEntity, EventsRepository } from "../..";

interface GetEventsUseCase {
    getEvents(): Promise<EventsEntity[]>;
}

export class GetEvents implements GetEventsUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async getEvents(): Promise<EventsEntity[]> {

        const events = await this.eventsRepository.getEvents();

        return events;
    }

}