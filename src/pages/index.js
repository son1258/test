import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const whitelabelUrl = "https://pvi-uat.vifo.vn";
    const iframeHTML = `<iframe id="vifo_whitelabel_iframe" src="${whitelabelUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    
    // Insert iframe into container
    document.getElementById("vifo-whitelabel").innerHTML = iframeHTML;

    // Set up postMessage event listener
    window.addEventListener("message", (event) => {
      if (event.origin !== whitelabelUrl) {
        console.warn("Message from unknown origin:", event.origin);
        return;
      }
      console.log("Message from iframe:", event.data);
    });

    // Dynamically set --vh custom property to handle viewport height correctly
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial --vh value and listen to window resize to update it
    setVh();
    window.addEventListener("resize", setVh);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Webview Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden; /* Prevent body scrolling if iframe is full screen */
          }
          #vifo-whitelabel {
            width: 100vw;
            height: 100vh;
            position: relative;
          }
          #vifo-whitelabel iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: calc(var(--vh, 1vh) * 100); /* Use --vh custom property */
            border: none;
          }
        `}</style>
      </Head>
      <div id="vifo-whitelabel"></div>
    </>
  );
}
