import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const fileInputRef = useRef();

  const uploadFile = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/upload", data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        const response = await uploadFile(data);
        // console.log(response);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="App"
      style={{
        background: "#000",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "600px",
          height: "400px",
          margin: "auto",
          background: "#fff",
          borderRadius: "5px",
          alignItems: "center",
        }}
      >
        <h1>Simple file sharing!</h1>
        <h3>Upload and share the download link.</h3>
        <button style={{ height: "35px" }} onClick={() => onUploadClick()}>
          Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />{" "}
        <br />
        <br />
        <br />
        {result ? <h4 style={{ textDecoration: "underline" }}>Link</h4> : null}
        <a href={result} target="_blank">
          {result}
        </a>
      </div>
    </div>
  );
}

export default App;
