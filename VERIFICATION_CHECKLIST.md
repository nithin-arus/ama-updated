# Game Design & Development Curriculum - Verification Checklist

## Verification Date: December 1, 2025

This document compares the `GameDesign&Dev_AMA(Curriculum).md` file against the implementation in `src/app/api/generate-content/route.ts`.

---

## XP TOTALS VERIFICATION

### Curriculum States:
- **Total Track XP**: 3,850 XP (stated at end of document)
- **Level 1**: 650 XP
- **Level 2**: 800 XP
- **Level 3**: 900 XP
- **Level 4**: 900 XP
- **Level 5**: 850 XP
- **Sum of Levels**: 650 + 800 + 900 + 900 + 850 = **4,100 XP**

### Implementation:
- **Total Track XP**: 4,100 XP
- **Level 1**: 650 XP ✅
- **Level 2**: 800 XP ✅
- **Level 3**: 900 XP ✅
- **Level 4**: 900 XP ✅
- **Level 5**: 850 XP ✅

**NOTE**: There's a discrepancy in the curriculum document itself (states 3,850 total but levels sum to 4,100). Implementation uses the sum of individual levels (4,100 XP).

---

## LEVEL 1: Hello World Protocol – Foundations & Your First Game

### Total XP: 650 ✅

| Item | Curriculum | Implementation | Status |
|------|-----------|----------------|--------|
| **Lesson 1**: Game Development Fundamentals | ✓ | ✓ | ✅ |
| - Brackeys video | ✓ | ✓ | ✅ |
| - Godot Tutorial video | ✓ | ✓ | ✅ |
| - Unity Learn docs | ✓ | ✓ | ✅ |
| - Godot Docs | ✓ | ✓ | ✅ |
| **Mini-Project**: "Hello, Game World" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 2**: Understanding Collisions, Physics | ✓ | ✓ | ✅ |
| - Unity Physics video | ✓ | ✓ | ✅ |
| - Godot 2D Physics video | ✓ | ✓ | ✅ |
| - Godot Physics Bodies docs | ✓ | ✓ | ✅ |
| **Mini-Project**: "Collision Detective" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 3**: Game Loops, Framerate & Time | ✓ | ✓ | ✅ |
| - Game Loop video (Brackeys) | ✓ | ✓ | ✅ |
| - GameDev.net article | ✓ | ✓ | ✅ |
| - Pygame docs | ✓ | ✓ | ✅ |
| **Mini-Project**: "Smooth Movement Simulator" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 4**: Sprites, Animation & Visual Polish | ✓ | ✓ | ✅ |
| - 2D Character Animation (Brackeys) | ✓ | ✓ | ✅ |
| - Godot Animation Tutorial | ✓ | ✓ | ✅ |
| - Kenney.nl Asset Library | ✓ | ✓ | ✅ |
| **Mini-Project**: "Animated Character" (75 XP) | ✓ | ✓ | ✅ |
| **CAPSTONE**: "The Console Commander" | ✓ | ✓ | ✅ |
| - Curriculum states: 400 XP | ✓ | 268 XP | ⚠️ DISCREPANCY |
| - itch.io link | ✓ | ✓ | ✅ |
| - Kenney.nl assets | ✓ | ✓ | ✅ |
| - OpenGameArt link | ✓ | ✓ | ✅ |

**Level 1 Tasks**: 9/9 ✅
**XP Distribution Issue**: Capstone should be 400 XP (curriculum) but is 268 XP (implementation)

---

## LEVEL 2: Game Systems Architect – Mechanics, UI & Feedback Loops

### Total XP: 800 ✅

| Item | Curriculum | Implementation | Status |
|------|-----------|----------------|--------|
| **Lesson 1**: Designing & Implementing Game Mechanics | ✓ | ✓ | ✅ |
| - Game Dev Unlocked video | ✓ | ✓ | ✅ |
| - Code Monkey: Game Feel & Polish | ✓ | ✓ | ✅ |
| **Mini-Project**: "Mechanic Prototype" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 2**: UI, Menus & Scene Management | ✓ | ✓ | ✅ |
| - Brackeys UI Tutorial | ✓ | ✓ | ✅ |
| - Godot UI (Control Nodes) | ✓ | ✓ | ✅ |
| - Scene Management (Code Monkey) | ✓ | ✓ | ✅ |
| - Godot Control Nodes docs | ✓ | ✓ | ✅ |
| **Mini-Project**: "Main Menu & Scene Switcher" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 3**: Audio Integration & Sound Design | ✓ | ✓ | ✅ |
| - Audio in Unity (Brackeys) | ✓ | ✓ | ✅ |
| - Godot Audio & Music | ✓ | ✓ | ✅ |
| - Freesound.org | ✓ | ✓ | ✅ |
| - OpenGameArt.org audio | ✓ | ✓ | ✅ |
| **Mini-Project**: "Audio Mixer" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 4**: Level Design, Difficulty Curves | ✓ | ✓ | ✅ |
| - Game Dev Unlocked video | ✓ | ✓ | ✅ |
| - Brackeys Platformer Level Design | ✓ | ✓ | ✅ |
| **Mini-Project**: "Three-Level Gauntlet" (75 XP) | ✓ | ✓ | ✅ |
| **CAPSTONE**: "The Arcade Architect" | ✓ | ✓ | ✅ |
| - Curriculum states: 500 XP | ✓ | 413 XP | ⚠️ DISCREPANCY |
| - itch.io publish | ✓ | ✓ | ✅ |
| - GitHub repo | ✓ | ✓ | ✅ |

