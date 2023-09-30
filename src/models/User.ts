import mongoose, {Schema, Document, ObjectId} from 'mongoose';

export interface IUser {
    _id?: ObjectId | string | undefined
    email: string
    password: string
    createdAt?: string
    updatedAt?: string
}

export interface IUserSchema extends Document {
    _id?: ObjectId | string | undefined
    email: string
    password: string

    // estas dos propiedades se crean automaticamente por el timestamp
    createdAt?: string
    updatedAt?: string
}

const UserSchema: Schema = new Schema(
    {
       email: { type: String, required: true, unique: true,},
       password: { type: String, required: true,},
    },
    {
        versionKey: false, // para evitar que Mongoose agregue un campo __v (por defecto llamado "versionKey") en los documentos almacenados en la base de datos.
        timestamps: true, // en true para habilitar la funcionalidad de marcas de tiempo en el esquema.  Cuando está habilitada, Mongoose automáticamente agrega dos campos a los documentos: createdAt y updatedAt.
    }
);

// validacion para crear o si esta creado el modelo
export const User = mongoose.models.User || mongoose.model('User', UserSchema);


/*
Document es una clase proporcionada por Mongoose que representa un documento en una 
colección MongoDB. En este caso, IUserSchema se extiende de Document para indicar 
que un documento de usuario en la base de datos MongoDB debe cumplir con la estructura 
definida en IUserSchema. Esto permite que Mongoose proporcione métodos y funcionalidades 
adicionales para interactuar con documentos de usuario.

IUserSchema: IUserSchema es otra interfaz que extiende de Document. 
Esta interfaz define la estructura esperada de un documento de usuario en la base de datos 
MongoDB. Al extender de Document, estás indicando que los documentos de usuario almacenados 
en la base de datos deben coincidir con esta estructura.
*/