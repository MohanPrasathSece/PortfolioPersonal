import { useEffect } from "react";

type SEOOpts = {
  title?: string;
  description?: string;
  canonical?: string; // absolute URL
};

export function useSEO({ title, description, canonical }: SEOOpts) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    if (description) metaDesc.content = description;

    // canonical
    let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    const prevCanonical = linkCanonical.href;
    if (canonical) linkCanonical.href = canonical;

    return () => {
      if (title) document.title = prevTitle;
      if (description) metaDesc!.content = prevDesc;
      if (canonical) linkCanonical!.href = prevCanonical;
    };
  }, [title, description, canonical]);
}
