import React from "react";
import { BarChart, ProgressChart } from "react-native-chart-kit";
import { View, Dimensions, StyleSheet, ViewProps } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";
import * as Progress from "react-native-progress";
import StarRating from "./StarRating";

export default function WeeklyChart() {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

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
      <View style={[styles.container, { flexDirection: "column" }]}>
        <Layout style={styles.topContainer} level="1">
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <BarChart
                //style={graphStyle}
                data={barData}
                width={screenWidth * 0.9}
                height={screenHeight * 0.3}
                withInnerLines={false}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                fromZero={true}
              />
            </View>
          </Card>
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Progress.Bar
                progress={0.4}
                width={screenWidth * 0.9}
                animated={false}
                color={"#0256FF"}
                unfilledColor={"#b6cdff"}
              />
              <StarRating />
            </View>
          </Card>
        </Layout>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    marginVertical: 10,
    padding: 15,
  },
  cardContent: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});
