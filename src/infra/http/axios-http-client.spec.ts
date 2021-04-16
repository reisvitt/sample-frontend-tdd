import axios from "axios"
import { mockHttpPost } from "../../data/test/mock-http-post"
import { mockAxios, mockHttpResponse } from "../test/mock-axios"
import { AxiosHttpClient } from "./axios-http-client"

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpPost()
    const { sut, mockedAxios } = makeSut();
    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)

  })

  test('Should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockHttpPost())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)

  })

  test('Should return the correct statusCode and body on failure', () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.post(mockHttpPost())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)

  })
})