import { findHitDocumentsBody, uploadNolyticsJsonFileBody } from "./body";
import { Atlas, GitHub } from "../config";
import { mongoFindEndpoint, githubFileEndpoint } from "./endpoints";
import { githubApiHeaders, mongoDataApiHeaders } from "./header";
import { composeGitHubApiUrl, composeMongoApiUrl } from "./url";
import { PageSummary } from "../data";

export function findHitDocumentsRequest(
    atlas: Atlas,
): Request {
    const method = 'POST';
    const url = composeMongoApiUrl(atlas.baseApiHost, atlas.appId, mongoFindEndpoint);
    const headers = mongoDataApiHeaders(atlas.apiKey);

    const data = findHitDocumentsBody(atlas);

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