import lightningcss from "lume/plugins/lightningcss.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import purgecss from "lume/plugins/purgecss.ts";
import checkUrls from "lume/plugins/check_urls.ts";
import basePath from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import { Options as SitemapOptions, sitemap } from "lume/plugins/sitemap.ts";
import { favicon, Options as FaviconOptions } from "lume/plugins/favicon.ts";
import { merge } from "lume/core/utils/object.ts";

import "lume/types.ts";

export interface Options {
  sitemap?: Partial<SitemapOptions>;
  favicon?: Partial<FaviconOptions>;
}

export const defaults: Options = {
  favicon: {
    input: "uploads/favicon.svg",
  },
};

/** Configure the site */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site
      .use(lightningcss())
      .use(minifyHTML())
      .use(purgecss())
      .use(checkUrls())
      .use(basePath())
      .use(metas())
      .use(sitemap(options.sitemap))
      .use(favicon(options.favicon))
      .add("uploads")
      .add("style.css");
  };
}
