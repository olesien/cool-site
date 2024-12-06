import { useState } from 'react';
import './login.css';
import { useAppContext } from '@/contexts/useAppContext';
import { Navigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export type User = {
    id: number;
    username: string;
    password: "",
    // user_role: number;
    admin: boolean
}

export default function Login() {
    const { login, user } = useAppContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if (user) {
        // Redirect to login if not logged in
        return <Navigate to="/" replace />;
    }


    const loggingIn = async () => {

        //Auth frontend validation

        //Get from backend if valid (also comes with cookie for further requests)
        try {
            setLoading(true);
            const res = await axios.post<{ message: string, data: User }>
                ("http://localhost:8080/users/login", { username, password }, {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true
                });
            console.log(res.data);

            //Login on frontend
            if (res.data && res.data.message === "Success") {
                login(res.data.data);
            }
            setLoading(false);

        } catch (err: unknown) {
            console.error(err);
            setLoading(false);
            if (axios.isAxiosError(err)) {
                if (err.response?.data) {
                    toast.error(err.response?.data.message);
                } else {
                    toast.error(err.message);
                }
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <>
            <link
                href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
            />
            <div className="signin-box">
                <h1 className="signin-title">Sign in</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    <i className="bx bxs-user-circle"></i>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <i className="bx bxs-lock"></i>
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="#" className="forgot-password">
                        Forgot Password?
                    </a>
                </div>
                <button type="submit" className="btn" disabled={loading}
                    onClick={loggingIn}>{loading ? "Signing in..." : "Sign in"}</button>
                <div className="register-link">
                    <p className='p-1'>
                        Don't have an account? <NavLink to="/register">Click here</NavLink>
                    </p>
                </div>
            </div>
        </>
    );
}

