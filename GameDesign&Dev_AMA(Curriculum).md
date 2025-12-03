**AMA CAREER PLATFORM: Game Design & **

**Development**

**Zero-to-Job-Ready Curriculum Track**

**PART 1: TITLE PAGE & OVERVIEW**

**Why Gamers Excel at Game Development**

You already understand **game mechanics**, **player psychology**, and **feedback loops**—concepts that took AAA studios millions to learn. Your years grinding Clash Royale, speedrunning impossible platformers, and dissecting game design in Discord threads have trained your brain to recognize good design instinctively. Game developers are failed game players who got obsessed with the *why* instead of the *what*. You're already halfway there. 

**Salary & Career Progression \(2025\)**

**Career Stage**

**Salary Range**

**Experience**

Entry-Level \(Junior Dev\)

$40,000 – $105,000

0–1 years

Mid-Level \(Developer\)

$100,000 – $150,000

2–4 years

Senior/Lead Developer

$150,000 – $200,000\+

5\+ years

*Note: Indie developers operating solo can earn $0–$500K\+ depending on game success. First indie* *titles typically generate modest revenue \($1K–$50K\); established indie devs with 5\+ shipped titles* *average $100K\+. *

**Tools Required \(All Free / Open Source\)**

**Game Engines:**

**Unity 2023 LTS** \(Free Personal Edition\) – Windows, Mac, Linux

**Godot 4.x** \(Free, Open Source\) – Windows, Mac, Linux

**Pygame** \(Free, Open Source\) – Works with Python 3.8\+

**Code Editors & IDEs:**

**Visual Studio Code** \(Free, Microsoft\) – Python, C\#, GDScript support

**Godot Built-in Editor** \(Free, included with engine\)

**3D Modeling & 2D Art:**

**Blender 4.x** \(Free, Open Source\) – 3D modeling, animation, rendering

**Pixelorama** \(Free, Open Source, itch.io\) – Pixel art & sprite animation

**LibreSprite / Piskel** \(Free, Open Source\) – 2D sprite creation **Audio:**

**Audacity** \(Free, Open Source\) – Basic sound editing

Freesound.org**, **OpenGameArt.org – Free SFX & music \(CC0/CC-BY licenses\) **Version Control & Collaboration:**

**Git** \(Free, Open Source\)

**GitHub** \(Free tier\)

**Distribution:**

itch.io \(Free hosting, community platform for indie games\)



## PART 2: THE 5 LEVELS

**Level 1: Hello World Protocol – Foundations & Your First Game**

**Level Objective:** Understand core game development concepts by building a **simple 2D arcade** **game** \(Pong or Space Invaders clone\). 

**Total Level XP: 650 XP**

**Lesson 1: Game Development Fundamentals & Your First Engine**

**Description:**

Learn what game development *actually* is: how game loops work, why frame rates matter, and the mental model behind every game. Choose and install either Unity, Godot, or Pygame. Understand the difference between gameplay, visuals, and sound. Recognize that **all games are state machines**—

they have states \(menu, playing, game over\) that respond to input and change over time. 

**Resources:**

**Video:** "Game Development Basics Explained" - Brackeys \(YouTube\) – https://www.youtube.com/

c/Brackeys/videos – 12 min – **20 XP**

**Video:** "How to Make a Video Game - Godot Beginner Tutorial" - Brackeys \(YouTube\) – https://w

ww.youtube.com/watch?v=LOhfqjmasi0 – 1 hour – **25 XP**

**Documentation:** Official Unity Learn Platform – https://unity.com/learn – "Beginner Scripting" 

module – **20 XP**

**Documentation:** Godot Engine Step-by-Step Guide – https://docs.godotengine.org/en/stable/gett

ing\_started/step\_by\_step/index.html – **20 XP**

**Mini-Project: "Hello, Game World" **

**Objective:** Create a 2D scene in your chosen engine with a moving character that responds to keyboard input. 

**3-Step Instructions:**

1. Download your chosen engine \(Unity Personal / Godot / Python \+ Pygame\). 

2. Create a new 2D project and import a simple sprite \(can be a colored square\). 

3. Write a script that moves the sprite left/right with arrow keys. 

**XP Reward:** 75 XP

**Lesson 2: Understanding Collisions, Physics & Game State**

**Description:**

Real games aren't just about moving things around—they're about *things interacting*. Learn collision detection, physics bodies \(rigid, kinematic, areas\), and how games track state \(is the player alive? did they score?\). Understand why professional games use physics engines instead of DIY collision code. 

**Resources:**

**Video:** "Unity Physics Explained" - Code Monkey – https://www.youtube.com/watch?v=AmGSEH

7QcDg \(Chapter: Physics & Collisions\) – 15 min – **20 XP**

**Video:** "Godot 2D Physics Tutorial" - freeCodeCamp – https://www.youtube.com/watch?v=MiPkc

TaRbfQ \(Section: Physics\) – 20 min – **22 XP**

**Documentation:** Godot Docs: "Physics Bodies" – https://docs.godotengine.org/en/stable/tutorial

s/physics/using\_2d\_characters/index.html – **20 XP**

**Mini-Project: "Collision Detective" **

**Objective:** Build a simple scene where your character collides with obstacles and the game prints a message to console when collision occurs. 

**3-Step Instructions:**

1. Add a physics body to your player character. 

2. Add a static obstacle \(wall/platform\) with collision. 

3. Use the engine's collision signals to detect when player touches obstacle and print "Collision\!" to console. 

**XP Reward:** 75 XP

**Lesson 3: Game Loops, Framerate & Time Management**

**Description:**

Every frame \(60 times per second\), the game does the same thing: read input → update game logic

→ render graphics. If you forget this loop, your games will feel broken. Learn delta time \(the seconds elapsed since last frame\) so movements feel smooth even on slow computers. Understand why "if player presses jump" must be "if player presses jump AND is on ground" \(state tracking\). 

**Resources:**

**Video:** "Game Loop Explained" - Brackeys – https://www.youtube.com/c/Brackeys/videos –

Search "game loop" – 8 min – **18 XP**

**Article:** "The Game Loop" - GameDev.net – https://www.gamedev.net – **15 XP**

**Documentation:** Pygame Documentation: "Events and Timing" –

https://www.pygame.org/wiki/tutorials – **20 XP**

**Mini-Project: "Smooth Movement Simulator" **

**Objective:** Create a character that moves smoothly at 100 pixels/second regardless of framerate, using delta time. 

**3-Step Instructions:**

1. Get delta time from engine each frame. 

2. Move player by speed \* delta\_time instead of fixed pixels. 

3. Change game speed to 30 FPS and confirm movement is still smooth. 

**XP Reward:** 75 XP

**Lesson 4: Sprites, Animation & Visual Polish**

**Description:**

A stationary blue square is boring. Learn how to import sprites, set up sprite sheets, animate characters \(idle, run, jump animations\), and use camera systems. Understand layers \(background, mid-ground, foreground\) and sorting orders. A polished visual experience separates professional games from itch.io disasters. 

**Resources:**

**Video:** "2D Character Animation in Unity" - Brackeys – https://www.youtube.com/@Brackeys – 12

min – **22 XP**

**Video:** "Godot Animation Tutorial" - freeCodeCamp – https://www.youtube.com/watch?v=S8lMTw

SRoRg \(Section: Player Animation\) – 15 min – **22 XP**

**Video:** "Pixel Art Character Animation Basics" - Brackeys – https://www.youtube.com/@Brackeys

– 10 min – **20 XP**

**Free Asset Pack:** Kenney.nl Asset Library – https://kenney.nl/assets – 2D sprites \(free for

commercial use\) – **15 XP**

**Mini-Project: "Animated Character" **

**Objective:** Import a sprite sheet, set up idle and run animations, and trigger them based on input. 

**3-Step Instructions:**

1. Download a free sprite sheet from Kenney.nl or similar. 

2. Import into your engine and create animation frames. 

