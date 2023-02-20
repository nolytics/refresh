import { Atlas } from "../config";

const hitCollection = 'hit';
const defaultMaxFindDocumentsLimitCount = 50000;

export function findHitDocumentsBody(atlas: Atlas) {
    return JSON.stringify(
        {
            dataSource: atlas.dataSource,
            database: atlas.database,
            collection: hitCollection,
            limit: defaultMaxFindDocumentsLimitCount,
        }
    );
}