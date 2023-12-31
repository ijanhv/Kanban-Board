import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const [groupingBy, setGroupingBy] = useState("status");
  const [orderingBy, setOrderingBy] = useState("title");

  const contextValue = {
    groupingBy,
    setGroupingBy,
    orderingBy,
    setOrderingBy,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}
