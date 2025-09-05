import { useSelector, useDispatch } from "react-redux"
import type { ErrorResponse, RootState } from ".";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import type { CalendarEventData } from "../calendar";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const {
        events,
        activeEvent,
    } = useSelector((state: RootState) => state.calendar);

    const setActiveEvent = (calendarEvent: CalendarEventData | null) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent: CalendarEventData) => {

        try {
            if (calendarEvent._id) {
                // Actualizando
                const { data } = await calendarApi.put(`/events/update-event/${calendarEvent._id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user: data.event.user }));
            } else {
                // Creando
                const { data } = await calendarApi.post('/events/create-event', calendarEvent);
                dispatch(onAddNewEvent({ ...calendarEvent, _id: data.event._id, user: data.event.user }));
            }
        } catch (error) {
            const { response } = error as ErrorResponse;
            Swal.fire('Error al guardar', response.data?.error, 'error');
        }
    }

    const startDeletingEvent = async () => {
        try {
            const activeEventId = activeEvent as CalendarEventData | null;
            const { data } = await calendarApi.delete(`/events/delete-event/${activeEventId?._id}`);
            Swal.fire('Evento eliminado', data.event.msg, 'success');
            await dispatch(onDeleteEvent());
        } catch (error) {
            const { response } = error as ErrorResponse;
            Swal.fire('Error al Eliminar', response.data?.error, 'error');
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events/get-events');
            const events: CalendarEventData[] = convertEventsToDateEvents(data.events);
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log(error);
        }
    }


    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* MÃŠtodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}