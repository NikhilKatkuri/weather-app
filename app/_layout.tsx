import { TimeProvider } from "@/context/useTime";
import { WeatherProvider } from "@/context/useWeather";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as Splash from "expo-splash-screen";
import { useEffect } from "react";

Splash.hideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      Splash.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <TimeProvider>
        <WeatherProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="search/index"
              options={{ headerShown: false }}
            />
          </Stack>
        </WeatherProvider>
      </TimeProvider>
    </>
  );
}
