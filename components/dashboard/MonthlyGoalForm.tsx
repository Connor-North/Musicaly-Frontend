import { useState } from "react";
import { Text, Input, Button } from "@ui-kitten/components";
import { SafeAreaView, FlatList, StyleSheet, View } from "react-native";

interface Goal {
  id: string;
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
    created_at: "2025-07-05T12:04:28.149551+00:00",
  },
  {
    id: "dd59c8c7-a8a1-4b65-9db2-5d787ab1dd4d",
    student_id: "832d2edd-ebf0-48e2-8421-5fb72e9b044f",
    goal_description: "play section B invention no. 8 LH only",
    goal_date: "2025-07-12T12:04:28.149551+00:00",
    goal_status: 4,
    created_at: "2025-07-05T12:04:28.149551+00:00",
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
  // NOTE - do I need to count?
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
    const goalText = newGoals[index].trim();
    if (!goalText) return alert("Please enter a goal");

    const newGoal = {
      id: String(Date.now()),
      goal_description: goalText,
    };

    setData([...data, newGoals]);

    const updatedNewGoals = [...newGoals];
    updatedNewGoals.splice(index, 1);
    setNewGoals(updatedNewGoals);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        You have set {data.length} goals this month
      </Text>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.goal_description}</Text>
        )}
        keyExtractor={(item) => item.id}
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
                <Button onPress={() => addGoal(index)} />
              </View>
            ))}
          </>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
