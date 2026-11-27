
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";

import { COLORS } from "../theme/colors";
import CharacterCard from "../components/CharacterCard";
import { fetchCharacters, API_URL } from "../services/api";

export default function ListScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [nextPage, setNextPage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const requestInProgress = useRef(false);

  async function loadCharacters() {
    if (requestInProgress.current) return;

    requestInProgress.current = true;

    try {
      setError("");

      const data = await fetchCharacters(API_URL);

      setCharacters(data.results);
      setNextPage(data.info.next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
      requestInProgress.current = false;
    }
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadMore() {
    if (!nextPage || requestInProgress.current || search.trim()) {
      return;
    }

    requestInProgress.current = true;
    setLoadingMore(true);

    try {
      const data = await fetchCharacters(nextPage);

      setCharacters((previous) => [
        ...previous,
        ...data.results.filter(
          (item) => !previous.some((old) => old.id === item.id)
        ),
      ]);

      setNextPage(data.info.next);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
      requestInProgress.current = false;
    }
  }

  function handleRefresh() {
    if (requestInProgress.current) return;

    setRefreshing(true);
    loadCharacters();
  }

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  if (loading) {
  return (
    <View style={styles.center}>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
      />
      <Text style={styles.loadingText}>
        Karakterler yükleniyor...
      </Text>
    </View>
  );
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
  <Text style={styles.subtitle}>RICK & MORTY</Text>

  <Text style={styles.title}>Dead Archive</Text>

  <Text style={styles.description}>
    Ölmüş karakterler arşivi
  </Text>
</View>
      <TextInput
  style={styles.search}
  placeholder="Karakter ara..."
  placeholderTextColor={COLORS.textSecondary}
  value={search}
  onChangeText={setSearch}
/>

      {error !== "" && (
        <View style={styles.error}>
          <Text>{error}</Text>
          <Button title="Tekrar dene" onPress={handleRefresh} />
        </View>
      )}

      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() =>
              navigation.navigate("Detail", { character: item })
            }
          />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" /> : null
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Karakter bulunamadı.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  header: {
    marginBottom: 20,
    marginTop: 8,
  },

  subtitle: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 3,
    marginBottom: 6,
  },

  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "bold",
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },

  search: {
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    fontSize: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  error: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#FEE2E2",
    borderRadius: 10,
  },

  empty: {
    textAlign: "center",
    marginTop: 30,
    color: COLORS.textSecondary,
    fontSize: 15,
  },

  loadingText: {
    color: COLORS.textSecondary,
    marginTop: 12,
  },
});
