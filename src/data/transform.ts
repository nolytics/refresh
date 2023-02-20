import { Hit, PageHitsSummary, PageSummary } from "./schema";

export function hitsToPageSummary(hits: Array<Hit>): PageSummary {
    const hitsGroup = groupBy<Hit>(hits, (h) => h.pageId);

    return Object.entries(hitsGroup).map((m) => <PageHitsSummary>{
        pageId: m[0],
        hits: m[1],
        hitsCount: m[1].length,
    });
}

function groupBy<T>(arr: T[], fn: (item: T) => any) {
    return arr.reduce<Record<string, T[]>>((prev, curr) => {
        const groupKey = fn(curr);
        const group = prev[groupKey] || [];
        group.push(curr);
        return { ...prev, [groupKey]: group };
    }, {});
}