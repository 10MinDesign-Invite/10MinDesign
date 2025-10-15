import axios from "axios";

export async function getDashboardUsersData() {
  const token = await axios.get("/api/getToken"); // Token fetch
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_Backend_URL}/get/dashboard_data`,
    {
      headers: { Authorization: `Bearer ${token.data.token}` },
      withCredentials:true
    },
   
  );
  return data;
}
