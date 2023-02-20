import { Hit } from "../data";
import { MongoDataApiSuccessResponse } from "./response";

export function fromFindHitsResponse(response: Response): Promise<Array<Hit>> {
    return response.text().then((x) => <MongoDataApiSuccessResponse<Hit>>{ ...JSON.parse(x) }).then((x) => x.documents);
}