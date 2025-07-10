import React from "react";
import { BarChart, ProgressChart } from "react-native-chart-kit";
import { View, Dimensions, StyleSheet, ViewProps } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";

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
    color: (opacity = 1) => `rgba(2, 86, 255, ${opacity})`, // Fixed
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
    colors: ["#0256FF"],
  };

  return (
    <>
      <View
        style={
          (styles.container,
          {
            flexDirection: "column",
          })
        }
      >
        <Layout style={styles.topContainer} level="1">
          <Card style={styles.card}>
            <BarChart
              //style={graphStyle}
              data={barData}
              width={screenWidth * 0.9}
              height={150}
              withInnerLines={false}
              // yAxisSuffix=""
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              fromZero={true}
            />
          </Card>
          <Card style={styles.card}>
            <ProgressChart
              data={progressData}
              width={screenWidth * 0.9}
              height={100}
              strokeWidth={8}
              radius={25}
              chartConfig={ringChartConfig}
              hideLegend={false}
              withCustomBarColorFromData
            />
          </Card>
        </Layout>
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
    // alignSelf: "stretch",
  },
  mt0: {
    marginTop: 0,
  },
  topContainer: {
    flexDirection: "column",
    alignSelf: "baseline",
    alignItems: "flex-start",
    // justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 2,
  },
});
