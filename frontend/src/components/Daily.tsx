import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/daily.css";
import "./CreateRecord";
import CreateRecord from "./CreateRecord";

const Daily = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [records, setRecords] = useState([]);

  const { index } = useParams();
  const { date } = useParams();
  const { month } = useParams();
  const { year } = useParams();
  const getDayLabel = () => {
    const dayIndex = parseInt(index);
    switch (dayIndex % 7) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Invalid Day";
    }
  };

  useEffect(() => {
    if (!isCreateModalOpen) {
      fetchRecords();
    }
  }, [isCreateModalOpen]);

  const fetchRecords = async () => {
    await axios
      .get(`http://localhost:8000/api/records/${date}/${month}/${year}`)
      .then(({ data }) => {
        // console.log(data.records);
        setRecords(data.records);
        // console.log("records:", records); 
      });
  };
  

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <>
      {/* <div>
            This is daily of {date} with index:{index} which is {getDayLabel()} in {month}
        </div> */}
      <div className="daily-card">
        <div className="daily-card-head">
          <div className="icon"></div>
          <div className="text">
            <h1>{getDayLabel()}</h1>
          </div>
          <div className="icon">
            <h1>{date}</h1>
          </div>
        </div>
        <div className="daily-card-body">
          <CreateRecord
            isOpen={isCreateModalOpen}
            onRequestClose={closeCreateModal}
            date={date}
            month={month}
            year={year}
          />
          {records.length > 0 ? (
            records.map((record) => (
              <div key={record.id} className="record" onClick={openCreateModal}>
                <div className="sticker">
                  <h1>🥹</h1>
                </div>
                <h1>{record.content}</h1>
              </div>
            ))
          ) : (
            <div className="record" onClick={openCreateModal}>
              <div className="sticker">
                <h1>🥹</h1>
              </div>
              <h1>asdfsadfsdfsadf</h1>
            </div> 
          )}
          {/* <div className="record" onClick={openCreateModal}>
            <div className="sticker">
              <h1>🥹</h1>
            </div>
            <h1>asdfsadfsdfsadf</h1>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Daily;