**Level 2 Tasks**: 9/9 ✅
**XP Distribution Issue**: Capstone should be 500 XP (curriculum) but is 413 XP (implementation)

---

## LEVEL 3: Master Programmer – Intermediate Systems

### Total XP: 900 ✅

| Item | Curriculum | Implementation | Status |
|------|-----------|----------------|--------|
| **Lesson 1**: Code Architecture, Refactoring | ✓ | ✓ | ✅ |
| - Code Monkey architecture video | ✓ | ✓ | ✅ |
| - Game Dev Unlocked design patterns | ✓ | ✓ | ✅ |
| - Brackeys best practices | ✓ | ✓ | ✅ |
| **Mini-Project**: "Refactor Your Level 2 Game" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 2**: AI & Enemy Behavior | ✓ | ✓ | ✅ |
| - Brackeys AI Behavior | ✓ | ✓ | ✅ |
| - Code Monkey State Machines | ✓ | ✓ | ✅ |
| - Sebastian Lague Pathfinding | ✓ | ✓ | ✅ |
| **Mini-Project**: "Chase AI" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 3**: Multiplayer Basics & Networking | ✓ | ✓ | ✅ |
| - Brackeys Local Multiplayer | ✓ | ✓ | ✅ |
| - Godot Multiplayer API docs | ✓ | ✓ | ✅ |
| **Mini-Project**: "Split-Screen Platformer" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 4**: Advanced Physics & Procedural Gen | ✓ | ✓ | ✅ |
| - Code Monkey Procedural Gen | ✓ | ✓ | ✅ |
| - Sebastian Lague Dungeon Gen | ✓ | ✓ | ✅ |
| **Mini-Project**: Physics or Procedural Gen (75 XP) | ✓ | ✓ | ✅ |
| **CAPSTONE**: "The Systems Engineer" | ✓ | ✓ | ✅ |
| - Curriculum states: 500 XP | ✓ | 510 XP | ⚠️ CLOSE |
| - itch.io + GitHub | ✓ | ✓ | ✅ |

**Level 3 Tasks**: 9/9 ✅
**XP Distribution**: Capstone is 510 XP vs 500 XP (close enough, 10 XP difference)

---

## LEVEL 4: Game Artist & Designer – Visual Polish, Narrative

### Total XP: 900 ✅

| Item | Curriculum | Implementation | Status |
|------|-----------|----------------|--------|
| **Lesson 1**: Visual Aesthetics, Shader Basics | ✓ | ✓ | ✅ |
| - Blender Guru | ✓ | ✓ | ✅ |
| - Godot Advanced Animation | ✓ | ✓ | ✅ |
| - The Cherno Shader Basics | ✓ | ✓ | ✅ |
| - Brackeys Particle Effects | ✓ | ✓ | ✅ |
| **Mini-Project**: "Shader Playground" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 2**: Narrative Design, Dialogue Systems | ✓ | ✓ | ✅ |
| - Game Dev Unlocked Narrative | ✓ | ✓ | ✅ |
| - Code Monkey Dialogue Tutorial | ✓ | ✓ | ✅ |
| - Twinery.org tool | ✓ | ✓ | ✅ |
| **Mini-Project**: "Story Tree" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 3**: Audio Production, Music Composition | ✓ | ✓ | ✅ |
| - Game Dev Unlocked audio | ✓ | ✓ | ✅ |
| - Audacity tool | ✓ | ✓ | ✅ |
| - Freesound.org foley | ✓ | ✓ | ✅ |
| **Mini-Project**: "Audio Design Suite" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 4**: Marketing, Portfolio & Launch | ✓ | ✓ | ✅ |
| - Game Dev Unlocked marketing | ✓ | ✓ | ✅ |
| - Jonas Tyroller portfolio | ✓ | ✓ | ✅ |
| - OBS tool | ✓ | ✓ | ✅ |
| **Mini-Project**: "Portfolio Audit" (75 XP) | ✓ | ✓ | ✅ |
| **CAPSTONE**: "The Visionary Developer" | ✓ | ✓ | ✅ |
| - Curriculum states: 600 XP | ✓ | 504 XP | ⚠️ DISCREPANCY |
| - 10+ playtesters requirement | ✓ | ✓ | ✅ |

**Level 4 Tasks**: 9/9 ✅
**XP Distribution Issue**: Capstone should be 600 XP (curriculum) but is 504 XP (implementation)

---

## LEVEL 5: Deployment & Portfolio – Shipping, Marketing

### Total XP: 850 ✅

