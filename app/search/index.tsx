import Background from "@/components/background";
import { widthPercentage } from "@/utils/useDimension";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() { 
  
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={"#ffffff00"} />
      <Background />
      <SafeAreaView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" ,width:widthPercentage(1),height:widthPercentage(1)}}>
          <Text style={{ color: "white", fontSize: 24 }}>HI</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
