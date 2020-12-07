import P5 from "p5";
import * as mm from '@magenta/music/es6';
import { EMPTY, TWINKLE_FIRST_HALF, TWINKLE_SECOND_HALF } from "./defaultSequences";
import EditableNoteSequence from "./editableNoteSequence";
import Generator from "./generator"

const parentA = new EditableNoteSequence(
  TWINKLE_FIRST_HALF,'parentASequenceEditor',
  document.getElementById('parentAButton') as HTMLButtonElement,
  document.getElementById('parentAScrubUp') as HTMLButtonElement,
  document.getElementById('parentAScrubDown') as HTMLButtonElement,
  document.getElementById('parentATitleButton') as HTMLButtonElement,
  document.getElementById('parentASelector') as HTMLDivElement
);
const parentB = new EditableNoteSequence(
  TWINKLE_SECOND_HALF, 'parentBSequenceEditor',
  document.getElementById('parentBButton') as HTMLButtonElement,
  document.getElementById('parentBScrubUp') as HTMLButtonElement,
  document.getElementById('parentBScrubDown') as HTMLButtonElement,
  document.getElementById('parentBTitleButton') as HTMLButtonElement,
  document.getElementById('parentBSelector') as HTMLDivElement
);
const child = new EditableNoteSequence(
  EMPTY, 'childSequenceEditor',
  document.getElementById('childButton') as HTMLButtonElement,
  document.getElementById('childScrubUp') as HTMLButtonElement,
  document.getElementById('childScrubDown') as HTMLButtonElement,
  document.getElementById('childTitleButton') as HTMLButtonElement,
  document.getElementById('childSelector') as HTMLDivElement
);

new P5(parentA.sketch);
new P5(parentB.sketch);
new P5(child.sketch);

const generator = new Generator('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small', parentA.sequence, parentB.sequence);

const generateButton = document.getElementById('generateButton') as HTMLButtonElement;
const swapChildParentAButton = document.getElementById('swapChildParentAButton') as HTMLButtonElement;
const swapChildParentBButton = document.getElementById('swapChildParentBButton') as HTMLButtonElement;
const helpButton = document.getElementById('helpButton') as HTMLButtonElement;

const player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/salamander');

generateButton.addEventListener('click', () => {
  if (player.isPlaying()) {
    stopPlayer();
  }

  child.button.disabled = true;
  swapChildParentAButton.disabled = true;
  swapChildParentBButton.disabled = true;

  generator.setParents(parentA.sequence, parentB.sequence);
  generator.generate().then((interpolatedSequence) => {
    child.sequence = interpolatedSequence;
    child.button.disabled = false;
    swapChildParentAButton.disabled = false;
    swapChildParentBButton.disabled = false;
  });
});

swapChildParentAButton.addEventListener('click', () => swapSequences(parentA, child));
swapChildParentBButton.addEventListener('click', () => swapSequences(parentB, child));

parentA.button.addEventListener('click', () => playSequence(parentA));
parentB.button.addEventListener('click', () => playSequence(parentB));
child.button.addEventListener('click', () => playSequence(child));

helpButton.addEventListener('click', () => {
  if (document.getElementById('help').style.display === 'block') {
    document.getElementById('help').style.setProperty('display', 'none');
  }
  else {
    document.getElementById('help').style.setProperty('display', 'block');
  }
});

function playSequence(sequence: EditableNoteSequence) {
  if (player.isPlaying()) {
    stopPlayer();
  } else {
    player.loadSamples(sequence.sequence).then(() => {
      player.start(sequence.sequence);
    });
  }
}

function swapSequences(sequenceA: EditableNoteSequence, sequenceB: EditableNoteSequence) {
  if (player.isPlaying()) {
    stopPlayer();
  }
  const tempNotes = sequenceA.sequence;
  sequenceA.sequence = sequenceB.sequence;
  sequenceB.sequence = tempNotes;
}

function stopPlayer() {
  player.stop();
}