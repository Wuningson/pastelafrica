import axios from 'axios';

export default class ShortenApiService {
  static instance = axios.create({
    baseURL: 'http://localhost:4444/'
  });

  public static async shortenUrl(
    payload: ShortenUrlPayload
  ): Promise<DataResponse<ShortenUrlResponse>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.post<
          DataResponse<ShortenUrlResponse>
        >('/api/url', payload);

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
