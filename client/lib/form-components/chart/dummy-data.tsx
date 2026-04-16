//demo
const chartColors = [
  "rgba(250, 170, 0, 0.5)",
  "rgba(250, 170, 0, 0.8)",
  "rgba(250, 170, 0, 0.7)",
  "rgba(101, 81, 38, 1)",
];

const chartData = [35, 25, 20, 20];
const donutChartData = {
  labels: ["Completed Tasks", "In Progress", "Pending", "Cancelled"],
  datasets: [
    {
      label: "Dashboard Metrics",
      data: chartData, // ← change these numbers anytime
      backgroundColor: chartColors,
      //below border colors are not used. Uncomment for use
      borderColor: [
        // "rgba(250, 170, 0, 0.5)",
        // "rgba(250, 170, 0, 0.8)",
        // "rgba(250, 170, 0, 0.7)",
        // "rgba(101, 81, 38, 1)",
      ],
      borderWidth: 0,
      hoverOffset: 10, // nice pop on hover
      // fillOffset: 0.5, // custom property for potential animation control
      offset: 10, // default offset for all segments
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false, // important for dashboards
  cutout: "60%", // makes it a proper doughnut (not pie)
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxHeight: 14,
        boxWidth: 14,
        // padding: 30,
        font: { size: 12 },
        color: "#FFF",
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      borderColor: "rgba(250, 170, 0, 0.251)",
      borderWidth: 1,
      titleFont: { size: 14 },
      bodyFont: { size: 13 },
    },
  },
};
export { donutChartData, options };
