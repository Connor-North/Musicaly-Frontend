import React from "react";
import { View, Dimensions } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

const PracticeHeatmap: React.FC = () => {
  const practiceData = [
    { date: "2025-07-01", count: 1 },
    { date: "2025-07-03", count: 1 },
    { date: "2025-07-04", count: 1 },
    { date: "2025-07-07", count: 1 },
    { date: "2025-07-08", count: 1 },
    { date: "2025-07-10", count: 1 },
  ];

  return (
    <View>
      <ContributionGraph
        values={practiceData}
        endDate={new Date("2025-07-31")}
        numDays={31}
        width={Dimensions.get("window").width}
        tooltipDataAttrs={() => ({ fill: "black" })}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        }}
        squareSize={20}
      />
    </View>
  );
};

export default PracticeHeatmap;
