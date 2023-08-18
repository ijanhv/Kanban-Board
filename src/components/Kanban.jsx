import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Kanban.module.css";
import Ticket from "./Ticket";
import { useFilterContext } from "../context/TicketContext";
import { AiOutlinePlus } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import IconComponent from "./IconComponent";

const Kanban = () => {
  const [cardData, setCardData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [groupedAndOrderedData, setGroupedAndOrderedData] = useState({});
  const { groupingBy, setGroupingBy, orderingBy, setOrderingBy } =
    useFilterContext();

  // console.log("groupingBy", groupingBy);
  // console.log("orderingBy", orderingBy);

  const groupAndOrderTickets = async (groupingBy, orderingBy, tickets) => {
 
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
      if (orderingBy === "priority" || orderingBy === "priority") {
        tickets.sort((a, b) => b.priority - a.priority);
      } else if (orderingBy === "title" || orderingBy === "title") {
        tickets.sort((a, b) => {
          if (a.title && b.title) {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
      }
      orderedTickets[key] = tickets;
    });

    return orderedTickets;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await res.data;
        setCardData(data);
        setIsDataFetched(true);
        handleFilter(groupingBy, orderingBy);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cardData]);

  const handleFilter = async (groupingBy, orderingBy) => {
    if (cardData && cardData.tickets && isDataFetched) {
      const groupedAndOrdered = await groupAndOrderTickets(
        groupingBy,
        orderingBy,
        cardData.tickets
      );
      // console.log(cardData.users);
      // console.log("function", groupedAndOrdered);
      setGroupedAndOrderedData(groupedAndOrdered);
    } else {
      console.log("Card data or tickets array is not available yet.");
    }
  };

  return (
    <div>
      {!isDataFetched && (
        <div className={styles.loader}>
          <img
            src="https://retchhh.files.wordpress.com/2015/03/loading1.gif?w=600"
            alt="loading"
          />
        </div>
      )}

      <div className={styles.container} style={{ overflow: 'scroll' }}>
        {Object.keys(groupedAndOrderedData).map((groupKey) => {
          const user = cardData.users.find((user) => user.id === groupKey); 
          const displayName = user ? user.name : groupKey;
          const ticketCount = groupedAndOrderedData[groupKey].length;

          return (
            <div key={groupKey} className={styles.group}>
              <div className={styles.ticketHeader}>
                <h2 className={styles.groupHeader}>
                  {groupingBy === "userId" && <RxAvatar className={styles.avatar} />}
                  {groupingBy === "priority" && (
                    <IconComponent priority={groupKey} />
                  )}
                  {groupKey === "0"
                    ? "No Priority"
                    : groupKey === "1"
                    ? "Low"
                    : groupKey === "2"
                    ? "Medium"
                    : groupKey === "3"
                    ? "High Priority"
                    : groupKey === "4"
                    ? "Urgent"
                    : displayName
                    ? displayName
                    : groupKey}
                    <span className={styles.ticketCount}> {ticketCount}</span> {/* Display the ticket count */}

                </h2>
                <div className={styles.ticketIcons}>
                  <AiOutlinePlus className={styles.plusIcon} />
                  <BiDotsHorizontalRounded className={styles.ellipsisIcon} />
                </div>
              </div>
              <ul className={styles.ticketList}>
                {groupedAndOrderedData[groupKey].map((ticket) => (
                  <Ticket ticket={ticket} key={ticket.id} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Kanban;
