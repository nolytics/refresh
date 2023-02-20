export interface Env {
    MONGODB_API_KEY: string;
    MONGODB_APP_ID: string;
    MONGODB_DATA_SOURCE: string;
    MONGODB_DATABASE: string;
}

export interface Atlas {
    apiKey: string;
    appId: string;
    dataSource: string;
    database: string;
}

export function fromEnv(env: Env): Atlas {
    return {
        apiKey: env.MONGODB_API_KEY,
        appId: env.MONGODB_APP_ID,
        database: env.MONGODB_DATABASE,
        dataSource: env.MONGODB_DATA_SOURCE,
    }
}