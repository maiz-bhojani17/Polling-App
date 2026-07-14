import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import PollCard from "../components/PollCard";

import { fetchPolls } from "../redux/pollThunk";
import type { AppDispatch, RootState } from "../redux/store";
import LoadingSpinner from "../components/LoadingSpinner";


const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { polls, loading, error } = useSelector(
    (state: RootState) => state.poll
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  const filteredPolls = useMemo(() => {
    return polls.filter((poll) =>
      poll.question
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [polls, search]);

  // Analytics

  const totalPolls = polls.length;

  const openPolls = polls.filter(
    (poll) => poll.status === "open"
  ).length;

  const closedPolls = polls.filter(
    (poll) => poll.status === "closed"
  ).length;

  const totalVotes = polls.reduce(
    (total, poll) =>
      total +
      poll.options.reduce(
        (sum, option) => sum + option.votes,
        0
      ),
    0
  );

  const userName = useMemo(() => {
    const email =
      localStorage.getItem("userEmail") || "";

    if (!email) return "User";

    return email.split("@")[0];
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          padding: "35px",
        }}
      >
        {/* Hero Section */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#4f46e5,#6366f1)",
            color: "#fff",
            borderRadius: "20px",
            padding: "40px",
            marginBottom: "35px",
            boxShadow:
              "0 15px 35px rgba(79,70,229,.25)",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              marginBottom: "10px",
            }}
          >
            👋 Welcome Back, {userName}
          </h1>

          <p
            style={{
              opacity: 0.9,
              fontSize: "17px",
              marginBottom: "25px",
            }}
          >
            Manage your polls, track voting
            analytics and create new polls
            easily.
          </p>

          <Link to="/create-poll">
            <button className="create-btn">
              ➕ Create New Poll
            </button>
          </Link>
        </div>

        {/* Analytics Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <div className="dashboard-card">
            <h2>📊 {totalPolls}</h2>
            <p>Total Polls</p>
          </div>

          <div className="dashboard-card">
            <h2>🟢 {openPolls}</h2>
            <p>Open Polls</p>
          </div>

          <div className="dashboard-card">
            <h2>🔴 {closedPolls}</h2>
            <p>Closed Polls</p>
          </div>

          <div className="dashboard-card">
            <h2>🗳 {totalVotes}</h2>
            <p>Total Votes</p>
          </div>
        </div>

        {/* Search Section */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search polls..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              flex: 1,
              minWidth: "260px",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              outline: "none",
              background: "#fff",
              boxShadow:
                "0 4px 12px rgba(0,0,0,.05)",
            }}
          />

          <div
            style={{
              background: "#ffffff",
              padding: "15px 20px",
              borderRadius: "12px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,.05)",
              fontWeight: "600",
              color: "#4f46e5",
            }}
          >
            Showing {filteredPolls.length} Polls
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              fontSize: "20px",
              color: "#4f46e5",
              fontWeight: "bold",
            }}
          >
            ⏳ Loading Polls...
          </div>
        )}


        {loading && (
          <LoadingSpinner />
        )}


        {/* Error */}

        {!loading && error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "25px",
              fontWeight: "600",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Empty State */}



        {!loading &&
          !error &&
          filteredPolls.length === 0 && (

            <div className="empty-state">

              <div className="empty-icon">
                📭
              </div>

              <h2>
                No Polls Found
              </h2>

              <p>
                It looks like there are no polls available.
                Create your first poll and start collecting votes.
              </p>

              <Link to="/create-poll">
                <button className="empty-btn">
                  ➕ Create Your First Poll
                </button>
              </Link>

            </div>

          )}

        {/* Poll Cards */}

        {!loading &&
          !error &&
          filteredPolls.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(380px, 1fr))",
                gap: "25px",
              }}
            >
              {filteredPolls.map((poll) => (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  refreshPolls={() =>
                    dispatch(fetchPolls())
                  }
                />
              ))}
            </div>
          )}
      </div>
    </>
  );
};

export default Dashboard;