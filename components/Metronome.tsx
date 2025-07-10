import React, { useState, useRef, useEffect } from “react”;
import { View, Button, StyleSheet, Text } from “react-native”;
import Slider from “@react-native-community/slider”;
import { Audio } from “expo-av”;
interface MetronomeProps {
  tempo?: number;
  beatsinbar?: number;
  subdivision?: number;
}
const Metronome: React.FC<MetronomeProps> = ({
  tempo = 80,
  beatsinbar = 4,
  subdivision = 0,
}) => {
  const [bpm, setBpm] = useState(tempo);
  const [isPlaying, setIsPlaying] = useState(false);
  const clickSound = useRef<Audio.Sound | null>(null);
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require(“../assets/sounds/Perc_Castanet_lo.wav”)
      );
      clickSound.current = sound;
    };
    loadSound();
    return () => {
      clickSound.current?.unloadAsync();
    };
  }, []);
  const playClick = async () => {
    if (clickSound.current) {
      await clickSound.current.replayAsync();
    }
  };
  const startMetronome = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    playClick();
    const interval = 60000 / bpm;
    intervalRef.current = setInterval(playClick, interval) as unknown as number;
  };
  const stopMetronome = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
  };
  const toggleMetronome = () => {
    isPlaying ? stopMetronome() : startMetronome();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>BPM: {bpm}</Text>
      <Slider
        style={{ width: 250 }}
        minimumValue={40}
        maximumValue={240}
        value={bpm}
        onValueChange={(value) => {
          setBpm(Math.round(value));
          if (isPlaying) {
            stopMetronome();
            startMetronome();
          }
        }}
      />
      <Button title={isPlaying ? “Stop” : “Start”} onPress={toggleMetronome} />
    </View>
  );
};
export default Metronome;
const styles = StyleSheet.create({
  container: {
    alignItems: “center”,
    gap: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});