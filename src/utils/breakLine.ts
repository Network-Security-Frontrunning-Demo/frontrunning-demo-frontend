type BreakLine = (text: string, num: number) => string;

export const breakLine: BreakLine = (text: string, number: number) => {
    const part = text.length / number;
    let textReturn = '';
    let i = 0;
    while(i < part) {
        let textPart = text.slice(i*number, (i+1)*number);
        textReturn += textPart + '\n';
        i++;
    }
    return textReturn;
  };