import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/daily.css";
import CreateCategory from "./CreateCategory";
import "./CreateRecord";
import CreateRecord from "./CreateRecord";

const Daily = () => {
  const [isCreateRecord, setisCreateRecord] = useState(false);
  const [isCreateCategory, setisCreateCategory] = useState(false);
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [presets, setPresets] = useState([]);

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
    if (!isCreateRecord || !isCreateCategory) {
      fetchRecords();
      // console.log("categories:", categories);
    }
  }, [isCreateRecord, isCreateCategory]);

  const fetchRecords = async () => {
    await axios
      .get(`http://localhost:8000/api/records/${date}/${month}/${year}`)
      .then(({ data }) => {
        // console.log(data.records);
        setRecords(data.records);
        // console.log("records:", records);
        setCategories(data.categories);
      });
  };

  const getSticker = (categoryId: number): string | undefined => {
    const foundCategory = categories.find(
      (category) => categoryId === category.id
    );

    return foundCategory ? foundCategory.sticker : undefined;
  };

  const openCreateRecord = () => {
    setisCreateRecord(true);
  };

  const closeCreateRecord = () => {
    setisCreateRecord(false);
  };

  const openCreateCategory = () => {
    setisCreateCategory(true);
  };

  const closeCreateCategory = () => {
    setisCreateCategory(false);
  };

  return (
    <>
      <CreateRecord
        isOpen={isCreateRecord}
        onRequestClose={closeCreateRecord}
        date={date}
        month={month}
        year={year}
        categories={categories}
      />
      <CreateCategory
        isOpen={isCreateCategory}
        onRequestClose={closeCreateCategory}
      />
      <div className="daily-card">
        <div className="daily-card-head">
          <div className="icon" onClick={openCreateCategory}>
            <h1>Cat</h1>
          </div>
          <div className="text">
            <h1>{getDayLabel()}</h1>
          </div>
          <div className="icon">
            <h1>{date}</h1>
          </div>
        </div>
        <div className="daily-card-body" onClick={openCreateRecord}>
          {records.length > 0 ? (
            records.map((record) => (
              <div key={record.id} className="record" onClick={openCreateRecord}>
                <div className="sticker">
                  <h1>{getSticker(record.category_id)}</h1>
                </div>
                <h1>{record.content}</h1>
              </div>
            ))
          ) : (
            <div className="record" onClick={openCreateRecord}>
              <div className="sticker">
                <h1>📝</h1>
              </div>
              <h1>+ Add record</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Daily;
