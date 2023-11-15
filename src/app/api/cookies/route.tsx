import {cookies} from "next/headers"

export default function Cookies() {

    const cookieStore = cookies()
    let userId = '';

    if (cookieStore) {

      const userDataCookie = cookieStore.get('user_data');

      //@ts-ignore
      const userData = JSON.parse(userDataCookie.value);

      userId = userData._id;

    } else {
      console.log('El usuario no ha iniciado sesión');
    }

    return userId;
}
