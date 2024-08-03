function getISTDate() {
    const offset = 5.5 * 60; // IST is UTC+5:30, so offset is 5.5 hours in minutes
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000); // Get UTC time in milliseconds
    const istDate = new Date(utc + (offset * 60000)); // Convert to IST
    return istDate;
}

function formatDateInIST(date) {
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

function convertToIST(date) {
    const offset = 5.5 * 60; // IST is UTC+5:30, so offset is 5.5 hours in minutes
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000); // Get UTC time in milliseconds
    const istDate = new Date(utc + (offset * 60000)); // Convert to IST
    return istDate;
}
module.exports = { convertToIST }
