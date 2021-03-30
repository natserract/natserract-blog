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

const theme = responsiveFontSizes(createTheme({
  ...defaultTheme,
}));

const HeadDocument = () => (
  <Head>
    <title>Natserract. Thoughts and links about everything | Personal Blog</title>
    <link rel="shortcut icon" href="../../assets/img/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/static/vendors/font-awesome.min.css" />
    <link rel="stylesheet" href="/static/vendors/highlightjs/codepen-embed.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@200;600&display=swap" rel="stylesheet" />
    <script src="/static/vendors/highlightjs/highlight.pack.js" />

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
    <>
      <HeadDocument />
      <ThemeProvider theme={theme}>
        <div suppressHydrationWarning>
          {typeof window === 'undefined' ? null : <Component {...pageProps} />}
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
