
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatusBadge({ status }) {
  let color = "#808080";

  if (status === "Alive") {
    color = "#16a34a";
  } else if (status === "Dead") {
    color = "#dc2626";
  }

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
