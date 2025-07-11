import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import { List, ListItem, Button } from "@ui-kitten/components";

interface IListItem {
  title: string;
  composer: string;
  updated_at: string;
}

// TODO - Run API query for retrieving live data, wrap in useEffect to mount on first load of screen.
// TODO - Add 'edit functionality'
// TODO - Make list item 'clickable' to show individual unit stats and comments

const data: IListItem[] = [
  {
    title: "Moonlight Sonata",
    composer: "Beethoven",
    updated_at: "2025-07-10T21:11:10.616878+00:00",
  },
  {
    title: "Nocturne Op. 9 No. 2",
    composer: "Chopin",
    updated_at: "2025-07-10T21:45:10.616878+00:00",
  },
  {
    title: "Clair de Lune",
    composer: "Debussy",
    updated_at: "2025-07-10T21:40:10.616878+00:00",
  },
  {
    title: "Für Elise",
    composer: "Beethoven",
    updated_at: "2025-07-10T21:30:10.616878+00:00",
  },
  {
    title: "Invention no.8 in F Major",
    composer: "Bach",
    updated_at: "2025-07-10T21:20:10.616878+00:00",
  },
  {
    title: "Waltz in B Minor",
    composer: "Schubert",
    updated_at: "2025-07-10T21:10:10.616878+00:00",
  },
];

export default function UnitList() {
  const [query, setQuery] = useState("");
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const filteredListData = (
    query
      ? data.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.composer.toLowerCase().includes(query.toLowerCase())
        )
      : data
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
      accessoryRight={<Button size="tiny">Edit</Button>}
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
          styles.fixedView,
          { height: screenHeight * 0.5, width: screenWidth * 0.9 },
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
  fixedView: {
    maxHeight: 250,
    maxWidth: 250,
  },
});
