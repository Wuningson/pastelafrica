interface ShortenUrlPayload {
  url: string;
}

interface DataResponse<T extends Record<string, any> | string> {
  data: T;
  message: string;
  status: boolean;
}

interface ShortenUrlResponse {
  url: string;
}

type AlertType = 'error' | 'warning' | 'success';

interface Alert {
  id?: string;
  type: AlertType;
  message: string;
}
