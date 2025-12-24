import env from "@/env";
import { Client, Avatars, Databases, Functions, Storage, Users, TablesDB } from "node-appwrite";

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apiKey) // Your secret API key
    ;

const databases = new Databases(client);
const tablesDb = new TablesDB(client);
const storage = new Storage(client);
const functions = new Functions(client);
const avatars = new Avatars(client);
const users = new Users(client);

export { client, databases, tablesDb, storage, functions, avatars, users };
