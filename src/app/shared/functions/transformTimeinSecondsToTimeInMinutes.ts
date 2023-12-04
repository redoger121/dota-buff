export function transformTimeinSecondsToTimeInMinutes(time: number): string {
    let newTime: string = '';
    let minutes: string = '';
    let seconds: number = 0;
    minutes = (time / 60).toFixed(0);
    seconds = time % 60;
    newTime = minutes + ':' + seconds;
    return newTime;
  }