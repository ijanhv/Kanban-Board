import React from "react";
import styles from "../styles/Ticket.module.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsDashCircleDotted, BsExclamationSquareFill } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

const Ticket = ({ ticket }) => {
  const truncatedTitle = ticket.title.length > 40
    ? ticket.title.substring(0, 40 ) + "..." 
    : ticket.title;
  console.log("ticket", ticket);
  return (
    <div className={styles.ticket}>
      <div className={styles.ticketTop}>
      <h3 className={styles.ticketTitle}>{ticket.id}</h3>
        <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1169" width={40} height={40} 
          className={styles.ticketAvatar}
        />
      </div>
      <div>
        <div className={styles.icon}>
          {ticket.status === "In progress" ? (
            <BsDashCircleDotted className={styles.ticketStatus} />
          ) : ticket.status === "Backlog" ? (
            <BsDashCircleDotted className={styles.ticketStatus} />
          ) : (
            <HiOutlineDotsCircleHorizontal className={styles.ticketStatus} />
          )}

          <div className={styles.ticketTitleDesc}>
            <p>{truncatedTitle}</p>
          </div>
        </div>

        <div className={styles.ticketBottom}>
          <BsExclamationSquareFill className={styles.exclamationIcon} />
          <span className={styles.ticketBadge}>Feature Request</span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
