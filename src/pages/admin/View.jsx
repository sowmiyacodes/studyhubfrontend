import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const View = () => {
  const [papers, setPapers] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [selectedPaper, setSelectedPaper] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/question_paper/view");
        setPapers(res.data);
      } catch (err) {
        console.error("Error fetching papers:", err);
      }
    };
    fetchPapers();
  }, []);

  const getPreviewUrl = (url) => {
    if (!url) return "";
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const fileId = fileIdMatch ? fileIdMatch[1] : null;

    if (fileId) return `https://drive.google.com/file/d/${fileId}/preview`;
    if (/^[a-zA-Z0-9_-]{25,}$/.test(url)) return `https://drive.google.com/file/d/${url}/preview`;
    return url.replace("/view", "/preview");
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">📘 View Question Papers</h2>

      {/* View Toggle */}
      <div className="d-flex justify-content-end mb-3">
        <div className="btn-group">
          <button
            className={`btn btn-outline-primary ${viewMode === "table" ? "active" : ""}`}
            onClick={() => setViewMode("table")}
          >
            Table View
          </button>
          <button
            className={`btn btn-outline-primary ${viewMode === "card" ? "active" : ""}`}
            onClick={() => setViewMode("card")}
          >
            Card View
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="table-responsive shadow rounded-3 overflow-hidden">
          <table className="table table-hover table-striped align-middle mb-0">
            <thead className="table-primary text-white">
              <tr>
                <th>Regulation</th>
                <th>Semester</th>
                <th>Subject Code</th>
                <th>Year</th>
                <th>Exam</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper._id}>
                  <td>{paper.regulation}</td>
                  <td>{paper.semester}</td>
                  <td className="fw-bold text-primary">{paper.subjectCode}</td>
                  <td>{paper.year}</td>
                  <td>{paper.exam}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm fw-bold"
                      onClick={() => setSelectedPaper(paper)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {viewMode === "card" && (
        <div className="row g-4">
          {papers.map((paper) => (
            <div key={paper._id} className="col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="card shadow-sm border-0 flex-fill">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-primary">{paper.subjectCode}</h5>
                  <p className="mb-1"><strong>Regulation:</strong> {paper.regulation}</p>
                  <p className="mb-1"><strong>Semester:</strong> {paper.semester}</p>
                  <p className="mb-1"><strong>Year:</strong> {paper.year}</p>
                  <p className="mb-3"><strong>Exam:</strong> {paper.exam}</p>
                  <button
                    className="btn btn-success mt-auto fw-bold"
                    onClick={() => setSelectedPaper(paper)}
                  >
                    View Paper
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Preview */}
      {selectedPaper && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          onClick={() => setSelectedPaper(null)}
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{selectedPaper.subjectCode} – Question Paper</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedPaper(null)}></button>
              </div>
              <div className="modal-body p-0" style={{ height: "80vh" }}>
                <iframe
                  src={getPreviewUrl(selectedPaper.url)}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  allow="autoplay"
                  title="Question Paper Preview"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
