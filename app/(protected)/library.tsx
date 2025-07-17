import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Modal, View, TextInput } from "react-native";
import UnitList from "@/components/units/UnitList";
import { useState } from "react";
import { Card, Text, List, ListItem } from "@ui-kitten/components";
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

interface IPracticeData {
  unitNotes: [string, string];
  totalPracticeTime: number | null;
  lastPlayed: string;
}

export default function Library() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IListItem[] | null>(null);
  const [isPracticeData, setIsPracticeData] = useState<IPracticeData[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  async function listUnitDetails(item) {
    setIsPracticeData(false);
    setSelectedItem(item);
    console.log(item);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("practice_sessions_units")
        .select(`duration, unit_comment, ended_at`)
        .eq("unit_id", item.id)
        .order("ended_at", { ascending: false });

      if (error) {
        console.error("Error inserting unit:", error.message);
        // TODO - deal with error handling
        return;
      }

      if (data.length > 0) {
        let duration = 0;
        let notes = [];
        const practiceData = data.map((session) => {
          const date = new Date(session.ended_at);
          const readableDate = date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          notes.push([readableDate, session.unit_comment]);
          duration += session.duration;
        });

        const today = new Date();
        const last = new Date(data[0].ended_at);
        const dayDifference = today - last;
        const days = Math.floor(dayDifference / (1000 * 60 * 60 * 24));
        console.log(days);
        let lastDate = "";
        if (days === 0) {
          lastDate = "Today!";
        } else {
          lastDate = `${days} ago`;
        }

        setIsPracticeData({
          unitNotes: notes,
          totalPracticeTime: duration,
          lastPlayed: lastDate,
        });
        setModalVisible(true);
      } else {
        console.log();
      }
    } catch (error) {
      console.error("Error inserting unit:", error);
    }

    // setModalVisible(true);
  }

  console.log(isPracticeData);
  const [remountKey, setRemountKey] = useState<number>(0);

  function triggerRemount() {
    setRemountKey((prev) => prev + 1);
  }

  const renderListItem = ({
    item,
  }: {
    item: IPracticeData;
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={item[1]}
      description={item[0]}
      // accessoryRight={
      //   <Button size="small" onPress={() => onButtonPress(item)}>
      //     {buttonText}
      //   </Button>
      //  }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "90%" }}>
        <UnitList
          remountKey={remountKey}
          buttonText="Edit"
          onButtonPress={(item) => {
            listUnitDetails(item);
          }}
        />
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.mainView}>
          {selectedItem ? (
            <Card>
              <Text category="h4">{selectedItem.title}</Text>
              <Text category="h6">{selectedItem.composer}</Text>
            </Card>
          ) : null}
          {loading && <Text>Just getting your data</Text>}
          {!loading && isPracticeData ? (
            <Card>
              <Text category="s1">
                Total play time: {isPracticeData.totalPracticeTime} minutes!
              </Text>
              <Text category="s1">
                Last played: {isPracticeData.lastPlayed}
              </Text>
              <View>
                <Text>Comments:</Text>
                <List
                  data={isPracticeData.unitNotes}
                  renderItem={renderListItem}
                  ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: "#ccc" }} />
                  )}
                />
              </View>
            </Card>
          ) : (
            <Text>There is no practice data yet ...</Text>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  mainView: {
    justifyContent: "center",
    flex: 1,
  },
  input: {
    height: 10,
    borderWidth: 3,
  },
  inputTextStyle: {
    minHeight: 100,
  },
});
