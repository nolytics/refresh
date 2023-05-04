import { Atlas } from "../config";
import { hitsSummaryAggregation, PageSummary, uniqueVisitorsCountByCountryAggregation, visitorsDeviceSummaryAggregation } from "../data";

const hitCollection = 'hit';


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
