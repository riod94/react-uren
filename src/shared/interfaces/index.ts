import { type ReactNode } from "react";

interface DelayRenderProps {
    delay?: number;
    children: ReactNode;
}

interface NetworkStatus {
    downlink?: number;
    downlinkMax?: number;
    effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
    rtt?: number;
    saveData?: boolean;
    type?:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "wifi"
    | "wimax"
    | "none"
    | "other"
    | "unknown";
}

interface TimeAgoLocales {
    [key: string]: {
        ago: string;
        justNow: string;
        fromNow: string;
        seconds: string;
        oneMinuteAgo: string;
        oneMinuteFromNow: string;
        minutes: string;
        oneHourAgo: string;
        oneHourFromNow: string;
        hours: string;
        yesterday: string;
        tomorrow: string;
        days: string;
        lastWeek: string;
        nextWeek: string;
        weeks: string;
        lastMonth: string;
        nextMonth: string;
        months: string;
        lastYear: string;
        nextYear: string;
        lastCentury: string;
        nextCentury: string;
        centuries: string;
    };
}

interface StrFuncInterface {
    camel: (str: string) => string;
    isJson: (str: string) => boolean;
    isUrl: (str: string) => boolean;
    kebab: (str: string) => string;
    length: (str: string) => number;
    limit: (str: string, limit: number) => string;
    numToAlpha: (num: number) => string | null;
    random: (length: number) => string;
    slug: (str: string, separator?: string) => string;
    snake: (str: string) => string;
    studly: (str: string) => string;
    title: (str: string, delimiter?: string) => string;
    timeAgo: (
        time: string | number | Date,
        lang?: string,
        customLocales?: TimeAgoLocales
    ) => string;
}

interface StorageProperties<T> {
    /** Storage key */
    key: string;

    /** Default value that will be set if value is not found in storage */
    defaultValue?: T;

    /** If set to true, value will be update is useEffect after mount */
    getInitialValueInEffect?: boolean;

    /** Function to serialize value into string to be save in storage */
    serialize?: (value: T) => string;

    /** Function to deserialize string value from storage to value */
    deserialize?: (value: string | undefined) => T;
}

export type { DelayRenderProps, NetworkStatus, StrFuncInterface, TimeAgoLocales, StorageProperties };