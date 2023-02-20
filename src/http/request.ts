import { findHitDocumentsBody } from "./body";
import { Atlas } from "../config";
import { findEndpoint } from "./endpoints";
import { mongoDataApiHeaders } from "./header";
import { composeMongoApiUrl } from "./url";

export function findHitDocumentsRequest(
    atlas: Atlas,
): Request {
    const method = 'POST';
    const url = composeMongoApiUrl(atlas.appId, findEndpoint);
    const headers = mongoDataApiHeaders(atlas.apiKey);

    const data = findHitDocumentsBody(atlas);

    const init = <RequestInit>{
        headers: headers,
        method: method,
        body: data,
    }

    return new Request(url, init);
}

