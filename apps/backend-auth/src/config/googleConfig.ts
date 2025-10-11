import arctic from "arctic";

export const google = new arctic.Google(
  process.env.AUTH_GOOGLE_ID!,
  process.env.AUTH_GOOGLE_SECRET!,
  `${process.env.BACKEND_URL}/google/callback`,
);
