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
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />

    <link rel="stylesheet" href="/static/vendors/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-dark.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
    <link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600&display=swap" rel="stylesheet" /> 
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

function App({ Component, pageProps }: AppProps) {
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
