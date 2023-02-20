import { Atlas, GitHub } from "../config";
import { PageSummary } from "../data";

const hitCollection = 'hit';
const defaultMaxFindDocumentsLimitCount = 50000;

const defaultUploadNolyticsJsonFileCommitMessage = 'nolytics';

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

export function uploadNolyticsJsonFileBody(github: GitHub, nolytics: PageSummary, sha?: string) {
    const nolyticsJSON = JSON.stringify(nolytics);
    const nolyticsJSONB64 = btoa(nolyticsJSON);

    const body = <any>{
        message: defaultUploadNolyticsJsonFileCommitMessage,
        content: nolyticsJSONB64,
        branch: github.repositoryBranch,
    };

    if (sha != null) {
        body.sha = sha;
    }

    return JSON.stringify(body);
}