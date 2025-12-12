import axios from "axios";

export async function fetchCards(
  page: number,
  items: number,
  categoryName: String,
) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_Backend_URL}/wedding/get`,
    {
      page,
      items,
      categoryName,
    },
  );

  return res.data;
}
