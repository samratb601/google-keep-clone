import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import Note from "@/models/note";
import { NoteType } from "@/types/note";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectDB();
        const notes = await Note.find({ user_id: "1" }).sort({ updatedAt: -1 });
        console.log("notes-->", notes);
        return NextResponse.json({
            success: true,
            data: notes || [],
        });
    } catch (e) {
        console.error("Error while trying to get notes\n", e);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
    console.log("req recieved");
    const _req = await req.json();
    console.log("body---->", _req);
    const { title, content, pinned } = _req as NoteType;

    try {
        await connectDB();
        const doc = new Note({
            title: title || "",
            content: content || "",
            pinned: false,
            user_id: "1",
        });
        const res = await doc.save();
        console.log("doc created===>", res);
        return NextResponse.json({
            success: true,
            data: res,
            message: "created.",
        });
    } catch (e) {
        console.error("Error while trying to save a note\n", e);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
};

export const PATCH = async (req: NextRequest, res: NextResponse) => {
    console.log("req recieved");
    const _req = await req.json();
    console.log("patch body---->", _req);
    const { _id, title, content, pinned } = _req as NoteType;
    console.log("--------------->", _req);
    try {
        await connectDB();
        const res = await Note.findOne({ _id }).updateOne({
            title,
            content,
            pinned: pinned,
        });
        console.log("====>", res);
        // const res = await doc.save();
        const updatedRes = await Note.findOne({ _id });

        console.log("updated res", updatedRes);
        return NextResponse.json({
            success: true,
            data: updatedRes,
            message: "updated.",
        });
    } catch (e) {
        console.error("Error while trying to save a note\n", e);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    console.log("req recieved");
    const _req = await req.json();
    console.log("patch body---->", _req);
    const { _id } = _req as NoteType;
    console.log("--------------->", _req);
    try {
        await connectDB();
        const updatedRes = await Note.deleteOne({ _id });

        console.log("deleted res", updatedRes);
        return NextResponse.json({
            success: true,
            message: "Deleted.",
        });
    } catch (e) {
        console.error("Error while trying to delete a note\n", e);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
};
