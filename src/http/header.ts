const apiKeyHeader = 'api-key';
const contentTypeHeader = 'content-type';
const acceptHeader = 'accept';
const authorizationHeader = 'authorization';
const githubApiVersionHeader = 'x-github-api-version';
const userAgentHeader = 'user-agent';

export function mongoDataApiHeaders(apiKey: string): Headers {
    const headers = new Headers();

    headers.set(apiKeyHeader, apiKey);
    headers.set(contentTypeHeader, 'application/json');

    return headers;
}

export function githubApiHeaders(personalAccessToken: string, owner: string): Headers {
    const headers = new Headers();

    headers.set(acceptHeader, 'application/vnd.github+json');
    headers.set(authorizationHeader, `bearer ${personalAccessToken}`);
    headers.set(githubApiVersionHeader, '2022-11-28');
    headers.set(userAgentHeader, owner);

    return headers;
}