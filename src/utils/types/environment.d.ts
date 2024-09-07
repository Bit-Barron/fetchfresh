declare namespace NodeJS {
  export interface ProcessEnv {
    SECRET: string;
    NEXT_PUBLIC_URL: string;
    DATABASE_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_SMTP_HOST: string;
    NEXT_PUBLIC_SMTP_USER: string;
    NEXT_PUBLIC_SMTP_PASS: string;
  }
}
