import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/calendar.css";

const Keep = () => {
  const monthsLabel = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [monthLabel, setMonthLabel] = useState(monthsLabel[month]);
  const [year, setYear] = useState(date.getFullYear());

const [days, setDays] = useState<number[]>([])

  useEffect(() => {
    constructCalendar();
  });

const constructCalendar = () => {
    const dayOfWeek = date.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysTemp: number[] = [];
    let dayIndex = 1;
    let dayNextMonthIndex = 1;
    let dayLastMonthIndex = new Date(year, month, 0).getDate() - dayOfWeek + 1;

    for (let i = 0; i <= 34; i++) {
      if (i < dayOfWeek) {
        daysTemp.push(dayLastMonthIndex);
        dayLastMonthIndex += 1;
      } else if (dayIndex > daysInMonth) {
        daysTemp.push(dayNextMonthIndex);
        dayNextMonthIndex += 1;
      } else {
        daysTemp.push(dayIndex);
        dayIndex += 1;
      }
    }

    setDays(daysTemp);
  };

  const handleDateChange = (selectedDate: never) => {
    setDate(selectedDate);
    const day = new Date(selectedDate);
    setMonth(day.getMonth());
    setMonthLabel(monthsLabel[day.getMonth()]);
    setYear(day.getFullYear());
  };

  return (
    <>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <div className="calendar-month">
        <h1>
          {monthLabel} {year}
        </h1>
      </div>
      <div className="calendar">
        <div className="calendar-header-day">
          <h1>SUN</h1>
        </div>
        <div className="calendar-header-day">
          <h1>MON</h1>
        </div>
        <div className="calendar-header-day">
          <h1>TUE</h1>
        </div>
        <div className="calendar-header-day">
          <h1>WED</h1>
        </div>
        <div className="calendar-header-day">
          <h1>THU</h1>
        </div>
        <div className="calendar-header-day">
          <h1>FRI</h1>
        </div>
        <div className="calendar-header-day">
          <h1>SAT</h1>
        </div>
        {days.map((day, index) => (
            <div key={index} className="calendar-day">
            <h1>{day}</h1>
            </div>
        ))}
      </div>
    </>
  );
};

export default Keep;
