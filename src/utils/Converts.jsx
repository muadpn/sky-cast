export function GetLocalDate(UnixCode) {
    let date = new Date(UnixCode * 1000);
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    var year = date.getFullYear();
    var dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth = month < 10 ? "0" + month : month;
    return (
        formattedDay + "-" + formattedMonth + " - " + dayOfWeek + " - " + year
    );
}

  export function convert12HourTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours ? hours : 12;
    hours = hours % 12;
    let formattedTime = hours + ':' + minutes.slice(-2) + ' ' + ampm;
    return formattedTime
  }