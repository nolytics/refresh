import { Nolytics } from "../config";
import { NolyticsMetadata } from "./schema";

export function configToNolyticsMetadata(nolytics: Nolytics): NolyticsMetadata {
    return {
        lastUpdatedMS: Date.now(),
        websiteUrl: nolytics.trackedWebsiteUrl,
    };
}