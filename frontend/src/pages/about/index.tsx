import {
    useQuery,
} from '@tanstack/react-query'
import { getPing } from "../../services/api"
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
    const { data } = useQuery({
        queryKey: ['ping'],
        queryFn: getPing,
    })
    console.log(data);
    return (
        <div>API response: {String(data)}</div>
    )
}
