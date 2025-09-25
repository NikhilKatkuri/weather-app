import Background from "@/components/background";
import { widthPercentage } from "@/utils/useDimension";
import React from "react";
import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  return (
    <View style={{ flex: 1, alignItems: "flex-start" }}>
      <StatusBar barStyle="light-content" backgroundColor={"#ffffff00"} />
      <Background />
      <SafeAreaView>
        <View style={{ flex: 1, alignItems: "flex-start", padding: 16 }}>
          <View style={{ width: "100%", alignItems: "flex-start" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "400",
                fontFamily: "poppinsMedium",
                color: "#fff",
              }}
            >
              Search
            </Text>
          </View>
          <View style={{ height: 16 }} />
          <View
            style={{
              width: widthPercentage(1) - 32,
              alignItems: "center",
              height: 48,
              backgroundColor: "rgb(248 250 252 )",
              borderRadius: 8,
              paddingHorizontal: 4,
              paddingLeft: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Search"
              style={{ flex: 1, color: "rgb(71 85 105)" }}
            />
            <View
              style={{
                backgroundColor: "rgb(241 245 249 )",
                borderRadius: 8,
                marginLeft: 8,
                padding: 8,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}
            >
              <TouchableOpacity>
                <View>
                  <Image
                    source={require("../../assets/images/search.png")}
                    style={{
                      height: 24,
                      width: 24,
                      tintColor: "#000",
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 16 }} />
        </View>
      </SafeAreaView>
    </View>
  );
}
