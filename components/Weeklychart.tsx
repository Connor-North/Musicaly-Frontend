import { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { View, Dimensions, StyleSheet, ViewProps } from "react-native";
import { Card, Layout, Text, ProgressBar } from "@ui-kitten/components";
import StarRating from "./StarRating";
import { supabase } from "@/supabase/auth-helper";

export default function WeeklyChart() {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [barData, setBarData] = useState<any | null>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [actual, setActual] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getTimesForCurrentUser() {
      setLoading(true);
      const today = new Date();
      today.setDate(today.getDate() - 7);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("practice_sessions")
          .select(`duration, created_at`)
          .gt("created_at", today.toISOString())
          .eq("student_id", user?.id);

        if (error) {
          console.error("Error fetching units:", error.message);
          setLoading(false);
          // TODO - Deal with error handling
          return;
        }

        if (data) {
          let duration = 0;
          const durationMap = data.reduce((acc, item) => {
            const date = item.created_at.split("T")[0];
            acc[date] = (acc[date] || 0) + item.duration;
            duration += item.duration;
            return acc;
          }, {});

          const today = new Date();
          const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - (6 - i));
            const date = d.toISOString().split("T")[0];
            return {
              date: date,
              label: d
                .toLocaleDateString("en-US", { weekday: "short" })
                .charAt(0),
              duration: durationMap[date] || 0,
            };
          });

          const modifiedData = {
            labels: last7Days.map((day) => day.label),
            datasets: [
              {
                data: last7Days.map((day) => day.duration),
              },
            ],
          };
          setBarData(modifiedData);
          setActual(duration);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
        setLoading(false);
      }
    }
    getTimesForCurrentUser();
  }, []);

  useEffect(() => {
    async function getTargetsForCurrentUser() {
      setLoading(true);
      const today = new Date();
      today.setDate(today.getDate() - 7);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("students")
          .select(`target_minutes`)
          .eq("id", user?.id);

        if (error) {
          console.error("Error fetching units:", error.message);
          setLoading(false);
          // TODO - Deal with error handling
          return;
        }

        if (data) {
          setTarget(data[0].target_minutes);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
        setLoading(false);
      }
    }
    getTargetsForCurrentUser();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { flexDirection: "column" }]}>
        <Card style={styles.card}>
          <Text category="s2">Just fetching your data...</Text>
        </Card>
      </View>
    );
  }

  if (!barData) {
    return (
      <View style={[styles.container, { flexDirection: "column" }]}>
        <Card style={styles.card}>
          <Text category="s2">
            Hey, there's nothing to show yet! Check your practice times here
            after you've practiced!
          </Text>
        </Card>
      </View>
    );
  }

  return (
    <>
      <View style={[styles.container, { flexDirection: "column" }]}>
        <Layout style={styles.topContainer} level="1">
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Text category="s2">Weekly practice log</Text>
              <BarChart
                data={barData}
                width={screenWidth * 0.8}
                height={screenHeight * 0.3}
                withInnerLines={false}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                fromZero={true}
                showBarTops={false}
              />
            </View>
          </Card>
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <StarRating />
            </View>
          </Card>
          <Card style={styles.card}>
            {target && actual ? (
              <View style={styles.cardContent}>
                <Text
                  category="s2"
                  style={{ textAlign: "center", marginBottom: 4 }}
                >
                  With {actual} minutes down you're at&nbsp;
                  {Math.round((actual / target) * 100)}% vs. your target this
                  week!
                </Text>
              </View>
            ) : (
              <Text category="s2">Set a target time to see your stats!</Text>
            )}
            <ProgressBar
              animating={false}
              progress={actual / target || 0}
              size={"large"}
            />
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
    // width: "90%",
    marginVertical: 4,
  },
  topContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "90%",
    marginVertical: 10,
    paddingVertical: 5,
  },
  cardContent: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

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
  barRadius: 5,
};
