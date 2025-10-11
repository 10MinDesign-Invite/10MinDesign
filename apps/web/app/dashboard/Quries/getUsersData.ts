import axios from "axios";
// workhere
export async function getDashboardUsersData() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_Backend_URL}/get/dashboard_data`,
    {
      withCredentials: true,
    },
  );
  return data;
}