3. Code: if pressing right arrow, play run animation; otherwise, play idle. 

**XP Reward:** 75 XP

**LEVEL 1 CAPSTONE PROJECT: "The Console Commander" **

**Project Title:** *The Console Commander* – A text-based dungeon crawler turned visual arcade game. 

**XP Reward:** 400 XP

**Scenario:**

You are tasked with creating a **playable, feature-complete arcade game** that demonstrates mastery of fundamentals. Choose ONE:

**Option A \(Recommended for Godot/Unity beginners\):** Pong Clone

**Option B \(Recommended for Python/Pygame beginners\):** Space Invaders Clone

**Option C \(Your choice\):** Flappy Bird, Snake, or Breakout

The game must be:

**Playable from start to finish** \(has a win or game-over state\)

**Polished** \(sprites, animation, basic UI\)

**Responsive** \(input feels immediate, no lag\)

**Published to **itch.io \(your first portfolio piece\!\) **Execution Checklist \(15 Steps – Be Precise\):**

□ **Step 1:** Create a new project in your chosen engine. Set resolution to 1280x720 \(standard indie size\). Name it "Console\_Commander". 

□ **Step 2:** Download free sprites from Kenney.nl or OpenGameArt.org. For Pong: paddles \(2x\) \+ ball \+

background. Create a sprites/ folder and import all assets. 

□ **Step 3:** Create a main Scene with a 2D Canvas. Add background sprite. Assign sorting order so background appears behind game objects. 

□ **Step 4:** Implement Player 1 paddle: Create a Sprite node, attach a Rigidbody2D \(kinematic or dynamic\), and a CollisionShape2D \(rectangle\). Code movement: W key = up, S key = down. Clamp position so paddle doesn't leave screen. 

□ **Step 5:** Implement Player 2 paddle \(mirror of Player 1\). Use arrow keys: UP = up, DOWN = down. 

□ **Step 6:** Implement ball: Create a Sprite node with a small circular collision shape. Give it initial velocity \(e.g., 300 pixels/sec diagonal\). Add physics so it bounces off walls and paddles. 

□ **Step 7:** Implement collision with paddles: When ball touches paddle, reverse its X velocity and increase speed slightly \(10% boost\). Use collision signals/callbacks to detect hits. 

□ **Step 8:** Implement score tracking: Create a UI Canvas with two Text elements \(labels\) for P1 and P2

scores. When ball exits screen left, increment P2 score and reset ball to center. Same for P1 \(ball exits right\). 

□ **Step 9:** Implement game-over condition: When a player reaches 11 points \(first to 11 wins\), display

"Player 1 Wins\!" or "Player 2 Wins\!" on screen. Disable ball movement. 

□ **Step 10:** Add a "Press SPACE to Start" message at game begin. When space pressed, ball launches with random direction \(up or down, left or right\). Message disappears. 

□ **Step 11:** Add wall collision: Ball bounces off top and bottom walls. Implement using physics engine or manual collision detection. Sound effects optional \(silence OK\). 

□ **Step 12:** Build the game for your platform \(Windows/Mac/Linux\). Export as executable .exe or .app or stand-alone build folder. 

□ **Step 13:** Create a 1280x720 screenshot or short GIF of gameplay \(press Space → ball launches →

paddles move\). Save as screenshot.png or gameplay.gif. 

