import axios from "axios";

export async function getTotal_User_Count(){
    const token = await axios.get('/api/getToken');     
    const Users = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/get/total_users_count`,{
        headers:{
            Authorization:`Bearer ${token.data.token}`
        },
    })
    return Users.data
}
export async function getTotal_Gmail_Google_User_Count(){
    const token = await axios.get('/api/getToken');     
    const Users = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/get/total_auth_users_count`,{
        headers:{
            Authorization:`Bearer ${token.data.token}`
        },
    })
    return Users.data
}
