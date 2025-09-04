import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";
import type { ErrorResponse, ErrorResponseLogin, LoginParams, RegisterParams, RootState } from ".";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }: LoginParams) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.user.name, _id: data.user.id }));
        } catch (error) {
            const { response } = error as ErrorResponse;
            if (response.data?.error) {
                dispatch(onLogout(response.data?.error))
            } else {
                const resp = error as ErrorResponseLogin;
                const respEmail: string = resp.response.data?.errors.email?.msg || '';
                const respPassword: string = resp.response.data?.errors.password?.msg || '';
                const msg: string = `${respEmail}${(respEmail && respPassword) && ' and '}${respPassword}`;
                dispatch(onLogout(msg));
            }
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }: RegisterParams) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.user.name, _id: data.user.id }));
        } catch (error) {
            const { response } = error as ErrorResponse;
            dispatch(onLogout(response.data?.error) || '');
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout(undefined));
        try {
            const { data } = await calendarApi.get('/auth/renew-token');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.user.name, _id: data.user.id }));
        } catch (error) {
            const { response } = error as ErrorResponse;
            localStorage.clear();
            dispatch(onLogout(response.data?.error || ''));
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout(undefined));
    }

    return {
        //* Properties
        status,
        user,
        errorMessage,

        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}
