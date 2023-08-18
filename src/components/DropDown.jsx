import React, { useState } from "react";
import styles from "../styles/DropDown.module.css"
import { AdjustmentsHorizontalIcon, ChevronDownIcon} from "@heroicons/react/24/outline";
import { useFilterContext } from "../context/TicketContext";


const DropDown = () => {
  const { groupingBy, setGroupingBy, orderingBy, setOrderingBy } = useFilterContext();
  

  const [open, setOpen] = useState(false);

  const toggleDropDown = () => {
    setOpen(!open);
  };

  const list = [
    { label: "Grouping", value: ["Status", "User", "Priority"] },
    { label: "Ordering", value: ["Priority", "Title"] },
  ];

  return (
    <div className={styles.dropdownContainer}>
      <button
        onClick={toggleDropDown}
        className={styles.dropdownButton}
      >
        <AdjustmentsHorizontalIcon  width={15} height={15} />
        Display 
       <ChevronDownIcon  width={15} height={15} />
      </button>
      {/* Dropdown menu */}
      <div
        className={`${styles.dropdownMenu} ${open ? styles.showMenu : styles.hideMenu}`}
      >
        <ul className={styles.menuList}>
          {list.map((item) => (
            <li key={item.label} className={styles.menuItem}>
              {item.label}
              <select className={styles.selectBox}>
                {item.value.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
