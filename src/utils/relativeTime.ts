import { formatDistanceToNow } from "date-fns";

export const getShortRelativeTime = (date: Date) => {
    if (!date) return;
    const distance = formatDistanceToNow(date);
    const [amount, fullUnit] = distance.split(' ');

    const shortUnits: { [key: string]: string } = {
        second: 's',
        seconds: 's',
        minute: 'min',
        minutes: 'min',
        hour: 'h',
        hours: 'h',
        day: 'd',
        days: 'd',
        week: 'w',
        weeks: 'w',
        month: 'mo',
        months: 'mo',
        year: 'y',
        years: 'y',
    };

    const unit = fullUnit.toLowerCase(); // Ensure fullUnit is in lowercase
    const shortUnit = shortUnits[unit]; // Get corresponding short unit

    if (!shortUnit) {
        return distance; // Return original distance if unit is not found in shortUnits
    }

    return `${amount}${shortUnit} ago`;
};
