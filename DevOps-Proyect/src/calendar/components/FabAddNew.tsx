import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const { isDateModalOpen, openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Jhoann',
            }
        }
        );
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab-add show"
            onClick={handleClickNew}
            style={
                {
                    display: isDateModalOpen ? 'none' : ''
                }
            }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
