import { createFileRoute } from "@tanstack/react-router";
import { AuroraExperience } from "@/components/AuroraExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurora — Cinematic Herbal Beauty" },
      {
        name: "description",
        content:
          "Aurora is a slow-crafted herbal skincare ritual — wild botanicals, cold-pressed oils, and cinematic craft, distilled under golden hour.",
      },
      { property: "og:title", content: "Aurora — Cinematic Herbal Beauty" },
      {
        property: "og:description",
        content:
          "A cinematic journey through wild botanicals, hand-crafted herbal skincare and the Aurora ritual.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <AuroraExperience />;
}
