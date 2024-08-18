export default {
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
};
