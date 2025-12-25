import { Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { tablesDb } from "./config";

export default async function createCommentCollection() {
    // Creating Collection
    try {
        await tablesDb.createTable({
            databaseId: db,
            tableId: commentCollection,
            name: commentCollection,
            permissions: [
                Permission.create("users"),
                Permission.read("any"),
                Permission.read("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ]
        });
        console.log("Comment Collection Created");

    } catch (error) {
        console.log("Comment Collection already exists");
    }

    // Creating Attributes
    await Promise.all([
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: commentCollection,
            key: "content",
            size: 10000,
            required: true
        }),
        tablesDb.createEnumColumn({
            databaseId: db,
            tableId: commentCollection,
            key: "type",
            elements: ["answer", "question"],
            required: true,
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: commentCollection,
            key: "typeId",
            size: 50,
            required: true
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: commentCollection,
            key: "authorId",
            size: 50,
            required: true
        }),
    ]);
    console.log("Comment Attributes Created");
}
