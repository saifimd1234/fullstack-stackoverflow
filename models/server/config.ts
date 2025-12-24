import env from "@/env";
import { Client, Avatars, Databases, Functions, Storage, Users } from "node-appwrite";

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apiKey) // Your secret API key
    ;

const database = new Databases(client);
const storage = new Storage(client);
const functions = new Functions(client);
const avatars = new Avatars(client);
const users = new Users(client);

export { client, database, storage, functions, avatars, users };
