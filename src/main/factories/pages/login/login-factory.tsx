import React from 'react';
import Login from "../../../../presentation/pages/login/login"
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory"

export const makeLogin = () => {
  return (
    <Login authentication={ makeRemoteAuthentication() } />
  )
}