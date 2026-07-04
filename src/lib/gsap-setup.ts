import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let done = false;
export function ensureGsap() {
  if (done) return;
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  done = true;
}
