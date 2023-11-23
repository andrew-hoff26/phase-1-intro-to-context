// Your code here
function createEmployeeRecord(array) {
    const [firstName, familyName, title, payPerHour]  = array
    let timeInEvents = [];
    let timeOutEvents = []
    return {
        firstName,
        familyName,
        title, 
        payPerHour,
        timeInEvents, 
        timeOutEvents,
    };
}
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
}
function createTimeInEvent(record, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time.split(":")[0], 10)

    const timeInEvent = {
        type: "TimeIn",
        hour, 
        date,
    }
    record.timeInEvents.push(timeInEvent);

    return record;
}
function createTimeOutEvent(record, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time.split(":")[0], 10)

    const timeOutEvent = {
        type: "TimeOut",
        hour, 
        date,
    }
    record.timeOutEvents.push(timeOutEvent);

    return record;
}
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find((event, index) => index >= employeeRecord.timeInEvents.indexOf(timeInEvent) && event.date === date);
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
  }
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  
    return wagesEarned;
}
function allWagesFor(employeeRecord) {
    const datesWorked = [...new Set(employeeRecord.timeInEvents.map(event => event.date))];
  
    const totalWages = datesWorked.reduce((total, date) => {
      const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
      return total + wagesEarned;
    }, 0);
  
    return totalWages;
}
function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
      const wages = allWagesFor(employeeRecord);
      return total + wages;
    }, 0);
  
    return totalPayroll;
  }