import { Nolytics } from "../config";
import { Hit, HitsSummary, NolyticsMetadata, PageHitsSummary, PageSummary, VisitorsSummary } from "./schema";

export function hitsToPageSummary(nolytics: Nolytics, hits: Array<Hit>): PageSummary {
    return {
        hitsSummary: hitsToHitsSummary(hits),
        visitorsSummary: hitsToVisitorsSummary(hits),
        metadata: configToNolyticsMetadata(nolytics),
    }
}

function hitsToHitsSummary(hits: Array<Hit>): HitsSummary {
    const hitsGroup = groupBy<Hit>(hits, (h) => h.pageId);

    return Object.entries(hitsGroup).map((m) => <PageHitsSummary>{
        pageId: m[0],
        hitsCount: m[1].length,
    });
}

function hitsToVisitorsSummary(hits: Array<Hit>): VisitorsSummary {
    const visitorsCount = hits.length;

    const mobileVisitorsCount = hits.reduce((p, c) => p + (c.metadata.isMobile ? 1 : 0), 0);
    const nonMobileVisitorsCount = visitorsCount - mobileVisitorsCount;

    return {
        mobileVisitorsCount: mobileVisitorsCount,
        nonMobileVisitorsCount: nonMobileVisitorsCount,
        mobileVisitorsPercentage: mobileVisitorsCount / visitorsCount,
        nonMobileVisitorsPercentage: nonMobileVisitorsCount / visitorsCount,
    };
}

function configToNolyticsMetadata(nolytics: Nolytics): NolyticsMetadata {
    return {
        lastUpdatedMS: Date.now(),
        websiteUrl: nolytics.trackedWebsiteUrl,
    };
}

function groupBy<T>(arr: T[], fn: (item: T) => any) {
    return arr.reduce<Record<string, T[]>>((prev, curr) => {
        const groupKey = fn(curr);
        const group = prev[groupKey] || [];
        group.push(curr);
        return { ...prev, [groupKey]: group };
    }, {});
}