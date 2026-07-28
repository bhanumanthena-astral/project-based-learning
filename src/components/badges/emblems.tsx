// ============================================================
// Emblem glyphs — unique per badge id (userSpace 64, center 32)
// Layered white + soft shadow gives an embossed, metallic feel.
// ============================================================
import React from 'react';
import { D, M, shade, hl, glint, gear, star, shield, flame } from './BadgeArtUtils';

const SH = '#2A0E45';

export const EMBLEM: Record<string, React.ReactNode> = {
  // ------------------------------ FOUNDATION
  'foundation-0': ( // First Commit — git branch
    <g>
      <D>
        <circle cx="23" cy="19" r="4" /><circle cx="23" cy="45" r="4" /><circle cx="43" cy="22" r="4" />
        <path d="M23 23v18" stroke={SH} strokeWidth="3.4" />
        <path d="M43 26c0 9-8 11-15 12" stroke={SH} strokeWidth="3.4" fill="none" />
      </D>
      <M>
        <path d="M23 22v20" stroke="#FFFFFF" strokeWidth="3" fill="none" />
        <path d="M43 25c0 9-8 11-15 12" stroke="#FFFFFF" strokeWidth="3" fill="none" />
        <circle cx="23" cy="18" r="4" /><circle cx="23" cy="44" r="4" /><circle cx="43" cy="21" r="4" />
      </M>
      <g fill="#B9F18A"><circle cx="23" cy="18" r="1.8" /><circle cx="43" cy="21" r="1.8" /></g>
      {glint(21.6, 16.6, 0.8)}
    </g>
  ),
  'foundation-1': ( // Knowledge Seeker — glowing open book
    <g>
      <D><path d="M15 23c6-3.4 12-3.4 17 0 5-3.4 11-3.4 17 0v19c-6-3.4-12-3.4-17 0-5-3.4-11-3.4-17 0Z" /></D>
      <M><path d="M14 22c6-3.4 12-3.4 17 0 5-3.4 11-3.4 17 0v19c-6-3.4-12-3.4-17 0-5-3.4-11-3.4-17 0Z" stroke="#FFFFFF" strokeWidth="2"  /></M>
      <path d="M31 22v19" stroke="#FFFFFF" strokeWidth="1.6" />
      <g stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round">
        <path d="M18 27c3.4-1.8 7-1.8 10 0M18 31c3.4-1.8 7-1.8 10 0M18 35c3.4-1.8 7-1.8 10 0" />
        <path d="M36 27c3.4-1.8 7-1.8 10 0M36 31c3.4-1.8 7-1.8 10 0M36 35c3.4-1.8 7-1.8 10 0" />
      </g>
      {glint(46, 18, 1)}
    </g>
  ),
  'foundation-2': ( // Launch Ready — rocket
    <g>
      <D><path d="M32 12c7 4 9 11 8 19l4 5-6 1c-1 3-3 5-6 6-3-1-5-3-6-6l-6-1 4-5c-1-8 1-15 8-19Z" /></D>
      <M><path d="M32 11c7 4 9 11 8 19l4 5-6 1c-1 3-3 5-6 6-3-1-5-3-6-6l-6-1 4-5c-1-8 1-15 8-19Z" /></M>
      <circle cx="32" cy="25" r="3.6" fill="#BFE3FF" /><circle cx="32" cy="25" r="3.6" fill="none" stroke={SH} strokeOpacity="0.3" strokeWidth="0.8" />
      {shade({ d: 'M32 11c3.5 2 6 5 7 9-2-2-5-3.4-7-3.4s-5 1.4-7 3.4c1-4 3.5-7 7-9Z' })}
      <path d={flame(32, 45, 5)} fill="#FFB84D" /><path d={flame(32, 44, 2.6)} fill="#FFE9A8" />
      {glint(28, 16, 0.9)}
    </g>
  ),
  'foundation-3': ( // Goal Crusher — bullseye
    <g>
      <D><circle cx="30" cy="32" r="15" /></D>
      <M><circle cx="29" cy="31" r="15" /></M>
      <circle cx="29" cy="31" r="11" fill="#E85D6A" /><circle cx="29" cy="31" r="7" fill="#FFFFFF" /><circle cx="29" cy="31" r="3.2" fill="#E85D6A" />
      <path d="M29 31 45 15" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M45 15l-1.5 5.5M45 15l-5.5 1.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {glint(24, 25, 1)}
    </g>
  ),
  'foundation-4': ( // Speed Learner — lightning
    <g>
      <D><path d="M36 12 18 36h10l-4 16 18-24H32l4-16Z" /></D>
      <M><path d="M35 11 17 35h10l-4 16 18-24H31l4-16Z" /></M>
      {hl({ d: 'M35 11 26 24h6l-1.5 6 6-8h-6l4.5-11Z' })}
      {glint(30, 20, 1)}
    </g>
  ),
  'foundation-5': ( // Streak Master — blue flame
    <g>
      <D><path d={flame(32, 34, 16)} /></D>
      <path d={flame(32, 33, 16)} fill="#8FD2FF" />
      <path d={flame(32, 36, 10)} fill="#FFFFFF" />
      <path d={flame(32, 38, 5)} fill="#DFF3FF" />
      {glint(24, 20, 1)}
    </g>
  ),

  // ------------------------------ PROGRAMMING
  'programming-0': ( // Code Crafter — terminal
    <g>
      <D><rect x="15" y="19" width="34" height="26" rx="4" /></D>
      <M><rect x="14" y="18" width="34" height="26" rx="4" /></M>
      <rect x="14" y="18" width="34" height="7" rx="4" fill="#E8EDF5" />
      <rect x="14" y="22" width="34" height="3" fill="#E8EDF5" />
      <g fill="#FFFFFF"><circle cx="18" cy="21.5" r="1" /><circle cx="21.5" cy="21.5" r="1" /><circle cx="25" cy="21.5" r="1" /></g>
      <path d="M20 31l5 4-5 4" stroke={SH} strokeOpacity="0.7" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 39h7" stroke={SH} strokeOpacity="0.7" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  ),
  'programming-1': ( // Logic Wizard — puzzle cube
    <g>
      <D><path d="M32 15l15 8v18l-15 8-15-8V23Z" /></D>
      <path d="M32 14l15 8v18l-15 8-15-8V22Z" fill="#FFFFFF" />
      <path d="M32 14l15 8-15 8-15-8Z" fill="#FFFFFF" />
      {shade({ d: 'M32 30v18l15-8V22Z' })}
      {hl({ d: 'M32 14l15 8-15 8-15-8Z' })}
      <path d="M32 14v8M17 22l15 8 15-8M32 30v18" stroke={SH} strokeOpacity="0.18" strokeWidth="1" fill="none" />
      {glint(27, 19, 0.9)}
    </g>
  ),
  'programming-2': ( // Bug Hunter — mechanical ladybug
    <g>
      <D><ellipse cx="32" cy="33" rx="12" ry="13" /><circle cx="32" cy="19" r="6" /></D>
      <circle cx="32" cy="18" r="6" fill="#FFFFFF" />
      <ellipse cx="32" cy="32" rx="12" ry="13" fill="#E85D6A" />
      <path d="M32 20v24" stroke="#FFFFFF" strokeWidth="1.6" />
      <g fill="#FFFFFF"><circle cx="26" cy="28" r="2" /><circle cx="38" cy="28" r="2" /><circle cx="24" cy="36" r="2" /><circle cx="40" cy="36" r="2" /><circle cx="32" cy="32" r="2" /></g>
      <path d="M28 14l-4-4M36 14l4-4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      {glint(27, 25, 0.9)}
    </g>
  ),
  'programming-3': ( // Full Stack Hero — stacked windows
    <g>
      <rect x="16" y="32" width="28" height="18" rx="3" fill={SH} opacity="0.22" transform="translate(0,1.4)" />
      <rect x="20" y="24" width="28" height="18" rx="3" fill={SH} opacity="0.22" transform="translate(0,1.4)" />
      <rect x="24" y="16" width="28" height="18" rx="3" fill={SH} opacity="0.22" transform="translate(0,1.4)" />
      <rect x="15" y="31" width="28" height="18" rx="3"  />
      <rect x="19" y="23" width="28" height="18" rx="3"  />
      <rect x="23" y="15" width="28" height="18" rx="3" fill="#FFFFFF" />
      <rect x="23" y="15" width="28" height="5" rx="2.5" fill="#DDE6F2" />
      <g fill={SH} opacity="0.5"><rect x="26" y="23" width="22" height="2" rx="1" /><rect x="26" y="27" width="15" height="2" rx="1" /></g>
    </g>
  ),
  'programming-4': ( // API Builder — connected nodes
    <g>
      <D><circle cx="32" cy="32" r="6" /><circle cx="17" cy="19" r="4.5" /><circle cx="47" cy="19" r="4.5" /><circle cx="32" cy="48" r="4.5" /></D>
      <path d="M32 32 17 19M32 32l15-13M32 32v16" stroke="#FFFFFF" strokeWidth="2.4" />
      <M><circle cx="32" cy="31" r="6" /><circle cx="16" cy="18" r="4.5" /><circle cx="46" cy="18" r="4.5" /><circle cx="32" cy="47" r="4.5" /></M>
      <g fill="#BFE3FF"><circle cx="16" cy="18" r="2" /><circle cx="46" cy="18" r="2" /><circle cx="32" cy="47" r="2" /></g>
      <circle cx="32" cy="31" r="2.6" fill="#BFE3FF" />
    </g>
  ),
  'programming-5': ( // Problem Solver — circuit brain
    <g>
      <D><path d="M32 15c-9 0-15 6-15 14 0 4 2 8 5 10l1 8h18l1-8c3-2 5-6 5-10 0-8-6-14-15-14Z" /></D>
      <M><path d="M32 14c-9 0-15 6-15 14 0 4 2 8 5 10l1 8h18l1-8c3-2 5-6 5-10 0-8-6-14-15-14Z" /></M>
      <g stroke={SH} strokeOpacity="0.6" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M32 20v10M32 30h-7M32 30h7M25 30v7M39 30v7" />
      </g>
      <g fill={SH} opacity="0.6"><circle cx="32" cy="18" r="1.6" /><circle cx="25" cy="39" r="1.6" /><circle cx="39" cy="39" r="1.6" /><circle cx="32" cy="30" r="1.8" /></g>
    </g>
  ),

  // ------------------------------ DATABASE
  'database-0': ( // Schema Creator — db cylinder
    <g>
      <D><ellipse cx="32" cy="21" rx="14" ry="5" /><path d="M18 21v22c0 2.8 6.3 5 14 5s14-2.2 14-5V21" /></D>
      <path d="M17 20v22c0 2.8 6.3 5 14 5s14-2.2 14-5V20" fill="#FFFFFF" />
      <ellipse cx="31" cy="20" rx="14" ry="5" fill="#FFFFFF" />
      <ellipse cx="31" cy="20" rx="10" ry="3.4" fill="#BFE3FF" />
      <g stroke={SH} strokeOpacity="0.22" strokeWidth="1" fill="none">
        <path d="M17 28c0 2.8 6.3 5 14 5s14-2.2 14-5M17 35c0 2.8 6.3 5 14 5s14-2.2 14-5" />
      </g>
      {glint(24, 26, 0.9)}
    </g>
  ),
  'database-1': ( // Relationship Builder — chain
    <g>
      <D><rect x="14" y="26" width="20" height="12" rx="6" /><rect x="30" y="26" width="20" height="12" rx="6" /></D>
      <rect x="13" y="25" width="20" height="12" rx="6" fill="none" stroke="#FFFFFF" strokeWidth="3.4" />
      <rect x="29" y="25" width="20" height="12" rx="6" fill="none" stroke="#FFFFFF" strokeWidth="3.4" />
      {glint(19, 25, 0.8)}{glint(35, 25, 0.8)}
    </g>
  ),
  'database-2': ( // ACID Guardian — shield
    <g>
      <D><path d={shield(32, 32, 28, 34)} /></D>
      <path d={shield(32, 31, 28, 34)} fill="#FFFFFF" />
      <path d={shield(32, 31, 20, 26)} fill="#BFE3FF" />
      {shade({ d: 'M32 15l14 4v12c0 9-6 15-14 19-8-4-14-10-14-19V19Z' })}
      <path d="M25 31l5 5 9-11" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {glint(26, 20, 0.9)}
    </g>
  ),
  'database-3': ( // Query Master — SQL console
    <g>
      <D><rect x="15" y="19" width="34" height="26" rx="4" /></D>
      <M><rect x="14" y="18" width="34" height="26" rx="4" /></M>
      <rect x="14" y="18" width="34" height="7" rx="4" fill="#E8EDF5" />
      <rect x="14" y="22" width="34" height="3" fill="#E8EDF5" />
      <g fontFamily="monospace" fontWeight="700" fill={SH} opacity="0.72" fontSize="8">
        <text x="18" y="33">SELECT</text>
      </g>
      <g stroke={SH} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round"><path d="M18 37h24M18 41h16" /></g>
    </g>
  ),
  'database-4': ( // Index Architect — hexagonal nodes
    <g>
      <path d="M32 32 19 22M32 32l13-10M32 32 19 42M32 32l13 10" stroke="#FFFFFF" strokeWidth="1.8" />
      <D><path d="M32 24l7 4v8l-7 4-7-4v-8Z" /></D>
      <path d="M32 23l7 4v8l-7 4-7-4v-8Z" fill="#FFFFFF" />
      <circle cx="32" cy="31" r="3" fill="#BFE3FF" />
      <g fill="#FFFFFF"><path d="M18 15l4.5 2.6v5.2L18 25.4l-4.5-2.6v-5.2Z" /><path d="M46 15l4.5 2.6v5.2L46 25.4l-4.5-2.6v-5.2Z" /><path d="M18 40l4.5 2.6v5.2L18 50.4l-4.5-2.6v-5.2Z" /><path d="M46 40l4.5 2.6v5.2L46 50.4l-4.5-2.6v-5.2Z" /></g>
    </g>
  ),
  'database-5': ( // Normalization Guru — layered db
    <g>
      <D><path d="M32 16l16 7-16 7-16-7Z" /><path d="M16 30l16 7 16-7" /><path d="M16 38l16 7 16-7" /></D>
      <path d="M32 15l16 7-16 7-16-7Z" fill="#FFFFFF" />
      <path d="M16 29l16 7 16-7v6l-16 7-16-7Z" fill="#BFE3FF" />
      <path d="M16 37l16 7 16-7v6l-16 7-16-7Z"  />
      <path d="M32 15l16 7-16 7-16-7Z" fill="none" stroke={SH} strokeOpacity="0.2" strokeWidth="1" />
      {glint(27, 19, 0.8)}
    </g>
  ),

  // ------------------------------ FRONTEND
  'frontend-0': ( // Pixel Perfect — UI frame
    <g>
      <D><rect x="17" y="19" width="30" height="26" rx="3" /></D>
      <M><rect x="16" y="18" width="30" height="26" rx="3" /></M>
      <rect x="16" y="18" width="30" height="6" rx="3" fill="#E8EDF5" />
      <rect x="16" y="21" width="30" height="3" fill="#E8EDF5" />
      <rect x="19" y="27" width="12" height="9" rx="1.5" fill="#BFE3FF" />
      <g fill={SH} opacity="0.5"><rect x="34" y="28" width="9" height="2" rx="1" /><rect x="34" y="31.5" width="9" height="2" rx="1" /><rect x="19" y="39" width="24" height="2" rx="1" /></g>
      <path d="M12 12h8M12 12v8M52 52h-8M52 52v-8" stroke="#FFFFFF" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  ),
  'frontend-1': ( // React Pioneer — atom
    <g>
      <g fill="none" stroke="#FFFFFF" strokeWidth="2.2">
        <ellipse cx="32" cy="32" rx="16" ry="6.5" />
        <ellipse cx="32" cy="32" rx="16" ry="6.5" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="16" ry="6.5" transform="rotate(120 32 32)" />
      </g>
      <circle cx="32" cy="32" r="4" fill="#FFFFFF" />
      <circle cx="32" cy="32" r="4" fill={SH} opacity="0.1" />
      {glint(43, 21, 0.8)}
    </g>
  ),
  'frontend-2': ( // CSS Artist — paint brush
    <g>
      <path d="M18 46c2 6 8 10 14 8-2-4-4-7-8-9l-6 1Z" fill={SH} opacity="0.22" transform="translate(0,1.4)" />
      <path d="M17 45c2 6 8 10 14 8-2-4-4-7-8-9l-6 1Z" fill="#FFFFFF" />
      <rect x="34" y="18" width="7" height="16" rx="2.5" fill="#FFFFFF" transform="rotate(38 37.5 26)" />
      <path d="M22 38c3-1 6 0 8 3l-2 3c-4 1-8-1-9-5l3-1Z" fill="#E85D6A" />
      <path d="M33 22l9-9c2-2 5 1 3 3l-9 9-3-3Z" fill="#F6B73C" />
      {glint(20, 47, 0.8)}
    </g>
  ),
  'frontend-3': ( // Animation Master — motion curves
    <g>
      <path d="M16 44c8-2 12-16 20-20 6-3 10 0 12 4" stroke={SH} strokeOpacity="0.22" strokeWidth="3" fill="none" strokeLinecap="round" transform="translate(0,1.4)" />
      <path d="M15 43c8-2 12-16 20-20 6-3 10 0 12 4" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M15 50c9-2 13-14 21-18" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="46" cy="26" r="4.5" fill="#FFFFFF" /><circle cx="46" cy="26" r="2" fill="#BFE3FF" />
      <circle cx="15" cy="43" r="3" fill="#FFFFFF" />
    </g>
  ),
  'frontend-4': ( // Component Craftsman — UI blocks
    <g>
      <D><rect x="16" y="18" width="14" height="14" rx="2.5" /><rect x="34" y="18" width="14" height="14" rx="2.5" /><rect x="16" y="36" width="14" height="14" rx="2.5" /><rect x="34" y="36" width="14" height="14" rx="2.5" /></D>
      <rect x="15" y="17" width="14" height="14" rx="2.5" fill="#FFFFFF" />
      <rect x="33" y="17" width="14" height="14" rx="2.5" fill="#BFE3FF" />
      <rect x="15" y="35" width="14" height="14" rx="2.5" fill="#BFE3FF" />
      <rect x="33" y="35" width="14" height="14" rx="2.5" fill="#FFFFFF" />
      {glint(20, 21, 0.8)}
    </g>
  ),
  'frontend-5': ( // Responsive Wizard — desktop + mobile
    <g>
      <D><rect x="14" y="20" width="28" height="20" rx="2.5" /><rect x="40" y="30" width="12" height="20" rx="2.5" /></D>
      <rect x="13" y="19" width="28" height="20" rx="2.5" fill="#FFFFFF" />
      <rect x="16" y="22" width="22" height="12" rx="1.5" fill="#BFE3FF" />
      <path d="M13 36h28" stroke={SH} strokeOpacity="0.2" strokeWidth="1" />
      <rect x="39" y="29" width="12" height="20" rx="2.5" fill="#FFFFFF" />
      <rect x="41" y="32" width="8" height="12" rx="1" fill="#BFE3FF" />
      <circle cx="45" cy="47" r="1" fill={SH} opacity="0.4" />
    </g>
  ),

  // ------------------------------ BACKEND
  'backend-0': ( // API Samurai — katana + API
    <g>
      <path d="M18 46 44 20" stroke={SH} strokeOpacity="0.22" strokeWidth="4" strokeLinecap="round" transform="translate(0,1.4)" />
      <path d="M17 45 43 19" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M40 16l4 4" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <path d="M20 42l4 4" stroke={SH} strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      <path d="M17 45l6-6" stroke={SH} strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      <text x="20" y="26" fontFamily="monospace" fontWeight="700" fontSize="7" fill={SH} opacity="0.7">{`{}`}</text>
      {glint(36, 24, 0.8)}
    </g>
  ),
  'backend-1': ( // Microservice Builder — connected cubes
    <g>
      <path d="M32 32 19 21M32 32l13-11M32 32 19 43M32 32l13 11" stroke="#FFFFFF" strokeWidth="1.8" />
      <D><path d="M32 25l8 4.5v9L32 43l-8-4.5v-9Z" /></D>
      <path d="M32 24l8 4.5v9L32 42l-8-4.5v-9Z" fill="#FFFFFF" />
      {shade({ d: 'M32 33v9l8-4.5v-9Z' })}
      <g fill="#FFFFFF"><path d="M18 15l6 3.4v6.8L18 28.6l-6-3.4v-6.8Z" /><path d="M46 15l6 3.4v6.8L46 28.6l-6-3.4v-6.8Z" /><path d="M18 37l6 3.4v6.8L18 50.6l-6-3.4v-6.8Z" /><path d="M46 37l6 3.4v6.8L46 50.6l-6-3.4v-6.8Z" /></g>
    </g>
  ),
  'backend-2': ( // Socket Master — signal waves
    <g>
      <circle cx="24" cy="40" r="4" fill="#FFFFFF" />
      <g fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round">
        <path d="M30 34a9 9 0 0 1 0 12" />
        <path d="M35 29a15 15 0 0 1 0 22" opacity="0.75" />
        <path d="M40 24a21 21 0 0 1 0 32" opacity="0.5" />
      </g>
      {glint(22, 38, 0.8)}
    </g>
  ),
  'backend-3': ( // Backend Fortress — castle shield
    <g>
      <D><path d={shield(32, 33, 28, 32)} /></D>
      <path d={shield(32, 32, 28, 32)} fill="#FFFFFF" />
      <path d="M24 40V27h4v-3h3v3h3v-3h3v3h4v13c-3 4-6 6-9 7-3-1-6-3-8-7Z" fill={SH} opacity="0.55" />
      <path d="M29 40v-5a3 3 0 0 1 6 0v5" fill="#FFFFFF" />
      {glint(25, 22, 0.8)}
    </g>
  ),
  'backend-4': ( // Security Sentinel — lock
    <g>
      <D><rect x="20" y="28" width="24" height="20" rx="4" /><path d="M25 28v-6a7 7 0 0 1 14 0v6" /></D>
      <path d="M24 27v-6a8 8 0 0 1 16 0v6" fill="none" stroke="#FFFFFF" strokeWidth="4" />
      <rect x="19" y="27" width="26" height="21" rx="4" fill="#FFFFFF" />
      <circle cx="32" cy="36" r="3.4" fill={SH} opacity="0.6" />
      <path d="M32 37.5v5" stroke={SH} strokeOpacity="0.6" strokeWidth="2.6" strokeLinecap="round" />
      {glint(25, 31, 0.9)}
    </g>
  ),

  // ------------------------------ DEVOPS
  'devops-0': ( // Cloud Navigator — cloud
    <g>
      <D><path d="M22 42a8 8 0 0 1-1-15.9A11 11 0 0 1 42 24a9 9 0 0 1 4 18Z" /></D>
      <path d="M21 41a8 8 0 0 1-1-15.9A11 11 0 0 1 41 23a9 9 0 0 1 4 18Z" fill="#FFFFFF" />
      {hl({ d: 'M24 26a9 9 0 0 1 8-8c-5 0-9 3-10 8Z' })}
      <path d="M31 41l3-5M31 41l-3-5" stroke="#BFE3FF" strokeWidth="2" strokeLinecap="round" />
      {glint(27, 24, 0.9)}
    </g>
  ),
  'devops-1': ( // Docker Captain — container cube
    <g>
      <D><path d="M32 14l16 9v18l-16 9-16-9V23Z" /></D>
      <path d="M32 13l16 9v18l-16 9-16-9V22Z" fill="#FFFFFF" />
      {shade({ d: 'M32 31v18l16-9V22Z' })}
      <path d="M32 13l16 9-16 9-16-9Z" fill="#BFE3FF" />
      <path d="M32 13v9M16 22l16 9 16-9M32 31v18" stroke={SH} strokeOpacity="0.16" strokeWidth="1" fill="none" />
      <g stroke={SH} strokeOpacity="0.5" strokeWidth="1.4"><path d="M24 24h4M30 27h4M22 28h4M28 31h4" /></g>
      {glint(26, 19, 0.8)}
    </g>
  ),
  'devops-2': ( // CI/CD Champion — infinity loop
    <g>
      <path d="M32 32c-4-6-10-8-14-5-5 4-5 12 0 15 4 3 10 1 14-5 4 6 10 8 14 5 5-4 5-12 0-15-4-3-10-1-14 5Z" stroke={SH} strokeOpacity="0.22" strokeWidth="4.4" fill="none" strokeLinecap="round" transform="translate(0,1.4)" />
      <path d="M32 31c-4-6-10-8-14-5-5 4-5 12 0 15 4 3 10 1 14-5 4 6 10 8 14 5 5-4 5-12 0-15-4-3-10-1-14 5Z" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M46 25l3 4-5 1" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {glint(20, 27, 0.8)}
    </g>
  ),
  'devops-3': ( // Kubernetes Commander — cluster wheel
    <g>
      <D><path d={gear(16, 8, 7, 3.4)} /></D>
      <path d={gear(16, 8, 7, 3.4)} fill="#FFFFFF" fillRule="evenodd" />
      <path d="M32 32m-13 0h26M32 32m0-13v26M32 32m-9-9 18 18M32 32m9-9-18 18" stroke={SH} strokeOpacity="0.35" strokeWidth="1.6" />
      <circle cx="32" cy="32" r="6" fill="#BFE3FF" />
      <circle cx="32" cy="32" r="6" fill="none" stroke={SH} strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="32" cy="32" r="2.4" fill="#FFFFFF" />
    </g>
  ),
  'devops-4': ( // Infrastructure Engineer — server racks
    <g>
      <D><rect x="20" y="15" width="24" height="10" rx="2" /><rect x="20" y="27" width="24" height="10" rx="2" /><rect x="20" y="39" width="24" height="10" rx="2" /></D>
      <rect x="19" y="14" width="24" height="10" rx="2" fill="#FFFFFF" />
      <rect x="19" y="26" width="24" height="10" rx="2" fill="#FFFFFF" />
      <rect x="19" y="38" width="24" height="10" rx="2" fill="#FFFFFF" />
      <g fill={SH} opacity="0.5"><circle cx="23.5" cy="19" r="1.4" /><circle cx="23.5" cy="31" r="1.4" /><circle cx="23.5" cy="43" r="1.4" /></g>
      <g fill="#10B981"><circle cx="23.5" cy="19" r="1" /><circle cx="23.5" cy="31" r="1" /></g>
      <g stroke={SH} strokeOpacity="0.4" strokeWidth="1.4" strokeLinecap="round"><path d="M28 19h11M28 31h11M28 43h11" /></g>
    </g>
  ),

  // ------------------------------ AI
  'ai-0': ( // AI Explorer — brain chip
    <g>
      <g stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"><path d="M26 15v-5M32 15v-5M38 15v-5M26 54v-5M32 54v-5M38 54v-5M15 26h-5M15 32h-5M15 38h-5M54 26h-5M54 32h-5M54 38h-5" /></g>
      <D><rect x="19" y="19" width="26" height="26" rx="4" /></D>
      <rect x="18" y="18" width="26" height="26" rx="4" fill="#FFFFFF" />
      <rect x="23" y="23" width="16" height="16" rx="2.5" fill="#BFE3FF" />
      <path d="M26 31h5l2-4 2 6 2-3h4" stroke={SH} strokeOpacity="0.6" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {glint(22, 22, 0.8)}
    </g>
  ),
  'ai-1': ( // Prompt Engineer — chat bubble
    <g>
      <D><path d="M16 18h32a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H30l-8 8v-8h-6a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4Z" /></D>
      <path d="M15 17h32a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H29l-8 8v-8h-6a4 4 0 0 1-4-4V21a4 4 0 0 1 4-4Z" fill="#FFFFFF" />
      <path d={star(31, 28, 5, 2.2, 4)} fill="#BFE3FF" />
      {glint(41, 22, 0.8)}{glint(22, 33, 0.6)}
    </g>
  ),
  'ai-2': ( // LLM Architect — neural network
    <g>
      <g stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.2">
        <path d="M16 20 32 24M16 20 32 32M16 32 32 24M16 32 32 32M16 32 32 40M16 44 32 40M16 44 32 32" />
        <path d="M32 24 48 32M32 32 48 32M32 40 48 32" />
      </g>
      <D><circle cx="16" cy="20" r="3.5" /><circle cx="16" cy="32" r="3.5" /><circle cx="16" cy="44" r="3.5" /><circle cx="32" cy="24" r="3.5" /><circle cx="32" cy="32" r="3.5" /><circle cx="32" cy="40" r="3.5" /><circle cx="48" cy="32" r="4" /></D>
      <M><circle cx="15" cy="19" r="3.5" /><circle cx="15" cy="31" r="3.5" /><circle cx="15" cy="43" r="3.5" /><circle cx="31" cy="23" r="3.5" /><circle cx="31" cy="31" r="3.5" /><circle cx="31" cy="39" r="3.5" /><circle cx="47" cy="31" r="4" /></M>
      <circle cx="47" cy="31" r="1.8" fill="#BFE3FF" />
    </g>
  ),
  'ai-3': ( // Vector Pioneer — vector graph
    <g>
      <g stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.2"><path d="M18 44 30 20M30 20 44 34M44 34 22 22M22 22 44 20M30 20 44 20" /></g>
      <D><circle cx="30" cy="20" r="3.6" /><circle cx="44" cy="20" r="3" /><circle cx="22" cy="22" r="3" /><circle cx="44" cy="34" r="3.4" /><circle cx="18" cy="44" r="3.4" /></D>
      <M><circle cx="29" cy="19" r="3.6" /><circle cx="43" cy="19" r="3" /><circle cx="21" cy="21" r="3" /><circle cx="43" cy="33" r="3.4" /><circle cx="17" cy="43" r="3.4" /></M>
      {glint(28, 17, 0.7)}
    </g>
  ),
  'ai-4': ( // Automation Expert — robot
    <g>
      <path d="M32 12v5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" /><circle cx="32" cy="11" r="2.2" fill="#FFFFFF" />
      <D><rect x="18" y="17" width="28" height="24" rx="6" /><rect x="13" y="24" width="5" height="10" rx="2" /><rect x="46" y="24" width="5" height="10" rx="2" /></D>
      <rect x="12" y="23" width="5" height="10" rx="2" fill="#FFFFFF" /><rect x="45" y="23" width="5" height="10" rx="2" fill="#FFFFFF" />
      <rect x="17" y="16" width="28" height="24" rx="6" fill="#FFFFFF" />
      <rect x="22" y="24" width="18" height="8" rx="4" fill={SH} opacity="0.6" />
      <circle cx="27" cy="28" r="1.8" fill="#BFE3FF" /><circle cx="35" cy="28" r="1.8" fill="#BFE3FF" />
      <path d="M26 36h12" stroke={SH} strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M31 41c1.5 1.6 3.5 1.6 5 0" stroke={SH} strokeOpacity="0.4" strokeWidth="1.4" fill="none" strokeLinecap="round" transform="translate(-2.5,0)" />
    </g>
  ),

  // ------------------------------ LEGENDARY
  'legendary-0': ( // Nxtagent Legend — golden crown
    <g>
      <D><path d="M16 40l3-16 8 8 5-14 5 14 8-8 3 16v6H16Z" /></D>
      <path d="M15 39l3-16 8 8 5-14 5 14 8-8 3 16v6H15Z" fill="#FFFFFF" />
      <path d="M15 45h34" stroke={SH} strokeOpacity="0.2" strokeWidth="1" />
      <g fill="#F6B73C"><circle cx="18" cy="23" r="2.2" /><circle cx="31" cy="16" r="2.4" /><circle cx="44" cy="23" r="2.2" /></g>
      <circle cx="31" cy="35" r="3" fill="#E0245E" /><circle cx="22" cy="39" r="1.6" fill="#2563EB" /><circle cx="40" cy="39" r="1.6" fill="#10B981" />
      {glint(26, 22, 1)}
    </g>
  ),
  'legendary-1': ( // The Architect — ruby diamond
    <g>
      <D><path d="M32 16l14 12-14 20-14-20Z" /></D>
      <path d="M32 15l14 12-14 20-14-20Z" fill="#FFFFFF" />
      <path d="M32 15l14 12H18Z" fill="#FFFFFF" />
      <path d="M18 27l14 20 14-20Z" fill="#E0245E" />
      <path d="M18 27h28M25 21l7 6-7 6M39 21l-7 6 7 6M32 15v33" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1" fill="none" />
      {glint(26, 20, 1)}{glint(38, 24, 0.7)}
    </g>
  ),
  'legendary-2': ( // Code Oracle — crystal eye
    <g>
      <D><path d="M32 20c9 0 16 6 18 12-2 6-9 12-18 12s-16-6-18-12c2-6 9-12 18-12Z" /></D>
      <path d="M32 19c9 0 16 6 18 12-2 6-9 12-18 12s-16-6-18-12c2-6 9-12 18-12Z" fill="#FFFFFF" />
      <circle cx="32" cy="31" r="9" fill="#BFE3FF" />
      <circle cx="32" cy="31" r="9" fill="none" stroke={SH} strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="32" cy="31" r="4.6" fill={SH} opacity="0.65" />
      <circle cx="33.6" cy="29" r="1.6" fill="#FFFFFF" />
      {glint(45, 22, 0.8)}
    </g>
  ),
  'legendary-3': ( // Master Builder — golden hammer
    <g>
      <D><rect x="20" y="14" width="22" height="12" rx="3" /><rect x="28" y="24" width="7" height="26" rx="3" /></D>
      <rect x="27" y="23" width="7" height="26" rx="3" fill="#FFFFFF" />
      <rect x="19" y="13" width="22" height="12" rx="3" fill="#FFFFFF" />
      <rect x="19" y="13" width="6" height="12" rx="3" fill="#F6B73C" />
      <rect x="35" y="13" width="6" height="12" rx="3" fill="#F6B73C" />
      {glint(23, 17, 0.9)}
    </g>
  ),
  'legendary-4': ( // Zero Bug Release — golden bug shield
    <g>
      <D><path d={shield(32, 32, 28, 34)} /></D>
      <path d={shield(32, 31, 28, 34)} fill="#FFFFFF" />
      <path d={shield(32, 31, 20, 26)} fill="#F6B73C" />
      <ellipse cx="32" cy="32" rx="5" ry="6" fill={SH} opacity="0.6" />
      <circle cx="32" cy="25" r="2.6" fill={SH} opacity="0.6" />
      <g stroke={SH} strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round"><path d="M28 29l-4-2M36 29l4-2M28 34l-4 2M36 34l4 2" /></g>
      <path d="M26 33l4 4 8-9" stroke="#FFFFFF" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {glint(25, 20, 0.9)}
    </g>
  ),
};
