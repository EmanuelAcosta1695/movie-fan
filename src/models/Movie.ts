import mongoose, {Schema, Document, ObjectId} from 'mongoose';

/*
Se define una interfaz llamada Movie que describe la estructura de los documentos que se 
almacenarán en la colección movies. Cada propiedad en esta interfaz corresponde a un campo 
en los documentos de la colección.
*/
// INTERFAZ
export interface IMovie {
    _id?: ObjectId | string | undefined
    title: string
    poster_path: string
    release_date: string
    idUser: string
    createdAt?: string
    updatedAt?: string
}


/*
Esta interfaz se utiliza para indicar que los objetos que cumplen con esta interfaz son documentos de Mongoose.
Es una forma de conectar el esquema MovieSchema con las interfaces que definen la estructura de los documentos.
Esto es importante para poder crear, leer, actualizar y eliminar documentos en la colección movies.
*/
// ESQUEMA
export interface IMovieSchema extends Document {
    _id?: ObjectId | string | undefined
    title: string
    poster_path: string
    release_date: string
    idUser: string
    createdAt?: string
    updatedAt?: string
}


/*
Es un esquema de Mongoose que define cómo se deben almacenar y validar los documentos 
en la colección movies en la base de datos MongoDB.

Se crea un esquema de Mongoose llamado MovieSchema. Este esquema define la estructura de 
los documentos que se almacenarán en la colección movies.
*/
const MovieSchema: Schema = new Schema(
    {
        title: { type: String, required: true,},
        poster_path: { type: String, required: true, unique: true,},
        release_date: { type: String, required: true,},
        idUser: { type: String, required: true, unique: true,},
    },
    {
        versionKey: false, // para evitar que Mongoose agregue un campo __v (por defecto llamado "versionKey") en los documentos almacenados en la base de datos.
        timestamps: true, // en true para habilitar la funcionalidad de marcas de tiempo en el esquema.  Cuando está habilitada, Mongoose automáticamente agrega dos campos a los documentos: createdAt y updatedAt.
    }
);

/*
Si el modelo ya existe, se utiliza mongoose.models.Movie, de lo contrario, se crea un nuevo modelo 
utilizando el esquema MovieSchema y se le asigna el nombre 'Movie'.
*/
export const Movie = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);

// import mongoose, { Schema } from 'mongoose';

// const movieSchema = new Schema({
//   title: String,
//   poster_path: String,
//   release_date: Date,
//   idUser: String,
// });

// export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);