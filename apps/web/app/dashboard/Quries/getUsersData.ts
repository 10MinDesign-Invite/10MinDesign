import axios from "axios";

export async function getTotal_User_Count(){
    const Users = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/get/total_users_count`,{
        withCredentials:true
    })
    return Users.data
}
export async function getTotal_Gmail_Google_User_Count(){
    const Users = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/get/users`,{
       withCredentials:true
    })
    return Users.data;
}

