import moment from "moment";

export const isDate = (value: Date): boolean => {
    if (!value) return false;
    const date = moment(value);
    if (date.isValid()) {
        return true;
    } else {
        return false;
    }
}