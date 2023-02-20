import { Hit } from "../data";
import { GitHubApiGetFileSuccessResponse, MongoDataApiSuccessResponse } from "./response";

export function fromFindHitsResponse(response: Response): Promise<Array<Hit>> {
    return response.text().then((x) => <MongoDataApiSuccessResponse<Hit>>{ ...JSON.parse(x) }).then((x) => x.documents);
}

export function fromGetNolyticsJsonFileResponse(response: Response): Promise<string | undefined> {
    return response.text().then((x) => <GitHubApiGetFileSuccessResponse>{ ...JSON.parse(x) }).then((x) => x.sha);
}