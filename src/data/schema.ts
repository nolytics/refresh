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

export type PageSummary = Array<PageHitsSummary>;

export interface PageHitsSummary {
    pageId: PageId;
    hits: Array<Hit>;
    hitsCount: number;
}