import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "../css/daily.css"
import CreateRecord from "./CreateRecord"
import UpdateRecord from "./UpdateRecord"

const Daily = () => {
  const [isCreateRecord, setisCreateRecord] = useState(false)
  const [isUpdateRecord, setisUpdateRecord] = useState(false)
  const [records, setRecords] = useState([])
  const [categories, setCategories] = useState([])
  // const [presets, setPresets] = useState([])
  const [id, setId] = useState()
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState(-1)
  // const [preset, setPreset] = useState("")

  const { index } = useParams()
  const { date } = useParams()
  const { month } = useParams()
  const { year } = useParams()
  const getDayLabel = () => {
    const dayLabels = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    return dayLabels[parseInt(index) % 7] || "Invalid Day"
  }

  useEffect(() => {
    if (!isCreateRecord || !isUpdateRecord) {
      fetchRecords()
    }
  }, [isCreateRecord, isUpdateRecord])

  const fetchRecords = async () => {
    await axios
      .get(`http://localhost:8000/api/records/${date}/${month}/${year}`)
      .then(({ data }) => {
        setRecords(data.records)
        setCategories(data.categories)
      })
  }

  const getSticker = (categoryId: number): string | undefined => {
    const foundCategory = categories.find(
      (category) => categoryId === category.id
    )

    return foundCategory ? foundCategory.sticker : undefined
  }

  const openCreateRecord = () => {
    setisCreateRecord(true)
  }

  const closeCreateRecord = () => {
    setisCreateRecord(false)
  }

  const openUpdateRecord = async (id, content, category_id) => {
    setId(id)
    setContent(content)
    setCategoryId(category_id)
    setisUpdateRecord(true)
    console.log("Open update with id:", id)
  }

  const closeUpdateRecord = async () => {
    setisUpdateRecord(false)
  }

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
      <UpdateRecord
        isOpen={isUpdateRecord}
        onRequestClose={closeUpdateRecord}
        id={id}
        categories={categories}
        contentIn={content}
        categoryIn={categoryId}
      />
      <div className="daily-card">
        <div className="daily-card-head">
          <Link to="/category" className="icon">
            <h1>📋</h1>
          </Link>
          <div className="text">
            <h1>{getDayLabel()}</h1>
          </div>
          <div className="icon">
            <h1>{date}</h1>
          </div>
        </div>
        <div className="daily-card-body">
          {records.length > 0
            ? records.map((record) => (
                <div
                  key={record.id}
                  className="record"
                  onClick={() => openUpdateRecord(record.id, record.content, record.category_id)}
                >
                  <div className="sticker">
                    <h1>{getSticker(record.category_id)}</h1>
                  </div>
                  <h1>{record.content}</h1>
                </div>
              ))
            : null}
          <div className="record" onClick={openCreateRecord}>
            <div className="sticker">
              <h1>📝</h1>
            </div>
            <h1>+ Add record</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Daily
