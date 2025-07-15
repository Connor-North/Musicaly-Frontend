import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import { List, ListItem, Button } from "@ui-kitten/components";
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

// TODO - Run API query for retrieving live data, wrap in useEffect to mount on first load of screen.
// TODO - Add 'edit functionality'
// TODO - Make list item 'clickable' to show individual unit stats and comments

let unitData: IListItem[] = [];
// = [
//   {
//     id: "b111895c-4aab-4055-96e9-d95458b00f50",
//     title: "Nocturne Op. 9 No. 2",
//     composer: "Chopin",
//     tempo_bpm: null,
//     beats_in_bar: null,
//     subdivision: null,
//     collection: null,
//     created_at: "2025-07-10T21:11:10.616878+00:00",
//     updated_at: "2025-07-10T21:11:10.616878+00:00",
//   },
//   {
//     id: "6596da09-a4ff-49e1-ae56-e64f40f25a1f",
//     title: "Clair de Lune",
//     composer: "Debussy",
//     tempo_bpm: null,
//     beats_in_bar: null,
//     subdivision: null,
//     collection: null,
//     created_at: "2025-07-10T21:11:10.616878+00:00",
//     updated_at: "2025-07-10T21:11:10.616878+00:00",
//   },
//   {
//     id: "dafa4c83-aca1-4672-95a6-8394281a582f",
//     title: "Für Elise",
//     composer: "Beethoven",
//     tempo_bpm: null,
//     beats_in_bar: null,
//     subdivision: null,
//     collection: null,
//     created_at: "2025-07-10T21:11:10.616878+00:00",
//     updated_at: "2025-07-10T21:11:10.616878+00:00",
//   },
//   {
//     id: "907d9828-4759-45f4-8e51-aeefd88f4296",
//     title: "Invention no.8 in F Major",
//     composer: "Bach",
//     tempo_bpm: null,
//     beats_in_bar: null,
//     subdivision: null,
//     collection: null,
//     created_at: "2025-07-10T21:11:10.616878+00:00",
//     updated_at: "2025-07-10T21:11:10.616878+00:00",
//   },
//   {
//     id: "b5069c5b-8a2c-4d88-944b-198c43ebc26d",
//     title: "Waltz in B Minor",
//     composer: "Schubert",
//     tempo_bpm: null,
//     beats_in_bar: null,
//     subdivision: null,
//     collection: null,
//     created_at: "2025-07-10T21:11:10.616878+00:00",
//     updated_at: "2025-07-10T21:11:10.616878+00:00",
//   },
//   {
//     id: "19b2d9da-5035-4703-a360-4ad5a56754d8",
//     title: "Moonlight Sonata",
//     composer: "Beethoven",
//     tempo_bpm: null,
//     beats_in_bar: null,
//     subdivision: null,
//     collection: null,
//     created_at: "2025-07-10T21:11:10.616878+00:00",
//     updated_at: "2025-07-10T21:51:10.616878+00:00",
//   },
// ];

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
          unitData = data;
          console.log("Units for current user:", data);
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
