

export class MessageDisplayBase {
  errorMessage: string;
  infoMessage: string;
  addOneDotInInfoMessageSetIntervalRef: number;
  setIntervelRef;

  flashErrorMessage(message: string, time_ms: number = 3000) {
    try {
      clearInterval(this.setIntervelRef);
    }catch (e) {
      console.log(e);
    }
    this.errorMessage = message;
    this.infoMessage = '';
    setTimeout(() => {
      this.errorMessage = '';
    }, time_ms);
  }
  flashInfoMessage(message: string, time_ms: number = 3000) {
    // this.addOneDotInInfoMessageSetIntervalRef && clearInterval(this.addOneDotInInfoMessageSetIntervalRef);
    // this.infoMessage = message;
    // this.errorMessage = '';
    // try {
    //   this.setIntervelRef = this.addOneDotInInfoMessage();
    // }catch (e) {
    //   console.log(e);
    // }
    // setTimeout(() => {
    //   this.addOneDotInInfoMessageSetIntervalRef && clearInterval(this.addOneDotInInfoMessageSetIntervalRef);
    //   this.infoMessage = '';
    // }, time_ms);
  }

  addOneDotInInfoMessage() {
    // return setInterval(() => {
    //   const dotCount = this.infoMessage.split('.').length - 1;
    //   if (dotCount >= 3) {
    //     this.infoMessage = this.infoMessage.replace('...', '');
    //   } else {
    //     this.infoMessage += '.';
    //   }
    // }, 1000);
  }
}
