import { HttpPostClient, HttpPostClientParams } from "../protocols/http/http-post-client";
import { HttpResponse, HttpStatusCode } from "../protocols/http/http-response";

export class HttpPostClientSpy <T,R> implements HttpPostClient<T,R> {
  url?: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }
  async post(params: HttpPostClientParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url

    return await Promise.resolve(this.response);
  }
}