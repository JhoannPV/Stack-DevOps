import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";
import type { RootState } from ".";


export const useUiStore = () => {
    const dispatch = useDispatch();

    const {
        isDateModalOpen,
    } = useSelector((state: RootState) => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    const toggleDateModal = () => {
        if (isDateModalOpen) {
            closeDateModal()
        } else {
            openDateModal()
        }
    }

    return {
        //* Propiedades
        isDateModalOpen,

        //* Métodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
}