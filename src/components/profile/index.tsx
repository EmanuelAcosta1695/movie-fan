import Cookies from '../../app/api/cookies/route';


async function getAllMovies() {
    try {
        const userId = await Cookies();

        console.log("userId: ", userId)

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
            <table className="w-5/6 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="border-b text-center">
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">
                            Mis películas
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                    <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Release date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {movies?.map((movie: any, index: number) => {
                        const isEven = index % 2 === 0;
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
                                <td className="px-6 py-4">
                                    {movie.release_date}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


// let movieId;

// // get movie
// fetch(`/api/movies/getMovies`, {
// method: "POST",
// headers: {
//     "Content-Type": "application/json",
// },
// body: JSON.stringify({
//     title: title,
//     idUser: idUser,
// }),
// })
// .then((response) => {
// if (!response.ok) {
//     throw new Error("Network response was not ok");
// }
// return response.json(); // Devuelve una promesa
// })
// .then((data) => {
// const movie = data.movie;

// if (movie) {
//     console.log("Película encontrada: ", movie);
//     movieId = movie.id;
//     console.log("Película encontrada. Su id: ", movieId);
// } else {
//     console.log("Película no encontrada.");
// }
// })
// .catch((error) => {
// console.error("Error al encontrar la película:", error);
// });


// // delete favorite movie
// fetch(`/api/movies/deleteMovies?movieId=${movieId}`, {
// method: "DELETE",
// headers: {
//     "Content-Type": "application/json",
// },
// })
// .then((response) => {
// if (!response.ok) {
//     throw new Error("Network response was not ok");
// }
// return response.json(); // Devuelve una promesa
// })
// .then((data) => {
// console.log("Película eliminada:", data);
// })
// .catch((error) => {
// console.error("Error al eliminar la película:", error);
// });