import { aggregateHitsSummaryBody, aggregateUniqueVisitorsCountByCountryBody, aggregateVisitorsSummaryBody, uploadNolyticsJsonFileBody } from "./body";
import { Atlas, GitHub } from "../config";
import { mongoAggregateEndpoint, githubFileEndpoint } from "./endpoints";
import { githubApiHeaders, mongoDataApiHeaders } from "./header";
import { composeGitHubApiUrl, composeMongoApiUrl } from "./url";
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

export function aggregateVisitorsSummaryRequest(
    atlas: Atlas,
): Request {
    const method = 'POST';
    const url = composeMongoApiUrl(atlas.baseApiHost, atlas.appId, mongoAggregateEndpoint);
    const headers = mongoDataApiHeaders(atlas.apiKey);

    const data = aggregateVisitorsSummaryBody(atlas);

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

export function uploadNolyticsJsonFileRequest(
    github: GitHub,
    nolytics: PageSummary,
    previousFileSHA1?: string,
): Request {
    const method = 'PUT';
    const url = composeGitHubApiUrl(githubFileEndpoint(github.owner, github.repositoryName, github.nolyticsJsonRelativeFilePath));
    const headers = githubApiHeaders(github.personalAccessToken, github.owner);

    const data = uploadNolyticsJsonFileBody(github, nolytics, previousFileSHA1);

    const init = <RequestInit>{
        headers: headers,
        method: method,
        body: data,
    }

    return new Request(url, init);
}

export function getNolyticsJsonFileRequest(
    github: GitHub
): Request {
    const method = 'GET';
    const url = composeGitHubApiUrl(githubFileEndpoint(github.owner, github.repositoryName, github.nolyticsJsonRelativeFilePath));
    const headers = githubApiHeaders(github.personalAccessToken, github.owner);

    const init = <RequestInit>{
        headers: headers,
        method: method,
    }

    return new Request(url, init);
}