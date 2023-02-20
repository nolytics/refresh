const apiKeyHeader = 'api-key';
const contentTypeHeader = 'content-type';

export function mongoDataApiHeaders(apiKey: string): Headers {
    const headers = new Headers();

    headers.set(apiKeyHeader, apiKey);
    headers.set(contentTypeHeader, 'application/json');

    return headers;
}