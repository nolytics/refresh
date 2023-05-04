import { aggregateHitsSummaryBody, aggregateUniqueVisitorsCountByCountryBody, aggregateVisitorsDeviceSummaryBody, uploadNolyticsJsonFileBody } from "./body";
import { Atlas, GitHub } from "../config";
import { mongoAggregateEndpoint, githubFileEndpoint } from "./endpoints";
import { githubApiHeaders, mongoDataApiHeaders } from "./header";
import { composeMongoApiUrl } from "./url";
import { PageSummary } from "../data";

export function aggregateHitsSummaryRequest(
    atlas: Atlas,
): Request {
    const method = 'POST';
    const url = composeMongoApiUrl(atlas.baseApiHost, atlas.appId, mongoAggregateEndpoint);
    const headers = mongoDataApiHeaders(atlas.apiKey);

    const data = aggregateHitsSummaryBody(atlas);

    const init = <RequestInit>{
        headers: headers,
        method: method,
        body: data,
    }

    return new Request(url, init);
}

export function aggregateVisitorsDeviceSummaryRequest(
    atlas: Atlas,
): Request {
    const method = 'POST';
    const url = composeMongoApiUrl(atlas.baseApiHost, atlas.appId, mongoAggregateEndpoint);
    const headers = mongoDataApiHeaders(atlas.apiKey);

    const data = aggregateVisitorsDeviceSummaryBody(atlas);

    const init = <RequestInit>{
        headers: headers,
        method: method,
        body: data,
    }

    return new Request(url, init);
}

export function aggregateUniqueVisitorsCountByCountryRequest(
    atlas: Atlas,
): Request {
    const method = 'POST';
    const url = composeMongoApiUrl(atlas.baseApiHost, atlas.appId, mongoAggregateEndpoint);
    const headers = mongoDataApiHeaders(atlas.apiKey);

    const data = aggregateUniqueVisitorsCountByCountryBody(atlas);

    const init = <RequestInit>{
        headers: headers,
        method: method,
        body: data,
    }

    return new Request(url, init);
}