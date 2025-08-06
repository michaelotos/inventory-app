import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const auth = getAuth();

const MainScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const profileNavigation = useNavigation();

  const handleProfileNavigation = () => {
    profileNavigation.navigate("UserProfile");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Main Screen</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#B2B2B2" : "#28a745" },
        ]}
        onPress={handleProfileNavigation}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { marginTop: 16 },
          { backgroundColor: pressed ? "#B2B2B2" : "#007BFF" },
        ]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default MainScreen;
