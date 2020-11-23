/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as mm from '@magenta/music/es6';

const mvae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small');

const TWINKLE_FIRST_HALF: mm.INoteSequence = {
  notes: [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2, program: 0},
    {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4, program: 0},
    {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 6, program: 0},
    {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 8, program: 0},
    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10, program: 0},
    {pitch: 69, quantizedStartStep: 10, quantizedEndStep: 12, program: 0},
    {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
    {pitch: 65, quantizedStartStep: 16, quantizedEndStep: 18, program: 0},
    {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 20, program: 0},
    {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22, program: 0},
    {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 24, program: 0},
    {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26, program: 0},
    {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 28, program: 0},
    {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32, program: 0}
  ],
  tempos: [
    {time: 0, qpm: 60}
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 96
};

const TWINKLE_SECOND_HALF: mm.INoteSequence = {
  notes: [
    {pitch: 67, quantizedStartStep: 0, quantizedEndStep: 2, program: 0},
    {pitch: 67, quantizedStartStep: 2, quantizedEndStep: 4, program: 0},
    {pitch: 65, quantizedStartStep: 4, quantizedEndStep: 6, program: 0},
    {pitch: 65, quantizedStartStep: 6, quantizedEndStep: 8, program: 0},
    {pitch: 64, quantizedStartStep: 8, quantizedEndStep: 10, program: 0},
    {pitch: 64, quantizedStartStep: 10, quantizedEndStep: 12, program: 0},
    {pitch: 62, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
    {pitch: 67, quantizedStartStep: 16, quantizedEndStep: 18, program: 0},
    {pitch: 67, quantizedStartStep: 18, quantizedEndStep: 20, program: 0},
    {pitch: 65, quantizedStartStep: 20, quantizedEndStep: 22, program: 0},
    {pitch: 65, quantizedStartStep: 22, quantizedEndStep: 24, program: 0},
    {pitch: 64, quantizedStartStep: 24, quantizedEndStep: 26, program: 0},
    {pitch: 64, quantizedStartStep: 26, quantizedEndStep: 28, program: 0},
    {pitch: 62, quantizedStartStep: 28, quantizedEndStep: 32, program: 0}
  ],
  tempos: [
    {time: 0, qpm: 60}
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 96
};

let parentSequence1 = TWINKLE_FIRST_HALF;
let parentSequence2 = TWINKLE_SECOND_HALF;
let childSequence: mm.INoteSequence;

let parent1Viz = new mm.PianoRollSVGVisualizer(parentSequence1, document.querySelector('#parent1Viz'));
let parent2Viz = new mm.PianoRollSVGVisualizer(parentSequence2, document.querySelector('#parent2Viz'));
let childViz: mm.PianoRollSVGVisualizer;

const playParent1Button = document.getElementById('playParent1Button') as HTMLButtonElement;
const playParent2Button = document.getElementById('playParent2Button') as HTMLButtonElement;
const playChildButton   = document.getElementById('playChildButton')   as HTMLButtonElement;
const genChildButton    = document.getElementById('genChildButton')    as HTMLButtonElement;

const swapChildParent1Button = document.getElementById('swapChildParent1Button') as HTMLButtonElement;
const swapChildParent2Button = document.getElementById('swapChildParent2Button') as HTMLButtonElement;

const player = new mm.SoundFontPlayer(
  'https://storage.googleapis.com/magentadata/js/soundfonts/salamander',
  undefined, undefined, undefined,
  {
    run: (note: any) => {
      parent1Viz.redraw();
      parent2Viz.redraw();
      childViz.redraw();
    },
    stop: () => {
      playParent1Button.textContent = 'Play';
      playParent2Button.textContent = 'Play';
      playChildButton.textContent   = 'Play';
    }
  }
);

playParent1Button.addEventListener('click', () => {
  if (player.isPlaying()) {
    stopPlayer();
  } else {
    playParent1Button.textContent = 'Stop';
    player.loadSamples(parentSequence1).then(() => {
      player.start(parentSequence1);
    });
  }
});

playParent2Button.addEventListener('click', () => {
  if (player.isPlaying()) {
    stopPlayer();
  } else {
    playParent2Button.textContent = 'Stop';
    player.loadSamples(parentSequence2).then(() => {
      player.start(parentSequence2);
    });
  }
});

playChildButton.addEventListener('click', () => {
  if (player.isPlaying()) {
    stopPlayer();
  } else {
    playChildButton.textContent = 'Stop';
    player.loadSamples(childSequence).then(() => {
      player.start(childSequence);
    });
  }
});

genChildButton.addEventListener('click', () => {
  if (player.isPlaying()) {
    stopPlayer();
  }

  playChildButton.disabled = true;
  swapChildParent1Button.disabled = true;
  swapChildParent2Button.disabled = true;

  mvae.initialize().then(() => {
    mvae.similar(parentSequence1, 1, randomAG(5)).then((gameteSequences1: mm.INoteSequence[]) => {
      mvae.similar(parentSequence2, 1, randomAG(5)).then((gameteSequences2: mm.INoteSequence[]) => {
        mvae.interpolate([gameteSequences1[0], gameteSequences2[0]], 3).then((interpolatedSequences: mm.INoteSequence[]) => {
          if (interpolatedSequences.length > 2) {
            childSequence = interpolatedSequences[1];
            childViz   = new mm.PianoRollSVGVisualizer(childSequence, document.querySelector('#childViz'));
            childViz.redraw();
          }

          mvae.dispose();
          playChildButton.disabled = false;
          swapChildParent1Button.disabled = false;
          swapChildParent2Button.disabled = false;
        });
      });
    });
  });
});

swapChildParent1Button.addEventListener('click', () => {
  if (player.isPlaying()) {
    stopPlayer();
  }
  parentSequence1 = childSequence;
  parent1Viz = new mm.PianoRollSVGVisualizer(parentSequence1, document.querySelector('#parent1Viz'));
  parent1Viz.redraw();
});

swapChildParent2Button.addEventListener('click', () => {
  if (player.isPlaying()) {
    stopPlayer();
  }
  parentSequence2 = childSequence;
  parent2Viz = new mm.PianoRollSVGVisualizer(parentSequence2, document.querySelector('#parent2Viz'));
  parent2Viz.redraw();
});

function stopPlayer() {
  playParent1Button.textContent = 'Play';
  playParent2Button.textContent = 'Play';
  playChildButton.textContent = 'Play';
  player.stop();
}

function randomAG(n: number): number {
  let result = 0;
  for(let i = 0; i < n; i++) {
    result += Math.random();
  }
  return result / n;
}