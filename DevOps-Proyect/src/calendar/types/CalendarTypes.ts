export interface User {
    _id: string;
    name: string;
}
export interface CalendarEventData {
    _id?: string;
    title: string;
    notes: string;
    start: Date | string;
    end: Date | string;
    bgColor?: string;
    user?: User;
}