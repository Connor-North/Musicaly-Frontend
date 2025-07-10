import { View } from "react-native";
import Auth from "../components/Auth";
import PracticeHeatmap from "@/components/PraticeHeatmap";

export default function SignInScreen() {
  return (
    <View>
      <Auth />
      <PracticeHeatmap />
    </View>
  );
}
