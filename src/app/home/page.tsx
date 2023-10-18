import "./style.css";
import { dateTransform } from '@/utils/dateTransform'
import jwt from 'jsonwebtoken';
import {headers, cookies} from "next/headers"
import { NextResponse } from "next/server"
import { messages } from "@/utils/message"
import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { useRouter } from 'next/navigation';
import Card from '@/components/Card/index'
import SearchBar from '@/components/SearchBar';


  //p.edro@mail.com
  //123

  // async function getData () {
  //   const res = await fetch('http://localhost:3000/api/users')

  //   if (!res.ok) {
  //     throw new Error('Failed to fetch data')
  //   }

  //   return res.json()
  // }

  async function getAllMovies() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=60352d0e1d07a5b5492aa1b0e399801c');
      
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await res.json(); // Espera a que la respuesta se convierta en JSON
      const movies = data.results;
  
      // console.log(movies);
  
      return { movies }; // Devuelve un objeto con la propiedad 'movies'

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }



  export default async function HomePage () {

    const cookieStore = cookies()
    

    if (cookieStore) {
      // Los datos del usuario ahora están disponibles en decodedToken y userCookie
      console.log('Datos del usuario:', cookieStore.get('user_data'));

      const userDataCookie = cookieStore.get('user_data');
      // Convierte el valor JSON en un objeto JavaScript
      //@ts-ignore
      const userData = JSON.parse(userDataCookie.value);

      // Accede al campo _id del objeto userData
      const userId = userData._id;

      console.log('ID del usuario:', userId);
    } else {
      // El usuario no ha iniciado sesión
      console.log('El usuario no ha iniciado sesión');
    }

    let query = '';


    // const { users } = await getData()
    const { movies } = await getAllMovies();
    // console.log(movies)

    // ver foto peli: https://image.tmdb.org/t/p/w200/51tqzRtKMMZEYUpSYkrUE7v9ehm.jpg   // poster_path
    return (
      <main>
        <SearchBar query={query} />

        {/* <LikeButton id={post.id}/> film, photo */}
        <h1>Ultimos lanzamientos:</h1>

        <div className='container'>
          {movies?.map((movie: any, index: number) => (
              <Card film={movie.title} photo={movie.poster_path} key={movie.id} />
            ))
          }
        </div>

        {/* <table className='text-left border m-[1rem] text-sm font-light'>
          <thead className='border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600'>
            <tr className='border-b text-center'>
              <th scope='col' className='px-6 py-4'>
                Tabla de Usuarios
              </th>
            </tr>

            <tr>
              <th scope='col' className='px-6 py-4'>
                #
              </th>
              <th scope='col' className='px-6 py-4'>
                Id
              </th>
              <th scope='col' className='px-6 py-4'>
                Title
              </th>
              <th scope='col' className='px-6 py-4'>
               Release date
              </th>
            </tr>
          </thead>
          
          <tbody>
            {movies?.map((movie: any, index: number) => {
              const isEven = index % 2 === 0

              const bg = isEven
                ? 'bg-white dark:bg-neutral-600'
                : 'bg-neutral-100 dark:bg-neutral-700'

              return (
                <tr
                  key={movie.id}
                  className={`${bg} border-b font-medium dark:border-neutral-500`}
                >
                  <td className='whitespace-nowrap px-4 py-4 font-medium'>
                    {index + 1}
                  </td>
                  <td className='whitespace-nowrap px-4 py-4'>{movie.id}</td>
                  <td className='whitespace-nowrap px-4 py-4'>{movie.title}</td>
                  <td className='whitespace-nowrap px-4 py-4'>{movie.release_date}</td>
                </tr>
              )
            })}
          </tbody>
        </table> */}

      </main>
    )
  }