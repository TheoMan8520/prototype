import axios from "axios"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import Swal from "sweetalert2"
import "../css/create-record.css"

interface Props {
  isOpen: boolean
  onRequestClose: () => void
  id: number
  // presets: []
  categories: []
  contentIn: string
  categoryIn: number
}

const UpdateRecord = ({
  isOpen,
  onRequestClose,
  id,
  categories,
  contentIn,
  categoryIn,
}: Props) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "",
      background: "#F5F5F5",
      borderRadius: "40px",
      width: "100%",
      maxWidth: "700px",
    },
  };

  const [content, setContent] = useState("")
  const [sticker, setSticker] = useState("")
  const [category, setCategory] = useState("")
  const [preset, setPreset] = useState("")
  const [firstRender, setFirstRender] = useState(true)

  const updateRecord = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("content", content)
    formData.append("sticker", sticker)
    formData.append("category", category)

    if (preset !== "") {
      formData.append("preset", preset)
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/records/${id}`,
        formData
      )
      Swal.fire({
        icon: "success",
        text: response.data.message,
      })
      closeModal()
    } catch (error) {
      console.error(error)
      Swal.fire({
        text: "An error occurred while processing the request.",
        icon: "error",
      })
    }
  }

  const syncSticker = () => {
    const foundCategory = categories.find(
      (categoryItem) => category === categoryItem.category
    )
    if (foundCategory) {
      setSticker(foundCategory.sticker)
    }
  }

  const closeModal = () => {
    setUp()
    setFirstRender(true)
    onRequestClose()
  }

  const setUp = () => {
    setContent(contentIn)
    const foundCategory = categories.find(
      (categoryItem) => categoryIn === categoryItem.id
    )
    if (foundCategory) {
      setCategory(foundCategory.category)
      setSticker(foundCategory.sticker)
    }
  }

  useEffect(() => {
    if (firstRender && id) {
      setUp();
      if (!sticker) {
        if (categories.length === 0) {
          setSticker("📝")
        } else {
          setCategory(categories[0].category)
          setSticker(categories[0].sticker)
        }
      }
      setFirstRender(false)
    }
    syncSticker()
  }, [category, id])

  const deleteRecord = async (e) => {
    e.preventDefault()
    await axios
      .delete(`http://localhost:8000/api/records/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        })
        // setFirstRender(true)
        // onRequestClose()
        closeModal()
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        })
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Modal"
      style={customStyles}
      className="modal"
    >
      <div className="head">
        <h2>Update Record</h2>
      </div>
      <form className="form">
        <div className="input-unit preset">
          <div className="input-frame">
            <h2>Preset:</h2>
            <input
              className="input drop-down"
              type="text"
              placeholder="Preset"
              value={preset}
              onChange={(event) => {
                setPreset(event.target.value)
              }}
            />
          </div>
        </div>
        <div className="input-unit category">
          <div className="icon">
            <input
              required
              className="input sticker"
              type="text"
              value={sticker}
              disabled
            />
          </div>
          <div className="input-frame">
            <h2>Category:</h2>
            <select
              required
              className="input drop-down"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value)
                syncSticker()
              }}
            >
              {categories.length > 0 ? (
                categories.map((categoryItem) => (
                  <option key={categoryItem.id} value={categoryItem.category}>
                    {categoryItem.category}
                  </option>
                ))
              ) : (
                <option value={"Memo"}>Memo</option>
              )}
            </select>
          </div>
        </div>
        <div className="input-unit content">
          <input
            required
            className="input text"
            type="text"
            placeholder="....."
            value={content}
            onChange={(event) => {
              setContent(event.target.value)
            }}
          />
        </div>
        <div className="buttons">
          <button className="button delete" onClick={closeModal}>
            CANCEL
          </button>
          <button className="button delete" onClick={deleteRecord}>
            DELETE
          </button>
          <button className="button save" onClick={updateRecord} type="submit">
            SAVE
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default UpdateRecord
