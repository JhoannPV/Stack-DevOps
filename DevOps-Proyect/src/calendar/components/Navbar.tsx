import { useAuthStore } from "../../hooks";

interface UserInfo {
    name: string;
    id: string;
}

export const Navbar = () => {
    const { user, startLogout } = useAuthStore();
    const userInfo = user as UserInfo;
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                {userInfo.name}
            </span>

            <button className="btn btn-outline-danger"
                onClick={startLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Salir</span>
            </button>
        </div>
    )
}
