import { CountryVisitorsSummary, HitsSummary, PageHitsSummary, VisitorsCountrySummary, VisitorsDeviceSummary } from "../data";
import { GitHubApiGetFileSuccessResponse, MongoDataApiSuccessResponse } from "./response";

export function fromAggregateHitsSummaryResponse(response: Response): Promise<HitsSummary> {
    return response.text().then((x) => <MongoDataApiSuccessResponse<PageHitsSummary>>{ ...JSON.parse(x) }).then((x) => x.documents);
}

export function fromAggregateVisitorsDeviceSummaryResponse(response: Response): Promise<VisitorsDeviceSummary> {
    return response.text().then((x) => <MongoDataApiSuccessResponse<VisitorsDeviceSummary>>{ ...JSON.parse(x) }).then((x) => x.documents).then((x) => x[0]);
}

export function fromAggregateUniqueVisitorsCountByCountryResponse(response: Response): Promise<VisitorsCountrySummary> {
    return response.text().then((x) => <MongoDataApiSuccessResponse<CountryVisitorsSummary>>{ ...JSON.parse(x) }).then((x) => x.documents);
}

export function fromGetNolyticsJsonFileResponse(response: Response): Promise<string | undefined> {
    return response.text().then((x) => <GitHubApiGetFileSuccessResponse>{ ...JSON.parse(x) }).then((x) => x.sha);
}