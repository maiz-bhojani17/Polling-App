import { createSlice } from "@reduxjs/toolkit";
import type { Poll } from "../types/poll";

import {
  fetchPolls,
  createPoll,
  deletePoll,
  updatePoll,
  votePoll,
  undoVote,
  togglePollStatus,
} from "./pollThunk";

interface PollState {
  polls: Poll[];
  loading: boolean;
  error: string |null;
}

const initialState: PollState = {
  polls: [],
  loading: false,
  error: null,
};

const pollSlice = createSlice({
  name: "poll",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // FETCH

      .addCase(fetchPolls.pending,(state)=>{
        state.loading=true;
      })

      .addCase(fetchPolls.fulfilled,(state,action)=>{
        state.loading=false;
        state.polls=action.payload;
      })

      .addCase(fetchPolls.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message || "Error";
      })



      // CREATE

      .addCase(createPoll.fulfilled,(state,action)=>{

        state.polls.unshift(action.payload);

      })



      // DELETE

      .addCase(deletePoll.fulfilled,(state,action)=>{

        state.polls=
        state.polls.filter(
          poll=>poll.id!==action.payload
        );

      })



      // UPDATE

      .addCase(updatePoll.fulfilled,(state,action)=>{

        const index=
        state.polls.findIndex(
          poll=>poll.id===action.payload.id
        );

        if(index!==-1){

          state.polls[index]={
            ...state.polls[index],
            ...action.payload.data
          };

        }

      })



      // VOTE

      .addCase(votePoll.fulfilled,(state,action)=>{

        const index=
        state.polls.findIndex(
          poll=>poll.id===action.payload.id
        );

        if(index!==-1){

          state.polls[index]={
            ...state.polls[index],
            ...action.payload.data
          };

        }

      })



      // UNDO

      .addCase(undoVote.fulfilled,(state,action)=>{

        const index=
        state.polls.findIndex(
          poll=>poll.id===action.payload.id
        );

        if(index!==-1){

          state.polls[index]={
            ...state.polls[index],
            ...action.payload.data
          };

        }

      })



      // STATUS

      .addCase(togglePollStatus.fulfilled,(state,action)=>{

        const poll=
        state.polls.find(
          p=>p.id===action.payload.id
        );

        if(poll){

          poll.status=
          action.payload.status;

        }

      });

  },

});

export default pollSlice.reducer;

