import faker from 'faker'
import { HttpPostClientParams } from '../protocols/http/http-post-client'

export const mockHttpPost = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})