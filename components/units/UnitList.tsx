import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { List, ListItem, Button } from "@ui-kitten/components";

interface IListItem {
  title: string;
  composer: string;
}

// TODO - Run API query for retrieving live data, wrap in useEffect to mount on first load of screen.
// TODO - Add 'edit functionality'
// TODO - Make list item 'clickable' to show individual unit stats and comments

const data: IListItem[] = [
  { title: "Moonlight Sonata", composer: "Beethoven" },
  { title: "Nocturne Op. 9 No. 2", composer: "Chopin" },
  { title: "Clair de Lune", composer: "Debussy" },
  { title: "Für Elise", composer: "Beethoven" },
  { title: "Invention no.8 in F Major", composer: "Bach" },
  { title: "Waltz in B Minor", composer: "Schubert" },
];

export default function UnitList() {
  const [query, setQuery] = useState("");

  const filteredListData = query
    ? data.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.composer.toLowerCase().includes(query.toLowerCase())
      )
    : data;

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

      <List
        data={filteredListData}
        renderItem={renderListItem}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "#ccc" }} />
        )}
      />
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
