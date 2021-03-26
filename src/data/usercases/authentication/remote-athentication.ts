// import {Authentication} from '../../../domain/usercases/authentication';
import { Authentication, AuthenticationParams } from "../../../domain/usercases/authentication";
import { AccountModel } from "../../../domain/models/account-model";
import { HttpPostClient } from "../../protocols/http/http-post-client";

export class RemoteAuthentication implements Authentication {

  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ){ }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({url:this.url, body: params})
    
    return {
     accessToken: ''
    }
  }
}