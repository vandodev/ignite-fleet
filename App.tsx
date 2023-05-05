import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { SignIn } from "./src/screens/SignIn";
import theme from "./src/theme";
import { Loading } from "./src/components/Loading";
import { Routes } from './src/routes';

import { AppProvider, UserProvider } from "@realm/react";
import { RealmProvider } from './src/libs/realm';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { REALM_APP_ID } from "@env";

import { ANDROID_CLIENT_ID } from "@env";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ backgroundColor: theme.COLORS.GRAY_800 }}>
          <StatusBar 
            barStyle="light-content" 
            backgroundColor="transparent" 
            translucent 
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
