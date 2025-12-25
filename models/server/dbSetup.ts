import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createStorage from "./storageSetup";
import createVoteCollection from "./vote.collection";
import { databases, tablesDb } from "./config";

export default async function getOrCreateDB() {
    try {
        await databases.get({
            databaseId: db
        });
        console.log("DB Connected");
    } catch (error) {
        try {
            await databases.create({
                databaseId: db,
                name: db
            });
            console.log("DB Created");
            await Promise.all([
                createAnswerCollection(),
                createCommentCollection(),
                createQuestionCollection(),
                createStorage(),
                createVoteCollection(),
            ]);
            console.log("DB Created and Tables Created");
        } catch (error) {
            console.error("Error creating DB:", error);
        }
    }
    return databases;
}