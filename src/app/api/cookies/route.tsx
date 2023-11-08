import React from 'react'
import {cookies} from "next/headers"

export default function Cookies() {

    const cookieStore = cookies()
    let userId = '';

    if (cookieStore) {
      
      console.log('Datos del usuario:', cookieStore.get('user_data'));

      const userDataCookie = cookieStore.get('user_data');

      //@ts-ignore
      const userData = JSON.parse(userDataCookie.value);

      userId = userData._id;

      console.log('ID del usuario:', userId);
    } else {
      console.log('El usuario no ha iniciado sesión');
    }

    return userId;
}
