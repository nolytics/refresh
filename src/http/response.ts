import { Document } from "../data";

export interface MongoDataApiSuccessResponse<T extends Document> {
    documents: Array<T>;
}