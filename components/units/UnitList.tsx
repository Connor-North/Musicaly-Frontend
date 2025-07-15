import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import { List, ListItem, Button, Text } from "@ui-kitten/components";
import { supabase } from "@/supabase/auth-helper";

interface IListItem {
  id: string;
  title: string;
  composer: string;
  tempo_bpm: number | null;
  beats_in_bar: number | null;
  subdivision: number | null;
  collection: string | null;
  created_at: string;
  updated_at: string;
}

// TODO - Add 'edit functionality'
// TODO - Make list item 'clickable' to show individual unit stats and comments

interface UnitListProps {
  onButtonPress: (item: IListItem) => void;
  buttonText: string;
  remountKey: any;
}

export default function UnitList({
  onButtonPress,
  buttonText,
  remountKey,
}: UnitListProps) {
  const [unitData, setUnitData] = useState<IListItem[]>([]);
  const [query, setQuery] = useState("");
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    async function getUnitsForCurrentUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("units")
          .select(
            "id, title, composer, tempo_bpm, beats_in_bar, subdivision, collection, created_at, updated_at"
          )
          .eq("student_id", user?.id);

        if (error) {
          console.error("Error fetching units:", error.message);
          // TODO - Deal with error handling
          return;
        }

        if (data) {
          setUnitData(data);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    }
    getUnitsForCurrentUser();
  }, [remountKey]);

  const filteredListData = (
    query
      ? unitData.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.composer.toLowerCase().includes(query.toLowerCase())
        )
      : unitData
  ).sort((a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const renderListItem = ({
    item,
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={item.title}
      description={item.composer}
      accessoryRight={
        <Button size="small" onPress={() => onButtonPress(item)}>
          {buttonText}
        </Button>
      }
    />
  );

  if (!unitData.length) {
    return <Text>Loading units...</Text>;
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />
      <View
        style={[
          {
            height: screenHeight * 0.4,
            width: screenWidth * 0.9,
          },
        ]}
      >
        <List
          data={filteredListData}
          renderItem={renderListItem}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#ccc" }} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});
