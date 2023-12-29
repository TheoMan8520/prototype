import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/calendar.css";

const Calendar = () => {
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

  const [daysInMonth, setDaysInMonth] = useState(
    new Date(year, month + 1, 0).getDate()
  );
  const [firstDay, setFirstDay] = useState(new Date(year, month, 1).getDay());
  const [days, setDays] = useState<number[]>([]);
  const [style, setStyle] = useState("calendar");

  useEffect(() => {
    constructCalendar();
  });

  const constructCalendar = () => {
    setDaysInMonth(new Date(year, month + 1, 0).getDate());
    setFirstDay(new Date(year, month, 1).getDay());
    const exDays = daysInMonth + firstDay - 35;

    const daysTemp: number[] = [];
    let dayIndex = 1;
    let dayNextMonthIndex = 1;
    let dayLastMonthIndex = new Date(year, month, 0).getDate() - firstDay + 1;

    for (let i = 0; i <= 34; i++) {
      if (i < firstDay) {
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

    if (exDays > 0) {
        setStyle("calendar-42");
        for (let i = 35; i <= 41; i++) {
            if (i < exDays+35) {
                daysTemp.push(dayIndex);
                dayIndex += 1;
            } else {
                daysTemp.push(dayNextMonthIndex);
                dayNextMonthIndex += 1;
            }
        }
    } else {
        setStyle("calendar");
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

  const getDayStyle = (index: number) => {
    if (index < firstDay) {
      return "calendar-day before";
    } else if (index > firstDay + daysInMonth - 1) {
      return "calendar-day after";
    } else {
      return "calendar-day";
    }
  };

  return (
    <>
      <DatePicker
        selected={date}
        showIcon
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <div className="calendar-month">
        <h1>{monthLabel}</h1>
      </div>
      <div className={style}>
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
        {days.length > 0
          ? days.map((day, index) => (
              <div key={index} className={getDayStyle(index)}>
                <h1>{day}</h1>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Calendar;
