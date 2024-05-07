import axios from "axios";

class HttpClient<Type extends { id: string }, CreateType, EditType> {
  client = axios.create({
    baseURL: process.env.NEXT_API_URL || "http://localhost:3000/api/",
  });
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getOne = async (id: string) => {
    const { data } = await this.client.get<Type>(`${this.endpoint}/${id}`);
    return data;
  };

  get = async (params?: Record<string, string>) => {
    const { data } = await this.client.get<Type[]>(this.endpoint, { params });
    return data;
  };
  post = async (eventType: CreateType) => {
    const { data } = await this.client.post<Type>(this.endpoint, eventType);
    return data;
  };

  delete = async (eventType: Type) => {
    const { data } = await this.client.delete<Type>(
      `${this.endpoint}/${eventType.id}`
    );
    return data;
  };

  patch = async (id: string, editData: EditType) => {
    const { data } = await this.client.patch<Type>(
      `${this.endpoint}/${id}`,
      editData
    );
    return data;
  };
}

export default HttpClient;
