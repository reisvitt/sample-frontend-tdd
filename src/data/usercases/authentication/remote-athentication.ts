import { Authentication, AuthenticationParams } from "../../../domain/usercases/authentication";
import { AccountModel } from "../../../domain/models/account-model";
import { HttpPostClient } from "../../protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { InvalidCredentialError } from "../../../domain/errors/invalid-credentials-error";

export class RemoteAuthentication implements Authentication {

  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ){ }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({url:this.url, body: params})
    

    switch(httpResponse.statusCode){
      case HttpStatusCode.ok: return { accessToken: '' }
      case HttpStatusCode.badRequest: throw new UnexpectedError()
      case HttpStatusCode.unauthorizad: throw new InvalidCredentialError()
      case HttpStatusCode.serverError: throw new UnexpectedError()
      default: throw new UnexpectedError()
    }
  }
}