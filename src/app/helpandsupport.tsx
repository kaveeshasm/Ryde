import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Item = {
  id: number;
  question: string;
  answer: string;
};

const List: Item[] = [
  {
    id: 1,
    question: "How can I change my account information?",
    answer: "Go to Account → Edit Profile to update your personal details.",
  },
  {
    id: 2,
    question: "How can I delete my account?",
    answer:
      "Go to Account → Settings → Delete Account and follow the confirmation steps. Please make sure you understand that account deletion may be permanent.",
  },
];

export default function HelpAndSupport() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Help and Support",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <EvilIcons name="arrow-left" size={40} color="black" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "300",
            color: "black",
          },
        }}
      />

      {List.map((item) => {
        const isOpen = openId === item.id;

        return (
          <View key={item.id} style={styles.item}>
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggle(item.id)}
            >
              <Text style={styles.question}>{item.question}</Text>
              <MaterialIcons
                name={isOpen ? "remove" : "add"}
                size={24}
                color="black"
              />
            </TouchableOpacity>

            {isOpen && <Text style={styles.answer}>{item.answer}</Text>}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    paddingRight: 10,
  },
  answer: {
    fontSize: 15,
    color: "#555",
    paddingBottom: 16,
    lineHeight: 22,
  },
});