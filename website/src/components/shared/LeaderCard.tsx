"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { Leader } from "@/data/leaders";

const Facebook = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const TwitterX = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const LinkedinIcon = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

interface LeaderCardProps {
  leader: Leader;
  index: number;
  spotlight?: boolean;
}

export default function LeaderCard({ leader, index, spotlight = false }: LeaderCardProps) {
  if (spotlight) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl bg-card border border-border overflow-hidden hover-lift"
      >
        <div className="grid md:grid-cols-3 gap-0">
          {/* Photo */}
          <div className="md:col-span-1 h-72 md:h-full bg-gradient-to-br from-saffron/20 via-maroon/15 to-gold/20 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 cultural-pattern opacity-20" />
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-saffron to-maroon flex items-center justify-center text-white text-5xl font-bold shadow-xl">
              {leader.name.charAt(0)}
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2 p-8">
            <div className="mb-1 text-sm text-saffron font-semibold uppercase tracking-wider">
              {leader.designation}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {leader.name}
            </h3>
            <p className="text-sm text-muted-foreground font-devanagari mb-4">
              {leader.nameHi} • {leader.designationHi}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {leader.bio}
            </p>

            {/* Contact & Social */}
            <div className="flex flex-wrap items-center gap-3">
              {leader.email && (
                <a
                  href={`mailto:${leader.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-saffron/10 text-saffron text-sm hover:bg-saffron/20 transition-colors"
                >
                  <Mail size={14} />
                  Email
                </a>
              )}
              {leader.social?.facebook && (
                <a href={leader.social.facebook} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-600 transition-colors" aria-label="Facebook">
                  <Facebook size={15} />
                </a>
              )}
              {leader.social?.twitter && (
                <a href={leader.social.twitter} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-sky-500 transition-colors" aria-label="Twitter">
                  <TwitterX size={15} />
                </a>
              )}
              {leader.social?.linkedin && (
                <a href={leader.social.linkedin} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                  <LinkedinIcon size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-2xl bg-card border border-border p-6 text-center hover-lift"
    >
      {/* Avatar */}
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-saffron/20 via-maroon/15 to-gold/20 flex items-center justify-center border-4 border-saffron/20 group-hover:border-saffron/40 transition-colors">
        <span className="text-3xl font-bold text-saffron">
          {leader.name.charAt(0)}
        </span>
      </div>

      <h3 className="text-base font-semibold text-foreground group-hover:text-saffron transition-colors">
        {leader.name}
      </h3>
      <p className="text-xs text-muted-foreground font-devanagari mt-0.5">
        {leader.nameHi}
      </p>
      <p className="text-sm font-medium text-saffron mt-1">
        {leader.designation}
      </p>
      <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
        {leader.bio}
      </p>

      {/* Social */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {leader.social?.facebook && (
          <a href={leader.social.facebook} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-600 transition-colors" aria-label="Facebook">
            <Facebook size={13} />
          </a>
        )}
        {leader.social?.twitter && (
          <a href={leader.social.twitter} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-sky-500 transition-colors" aria-label="Twitter">
            <TwitterX size={13} />
          </a>
        )}
        {leader.social?.linkedin && (
          <a href={leader.social.linkedin} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-700 transition-colors" aria-label="LinkedIn">
            <LinkedinIcon size={13} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
