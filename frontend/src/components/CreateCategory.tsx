import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "../css/create-record.css";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CreateCategory = ({
  isOpen,
  onRequestClose,
}: Props) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "22%",
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

  const [sticker, setSticker] = useState("");
  const [category, setCategory] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sticker", sticker);
    formData.append("category", category);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/categories`,
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

  const closeModal = () => {
    setSticker("");
    setCategory("");
    onRequestClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Modal"
      style={customStyles}
      className="modal category"
    >
      <div className="head">
        <h2>Create Category</h2>
      </div>
      <form className="form">
        <div className="input-unit category">
          <div className="icon">
            <input
              required
              className="input sticker"
              type="text"
              value={sticker}
              onChange={(event) => {
                setSticker(event.target.value);
              }}
            />
          </div>
          <div className="input-frame">
            <h2>Category:</h2>
            <input
              required
              className="input drop-down"
              type="text"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="buttons">
          <button className="button delete" onClick={closeModal}>
            CANCEL
          </button>
          <button className="button save" onClick={createCategory} type="submit">
            SAVE
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCategory;