| Item | Curriculum | Implementation | Status |
|------|-----------|----------------|--------|
| **Lesson 1**: Steam Publishing, Platform Requirements | ✓ | ✓ | ✅ |
| - Game Dev Unlocked Steam video | ✓ | ✓ | ✅ |
| - Steamworks Docs | ✓ | ✓ | ✅ |
| **Mini-Project**: "Build Pipeline" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 2**: Portfolio Website, GitHub Presence | ✓ | ✓ | ✅ |
| - Jonas Tyroller portfolio | ✓ | ✓ | ✅ |
| - GitHub Pages | ✓ | ✓ | ✅ |
| **Mini-Project**: "Portfolio Website" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 3**: Community Engagement, Networking | ✓ | ✓ | ✅ |
| - Game Dev Unlocked networking | ✓ | ✓ | ✅ |
| - Jonas Tyroller interviews | ✓ | ✓ | ✅ |
| - r/gamedev Discord link | ✓ | ✓ | ✅ |
| - Ludum Dare game jam | ✓ | ✓ | ✅ |
| **Mini-Project**: "Contribute to Open Source" (75 XP) | ✓ | ✓ | ✅ |
| **Lesson 4**: Indie Developer Sustainability | ✓ | ✓ | ✅ |
| - Game Dev Unlocked economics | ✓ | ✓ | ✅ |
| - Code Monkey indie dev | ✓ | ✓ | ✅ |
| **Mini-Project**: "Business Plan" (75 XP) | ✓ | ✓ | ✅ |
| **CAPSTONE**: "The Professional Indie Developer" | ✓ | ✓ | ✅ |
| - Curriculum states: 600 XP | ✓ | 459 XP | ⚠️ DISCREPANCY |
| - Ship to Steam requirement | ✓ | ✓ | ✅ |
| - LinkedIn jobs link | ✓ | ✓ | ✅ |

**Level 5 Tasks**: 9/9 ✅
**XP Distribution Issue**: Capstone should be 600 XP (curriculum) but is 459 XP (implementation)

---

## ADDITIONAL CURRICULUM CONTENT NOT IN IMPLEMENTATION

### Part 1: Overview (Not currently displayed in UI)
- ❌ "Why Gamers Excel at Game Development" intro text
- ❌ Salary & Career Progression table
- ❌ Tools Required section (Unity, Godot, Pygame, Blender, etc.)

### Part 3: Appendix (Not currently displayed in UI)
- ❌ Top Job Boards table (Indeed, LinkedIn, GameDev.net, itch.io, Polywork, AngelList)
- ❌ Portfolio Hosting Sites table (itch.io, GitHub Pages, YouTube, Twitter, Artstation)
- ❌ Relevant Communities section:
  - ❌ Discord servers list (r/gamedev, Game Dev League, Godot, Unity)
  - ❌ Reddit communities (r/gamedev, r/playmygame, r/IndieGaming)
  - ❌ Game Jams (Ludum Dare, Global Game Jam, itch.io jams)
- ❌ Final Words motivational text

---

## SUMMARY

### ✅ **COMPLETE** - Core Curriculum Content
- **All 5 Levels**: Present and correctly structured
- **All 45 Tasks**:
  - 20 Lessons ✅
  - 20 Mini-Projects ✅
  - 5 Capstones ✅
- **All Resource Links**: YouTube videos, documentation, tools, communities
- **YouTube Embeds**: Functional in UI ✅
- **Total XP**: 4,100 XP ✅

### ⚠️ **DISCREPANCIES** - XP Distribution

Current XP values need adjustment to match curriculum:

| Level | Current | Should Be | Difference |
|-------|---------|-----------|------------|
| Level 1 Capstone | 268 XP | 400 XP | -132 XP |
| Level 2 Capstone | 413 XP | 500 XP | -87 XP |
| Level 3 Capstone | 510 XP | 500 XP | +10 XP |
| Level 4 Capstone | 504 XP | 600 XP | -96 XP |
| Level 5 Capstone | 459 XP | 600 XP | -141 XP |

**Note**: These discrepancies exist because I distributed XP to maintain the stated level totals (650, 800, 900, 900, 850) while the curriculum has inconsistencies between individual XP values and level totals.

### ❌ **MISSING** - Informational Content (Not Core Curriculum)

The following sections from the curriculum document are **informational** and not implemented in the UI:
- Overview text (intro, salary table, tools list)
- Appendix (job boards, communities, final words)

These could be added as:
1. A "Track Overview" page before starting Level 1
2. A "Career Resources" page accessible from the dashboard
3. Supplementary information in the curriculum document itself

---

## RECOMMENDATION

### Option 1: Fix XP Values (Recommended)
Adjust capstone XP values to match curriculum exactly:
- Level 1: 400 XP
- Level 2: 500 XP
- Level 3: 500 XP
- Level 4: 600 XP
- Level 5: 600 XP

Then redistribute lesson/mini-project XP to maintain level totals.

### Option 2: Keep Current Implementation
Current implementation maintains correct level totals and all content is present. XP distribution differences are minor and don't affect the learning experience.

### Option 3: Add Overview & Appendix
Create additional UI components to display:
- Track overview (salary, tools, intro)
- Career resources page (job boards, communities)
- Motivational content from "Final Words"

---

**Verification Complete**: December 1, 2025
