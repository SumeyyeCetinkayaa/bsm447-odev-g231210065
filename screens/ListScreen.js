
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
        <ActivityIndicator size="large" />
        <Text>Karakterler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Karakter ara..."
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
    backgroundColor: "#f1f5f9",
    padding: 12,
  },
  search: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fee2e2",
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
  },
});
