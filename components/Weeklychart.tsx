import { BarChart, ProgressChart } from "react-native-chart-kit";
import { View, Text, Dimensions, StyleSheet } from "react-native";

export default function WeeklyChart() {
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 0) => `#0256FF`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0,
    fillShadowGradient: "#0256FF",
    fillShadowOpacity: 1,
    fillShadowGradientTo: "#0256FF",
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
  };

  const ringChartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgb(2, 86, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    fillShadowGradient: "#0256FF",
    fillShadowOpacity: 1,
    fillShadowGradientTo: "#0256FF",
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
  };

  const barData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 43],
      },
    ],
  };

  const progressData = {
    labels: ["Goal: 125 m"],
    data: [0.6],
  };

  return (
    <>
      <View style={[styles.verticallySpaced, styles.mt0]}>
        <Text>Weekly practice stats</Text>
      </View>
      <View
        style={
          (styles.container,
          {
            flexDirection: "row",
          })
        }
      >
        <BarChart
          //style={graphStyle}
          data={barData}
          width={screenWidth * 0.7}
          height={200}
          withInnerLines={false}
          // yAxisSuffix=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero={true}
        />

        <ProgressChart
          data={progressData}
          width={screenWidth * 0.3}
          height={200}
          strokeWidth={16}
          radius={60}
          chartConfig={ringChartConfig}
          hideLegend={true}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: 0,
  },
  verticallySpaced: {
    paddingTop: 1,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt0: {
    marginTop: 0,
  },
});
