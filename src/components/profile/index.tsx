import Cookies from '../../app/api/cookies/route';
import { Button } from './components/Button';

async function getAllMovies() {
    try {
        const userId = await Cookies();

        if (userId) {
            const res = await fetch(`http://localhost:3000/api/movies/getMoviesByIdUser?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
        
            const data = await res.json();

            const movie = data.movies;
        
            return movie;
        } else {
            throw new Error('Failed to fetch cookie data');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }


export default async function Profile() {

    const movies = await getAllMovies();

    return (
        <div className="relative overflow-x-auto">
            <table className="w-6/6 text-lg text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-lg border-b text-center">
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">
                            Mis películas
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    <tr className='text-lg'>
                        <th scope="col" className="px-6"></th>
                        <th scope="col" className="px-6">
                            Id
                        </th>
                        <th scope="col" className="px-6">
                            Titulo
                        </th>
                        <th scope="col" className="px-10 whitespace-nowrap">
                            Fecha de lanzamiento
                        </th>
                        <th scope="col" className="px-6">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {movies?.map((movie: any, index: number) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={movie.id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {movie._id}
                                </td>
                                <td className="px-6 py-4">
                                    {movie.title}
                                </td>
                                <td className='py-4 flex justify-center items-center'>
                                    {movie.release_date}
                                </td>
                                <td>
                                    <Button movieId={movie._id}/>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}