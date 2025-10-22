import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const View = () => {
  const [papers, setPapers] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"
  const [showModal, setShowModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/question_paper/view");
      setPapers(res.data);
    } catch (err) {
      console.error("Error fetching papers:", err);
    }
  };

  const handlePreview = (paper) => {
    setSelectedPaper(paper);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPaper(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary">Question Papers</h3>
        <div>
          <Button
            variant={viewMode === "table" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setViewMode("table")}
          >
            Table View
          </Button>
          <Button
            variant={viewMode === "card" ? "primary" : "outline-primary"}
            onClick={() => setViewMode("card")}
          >
            Card View
          </Button>
        </div>
      </div>

      {/* ---------- TABLE VIEW ---------- */}
      {viewMode === "table" && (
        <div className="table-responsive shadow-sm">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
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
              {papers.map((paper, index) => (
                <tr key={index}>
                  <td>{paper.regulation}</td>
                  <td>{paper.semester}</td>
                  <td>{paper.subjectCode}</td>
                  <td>{paper.year}</td>
                  <td>{paper.exam}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => handlePreview(paper)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- CARD VIEW ---------- */}
      {viewMode === "card" && (
        <div className="row">
          {papers.map((paper, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary fw-semibold">
                    {paper.subjectCode}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Regulation:</strong> {paper.regulation}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Semester:</strong> {paper.semester}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Year:</strong> {paper.year}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Exam:</strong> {paper.exam}
                  </p>
                  <Button
                    variant="outline-success"
                    onClick={() => handlePreview(paper)}
                  >
                    View Paper
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- MODAL PREVIEW ---------- */}
      <Modal show={showModal} onHide={closeModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPaper?.subjectCode} – {selectedPaper?.exam}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh" }}>
          {selectedPaper ? (
            <iframe
              src={selectedPaper.url.replace("/view", "/preview")}
              title="Question Paper"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            ></iframe>
          ) : (
            <p>No paper selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant="primary"
            href={selectedPaper?.url}
            target="_blank"
            rel="noreferrer"
          >
            Open in New Tab
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default View;
