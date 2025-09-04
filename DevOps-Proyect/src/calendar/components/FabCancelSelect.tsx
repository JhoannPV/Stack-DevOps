import { useCalendarStore, useUiStore } from "../../hooks"

export const FabCancelSelect = () => {

    const { hasEventSelected, setActiveEvent } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const handleCancelSelect = () => {
        setActiveEvent(null);
    }

    return (
        <button
            className="btn btn-dark fab-cancel-select show"
            onClick={handleCancelSelect}
            style={
                {
                    display: (hasEventSelected && !isDateModalOpen) ? '' : 'none'
                }
            }
        >
            <i className="fa-solid fa-xmark"></i>
        </button>
    )
}
