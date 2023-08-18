import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Kanban.module.css"
import Ticket from "./Ticket";

const Kanban = () => {
  const [cardData, setCardData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [groupedAndOrderedData, setGroupedAndOrderedData] = useState({}); 



  const groupAndOrderTickets = async (
    groupingBy,
    orderingBy,
    tickets
  ) => {
    const groupedTickets = {};
  

    tickets.forEach((ticket) => {
      const groupKey = ticket[groupingBy];
      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }
      groupedTickets[groupKey].push(ticket);
    });

  
    const orderedTickets = {};
  
    Object.keys(groupedTickets).forEach((key) => {
      const tickets = groupedTickets[key];
      if (orderingBy === "Priority" || orderingBy === "priority") {
        tickets.sort((a, b) => b.priority - a.priority);
      } else if (orderingBy === "Title" || orderingBy === "title") {
        tickets.sort((a, b) => {
          if (a.title && b.title) {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
      }
      orderedTickets[key] = tickets;
    });
  
    return orderedTickets
    // console.log("HIIII" ,orderedTickets)
  };



  useEffect(() => {
    const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await res.data;
      console.log(data)
      setCardData(data);
      setIsDataFetched(true);

    } catch (error) {
        console.log("Error fetching data:", error);
    }
    };

    fetchData();
  }, []);




  const handleFilter = async () => {
    if(cardData && cardData.tickets && isDataFetched) {
        const groupedAndOrdered = await groupAndOrderTickets("priority", "Priority", cardData.tickets);
        console.log("function", groupedAndOrdered);
        setGroupedAndOrderedData(groupedAndOrdered); 

    } else {
        console.log("Card data or tickets array is not available yet.");
      }
  }

  return <div>
    {/* <form action=""><input type="text" /><input type="text" /></form> */}
    {isDataFetched && <button onClick={handleFilter}>
        Click
    </button>
    }


  <div className={styles.container}>
  {Object.keys(groupedAndOrderedData).map((groupKey) => (
    <div key={groupKey} className={styles.group}>
      <h2 className={styles.groupHeader}>{groupKey === 0 ? 'No Priority'
       ? 1 : 'Low'
      : groupKey}</h2>
      <ul className={styles.ticketList}>
        {groupedAndOrderedData[groupKey].map((ticket) => (
      
          <Ticket ticket={ticket} key={ticket.id} />
        ))}
      </ul>
    </div>
  ))}
</div>

  </div>;
};

export default Kanban;
