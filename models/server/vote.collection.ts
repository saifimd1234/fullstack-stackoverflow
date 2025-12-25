import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { tablesDb } from "./config";

export default async function createVoteCollection() {
    // Creating Collection
    try {
        await tablesDb.createTable({
            databaseId: db,
            tableId: voteCollection,
            name: voteCollection,
            permissions: [
                Permission.create("users"),
                Permission.read("any"),
                Permission.read("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ]
        });
        console.log("Vote Collection Created");
    } catch (error) {
        console.log("Vote Collection already exists");
    }

    // Creating Attributes
    await Promise.all([
        tablesDb.createEnumColumn({
            databaseId: db,
            tableId: voteCollection,
            key: "type",
            elements: ["question", "answer"],
            required: true,
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: voteCollection,
            key: "typeId",
            size: 50,
            required: true,
        }),
        tablesDb.createEnumColumn({
            databaseId: db,
            tableId: voteCollection,
            key: "voteStatus",
            elements: ["upvoted", "downvoted"],
            required: true,
        }),
        tablesDb.createStringColumn({
            databaseId: db,
            tableId: voteCollection,
            key: "votedById",
            size: 50,
            required: true,
        }),
    ]);
    console.log("Vote Attributes Created");
}
