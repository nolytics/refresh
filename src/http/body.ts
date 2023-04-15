import { Atlas, GitHub } from "../config";
import { hitsSummaryAggregation, PageSummary, uniqueVisitorsCountByCountryAggregation, visitorsDeviceSummaryAggregation } from "../data";

const hitCollection = 'hit';

const defaultUploadNolyticsJsonFileCommitMessage = 'nolytics';

export function aggregateHitsSummaryBody(atlas: Atlas) {
    return JSON.stringify(
        {
            dataSource: atlas.dataSource,
            database: atlas.database,
            collection: hitCollection,
            pipeline: hitsSummaryAggregation,
        }
    );
}

export function aggregateVisitorsDeviceSummaryBody(atlas: Atlas) {
    return JSON.stringify(
        {
            dataSource: atlas.dataSource,
            database: atlas.database,
            collection: hitCollection,
            pipeline: visitorsDeviceSummaryAggregation,
        }
    );
}

export function aggregateUniqueVisitorsCountByCountryBody(atlas: Atlas) {
    return JSON.stringify(
        {
            dataSource: atlas.dataSource,
            database: atlas.database,
            collection: hitCollection,
            pipeline: uniqueVisitorsCountByCountryAggregation,
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