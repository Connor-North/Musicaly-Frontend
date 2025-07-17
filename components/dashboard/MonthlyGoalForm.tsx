import { useState, useEffect } from "react";
import { Card, Text, Input, Button, ProgressBar } from "@ui-kitten/components";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { supabase } from "@/supabase/auth-helper";

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

export default function MonthlyGoalsForm() {
  const [data, setData] = useState<Goal[]>(initialGoals);
  const [newTarget, setNewTarget] = useState<string>("");
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
          .lt("goal_status", 5)
          .eq("student_id", user?.id);

        if (error) {
          console.error("Error fetching units:", error.message);

          return;
        }

        if (data) {
          setData(data);
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

  const handleTargetChange = (targetText: string) => {
    setNewTarget(targetText);
    console.log("input changed", targetText);
  };

  async function updateProgress(index: number, amount: number) {
    let goalStatus;
    setData((currentData) => {
      const updated = [...currentData];
      const goal = { ...updated[index] };
      console.log(goal);
      goal.goal_status = goal.goal_status + amount;
      if (goal.goal_status > 5) {
        goal.goal_status = 5;
      } else if (goal.goal_status < 0) {
        goal.goal_status = 0;
      }
      updated[index] = goal;
      goalStatus = goal;
      return updated;
    });
    try {
      const { error, data } = await supabase
        .from("student_monthly_goals")
        .update([{ goal_status: goalStatus.goal_status }])
        .eq("id", goalStatus.id)
        .select("goal_status");
      if (error) {
        console.error("Progress not updated", error);
      }
      if (data) {
        console.log("Progress updated successfully", data);
      }
    } catch (error) {
      console.error("there was a problem updating your progress");
      setData((currentData) => {
        const updated = [...currentData];
        const goal = { ...updated[index] };
        console.log(goal);
        goal.goal_status = goal.goal_status + amount;
        if (goal.goal_status > 5) {
          goal.goal_status = 5;
        } else if (goal.goal_status < 0) {
          goal.goal_status = 0;
        }
        updated[index] = goal;
        goalStatus = goal;
        return updated;
      });
    }
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
          updatedNewGoals[index] = "";
          return updatedNewGoals;
        });
      }
    } catch (error) {
      console.error("Error inserting goal:", error);
    }
  }
  useEffect(() => {
    const remainingInputs = 5 - data.length;

    if (remainingInputs > 0) {
      setNewGoals((currentInputs) => {
        const updated = [...currentInputs.slice(0, remainingInputs)];
        const extraInputs = Array(remainingInputs - updated.length).fill("");
        return [...updated, ...extraInputs];
      });
    } else {
      setNewGoals([]);
    }
  }, [data]);

  async function deleteGoal(index: number) {
    const goalToDelete = data[index];
    console.log(goalToDelete);
    try {
      const { error, data } = await supabase
        .from("student_monthly_goals")
        .delete()
        .eq("id", goalToDelete.id)
        .select();
      if (error) {
        console.error("Failed to delete goal");
        return;
      }
      if (data) {
        setData((currentData) => {
          const updated = [...currentData];
          updated.splice(index, 1);
          return updated;
        });
        console.log("Goal deleted successfully");
      }
    } catch (error) {
      console.error("An error occurred while deleting the goal", error);
    }
  }

  if (!newGoals) {
    console.log("Loading");
    return <Text>Loading...</Text>;
  }

  return (
    // <ScrollView>
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Text category="h4" style={styles.title}>
          Set your goals! 🎯
        </Text>
        <Card style={styles.targetCard}>
          <Text category="s2" style={styles.item}>
            Set your weekly target
          </Text>
          <View style={styles.weeklyTargetBox}>
            <Input
              style={styles.input}
              placeholder="Minutes"
              value={newTarget}
              onChangeText={(targetText) => handleTargetChange(targetText)}
            />
            <Button>Set</Button>
          </View>
        </Card>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <>
              <View style={{ paddingVertical: 15 }}>
                <Text category="s2" style={styles.item}>
                  {item.goal_description}
                </Text>
                <View style={styles.progressRow}>
                  <Button
                    size="tiny"
                    onPress={() => deleteGoal(index)}
                    appearance="outline"
                    status="danger"
                  >
                    ❌
                  </Button>
                  <Button
                    style={{ marginHorizontal: 7 }}
                    size="tiny"
                    onPress={() => updateProgress(index, -1)}
                  >
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
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "90%",
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
  },
  card: {
    width: "90%",
    marginBottom: 5,
  },
  targetCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  weeklyTargetBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 5,
  },
  item: {
    paddingBottom: 8,
    textAlign: "center",
  },
  success: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 1,
  },
  successContainer: {
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    width: "100%",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    paddingRight: 8,
    height: 40,
  },
  progressBar: {
    flex: 1,
    height: 5,
  },
});
