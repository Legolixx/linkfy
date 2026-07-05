'use client'

import * as React from 'react'
import {
  ArrowUpRight,
  BadgeCheck,
  MousePointerClick,
  Palette,
  TrendingUp,
} from 'lucide-react'
import { motion } from 'motion/react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  GithubIcon,
  InstagramIcon,
  SpotifyIcon,
  YoutubeIcon,
} from '@/components/brand-icons'

type LinkItem = {
  label: string
  meta: string
  icon: React.ReactNode
  tint: string
}

const links: LinkItem[] = [
  {
    label: 'Latest single — "Neon Skyline"',
    meta: 'Spotify',
    icon: <SpotifyIcon className="size-4" />,
    tint: 'text-chart-5',
  },
  {
    label: 'How I built my studio',
    meta: 'YouTube',
    icon: <YoutubeIcon className="size-4" />,
    tint: 'text-destructive',
  },
  {
    label: 'Behind the scenes',
    meta: 'Instagram',
    icon: <InstagramIcon className="size-4" />,
    tint: 'text-chart-1',
  },
  {
    label: 'Open source projects',
    meta: 'GitHub',
    icon: <GithubIcon className="size-4" />,
    tint: 'text-foreground',
  },
]

const bars = [38, 52, 46, 68, 60, 82, 74, 96]

function ClicksChart() {
  return (
    <div className="flex h-20 items-end gap-1.5" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.06, ease: 'easeOut' }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-brand/40 to-brand"
        />
      ))}
    </div>
  )
}

function LinkRow({ item }: { item: LinkItem }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 p-2.5 transition-colors hover:border-brand/40 hover:bg-muted/60">
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted ${item.tint}`}
      >
        {item.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">
          {item.label}
        </p>
        <p className="text-[10px] text-muted-foreground">{item.meta}</p>
      </div>
      <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
    </div>
  )
}

function PhonePreview() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 40, rotate: -6 }}
      animate={{ opacity: 1, y: 0, rotate: -6 }}
      transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      className="absolute -bottom-10 -left-6 hidden w-40 sm:block lg:-left-12 lg:w-44"
    >
      <div className="animate-[float-slow_6s_ease-in-out_infinite] rounded-[2rem] border border-border bg-card p-2 shadow-2xl shadow-brand/10">
        <div className="overflow-hidden rounded-[1.6rem] border border-border/60 bg-gradient-to-b from-brand/10 to-background p-4">
          <div className="flex flex-col items-center text-center">
            <Avatar size="lg" className="ring-2 ring-brand/30">
              <AvatarFallback className="bg-brand/15 font-semibold text-brand">
                JD
              </AvatarFallback>
            </Avatar>
            <p className="mt-2 text-xs font-semibold">@johndoe</p>
            <p className="text-[9px] text-muted-foreground">Music • Code • Life</p>
          </div>
          <div className="mt-3 space-y-1.5">
            {['Spotify', 'YouTube', 'Portfolio'].map((l) => (
              <div
                key={l}
                className="rounded-lg border border-border/70 bg-background/70 py-1.5 text-center text-[9px] font-medium"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function DashboardMockup() {
  return (
    <div className="relative">
      {/* Glow behind the window */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand/20 via-brand-accent/10 to-transparent blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        className="animate-[float-slow_9s_ease-in-out_infinite] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-muted/50 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-destructive/60" />
            <span className="size-2.5 rounded-full bg-chart-4/50" />
            <span className="size-2.5 rounded-full bg-chart-5/50" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-lg border border-border/70 bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-chart-5" />
            linkfy.io/johndoe
          </div>
        </div>

        {/* Dashboard body */}
        <div className="grid gap-4 p-4 sm:grid-cols-5 sm:p-5">
          {/* Left — profile + links */}
          <div className="sm:col-span-3">
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="ring-2 ring-brand/30">
                <AvatarFallback className="bg-brand/15 font-semibold text-brand">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold">@johndoe</p>
                  <BadgeCheck className="size-3.5 text-brand" />
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  Musician & developer sharing everything I make.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {links.map((item) => (
                <LinkRow key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* Right — analytics + customization */}
          <div className="space-y-4 sm:col-span-2">
            <div className="rounded-xl border border-border/70 bg-background/60 p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <MousePointerClick className="size-3.5" />
                  Link clicks
                </span>
                <span className="flex items-center gap-0.5 text-[10px] font-medium text-chart-5">
                  <TrendingUp className="size-3" />
                  +24%
                </span>
              </div>
              <p className="mt-1 text-xl font-semibold tracking-tight">
                12,480
              </p>
              <div className="mt-2">
                <ClicksChart />
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/60 p-3">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <Palette className="size-3.5" />
                Theme
              </span>
              <div className="mt-2.5 flex items-center gap-2">
                {[
                  'bg-brand',
                  'bg-brand-accent',
                  'bg-chart-5',
                  'bg-foreground',
                ].map((c, i) => (
                  <span
                    key={c}
                    className={`size-6 rounded-full ${c} ${
                      i === 0
                        ? 'ring-2 ring-brand/40 ring-offset-2 ring-offset-background'
                        : ''
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="mt-3 h-2 rounded-full bg-muted">
                <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-brand to-brand-accent" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <PhonePreview />
    </div>
  )
}
