import type { MetadataRoute } from "next";
import { COURSES } from "@/data/courses";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/courses",
    "/faculty",
    "/about",
    "/accreditation",
    "/facility",
    "/careers",
    "/apply",
    "/contact",
    "/faq",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/courses" || p === "/apply" ? 0.9 : 0.7,
  }));

  const courseEntries: MetadataRoute.Sitemap = COURSES.map((c) => ({
    url: `${SITE.url}/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...courseEntries];
}
