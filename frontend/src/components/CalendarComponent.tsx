import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = () => {
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(2023);
  const [date, setDate] = useState(null);
  const [calendarGrid, setCalendarGrid] = useState([]);

  useEffect(() => {
    constructCalendar();
  });

  const constructCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const startDay = getStartDay();

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const tempCalendarGrid = [];
    let counter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          week.push(<div key={`blank-${j}`} className="calendar-cell" />);
        } else if (counter <= daysInMonth) {
          const currentDate = new Date(year, month - 1, counter);
          const dayOfWeek = weekdays[currentDate.getDay()];

          week.push(
            <div key={`day-${counter}`} className="calendar-cell">
              <span>{counter}</span>
              <span>{dayOfWeek}</span>
            </div>
          );
          counter++;
        } else {
          week.push(<div key={`blank-${j}`} className="calendar-cell" />);
        }
      }

      tempCalendarGrid.push(
        <div key={`week-${i}`} className="calendar-row">
          {week}
        </div>
      );
    }

    setCalendarGrid(tempCalendarGrid);
  };

  const handleDateChange = () => {
    setDate(date);
    const day = new Date(date);
    setMonth(day.getMonth() + 1);
    setYear(day.getFullYear());
  };

  const getDaysInMonth = () => {
    return new Date(year, month, 0).getDate();
  };

  const getStartDay = () => {
    return new Date(year, month - 1, 1).getDay();
  };

  return (
    <div className="calendar">
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <div className="calendar-grid">{calendarGrid}</div>
    </div>
  );
};

export default CalendarComponent;
