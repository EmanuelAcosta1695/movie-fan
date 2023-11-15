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
import Navbar from '@/components/Navbar'

  async function getAllMovies() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=60352d0e1d07a5b5492aa1b0e399801c');
      
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await res.json();
      const movies = data.results;
  
      return { movies };

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  export default async function HomePage () {

    const cookieStore = cookies()
    let userId = '';

    if (cookieStore) {
     
      console.log('Datos del usuario: ', cookieStore.get('user_data'));

      const userDataCookie = cookieStore.get('user_data');
      
      console.log('userDataCookie: ',userDataCookie)

      //@ts-ignore
      const userData = JSON.parse(userDataCookie.value);

      userId = userData._id;

      console.log('ID del usuario:', userId);
    } else {

      console.log('El usuario no ha iniciado sesión');
    }

    let query = '';

    const { movies } = await getAllMovies();

    return (
      <main>
        <Navbar/>
        <SearchBar query={query} userId={userId} />

        <div className='mx-auto flex flex-col items-center'>
          <h1 className="text-3xl text-cyan-500 font-bold mt-6 mb-10">🎬 Ultimos lanzamientos 🎬</h1>
        </div>
  
        <div className='container mx-auto flex flex-col items-center'>
          {movies?.map((movie: any, index: number) => (
              <Card 
                title={movie.title} 
                poster_path={movie.poster_path} 
                release_date={movie.release_date} 
                idUser={userId} 
                key={movie.id} 
              />
            ))
          }
        </div>
      </main>
    )
  }