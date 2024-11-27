import {
    useQuery,
} from '@tanstack/react-query'
import { getPing } from "../../services/api"
import { Button } from 'antd';
import axios from 'axios';
export default function About() {

    // const getData = async () => {
    //     const response = await axios.get<string>(
    //         'http://localhost:8080/users/ping',
    //         {
    //             headers: {
    //                 "Access-Control-Allow-Origin": "*"
    //             },
    //             withCredentials: true
    //         }
    //     )
    //     alert(String(response.data));
    // }

    // useEffect(() => {
    //     getData();
    // }, [])
    const postReq = async () => {
        const response = await axios.post<string>(
            'http://localhost:8080/users/ping',
            { name: "Hej", email: "s", password: 422 },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                withCredentials: true,
            });
        console.log(response.data);

    }
    const { data } = useQuery({
        queryKey: ['ping'],
        queryFn: getPing,
    })
    console.log(data);
    return (
        <div>API response: {String(data)} <Button onClick={() => postReq()}>Hej fin knapp!</Button></div>
    )
}
