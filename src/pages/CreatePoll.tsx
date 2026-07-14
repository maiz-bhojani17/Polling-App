import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import { createPoll } from "../redux/pollThunk";
import type { AppDispatch } from "../redux/store";
import { auth } from "../firebase/firebase";



const CreatePoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [question, setQuestion] = useState("");

  const [options, setOptions] = useState([
    "",
    "",
  ]);

  const [loading, setLoading] =
    useState(false);

  const handleOptionChange = (
    index: number,
    value: string
  ) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    if (options.length >= 10) {
      toast.error(
        "Maximum 10 options allowed"
      );
      return;
    }

    setOptions([...options, ""]);
  };

  const removeOption = (
    index: number
  ) => {
    if (options.length <= 2) {
      toast.error(
        "Minimum 2 options required"
      );
      return;
    }

    setOptions(
      options.filter(
        (_, i) => i !== index
      )
    );
  };

  const handleCreatePoll = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!question.trim()) {
      toast.error(
        "Enter Poll Question"
      );
      return;
    }

    const formattedOptions =
      options
        .filter(
          (option) =>
            option.trim() !== ""
        )
        .map((option) => ({
          text: option,
          votes: 0,
        }));

    if (
      formattedOptions.length < 2
    ) {
      toast.error(
        "Minimum 2 options required"
      );
      return;
    }

    setLoading(true);

    try {

  await dispatch(
    createPoll({
      question,
      options: formattedOptions,
      votes: [],
      status: "open",

      ownerId:
        auth.currentUser?.uid || "",

      ownerName:
        auth.currentUser?.displayName ||
        "Unknown",

      ownerEmail:
        auth.currentUser?.email || "",

      createdAt:
        new Date().toISOString(),
    })
  ).unwrap();


      toast.success(
        "Poll Created Successfully"
      );

      navigate("/dashboard");
    } catch {
      toast.error(
        "Failed to create poll"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-page">

        <div className="create-card">

          <div className="create-header">

            <h1>
              🗳 Create New Poll
            </h1>

            <p>
              Create a professional poll and
              collect votes from your users.
            </p>

          </div>

          <form
            onSubmit={handleCreatePoll}
          >

            <div className="input-group">

              <label>
                Poll Question
              </label>

              <input
                className="modern-input"
                type="text"
                placeholder="Example: Which JavaScript framework do you like the most?"
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
              />

            </div>

            <div className="options-section">

              <h3>
                Poll Options
              </h3>

              {options.map(
                (
                  option,
                  index
                ) => (

                  <div
                    key={index}
                    className="option-card"
                  >

                    <div className="option-number">

                      {index + 1}

                    </div>

                    <input
                      className="modern-input"
                      type="text"
                      placeholder={`Enter Option ${index + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(
                          index,
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      className="remove-option-btn"
                      onClick={() =>
                        removeOption(index)
                      }
                    >
                      🗑
                    </button>

                  </div>

                )
              )}

            </div>

            <button
              type="button"
              className="add-option-btn"
              onClick={addOption}
            >
              ➕ Add Another Option
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Poll"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePoll;
