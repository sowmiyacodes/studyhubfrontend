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
  const [previewOpen, setPreviewOpen] = useState(false);

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
        { headers: { "Content-Type": "multipart/form-data" } }
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

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const cardStyle = {
    maxWidth: "650px",
    margin: "60px auto",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  };

  const successCardStyle = {
    marginTop: "25px",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#e6ffe6",
    border: "2px solid #4CAF50",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    width: "80%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "15px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    background: "none",
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Admin Panel - Upload Question Paper</h2>

        <button
          onClick={handleGoogleAuth}
          style={{ ...buttonStyle, backgroundColor: "#4285F4" }}
        >
          Authenticate with Google
        </button>

        <input type="text" placeholder="Regulation" value={regulation} onChange={(e) => setRegulation(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Subject Code" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Exam" value={exam} onChange={(e) => setExam(e.target.value)} style={inputStyle} />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} style={inputStyle} />

        <button onClick={handleUpload} disabled={loading} style={buttonStyle}>
          {loading ? "Uploading..." : "Upload"}
        </button>

        {uploadResult && (
          <div style={successCardStyle}>
            <h3 style={{ color: "#2d662d" }}>✅ Uploaded Successfully!</h3>
            <p><strong>Regulation:</strong> {uploadResult.regulation}</p>
            <p><strong>Semester:</strong> {uploadResult.semester}</p>
            <p><strong>Subject Code:</strong> {uploadResult.subjectCode}</p>
            <p><strong>Year:</strong> {uploadResult.year}</p>
            <p><strong>Exam:</strong> {uploadResult.exam}</p>
            <p>
              <strong>Drive Link:</strong>{" "}
              <button
                style={{ color: "#4285F4", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setPreviewOpen(true)}
              >
                View Question Paper
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Modal Preview */}
      {previewOpen && (
        <div style={modalStyle} onClick={() => setPreviewOpen(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button style={closeButtonStyle} onClick={() => setPreviewOpen(false)}>×</button>
            <iframe
              src={uploadResult.url.replace("/view", "/preview")}
              width="100%"
              height="100%"
              style={{ border: "none", borderRadius: "8px" }}
              title="Question Paper Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Add;
