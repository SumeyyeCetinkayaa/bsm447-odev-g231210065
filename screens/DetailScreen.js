
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import StatusBadge from "../components/StatusBadge";
import { useSaved } from "../context/SavedContext";

export default function DetailScreen({ route }) {
  const { character } = route.params;

  const { toggleSaved, isSaved, isReady } = useSaved();

  const saved = isSaved(character.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: character.image }}
        style={styles.image}
      />

      <Text style={styles.name}>{character.name}</Text>

      <StatusBadge status={character.status} />

      <View style={styles.infoContainer}>
        <Text style={styles.info}>
          Tür: {character.species}
        </Text>

        <Text style={styles.info}>
          Cinsiyet: {character.gender}
        </Text>

        <Text style={styles.info}>
          Köken: {character.origin.name}
        </Text>

        <Text style={styles.info}>
          Konum: {character.location.name}
        </Text>

        <Text style={styles.info}>
          Bölüm sayısı: {character.episode.length}
        </Text>
      </View>

      <TouchableOpacity
        disabled={!isReady}
        style={[
          styles.button,
          saved && styles.removeButton,
          !isReady && { opacity: 0.5 },
        ]}
        onPress={() => toggleSaved(character)}
      >
        <Text style={styles.buttonText}>
          {saved ? "Kaydedilenlerden çıkar" : "Kaydet"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    flexGrow: 1,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 15,
    marginBottom: 15,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 10,
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "#dc2626",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
