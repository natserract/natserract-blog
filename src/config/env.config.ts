const config = {
  IS_SERVER: typeof window === "undefined",
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  IS_PROD: process.env.NODE_ENV === "production",
  API_URL: process.env.API_URL,
};

export default config;
