// import { createContext, ReactNode, useContext, useState } from "react";

// interface ExtraChart {
//   data: any;
//   options?: any;
// }
// interface ChartContextState {
//   activeChartId: string;

//   chartExtrasMap: {
//     [key: string]: ExtraChart[];
//   };

//   openAddChart: (chartId: string) => void;
//   closeAddChart: () => void;

//   addExtraChart: (chartId: string, newChartData: ExtraChart) => void;
// }
// const ChartContext = createContext<ChartContextState | undefined>(undefined);

// export const ChartContextProvider = ({ children }: { children: ReactNode }) => {
//   const [activeChartId, setActiveChartId] = useState<string>("");

//   // Track how many extra charts per chart
//   const [chartExtrasMap, setChartExtrasMap] = useState<{
//     [key: string]: any[];
//   }>({});

//   //Open UI for specific chart
//   const openAddChart = (chartId: string) => {
//     setActiveChartId(chartId);
//   };

//   //Close UI
//   const closeAddChart = () => {
//     setActiveChartId("");
//   };

//   //Add extra chart
//   const addExtraChart = (chartId: string, newChartData: any) => {
//     setChartExtrasMap((prev) => {
//       const existing = prev[chartId] || [];

//       //Limit = 13
//       if (existing.length >= 13) return prev;

//       return {
//         ...prev,
//         [chartId]: [...existing, newChartData],
//       };
//     });
//   };

//   return (
//     <ChartContext.Provider
//       value={{
//         activeChartId,
//         openAddChart,
//         closeAddChart,
//         chartExtrasMap,
//         addExtraChart,
//       }}
//     >
//       {children}
//     </ChartContext.Provider>
//   );
// };

// export const useChartContext = () => useContext(ChartContext);
