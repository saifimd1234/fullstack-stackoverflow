import { Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import { tablesDb } from "./config";

export default async function createQuestionCollection() {
    try {
        await tablesDb.createTable({
            databaseId: db,
            tableId: questionCollection,
            name: questionCollection,
            permissions: [
                Permission.read("any"),
                Permission.read("users"),
                Permission.update("users"),
                Permission.delete("users"),
                Permission.create("users"),
            ]
        });
        console.log("Question collection created");
    } catch (error) {
        console.log("Question collection already exists");
    }


    //creating attributes and Indexes
    await Promise.all([
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: questionCollection,
            key: "title",
            size: 100,
            required: true
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: questionCollection,
            key: "content",
            size: 1000000,
            required: true
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: questionCollection,
            key: "authorId",
            size: 50,
            required: true
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: questionCollection,
            key: "tags",
            size: 50,
            required: true,
            array: true
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: questionCollection,
            key: "attachmentId",
            size: 50,
            required: false
        }),
    ]);
    console.log("Question Attributes created")
}