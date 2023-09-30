"use client"

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {

  // hook para el loading, para los efecto de carga y mensajes
  const {finishLoading, isLoading, startLoading} = useLoading()

  const authFetch = useAuthFetch()

  const login = async (formData: any) => {
    startLoading()

    await authFetch({
      endpoint: 'login',
      redirectRoute: '/home',
      formData
    })

    finishLoading()
  }

  // si no se coloca dentro del fragment, no se alinea
  return (
    <>
      <Form title='Login' onSubmit={login}>
        <div className="my-[10px] flex flex-col gap-4">
          <Form.Input label='Correo' name='email' placeholder="Ingresa tu correo..." />
          <Form.Input label='Contraseña' name='password' placeholder="Ingresa tu contraseña..." type="password"/>
        </div>
        <Form.SubmitButton buttonText="Iniciar Sesión" isLoading={isLoading} />
        <Form.Footer description="Aun no tenes cuenta?" link="/register" textLink="Registrarse"/>
      </Form>
    </>
  )
}
