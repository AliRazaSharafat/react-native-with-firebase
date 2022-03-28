// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  View,
  FlatList,
  LogBox,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import {
  collection,
  deleteDoc,
  getDoc,
  doc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./config";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    session: "",
    rollNo: "",
  });

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDocs(usersCollectionRef);
      setUsers(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    const fetchedUser = doc(db, "users", id);
    await deleteDoc(fetchedUser);
  };

  const submitHandler = async () => {
    try {
      await addDoc(usersCollectionRef, user);
      setUser({ ...user, name: "", rollNo: "", session: "" });
    } catch (error) {}
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => deleteHandler(item.id)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.rollNo}</Text>
        <Text style={styles.title}>{item.session}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    // <View>
    //   <Text>Firebase CRUD</Text>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Text style={styles.heading}>Add User</Text>
      <View style={styles.text}>
        <TextInput
          value={user.name}
          placeholder="name"
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
      </View>
      <View style={styles.text}>
        <TextInput
          value={user.rollNo}
          placeholder="rollNo"
          onChangeText={(text) => setUser({ ...user, rollNo: text })}
        />
      </View>
      <View style={styles.text}>
        <TextInput
          value={user.session}
          placeholder="session"
          onChangeText={(text) => setUser({ ...user, session: text })}
        />
      </View>
      <View style={styles.text}>
        <Button title="Submit" onPress={submitHandler} />
      </View>
      <Text style={styles.heading}>Update User</Text>
    </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  text: {
    marginVertical: 5,
    marginHorizontal: 16,
    padding: 10,
    fontSize: 20,
  },
  heading: {
    marginVertical: 3,
    marginHorizontal: 16,
    padding: 10,
    fontSize: 25,
  },
});
