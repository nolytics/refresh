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
}

export type HitsSummary = Array<PageHitsSummary>;

export interface PageHitsSummary {
    pageId: PageId;
    hits: Array<Hit>;
    hitsCount: number;
}

export interface VisitorsSummary {
    mobileVisitorsCount: number;
    nonMobileVisitorsCount: number;
    mobileVisitorsPercentage: number;
    nonMobileVisitorsPercentage: number;
}