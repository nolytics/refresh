import { Atlas, GitHub } from "../config";
import { hitsToPageSummary } from "../data";
import { findHitDocumentsRequest, getNolyticsJsonFileRequest, uploadNolyticsJsonFileRequest } from "./request";
import { fromFindHitsResponse, fromGetNolyticsJsonFileResponse } from "./transform";

export default async function (config: Atlas & GitHub): Promise<void> {
    const findHitsRequest = findHitDocumentsRequest(config);

    try {
        const pageSummary = await fetch(findHitsRequest, { body: findHitsRequest.body })
            .then((x) => fromFindHitsResponse(x))
            .then((x) => hitsToPageSummary(x));

        await fetch(getNolyticsJsonFileRequest(config))
            .then((x) => fromGetNolyticsJsonFileResponse(x))
            .then((x) => uploadNolyticsJsonFileRequest(config, pageSummary, x))
            .then((x) => fetch(x, { body: x.body }))
            .then((x) => console.info(`upload nolytics json file status: ${x.status}`));
    } catch (err) {
        console.error(err);
    } finally {
        return Promise.resolve();
    }
}