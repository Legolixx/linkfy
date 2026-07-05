"use client";

import { Check, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { DashboardMockup } from "@/components/dashboard-mockup";
import Link from "next/link";

const trust = [
  "No credit card required",
  "Custom themes",
  "Analytics included",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden ">
      {/* Background layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid mask-radial-fade" />
        <div className="absolute -top-24 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-brand-accent/15 blur-[120px]" />
        <div className="absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-brand/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left */}
        <div className="max-w-xl">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="show"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="size-3.5 text-brand" />
              New
              <span className="text-border">•</span>
              Completely free to start
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Your entire online presence.{" "}
            <span className="text-gradient">One beautiful link.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            Create your own beautiful bio page in seconds. Share all your social
            networks, websites, products and content from one modern,
            customizable link.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="h-12 rounded-xl bg-gradient-to-r from-brand to-brand-accent px-6 text-base text-brand-foreground shadow-lg shadow-brand/25 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
              >
                Get Started Free
                <ArrowRight />
              </Button>
            </Link>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
          >
            {trust.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="flex size-4 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right */}
        <div className="relative lg:pl-6">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
