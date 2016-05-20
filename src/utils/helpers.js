export function calculateDay(date, closed) {
    let _dayDiff = '-';
    if (date) {
        if (closed === 0) {
            const currentTime = new Date().getTime();
            const logTime = new Date(date).getTime();
            const timeDiff = Math.abs(currentTime - logTime);
            _dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    }
    
    return _dayDiff;
}