□ **Step 14:** Create an itch.io account \(https://itch.io\) and upload your game: Click "Create new project" 

→ Enter title "The Console Commander" → Set pricing to "No payment" \(free\) → Upload build \(zipped folder\) → Add screenshot → Click "Save and view page." 

□ **Step 15:** Share itch.io link with at least 3 people and ask for feedback. Document their feedback

\(e.g., "Paddle was hard to control," "Score display was clear"\). Save as a .txt file. This is your first playtesting report—add to portfolio. 

**Acceptance Criteria:**

✅ Game is playable from start to game-over without crashes. 

✅ Both paddles respond to input immediately \(no lag\). 

✅ Ball physics work \(bounces, changes direction on paddle hit\). 

✅ Score increments correctly and displays on screen. 

✅ Win condition triggers and shows winner. 

✅ Game is published on itch.io with a public link. 

✅ Code is committed to GitHub \(create public repo console-commander\). 

**Level 2: Game Systems Architect – Mechanics, UI & Feedback Loops**

**Level Objective:** Build a **complete single-player arcade game with menus, sound, and** **progression** \(e.g., classic platformer with levels\). 

**Total Level XP: 800 XP**

**Lesson 1: Designing & Implementing Game Mechanics**

**Description:**

A mechanic is a *rule of interaction*. In Pong, the mechanic is "hit ball to opponent's side." In Mario, it's

"jump over enemies." Understand how mechanics create **feedback loops**: player does action →

game responds → player feels progress. Learn to sketch mechanics on paper before coding. 

Understand balance: if enemy is too easy, player gets bored; too hard, player quits. 

**Resources:**

**Video:** "Game Design Fundamentals" - Game Dev Unlocked – https://www.youtube.com/c/Game

DevUnlocked/videos – 20 min – **23 XP**

**Video:** "Designing Game Mechanics" - GDC Vault \(free section\) – Search "GDC mechanics" – 18

min – **22 XP**

**Article:** "MDA Framework \(Mechanics, Dynamics, Aesthetics\)" - Gamasutra – **20 XP**

**Video:** "Code Monkey: Game Feel & Polish" – https://www.youtube.com/watch?v=4kg2N-t2tWI –

10 min – **18 XP**

**Mini-Project: "Mechanic Prototype" **

**Objective:** Design and prototype ONE game mechanic on paper, then code it. 

**3-Step Instructions:**

1. Choose a mechanic \(e.g., "player gains speed when collecting coins," "enemies spawn faster as score increases"\). 

2. Sketch: Draw stick figures showing the mechanic in action. Label inputs and feedback. 

3. Code: Implement the mechanic in a simple scene. Test it 10 times and record if it feels fun or unfair. 

**XP Reward:** 75 XP

**Lesson 2: UI, Menus & Scene Management**

**Description:**

Players don't jump straight into gameplay—they see a menu. Learn to build UI \(buttons, text, progress bars\) that feels responsive and clear. Understand scene management: main menu → level select →

gameplay → pause menu → game over. Each scene transitions smoothly. Master input handling for UI \(mouse clicks, keyboard navigation\). 

**Resources:**

**Video:** "Unity UI Tutorial for Beginners" - Brackeys – https://www.youtube.com/@Brackeys – 25

min – **23 XP**

**Video:** "Godot UI \(Control Nodes\)" - freeCodeCamp – https://www.youtube.com/watch?v=S8lMT

wSRoRg \(Section: UI\) – 15 min – **22 XP**

**Video:** "Scene Management & Transitions" - Code Monkey –

https://www.youtube.com/c/CodeMonkey – 12 min – **20 XP**

**Documentation:** Godot Docs: "Control Nodes" – https://docs.godotengine.org/en/stable/tutorials/

ui/basics\_of\_gui.html – **20 XP**

**Mini-Project: "Main Menu & Scene Switcher" **

**Objective:** Build a main menu with buttons that navigate to different scenes \(Gameplay, Settings, Credits\). 

**3-Step Instructions:**

1. Create three scenes: MainMenu, GameplayScene, SettingsScene. 

2. In MainMenu: Add a title label, three buttons \(Play, Settings, Quit\). 

3. Code: When "Play" clicked, load GameplayScene. When "Settings" clicked, load SettingsScene. 

When "Quit" clicked, close game. 

**XP Reward:** 75 XP

**Lesson 3: Audio Integration & Sound Design Basics**

**Description:**

Sound is **50% of the game experience**. A satisfying "ding\!" when collecting coins makes the player *feel* progress. Learn to source free audio \(Freesound.org, OpenGameArt.org\), implement sound

effects and music in your engine, and mix volumes so music doesn't drown dialogue. Understand audio hierarchy: music \(low\), ambient \(low-mid\), SFX \(high\), voice \(highest\). 

**Resources:**

**Video:** "Audio in Unity" - Brackeys – https://www.youtube.com/@Brackeys – 15 min – **20 XP**

**Video:** "Godot Audio & Music" - freeCodeCamp – https://www.youtube.com/watch?v=S8lMTwSR

oRg \(Section: Audio\) – 10 min – **18 XP**

**Resource Library:** Freesound.org – https://freesound.org – Free CC0 & CC-BY audio – **15 XP**

**Resource Library:** OpenGameArt.org \(Audio section\) – https://opengameart.org – CC0 game

audio – **15 XP**

**Mini-Project: "Audio Mixer" **

**Objective:** Add background music and 3 sound effects to your Level 1 game \(Pong\). 

**3-Step Instructions:**

1. Download 1 background music track \(~2 min loop\) and 3 SFX \(paddle hit, score, win\) from

Freesound.org or OpenGameArt. 

2. Import into your engine. 

3. Code: Play music on game start \(loop forever\). Play paddle-hit SFX when paddles collide. Play score SFX when score changes. Play win SFX on game over. 

**XP Reward:** 75 XP

**Lesson 4: Level Design, Difficulty Curves & Player Progression** **Description:**

Good level design teaches the player gradually. Level 1: "Jump over one enemy." Level 5: "Jump over three enemies while avoiding spikes AND collecting coins." A flat difficulty curve \(all levels equally hard\) is boring; a spike \(sudden jump\) causes rage-quits. Learn to design level progression that respects the player's growing skill. Understand checkpoints \(save points\) so players don't replay entire levels. 

**Resources:**

**Video:** "Level Design Fundamentals" - Game Dev Unlocked – https://www.youtube.com/c/GameD

evUnlocked/videos – 20 min – **23 XP**

**Video:** "Difficulty Curves in Game Design" - GDC Vault \(free\) – 15 min – **20 XP**

**Article:** "Progressive Level Design" – **18 XP**

**Video:** "Platformer Level Design" - Brackeys – https://www.youtube.com/@Brackeys – 12 min –

**20 XP**

**Mini-Project: "Three-Level Gauntlet" **

**Objective:** Design and build 3 levels of increasing difficulty \(sketches allowed; code is bonus\). 

**3-Step Instructions:**

1. Level 1: Simple layout. Player jumps over 2 obstacles. No time pressure. Easy. 

2. Level 2: Medium layout. 5 obstacles, tighter spacing. Player must time jumps. Medium. 

3. Level 3: Hard layout. Obstacles \+ hazards \(spikes\). Narrow platforms. Hard. 

4. Document each level with a simple sketch \(hand-drawn is fine\). Describe difficulty reasoning. 

**XP Reward:** 75 XP

**LEVEL 2 CAPSTONE PROJECT: "The Arcade Architect" **

**Project Title:** *The Arcade Architect* – A **complete, publishable single-player arcade or platformer** **game** with progression, menus, sound, and polish. 

**XP Reward:** 500 XP

**Scenario:**

You are tasked with delivering a **shipped indie game** that demonstrates advanced fundamentals. 

Your goal: **create a game you'd be proud to show employers. **

**Choose ONE Game Type:**

**Platformer:** 3\+ levels, player character jumps, collect coins, reach goal. 

**Puzzle Game:** Match-3, Tetris-clone, or Portal-lite. 5\+ progressive levels. 

**Arcade Action:** Endless runner, bullet-hell, or wave-based shooter. 10\+ progressively harder waves. 

**Your own concept** \(subject to approval from game dev mentor\). 

**Game Must Include:**

✅ **Menu System:** Main menu → Play → Game over/Win → Restart/Menu

✅ **3\+ Levels** with clear progression

✅ **Score/Progress System** \(points, lives, waves survived, etc.\)

✅ **Audio:** Background music \+ 3\+ sound effects

✅ **Polish:** Smooth animations, visual feedback, responsive controls

✅ **Checkpoint System** \(platformers\) or level select \(puzzle games\)

✅ **Published to **itch.io with description, screenshots, and credits **Execution Checklist \(15\+ Steps\):**

□ **Step 1:** Choose your game type and engine \(Unity/Godot/Pygame\). Create project folder: arcade\_architect/. Initialize Git repo: git init. 

□ **Step 2:** Design your game on paper: Sketch all levels. For platformers, draw platforms, enemies, coins. For puzzles, define rules. For action, describe wave progression. Create a design document \(even a one-pager counts\) and commit to Git. 

□ **Step 3:** Create folder structure: sprites/, audio/, scripts/, scenes/, docs/. Download free assets \(

Kenney.nl for sprites, Freesound.org for audio\). Organize by type. 

□ **Step 4:** Build Main Menu scene: Title, "Play" button, "How to Play" button, "Credits" button, "Quit" 

button. Style with fonts and colors. Button clicks should trigger scene loads \(but don't load yet—just print to console\). 

□ **Step 5:** Build a "How to Play" scene: Display game controls and objective as text/images. Add "Back to Menu" button. 

□ **Step 6:** Build first gameplay level: For platformers, place platforms and player start. For puzzles, set up grid. For action, set up arena. Ensure player can move/interact without crashing. 

□ **Step 7:** Implement player controls specific to game type. Platformer: WASD or arrows for movement, Space to jump. Puzzle: mouse clicks or keyboard for selections. Action: WASD for movement, mouse for aiming or spacebar for shooting. 

□ **Step 8:** Implement level progression: When player completes Level 1 \(reaches goal, solves puzzle, survives 5 waves\), automatically load Level 2. Display "Level 2" message. 

□ **Step 9:** Implement scoring system: Track points \(coins collected, enemies defeated, time survived\). 

Display score on screen in real-time. Update persistent high score \(in memory, not saved to disk\). 

□ **Step 10:** Implement audio: Import background music. Loop on game start. Import SFX for key events \(collect coin, defeat enemy, level complete, game over\). Trigger each appropriately. 

□ **Step 11:** Implement difficulty progression: Level 1 should feel easy \(teach mechanics\). Level 2

medium \(apply mechanics\). Level 3\+ hard \(combine mechanics, add twists\). Test and adjust. 

□ **Step 12:** Implement UI polish: Add a pause menu \(press ESC → pauses game → show "Paused" 

overlay with Resume & Quit buttons\). Add countdown timer or health display \(genre-appropriate\). 

□ **Step 13:** Implement Game Over flow: When player loses \(dies, time runs out, puzzle failed\), display

"Game Over" screen with final score, a "Restart Level" button, and a "Back to Menu" button. 

□ **Step 14:** Build game for your platform. Test all scenes: Menu → Play → Level 1 → Level 2 → Level 3 → Game Over → Menu \(full loop\). Fix any crashes. 

□ **Step 15:** Create portfolio assets: 3 screenshots \(menu, mid-gameplay, level clear\). Write a 3-paragraph game description \(genre, mechanics, what makes it fun\). Create a credits file listing music/sprite artists and licenses. 

□ **Step 16:** Upload to itch.io: Create project page. Upload build. Add screenshots. Add description. Set to "Public" and "No payment" \(free\). Share link. 

□ **Step 17 \(BONUS\):** Add to GitHub with proper README \(how to build, credits, controls\). Commit all code with meaningful messages. GitHub profile is now a portfolio. 

**Acceptance Criteria:**

✅ Game is playable from menu → win/loss condition without crashes. 

✅ All three levels are completable and show clear difficulty progression. 

✅ Score system works and displays correctly. 

✅ Audio \(music \+ SFX\) is present and not jarring. 

✅ Controls feel responsive \(no input lag\). 

✅ UI is readable and buttons work as expected. 

✅ Game is published on itch.io with description and screenshots. 

✅ Code is clean, commented, and pushed to GitHub. 

✅ Playtesters give positive feedback on fun and clarity. 

**Level 3: Master Programmer – Intermediate Systems, Architecture & Multiplayer** **Fundamentals**

**Level Objective:** Build a **game with advanced systems**: multiplayer networking, AI enemies, advanced physics, or intricate UI. Refactor code for reusability. 

**Total Level XP: 900 XP**

**Lesson 1: Code Architecture, Refactoring & Best Practices**

**Description:**

Your Level 2 code works but is a mess. Spaghetti code \(everything tangled\) is slow to debug and painful to extend. Learn **design patterns** \(MVC, Observer, Object Pool\), **separation of concerns**

\(physics code ≠ UI code\), and when to refactor. Understand technical debt: fast, dirty code now = slow debugging later. Professional studios spend 40% of dev time refactoring. 

**Resources:**

**Video:** "Code Architecture in Game Development" - Code Monkey – https://www.youtube.com/wa

tch?v=4kg2N-t2tWI – 25 min – **24 XP**

**Video:** "Design Patterns for Games" - Game Dev Unlocked – https://www.youtube.com/c/GameD

evUnlocked/videos – 20 min – **23 XP**

**Article:** "SOLID Principles in Game Dev" – **18 XP**

**Video:** "C\# / GDScript Best Practices" - Brackeys – https://www.youtube.com/@Brackeys – 15

min – **20 XP**

**Mini-Project: "Refactor Your Level 2 Game" **

**Objective:** Take your Level 2 game and refactor ONE system \(e.g., scoring, enemy spawning\) into a clean, reusable module. 

**3-Step Instructions:**

1. Identify the messiest system in your Level 2 code. 

2. Extract it into a separate class/script. Add comments explaining each function. 

3. Test that it still works. Commit to Git with message "Refactor: \[system name\]." 

**XP Reward:** 75 XP

**Lesson 2: AI & Enemy Behavior**

**Description:**

Static enemies are boring. Learn to code **AI that adapts**: enemies that pursue the player, patrol paths, flee when outnumbered, or use state machines \(idle → alert → chase → attack\). Understand pathfinding basics \(A\* algorithm\) and when to use it. AI doesn't need to be superintelligent—just appear to make decisions. 

**Resources:**

**Video:** "AI Behavior in Games" - Brackeys – https://www.youtube.com/@Brackeys – 20 min – **22**

**XP**

**Video:** "State Machines for AI" - Code Monkey – https://www.youtube.com/c/CodeMonkey – 18

min – **21 XP**

**Video:** "Pathfinding & A\* Algorithm \(Simplified\)" - Sebastian Lague –

https://www.youtube.com/c/SebastianLague – 15 min – **20 XP**

**Article:** "Simple AI for Indie Games" – **18 XP**

**Mini-Project: "Chase AI" **

**Objective:** Code an enemy that chases the player when within range, otherwise patrols. 

**3-Step Instructions:**

1. Create an enemy sprite with a detection radius \(visualize as circle gizmo\). 

2. If player enters radius: enemy moves toward player. 

3. If player exits radius: enemy returns to patrol path \(move between 2-3 waypoints\). 

**XP Reward:** 75 XP

**Lesson 3: Multiplayer Basics & Networking Fundamentals**

**Description:**

Multiplayer is *hard*. Network latency, player desynchronization, and cheating prevention are PhD-level problems. For this level, focus on **local multiplayer** \(split-screen or turn-based on same PC\) which teaches you the mindset. Understand: state synchronization \(both players see same game\), input handling \(whose turn?\), and conflict resolution \(player A and B both try to move to same tile\). 

**Resources:**

**Video:** "Local Multiplayer Game Tutorial" - Brackeys – https://www.youtube.com/@Brackeys – 20

min – **22 XP**

**Video:** "Introduction to Game Networking" - GDC Vault \(free\) – 18 min – **20 XP**

**Article:** "Turn-Based vs. Real-Time Multiplayer" – **18 XP**

**Documentation:** Godot Multiplayer API \(Basics\) – https://docs.godotengine.org/en/stable/tutorial

s/networking/index.html – **20 XP**

**Mini-Project: "Split-Screen Platformer" **

**Objective:** Build a 2-player split-screen game where both players see their own view of the world. 

**3-Step Instructions:**

1. Create two player objects \(Player1, Player2\). 

2. Set up two cameras: one follows Player1, one follows Player2. 

3. Render to split screen: left half shows Camera1, right half shows Camera2. Code: Player1 controls: WASD

Player2 controls: Arrow keys

Both move independently but in same game world. 

**XP Reward:** 75 XP

**Lesson 4: Advanced Physics & Procedural Generation \(Optional Path\)** **Description \(Pick ONE\):**

**Path A: Advanced Physics**

Learn to use physics engines beyond basic platformers: ragdoll physics, vehicle physics, particle systems, destructible environments. Understand constraints \(joints, springs\) and when to use them. 

**Path B: Procedural Generation**

Instead of hand-designing every level, code algorithms to generate them randomly \(Perlin noise for terrain, cellular automata for dungeons\). Each playthrough is different. 

**Resources \(Physics\):**

**Video:** "Physics Constraints in Unity" - Brackeys – 15 min – **20 XP**

**Video:** "Vehicle Physics" - Code Monkey – 18 min – **21 XP**

**Documentation:** Godot Physics Docs – **18 XP**

**Resources \(Procedural Gen\):**

**Video:** "Procedural Generation Basics" - Code Monkey – 20 min – **22 XP**

**Video:** "Dungeon Generation Algorithm" - Sebastian Lague – 25 min – **24 XP**

**Article:** "Perlin Noise Explained" – **18 XP**

**Mini-Project:**

**Physics Path:**

Create a vehicle \(car sprite\) that accelerates/brakes/drifts with realistic weight. 

Code: Acceleration → velocity → position. Friction reduces velocity over time. 

**Procedural Gen Path:**

Generate a simple 2D dungeon \(rooms \+ corridors\) using cellular automata or BSP trees. 

Test: generate 5 different dungeons and verify they're playable. 

**XP Reward:** 75 XP

**LEVEL 3 CAPSTONE PROJECT: "The Systems Engineer" **

**Project Title:** *The Systems Engineer* – A **game showcasing 2\+ advanced systems** \(AI \+

multiplayer, Physics \+ procedural gen, etc.\). 

**XP Reward:** 500 XP

**Scenario:**

You've proven you can ship simple games. Now prove you can architect **complex, interconnected** **systems**. Your game should blend Level 2 \(polish, progression\) with ONE advanced system. 

**Acceptable Combinations:**

Platformer \+ AI enemies \(enemies patrol/chase, adapt to player\)

Puzzle game \+ Procedural level generation \(new puzzle each playthrough\)

Local multiplayer turn-based strategy game

Physics-based action game \(vehicle racing, pinball\)

Roguelike dungeon crawler \(procedural floors, turn-based combat\)

**Execution Checklist \(15\+ Steps\):**

□ **Step 1:** Choose your advanced system\(s\) and game concept. Write a one-page design document. 

What systems interact? How? 

□ **Step 2:** Architecture planning: Sketch your code structure on paper or whiteboard. Identify modules \(AI Manager, Physics Manager, Procedural Generator\). Plan interfaces between modules. 

□ **Step 3:** Create project. Establish folder structure mirroring architecture. Commit initial empty project to Git. 

□ **Step 4:** Implement System 1 \(e.g., AI\): Code enemy spawner, behavior state machine, and basic pathfinding. Test in isolation \(no other systems\). 

□ **Step 5:** Implement System 2 \(e.g., Multiplayer or Procedural Gen\): Code separately, then integrate with System 1. Test interaction points. 

□ **Step 6:** Implement core gameplay: Player character, basic level, controls. Ensure System 1 \+ 2 \+

core gameplay all work together without crashes. 

□ **Step 7:** Build 3\+ levels/scenarios showcasing both systems. For example: Level 1: Single AI enemy, player learns controls. 

Level 2: Multiple enemies with advanced behavior, player navigates. 

Level 3: Player \+ AI \+ procedurally generated level, maximum difficulty. 

□ **Step 8:** Implement progression: Difficulty ramps, new mechanics introduced gradually. 

□ **Step 9:** Audio: Background music, SFX for key events, ambient audio if applicable. 

□ **Step 10:** UI & Polish: Menu, pause, game over screens. Responsive controls. Readable feedback. 

□ **Step 11:** Performance optimization: Profile your game \(use engine's profiler\). Identify bottlenecks. 

Optimize hot loops \(code running every frame\). 

□ **Step 12:** Playtesting & balance: Have 5\+ people play. Collect feedback on difficulty, clarity, fun. 

Adjust based on feedback. 

□ **Step 13:** Documentation: Write a technical report \(500 words\) explaining your systems, architecture decisions, and challenges overcome. This is portfolio-gold. 

□ **Step 14:** Build final version. Test all scenarios end-to-end. 

□ **Step 15:** Upload to itch.io with updated screenshots, description \(highlight your advanced systems\), 

and credits. Also add link to GitHub repo \+ technical report. 

**Acceptance Criteria:**

✅ Both advanced systems are fully implemented and functional. 

✅ Systems interact seamlessly without bugs or desync. 

✅ Game is playable, polished, and fun for 3\+ playtests. 

✅ 3\+ levels/scenarios demonstrate system complexity. 

✅ Code is well-architected \(clean, modular, commented\). 

✅ Published to itch.io and GitHub. 

✅ Technical report demonstrates deep understanding of systems. 

**Level 4: Game Artist & Designer – Visual Polish, Narrative & Production Quality** **Level Objective:** Create a **visually stunning, narratively compelling game** that rivals indie darlings. Learn shader creation, advanced animation, narrative design, and marketing-ready polish. 

**Total Level XP: 900 XP**

**Lesson 1: Visual Aesthetics, Shader Basics & Advanced Animation**

**Description:**

Ugly games don't sell. Learn **color theory** \(harmony, contrast\), **composition** \(rule of thirds, focal points\), and **shader programming** \(custom visual effects: bloom, distortion, outlines\). Understand **rigging and skeletal animation** for characters. A simple game with gorgeous visuals outperforms a complex game that looks amateur. 

**Resources:**

**Video:** "Blender for Game Developers" - Blender Guru – https://www.youtube.com/@BlenderGuru

– 45 min playlist – **25 XP**

**Video:** "Advanced Animation in Godot" - freeCodeCamp – https://www.youtube.com/watch?v=S8l

MTwSRoRg \(Animation section\) – 20 min – **23 XP**

**Video:** "Shader Basics for Games" - The Cherno – https://www.youtube.com/c/TheChernoProject

– 15 min – **20 XP**

**Article:** "Color Theory for Game Designers" – **18 XP**

**Video:** "Particle Effects Tutorial" - Brackeys – https://www.youtube.com/@Brackeys – 15 min – **20**

**XP**

**Mini-Project: "Shader Playground" **

**Objective:** Create 3 custom shader effects \(glow, color shift, screen warp\). 

**3-Step Instructions:**

1. Study shader syntax \(GLSL or engine equivalent\). 

2. Write a simple glow shader: Modify fragment color to brighten and expand edges. 

3. Test on a cube/sprite. Repeat for color shift \(change hue over time\) and screen warp \(distort UV\). 

**XP Reward:** 75 XP

**Lesson 2: Narrative Design, Dialogue Systems & Story**

**Description:**

Games aren't just mechanics—they tell stories. Learn **branching dialogue systems** \(player choice affects outcome\), **environmental storytelling** \(clues in level design tell story without dialogue\), and **pacing** \(balance action/calm\). Understand **emotional beats** and how to make players care about characters. Even indie games with minimal story benefit from narrative structure. 

**Resources:**

**Video:** "Narrative in Games" - Game Dev Unlocked – https://www.youtube.com/c/GameDevUnloc

ked/videos – 25 min – **24 XP**

**Article:** "Branching Dialogue Trees" – **18 XP**

**Video:** "Environmental Storytelling" - GDC Vault \(free\) – 18 min – **20 XP**

**Video:** "Dialogue System Tutorial" - Code Monkey – https://www.youtube.com/c/CodeMonkey –

20 min – **22 XP**

**Tool:** Twine \(free dialogue editor\) – https://twinery.org/ – **15 XP**

**Mini-Project: "Story Tree" **

**Objective:** Design a 2-3 minute narrative with branching dialogue. Map it in Twine or on paper. 

**3-Step Instructions:**

1. Create a simple scenario \(e.g., "Player meets NPC who offers two quests"\). 

2. Map dialogue tree: NPC greets player → player chooses response A or B → different outcomes. 

3. Implement in Twine or your engine's dialogue system. Test both paths. 

**XP Reward:** 75 XP

**Lesson 3: Audio Production, Music Composition & Sound Design Mastery**

**Description:**

Audio is **underrated**. A game with mediocre graphics but great audio feels premium. Learn **audio** **mixing** \(levels, EQ, reverb\), **music composition** \(leitmotifs for characters, dynamic music that responds to gameplay\), and **foley** \(real-world sounds for authenticity\). Understand **spatial audio** \(3D

sound positioning\) and when to use it. 

**Resources:**

**Video:** "Professional Game Audio" - Game Dev Unlocked – https://www.youtube.com/c/GameDev

Unlocked/videos – 20 min – **22 XP**

**Video:** "Music Composition for Games" - GDC Vault \(free\) – 22 min – **23 XP**

**Video:** "Audacity Audio Editing Tutorial" – 15 min – **20 XP**

**Resource:** Freesound.org foley samples – **18 XP**

**Tool:** Audacity \(free audio editor\) – https://www.audacityteam.org/ – **0 XP** \(installation only\) **Mini-Project: "Audio Design Suite" **

**Objective:** Record/edit 5 foley sounds and create a simple audio mixing setup for your game. 

**3-Step Instructions:**

1. Record 5 foley sounds \(footsteps, jump, landing, coin collection, damage\) using phone mic or

Freesound.org samples. 

2. Edit in Audacity: trim silence, add reverb, normalize levels. 

3. Integrate into Level 2 game: replace placeholder sounds with your custom audio. 

**XP Reward:** 75 XP

**Lesson 4: Marketing, Portfolio & Launch Strategy**

**Description:**

Great games fail silently if nobody knows about them. Learn **marketing fundamentals**: GIFs/trailers

for itch.io, social media presence, game jams for visibility, press kit creation, and community engagement. Understand **positioning** \(how do you describe your game in one sentence?\). Your portfolio is your resume—curate it ruthlessly. 

**Resources:**

**Video:** "Indie Game Marketing on a Budget" - Game Dev Unlocked – https://www.youtube.com/c/

GameDevUnlocked/videos – 25 min – **24 XP**

**Video:** "How to Grow Your Game Dev Portfolio" - Jonas Tyroller –

https://www.youtube.com/c/JonasTyroller – 18 min – **21 XP**

**Article:** "Game Dev Press Kit Template" – **18 XP**

**Tool:** OBS \(free video recording\) – https://obsproject.com/ – **15 XP**

**Mini-Project: "Portfolio Audit" **

**Objective:** Review your itch.io profile and games. Create a marketing document for one game. 

**3-Step Instructions:**

1. Screenshot each game's itch.io page. Evaluate: Is description clear? Are screenshots appealing? 

2. Create a press kit for your best game \(template: Title, description, 1 sentence hook, team, download links, screenshots\). 

3. Write 3 social media posts promoting your game \(Twitter/Reddit format\). 

**XP Reward:** 75 XP

**LEVEL 4 CAPSTONE PROJECT: "The Visionary Developer" **

**Project Title:** *The Visionary Developer* – A **indie game of YOUR design** that is **visually polished,** **narratively engaging, and market-ready**. 

**XP Reward:** 600 XP

**Scenario:**

You are now a junior indie developer. Your task: **design and execute a game that is yours alone**—

concept to launch. This is your signature work. It should be something you'd show at a game dev summit. 

**Requirements:**

100% your creative vision \(engine, art style, narrative, mechanics\)

Visually distinctive \(unique art style OR exceptional shader work\)

Narratively coherent \(story serves gameplay, or vice versa\)

30-60 minutes of content \(depending on genre\)

Published on itch.io, Steam \(optional\), and showcased on portfolio **Playable by 10\+ people; collect feedback**

**Execution Checklist \(15\+ Steps\):**

□ **Step 1:** **Ideate & Validate:** Brainstorm 5 game concepts. For each, write: Title, One-Sentence Hook, Why It's Fun, Unique Visual Style. Share with game dev community \(Discord, Reddit\). Vote on favorite. 

□ **Step 2:** **Design Document:** Write a 5-10 page design document including: Premise, Target Audience, Core Mechanics, Art Direction, Narrative Outline, Level Breakdown, Unique Selling Points \(USP\). Commit to Git. 

□ **Step 3:** **Visual Identity:** Choose color palette \(3-5 colors\). Create mood board \(reference art from games you love\). Design character/asset silhouettes. Establish consistent style. 

□ **Step 4:** **Prototype Core Loop:** Build a 5-minute vertical slice \(one level showcasing ALL core mechanics\). Test if fun. If not, iterate design. 

□ **Step 5:** **Narrative Pre-Production:** If story-heavy, write full script. If story-light, create environmental narrative \(level design tells story\). Map dialogue tree. Storyboard key moments. 

□ **Step 6:** **Asset Production:** Create/commission all art \(sprites, 3D models, backgrounds, UI\). 

Organize by level. Aim for 80% done before coding begins. 

□ **Step 7:** **Audio Pre-Production:** Compose or source music \(multiple tracks for different scenes\). 

Record/edit foley. Create audio library organized by SFX type. 

□ **Step 8:** **Engine & Architecture Setup:** Set up project with professional folder structure. Create base systems \(UI Manager, Audio Manager, Save Manager\). Establish code standards. 

□ **Step 9:** **Core Systems Implementation:** Build all Level 2 systems \(menus, progression, scoring, audio\) tailored to your game. 

□ **Step 10:** **Content Creation \(Levels/Missions\):** Build Level 1 \(teach mechanics\). Level 2-4

\(expand/complicate\). Boss/finale. Each level tested solo before integration. 

□ **Step 11:** **Advanced Polish:** Implement all visual effects \(particles, shaders, transitions\). Add juice \(screen shake, feedback animations\). Optimize performance. 

□ **Step 12:** **Narrative Integration:** Implement dialogue system. Integrate story beats into gameplay. 

Ensure pacing is balanced \(action/calm\). 

□ **Step 13:** **Playtesting Round 1:** Invite 5 playtesters \(game dev friends, online communities\). Have them play without instructions. Record feedback: difficulty, clarity, fun factor, bugs. 

□ **Step 14:** **Iteration & Balance:** Fix bugs. Adjust difficulty based on feedback. Polish based on player reactions. Repeat with different playtesters until satisfaction threshold. 

□ **Step 15:** **Pre-Launch Preparation:**

Create trailer \(60-90 sec gameplay GIF/video using OBS\). 

Write marketing copy \(300-word description, 1-sentence hook\). 

Take professional screenshots \(5-8 key moments\). 

Create press kit \(PDF with all above \+ team info \+ download links\). 

Prepare social media posts \(Twitter, Reddit, Discord\). 

□ **Step 16:** **Launch:** Upload to itch.io. Set pricing \(free or $2-15 depending on scope\). Post on itch, Reddit \(/r/gamedev, /r/playmygame\), Discord communities. 

□ **Step 17:** **Post-Launch Support:** Monitor feedback. Fix critical bugs. Respond to player comments. 

Update itch.io with any patches. 

**Acceptance Criteria:**

✅ Game is complete, bug-free, and playable end-to-end \(30-60 min content\). 

✅ Visually polished: consistent art style, smooth animations, professional UI. 

✅ Narratively coherent: story/environmental storytelling is clear and engaging. 

✅ 10\+ playtesters give positive feedback \(>70% say "I'd recommend this"\). 

✅ Published on itch.io with professional presentation \(trailer, description, screenshots\). 

✅ Code is clean, well-documented, and on GitHub. 

✅ You can talk about your game confidently for 5\+ minutes \(this matters in interviews\). 

✅ Parents/non-gamers can understand the game from screenshots alone. 

**Level 5: Deployment & Portfolio – Shipping, Marketing & Professional Presence** **Level Objective:** **Ship a game to Steam or major platform. Build professional portfolio. **

**Establish game dev brand. **

**Total Level XP: 850 XP**

**Lesson 1: Steam Publishing, Platform Requirements & Build Processes**

**Description:**

itch.io is great for prototypes, but **Steam is where players discover indie games**. Learn Steam publishing pipeline: Steamworks, build signing, platform-specific tweaks \(Windows/Mac/Linux\), DRM, achievements, and community hubs. Understand platform requirements \(minimum specs, controller support\). Learn versioning and patching post-launch. 

**Resources:**

**Video:** "How to Publish a Game on Steam" - Game Dev Unlocked – https://www.youtube.com/c/G

ameDevUnlocked/videos – 25 min – **24 XP**

**Documentation:** Steamworks Docs – https://partner.steamgames.com/ – **20 XP**

**Article:** "Steam Publishing Checklist" – **18 XP**

**Video:** "Building for Multiple Platforms" - Unity/Godot Docs – 15 min – **20 XP**

**Mini-Project: "Build Pipeline" **

**Objective:** Build your Level 4 game for Windows, macOS, and Linux. Test each build. 

**3-Step Instructions:**

1. In engine build settings, set up build configurations for each platform. 

2. Build all three versions. Test that each runs without errors. 

3. Document build time, file size, any platform-specific issues. 

**XP Reward:** 75 XP

**Lesson 2: Portfolio Website, GitHub Presence & Professional Branding**

**Description:**

Your itch.io profile and GitHub are your resume. Learn to create a **professional portfolio website** \(GitHub Pages is free\), write compelling README files, and establish consistent personal branding \(logo, colors, tone\). Employers check your GitHub before interviewing you. Make it shine. 

**Resources:**

**Video:** "Building a Game Dev Portfolio Website" - Jonas Tyroller –

https://www.youtube.com/c/JonasTyroller – 20 min – **22 XP**

**Article:** "GitHub Profile Tips for Game Developers" – **18 XP**

**Tool:** GitHub Pages \(free hosting\) – https://pages.github.com/ – **15 XP**

**Tutorial:** "Create Portfolio with GitHub Pages" – 15 min – **20 XP**

**Mini-Project: "Portfolio Website" **

**Objective:** Create a simple portfolio site listing all your games with links, screenshots, and descriptions. 

**3-Step Instructions:**

1. Use GitHub Pages \(create repo named username.github.io\). 

2. Create index.html with: your name, bio, list of games \(with links to itch.io\), contact. 

3. Style with CSS. Deploy \(GitHub Pages auto-builds\). Share link. 

**XP Reward:** 75 XP

**Lesson 3: Community Engagement, Networking & Job Readiness**

**Description:**

Game dev is a **small, collaborative community**. Learn to contribute to open-source game projects, engage authentically on Discord/Reddit, attend game jams, and network at conferences or online events. Your GitHub contributions and community reputation matter as much as your portfolio. Learn to interview well: prepare stories about challenges overcome, technical decisions, and lessons learned. 

**Resources:**

**Video:** "Networking in Game Dev" - Game Dev Unlocked – https://www.youtube.com/c/GameDev

Unlocked/videos – 18 min – **21 XP**

**Video:** "Acing Game Dev Interviews" - Jonas Tyroller – https://www.youtube.com/c/JonasTyroller

– 20 min – **22 XP**

**Community:** r/gamedev Discord – https://discord.gg/reddit-gamedev – **15 XP** \(join \+ intro\) **Event:** Participate in one game jam \(Ludum Dare, Global Game Jam\) – **25 XP**

**Mini-Project: "Contribute to Open Source" **

**Objective:** Contribute one meaningful PR \(pull request\) to an open-source game project. 

**3-Step Instructions:**

1. Find an open-source game repo on GitHub \(search "open source game"\). 

2. Fix a bug or add a small feature. Write clear PR description. 

3. Submit PR. Respond to feedback. Get merged \(or learn from rejection\). 

**XP Reward:** 75 XP

**Lesson 4: Indie Developer Sustainability & Long-Term Career Planning** **Description:**

Making one game is exciting. Making a **sustainable career** requires understanding business: pricing strategy, live service models, funding \(grants, publishers, crowdfunding\), taxes, and work-life balance. 

Learn when to go indie solo vs. join a studio. Understand burnout—game dev crunch is notorious. 

Plan your career: 3-year goal, 10-year goal. What's your "why"? 

**Resources:**

**Video:** "Indie Game Economics" - Game Dev Unlocked – https://www.youtube.com/c/GameDevU

nlocked/videos – 25 min – **24 XP**

**Video:** "Code Monkey: Making a Living as an Indie Dev" –

https://www.youtube.com/c/CodeMonkey – 20 min – **22 XP**

**Article:** "Indie Dev Financial Planning" – **18 XP**

**Podcast/Video:** "GDC Postmortem: \[Popular Indie Game\]" – 30 min – **20 XP**

**Mini-Project: "Business Plan" **

**Objective:** Write a 1-2 page business plan for a game you'd make professionally. 

**3-Step Instructions:**

1. Choose a game concept \(real or hypothetical\). 

2. Plan: Development time, team size, budget estimate, target platform, pricing, post-launch support. 

3. Revenue projection: How many copies need to sell at what price to break even? 

**XP Reward:** 75 XP

**LEVEL 5 CAPSTONE PROJECT: "The Professional Indie Developer" **

**Project Title:** *The Professional Indie Developer* – **Ship a game to Steam. Build a professional** **presence. Get hired \(or go indie successfully\). **

**XP Reward:** 600 XP

**Scenario:**

You've built Level 4 game. Now go **pro**. Your capstone is twofold: \(1\) **Ship your Level 4 game to** **Steam** \(or secure funding/publisher deal\), and \(2\) **Present yourself as job-ready** to studios or establish yourself as indie with sustainable revenue. 

**Execution Checklist \(15\+ Steps\):**

□ **Step 1:** **Finalize Game:** Ensure Level 4 game is bug-free, feature-complete, and ready for serious audiences. Playtest with 15\+ people outside your immediate circle. Iterate based on feedback. 

□ **Step 2:** **Steamworks Setup:** Create Steamworks account \(costs $100 per game, one-time\). 

Complete company information, tax forms, payment methods. 

□ **Step 3:** **Steam Depot Configuration:** Configure build depots for each platform \(Windows/Mac/Linux\). Upload build files to Steamworks. Test via beta branch. 

□ **Step 4:** **Store Page Creation:** Write Steam store page:

Title & Tagline \(50 chars max\)

Short Description \(150 chars\)

Detailed Description \(3-5 paragraphs, sell the game\)

Screenshots \(8\+ showing different features\)

Trailer \(60-90 sec gameplay video\)

Genres, tags \(4-5 most relevant\)

Minimum system requirements

□ **Step 5:** **Achievements & Community Setup:** Create 10-15 Steam achievements tied to gameplay milestones. Set up community hub \(optional\). Enable reviews. 

□ **Step 6:** **Marketing Materials:**

Professional GIF \(looping gameplay, no audio, <3 MB\). 

Trailer \(render with OBS or video editor; upload to YouTube, embed on Steam\). 

Press kit \(PDF: 1 page with game description, team bio, download links, high-res screenshot\). 

Social media assets \(1-2 posts for Twitter, Reddit, Discord\). 

□ **Step 7:** **Platform Optimization:** Build for each platform; test:

Windows: Ensure .exe runs on clean PC \(no dev tools installed\). 

macOS: Code sign \(if distributing outside Steam\). 

Linux: Test on two distros \(Ubuntu, Fedora\). 

Controller support: Gamepad input works if applicable. 

□ **Step 8:** **Pre-Launch Buzz:** 30 days before launch, announce on Reddit \(/r/gamedev, 

/r/IndieGaming\), Discord, and your mailing list. Offer beta access to press/influencers. 

□ **Step 9:** **Press Outreach:** Email press kits to 20 indie game reviewers/YouTubers. Target those covering your game's genre. Personalize each email \(no mass copy-paste\). 

□ **Step 10:** **Portfolio Website Update:** Add your game to your portfolio website. Include Steam link, description, and "Available Now" badge. 

□ **Step 11:** **GitHub Final Push:** Ensure your game's open-source repos are clean, documented, and listed on your GitHub profile. Pin 2-3 best projects. 

□ **Step 12:** **LinkedIn & Professional Presence:** Update LinkedIn profile with game credits, any industry connections. Ask previous teammates/playtesters for recommendations. 

□ **Step 13:** **Job Applications \(Optional Path\):** If pursuing studios, craft resume highlighting your projects, technical skills, and shipped game. Apply to studios you admire. Prepare interview stories

\(challenge overcome, technical decision made, lesson learned\). 

□ **Step 14:** **Community Engagement:** Join Discord communities \(r/gamedev Discord, Game Dev League, Godot community\). Share your game. Respond to player feedback. Build reputation as responsive dev. 

□ **Step 15:** **Launch Day:** Release on Steam. Post announcements everywhere simultaneously. 

Monitor reviews and feedback. Plan post-launch patches \(bug fixes, balance adjustments\). 

□ **Step 16:** **Post-Launch Support:** Week 1-4, release patches addressing critical issues. Month 2-3, balance/content updates. Month 4\+, either transition to next project or support in maintenance mode. 

□ **Step 17 \(Success Metric\):** Aim for:

100\+ sales in first month \(or break-even if free\). 

70%\+ positive reviews. 

3\+ job interview offers \(or $5K\+ revenue if indie path\). 

**Acceptance Criteria:**

✅ Game is live on Steam \(or funded/published\). 

✅ Store page is professional and compelling. 

✅ Game is stable, bug-free, and runs on all targeted platforms. 

✅ Marketing materials are distributed \(press kits sent, social posts live\). 

✅ Portfolio website is live and polished. 

✅ GitHub is organized, documented, and showcases your best work. 

✅ You have interviewed at studios OR generated meaningful revenue as indie. 

✅ You've contributed to game dev community \(Discord, Reddit, open-source\). 

✅ You can articulate your career goals and how this game serves them. 



## PART 3: APPENDIX

**Top Job Boards for Game Developers**

**Platform**

**URL**

**Best For**

**Indeed**

https://indeed.com

General job search, filter by "game developer" 

**LinkedIn**

https://linkedin.com/jobs

Studios, corporate roles, networking

GameDev.net** Jobs**

https://www.gamedev.net/jobs/

Game dev specific, indie studios

itch.io** \(Jobs Section\)**

https://itch.io

Indie studios, contract work

**Polywork**

https://polywork.com

Indie devs, freelance, portfolio-first

**AngelList**

https://angel.co

Startup game studios, equity options

**Portfolio Hosting Sites \(All Free\)**

**Platform**

**URL**

**Notes**

itch.io

https://itch.io

Best for indie games, community-driven, free forever

**GitHub Pages**

https://pages.github.com

Free custom domain, host portfolio website

**YouTube**

https://youtube.com

Upload trailers, gameplay videos

**Twitter/X**

https://twitter.com

GIFs, short clips, community engagement

**Artstation**

https://artstation.com

Art portfolio \(if you're also an artist\)

**Relevant Communities \(Active, Supportive\)**

**Discord Servers:**

**r/gamedev Official Discord** – https://discord.gg/reddit-gamedev – 30K\+ members, all engines, 

daily discussions. 

**Game Dev League** – https://discord.gg/gamedev – 112K\+ members, largest general game dev

server. 

**Godot Engine Community** – https://discord.gg/godotengine – 43K\+ members, Godot-specific. 

**Unity Developer Community** – https://discord.gg/unity – Unofficial but active, 120K\+ members. 

**Reddit Communities:**

**r/gamedev** – https://reddit.com/r/gamedev – 700K\+ subscribers, discussion, jobs, feedback. 

**r/playmygame** – https://reddit.com/r/playmygame – Playtest your game, get feedback. 

**r/IndieGaming** – https://reddit.com/r/IndieGaming – Showcase indie games, celebrate launches. 

**Game Jams \(Free, Online\):**

**Ludum Dare** – https://ldjam.com – 48-hour or 72-hour jams, quarterly, thousands of participants. 

**Global Game Jam** – https://globalgamejam.org – Annual, local \+ virtual, largest game jam. 

itch.io** Game Jams** – https://itch.io/jams – Dozens per month, all skill levels. 

**Final Words**

You've completed a journey from **"I don't even know how to start" ** to **"I shipped a game to Steam." **

That's extraordinary. You've learned not just how to code games, but how to *think* like a game developer—balancing fun, clarity, and polish. 

**Your next steps:**

1. **Ship. ** Don't let perfectionism delay you. Your 5th game will always be better than your 1st. Ship early. 

2. **Iterate. ** Player feedback is gold. Listen, adapt, improve. 

3. **Network. ** Game dev is a small world. Be kind, share knowledge, collaborate. 

4. **Stay curious. ** Play other indie games. Analyze what makes them tick. Write postmortems of your own games. 

5. **Take care of yourself. ** Crunch is the norm in big studios but isn't mandatory in indie. Set boundaries. 

You now have the skills to **land a junior dev role** at a studio, **sustain yourself as an indie**, or **teach** **others** what you've learned. 

The games industry needs you. Welcome to the profession. 

**Total Track XP: 3,850 XP**

**Estimated Time to Completion: 6-12 months** \(depending on your pace and scope of capstone projects\)

**Your Game Dev Journey Begins Now. **

*This curriculum was designed for Nithin and the AMA Career Platform. Gamers excel at game* *development because they already understand player psychology, balance, and feedback loops. You* *just needed the technical skills to execute your vision. You have them now. *

\[1\] \[2\] \[3\] \[4\] \[5\] \[6\] \[7\] \[8\] \[9\] \[10\] \[11\] \[12\] \[13\] \[14\] \[15\] \[16\] \[17\] \[18\] \[19\] \[20\] \[21\] \[22\] \[23\] \[24\] \[25\] \[26\] \[27\] \[28\] \[29\] \[30\] \[31\] \[32\]

\[33\] \[34\] \[35\] \[36\] \[37\] \[38\] \[39\] \[40\] \[41\] \[42\] \[43\] \[44\] \[45\] \[46\] \[47\] \[48\] \[49\] \[50\] \[51\] \[52\] \[53\] \[54\] \[55\] \[56\] \[57\] \[58\] \[59\]

⁂

1. https://www.youtube.com/channel/UCYbK\_tjZ2OrIZFBvU6CCMiA

2. https://www.gamedevunlocked.com/faq

3. https://www.reddit.com/r/godot/comments/1gxemlu/learning\_game\_dev\_and\_coding\_with\_godot\_as\_a/

4. https://www.youtube.com/watch?v=MiPkcTaRbfQ

5. https://docs.godotengine.org/en/stable/community/tutorials.html

6. https://www.freecodecamp.org/news/learn-game-development-by-building-your-first-platformer-with-godot/

7. https://www.youtube.com/watch?v=AmGSEH7QcDg

8. https://www.reddit.com/r/gamedev/comments/1mcc5fq/code\_monkey\_i\_earn\_more\_from\_courses\_and\_youtub

e/

9. https://www.youtube.com/watch?v=S8lMTwSRoRg

10. https://unity.com/learn

11. https://www.youtube.com/watch?v=4kg2N-t2tWI

12. https://www.youtube.com/c/Brackeys/videos

13. https://www.reddit.com/r/gamedev/comments/1anl3tf/looking\_for\_a\_website\_to\_upload\_my\_games\_portfolio/

14. https://itch.io/developers

15. https://itch.io/docs/creators/faq

16. https://gdevelop.io/page/how-to-publish-your-game-on-itch-io-and-why-you-should

17. https://docs.monogame.net/articles/tutorials/building\_2d\_games/26\_publish\_to\_itch/index.html

18. https://gamedesignskills.com/game-development/developer-salary/

19. https://sketchfab.com/Emerald\_Eel/collections/free-game-assets-d7263076d3b043a296321b8085a723d9

20. https://community.gamedev.tv/t/using-itch-io-as-a-portfolio-host/156048

21. https://www.techneeds.com/2025/08/23/game-dev-average-salary-compared-to-other-tech-careers/

22. https://itch.io/game-assets/free/tag-blender

23. https://www.youtube.com/watch?v=LOhfqjmasi0

24. https://www.youtube.com/watch?v=SVl\_tlbGrh4

25. https://www.youtube.com/watch?v=9xAumJRKV6A

26. https://www.youtube.com/@blenderguru

27. https://www.blender.org/support/tutorials/

28. https://www.youtube.com/watch?v=Ci3Has4L5W4

29. https://www.reddit.com/r/gamedev/comments/1os10r/resources\_for\_freeroyaltyfree\_assets\_for\_game\_dev/

30. https://www.simplilearn.com/tutorials/python-tutorial/python-ide

31. https://www.creativebloq.com/3d-tips/blender-tutorials-1232739

32. https://opengameart.org/content/free-3d-assets

33. https://www.youtube.com/watch?v=dz9\_-2G6o3o

34. https://www.reddit.com/r/Unity3D/comments/1hk6xn1/are\_brackeys\_tutorials\_still\_a\_solid\_way\_to\_learn/

35. https://www.pygame.org/wiki/tutorials

36. https://www.youtube.com/watch?v=FfWpgLFMI7w

37. https://www.geeksforgeeks.org/python/pygame-tutorial/

38. https://inventwithpython.com/makinggames.pdf

39. https://realpython.com/pygame-a-primer/

40. https://github.com/topics/indiegame

41. https://docs.godotengine.org/en/stable/getting\_started/step\_by\_step/index.html

42. https://www.youtube.com/watch?v=RuTmd4g5K8Q

43. https://www.reddit.com/r/gamedev/comments/u5kbo0/whats\_the\_best\_place\_to\_host\_a\_gamedev\_portfolio/

44. https://www.youtube.com/watch?v=e1zJS31tr88

45. https://www.youtube.com/watch?v=YtzIXCKr8Wo

46. https://dicebreaker.de/prompts/

47. https://www.reddit.com/r/gamedev/comments/1i411w6/looking\_for\_game\_dev\_discord\_servers/

48. https://www.reddit.com/r/gamedev/

49. https://www.linkedin.com/posts/alexanderrehm\_discord-channels-to-learn-more-about-game-activity-733884314

5624866816-670j

50. https://accelerator.xsolla.com/blog/discord-servers-that-game-devs-should-join

51. https://alternativeto.net/software/aseprite/?license=free

52. https://www.mediamusiccomposer.com/blog/10-best-places-to-download-free-royalty-free-game-sound-effects

53. https://www.reddit.com/r/gamedev/wiki/faq/

54. https://www.reddit.com/r/gamedev/comments/1mm7nnw/best\_alternative\_to\_aseprite/

55. https://www.reddit.com/r/godot/comments/bd0nh0/are\_there\_free\_sound\_effects\_sites\_available\_for/

56. https://www.freecodecamp.org/news/c-game-development-with-raylib/

57. https://www.youtube.com/watch?v=Y3Rs1z7it5M

58. https://www.youtube.com/watch?v=XtQMytORBmM

59. https://www.freecodecamp.org/news/learn-game-development-with-javascript-and-kaplay/



