import { parseISO } from "date-fns";
import type { CalendarEventData } from "../calendar";


export const convertEventsToDateEvents = (events: CalendarEventData[]): CalendarEventData[] => {
    return events.map(event => {
        event.start = parseISO(event.start as string);
        event.end = parseISO(event.end as string);

        return event;
    });
}
