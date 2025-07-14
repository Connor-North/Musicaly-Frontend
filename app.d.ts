import { useRouter } from "expo-router";

declare module "expo-router" {
  interface RouteParams {
    "screens/sessions/PracticeSession": {
      title: string;
      id: string;
      composer: string;
    };
    // Add other routes here as needed
  }
}
