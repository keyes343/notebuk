import mongoose from "mongoose";

declare global {
    var mongoose: {
        conn: null | Promise<mongoose>;
        promise: null | Promise<mongoose>;
    };
}