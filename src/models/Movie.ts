import mongoose, {Schema, Document, ObjectId} from 'mongoose';

export interface IMovie {
    _id?: ObjectId | string | undefined
    title: string
    poster_path: string
    release_date: string
    idUser: string
    createdAt?: string
    updatedAt?: string
}

export interface IMovieSchema extends Document {
    _id?: ObjectId | string | undefined
    title: string
    poster_path: string
    release_date: string
    idUser: string
    createdAt?: string
    updatedAt?: string
}

const MovieSchema: Schema = new Schema(
    {
        title: { type: String, required: true, unique: true},
        poster_path: { type: String, required: true, unique: true},
        release_date: { type: String, required: true},
        idUser: { type: String, required: true},
    },
    {
        versionKey: false,
        timestamps: true, 
    }
);

export const Movie = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
