import * as mm from '@magenta/music/es6';

export default class Generator {
  private mvae: mm.MusicVAE;
  private parentSequenceA: mm.INoteSequence;
  private parentSequenceB: mm.INoteSequence;

  constructor(checkpointURL: string, sequenceA: mm.INoteSequence, sequenceB: mm.INoteSequence) {
    this.mvae = new mm.MusicVAE(checkpointURL);
    this.parentSequenceA = sequenceA;
    this.parentSequenceB = sequenceB;
  }

  public setParents(sequenceA: mm.INoteSequence, sequenceB: mm.INoteSequence) {
    this.parentSequenceA = sequenceA;
    this.parentSequenceB = sequenceB;
  }

  public async generate() {
    return new Promise<mm.INoteSequence>((resolve) => {
      let parentSequences: mm.INoteSequence[] = [];
      this.mvae.initialize()
        .then(() => this.mvae.similar(this.parentSequenceA, 1, this.randn_bm(0, 1, 0.3))
          .then((gameteA: mm.INoteSequence[]) => parentSequences = parentSequences.concat(gameteA)))
        .then(() => this.mvae.similar(this.parentSequenceB, 1, this.randn_bm(0, 1, 0.3))
          .then((gameteB: mm.INoteSequence[]) => parentSequences = parentSequences.concat(gameteB)))
        .then(() => this.mvae.interpolate(parentSequences, 12)
          .then((interpolatedSequences: mm.INoteSequence[]) => {
            this.mvae.dispose();
            const index = Math.floor(this.randn_bm(1, 12, 1));
            resolve(interpolatedSequences[index]);
          }
        )
      );
    });
  }

  private randn_bm(min: number, max: number, skew: number): number { // thanks to https://stackoverflow.com/a/49434653
    let u = 0;
    let v = 0;
    while (u === 0) {
      u = Math.random();
    }
    while (v === 0) {
      v = Math.random();
    }
    let num = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    num = num / 10 + 0.5;
    if (num > 1 || num < 0) {
      num = this.randn_bm(min, max, skew);
    }
    num = Math.pow(num, skew);
    num *= max - min;
    num += min;
    console.log(num);
    return num;
  }
}