import { useEffect } from 'react';

const BASE_URL = 'https://abidfakhri.my.id';

/**
 * Update <title>, meta description, canonical, dan og:* tiap pindah halaman.
 *
 * Situs ini SPA — satu index.html dipakai untuk semua route, jadi tanpa ini
 * setiap halaman (termasuk yang Googlebot crawl) selalu punya canonical &
 * title yang identik (mengarah ke "/"). Akibatnya Google menganggap
 * /projects, /skills, /services sebagai duplikat homepage dan tidak
 * mengindeksnya sebagai halaman terpisah.
 *
 * title: teks lengkap <title> untuk halaman ini (bukan cuma nama halaman).
 */
export function usePageMeta({ title, description, path }) {
  useEffect(() => {
    const url = `${BASE_URL}${path}`;

    document.title = title;

    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);

    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    }
  }, [title, description, path]);
}
