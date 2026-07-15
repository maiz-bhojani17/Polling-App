import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../redux/store";
import {
  deletePoll,
  fetchPolls,
  togglePollStatus,
  undoVote,
  updatePoll,
  votePoll,
} from "../redux/pollThunk";

import { auth } from "../firebase/firebase";
import type { Poll } from "../types/poll";
import ProgressBar from "./ProgressBar";
import { calculatePercentage } from "../util/percentage";
import { ADMIN_EMAIL } from "../util/admin";

interface PollCardProps {
  poll: Poll;
  refreshPolls: () => void;
}

const PollCard = ({
  poll,
}: PollCardProps) => {

  const dispatch =
    useDispatch<AppDispatch>();

  const [editing, setEditing] =
    useState(false);

  const [question, setQuestion] =
    useState(poll.question);

  const [options, setOptions] =
    useState(poll.options);

  const currentUser =
    auth.currentUser;

  const isOwner =
    currentUser?.uid === poll.ownerId;

    const isAdmin =
  auth.currentUser?.email === ADMIN_EMAIL;

  const totalVotes =
    poll.options.reduce(
      (sum, option) =>
        sum + option.votes,
      0
    );

  const currentVote = poll.votes?.find(
    (vote) => vote.uid === auth.currentUser?.uid
  );

  const handleVote = async (
    index: number
  ) => {

    if (!currentUser) {
      toast.error(
        "Please login first"
      );
      return;
    }

    if (poll.status === "closed") {
      toast.error(
        "Poll is closed"
      );
      return;
    }

    if (currentVote) {
      toast.error(
        "You have already voted."
      );
      return;
    }

    const updatedOptions = [
      ...poll.options,
    ];

    updatedOptions[index] = {
      ...updatedOptions[index],
      votes:
        updatedOptions[index]
          .votes + 1,
    };

    const updatedVotes = [
      ...(poll.votes || []),
      {
        uid: currentUser.uid,
        optionIndex: index,
      },
    ];

    await dispatch(
      votePoll({
        id: poll.id,
        data: {
          options:
            updatedOptions,
          votes:
            updatedVotes,
        },
      })
    );

    await dispatch(fetchPolls());

    toast.success(
      "Vote Submitted"
    );
  };

  const handleUndoVote =
    async () => {

      if (!currentVote)
        return;

      const updatedOptions = [
        ...poll.options,
      ];

      updatedOptions[
        currentVote.optionIndex
      ] = {
        ...updatedOptions[
        currentVote.optionIndex
        ],
        votes:
          updatedOptions[
            currentVote.optionIndex
          ].votes - 1,
      };

      const updatedVotes =
        poll.votes.filter(
          (vote) =>
            vote.uid !==
            currentUser?.uid
        );

      await dispatch(
        undoVote({
          id: poll.id,
          data: {
            options:
              updatedOptions,
            votes:
              updatedVotes,
          },
        })
      );

      await dispatch(fetchPolls());

      toast.success(
        "Vote Removed"
      );
    };

  const handleDelete =
    async () => {

      if (
        !window.confirm(
          "Delete this poll?"
        )
      )
        return;

      await dispatch(
        deletePoll(
          poll.id
        )
      );

      await dispatch(fetchPolls());

      toast.success(
        "Poll Deleted"
      );
    };

  const handleToggleStatus =
    async () => {

      await dispatch(
        togglePollStatus({
          id: poll.id,
          status:
            poll.status ===
              "open"
              ? "closed"
              : "open",
        })
      );

      await dispatch(fetchPolls());

    };

  const handleUpdate =
    async () => {

      await dispatch(
        updatePoll({
          id: poll.id,
          data: {
            question,
            options,
          },
        })
      );

      await dispatch(fetchPolls());

      toast.success(
        "Poll Updated"
      );

      setEditing(false);
    };

  const updateOption = (
    index: number,
    value: string
  ) => {

    const updated =
      [...options];

    updated[index] = {
      ...updated[index],
      text: value,
    };

    setOptions(updated);
  };

  return (
    <div className="poll-card">


      <div className="poll-header">
        <div>
          <span
            className={
              poll.status === "open"
                ? "status-open"
                : "status-close"
            }
          >

            <p className="owner-name">
              👤 Created by: <strong>{poll.ownerName}</strong>
            </p>

          </span>

          {editing ? (
            <input
              className="modern-input"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
            />
          ) : (
            <h2>{poll.question}</h2>
          )}
        </div>
      </div>

      <div className="vote-info">
        Total Votes:
        <strong> {totalVotes}</strong>
      </div>

      {(editing ? options : poll.options).map(
        (option, index) => {
          const percentage =
            calculatePercentage(
              option.votes,
              totalVotes
            );

          return (
            <div
              className="option-box"
              key={index}
            >
              {editing ? (
                <input
                  className="modern-input"
                  value={option.text}
                  onChange={(e) =>
                    updateOption(
                      index,
                      e.target.value
                    )
                  }
                />
              ) : (
                <>
                  <h3>{option.text}</h3>

                  <ProgressBar
                    percentage={percentage}
                  />

                  <p>
                    {option.votes} Votes (
                    {percentage}%)
                  </p>

                  <button
                    className="vote-btn"
                    disabled={!!currentVote}
                    onClick={() => handleVote(index)}
                  >
                    {currentVote ? "✅ Already Voted" : "👍 Vote"}
                  </button>
                </>
              )}


            </div>
          );
        }
      )}

      {!editing && currentVote && (
        <button
          className="undo-btn"
          onClick={handleUndoVote}
        >
          ↩ Undo Vote
        </button>
      )}

      {(isOwner || isAdmin) && (
        <div className="poll-actions">

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            🗑 Delete
          </button>

          <button
            className="close-btn"
            onClick={handleToggleStatus}
          >
            {poll.status === "open"
              ? "🔒 Close"
              : "🔓 Open"}
          </button>

          {editing ? (
            <button
              className="save-btn"
              onClick={handleUpdate}
            >
              💾 Save
            </button>
          ) : (
            <button
              className="edit-btn"
              onClick={() =>
                setEditing(true)
              }
            >
              ✏ Edit
            </button>
          )}

        </div>
      )}
    </div>
  );
};

export default PollCard;

