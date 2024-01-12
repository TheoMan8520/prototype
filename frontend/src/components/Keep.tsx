// import axios from "axios";
// import { useState } from "react";
// import Modal from "react-modal";
// import Swal from "sweetalert2";
// import "../css/create-record.css";

// interface Props {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   date: number;
//   month: number;
//   year: number;
// }

// const CreateRecord = ({ isOpen, onRequestClose, date, month, year }: Props) => {
//   const customStyles = {
//     overlay: {
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//     },
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//       border: "",
//       background: "#F5F5F5",
//       borderRadius: "40px", // Set border radius for rounded corners
//       width: "100%", // Set the width of the modal
//       maxWidth: "700px", // Set the maximum width
//     },
//   };

//   const [content, setContent] = useState("");
//   const [sticker, setSticker] = useState("🌞");
//   const [category, setCategory] = useState("");
//   const [preset, setPreset] = useState("");

//   const createRecord = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("content", content);
//     formData.append("day", date);
//     formData.append("month", month);
//     formData.append("year", year);
//     formData.append("sticker", sticker);
//     formData.append("category", category);
//     formData.append("preset", preset);

//     await axios
//       .post(`http://localhost:8000/api/products`, formData)
//       .then(({ data }) => {
//         Swal.fire({
//           icon: "success",
//           text: data.message,
//         });
//         onRequestClose();
//       })
//       .catch(({ response }) => {
//         // if (response.status === 442) {
//         //   setValidationError(response.data.errors);
//         // } else {
//         Swal.fire({
//           text: response.data.message,
//           icon: "error",
//         });
//         // }
//       });
//   };

//   const save = () => {
//     console.log(`date: ${date}`);
//     console.log(`month: ${month}`);
//     console.log(`year: ${year}`);
//     console.log(`content: ${content}`);
//     console.log(`sticker: ${sticker}`);
//     console.log(`category: ${category}`);
//     // console.log(`preset: ${preset}`);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Create Modal"
//       style={customStyles}
//       className="modal"
//     >
//       <div className="head">
//         <h2>Create Record</h2>
//       </div>
//       <form className="form">
//         <div className="input-unit preset">
//           <input
//             className="input drop-down"
//             type="text"
//             placeholder="Preset"
//             value={preset}
//             onChange={(event) => {
//               setPreset(event.target.value);
//             }}
//           />
//         </div>
//         <div className="input-unit category">
//           <div className="icon">
//             <h2>🌻</h2>
//           </div>
//           <input
//             required
//             className="input drop-down"
//             type="text"
//             placeholder="Select or create Category"
//             value={category}
//             onChange={(event) => {
//               setCategory(event.target.value);
//             }}
//           />
//         </div>
//         <div className="input-unit content">
//           <input
//             required
//             className="input text"
//             type="text"
//             placeholder="....."
//             value={content}
//             onChange={(event) => {
//               setContent(event.target.value);
//             }}
//           />
//         </div>
//         <div className="buttons">
//           <button className="button delete" onClick={onRequestClose}>
//             DELETE
//           </button>
//           <button
//             className="button save"
//             onClick={save} 
//             type="submit"
//           >
//             SAVE
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default CreateRecord;


import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "../css/create-record.css";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  date: number;
  month: number;
  year: number;
}

const CreateRecord = ({ isOpen, onRequestClose, date, month, year }: Props) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "",
      background: "#F5F5F5",
      borderRadius: "40px", // Set border radius for rounded corners
      width: "100%", // Set the width of the modal
      maxWidth: "700px", // Set the maximum width
    },
  };

  const [content, setContent] = useState("");
  const [sticker, setSticker] = useState("🌞");
  const [category, setCategory] = useState("");
  const [preset, setPreset] = useState("");

  const createRecord = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("day", date);
    formData.append("month", month);
    formData.append("year", year);
    formData.append("content", content);
    formData.append("sticker", sticker);
    formData.append("category", category);
    formData.append("preset", preset);

    await axios
      .post(`http://localhost:8000/api/records`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        onRequestClose();
      })
      .catch(({ response }) => {
        // if (response.status === 442) {
        //   setValidationError(response.data.errors);
        // } else {
        Swal.fire({
          text: response.data.message,
          icon: "error",
        });
        // }
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
        <h2>Create Record</h2>
      </div>
      <form className="form">
        <div className="input-unit preset">
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
        <div className="input-unit category">
          <div className="icon">
            <h2>🌻</h2>
          </div>
          <input
            required
            className="input drop-down"
            type="text"
            placeholder="Select or create Category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
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
          <button className="button delete" onClick={onRequestClose}>
            DELETE
          </button>
          <button
            className="button save"
            onClick={createRecord} 
            type="submit"
          >
            SAVE
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRecord;
