import { EventsEntity } from '../../entities/events.entity';

export interface EventDelete {
    msg: string,
    event: EventsEntity
}