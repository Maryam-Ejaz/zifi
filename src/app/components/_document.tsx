// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Other head elements */}
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* Add the SpeedChecker script here */}
        <Script
          id="speedchecker-api"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var sc_api_mode='1';
              var sc_script = document.createElement("script");
              sc_script.setAttribute("src", ("https:" == document.location.protocol ? "https" : "http") + "://www.speedcheckercdn.com/speedchecker.api.js");
              sc_script.addEventListener("load", function () {
                window.SCAPI.init();
              });
              document.body.appendChild(sc_script);
            `,
          }}
        />
      </body>
    </Html>
  );
}
