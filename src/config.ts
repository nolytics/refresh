export interface Env {
    MONGODB_API_KEY: string;
    MONGODB_APP_ID: string;
    MONGODB_DATA_SOURCE: string;
    MONGODB_DATABASE: string;
    GITHUB_OWNER: string;
    GITHUB_REPOSITORY_NAME: string;
    GITHUB_REPOSITORY_BRANCH: string;
    GITHUB_NOLYTICS_JSON_RELATIVE_FILE_PATH: string;
    GITHUB_PERSONAL_ACCESS_TOKEN: string;
}

export interface Atlas {
    apiKey: string;
    appId: string;
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

export function fromEnv(env: Env): Atlas & GitHub {
    return {
        apiKey: env.MONGODB_API_KEY,
        appId: env.MONGODB_APP_ID,
        database: env.MONGODB_DATABASE,
        dataSource: env.MONGODB_DATA_SOURCE,
        nolyticsJsonRelativeFilePath: env.GITHUB_NOLYTICS_JSON_RELATIVE_FILE_PATH,
        owner: env.GITHUB_OWNER,
        personalAccessToken: env.GITHUB_PERSONAL_ACCESS_TOKEN,
        repositoryName: env.GITHUB_REPOSITORY_NAME,
        repositoryBranch: env.GITHUB_REPOSITORY_BRANCH,
    }
}