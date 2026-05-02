"use client";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

const theme = createTheme(); // customize here if needed

export default function ThemeRegistry({ children }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui" });
    // console.log(cache)
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}


// https://www.bing.com/search?q=Next.js%20Theme%20Registry&qs=n&form=QBRE&sp=-1&lq=0&pq=next.j%20theme%20registry&sc=7-21&sk=&cvid=0BDDD4913D36416293A21A4DAC79645E
// https://nextjs.org/docs/app/guides/css-in-js
// https://github.com/emotion-js/emotion/blob/main/packages/cache/src/index.ts
// https://nextjs.org/docs/app/guides/lazy-loading#nextdynamic
// https://emotion.sh/docs/@emotion/cache#primary-use-cases
// https://generalistprogrammer.com/tutorials/emotion-cache-npm-package-guide
// https://deepwiki.com/emotion-js/emotion/6.4-@emotioncache
// https://stackoverflow.com/questions/69980394/emotion-cache-on-ssr-with-material-ui-is-always-empty
// https://www.bing.com/search?q=emotion%20cache.compat%20%3D%20true&qs=n&form=QBRE&sp=-1&ghc=1&lq=0&pq=emotion%20cache.compat%20%3D%20true&sc=12-27&sk=&cvid=6440FDD2890D4BBE8FE4D8E41E87CD92

// In Emotion (CSS-in-JS library), the cache.compat = true setting is used to enable compatibility mode for Emotion’s style cache.
// This is typically needed when you are migrating from Emotion v10 to v11 or when you are using Emotion with libraries that still expect the old class name merging behavior (like some older versions of Material-UI v4).

// What it does

// By default, Emotion v11 changed how class names are merged and deduplicated.
// Setting cache.compat = true restores the v10-style class name merging.
// This is important for libraries that rely on the old behavior to avoid style overrides breaking.


// Example Usage
// Here’s how you can enable it:
// Javascriptimport createCache from '@emotion/cache';

// // Create a custom Emotion cache
// const cache = createCache({
//   key: 'css', // Prefix for generated class names
// });

// // Enable compatibility mode
// cache.compat = true;

// export default cache;

// If you’re using it with Material-UI v4:
// Javascriptimport { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';
// import { ThemeProvider } from '@material-ui/core/styles';
// import theme from './theme';

// const cache = createCache({ key: 'css' });
// cache.compat = true;

// function App() {
//   return (
//     <CacheProvider value={cache}>
//       <ThemeProvider theme={theme}>
//         {/* Your app components */}
//       </ThemeProvider>
//     </CacheProvider>
//   );
// }

// export default App;


// When to Use
// ✅ Use cache.compat = true if:

// You are migrating from Emotion v10 to v11.
// You are using Material-UI v4 or other libraries that depend on Emotion v10’s merging behavior.

// ❌ You don’t need it if:

// You are starting fresh with Emotion v11+ and not using legacy libraries.


// If you want, I can give you a full migration-safe setup for Emotion + Material-UI so you won’t run into style conflicts.
// Do you want me to prepare that?
