'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function RegisterPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const register = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/',
      formData
    })
    finishLoading()
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form
        title='Registrate'
        onSubmit={register}
        description='Crea tu cuenta en nuestro sitio'
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Email'
            name='email'
            placeholder='Ingresa tu correo...'
          />
          <Form.Input
            placeholder='Ingresa tu contraseña...'
            label='Contraseña'
            name='password'
            type='password'
          />
          <Form.Input
            placeholder='Repite tu contraseña...'
            label='Confirmar contraseña'
            name='confirmPassword'
            type='password'
          />
        </div>
        <Form.SubmitButton buttonText='Crear cuenta' isLoading={isLoading} />
        <br />
        <div>
            <p>•Email es requerido.</p>
            <p>•Password y Confirm Password deben ser iguales.</p>
            <p>•La contraseña debe tener 8 caracteres o más y contener al menos <br/>
                un carácter especial, una letra minúscula y una mayúscula.</p>
        </div>
        <Form.Footer
          description='Ya tienes cuenta?'
          textLink='Inicia Sesión'
          link='/'
        />
      </Form>
    </div>
  )
}