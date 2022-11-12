// Iterates through an array containing start and end times for a business' hours, allowing for multiple ranges of time throughout a day
function formatHoursArr(hoursArray) {
    let hoursString = '';
    for (const times of hoursArray) {
        const formatted = parseHours(times.start, times.end);
        hoursString += `${formatted}, `;
    }
    return hoursString.slice(0, -2);
}

// Takes a start time and end time in minutes and returns a formatted string indicating the times the business is open.
function parseHours(startTime, endTime) {
    if (startTime === 0 && endTime === 0) {
        return 'Closed';
    }
    if (startTime === 0 && endTime === 1440) {
        return 'Open 24 Hours';
    }

    const startTimeFormatted = minutesToFormattedTime(startTime);
    const endTimeFormatted = minutesToFormattedTime(endTime);

    return `${startTimeFormatted}-${endTimeFormatted}`;
}

// TODO: Add support for military time.
// Takes the time in total number of minutes and properly formats it HH:MM.
function minutesToFormattedTime(time) {
    let suffix;
    720 <= time && time < 1440 ? (suffix = 'PM') : (suffix = 'AM');

    if (time > 720) {
        time -= 720;
    }

    const hours = Math.floor(time / 60);
    let minutes = Math.floor(time % 60);

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return `${hours}:${minutes}${suffix}`;
}

export { formatHoursArr };
