import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "../css/create-record.css";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  id: number;
  // presets: [];
  categories: [];
  firstRender: boolean;
  setRender: () => void;
}

const UpdateRecord = ({
  isOpen,
  onRequestClose,
  id,
  categories,
  firstRender,
  setRender,
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

  const [content, setContent] = useState("");
  const [sticker, setSticker] = useState("");
  const [category, setCategory] = useState("");
  const [preset, setPreset] = useState("");

  const updateRecord = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("sticker", sticker);
    formData.append("category", category);
    // formData.append("preset", preset);

    if (preset !== "") {
      formData.append("preset", preset);
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/records/${id}`,
        formData
      );
      Swal.fire({
        icon: "success",
        text: response.data.message,
      });
      closeModal();
    } catch (error) {
      console.error(error);
      Swal.fire({
        text: "An error occurred while processing the request.",
        icon: "error",
      });
    }
  };

  const syncSticker = () => {
    const foundCategory = categories.find(
      (categoryItem) => category === categoryItem.category
    );
    if (foundCategory) {
      setSticker(foundCategory.sticker);
    }
  };
  const [isSetCategory, setIsSetCategory] = useState(false);

  const closeModal = () => {
    setIsSetCategory(false);
    onRequestClose();
  };

  useEffect(() => {
    const fetchRecord = async () => {
      await axios
        .get(`http://localhost:8000/api/records/${id}`)
        .then(({ data }) => {
          const { content, category_id } = data.record;
          console.log("1. Record:", data.record);
          setContent(content);
          // Can change category within one record but when change record it takes 2 times
          if (!isSetCategory) {
            const foundCategory = categories.find(
              (categoryItem) => category_id === categoryItem.id
            );
            setCategory(foundCategory.category);
            setSticker(foundCategory.sticker);
            setIsSetCategory(true);
          }

          // change category according to present category but can not change category within one record
          // const foundCategory = categories.find(
          //   (categoryItem) => category_id === categoryItem.id
          // );
          // setCategory(foundCategory.category);
          // setSticker(foundCategory.sticker);
        })
        .catch(({ response: { data } }) => {
          Swal.fire({
            text: data.message,
            icon: "error",
          });
        });
    };

    if (firstRender && id) {
      fetchRecord();
      setRender();
      console.log("2. first fetch with id:", id);
    } else if (id) {
      fetchRecord();
      console.log("2.. only id");
    }
    syncSticker();
    console.log("3. useEff with id:", id);
  }, [category, isSetCategory, firstRender, id]);

  const deleteRecord = async () => {
    await axios
      .delete(`http://localhost:8000/api/records/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        closeModal();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: "An error occurred while processing the request.",
          icon: "error",
        });
      });
  };

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
                setPreset(event.target.value);
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
                setCategory(event.target.value);
                syncSticker();
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
              setContent(event.target.value);
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
  );
};

export default UpdateRecord;
