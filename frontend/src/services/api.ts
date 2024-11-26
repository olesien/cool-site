import axios from "axios";

const getPing = async () => {
    const response = await axios.get<string>(
        'http://localhost:8080/users/ping',
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    return response.data;
}


export { getPing }