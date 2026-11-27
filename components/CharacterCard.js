
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import StatusBadge from "./StatusBadge";
import { COLORS } from "../theme/colors";

export default function CharacterCard({ character, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: character.image }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name}>
          {character.name}
        </Text>

        <StatusBadge status={character.status} />
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 12,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  arrow: {
    fontSize: 30,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
});
