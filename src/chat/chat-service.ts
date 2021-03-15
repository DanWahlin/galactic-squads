import { Session } from "../account/session";
import { Http } from "../kernel/http";

export interface PeopleResponse {
  count: number;
  results: Person[];
}

export interface Person {
  url: string;
  name: string;
}

export interface ThreadSummary {
  owner: EntityReference;
}

interface SquadsResponse {
  results: ThreadSummary[];
}

export interface EntityReference {
  id: string;
  name: string;
}

export interface Message {
  author: EntityReference;
  message: string;
}

export interface Thread {
  owner: EntityReference;
  messages: Message[]
}

export class ChatService {
  private cachedSummaries: ThreadSummary[] | null = null;

  constructor(@Http private http: Http, @Session private session: Session) {}

  async getSquads() {
    const response = await this.http.get<SquadsResponse>('squads');
    return response.results;
  }

  post(thread: Thread, message: string) {
    if (!message) {
      return;
    }
    
    const threadMessage: Message = {
      author: {
        id: this.session.currentUser.id,
        name: this.session.currentUser.name
      },
      message
    };

    thread.messages.push(threadMessage);

    if (message.toLocaleLowerCase().indexOf('old man') !== -1) {
      setTimeout(() => {
        const counterMessage: Message = {
          "author": {
            "id": "10",
            "name": "Obi-Wan Kenobi"
          },
          message: "You can't win Darth. If you strike me down, I shall become more powerful than you can possibly imagine."
        };
    
        thread.messages.push(counterMessage);
      }, 2500);
    }
  }

  async getThread(threadId: string) {
    try {
      const response = await this.http.get<Thread>(`thread/${threadId}`);
      return response;
    } catch {
      return {
        owner: {
          id: threadId,
          name: 'Conversation'
        },
        messages: [
          {
            author: {
              id: "4",
              name: "Darth Vader"
            },
            message: "I do not want the Emperor’s prize damaged."
          }
        ]
      };
    }
  }

  async getRecentThreadSummaries() {
    if (this.cachedSummaries !== null) {
      return this.cachedSummaries;
    }

    const response = await this.http.get<PeopleResponse>('people');

    return this.cachedSummaries = response.results.map(x => {
      const index = x.url.lastIndexOf("people/");
      const unclean = x.url.substr(index + 7);
      const id = unclean.substr(0, unclean.length - 1);

      return {
        owner: {
          id,
          name: x.name
        }
      } as ThreadSummary;
    }).filter(x => x.owner.id !== this.session.currentUser.id);
  }
}