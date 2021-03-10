import { RouterConfiguration } from "@microsoft/fast-router";
import { ChatWelcome } from "./chat-welcome";
import { ChatThread } from "./chat-thread";

export class ChatRoutes extends RouterConfiguration {
  configure() {
    this.routes.map(
      { path: '', element: ChatWelcome },
      { path: 'thread/{id}', element: ChatThread }
    );
  }
}