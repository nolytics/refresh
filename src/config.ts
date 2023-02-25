export interface Env {
    MONGODB_API_KEY: string;
    MONGODB_APP_ID: string;
    MONGODB_DATA_SOURCE: string;
    MONGODB_DATABASE: string;
    MONGODB_BASE_API_HOST: string;
    GITHUB_OWNER: string;
    GITHUB_REPOSITORY_NAME: string;
    GITHUB_REPOSITORY_BRANCH: string;
    GITHUB_NOLYTICS_JSON_RELATIVE_FILE_PATH: string;
    GITHUB_PERSONAL_ACCESS_TOKEN: string;
    NOLYTICS_TRACKED_WEBSITE_URL: string;
}

export interface Atlas {
    apiKey: string;
    appId: string;
    baseApiHost: string;
    dataSource: string;
    database: string;
}

export interface GitHub {
    owner: string;
    repositoryName: string;
    repositoryBranch: string;
    nolyticsJsonRelativeFilePath: string;
    personalAccessToken: string;
}

export interface Nolytics {
    trackedWebsiteUrl: string;
}

export function fromEnv(env: Env): Atlas & GitHub & Nolytics {
    return {
        apiKey: env.MONGODB_API_KEY,
        appId: env.MONGODB_APP_ID,
        baseApiHost: env.MONGODB_BASE_API_HOST,
        database: env.MONGODB_DATABASE,
        dataSource: env.MONGODB_DATA_SOURCE,
        nolyticsJsonRelativeFilePath: env.GITHUB_NOLYTICS_JSON_RELATIVE_FILE_PATH,
        owner: env.GITHUB_OWNER,
        personalAccessToken: env.GITHUB_PERSONAL_ACCESS_TOKEN,
        repositoryName: env.GITHUB_REPOSITORY_NAME,
        repositoryBranch: env.GITHUB_REPOSITORY_BRANCH,
        trackedWebsiteUrl: env.NOLYTICS_TRACKED_WEBSITE_URL,
    }
}