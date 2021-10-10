import { AppProps } from 'next/app';
import defaultTheme from "../config/mui-theme.config";
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head'
import {
  createMuiTheme as createTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import '../styles/globals.css'
import React from 'react';

const theme = responsiveFontSizes(createTheme({
  ...defaultTheme,
}));

const HeadDocument = () => (
  <Head>
    <title>Natserract. Thoughts and links about everything | Personal Blog</title>
    <link rel="shortcut icon" href="../../assets/img/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/static/vendors/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-dark.min.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"></script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-2GFPP6R1VS"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2GFPP6R1VS');   
        `
        }}
      />
  </Head>
)

function App({ Component, pageProps}: AppProps) {
  return (
    <React.Fragment>
      <HeadDocument />
      <ThemeProvider theme={theme}>
        <div suppressHydrationWarning style={{ position: 'relative' }}>
          {typeof window === 'undefined' ? null : <Component {...pageProps} />}
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
