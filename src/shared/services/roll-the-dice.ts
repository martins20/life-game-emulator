export class RollTheDice {
  callsCounter = 0;

  constructor() {
    this.callsCounter += 1;
  }

  execute(): number {
    const minNumber = 1;
    const maxNumber = 6;

    const randomNumberBetwaeenZeroAndOne = Math.random();
    const roundedDownNumberBetwenZeroAndMaxNumber = Math.floor(
      randomNumberBetwaeenZeroAndOne * maxNumber
    );
    const randomNumberBetweenMaxAndMinNumber =
      roundedDownNumberBetwenZeroAndMaxNumber + minNumber;

    return randomNumberBetweenMaxAndMinNumber;
  }
}
