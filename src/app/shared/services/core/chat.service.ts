import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../models/chat';
import { ApiService } from './api.service';
import { ApiResponse } from '../../models/api-response.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {
  
  constructor (
    private apiService: ApiService
  ) {}

  conversation = new Subject<Message[]>();

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);

    this.getBotMessage(msg).subscribe((botResult: string) => {
      const botMessage = new Message('bot', botResult);
      this.conversation.next([botMessage]);
    });
  }

  getBotMessage(question: string) {
    return this.apiService.post<ApiResponse<any>>(`http://llm.tvheap.com:8001/sql_query`, {
      input: question
    }).pipe(
      map((res: any) => res.Result)
    );
  }
}
