# Zoe's Princess Castle 👑🦄

A sparkly, tap-only princess game for Zoe (almost 5). A Games by Dad game. No reading, no fail states, and progress is saved on the device.

**Play:** https://howibrettyourmother.github.io/zoes-princess-castle/ (tip: Share → Add to Home Screen)

- 🏰 **Castle hub:** 6 big picture buttons: Unicorn Ride, Ballroom, Tea Party, Dress-Up, Bedroom, Friends.
- 🦄 **Unicorn Ride:** pick a unicorn (rainbow, pink, purple, blue, mint, gold) and gallop across the meadow with a rainbow trail. Tap to jump (double jump works too) and collect 15 stars and hearts.
- 💃 **Ballroom dance party:** Zoe and her friends dance to an original tune. Tap a dancer to make her twirl with sparkles, and tap 🪩 for disco lights.
- 🫖 **Tea party:** tap treats on the tray to set the table, then tap a treat so a friend can eat it ("Yum yum!").
- 👗 **Dress-up:** dress colors, crowns (crown, tiara, star, heart, flower, bow) and hair colors. Tap 💫 to twirl.
- 🛏️ **Bedroom:** 🌙 turns off the lights for a lullaby, twinkling stars and 💤. ☀️ wakes everyone up.
- 💌 **Friends:** Princess Peach, Princess Rosalina, Elsa, Anna, Mommy, Grandma Gail, Gammy, Teacher Amanda and KiddieKlub friends. Tap a friend to hear her say hi. The last 5 friends you tap join the party, ballroom, tea and bedroom.
- 🌟 Stickers come from finishing a ride, the first twirl, serving 6 treats, a goodnight and dancing.

All art and music were made for this game. The characters are simple original SVG drawings, the backgrounds were AI-generated, and the tunes are WebAudio compositions. The princess names are a nod for Zoe; the game has no official character art, logos or music. Voices are pre-recorded Piper TTS clips (`src/gen.sh`) and never use browser speechSynthesis.

It builds as one self-contained `index.html` with `python3 src/build.py`, works offline through a service worker (`sw.js`, so bump `V` on each release), and is tested headless at iPad 1180×820 and iPhone sizes with `src/test.py`.

## New in 1.1
- 🎂 Daily birthday party: blow out candles, pop balloons, open 3 surprise presents each day, friends sing and cheer.
- 🐱 Kitty Princess dress-up (Doodle & Zoe's kitties): gowns, crowns, capes, wands, necklaces. Dressed kitties come to the ball, tea party, birthday, race and bus.
- 🦄 Unicorn Race: tap to go faster, everyone gets a medal.
- 🚌 Bus Ride: drive the school bus, pick up friends, honk, ride to school.
- 🏫 School with Teacher Amanda: painting, counting stars, circle-time music, snack.
