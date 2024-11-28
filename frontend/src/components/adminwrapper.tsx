import { Outlet } from 'react-router-dom'

//Wraps around every admin page to add some spacing around it
export default function AdminWrapper() {
    return (
        <div className='admin-content-wrapper'>
            <div className='admin-content'>
                <Outlet />
            </div>
        </div>
    )
}
