import { StyleSheet } from "react-native";
const appStyle = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 30, textAlign: "center", padding: 20 },
  body: {
    flex: 6,
  },
  footer: { flex: 1, justifyContent: "center", alignItems: "center" },
  btn: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  btnTxt: { color: "white" },
  image: {
    height: 300,
    marginVertical: 20,
    borderRadius: 50,
    marginHorizontal: 20,
  },
});
export default appStyle;
