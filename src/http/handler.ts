import { Atlas, GitHub, Nolytics } from "../config";
import { configToNolyticsMetadata, PageSummary } from "../data";
import { aggregateHitsSummaryRequest, aggregateUniqueVisitorsCountByCountryRequest, aggregateVisitorsDeviceSummaryRequest } from "./request";
import { fromAggregateHitsSummaryResponse, fromAggregateUniqueVisitorsCountByCountryResponse, fromAggregateVisitorsDeviceSummaryResponse, fromUpsertNolyticsJsonFileResponse } from "./transform";
import { default as upsert, GitHubRepository } from '@web-pacotes/github-upsert';


export default async function (config: Atlas & GitHub & Nolytics): Promise<void> {
    const aggHitsSummaryRequest = aggregateHitsSummaryRequest(config);
    const aggVisitorsDeviceSummaryRequest = aggregateVisitorsDeviceSummaryRequest(config);
    const aggUniqueVisitorsCountByCountryRequest = aggregateUniqueVisitorsCountByCountryRequest(config);

    try {
        const pageSummary = await Promise.all([
            fetch(aggHitsSummaryRequest, { body: aggHitsSummaryRequest.body }).then((x) => fromAggregateHitsSummaryResponse(x)),
            fetch(aggVisitorsDeviceSummaryRequest, { body: aggVisitorsDeviceSummaryRequest.body }).then((x) => fromAggregateVisitorsDeviceSummaryResponse(x)),
            fetch(aggUniqueVisitorsCountByCountryRequest, { body: aggUniqueVisitorsCountByCountryRequest.body }).then((x) => fromAggregateUniqueVisitorsCountByCountryResponse(x)),
        ]).then((x) => <PageSummary>{
            hitsSummary: x[0],
            visitorsSummary: {
                devices: x[1],
                countries: x[2],
            },
            metadata: configToNolyticsMetadata(config),
        });

        const githubRepository = <GitHubRepository>{
            name: config.repositoryName,
            owner: config.owner,
            pat: config.personalAccessToken,
        };

        const pageSummaryBytes = new TextEncoder().encode(JSON.stringify(pageSummary));

        await upsert(githubRepository, pageSummaryBytes, config.nolyticsJsonRelativeFilePath)
            .then(fromUpsertNolyticsJsonFileResponse)
            .then(console.info);
    } catch (err) {
        console.error(err);
    } finally {
        return Promise.resolve();
    }
}