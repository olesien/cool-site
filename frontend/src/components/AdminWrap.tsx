import { useAppContext } from "@/contexts/useAppContext";
import { Outlet } from "react-router-dom";

//Wraps around every admin page to add some spacing around it
export default function AdminWrap() {
    const { user } = useAppContext();
    if (!user || !user.admin) {
        // Redirect to login if not logged in
        //return <Navigate to="/login" replace />;
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
