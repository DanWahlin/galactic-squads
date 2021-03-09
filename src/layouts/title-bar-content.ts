import { defaultExecutionContext, DOM, html, HTMLView, ViewTemplate } from "@microsoft/fast-element";
import { DI } from "@microsoft/fast-foundation";
import { NavigationPhase } from "@microsoft/fast-router";
import { EventAggregator } from "../kernel/ea";

export class TitleBarContent {
  private view: HTMLView | null = null;
  private template: ViewTemplate;

  private get ea() {
    const container = DI.findResponsibleContainer(this.host);
    return container.get(EventAggregator); 
  }

  constructor(titleOrTemplate: ViewTemplate | string, private host: HTMLElement) {
    this.template = typeof titleOrTemplate === 'string'
      ? html`${titleOrTemplate}`
      : titleOrTemplate;

    const that = this;
    const element = host as any;

    const originalEnter = element.enter;
    element.enter = function(phase: NavigationPhase) {
      originalEnter && originalEnter.call(host, phase);
      phase.onCommit(() => that.ea.publish(that));
    }
  
    const originalLeave = element.leave;
    element.leave = function(phase: NavigationPhase) {
      originalLeave && originalLeave.call(host, phase);
      phase.onCommit(() => that.removeContent());
    }
  }

  public getContent() {
    if (this.view === null) {
      this.view = this.template.create();
      this.view.bind(this.host, defaultExecutionContext);
    }
    
    return this.view;
  }

  public removeContent() {
    DOM.queueUpdate(() => {
      if (this.view !== null) {
          this.view.dispose();
          this.view = null;
      }
    });
  }
}