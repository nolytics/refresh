export interface MongoDataApiSuccessResponse<T> {
    documents: Array<T>;
}

export interface GitHubApiGetFileSuccessResponse {
    sha: string;
}