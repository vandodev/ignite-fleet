import { ThemeProvider } from "styled-components/native";
import { SignIn } from "./src/screens/SignIn";
import theme from "./src/theme";

import { Loading } from "./src/components/Loading";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  );
}
