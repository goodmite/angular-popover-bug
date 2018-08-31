import {Pipe, PipeTransform} from '@angular/core';
import {ISessionMessageItem} from '../interfaces/sessions';

export interface ITxnSessionMessagesItem {
  transaction_id: string,
  convoList: ISessionMessageItem[]
}

@Pipe({
  name: 'serializeSessionMessage'
})
export class SerializeSessionMessagePipe implements PipeTransform {

  /*this pipe will create new array for each txn id which will be storing convo for that txn id*/
  transform(sessionMessages: ISessionMessageItem[], args?: any): ITxnSessionMessagesItem[] {
    if (!sessionMessages) return;
    let txnConversationItems: ITxnSessionMessagesItem[] = [];
    sessionMessages.forEach((sessionMessage) => {
      let txnId = sessionMessage.transaction_id;
      let conversationObjectForGivenTxnId: ITxnSessionMessagesItem = txnConversationItems.find(item=>item.transaction_id===txnId);
      if (conversationObjectForGivenTxnId && conversationObjectForGivenTxnId.convoList) {
        conversationObjectForGivenTxnId.convoList.push(sessionMessage);
      } else {
        txnConversationItems.push({transaction_id: txnId, convoList: [sessionMessage]});
      }
    });

    return txnConversationItems;
  }

}
