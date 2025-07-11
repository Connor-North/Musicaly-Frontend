import { useState } from "react";
import { Card, Text, Input, Button, ProgressBar } from "@ui-kitten/components";
import { SafeAreaView, FlatList, StyleSheet, View } from "react-native";

interface Goal {
  id?: string;
  student_id: string;
  goal_description: string;
  goal_date: string;
  goal_status: number;
  created_at: string;
}

const [data, setData] = useState<Goal[]>([
  {
    id: "dd59c8c7-a8a1-4b65-9db2-5d787ab1dd4d",
    student_id: "832d2edd-ebf0-48e2-8421-5fb72e9b044f",
    goal_description: "play all 4 grade pieces to 75% tempo",
    goal_date: "2025-08-21T12:04:28.149551+00:00",
    goal_status: 2,
    created_at: "2025-07-05T12:04:29.149551+00:00",
  },
  {
    id: "dd59c8c7-a8a1-4b65-9db2-5d787ab1dd4d",
    student_id: "832d2edd-ebf0-48e2-8421-5fb72e9b044f",
    goal_description: "play section B invention no. 8 LH only",
    goal_date: "2025-07-12T12:04:28.149551+00:00",
    goal_status: 4,
    created_at: "2025-07-05T12:04:27.149551+00:00",
  },
  {
    id: "dd59c8c7-a8a1-4b65-9db2-5d787ab1dd4d",
    student_id: "832d2edd-ebf0-48e2-8421-5fb72e9b044f",
    goal_description: "play section B invention no. 8 RH only",
    goal_date: "2025-07-19T12:04:28.149551+00:00",
    goal_status: 4,
    created_at: "2025-07-05T12:04:28.149551+00:00",
  },
]);

export default function MonthlyGoalsForm() {
  // NOTE - do I need to count goal count?
  const [goalCount, setGoalCount] = useState(data.length);
  const [newGoals, setNewGoals] = useState<string[]>(
    Array(5 - data.length).fill("")
  );

  const handleInputChange = (text: string, index: number) => {
    const updated = [...newGoals];
    updated[index] = text;
    setNewGoals(updated);
  };

  // Handler for adding a new goal
  const addGoal = (index: number) => {
    const goalText: string = newGoals[index].trim();
    if (goalText.length < 5) {
      alert("Please write at least 5 characters");
      return;
    }

    // Build complete newGoal matching your Goal interface
    const newGoal: Goal = {
      student_id: "some-student-id", // FIXME - replace with actual value, extract from data, or from session object of Supabase session?
      goal_description: goalText,
      goal_date: new Date().toISOString(), //FIXME - Is this valid date format for Supabase TimeStampZ - check vs reference object
      goal_status: 0, // Set at 0, as new goal will be unstarted...?
      created_at: new Date().toISOString(), //FIXME - Is this valid date format for Supabase TimeStampZ
    };

    setData([...data, newGoal]);

    const updatedNewGoals = [...newGoals];
    updatedNewGoals.splice(index, 1);
    setNewGoals(updatedNewGoals);

    //NOTE - Consider - handle logic here for updating on Supabase? Or render all locally and handle elsewhere?
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <>
              <Text style={styles.item}>{item.goal_description}</Text>
              <ProgressBar animating={false} progress={item.goal_status / 5} />
            </>
          )}
          keyExtractor={(item) => item.created_at}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#ccc" }} />
          )}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Set and check your goals! 🎯</Text>
          )}
          ListFooterComponent={() => (
            <>
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
            </>
          )}
        />
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
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    paddingVertical: 8,
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
});
