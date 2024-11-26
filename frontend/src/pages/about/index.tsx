import { useEffect } from 'react'
import axios from "axios";
export default function About() {

    const getData = async () => {
        const response = await axios.get<string>(
            'http://localhost:8080/users/ping',
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                withCredentials: true
            }
        )
        alert(String(response.data));
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>index</div>
    )
}
