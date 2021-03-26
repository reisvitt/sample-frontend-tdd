import faker from 'faker';
import { AccountModel } from '../../../domain/models/account-model';
import {  AuthenticationParams } from '../../../domain/usercases/authentication';
import { HttpPostClientSpy } from '../../test/mock-http-post-client';
import { RemoteAuthentication } from "./remote-athentication";

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClienteSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClienteSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClienteSpy);
  return {sut, httpPostClienteSpy}
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {

    const url = faker.internet.url();
    const {sut, httpPostClienteSpy } = makeSut(url)
    await sut.auth();
    expect(httpPostClienteSpy.url).toBe(url);
  });
});