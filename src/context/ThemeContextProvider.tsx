/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { createTheme, PaletteMode, Theme } from "@mui/material";
import { cyan, teal, grey } from "@mui/material/colors";

type ThemeContextType = {
  mode: string;
  toggleColorMode: () => void;
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleColorMode: () => {},
  theme: createTheme(),
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const modifiedTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: cyan,
          secondary: teal,
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
          background: {
            paper: grey[200],
          },
        }
      : {
          // palette values for dark mode
          primary: cyan,
          secondary: teal,
          background: {
            paper: grey[800],
          },
        }),
  },
});
