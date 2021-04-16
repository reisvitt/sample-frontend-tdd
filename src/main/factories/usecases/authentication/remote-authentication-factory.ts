import { RemoteAuthentication } from "../../../../data/usercases/authentication/remote-athentication";
import { Authentication } from "../../../../domain/usercases/authentication";
import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(
    'https://itaz-api.herokuapp.com/api/login',
    makeAxiosHttpClient()
  )
}