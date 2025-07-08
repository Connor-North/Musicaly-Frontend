import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../supabase/auth-helper";
// import { Button, Input } from "@ui-kitten/components";
import { Button, TextInput, Text } from "react-native";
import { signupStudent } from "../supabase/signupStudent";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showCreate, setShowCreate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function signUpLayout() {
    setShowCreate(false);
  }

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  // const handleSignup = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const result = await signupStudent(email, password);
  //     if (result.success) {
  //       // onSignupSuccess(result.user); Route to home page
  //     } else {
  //       setError(result.error);
  //     }
  //   } catch (err) {
  //     setError("An unexpected error occurred");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text>Musically</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        {!showCreate ? (
          <TextInput
            label="Name"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Joe Bloggs"
            autoCapitalize={"none"}
          />
        ) : null}
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Signing in..." : "Sign In"}
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        {showCreate ? (
          <Button
            title={"Create Account"}
            disabled={loading}
            onPress={() => signUpLayout()}
          />
        ) : null}
      </View>
      <View style={styles.verticallySpaced}>
        {!showCreate ? (
          <Button
            title={loading ? "Signing up..." : "Sign Up"}
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
