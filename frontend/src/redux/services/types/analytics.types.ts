export interface AnalyticsData {
    products: number;
    users: number;
    categories: number;
}

export interface AnalyticsDate {
    date: string;
    users: number;
    products: number;
}

export interface AnalyticsResponse {
    analyticsData: AnalyticsData;
    dailySalesData: AnalyticsDate[];
}
