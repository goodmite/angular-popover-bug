

export class MessageDisplayBase {
  errorMessage: string;
  infoMessage: string;
  addOneDotInInfoMessageSetIntervalRef: number;

  flashErrorMessage(message: string, time_ms: number = 3000) {
    this.errorMessage = message;
    this.infoMessage = '';
    setTimeout(() => {
      this.errorMessage = '';
    }, time_ms);
  }
  flashInfoMessage(message: string, time_ms: number = 3000) {
    this.addOneDotInInfoMessageSetIntervalRef && clearInterval(this.addOneDotInInfoMessageSetIntervalRef);
    this.infoMessage = message;
    this.errorMessage = '';
    this.addOneDotInInfoMessage();
    setTimeout(() => {
      this.addOneDotInInfoMessageSetIntervalRef && clearInterval(this.addOneDotInInfoMessageSetIntervalRef);
      this.infoMessage = '';
    }, time_ms);
  }

  addOneDotInInfoMessage() {
    return setInterval(() => {
      const dotCount = this.infoMessage.split('.').length - 1;
      if (dotCount >= 3) {
        this.infoMessage = this.infoMessage.replace('...', '');
      } else {
        this.infoMessage += '.';
      }
    }, 1000);
  }
}
