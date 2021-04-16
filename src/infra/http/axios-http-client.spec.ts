import axios from "axios"
import { mockHttpPost } from "../../data/test/mock-http-post"
import { mockAxios } from "../test/mock-axios"
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
})