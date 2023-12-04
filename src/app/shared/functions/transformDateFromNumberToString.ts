export function transformDateFromNumberToString(date: number, matchDuration: number): string {
    let newDate: string = '';
    let matchEndedDate = new Date(date * 1000 + matchDuration);
    let days: number =
      (new Date().getTime() - matchEndedDate.getTime()) / 86400000; //86400000 - ms в дне
    if (days >= 1) {
      newDate = 'завершен ' + Math.floor(days) + ' дней назад';
      return newDate;
    } else {
      newDate =
        'завершен ' + Math.floor((86400 * days) / 3600) + ' часов назад';
      return newDate;
    }
  }