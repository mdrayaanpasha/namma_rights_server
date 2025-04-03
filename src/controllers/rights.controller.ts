import { Request, Response } from "express";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URL || ""; 
const client = new MongoClient(uri);

export async function GetListRights(req: Request, res: Response): Promise<any> {
    try {
        await client.connect();
        const db = client.db("namma_rights"); 
        const collection = db.collection("Categories"); 
        
        const categories = await collection.find().toArray();

        const categoryKeys = categories.map(category => {
            const { _id, ...rest } = category;
            return Object.keys(rest); 
        }).flat() 

        return res.status(200).json(categoryKeys);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch category keys", details: error });
    } finally {
        await client.close();
    }
}


export async function GetRightQuestions(req: Request, res: Response): Promise<any> {
    try {
        await client.connect();
        const db = client.db("namma_rights"); 
        const collection = db.collection("Categories"); 

        const right = req.params.right; 

        const categories = await collection.find().toArray();
        const questions = categories
            .map(category => category[right]) 
            .filter(Boolean) 
            .flat();

        if (!questions.length) {
            return res.status(404).json({ error: "No questions found for this right." });
        }

        return res.status(200).json({ right, questions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch questions", details: error });
    } finally {
        await client.close();
    }
}
