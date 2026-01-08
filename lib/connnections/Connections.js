import mongoose from "mongoose";

class ConnectToDB {
    #DB_STRING;
    constructor() {
        this.#DB_STRING = process.env.DB_CONNECTION_STRING;
    }
    async ConnectToDB() {
        try {
            mongoose.connect(this.#DB_STRING);
            console.warn("Connection Established!");
        } catch (err) {
            console.warn("Connection Interrupted!");
            throw new Error(err.message);
        }
    }
}

const getDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        const db = new ConnectToDB();
        await db.ConnectToDB();
    } catch (err) {
        console.warn(
            "Something is wrong with the app core data connection: ",
            err.message
        );
    }
};

export default getDB