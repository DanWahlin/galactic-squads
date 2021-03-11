import { RouterConfiguration } from "@microsoft/fast-router";
import { ChatThread } from "../chat/chat-thread";
import { SquadWelcome } from "./squad-welcome";

export class SquadRoutes extends RouterConfiguration {
  configure() {
    this.routes.map(
      { path: '', element: SquadWelcome },
      { path: 'thread/{id}', element: ChatThread }
    );
  }
}