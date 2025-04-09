const getMaxDate = () => {
    const currentDate = new Date();
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; //30 days in ms
    return new Date(currentDate.getTime() + thirtyDaysInMs);
}


export default getMaxDate;