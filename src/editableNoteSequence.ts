import P5 from "p5";
import * as mm from '@magenta/music/es6';
import { EMPTY, TWINKLE_FIRST_HALF, TWINKLE_SECOND_HALF } from './defaultSequences';

export default class EditableNoteSequence {
  public sequence: mm.INoteSequence;
  public button: HTMLButtonElement;
  public base: number;

  private parentID: string;

  constructor(sequence: mm.INoteSequence, parentID: string, button: HTMLButtonElement, up: HTMLButtonElement, down: HTMLButtonElement, title: HTMLButtonElement, selector: HTMLDivElement) {
    this.sequence = sequence;
    this.parentID = parentID;
    this.button = button;

    this.base = 58;

    up.addEventListener('click', () => this.base = Math.min(this.base + 2, 96));
    down.addEventListener('click', () => this.base = Math.max(this.base - 2, 21));
    title.addEventListener('click', () => {
      selector.style.setProperty('display', 'grid');
      document.getElementById(parentID).style.setProperty('display', 'none');
    });
    const backButton = selector.getElementsByClassName('selectBack')[0] as HTMLButtonElement;
    backButton.addEventListener('click', () => {
      selector.style.setProperty('display', 'none');
      document.getElementById(parentID).style.setProperty('display', 'block');
    });
    const emptyButton = selector.getElementsByClassName('selectEMPTY')[0] as HTMLButtonElement;
    emptyButton.addEventListener('click', () => {
      this.sequence = EMPTY;
      selector.style.setProperty('display', 'none');
      document.getElementById(parentID).style.setProperty('display', 'block');
    });
    const twinkleButton = selector.getElementsByClassName('selectTWINKLE_FIRST_HALF')[0] as HTMLButtonElement;
    twinkleButton.addEventListener('click', () => {
      this.sequence = TWINKLE_FIRST_HALF;
      selector.style.setProperty('display', 'none');
      document.getElementById(parentID).style.setProperty('display', 'block');
    });
    const twinkle2Button = selector.getElementsByClassName('selectTWINKLE_SECOND_HALF')[0] as HTMLButtonElement;
    twinkle2Button.addEventListener('click', () => {
      this.sequence = TWINKLE_SECOND_HALF;
      selector.style.setProperty('display', 'none');
      document.getElementById(parentID).style.setProperty('display', 'block');
    });
  }

  public sketch = (p5: P5) => {
    let dragStartX: number;
    let dragStartY: number;
    let createNoteOnDrag = true;

    p5.setup = () => {
      const canvas = p5.createCanvas(400, 200);
      canvas.parent(this.parentID);
    };
  
    p5.draw = () => {
      this.drawBackground(p5);
      this.drawCursor(p5);
      this.drawNotes(p5);
    };

    p5.mousePressed = () => {
      createNoteOnDrag = true;
      dragStartX = p5.mouseX;
      dragStartY = p5.mouseY;
      createNoteOnDrag = this.addNote(p5, dragStartX, dragStartY);
    };

    p5.mouseDragged = () => {
      if (createNoteOnDrag) {
        if (p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
          this.sequence.notes.pop();
        }
        this.addNote(p5, dragStartX, dragStartY);
      }
    };
  };
  
  private drawBackground(p5: P5) {
    p5.background(120);
    p5.strokeWeight(1);
    for (let i = 0; i < 12; i++) {
      p5.fill(this.getColor(p5, this.base + i + 1));
      p5.stroke(this.getColor(p5, this.base + i + 1, 190));
      p5.rect(0, p5.height - (i + 1) * p5.height / 12, p5.width, p5.height / 12);
    }
  }

  private drawCursor(p5: P5) {
    p5.noStroke();
    const x =  Math.floor(p5.mouseX / p5.width * 16);
    const y = Math.floor(p5.mouseY / p5.height * 12);
    p5.fill(255, 255, 255, 150);
    p5.rect(x / 16 * p5.width, y / 12 * p5.height, p5.width / 16, p5.height / 12);
  }

  private drawNotes(p5: P5) {
    p5.fill(255, 255, 255);
    p5.strokeWeight(3);
    this.sequence.notes.forEach((note: any) => {
      p5.stroke(this.getColor(p5, note.pitch));
      const x = note.quantizedStartStep / 32 * p5.width;
      const y = p5.height - (note.pitch - this.base) / 12 * p5.height;
      const w = (note.quantizedEndStep - note.quantizedStartStep) / 32 * p5.width;
      const h = p5.height / 12;
      p5.rect(x, y, w, h);
    });
  }

  private getColor(p5: P5, pitch: number, alpha = 255): P5.Color {
    const h = 360 - (pitch - 21) * 360 / 87;
    const s = (200 - pitch) / 255;
    const v = (20 + pitch * 235 / 87) / 255;

    const c = s * v;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;

    let r: number;
    let g: number;
    let b: number;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    }
    else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    }
    else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    }
    else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    }
    else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    }
    else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return p5.color((r + m) * 255, (g + m) * 255, (b + m) * 255, alpha);
  }

  private addNote(p5: P5, x: number, y: number): boolean {
    let noteDeleted = false;
    if (p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height
        &&      x >= 0 &&         x <= p5.width &&         y >= 0 &&         y <= p5.height) {
      let quantizedStartStep = Math.floor(x / p5.width * 16) * 2;
      let quantizedEndStep: number;
      if (p5.mouseX < x - 5) {
        if (p5.keyIsDown(p5.SHIFT)) {
          quantizedStartStep++;
        }
        quantizedEndStep = quantizedStartStep + 1;
      }
      else {
        quantizedEndStep = Math.floor(p5.mouseX / p5.width * 32) + 1;
        if (quantizedEndStep == quantizedStartStep + 1) {
          quantizedEndStep++;
        }
      }
      const pitch = Math.floor((p5.height - y) / p5.height * 12) + this.base + 1;
      let indexToRemove = -1;
      this.sequence.notes.forEach((note: any, index: number) => {
        if (quantizedStartStep >= note.quantizedStartStep && quantizedStartStep < note.quantizedEndStep && pitch == note.pitch) {
          indexToRemove = index;
        }
        else if (quantizedStartStep < note.quantizedStartStep && quantizedEndStep > note.quantizedStartStep && pitch == note.pitch) {
          quantizedEndStep = note.quantizedStartStep;
        }
      });
      if (indexToRemove >= 0) {
        this.sequence.notes.splice(indexToRemove, 1);
        noteDeleted = true;
      }
      else {
        this.sequence.notes.push({
          pitch: pitch, 
          quantizedStartStep: quantizedStartStep,
          quantizedEndStep: quantizedEndStep,
          program: 0
        });
      }
    }
    return !noteDeleted;
  }
}