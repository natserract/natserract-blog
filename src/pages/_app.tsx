import { AppProps } from 'next/app';
import defaultTheme from "../config/mui-theme.config";
import { ThemeProvider } from '@material-ui/core/styles';
import {
  createMuiTheme as createTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import '../styles/globals.css'

function theme() {
  const muitheme = createTheme({
    ...defaultTheme,
  });

  return responsiveFontSizes(muitheme);
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme()}>
      <div suppressHydrationWarning>
        {typeof window === 'undefined' ? null : <Component {...pageProps} />}
      </div>
    </ThemeProvider>
  )
}

export default App
