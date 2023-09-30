import Link from 'next/link'

interface FooterProps {
  description: string
  textLink: string
  link: string
}


// Se puede colocar debajo del login para agregar texto de por ej 
//   olvidaste tu contraseña? o Crear cuenta
export function Footer ({ description, link, textLink }: FooterProps) {
  return (
    <div className='w-full flex justify-center mt-3'>
      <span className='text-[12px]'>
        {description}{' '}
        <Link href={link} className='font-bold'>
          {textLink}
        </Link>
      </span>
    </div>
  )
}