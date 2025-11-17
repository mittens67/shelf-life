declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    MONGO_URI: string;
    MONGO_USER: string;
    MONGO_PWD: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
