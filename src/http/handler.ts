import { Atlas } from "../config";
import { hitsToPageSummary } from "../data";
import { findHitDocumentsRequest } from "./request";
import { fromFindHitsResponse } from "./transform";

export default async function (atlas: Atlas): Promise<void> {
    const findHitsRequest = findHitDocumentsRequest(atlas);

    try {
        const findHitsResponse = await fetch(findHitsRequest, { body: findHitsRequest.body });

        if (findHitsResponse.ok) {
            const hits = await fromFindHitsResponse(findHitsResponse);
            const pageSummary = hitsToPageSummary(hits);

            console.log(JSON.stringify(pageSummary, null, 2));
        }
    } finally {
        return Promise.resolve();
    }
}