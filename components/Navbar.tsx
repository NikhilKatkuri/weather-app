import { widthPercentage } from "@/utils/useDimension";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

const Navbar = () => {
  return (
    <View
      style={{
        height: 42,
        width: widthPercentage(1),
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        //    borderRadius: 6,
        //    backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          color: "#fffff299",
          width: "100%",
          fontSize: 19,
          fontWeight: 900,
          fontFamily: "Inter",
        }}
      >
        Weather-app
      </Text>
      <View>
        <TouchableWithoutFeedback>
          <Text
            style={{
              color: "#fffff299",
              width: "100%",
              fontSize: 19,
              fontWeight: 900,
              fontFamily: "Inter",
            }}
          >
            S
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Navbar;
