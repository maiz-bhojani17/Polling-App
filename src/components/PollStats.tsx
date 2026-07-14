import type { Poll } from "../types/poll";


interface Props {
  polls: Poll[];
}


const PollStats = ({ polls }: Props) => {


  const totalPolls = polls.length;



  const totalVotes = polls.reduce(
    (total, poll)=>{

      const votes = poll.options.reduce(
        (sum, option)=> sum + option.votes,
        0
      );

      return total + votes;

    },
    0
  );



  const openPolls = polls.filter(
    (poll)=>poll.status === "open"
  ).length;



  const closedPolls = polls.filter(
    (poll)=>poll.status === "closed"
  ).length;



  const cards = [

    {
      title:"Total Polls",
      value:totalPolls,
      icon:"📊"
    },


    {
      title:"Total Votes",
      value:totalVotes,
      icon:"🗳"
    },


    {
      title:"Open Polls",
      value:openPolls,
      icon:"🟢"
    },


    {
      title:"Closed Polls",
      value:closedPolls,
      icon:"🔴"
    }

  ];




  return (

    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-5
      mb-8
      "
    >


    {
      cards.map((card)=>(

        <div
          key={card.title}
          className="
          bg-white
          shadow
          rounded-xl
          p-5
          border
          "
        >

          <div className="text-3xl">
            {card.icon}
          </div>


          <h3 className="
          text-gray-500
          mt-3
          ">
            {card.title}
          </h3>


          <p className="
          text-3xl
          font-bold
          mt-2
          ">
            {card.value}
          </p>


        </div>

      ))
    }


    </div>

  );

};


export default PollStats;