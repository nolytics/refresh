const baseGitHubApiUrl = 'https://api.github.com';

export function composeMongoApiUrl(appId: string, endpoint: string): URL {
    return new URL(`${baseMongoApiUrl(appId)}/${endpoint}`);
}

export function composeGitHubApiUrl(endpoint: string): URL {
    return new URL(`${baseGitHubApiUrl}/${endpoint}`);
}

// todo: set url to global or inject from .env
function baseMongoApiUrl(appId: string): string {
    return `https://eu-central-1.aws.data.mongodb-api.com/app/${appId}/endpoint/data/v1/action`;
}
