
# Karaoke Box

My entry for [Algorithm-Arena](https://github.com/Algorithm-Arena) [Weekly Challenge #17 - Karaoke Box](https://github.com/Algorithm-Arena/weekly-challenge-17-karaoke-box).

- URL: https://benjaminaster.github.io/karaoke-box/
- Source code: https://github.com/BenjaminAster/karaoke-box
- Demo video: https://www.youtube.com/watch?v=OcksvGfWizo

## Features

- Indicates when the next line starts
- Includes a ball that bounces across the syllables
- Letters get colored in rythm with the music

## Note
For now, only the song "Karma" by Taylor Swift is supported, as _Karaoke Box_ requires songtexts with precise syllable-timing, which have to be created manually. Since I legally do not have the right to directly include the song here, please open the song [on YouTube](https://www.youtube.com/watch?v=pzVYSfzNQ5Y) (must be that exact video!) or [Spotify](https://open.spotify.com/track/7KokYm8cMIXCsGVmUvKtqf) and press play and the start button simultaneously (e.g. by playing the song on your phone while having _Karaoke Box_ opened on a computer).

## Code architecture
The code for this project includes:
- _Karaoke Box_ itself, located in the root directory
- The small helper site that I used to manually time all the syllables of Taylor Swift's "Karma" song, located in the [create-timed-lyrics](./create-timed-lyrics/) folder.
