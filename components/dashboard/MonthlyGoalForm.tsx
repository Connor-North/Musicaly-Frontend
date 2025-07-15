import { useState, useEffect } from "react";
import { Card, Text, Input, Button, ProgressBar } from "@ui-kitten/components";
import { SafeAreaView, FlatList, StyleSheet, View } from "react-native";
import { supabase } from "@/supabase/auth-helper";

// render goals list from returned data
// check list initially has 5 empty goals
// implement logic to add a new goal (onPress ====> INSERT) | add created_at

interface Goal {
  id?: string;
  student_id: string;
  goal_description: string;
  goal_date: string;
  goal_status: number;
  created_at: string;
  updated_at: string;
}

let initialGoals: Goal[] = [];
// [
//   {
//     id: "dd59c8c7-a8a1-4b65-9db2-5d787ab1dd4d",
//     student_id: "832d2edd-ebf0-48e2-8421-5fb72e9b044f",
//     goal_description: "play section B invention no. 8 RH only",
//     goal_date: "2025-07-19T12:04:28.149551+00:00",
//     goal_status: 4,
//     created_at: "2025-07-05T12:04:28.149551+00:00",
//     updated_at: "2025-07-05T12:04:28.149551+00:00",
//   },
// ];

export default function MonthlyGoalsForm() {
  // NOTE - do I need to count goal count?
  const [data, setData] = useState<Goal[]>(initialGoals);
  const [goalCount, setGoalCount] = useState(data.length);
  const [newGoals, setNewGoals] = useState<string[]>(
    Array(5 - data.length).fill("")
  );

  useEffect(() => {
    async function getGoalsForCurrentUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("student_monthly_goals")
          .select("*")
          .eq("student_id", user?.id);

        if (error) {
          console.error("Error fetching units:", error.message);
          // TODO - Deal with error handling
          return;
        }

        if (data) {
          initialGoals = data;
          console.log("Units for current user:", data);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    }
    getGoalsForCurrentUser();
  }, []);

  const handleInputChange = (text: string, index: number) => {
    const updated = [...newGoals];
    updated[index] = text;
    setNewGoals(updated);
  };

  //Handler for adding progress
  async function updateProgress(index: number, amount: number) {
    setData((currentData) => {
      const updated = [...currentData];
      const goal = { ...updated[index] };
      goal.goal_status = goal.goal_status + amount;
      if (goal.goal_status > 5) {
        goal.goal_status = 5;
      } else if (goal.goal_status < 0) {
        goal.goal_status = 0;
      }
      updated[index] = goal;
      return updated;
    });
  }

  // Handler for adding a new goal
  async function addGoal(index: number) {
    const goalText: string = newGoals[index].trim();
    if (goalText.length < 5) {
      alert("Please write at least 5 characters");
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("student_monthly_goals")
        .insert([
          {
            student_id: user?.id,
            goal_description: goalText,
            goal_status: 0,
            goal_date: null,
            created_at: new Date().toLocaleString("en-US", {
              timeZone: "Europe/London",
            }),
          },
        ])
        .select("*");

      if (error) {
        console.error("Error inserting goal:", error.message);

        return;
      }

      if (data) {
        console.log("New goal inserted:", data[0]);
        const newGoal = data[0];
        setData((currentData) => {
          const updatedData = [...currentData, newGoal];
          return updatedData;
        });

        setNewGoals((currentGoals) => {
          const updatedNewGoals = [...currentGoals];
          updatedNewGoals.splice(index, 1);
          return updatedNewGoals;
        });
      }
    } catch (error) {
      console.error("Error inserting goal:", error);
    }
  }

  // const newGoal: Goal = {
  //   id: Math.random().toString(),
  //   student_id: "832d2edd-ebf0-48e2-8421-5fb72e9b044z", // FIXME - replace with actual value, extract from data, or from session object of Supabase session?
  //   goal_description: goalText,
  //   goal_date: new Date().toLocaleString("en-US", {
  //     timeZone: "Europe/London",
  //   }),
  //   goal_status: 0,
  //   created_at: new Date().toLocaleString("en-US", {
  //     timeZone: "Europe/London",
  //   }),
  //   updated_at: new Date().toLocaleString("en-US", {
  //     timeZone: "Europe/London",
  //   }),
  // };

  //NOTE - Consider - handle logic here for updating on Supabase? Or render all locally and handle elsewhere?

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <>
              <View style={{ paddingVertical: 15 }}>
                <Text style={styles.item}>{item.goal_description}</Text>
                <View style={styles.progressRow}>
                  <Button size="tiny" onPress={() => updateProgress(index, -1)}>
                    -
                  </Button>
                  <ProgressBar
                    style={styles.progressBar}
                    animating={false}
                    progress={item.goal_status / 5}
                  />

                  <Button size="tiny" onPress={() => updateProgress(index, 1)}>
                    +
                  </Button>
                </View>
                {item.goal_status === 5 ? (
                  <View style={styles.successContainer}>
                    <Text style={styles.success} status="success">
                      You have reached your goal! 🎉
                    </Text>
                  </View>
                ) : (
                  <View style={styles.successContainer}>
                    <Text style={styles.success} status="success"></Text>
                  </View>
                )}
              </View>
            </>
          )}
          keyExtractor={(item) => item.created_at}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#ccc" }} />
          )}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Set and check your goals! 🎯</Text>
          )}
        />

        {newGoals.map((goal, index) => (
          <View key={index} style={styles.inputContainer}>
            <Input
              placeholder={`Add goal #${data.length + index + 1}`}
              value={goal}
              onChangeText={(text) => handleInputChange(text, index)}
              style={styles.input}
            />
            <Button onPress={() => addGoal(index)}>Add Goal!</Button>
          </View>
        ))}
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    width: "90%",
    marginVertical: 10,
    padding: 15,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",

    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    paddingVertical: 8,
  },
  success: {
    fontSize: 10,
    paddingVertical: 1,
  },
  successContainer: {
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 40,
    marginRight: 10,
  },
  progressBar: {
    flex: 1,
    height: 5,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
