import { IndexType, Permission } from "node-appwrite";
import { answerCollection, db } from "../name";
import { tablesDb } from "./config";

export default async function createAnswerCollection() {
    // Creating Collection
    try {
        await tablesDb.createTable({
            databaseId: db,
            tableId: answerCollection,
            name: answerCollection,
            permissions: [
                Permission.create("users"),
                Permission.read("any"),
                Permission.read("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ]
        });
        console.log("Answer Collection Created");
    } catch (error) {
        console.log("Answer Collection already exists");
    }

    // Creating Attributes
    await Promise.all([
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: answerCollection,
            key: "content",
            size: 10000,
            required: true
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: answerCollection,
            key: "questionId",
            size: 50,
            required: true
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: answerCollection,
            key: "authorId",
            size: 50,
            required: true
        }),
    ]);
    console.log("Answer Attributes Created");
}
