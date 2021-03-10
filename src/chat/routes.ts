import { RouterConfiguration } from "@microsoft/fast-router";
import { ChatHome } from "./chat-home";
import { ChatThread } from "./chat-thread";

export class ChatRoutes extends RouterConfiguration {
  configure() {
    this.routes.map(
      { path: '', element: ChatHome },
      { path: 'thread/{id}', element: ChatThread }
    );
  }
}