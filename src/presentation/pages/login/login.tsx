import React, { useState } from 'react'
import { Authentication } from '../../../domain/usercases/authentication'

type LoginProps = {
  authentication: Authentication
}

const Login: React.FC<LoginProps> = ({authentication} : LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();

    //validation

    try {
      if(loading) return

      setLoading(true);

      const account = await authentication.auth({email, password})

      localStorage.setItem('accessToken', account.accessToken)

     alert("LOGADO")
    } catch (error) {
      setLoading(false)
      alert(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input type="email" name="email" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Digite sua senha"  onChange={(e) => setPassword(e.target.value)} />

        <div>
          <button type='submit'>Enviar</button>
        </div>
      </form>
    </div>
  )
}

export default Login