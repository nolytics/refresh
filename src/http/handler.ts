import { Atlas, GitHub, Nolytics } from "../config";
import { configToNolyticsMetadata, PageSummary } from "../data";
import { aggregateHitsSummaryRequest, aggregateUniqueVisitorsCountByCountryRequest, aggregateVisitorsSummaryRequest, getNolyticsJsonFileRequest, uploadNolyticsJsonFileRequest } from "./request";
import { fromAggregateHitsSummaryResponse, fromAggregateUniqueVisitorsCountByCountryResponse, fromAggregateVisitorsSummaryResponse, fromGetNolyticsJsonFileResponse } from "./transform";

export default async function (config: Atlas & GitHub & Nolytics): Promise<void> {
    const aggHitsSummaryRequest = aggregateHitsSummaryRequest(config);
    const aggVisitorsSummaryRequest = aggregateVisitorsSummaryRequest(config);
    const aggUniqueVisitorsCountByCountryRequest = aggregateUniqueVisitorsCountByCountryRequest(config);

    try {
        const pageSummary = await Promise.all([
            fetch(aggHitsSummaryRequest, { body: aggHitsSummaryRequest.body }).then((x) => fromAggregateHitsSummaryResponse(x)),
            fetch(aggVisitorsSummaryRequest, { body: aggVisitorsSummaryRequest.body }).then((x) => fromAggregateVisitorsSummaryResponse(x)),
            fetch(aggUniqueVisitorsCountByCountryRequest, { body: aggUniqueVisitorsCountByCountryRequest.body }).then((x) => fromAggregateUniqueVisitorsCountByCountryResponse(x)),
        ]).then((x) => <PageSummary>{
            hitsSummary: x[0],
            visitorsSummary: x[1],
            visitorsCountrySummary: x[2],
            metadata: configToNolyticsMetadata(config),
        });

        await fetch(getNolyticsJsonFileRequest(config))
            .then((x) => fromGetNolyticsJsonFileResponse(x))
            .then((x) => uploadNolyticsJsonFileRequest(config, pageSummary, x))
            .then((x) => fetch(x, { body: x.body }))
            .then((x) => console.info(`upload nolytics json file status: ${x.status}`));
    } catch (err) {
        console.error(err);
    } finally {
        return Promise.resolve();
    }
}