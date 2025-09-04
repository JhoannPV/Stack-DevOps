import { useEffect, useMemo, useState, type ChangeEvent } from 'react';

type ValidatorFn = (value: string) => boolean;

export const useForm = (initialForm: { [key: string]: string } = {}, formValidations: { [key: string]: [ValidatorFn, string] } = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState<{ [key: string]: string | null }>({});

    // shallow compare helper to avoid unnecessary state updates
    const shallowEqual = (a: Record<string, unknown>, b: Record<string, unknown>) => {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        for (const k of aKeys) {
            if (a[k] !== b[k]) return false;
        }
        return true;
    };

    useEffect(() => {
        const formCheckedValues: { [key: string]: string | null } = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField] ?? '') ? null : errorMessage;
        }
        if (!shallowEqual(formCheckedValues, formValidation)) {
            setFormValidation(formCheckedValues);
        }
    }, [formState, formValidations, formValidation])

    useEffect(() => {
        // Sync only when the initialForm prop changes (not on every keystroke)
        setFormState(initialForm);
    }, [initialForm])


    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation])


    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    // validators are computed in the effect above

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}