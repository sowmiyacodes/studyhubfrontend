import React, { useState } from "react";
import axios from "axios";

const Add = () => {
  const [file, setFile] = useState(null);
  const [regulation, setRegulation] = useState("");
  const [semester, setSemester] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [year, setYear] = useState("");
  const [exam, setExam] = useState("");
  const [uploadResult, setUploadResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Open Google OAuth in a new tab
  const handleGoogleAuth = () => {
    window.open("http://localhost:5000/question_paper/auth", "_blank");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("regulation", regulation);
    formData.append("semester", semester);
    formData.append("subjectCode", subjectCode);
    formData.append("year", year);
    formData.append("exam", exam);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/question_paper/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadResult(res.data.file);
    } catch (err) {
      console.error(err);
      alert(
        "Upload failed. Make sure the server is running and authenticated with Google Drive."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Admin Panel - Upload Question Paper</h2>

      {/* Google Auth Button */}
      <button
        onClick={handleGoogleAuth}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        Authenticate with Google
      </button>

      <input
        type="text"
        placeholder="Regulation"
        value={regulation}
        onChange={(e) => setRegulation(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="number"
        placeholder="Semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Subject Code"
        value={subjectCode}
        onChange={(e) => setSubjectCode(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Exam"
        value={exam}
        onChange={(e) => setExam(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "10px" }}
      />

      <button onClick={handleUpload} disabled={loading} style={{ width: "100%" }}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadResult && (
        <div style={{ marginTop: "20px" }}>
          <h3>✅ Uploaded Successfully!</h3>
          <p><strong>Regulation:</strong> {uploadResult.regulation}</p>
          <p><strong>Semester:</strong> {uploadResult.semester}</p>
          <p><strong>Subject Code:</strong> {uploadResult.subjectCode}</p>
          <p><strong>Year:</strong> {uploadResult.year}</p>
          <p><strong>Exam:</strong> {uploadResult.exam}</p>
          <p>
            <strong>Drive Link:</strong>{" "}
            <a href={uploadResult.url} target="_blank" rel="noreferrer">
              {uploadResult.url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Add;
