// ─────────────────────────────────────────────────────────────────────────────
//  EVERYTHING YOU WILL WANT TO EDIT LIVES IN THIS ONE FILE.
//  Text, names, photo paths, captions, the letter, the final message, music.
// ─────────────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL
const asset = (path) => `${BASE}${path}`

export const config = {
  // ── Who is this for? ──────────────────────────────────────────────────────
  name: 'Eva',
  age: 18,
  birthdayDate: '', // optional, e.g. 'October 12, 2026'. Leave '' to hide it.
  creatorName: '', // YOUR name, e.g. 'Sam'. Leave '' to keep it anonymous.

  // While you are still collecting photos, empty slots show a soft heart
  // frame so you can preview the layout. Set to false before sending the link
  // and any slot without a photo disappears completely.
  showEmptyPhotoSlots: true,

  // ── Opening screen ────────────────────────────────────────────────────────
  intro: {
    greeting: 'Hey Eva... 🎀',
    line: 'Someone incredibly special is about to turn 18.',
    button: 'Open Your Surprise ♡',
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    title: 'HAPPY 18TH BIRTHDAY, EVA',
    subtitle: 'To the girl who deserves a little extra magic in her world.',
    button: 'Your Special Day Starts Here ↓',
    photo: {
      src: asset('images/eva-hero.jpg'),
      alt: 'Eva smiling',
      caption: 'Eighteen looks good on you',
      focus: '50% 30%', // which part of the photo stays visible when cropped
    },
  },

  // ── Photo gallery ─────────────────────────────────────────────────────────
  // Add, remove or reorder photos freely. `shape` is 'portrait', 'square' or
  // 'landscape' and only controls the frame; `focus` is the crop centre.
  gallery: {
    title: 'Our Memory Lane',
    intro: 'A few of my favourite pictures of you. Tap any photo to look closer.',
    photos: [
      { src: asset('images/eva-photo-1.jpg'), alt: 'Eva, photo 1', caption: 'that smile', shape: 'portrait', focus: '50% 30%' },
      { src: asset('images/eva-photo-2.jpg'), alt: 'Eva, photo 2', caption: 'pure sparkle', shape: 'square', focus: '50% 35%' },
      { src: asset('images/eva-photo-3.jpg'), alt: 'Eva, photo 3', caption: 'just being you', shape: 'landscape', focus: '50% 40%' },
      { src: asset('images/eva-photo-4.jpg'), alt: 'Eva, photo 4', caption: 'a favourite', shape: 'portrait', focus: '50% 30%' },
      { src: asset('images/eva-photo-5.jpg'), alt: 'Eva, photo 5', caption: 'so you', shape: 'square', focus: '50% 35%' },
      { src: asset('images/eva-photo-6.jpg'), alt: 'Eva, photo 6', caption: 'a little extra magic', shape: 'portrait', focus: '50% 30%' },
    ],
  },

  // ── The letter (replace with your own words!) ─────────────────────────────
  letter: {
    title: 'A Little Message for You ♡',
    greeting: 'Dear Eva,',
    paragraphs: [
      'Eighteen is such a bright, brave number, and you wear it beautifully. Today is all about you: the person you are right now and everyone you are still becoming.',
      'I hope this year wraps you in more happiness than you know what to do with. I hope you feel confident in every room you walk into, that your dreams stay loud, and that the good things find you before you even go looking for them.',
      'You deserve beautiful memories, people who truly appreciate you, and a whole lot of exciting new beginnings. Here is to all of it.',
      'Happy birthday, Eva.',
    ],
    signOff: 'With all my love,',
  },

  // ── The envelope ──────────────────────────────────────────────────────────
  envelope: {
    seal: 'E',
    hint: "There's one more thing I wanted to tell you...",
    tapLabel: 'Tap the envelope to open it',
    cardTitle: 'For Eva',
    message: [
      'I wanted you to have one last note, just for you.',
      "I'm so glad you're in my world. Eighteen suits you, and I really believe the best chapters are still ahead.",
      'Whatever comes next, I hope you never forget how loved you are.',
    ],
    back: 'Back to the surprise',
  },

  // ── Cake ──────────────────────────────────────────────────────────────────
  cake: {
    title: 'Make a Wish, Eva! ✨',
    helper: 'Close your eyes, think of something wonderful, then press the button.',
    button: 'Celebrate 18!',
    againButton: 'Light the candles again',
    wish: 'May every wish you made today find its way back to you.',
  },

  // ── Reasons / wishes ──────────────────────────────────────────────────────
  wishes: {
    title: 'Little Reasons You Deserve the World',
    intro: 'Six little wishes, just for you. Tap one to make it sparkle.',
    cards: [
      { icon: 'smile', text: 'More happiness than you can imagine.' },
      { icon: 'camera', text: 'Beautiful memories worth keeping forever.' },
      { icon: 'compass', text: 'The courage to chase every dream.' },
      { icon: 'users', text: 'People who genuinely appreciate you.' },
      { icon: 'gift', text: 'A year filled with unexpected good things.' },
      { icon: 'book', text: 'A beautiful new chapter at 18.' },
    ],
  },

  // ── Final surprise ────────────────────────────────────────────────────────
  finale: {
    line1: 'And just like that... your next chapter begins. ♡',
    line2: 'Happy 18th Birthday, Eva.',
    button: 'One Last Hug? 🎀',
    message: [
      'Thank you for being exactly who you are.',
      'Go be wonderful. The world is lucky to have you in it.',
    ],
    footer: 'Made with love, especially for Eva. ♡',
    replay: 'Read it all again',
  },

  // ── Music (optional) ──────────────────────────────────────────────────────
  // Drop your own file at public/music/birthday-song.mp3. If it is missing the
  // music button simply does not appear. Set src to '' to turn music off.
  music: {
    src: asset('music/birthday-song.mp3'),
    label: 'Birthday song',
    volume: 0.55,
  },
}
