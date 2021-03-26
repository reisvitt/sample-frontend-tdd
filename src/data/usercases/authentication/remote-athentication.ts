// import {Authentication} from '../../../domain/usercases/authentication';
import { AuthenticationParams } from "../../../domain/usercases/authentication";
import { AccountModel } from "../../../domain/models/account-model";
import { HttpPostClient } from "../../protocols/http/http-post-client";

export class RemoteAuthentication  {

  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ){ }

  async auth(): Promise<void> {
    await this.httpPostClient.post({url:this.url})
  }
}