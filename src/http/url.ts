export function composeMongoApiUrl(baseApiHost: string, appId: string, endpoint: string): URL {
    return new URL(`${baseMongoApiUrl(baseApiHost, appId)}/${endpoint}`);
}

function baseMongoApiUrl(baseApiHost: string, appId: string): string {
    return `https://${baseApiHost}/app/${appId}/endpoint/data/v1/action`;
}
