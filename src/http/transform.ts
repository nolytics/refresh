import { HitsSummary, PageHitsSummary, VisitorsSummary } from "../data";
import { GitHubApiGetFileSuccessResponse, MongoDataApiSuccessResponse } from "./response";

export function fromAggregateHitsSummaryResponse(response: Response): Promise<HitsSummary> {
    return response.text().then((x) => <MongoDataApiSuccessResponse<PageHitsSummary>>{ ...JSON.parse(x) }).then((x) => x.documents);
}

export function fromAggregateVisitorsSummaryResponse(response: Response): Promise<VisitorsSummary> {
    return response.text().then((x) => <MongoDataApiSuccessResponse<VisitorsSummary>>{ ...JSON.parse(x) }).then((x) => x.documents).then((x) => x[0]);
}

export function fromGetNolyticsJsonFileResponse(response: Response): Promise<string | undefined> {
    return response.text().then((x) => <GitHubApiGetFileSuccessResponse>{ ...JSON.parse(x) }).then((x) => x.sha);
}