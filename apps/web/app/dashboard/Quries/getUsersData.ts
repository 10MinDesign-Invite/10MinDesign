import axios from "axios";

export async function getUsersData(data:string){
    const Users = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/get/users`,{
        data:{
            data
        }
    },{withCredentials:true})
    return Users.data
}
