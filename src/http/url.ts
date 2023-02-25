const baseGitHubApiUrl = 'https://api.github.com';

export function composeMongoApiUrl(baseApiHost: string, appId: string, endpoint: string): URL {
    return new URL(`${baseMongoApiUrl(baseApiHost, appId)}/${endpoint}`);
}

export function composeGitHubApiUrl(endpoint: string): URL {
    return new URL(`${baseGitHubApiUrl}/${endpoint}`);
}

function baseMongoApiUrl(baseApiHost: string, appId: string): string {
    return `https://${baseApiHost}/app/${appId}/endpoint/data/v1/action`;
}
