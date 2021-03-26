import faker from 'faker';
import { InvalidCredentialError } from '../../../domain/errors/invalid-credentials-error';
import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { AccountModel } from '../../../domain/models/account-model';
import { mockAuthentication } from '../../../domain/test/mock-account';
import {  AuthenticationParams } from '../../../domain/usercases/authentication';
import { HttpStatusCode } from '../../protocols/http/http-response';
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
    await sut.auth(mockAuthentication());
    expect(httpPostClienteSpy.url).toBe(url);
  })

  test('Should call HttpPostClient with correct body', async () => {
    const {sut, httpPostClienteSpy } = makeSut()
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClienteSpy.body).toBe(authenticationParams);
  });

  test('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    const {sut, httpPostClienteSpy } = makeSut();
    httpPostClienteSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }


    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
    const {sut, httpPostClienteSpy } = makeSut();
    httpPostClienteSpy.response = {
      statusCode: HttpStatusCode.unauthorizad
    }


    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialError());
  });

  test('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    const {sut, httpPostClienteSpy } = makeSut();
    httpPostClienteSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});