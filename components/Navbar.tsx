import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";

const Navbar = () => {
  const router = useRouter();
  return (
    <View
      style={{
        height: 42,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", 
        //    borderRadius: 6,
        //    backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          color: "#fff",
          width: "100%",
          fontSize: 19,
          fontWeight: 900,
          fontFamily: "Inter",
        }}
      >
        Weather-app
      </Text>
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("search");
            router.push("/search");
          }}
        >
          <Image
            source={require("../assets/images/search.png")}
            style={{ height: 28, width: 28 }}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Navbar;
