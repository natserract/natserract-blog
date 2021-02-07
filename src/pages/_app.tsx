import { useEffect } from 'react'
import { AppProps } from 'next/app';
import defaultTheme from "../config/mui-theme.config";
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head'
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

const HeadDocument = () => (
  <Head>
    <title>Natserract. Thoughts and links about everything | Personal Blog</title>
    <link rel="shortcut icon" href="../../assets/img/favicon.ico" type="image/x-icon" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link rel="stylesheet" href="/static/vendors/font-awesome.min.css" />
    <link rel="stylesheet" href="/static/vendors/highlightjs/codepen-embed.css" />
    <script src="/static/vendors/highlightjs/highlight.pack.js" />
  </Head>
)

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadDocument />
      <ThemeProvider theme={theme()}>
        <div suppressHydrationWarning>
          {typeof window === 'undefined' ? null : <Component {...pageProps} />}
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
