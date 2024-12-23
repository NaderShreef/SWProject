'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Response {
  _id: string;
  response_id: string;
  userId: string;
  quizId: string;
  answers: { question_id: string; answer: string }[];
  score: number;
  submitted_at: string;
}

const ResponsePanel = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setIsAuthorized(userRole === "instructor" || userRole === "admin");
  }, []);

  const [responses, setResponses] = useState<Response[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditResponse = (response: Response) => {
    setSelectedResponse(response);
  };

  if (!isAuthorized) {
    return null;
  }

  const fetchResponses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:3000/responses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          searchTerm: searchTerm,
        },
      });
      setResponses(response.data);
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  const handleSaveResponse = async () => {
    if (!selectedResponse) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3000/responses/${selectedResponse._id}`,
        {
          response_id: selectedResponse.response_id,
          userId: selectedResponse.userId,
          quizId: selectedResponse.quizId,
          answers: selectedResponse.answers,
          score: selectedResponse.score,
          submitted_at: selectedResponse.submitted_at,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh response list
      fetchResponses();
      setSelectedResponse(null);
    } catch (error) {
      console.error("Error updating response:", error);
    }
  };

  const handleDeleteResponse = async (response: Response) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/responses/${response._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh response list
      fetchResponses();
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  return (
    <div>
      <h2>Response Panel</h2>
      <input
        type="text"
        placeholder="Search responses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchResponses}>Fetch Responses</button>
      <table>
        <thead>
          <tr>
            <th>Response ID</th>
            <th>User ID</th>
            <th>Quiz ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response._id}>
              <td>{response.response_id}</td>
              <td>{response.userId}</td>
              <td>{response.quizId}</td>
              <td>
                <button onClick={() => handleEditResponse(response)}>Edit</button>
                <button onClick={() => handleDeleteResponse(response)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedResponse && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Edit Response</h2>
            <label>Response ID:</label>
            <input
              type="text"
              value={selectedResponse.response_id}
              onChange={(e) =>
                setSelectedResponse({ ...selectedResponse, response_id: e.target.value })
              }
            />
            <label>User ID:</label>
            <input
              type="text"
              value={selectedResponse.userId}
              onChange={(e) =>
                setSelectedResponse({ ...selectedResponse, userId: e.target.value })
              }
            />
            <label>Quiz ID:</label>
            <input
              type="text"
              value={selectedResponse.quizId}
              onChange={(e) =>
                setSelectedResponse({ ...selectedResponse, quizId: e.target.value })
              }
            />
            <label>Answers:</label>
            {selectedResponse.answers.map((answer, index) => (
              <div key={index} style={styles.answerRow}>
                <input
                  type="text"
                  value={answer.question_id}
                  onChange={(e) => {
                    const newAnswers = [...selectedResponse.answers];
                    newAnswers[index].question_id = e.target.value;
                    setSelectedResponse({ ...selectedResponse, answers: newAnswers });
                  }}
                  placeholder="Question ID"
                />
                <input
                  type="text"
                  value={answer.answer}
                  onChange={(e) => {
                    const newAnswers = [...selectedResponse.answers];
                    newAnswers[index].answer = e.target.value;
                    setSelectedResponse({ ...selectedResponse, answers: newAnswers });
                  }}
                  placeholder="Answer"
                />
              </div>
            ))}
            <button
              onClick={() =>
                setSelectedResponse({
                  ...selectedResponse,
                  answers: [...selectedResponse.answers, { question_id: '', answer: '' }],
                })
              }
            >
              Add Answer
            </button>
            <label>Score:</label>
            <input
              type="number"
              value={selectedResponse.score}
              onChange={(e) =>
                setSelectedResponse({ ...selectedResponse, score: Number(e.target.value) })
              }
            />
            <label>Submitted At:</label>
            <input
              type="datetime-local"
              value={selectedResponse.submitted_at}
              onChange={(e) =>
                setSelectedResponse({ ...selectedResponse, submitted_at: e.target.value })
              }
            />
            <button onClick={handleSaveResponse}>Save</button>
            <button onClick={() => setSelectedResponse(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
  },
  answerRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
};

export default ResponsePanel;
