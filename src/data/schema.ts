type ObjectId = string;
type PageId = string;

export interface Document {
    _id: ObjectId;
};

export interface Page extends Document {
    name: string;
    path: PageId;
}

export interface Hit extends Document {
    pageId: PageId,
    client: Client;
    metadata: Metadata;
};

export interface Client {
    anonymizedId: string;
    country: string;
};

export interface Metadata {
    browser: string;
    isMobile: boolean;
};

export interface PageSummary {
    hitsSummary: HitsSummary;
    visitorsSummary: VisitorsSummary;
    metadata: NolyticsMetadata;
};

export type HitsSummary = Array<PageHitsSummary>;

export interface PageHitsSummary {
    pageId: PageId;
    hitsCount: number;
};

export interface VisitorsSummary {
    allMobileVisitorsCount: number;
    allNonMobileVisitorsCount: number;
    allMobileVisitorsPercentage: number;
    allNonMobileVisitorsPercentage: number;
    uniqueMobileVisitorsCount: number;
    uniqueNonMobileVisitorsCount: number;
    uniqueMobileVisitorsPercentage: number;
    uniqueNonMobileVisitorsPercentage: number;
};

export interface NolyticsMetadata {
    websiteUrl: string;
    lastUpdatedMS: number;
};