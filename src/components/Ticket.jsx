import React from "react";
import styles from "../styles/Ticket.module.css";

const Ticket = ({ ticket }) => {
  return (
    <div className={styles.ticket}>
      <h3 className={styles.ticketTitle}>
        {ticket.id}
      </h3>
        <div className={styles.ticketTitleDesc}>
          <input type="radio" /><p className={styles.ticketDesc}>{ticket.title}</p>
        </div>
    </div>
  );
};

export default Ticket;
