import { TimeProvider } from "@/context/useTime";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as Splash from "expo-splash-screen";
import { useEffect } from "react";

Splash.hideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
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
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </TimeProvider>
    </>
  );
}
