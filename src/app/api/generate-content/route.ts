import { NextRequest, NextResponse } from 'next/server';
import { CareerData, TrackType } from '@/types';

export const dynamic = 'force-dynamic';

const TRACK_DATA: Record<TrackType, CareerData> = {
  'Game Design': {
    targetRole: 'Game Designer & Developer',
    selectedTrack: 'Game Design',
    totalXP: 4100,
    currentXP: 0,
    currentLevel: 1,
    levels: [
      // LEVEL 1: Hello World Protocol – Foundations & Your First Game (650 XP)
      {
        id: 1,
        title: 'Level 1: Hello World Protocol – Foundations & Your First Game',
        xpRequired: 0,
        isUnlocked: true,
        isCompleted: false,
        tasks: [
          {
            id: 'gd_1_1',
            title: 'Lesson 1: Game Development Fundamentals & Your First Engine',
            xp: 15,
            isCompleted: false,
            type: 'video',
            description: 'Learn what game development actually is: how game loops work, why frame rates matter, and the mental model behind every game.',
            resources: [
              'https://www.youtube.com/c/Brackeys/videos',
              'https://www.youtube.com/watch?v=LOhfqjmasi0',
              'https://unity.com/learn',
              'https://docs.godotengine.org/en/stable/getting_started/step_by_step/index.html'
            ],
          },
          {
            id: 'gd_1_2',
            title: 'Mini-Project: "Hello, Game World"',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Create a 2D scene in your chosen engine with a moving character that responds to keyboard input.',
            resources: [],
          },
          {
            id: 'gd_1_3',
            title: 'Lesson 2: Understanding Collisions, Physics & Game State',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Learn collision detection, physics bodies, and how games track state.',
            resources: [
              'https://www.youtube.com/watch?v=AmGSEH7QcDg',
              'https://www.youtube.com/watch?v=MiPkcTaRbfQ',
              'https://docs.godotengine.org/en/stable/tutorials/physics/using_2d_characters/index.html'
            ],
          },
          {
            id: 'gd_1_4',
            title: 'Mini-Project: "Collision Detective"',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Build a simple scene where your character collides with obstacles and the game prints a message when collision occurs.',
            resources: [],
          },
          {
            id: 'gd_1_5',
            title: 'Lesson 3: Game Loops, Framerate & Time Management',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Every frame, the game does the same thing: read input → update game logic → render graphics. Learn delta time and state tracking.',
            resources: [
              'https://www.youtube.com/c/Brackeys/videos',
              'https://www.gamedev.net',
              'https://www.pygame.org/wiki/tutorials'
            ],
          },
          {
            id: 'gd_1_6',
            title: 'Mini-Project: "Smooth Movement Simulator"',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Create a character that moves smoothly at 100 pixels/second regardless of framerate, using delta time.',
            resources: [],
          },
          {
            id: 'gd_1_7',
            title: 'Lesson 4: Sprites, Animation & Visual Polish',
            xp: 15,
            isCompleted: false,
            type: 'video',
            description: 'Learn how to import sprites, set up sprite sheets, animate characters, and use camera systems.',
            resources: [
              'https://www.youtube.com/@Brackeys',
              'https://www.youtube.com/watch?v=S8lMTwSRoRg',
              'https://kenney.nl/assets'
            ],
          },
          {
            id: 'gd_1_8',
            title: 'Mini-Project: "Animated Character"',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Import a sprite sheet, set up idle and run animations, and trigger them based on input.',
            resources: ['https://kenney.nl/assets'],
          },
          {
            id: 'gd_1_9',
            title: 'CAPSTONE: "The Console Commander"',
            xp: 400,
            isCompleted: false,
            type: 'project',
            description: 'Create a playable, feature-complete arcade game (Pong, Space Invaders, Flappy Bird, Snake, or Breakout) and publish to itch.io.',
            resources: [
              'https://kenney.nl/assets',
              'https://opengameart.org',
              'https://itch.io'
            ],
          },
        ],
      },

      // LEVEL 2: Game Systems Architect – Mechanics, UI & Feedback Loops (800 XP)
      {
        id: 2,
        title: 'Level 2: Game Systems Architect – Mechanics, UI & Feedback Loops',
        xpRequired: 650,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'gd_2_1',
            title: 'Lesson 1: Designing & Implementing Game Mechanics',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'A mechanic is a rule of interaction. Learn how mechanics create feedback loops and understand balance.',
            resources: [
              'https://www.youtube.com/c/GameDevUnlocked/videos',
              'https://www.youtube.com/watch?v=4kg2N-t2tWI'
            ],
          },
          {
            id: 'gd_2_2',
            title: 'Mini-Project: "Mechanic Prototype"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Design and prototype ONE game mechanic on paper, then code it.',
            resources: [],
          },
          {
            id: 'gd_2_3',
            title: 'Lesson 2: UI, Menus & Scene Management',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Learn to build UI that feels responsive and clear. Master scene transitions from main menu to gameplay to game over.',
            resources: [
              'https://www.youtube.com/@Brackeys',
              'https://www.youtube.com/watch?v=S8lMTwSRoRg',
              'https://www.youtube.com/c/CodeMonkey',
              'https://docs.godotengine.org/en/stable/tutorials/ui/basics_of_gui.html'
            ],
          },
          {
            id: 'gd_2_4',
            title: 'Mini-Project: "Main Menu & Scene Switcher"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Build a main menu with buttons that navigate to different scenes (Gameplay, Settings, Credits).',
            resources: [],
          },
          {
            id: 'gd_2_5',
            title: 'Lesson 3: Audio Integration & Sound Design Basics',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Sound is 50% of the game experience. Learn to source free audio, implement sound effects and music, and mix volumes.',
            resources: [
              'https://www.youtube.com/@Brackeys',
              'https://www.youtube.com/watch?v=S8lMTwSRoRg',
              'https://freesound.org',
              'https://opengameart.org'
            ],
          },
          {
            id: 'gd_2_6',
            title: 'Mini-Project: "Audio Mixer"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Add background music and 3 sound effects to your Level 1 game.',
            resources: [
              'https://freesound.org',
              'https://opengameart.org'
            ],
          },
          {
            id: 'gd_2_7',
            title: 'Lesson 4: Level Design, Difficulty Curves & Player Progression',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Good level design teaches the player gradually. Learn to design level progression that respects the player\'s growing skill.',
            resources: [
              'https://www.youtube.com/c/GameDevUnlocked/videos',
              'https://www.youtube.com/@Brackeys'
            ],
          },
          {
            id: 'gd_2_8',
            title: 'Mini-Project: "Three-Level Gauntlet"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Design and build 3 levels of increasing difficulty.',
            resources: [],
          },
          {
            id: 'gd_2_9',
            title: 'CAPSTONE: "The Arcade Architect"',
            xp: 500,
            isCompleted: false,
            type: 'project',
            description: 'Create a complete, publishable single-player arcade or platformer game with progression, menus, sound, and polish. Publish to itch.io.',
            resources: [
              'https://kenney.nl/assets',
              'https://freesound.org',
              'https://itch.io'
            ],
          },
        ],
      },

      // LEVEL 3: Master Programmer – Intermediate Systems, Architecture & Multiplayer (900 XP)
      {
        id: 3,
        title: 'Level 3: Master Programmer – Intermediate Systems, Architecture & Multiplayer',
        xpRequired: 1450,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'gd_3_1',
            title: 'Lesson 1: Code Architecture, Refactoring & Best Practices',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Learn design patterns (MVC, Observer, Object Pool), separation of concerns, and when to refactor.',
            resources: [
              'https://www.youtube.com/watch?v=4kg2N-t2tWI',
              'https://www.youtube.com/c/GameDevUnlocked/videos',
              'https://www.youtube.com/@Brackeys'
            ],
          },
          {
            id: 'gd_3_2',
            title: 'Mini-Project: "Refactor Your Level 2 Game"',
            xp: 90,
            isCompleted: false,
            type: 'project',
            description: 'Take your Level 2 game and refactor ONE system into a clean, reusable module.',
            resources: [],
          },
          {
            id: 'gd_3_3',
            title: 'Lesson 2: AI & Enemy Behavior',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Learn to code AI that adapts: enemies that pursue, patrol, flee, or use state machines.',
            resources: [
              'https://www.youtube.com/@Brackeys',
              'https://www.youtube.com/c/CodeMonkey',
              'https://www.youtube.com/c/SebastianLague'
            ],
          },
          {
            id: 'gd_3_4',
            title: 'Mini-Project: "Chase AI"',
            xp: 90,
            isCompleted: false,
            type: 'project',
            description: 'Code an enemy that chases the player when within range, otherwise patrols.',
            resources: [],
          },
          {
            id: 'gd_3_5',
            title: 'Lesson 3: Multiplayer Basics & Networking Fundamentals',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Focus on local multiplayer (split-screen or turn-based) to learn state synchronization and input handling.',
            resources: [
              'https://www.youtube.com/@Brackeys',
              'https://docs.godotengine.org/en/stable/tutorials/networking/index.html'
            ],
          },
          {
            id: 'gd_3_6',
            title: 'Mini-Project: "Split-Screen Platformer"',
            xp: 90,
            isCompleted: false,
            type: 'project',
            description: 'Build a 2-player split-screen game where both players see their own view of the world.',
            resources: [],
          },
          {
            id: 'gd_3_7',
            title: 'Lesson 4: Advanced Physics & Procedural Generation',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Choose your path: Advanced Physics (ragdoll, vehicle physics, particles) OR Procedural Generation (random level generation).',
            resources: [
              'https://www.youtube.com/c/CodeMonkey',
              'https://www.youtube.com/c/SebastianLague'
            ],
          },
          {
            id: 'gd_3_8',
            title: 'Mini-Project: Physics or Procedural Gen',
            xp: 90,
            isCompleted: false,
            type: 'project',
            description: 'Physics Path: Create a vehicle with realistic weight. Procedural Gen Path: Generate a simple 2D dungeon.',
            resources: [],
          },
          {
            id: 'gd_3_9',
            title: 'CAPSTONE: "The Systems Engineer"',
            xp: 500,
            isCompleted: false,
            type: 'project',
            description: 'Build a game showcasing 2+ advanced systems (AI + multiplayer, Physics + procedural gen, etc.). Publish to itch.io and GitHub.',
            resources: [
              'https://itch.io',
              'https://github.com'
            ],
          },
        ],
      },

      // LEVEL 4: Game Artist & Designer – Visual Polish, Narrative & Production Quality (900 XP)
      {
        id: 4,
        title: 'Level 4: Game Artist & Designer – Visual Polish, Narrative & Production Quality',
        xpRequired: 2350,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'gd_4_1',
            title: 'Lesson 1: Visual Aesthetics, Shader Basics & Advanced Animation',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Learn color theory, composition, shader programming (custom visual effects), and rigging/skeletal animation.',
            resources: [
              'https://www.youtube.com/@BlenderGuru',
              'https://www.youtube.com/watch?v=S8lMTwSRoRg',
              'https://www.youtube.com/c/TheChernoProject',
              'https://www.youtube.com/@Brackeys'
            ],
          },
          {
            id: 'gd_4_2',
            title: 'Mini-Project: "Shader Playground"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Create 3 custom shader effects (glow, color shift, screen warp).',
            resources: [],
          },
          {
            id: 'gd_4_3',
            title: 'Lesson 2: Narrative Design, Dialogue Systems & Story',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Learn branching dialogue systems, environmental storytelling, and pacing.',
            resources: [
              'https://www.youtube.com/c/GameDevUnlocked/videos',
              'https://www.youtube.com/c/CodeMonkey',
              'https://twinery.org/'
            ],
          },
          {
            id: 'gd_4_4',
            title: 'Mini-Project: "Story Tree"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Design a 2-3 minute narrative with branching dialogue. Map it in Twine or on paper.',
            resources: ['https://twinery.org/'],
          },
          {
            id: 'gd_4_5',
            title: 'Lesson 3: Audio Production, Music Composition & Sound Design Mastery',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Learn audio mixing, music composition, foley, and spatial audio.',
            resources: [
              'https://www.youtube.com/c/GameDevUnlocked/videos',
              'https://www.audacityteam.org/',
              'https://freesound.org'
            ],
          },
          {
            id: 'gd_4_6',
            title: 'Mini-Project: "Audio Design Suite"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Record/edit 5 foley sounds and create a simple audio mixing setup for your game.',
            resources: [
              'https://www.audacityteam.org/',
              'https://freesound.org'
            ],
          },
          {
            id: 'gd_4_7',
            title: 'Lesson 4: Marketing, Portfolio & Launch Strategy',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Learn marketing fundamentals: GIFs/trailers, social media, game jams, press kits, and community engagement.',
            resources: [
              'https://www.youtube.com/c/GameDevUnlocked/videos',
              'https://www.youtube.com/c/JonasTyroller',
              'https://obsproject.com/'
            ],
          },
          {
            id: 'gd_4_8',
            title: 'Mini-Project: "Portfolio Audit"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Review your itch.io profile and games. Create a marketing document for one game.',
            resources: ['https://itch.io'],
          },
          {
            id: 'gd_4_9',
            title: 'CAPSTONE: "The Visionary Developer"',
            xp: 600,
            isCompleted: false,
            type: 'project',
            description: 'Design and execute an indie game of YOUR design that is visually polished, narratively engaging, and market-ready (30-60 min of content). Get 10+ playtesters to provide feedback.',
            resources: [
              'https://itch.io',
              'https://obsproject.com/',
              'https://kenney.nl/assets'
            ],
          },
        ],
      },

      // LEVEL 5: Deployment & Portfolio – Shipping, Marketing & Professional Presence (850 XP)
      {
        id: 5,
        title: 'Level 5: Deployment & Portfolio – Shipping, Marketing & Professional Presence',
        xpRequired: 3250,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'gd_5_1',
            title: 'Lesson 1: Steam Publishing, Platform Requirements & Build Processes',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Learn Steam publishing pipeline: Steamworks, build signing, platform-specific tweaks, DRM, achievements, and community hubs.',
            resources: [
              'https://www.youtube.com/c/GameDevUnlocked/videos',
              'https://partner.steamgames.com/'
            ],
          },
          {
            id: 'gd_5_2',
            title: 'Mini-Project: "Build Pipeline"',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Build your Level 4 game for Windows, macOS, and Linux. Test each build.',
            resources: [],
          },
          {
            id: 'gd_5_3',
            title: 'Lesson 2: Portfolio Website, GitHub Presence & Professional Branding',
            xp: 10,
            isCompleted: false,
            type: 'article',
            description: 'Create a professional portfolio website (GitHub Pages is free), write compelling README files, and establish consistent personal branding.',
            resources: [
              'https://www.youtube.com/c/JonasTyroller',
              'https://pages.github.com/'
            ],
          },
          {
            id: 'gd_5_4',
            title: 'Mini-Project: "Portfolio Website"',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Create a simple portfolio site listing all your games with links, screenshots, and descriptions.',
            resources: ['https://pages.github.com/'],
          },
          {
            id: 'gd_5_5',
            title: 'Lesson 3: Community Engagement, Networking & Job Readiness',
            xp: 10,
            isCompleted: false,
            type: 'article',
            description: 'Learn to contribute to open-source game projects, engage on Discord/Reddit, attend game jams, and network.',
            resources: [
              'https://www.youtube.com/c/GameDevUnlocked/videos',
              'https://www.youtube.com/c/JonasTyroller',
              'https://discord.gg/reddit-gamedev',
              'https://ldjam.com'
            ],
          },
          {
            id: 'gd_5_6',
            title: 'Mini-Project: "Contribute to Open Source"',
            xp: 55,
            isCompleted: false,
            type: 'project',
            description: 'Contribute one meaningful PR (pull request) to an open-source game project.',
            resources: ['https://github.com'],
          },
          {
            id: 'gd_5_7',
            title: 'Lesson 4: Indie Developer Sustainability & Long-Term Career Planning',
            xp: 10,
            isCompleted: false,
            type: 'video',
            description: 'Understand business: pricing strategy, live service models, funding, taxes, and work-life balance.',
            resources: [
              'https://www.youtube.com/c/GameDevUnlocked/videos',
              'https://www.youtube.com/c/CodeMonkey'
            ],
          },
          {
            id: 'gd_5_8',
            title: 'Mini-Project: "Business Plan"',
            xp: 55,
            isCompleted: false,
            type: 'project',
            description: 'Write a 1-2 page business plan for a game you\'d make professionally.',
            resources: [],
          },
          {
            id: 'gd_5_9',
            title: 'CAPSTONE: "The Professional Indie Developer"',
            xp: 600,
            isCompleted: false,
            type: 'project',
            description: 'Ship your Level 4 game to Steam (or secure funding/publisher deal), build professional presence, and get hired or establish yourself as indie with sustainable revenue.',
            resources: [
              'https://partner.steamgames.com/',
              'https://pages.github.com/',
              'https://itch.io',
              'https://linkedin.com/jobs'
            ],
          },
        ],
      },
    ],
  },
  'Game Asset Artist': {
    targetRole: 'Game Asset Artist (3D & Environment)',
    selectedTrack: 'Game Asset Artist',
    totalXP: 3050,
    currentXP: 0,
    currentLevel: 1,
    levels: [
      // LEVEL 1: Foundation Fundamentals (520 XP)
      {
        id: 1,
        title: 'Level 1: Foundation Fundamentals - The Modeler\'s Awakening',
        xpRequired: 0,
        isUnlocked: true,
        isCompleted: false,
        tasks: [
          {
            id: 'gaa_1_1',
            title: 'Lesson 1: Blender Interface & First Render',
            xp: 60,
            isCompleted: false,
            type: 'video',
            description: 'Learn Blender\'s workspace, navigation controls, basic object manipulation, and how to render your first 3D scene.',
            resources: [
              'https://www.blender.org/download/',
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_1_2',
            title: 'Mini-Project: "Your First Render"',
            xp: 60,
            isCompleted: false,
            type: 'project',
            description: 'Create a simple scene with multiple objects, change materials, and render a final image.',
            resources: [],
          },
          {
            id: 'gaa_1_3',
            title: 'Lesson 2: Basic Modeling – Box Modeling Fundamentals',
            xp: 70,
            isCompleted: false,
            type: 'video',
            description: 'Learn the foundational "box modeling" technique: adding edge loops, extruding faces, and using subdivision surfaces.',
            resources: [
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_1_4',
            title: 'Mini-Project: "Model a Simple Mug"',
            xp: 70,
            isCompleted: false,
            type: 'project',
            description: 'Model a basic ceramic mug using box modeling and subdivision surfaces.',
            resources: [],
          },
          {
            id: 'gaa_1_5',
            title: 'Lesson 3: Introduction to Sculpting Mode',
            xp: 65,
            isCompleted: false,
            type: 'video',
            description: 'Explore Blender\'s Sculpting workspace. Learn basic brushes (Draw, Smooth, Grab), symmetry toggle, and organic detail.',
            resources: [
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_1_6',
            title: 'Mini-Project: "Sculpt a Stone"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Create a realistic stone using sculpting brushes and texture.',
            resources: [],
          },
          {
            id: 'gaa_1_7',
            title: 'Lesson 4: UV Mapping 101',
            xp: 70,
            isCompleted: false,
            type: 'video',
            description: 'Understand UV coordinates, learn seaming, unwrapping, and avoiding stretching—critical for all game assets.',
            resources: [
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_1_8',
            title: 'Mini-Project: "UV Unwrap a Box"',
            xp: 70,
            isCompleted: false,
            type: 'project',
            description: 'Properly UV unwrap a cubic object with minimal stretching.',
            resources: [],
          },
          {
            id: 'gaa_1_9',
            title: 'CAPSTONE: "The Ceramic Mug Collection"',
            xp: 350,
            isCompleted: false,
            type: 'project',
            description: 'Create three distinct mug variations for a cozy apartment game. Export to FBX, test in Unreal Engine 5, and upload to ArtStation.',
            resources: [
              'https://www.blender.org/download/',
              'https://www.unrealengine.com/download',
              'https://www.artstation.com/',
              'https://polyhaven.com/'
            ],
          },
        ],
      },

      // LEVEL 2: Sculpting & Character Assets (580 XP)
      {
        id: 2,
        title: 'Level 2: Sculpting & Character Assets - The Sculptor\'s Evolution',
        xpRequired: 520,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'gaa_2_1',
            title: 'Lesson 1: Advanced Sculpting Techniques',
            xp: 60,
            isCompleted: false,
            type: 'video',
            description: 'Learn advanced brushes (Crease, Pinch, Drawsharp), dynamic topology, and professional sculpting workflows.',
            resources: [
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_2_2',
            title: 'Mini-Project: "Sculpt a Character Head Blockout"',
            xp: 60,
            isCompleted: false,
            type: 'project',
            description: 'Create a stylized human head using sculpting, focusing on proportions and basic anatomy.',
            resources: [],
          },
          {
            id: 'gaa_2_3',
            title: 'Lesson 2: Retopology for Game Assets',
            xp: 70,
            isCompleted: false,
            type: 'video',
            description: 'Learn manual retopology, poly flow principles, using PolyQuilt addon, and ensuring clean topology for rigging.',
            resources: [
              'https://github.com/Dangry98/PolyQuilt-for-Blender-4.0',
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_2_4',
            title: 'Mini-Project: "Retopologize Your Head Sculpt"',
            xp: 70,
            isCompleted: false,
            type: 'project',
            description: 'Create a clean, game-ready topology over your high-poly head using PolyQuilt addon.',
            resources: ['https://github.com/Dangry98/PolyQuilt-for-Blender-4.0'],
          },
          {
            id: 'gaa_2_5',
            title: 'Lesson 3: Baking High-Poly Details to Normal Maps',
            xp: 65,
            isCompleted: false,
            type: 'video',
            description: 'Learn texture baking: converting high-polygon sculpt details into texture maps for low-poly geometry.',
            resources: [
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_2_6',
            title: 'Mini-Project: "Bake Normal Map from Head Sculpt"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Create a normal map from your high-poly head sculpt to apply to the low-poly retopo mesh.',
            resources: [],
          },
          {
            id: 'gaa_2_7',
            title: 'Lesson 4: Texturing Characters – Base Color & Skin Tones',
            xp: 65,
            isCompleted: false,
            type: 'video',
            description: 'Learn PBR principles for character textures. Create believable skin tones and understand subsurface scattering.',
            resources: [
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_2_8',
            title: 'Mini-Project: "Paint a Character Head Base Color"',
            xp: 65,
            isCompleted: false,
            type: 'project',
            description: 'Create a realistic skin tone texture using Blender\'s Texture Paint mode.',
            resources: [],
          },
          {
            id: 'gaa_2_9',
            title: 'CAPSTONE: "The Character Sculpture"',
            xp: 380,
            isCompleted: false,
            type: 'project',
            description: 'Create a character bust for a narrative game. High-poly sculpt with retopology, texture baking, and full PBR materials. Upload to ArtStation.',
            resources: [
              'https://www.artstation.com/',
              'https://www.unrealengine.com/download',
              'https://polyhaven.com/'
            ],
          },
        ],
      },

      // LEVEL 3: Environment Assets & Optimization (620 XP)
      {
        id: 3,
        title: 'Level 3: Environment Assets & Optimization - The World Builder',
        xpRequired: 1100,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'gaa_3_1',
            title: 'Lesson 1: Modular Game Asset Design',
            xp: 75,
            isCompleted: false,
            type: 'video',
            description: 'Learn professional workflow for creating reusable environmental assets. Understand modular design, grid alignment, and kit-based systems.',
            resources: [
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_3_2',
            title: 'Mini-Project: "Create a Modular Wall Kit"',
            xp: 75,
            isCompleted: false,
            type: 'project',
            description: 'Design and model three modular wall pieces that snap together to form cohesive environments.',
            resources: [],
          },
          {
            id: 'gaa_3_3',
            title: 'Lesson 2: Performance Optimization & Polygon Budgeting',
            xp: 70,
            isCompleted: false,
            type: 'video',
            description: 'Learn how to optimize assets for real-time rendering: LODs, texture atlasing, polygon budgeting, and profiling tools.',
            resources: [
              'https://www.unrealengine.com/download'
            ],
          },
          {
            id: 'gaa_3_4',
            title: 'Mini-Project: "Optimize an Asset for Mobile & Console"',
            xp: 70,
            isCompleted: false,
            type: 'project',
            description: 'Take an over-detailed asset and create three LOD versions for different platforms.',
            resources: [],
          },
          {
            id: 'gaa_3_5',
            title: 'Lesson 3: Lighting for Game Environments',
            xp: 70,
            isCompleted: false,
            type: 'video',
            description: 'Understand real-time lighting in game engines. Learn key light, fill light, and rim light setups.',
            resources: [
              'https://www.unrealengine.com/download'
            ],
          },
          {
            id: 'gaa_3_6',
            title: 'Mini-Project: "Light a Simple Interior Scene"',
            xp: 70,
            isCompleted: false,
            type: 'project',
            description: 'Create a well-lit interior scene using only 3-4 light sources, demonstrating professional lighting setup.',
            resources: [],
          },
          {
            id: 'gaa_3_7',
            title: 'Lesson 4: Advanced UV Optimization & Texture Atlasing',
            xp: 70,
            isCompleted: false,
            type: 'video',
            description: 'Master UV packing for modular environments. Learn texture atlasing to reduce draw calls and improve performance.',
            resources: [
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_3_8',
            title: 'Mini-Project: "Pack Multiple Assets into One Texture Atlas"',
            xp: 70,
            isCompleted: false,
            type: 'project',
            description: 'UV pack three different modular wall pieces onto a single 2048x2048 texture map efficiently.',
            resources: [],
          },
          {
            id: 'gaa_3_9',
            title: 'CAPSTONE: "The Complete Game Environment"',
            xp: 395,
            isCompleted: false,
            type: 'project',
            description: 'Create a complete playable warehouse scene for an indie stealth-puzzle game. Modular asset kit optimized for console and PC. Upload to ArtStation.',
            resources: [
              'https://www.unrealengine.com/download',
              'https://www.artstation.com/',
              'https://polyhaven.com/',
              'https://sketchfab.com/'
            ],
          },
        ],
      },

      // LEVEL 4: Advanced Texturing & Real-Time Rendering (650 XP)
      {
        id: 4,
        title: 'Level 4: Advanced Texturing & Real-Time Rendering - The Master Renderer',
        xpRequired: 1720,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'gaa_4_1',
            title: 'Lesson 1: Substance Painter Workflow (Free Alternatives)',
            xp: 75,
            isCompleted: false,
            type: 'video',
            description: 'Learn industry-standard texturing using free alternatives: Quixel Mixer, Material Maker, and Blender\'s native texturing.',
            resources: [
              'https://www.youtube.com/@blenderguru',
              'https://polyhaven.com/'
            ],
          },
          {
            id: 'gaa_4_2',
            title: 'Mini-Project: "Texture a Prop in Quixel Mixer"',
            xp: 75,
            isCompleted: false,
            type: 'project',
            description: 'Use Quixel Mixer (free layer-based texturing) to texture a simple game prop with realistic weathering.',
            resources: [],
          },
          {
            id: 'gaa_4_3',
            title: 'Lesson 2: Advanced Normal Map Techniques & Curvature',
            xp: 75,
            isCompleted: false,
            type: 'video',
            description: 'Go beyond basic normal maps. Learn height to normal conversion, curvature maps, cavity maps, and combining multiple texture sources.',
            resources: [
              'https://www.youtube.com/@blenderguru'
            ],
          },
          {
            id: 'gaa_4_4',
            title: 'Mini-Project: "Create a Procedural Weathered Metal Texture"',
            xp: 75,
            isCompleted: false,
            type: 'project',
            description: 'Use Blender\'s Shader Editor to create a procedurally-generated weathered metal texture with rust and patina.',
            resources: [],
          },
          {
            id: 'gaa_4_5',
            title: 'Lesson 3: Real-Time Rendering Mastery in Game Engines',
            xp: 70,
            isCompleted: false,
            type: 'video',
            description: 'Master Unreal Engine 5\'s rendering: Lumen, Nanite, ray tracing, and post-processing for publication-quality renders.',
            resources: [
              'https://www.unrealengine.com/download'
            ],
          },
          {
            id: 'gaa_4_6',
            title: 'Mini-Project: "Render a Hero Shot of Your Asset"',
            xp: 70,
            isCompleted: false,
            type: 'project',
            description: 'Create a publication-quality render of one of your Level 3 assets using UE5\'s advanced rendering features.',
            resources: ['https://www.unrealengine.com/download'],
          },
          {
            id: 'gaa_4_7',
            title: 'Lesson 4: Portfolio Curation & Presentation',
            xp: 75,
            isCompleted: false,
            type: 'article',
            description: 'Learn how to present your work professionally. Understand what studios look for in portfolios and ArtStation setup.',
            resources: [
              'https://www.artstation.com/',
              'https://www.artstation.com/jobs'
            ],
          },
          {
            id: 'gaa_4_8',
            title: 'Mini-Project: "Curate a Professional ArtStation Portfolio"',
            xp: 75,
            isCompleted: false,
            type: 'project',
            description: 'Create a polished ArtStation profile and upload 3-5 of your best assets with professional descriptions.',
            resources: ['https://www.artstation.com/'],
          },
          {
            id: 'gaa_4_9',
            title: 'CAPSTONE: "The Professional Portfolio Piece"',
            xp: 415,
            isCompleted: false,
            type: 'project',
            description: 'Create a showstopper hero asset: a futuristic holographic kiosk for a cyberpunk game. Full production pipeline from concept to UE5 showcase.',
            resources: [
              'https://www.unrealengine.com/download',
              'https://www.artstation.com/',
              'https://polyhaven.com/',
              'https://sketchfab.com/'
            ],
          },
        ],
      },

      // LEVEL 5: Industry Mastery & Career Launch (680 XP)
      {
        id: 5,
        title: 'Level 5: Industry Mastery & Career Launch - The Professional Artist',
        xpRequired: 2370,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'gaa_5_1',
            title: 'Lesson 1: Career Path Specializations',
            xp: 75,
            isCompleted: false,
            type: 'article',
            description: 'Understand industry specializations: Environment Artist, Character Artist, Prop Artist, Technical Artist. Choose your niche.',
            resources: [
              'https://www.artstation.com/jobs',
              'https://jobs.gdconf.com/',
              'https://www.linkedin.com/jobs'
            ],
          },
          {
            id: 'gaa_5_2',
            title: 'Mini-Project: "Define Your Specialization & Write a Professional Bio"',
            xp: 75,
            isCompleted: false,
            type: 'project',
            description: 'Choose your specialization and create a polished professional bio and resume.',
            resources: [],
          },
          {
            id: 'gaa_5_3',
            title: 'Lesson 2: Freelancing & Contract Work',
            xp: 70,
            isCompleted: false,
            type: 'article',
            description: 'Learn the freelance game artist landscape. Understand platforms, pricing, contracts, and finding consistent work.',
            resources: [
              'https://www.artstation.com/jobs',
              'https://polycount.com/'
            ],
          },
          {
            id: 'gaa_5_4',
            title: 'Mini-Project: "Create a Freelance Profile & Pitch Portfolio"',
            xp: 70,
            isCompleted: false,
            type: 'project',
            description: 'Set up a freelance presence and prepare pitch materials for potential clients.',
            resources: [],
          },
          {
            id: 'gaa_5_5',
            title: 'Lesson 3: Networking & Community Engagement',
            xp: 75,
            isCompleted: false,
            type: 'article',
            description: 'Build your professional network. Understand online communities (Polycount, Discord servers) and how relationships lead to opportunities.',
            resources: [
              'https://polycount.com/',
              'https://www.artstation.com/',
              'https://forums.cgsociety.org/'
            ],
          },
          {
            id: 'gaa_5_6',
            title: 'Mini-Project: "Participate Authentically in 2-3 Communities"',
            xp: 75,
            isCompleted: false,
            type: 'project',
            description: 'Build genuine community presence and make industry connections.',
            resources: [
              'https://polycount.com/',
              'https://www.artstation.com/'
            ],
          },
          {
            id: 'gaa_5_7',
            title: 'Lesson 4: Job Search Strategy & Interview Prep',
            xp: 75,
            isCompleted: false,
            type: 'article',
            description: 'Master job search techniques, portfolio optimization for specific studios, and interview preparation.',
            resources: [
              'https://www.artstation.com/jobs',
              'https://jobs.gdconf.com/',
              'https://www.linkedin.com/jobs'
            ],
          },
          {
            id: 'gaa_5_8',
            title: 'Mini-Project: "Research & Apply to 3 Target Studios"',
            xp: 75,
            isCompleted: false,
            type: 'project',
            description: 'Identify dream studios and prepare tailored applications.',
            resources: [],
          },
          {
            id: 'gaa_5_9',
            title: 'CAPSTONE: "Your Signature Asset Series"',
            xp: 445,
            isCompleted: false,
            type: 'project',
            description: 'Create a cohesive signature series of five assets: hard-surface prop, character bust, environment diorama, optimization challenge, and personal passion project.',
            resources: [
              'https://www.unrealengine.com/download',
              'https://www.artstation.com/',
              'https://polyhaven.com/',
              'https://sketchfab.com/',
              'https://www.artstation.com/jobs'
            ],
          },
        ],
      },
    ],
  },
  'Content Creation': {
    targetRole: 'Content Creator (Streaming & Community)',
    selectedTrack: 'Content Creation',
    totalXP: 3600,
    currentXP: 0,
    currentLevel: 1,
    levels: [
      // LEVEL 1: Content Foundations & Platform Mastery (650 XP)
      {
        id: 1,
        title: 'Level 1: Content Foundations & Platform Mastery',
        xpRequired: 0,
        isUnlocked: true,
        isCompleted: false,
        tasks: [
          {
            id: 'cc_1_1',
            title: 'Lesson 1.1: The Creator Economy & Platform Landscape',
            xp: 45,
            isCompleted: false,
            type: 'video',
            description: 'Explore how creators monetize across YouTube, Twitch, TikTok, and Instagram. Understand revenue models, audience psychology, and the creator economy\'s $250B market.',
            resources: [
              'https://www.youtube.com/watch?v=9J2fiiNDPCk',
              'https://www.youtube.com/watch?v=h_zufeAL-xQ',
              'https://www.coursera.org/articles/content-creator-salary'
            ],
          },
          {
            id: 'cc_1_2',
            title: 'Mini-Project 1.1: Creator Persona Development',
            xp: 40,
            isCompleted: false,
            type: 'project',
            description: 'Define your content niche and platform strategy. Research 5 creators, document their metrics, and create a 1-page "Creator Profile" outlining your niche, target platforms, content pillars, and posting schedule.',
            resources: [],
          },
          {
            id: 'cc_1_3',
            title: 'Lesson 1.2: Mastering YouTube Fundamentals',
            xp: 40,
            isCompleted: false,
            type: 'video',
            description: 'YouTube is the #1 platform for long-form content creators. Learn channel setup, optimization, SEO best practices, and the algorithm. Discover why Watch Time and Click-Through Rate (CTR) drive success.',
            resources: [
              'https://www.youtube.com/watch?v=SrJOE2pEp7A',
              'https://onewrk.com/youtube-channel-growth-guide-2025/'
            ],
          },
          {
            id: 'cc_1_4',
            title: 'Mini-Project 1.2: YouTube Channel Setup & Optimization',
            xp: 45,
            isCompleted: false,
            type: 'project',
            description: 'Create a fully optimized YouTube channel: add channel art (1920x1080px), profile picture (800x800px), channel description with keywords, and organize playlist structure for your content pillars.',
            resources: [],
          },
          {
            id: 'cc_1_5',
            title: 'Lesson 1.3: Introduction to Video Editing & DaVinci Resolve',
            xp: 35,
            isCompleted: false,
            type: 'video',
            description: 'DaVinci Resolve is industry-standard and free. Master timeline editing, basic cuts, audio sync, text overlays, and transitions. Learn the three-stage editing workflow: rough cut → refine → deliver.',
            resources: [
              'https://www.youtube.com/watch?v=mdfMztoP840',
              'https://www.youtube.com/watch?v=SrJOE2pEp7A',
              'https://www.blackmagicdesign.com/products/davinciresolve/'
            ],
          },
          {
            id: 'cc_1_6',
            title: 'Mini-Project 1.3: Edit Your First Video',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Import raw footage, cut it to 2–3 minutes, add transitions, add background music from StreamBeats, and export as MP4 at 1080p using DaVinci Resolve.',
            resources: ['https://www.streambeats.com/'],
          },
          {
            id: 'cc_1_7',
            title: 'Lesson 1.4: Thumbnail Psychology & Design Fundamentals',
            xp: 40,
            isCompleted: false,
            type: 'video',
            description: 'Thumbnails drive 35–50% higher CTR when designed correctly. Learn the psychology of colors, facial expressions, contrast, and text hierarchy. Canva makes professional thumbnails accessible to beginners.',
            resources: [
              'https://www.youtube.com/watch?v=lGRaYyJsZJo',
              'https://www.youtube.com/watch?v=awTgEQRZzfA',
              'https://1of10.com/blog/the-psychology-behind-high-ctr-thumbnails/',
              'https://www.canva.com/'
            ],
          },
          {
            id: 'cc_1_8',
            title: 'Mini-Project 1.4: Create 5 Thumbnail Variations',
            xp: 55,
            isCompleted: false,
            type: 'project',
            description: 'Design 5 unique YouTube thumbnails using Canva\'s free tier with different color schemes, expressive faces/emojis, high contrast, and 1–3 words max.',
            resources: ['https://www.canva.com/youtube-thumbnails/templates/'],
          },
          {
            id: 'cc_1_9',
            title: 'CAPSTONE 1: Foundation Portfolio',
            xp: 300,
            isCompleted: false,
            type: 'project',
            description: 'Launch Your Creator Foundation: Produce one complete YouTube video (2–5 minutes) that serves as your portfolio piece. Set up your channel, script outline, record 10–15 min footage, edit in DaVinci Resolve, create 3 thumbnail variations, and upload to YouTube. This video should introduce your channel and demonstrate basic editing competence.',
            resources: [],
          },
        ],
      },
      // LEVEL 2: Streaming Mastery & Live Engagement (700 XP)
      {
        id: 2,
        title: 'Level 2: Streaming Mastery & Live Engagement',
        xpRequired: 650,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'cc_2_1',
            title: 'Lesson 2.1: OBS Studio Setup & Live Streaming Fundamentals',
            xp: 35,
            isCompleted: false,
            type: 'video',
            description: 'OBS (Open Broadcaster Software) is the industry-standard free streaming tool. Master scenes, sources, settings, and encoder optimization. Learn how to balance quality vs. performance on different upload speeds.',
            resources: [
              'https://www.youtube.com/watch?v=9z9GiEM4uvA',
              'https://blendvision.com/en/blog/obs-live-streaming-tutorial-for-beginners',
              'https://obsproject.com/wiki/'
            ],
          },
          {
            id: 'cc_2_2',
            title: 'Mini-Project 2.1: Build Your OBS Profile',
            xp: 40,
            isCompleted: false,
            type: 'project',
            description: 'Create a fully configured OBS workspace ready for your first stream. Create 3 scenes: Main Game/Content, Webcam + Chat, Branding/Break Screen. Configure Output Settings with proper bitrate.',
            resources: [],
          },
          {
            id: 'cc_2_3',
            title: 'Lesson 2.2: Streaming Platform Strategy (Twitch vs. YouTube Live)',
            xp: 40,
            isCompleted: false,
            type: 'video',
            description: 'Twitch and YouTube Live serve different audiences. Learn platform algorithms, monetization requirements, and audience growth tactics. Understand Twitch Affiliate vs. Partner and YouTube Super Chat mechanics.',
            resources: [
              'https://www.nearstream.us/blog/twitch-affiliate-guide-streaming-from-home-setup-success',
              'https://www.youtube.com/watch?v=f4t-v3BENfI',
              'https://help.twitch.tv/s/article/broadcasting-guidelines'
            ],
          },
          {
            id: 'cc_2_4',
            title: 'Mini-Project 2.2: Platform Comparison & Selection',
            xp: 40,
            isCompleted: false,
            type: 'project',
            description: 'Research and document platform requirements in a comparison table. Choose your primary streaming platform, set up your account, connect OBS, and test your stream connection (go live for 5 min in test mode).',
            resources: [],
          },
          {
            id: 'cc_2_5',
            title: 'Lesson 2.3: Audience Engagement & Community Building',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'Live streaming isn\'t one-way broadcasting—it\'s real-time dialogue. Master chat engagement, shout-outs, Q&A mechanics, and viewer retention tactics. Learn Discord integration for post-stream community connection.',
            resources: [
              'https://www.youtube.com/watch?v=h_zufeAL-xQ',
              'https://www.group.app/blog/the-best-14-discord-alternatives-for-community-building/'
            ],
          },
          {
            id: 'cc_2_6',
            title: 'Mini-Project 2.3: Design Discord Community Structure',
            xp: 45,
            isCompleted: false,
            type: 'project',
            description: 'Create a Discord server with organized channels: #announcements, #intros, #general-chat, #clips, #help, #memes. Write welcome message and configure 2 roles: "Subscriber" and "Moderator" with permissions.',
            resources: [],
          },
          {
            id: 'cc_2_7',
            title: 'Lesson 2.4: Monetization Pathways & Revenue Streams',
            xp: 30,
            isCompleted: false,
            type: 'video',
            description: 'Most creators don\'t monetize with ads alone. Learn diversified revenue: Super Chat, subscriptions, sponsorships, affiliate marketing, and Patreon. Understand YouTube Partner Program requirements (1K subs, 4K hours).',
            resources: [
              'https://www.tubebuddy.com/blog/youtube-monetization-requirements/',
              'https://www.youtube.com/watch?v=NSm4Lmopgyc'
            ],
          },
          {
            id: 'cc_2_8',
            title: 'Mini-Project 2.4: Monetization Roadmap',
            xp: 45,
            isCompleted: false,
            type: 'project',
            description: 'Create a realistic 12-month monetization strategy. Research non-ad revenue sources (Amazon Associates, Patreon), calculate timeline to YouTube Partner Program eligibility, and write 1-page plan with quarterly goals.',
            resources: [],
          },
          {
            id: 'cc_2_9',
            title: 'CAPSTONE 2: First 30-Day Streaming Challenge',
            xp: 400,
            isCompleted: false,
            type: 'project',
            description: 'Consistent Live Streaming Challenge: Go live 2–3 times per week (6 total streams minimum) over 30 days to build initial audience. Each stream should have a clear theme, scheduled time, engagement strategy, stream branding, and post-stream clips. Document peak viewers, average watch duration, and collect community feedback.',
            resources: [],
          },
        ],
      },
      // LEVEL 3: Content Creation & Editing Excellence (750 XP)
      {
        id: 3,
        title: 'Level 3: Content Creation & Editing Excellence',
        xpRequired: 1350,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'cc_3_1',
            title: 'Lesson 3.1: Advanced DaVinci Resolve Techniques',
            xp: 30,
            isCompleted: false,
            type: 'video',
            description: 'Level up from basics to advanced editing: color grading, effects, multi-cam switching, keyframe animation, and audio mastering. Learn DaVinci\'s Fusion tab for visual effects (VFX) and professional polish.',
            resources: [
              'https://www.youtube.com/watch?v=mdfMztoP840',
              'https://www.blackmagicdesign.com/products/davinciresolve/'
            ],
          },
          {
            id: 'cc_3_2',
            title: 'Mini-Project 3.1: Master Multi-Layered Video Editing',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Create a 3–5 minute video using advanced techniques: import min. 2 video tracks + 2 audio tracks, apply color correction to 3+ clips, add 1 text animation with keyframes, 1 VFX transition, and audio level automation.',
            resources: [],
          },
          {
            id: 'cc_3_3',
            title: 'Lesson 3.2: YouTube Algorithm Mastery & SEO Optimization',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'YouTube\'s algorithm prioritizes watch time, click-through rate (CTR), and audience retention. Master keyword research, title optimization, tags, descriptions, and A/B testing. Learn long-tail keyword strategies.',
            resources: [
              'https://onewrk.com/youtube-channel-growth-guide-2025/',
              'https://outlierkit.com/blog/youtube-channel-growth-strategy'
            ],
          },
          {
            id: 'cc_3_4',
            title: 'Mini-Project 3.2: SEO Optimization Framework',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Create an SEO template for your videos. Research 5 long-tail keywords, create optimization template (title formula, description checklist, tag strategy), and audit & re-optimize 3 existing videos. Measure CTR and retention changes.',
            resources: [],
          },
          {
            id: 'cc_3_5',
            title: 'Lesson 3.3: Multi-Format Content Creation (Shorts, Clips, Compilations)',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'One long-form video can become 5+ pieces of short-form content. Learn how to repurpose videos into YouTube Shorts, TikTok clips, Instagram Reels, and Twitter compilations. Master pacing and platform-specific formatting.',
            resources: [
              'https://www.canva.com/youtube-thumbnails/templates/',
              'https://www.canva.com/video-editor/youtube/'
            ],
          },
          {
            id: 'cc_3_6',
            title: 'Mini-Project 3.3: Repurposing Content Workflow',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Take 1 long-form video and create 4 short-form pieces. Identify 4 highlight moments (15–30 sec each), export in vertical format (9:16), and create platform-specific edits for YouTube Shorts, TikTok, Instagram Reel, and Twitter/X.',
            resources: [],
          },
          {
            id: 'cc_3_7',
            title: 'Lesson 3.4: Collaboration & Networking in Creator Space',
            xp: 20,
            isCompleted: false,
            type: 'video',
            description: 'Collaboration accelerates growth. Learn how to pitch collaboration ideas, reach out to creators in your niche, and execute joint streams or videos. Understand the creator networking ecosystem.',
            resources: [
              'https://www.nocodeinstitute.io/post/best-freelance-gig-job-boards-to-find-work-in-2025/',
              'https://stackinfluence.com/top-ugc-creator-job-sites-2025-edition/'
            ],
          },
          {
            id: 'cc_3_8',
            title: 'Mini-Project 3.4: Collaboration Planning',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Identify 3 potential collaborators (500–50K subscribers) in your niche. Draft personalized collaboration pitch emails (300–500 words each) highlighting mutual benefit and specific video/stream idea. Send pitches and document responses.',
            resources: [],
          },
          {
            id: 'cc_3_9',
            title: 'CAPSTONE 3: Portfolio Video Series',
            xp: 450,
            isCompleted: false,
            type: 'project',
            description: 'Multi-Format Content Ecosystem: Build content for a gaming peripheral brand. Deliverable: 1 long-form YouTube video (5–8 min), 3 short-form clips (YouTube Shorts), 1 Instagram Reel, and 1 collaboration stream. Create storyboard, collect raw footage, perform advanced editing with color grading, optimize title/thumbnail, and create professional 2-page portfolio document with performance metrics.',
            resources: [],
          },
        ],
      },
      // LEVEL 4: Monetization & Business Fundamentals (800 XP)
      {
        id: 4,
        title: 'Level 4: Monetization & Business Fundamentals',
        xpRequired: 2100,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'cc_4_1',
            title: 'Lesson 4.1: Sponsorship & Brand Deal Fundamentals',
            xp: 30,
            isCompleted: false,
            type: 'video',
            description: 'Brands pay creators for promotion. Learn FTC disclosure requirements, negotiation tactics, and rate cards. Understand affiliate marketing, product gifting, and paid partnerships. Navigate the creator marketplace platforms.',
            resources: [
              'https://stackinfluence.com/top-ugc-creator-job-sites-2025-edition/',
              'https://wowremoteteams.com/blog/platforms-to-hire-remote-digital-content-creators/'
            ],
          },
          {
            id: 'cc_4_2',
            title: 'Mini-Project 4.1: Rate Card & Brand Kit Creation',
            xp: 45,
            isCompleted: false,
            type: 'project',
            description: 'Develop a professional rate card and brand kit. Research creator rates in your niche, create 1-page Rate Card listing services with pricing, and design Brand Kit (PDF) with channel statistics, audience demographics, past collaborations, and brand safety guidelines.',
            resources: [],
          },
          {
            id: 'cc_4_3',
            title: 'Lesson 4.2: UGC (User-Generated Content) & Micro-Freelancing',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'UGC platforms connect creators with brands seeking short testimonial videos (15–30 seconds). Learn submission process, content guidelines, and how to scale earnings through high-volume content creation.',
            resources: [
              'https://stackinfluence.com/top-ugc-creator-job-sites-2025-edition/'
            ],
          },
          {
            id: 'cc_4_4',
            title: 'Mini-Project 4.2: UGC Portfolio Building',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Create 5 high-quality UGC submission samples. Select 3 products you use, download UGC brief templates, create 5 short videos (15–30 sec each), and upload to 2 UGC platforms (JoinBrands, Collabstr, Creator.co, UGC Club). Track applications and earnings.',
            resources: [],
          },
          {
            id: 'cc_4_5',
            title: 'Lesson 4.3: Building Your Creator Brand & Personal Business',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'Transform from hobbyist to professional. Create business legal entity, understand tax implications, develop personal brand identity, and build website presence. Learn how to position yourself for agency partnerships.',
            resources: [
              'https://capsicummediaworks.com/free-online-portfolio-hosting-sites/',
              'https://www.wix.com/'
            ],
          },
          {
            id: 'cc_4_6',
            title: 'Mini-Project 4.3: Professional Portfolio Website',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Build a 3-page portfolio website using Wix, Cargo, or PortfolioBox (free tiers). Create: Home/Bio (150 words), Portfolio (6–10 best videos), Services/Contact (rate card, inquiry form). Optimize for SEO with metadata and mobile responsiveness.',
            resources: [],
          },
          {
            id: 'cc_4_7',
            title: 'Lesson 4.4: Scaling Revenue Through Courses, Merch, & Patreon',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'Beyond direct monetization, build passive income. Learn course creation platforms, merchandise integration (Merch by Amazon, Printful), Patreon tier strategy, and email list building for sustainable revenue.',
            resources: [
              'https://influencermarketinghub.com/creator-earnings-report-2025/',
              'https://alitu.com/creator/monetization/realistic-guide-to-creator-earnings/'
            ],
          },
          {
            id: 'cc_4_8',
            title: 'Mini-Project 4.4: Patreon Tier Strategy Document',
            xp: 50,
            isCompleted: false,
            type: 'project',
            description: 'Design a Patreon with 3–4 tiers. Research 5 comparable creator Patreons, design 3 tiers ($3–5: early access, $10–15: Discord call + merch, $25+: 1:1 coaching + custom content), write descriptions and fulfillment plan, and calculate revenue at different adoption rates.',
            resources: [],
          },
          {
            id: 'cc_4_9',
            title: 'CAPSTONE 4: Professional Pitch Package',
            xp: 500,
            isCompleted: false,
            type: 'project',
            description: 'Land Your First Sponsored Deal: Pitch yourself to 3 brands. Create professional sponsorship proposal package with media kit (2–3 page PDF), analytics dashboard screenshots, finalized rate card, 1–2 case studies, UGC portfolio compilation, research 10 sponsor brands, write 3 pitch emails, review mock contract, ensure website is live, and send minimum 5 outreach emails.',
            resources: [],
          },
        ],
      },
      // LEVEL 5: Advanced Strategy & Sustainable Growth (700 XP)
      {
        id: 5,
        title: 'Level 5: Advanced Strategy & Sustainable Growth',
        xpRequired: 2900,
        isUnlocked: false,
        isCompleted: false,
        tasks: [
          {
            id: 'cc_5_1',
            title: 'Lesson 5.1: Algorithm Mastery & Viral Content Strategy',
            xp: 20,
            isCompleted: false,
            type: 'video',
            description: 'The algorithm isn\'t random—it\'s psychological. Master content hooks, pacing science, and psychological triggers that drive virality. Learn A/B testing frameworks and data-driven content optimization.',
            resources: [
              'https://1of10.com/blog/the-psychology-behind-high-ctr-thumbnails/',
              'https://c-istudios.com/thumbnail-optimization-enhancing-click-through-rates-for-better-seo/'
            ],
          },
          {
            id: 'cc_5_2',
            title: 'Mini-Project 5.1: Viral Content Framework',
            xp: 30,
            isCompleted: false,
            type: 'project',
            description: 'Document your personal viral content formula. Analyze your top 10 most-viewed videos for patterns, create "Viral Content Hypothesis" with 3 concepts designed to trigger curiosity, emotion, and urgency. Execute mini-experiment and measure CTR, watch time, and retention.',
            resources: [],
          },
          {
            id: 'cc_5_3',
            title: 'Lesson 5.2: Community Psychology & Loyalty Systems',
            xp: 15,
            isCompleted: false,
            type: 'video',
            description: 'Top creators build passionate communities, not just audiences. Master Discord engagement tactics, member-only content strategies, and gamification systems. Learn how to foster advocates who promote your content.',
            resources: [
              'https://www.group.app/blog/the-best-14-discord-alternatives-for-community-building/'
            ],
          },
          {
            id: 'cc_5_4',
            title: 'Mini-Project 5.2: Loyalty Program Design',
            xp: 35,
            isCompleted: false,
            type: 'project',
            description: 'Build a gamified member loyalty system in Discord. Design tier-based system (Bronze/Silver/Gold based on activity), create exclusive perks (early access, livestream calls, custom roles), implement using Discord bots (MEE6 or UnbelievaBoat), and document monthly retention rate over 8 weeks.',
            resources: [],
          },
          {
            id: 'cc_5_5',
            title: 'Lesson 5.3: Cross-Platform Strategy & Ecosystem Building',
            xp: 15,
            isCompleted: false,
            type: 'video',
            description: 'One video should serve 10 platforms. Master ecosystem thinking: YouTube as distribution hub, TikTok for discovery, Twitch for community, Patreon for retention. Learn platform-specific optimization and multi-streaming.',
            resources: [
              'https://influencermarketinghub.com/streamlabs-alternatives/'
            ],
          },
          {
            id: 'cc_5_6',
            title: 'Mini-Project 5.3: Ecosystem Mapping & Optimization',
            xp: 35,
            isCompleted: false,
            type: 'project',
            description: 'Design and execute a 4-week cross-platform content strategy. Map ecosystem (identify primary/secondary platforms), create 4-week content calendar (8 YouTube videos with repurposing plan for TikTok, Instagram, Twitch), execute and measure subscriber growth, engagement rates, and cross-platform traffic.',
            resources: [],
          },
          {
            id: 'cc_5_7',
            title: 'Lesson 5.4: Personal Brand Evolution & Long-Term Positioning',
            xp: 15,
            isCompleted: false,
            type: 'video',
            description: 'Successful creators build recognizable personal brands. Master visual consistency, messaging frameworks, and brand evolution over time. Learn how to leverage your brand into consulting, speaking, and business opportunities.',
            resources: [
              'https://coopboardgames.com/statistics/gaming-content-creator-earnings-statistics/'
            ],
          },
          {
            id: 'cc_5_8',
            title: 'Mini-Project 5.4: 2-Year Brand Evolution Plan',
            xp: 35,
            isCompleted: false,
            type: 'project',
            description: 'Create a strategic vision for your personal brand over 24 months. Define brand identity (core values, positioning statement, visual guidelines), write evolution roadmap (Year 1: build foundation, Year 2: scale revenue), and identify monetization beyond YouTube/Twitch (consulting, courses, speaking, products).',
            resources: [],
          },
          {
            id: 'cc_5_9',
            title: 'CAPSTONE 5: 30-Day Intensive Content Sprint',
            xp: 500,
            isCompleted: false,
            type: 'project',
            description: 'From Beginner to Job-Ready Creator: Execute aggressive 30-day content sprint with growth targets (10,000 views, 500+ new subscribers, 1 brand deal inquiry). Plan 12+ content pieces, implement algorithm optimization strategies, daily community engagement (30 min), cross-platform blitz, execute 2 collaborations, weekly analytics reports, send 10+ sponsorship outreach emails, A/B test content weekly, enable all monetization, create comprehensive "30-Day Results Portfolio", and update portfolio website with results.',
            resources: [],
          },
        ],
      },
    ],
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const track = searchParams.get('track') as TrackType;

    if (!track || !TRACK_DATA[track]) {
      return NextResponse.json(
        { error: 'Invalid or missing track parameter' },
        { status: 400 }
      );
    }

    const careerData = TRACK_DATA[track];

    return NextResponse.json(careerData);
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
