import axios from "axios";
import { HttpPostClient, HttpPostClientParams } from "../../data/protocols/http/http-post-client";
import { HttpResponse } from "../../data/protocols/http/http-response";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post ( params : HttpPostClientParams<any>): Promise<HttpResponse<any>> {
    try {
      const response = await axios.post(params.url, params.body);

      return {
        body: response.data,
        statusCode: response.status,
      }
      
    } catch (error) {
      return {
        body: error.response.data,
        statusCode: error.status,
      }
    }
  } 

}