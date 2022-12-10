import { Result } from 'postcss';

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

    if (time === 0) return '12:00AM';

    720 <= time && time < 1440 ? (suffix = 'PM') : (suffix = 'AM');

    time = time > 720 ? (time -= 720) : time;

    const hours = Math.floor(time / 60);
    let minutes = Math.floor(time % 60);

    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}${suffix}`;
}

function formattedTimeToMinutes(time) {
    if (time === '12:00AM') return 0;

    let result = 0;
    const suffix = time.slice(-2);
    const timeExceptSuffix = time.slice(0, -2);
    const arrayHHMM = timeExceptSuffix.split(':');

    if (suffix === 'AM') {
        result += Number(arrayHHMM[0]) * 60;
    } else if (suffix === 'PM') {
        result += Number(arrayHHMM[0]) * 60 + 12 * 60;
    }

    result += Number(arrayHHMM[1]);

    return result;
}

const numToDay = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
};

// TODO: Test this function
function checkIfOpen(hours) {
    let open = false;
    let date = new Date();
    let dayOfWeek = numToDay[date.getDay()];
    date = date.toString();
    let time = date.slice(16, 21);
    time = parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3, 5));
    let hoursArray = hours[dayOfWeek];

    for (let i = 0; i < hours.length; i++) {
        if (hoursArray[i].start < time < hoursArray[i].end) {
            open = true;
        }
    }
    return open;
}

export { formatHoursArr, formattedTimeToMinutes };
