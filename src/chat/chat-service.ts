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
  id: string;
  heading: string;
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

  constructor(@Http private http: Http) {}

  async getSquads() {
    const response = await this.http.get<SquadsResponse>('squads');
    return response.results;
  }

  async getThread(id: string) {
    try {
      const response = await this.http.get<Thread>(`thread/${id}`);
      return response;
    } catch {
      return {
        owner: {
          id: '1000',
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

      return {
        id: `thread/${unclean.substr(0, unclean.length - 1)}`,
        heading: x.name
      };
    }) as ThreadSummary[];
  }
}