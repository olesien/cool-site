import { useAppContext } from "@/contexts/useAppContext";
import { Outlet } from "react-router-dom";

//Wraps around every admin page to add some spacing around it
export default function AdminWrap() {
    const { user } = useAppContext();
    if (!user) {
        return (
            <div>
                <h2>You are not logged in</h2>
            </div>
        );
    }
    if (!user.admin) {
        return (
            <div>
                <h2>Permission Denied</h2>
            </div>
        );
    }
    return (
        <div className="admin-content-wrapper">
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
}
