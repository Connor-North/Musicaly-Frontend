
# 🎵 Musicaly

A musician’s practice companion — log your progress, sharpen your ears, and stay in time.

Musicaly is a React Native app designed for musicians who want to keep track of their practice sessions while using helpful tools like a built-in metronome, personal notes, and an ear training game. Whether you’re a beginner learning your first scales or a seasoned player tracking your sessions, Musicaly helps make your practice more intentional and more effective.

---

### ✨ Features

- 🎯 **Practice Logging**  
  Keep track of what you practiced and for how long, so you can build consistent habits and track improvement over time.

- 📝 **Practice Notes**  
  Write and save notes alongside your practice sessions — jot down goals, reminders, or anything you want to reflect on later.

- ⏱️ **Metronome**  
  Use the metronome to keep you on beat, enforcing good habits and developing your timing.

- 👂 **Ear Training Game**  
  Test and train your aural recognition with a simple quiz game that sharpens your ear.

---

### 🛠️ Tech Stack

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [UI Kitten](https://akveo.github.io/react-native-ui-kitten/) for styling and components
- `@react-native-community/slider` for smooth tempo control
- `expo-av` for audio playback
- [Supabase](https://supabase.com/) + PostgreSQL on the backend

---

### 🚀 Getting Started

To run the app locally:

```bash
git clone https://github.com/Connor-North/Musicaly-Frontend.git
cd Musicaly-Frontend
npm install
npx expo start
```

You can then run it in an iOS or Android simulator, or on a web browser if these are not available.

---

### 📂 Repository Structure

```bash
/components       # Reusable React Native components (e.g., Metronome)
/assets           # Audio assets (e.g., click sounds)
/screens          # App screens (e.g., Home, Practice Log, Ear Training)
```
