import "./style.css";

interface Props {
    film: string
    photo: string
  }

export default function Card({ film, photo } : Props) {

    const cardStyle = {
        cursor: 'pointer',
      };
    
    // ver foto peli: https://image.tmdb.org/t/p/w200/51tqzRtKMMZEYUpSYkrUE7v9ehm.jpg   // poster_path
    return (
        <div className="card">
            <img src={`https://image.tmdb.org/t/p/w200${photo}`} alt="Actor 1"/>
            <div className="card-content">
                <h2 style={cardStyle}>{film}</h2>
            </div>
        </div>
    )
}

{/* const results = data.results;
const resultsContainer = document.getElementById("results-container"); // CONTENEDOR

// Crear la card para cada actor
results.forEach(person => {
const card = document.createElement("div");
card.classList.add("card");

const profileImage = document.createElement("img");
profileImage.src = `https://image.tmdb.org/t/p/w200${person.profile_path}`;
profileImage.alt = person.name;

const cardContent = document.createElement("div");
cardContent.classList.add("card-content");

const nameElement = document.createElement("h2");
nameElement.textContent = person.name;
nameElement.style.cursor = "pointer"; // Agregar cursor de clic

nameElement.addEventListener("click", () => viewPerson(person.id));

cardContent.appendChild(nameElement);


card.appendChild(profileImage);
card.appendChild(cardContent);

resultsContainer.appendChild(card); */}