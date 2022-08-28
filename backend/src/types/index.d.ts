interface EnvironmentVariables {
  port: number;
  appUrl: string;
  apiPath: string;
  databaseUrl: string;
}

interface Url {
  longUrl: string;
  shortUrl: string;
}

interface ShortenUrlBody {
  url: string;
}

interface ErrorResponse {
  message?: string;
  status: false;
}

interface RedirectToFullUrlParams {
  shortUrl?: string;
}
