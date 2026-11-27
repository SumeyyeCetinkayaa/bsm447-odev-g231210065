
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function StatusBadge({ status }) {
  let color = COLORS.unknown;

  if (status === "Alive") {
    color = COLORS.alive;
  } else if (status === "Dead") {
    color = COLORS.dead;
  }

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color + "20" },
      ]}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: color },
        ]}
      />

      <Text style={[styles.text, { color: color }]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
