import React, { useCallback } from "react";
import {
  Button,
  Icon,
  IconElement,
  List,
  ListItem,
  Text,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

interface IListItem {
  title: string;
  composer: string;
}

const data = [
  {
    id: "19b2d9da-5035-4703-a360-4ad5a56754d8",
    title: "Moonlight Sonata",
    composer: "Beethoven",
    tempo_bpm: null,
    beats_in_bar: null,
    subdivision: null,
    collection: null,
    created_at: "2025-07-10T21:11:10.616878+00:00",
    updated_at: "2025-07-10T21:11:10.616878+00:00",
  },
  {
    id: "b111895c-4aab-4055-96e9-d95458b00f50",
    title: "Nocturne Op. 9 No. 2",
    composer: "Chopin",
    tempo_bpm: null,
    beats_in_bar: null,
    subdivision: null,
    collection: null,
    created_at: "2025-07-10T21:11:10.616878+00:00",
    updated_at: "2025-07-10T21:11:10.616878+00:00",
  },
  {
    id: "6596da09-a4ff-49e1-ae56-e64f40f25a1f",
    title: "Clair de Lune",
    composer: "Debussy",
    tempo_bpm: null,
    beats_in_bar: null,
    subdivision: null,
    collection: null,
    created_at: "2025-07-10T21:11:10.616878+00:00",
    updated_at: "2025-07-10T21:11:10.616878+00:00",
  },
  {
    id: "dafa4c83-aca1-4672-95a6-8394281a582f",
    title: "Für Elise",
    composer: "Beethoven",
    tempo_bpm: null,
    beats_in_bar: null,
    subdivision: null,
    collection: null,
    created_at: "2025-07-10T21:11:10.616878+00:00",
    updated_at: "2025-07-10T21:11:10.616878+00:00",
  },
  {
    id: "907d9828-4759-45f4-8e51-aeefd88f4296",
    title: "Invention no.8 in F Major",
    composer: "Bach",
    tempo_bpm: null,
    beats_in_bar: null,
    subdivision: null,
    collection: null,
    created_at: "2025-07-10T21:11:10.616878+00:00",
    updated_at: "2025-07-10T21:11:10.616878+00:00",
  },
  {
    id: "b5069c5b-8a2c-4d88-944b-198c43ebc26d",
    title: "Waltz in B Minor",
    composer: "Schubert",
    tempo_bpm: null,
    beats_in_bar: null,
    subdivision: null,
    collection: null,
    created_at: "2025-07-10T21:11:10.616878+00:00",
    updated_at: "2025-07-10T21:11:10.616878+00:00",
  },
];

export default function UnitList() {
  const renderItemAccessory = (): React.ReactElement => (
    <Button size="tiny">Edit</Button>
  );

  const renderItemIcon = (props: any): IconElement => (
    <Icon {...props} name="music-outline" />
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={`${item.title}`}
      description={`${item.composer}`}
      // accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <List
      style={styles.container}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "#ccc" }} />
      )}
      ListHeaderComponent={() => (
        <Text style={styles.title}>🎵 Your pieces</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // maxHeight: 192,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
    textDecorationLine: "none",
    marginBottom: 20,
  },
});
