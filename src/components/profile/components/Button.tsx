'use client'

interface buttonProps {
    movieId: string
  }

async function handleDeleteMovie(movieId: string) {

    try {
        const res = await fetch(`http://localhost:3000/api/movies/deleteMovies?movieId=${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
    
        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  };


export function Button({ movieId }: buttonProps) {
    console.log("Movie id en Button: ", movieId)

    const handleClick = async () => {
        await handleDeleteMovie(movieId);
      };

    return (
        <div>
            <button onClick={handleClick}>🗑️</button>
        </div>
    )
}