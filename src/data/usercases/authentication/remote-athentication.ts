import { Authentication, AuthenticationParams } from "../../../domain/usercases/authentication";
import { AccountModel } from "../../../domain/models/account-model";
import { HttpPostClient } from "../../protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";

export class RemoteAuthentication implements Authentication {

  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ){ }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({url:this.url, body: params})
    
    if(httpResponse.statusCode === HttpStatusCode.badRequest){
      throw new UnexpectedError()
    }

    return {
     accessToken: ''
    }
  }
}