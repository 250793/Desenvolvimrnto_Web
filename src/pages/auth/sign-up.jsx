import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { signUp } from '../../api/sign-up'
import { Logo } from '../../components/Logo'

import LogoBrand from '../../assets/logo-reduced-white.png'

export function SignUp() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutateAsync: register, isPending } = useMutation({
    mutationFn: signUp,
  })

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  async function onSubmit(e) {
    e.preventDefault()

    try {
      await register({ username, email, password })

      toast.success('Usuário cadastrado!')

      navigate('/signin')
    } catch (error) {
      toast.error('Não foi possível cadastrar o usuário')
    }
  }

  return (
    <>
      <div className="card shadow-lg w-100 rounded-4">
        <div className="card-body p-5">
          <div className='w-100 mb-4 d-flex align-items-cente justify-content-center'>
            <img src={LogoBrand} alt="Company Logo" style={{ width: 90 }} />
          </div>
          <div className='d-flex flex-column'>
            <h1 className="fs-4 card-title fw-bold">Cadastre-se</h1>
            <p className='text-secondary'>Registre-se para dar o próximo passo no mundo da organização.</p>
          </div>

          <form
            onSubmit={onSubmit}
            className="needs-validation"
            autoComplete="off"
          >
            <div className="mb-3">
              <label className="mb-2 text-muted" htmlFor="name">
                Nome
              </label>

              <input
                id="name"
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsername}
                required
                autoFocus
              />
            </div>

            <div className="mb-3">
              <label className="mb-2 text-muted" htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={handleEmail}
                required
              />
            </div>

            <div className="mb-3">
              <label className="text-muted" htmlFor="password">
                Senha
              </label>

              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={handlePassword}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary ms-auto"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  />

                  <span role="status">Cadastrando ...</span>
                </>
              ) : (
                'Cadastrar'
              )}
            </button>
          </form>
        </div>

        <div className="card-footer py-3 border-0">
          <div className="text-center">
            Já tem uma conta?{' '}
            <Link to="/signin" className="text-dark">
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
