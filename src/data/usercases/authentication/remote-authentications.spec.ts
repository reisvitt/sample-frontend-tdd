import faker from 'faker';
import { AccountModel } from '../../../domain/models/account-model';
import { AuthenticationParams } from '../../../domain/usercases/authentication';
import { HttpPostClient, HttpPostClientParams } from "../../protocols/http/http-post-client";
import { HttpResponse, HttpStatusCode } from "../../protocols/http/http-response";
import { RemoteAuthentication } from "./remote-athentication";

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy <T,R> implements HttpPostClient<T,R> {
      url?: string
      response: HttpResponse<R> = {
        statusCode: HttpStatusCode.ok
      }
      async post(params: HttpPostClientParams<T>): Promise<HttpResponse<R>> {
        this.url = params.url

        return await Promise.resolve(this.response);
      }
    }
    
    const url = faker.internet.url();
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});