import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const UserProfileScreen = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, []);

  const handleSaveProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      });

      setIsEditing(false);
      setError("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Failed to sign out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <Image
        source={{
          uri:
            photoURL ||
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.label}>Display Name:</Text>
      <TextInput
        style={styles.input}
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
        editable={isEditing}
      />
      {isEditing ? (
        <>
          <Text style={styles.label}>Photo URL:</Text>
          <TextInput
            style={styles.input}
            value={photoURL}
            onChangeText={(text) => setPhotoURL(text)}
          />
        </>
      ) : null}
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#B2B2B2" : "#007BFF" },
        ]}
        onPress={isEditing ? handleSaveProfile : () => setIsEditing(true)}
      >
        <Text style={styles.buttonText}>
          {isEditing ? "Save" : "Edit Profile"}
        </Text>
      </Pressable>
      {!isEditing && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { marginTop: 16 },
            { backgroundColor: pressed ? "#B2B2B2" : "#FF0000" },
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      )}
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
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
  error: {
    color: "red",
    marginBottom: 16,
  },
});

export default UserProfileScreen;
