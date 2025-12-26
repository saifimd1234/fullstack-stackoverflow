import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const { questionId, answer, authorId } = await request.json();
        await databases.createDocument(
            db,
            answerCollection,
            ID.unique(),
            {
                content: answer,
                questionId: questionId,
                authorId: authorId,
            }
        )
        console.log("Answer created successfully");
        console.log({ questionId, answer, authorId });


        //increase author reputation
        const prefs = await users.getPrefs<UserPrefs>(authorId)
        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) + 1,
        })

        return NextResponse.json(
            { message: "Answer created successfully" },
            { status: 201 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Error creating answer" },
            { status: error?.status || error?.code || 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { answerId } = await request.json();
        const answer = await databases.getDocument(db, answerCollection, answerId);
        const authorId = answer.authorId;
        await databases.deleteDocument(db, answerCollection, answerId);

        //decrease the reputation of the author
        const prefs = await users.getPrefs<UserPrefs>(authorId)
        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) - 1,
        })
        return NextResponse.json(
            {
                message: "Answer deleted successfully",
                answer
            },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Error deleting answer" },
            { status: error?.status || error?.code || 500 }
        )
    }
}