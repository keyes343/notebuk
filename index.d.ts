import mongoose from "mongoose";

declare global {
    var mongoose: {
        conn: null | Promise<typeof mongoose>;
        promise: null | Promise<typeof mongoose>;
    };
}