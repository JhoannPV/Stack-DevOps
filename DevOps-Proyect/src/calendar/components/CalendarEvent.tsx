import type { CalendarEventData } from "..";

interface CalendarEventProps {
    event: CalendarEventData;
}

export const CalendarEvent = ({ event }: CalendarEventProps) => {

    const { title, user } = event;

    return (
        <>
            <strong>{title}</strong>
            <span> - {user!.name}</span>
        </>
    )
}
