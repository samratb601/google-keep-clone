import mongoose from "mongoose"

const schema = new mongoose.Schema(
    {
        title: { type: String },
        content: { type: String },
        pinned: { type: Boolean, default: false },
        bgColor: { type: String, default: "" },
        user_id: { type: String },
    },
    { timestamps: true }
)

export default mongoose.models?.Note || mongoose.model("Note", schema)