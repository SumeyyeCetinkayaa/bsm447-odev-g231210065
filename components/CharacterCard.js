
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import StatusBadge from "./StatusBadge";

export default function CharacterCard({ character, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: character.image }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <StatusBadge status={character.status} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
  },
});
