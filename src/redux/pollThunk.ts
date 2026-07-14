import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import type { Poll } from "../types/poll";

// ================= FETCH =================

export const fetchPolls = createAsyncThunk(
  "poll/fetchPolls",
  async () => {
    const snapshot = await getDocs(
      collection(db, "polls")
    );

    const polls: Poll[] = snapshot.docs.map(
      (docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Poll, "id">),
      })
    );

    return polls;
  }
);

// ================= CREATE =================

export const createPoll = createAsyncThunk(
  "poll/createPoll",
  async (pollData: Omit<Poll, "id">) => {
    const docRef = await addDoc(
      collection(db, "polls"),
      pollData
    );

    return {
      id: docRef.id,
      ...pollData,
    };
  }
);

// ================= DELETE =================

export const deletePoll = createAsyncThunk(
  "poll/deletePoll",
  async (id: string) => {
    await deleteDoc(
      doc(db, "polls", id)
    );

    return id;
  }
);

// ================= UPDATE =================

export const updatePoll = createAsyncThunk(
  "poll/updatePoll",
  async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<Poll>;
  }) => {
    await updateDoc(
      doc(db, "polls", id),
      data
    );

    return {
      id,
      data,
    };
  }
);

// ================= VOTE =================

export const votePoll = createAsyncThunk(
  "poll/votePoll",
  async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<Poll>;
  }) => {
    await updateDoc(
      doc(db, "polls", id),
      data
    );

    return {
      id,
      data,
    };
  }
);

// ================= UNDO =================

export const undoVote = createAsyncThunk(
  "poll/undoVote",
  async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<Poll>;
  }) => {
    await updateDoc(
      doc(db, "polls", id),
      data
    );

    return {
      id,
      data,
    };
  }
);

// ================= TOGGLE POLL STATUS =================

export const togglePollStatus = createAsyncThunk(
  "poll/toggleStatus",
  async ({
    id,
    status,
  }: {
    id: string;
    status: "open" | "closed";
  }) => {
    await updateDoc(
      doc(db, "polls", id),
      {
        status,
      }
    );

    return {
      id,
      status,
    };
  }
);

