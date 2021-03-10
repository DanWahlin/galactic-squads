import { Http, isSuccess } from "../kernel/http";

export interface PeopleResult {
  count: number;
  results: PersonResult[];
}

export interface PersonResult {
  url: string;
  name: string;
}

export interface ThreadSummary {
  id: string;
  heading: string;
}

export class ChatService {
  private cachedSummaries: ThreadSummary[] | null = null;

  constructor(@Http private http: Http) {}

  async getThread(id: string) {
    await this.getRecentThreadSummaries();
    const fullId = `thread/${id}`;
    return this.cachedSummaries!.find(x => x.id === fullId);
  }

  async getRecentThreadSummaries() {
    if (this.cachedSummaries !== null) {
      return this.cachedSummaries;
    }

    const response = await this.http.get<PeopleResult>('people');

    if (isSuccess(response)) {
      return this.cachedSummaries = response.body.results.map(x => {
        const index = x.url.lastIndexOf("people/");
        const unclean = x.url.substr(index + 7);

        return {
          id: `thread/${unclean.substr(0, unclean.length - 1)}`,
          heading: x.name
        };
      }) as ThreadSummary[];
    }

    return [];
  }
}