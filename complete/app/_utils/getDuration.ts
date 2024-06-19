export const getDuration = (duration: { hours: number, minutes: number }) => {
    const hours = duration.hours === 1 ? 'hour' : 'hours';
    const minutes = duration.minutes === 1 ? 'minute' : 'minutes';

    if (duration.minutes === 0) {
        return `${duration.hours} ${hours}`;
    } else if (duration.hours === 0) {
        return `${duration.minutes} ${minutes}`;
    } else {
        return `${duration.hours} ${hours} ${duration.minutes} ${minutes}`;
    }
}