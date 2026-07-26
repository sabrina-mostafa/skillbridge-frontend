import { AvailableDate } from "@/types/availability.type";

export type CalendarCell = AvailableDate | null;

export function buildCalendar(
    dates: AvailableDate[]
): CalendarCell[][] {

    if (!dates.length) return [];

    const first = new Date(dates[0].date);

    const weeks: CalendarCell[][] = [];

    let week: CalendarCell[] = [];

    // Empty cells before first date
    for (let i = 0; i < first.getDay(); i++) {
        week.push(null);
    }

    for (const date of dates) {

        week.push(date);

        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }

    while (week.length && week.length < 7) {
        week.push(null);
    }

    if (week.length) {
        weeks.push(week);
    }

    return weeks;
}