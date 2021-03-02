import { defaultExecutionContext, DOM, HTMLView, ViewTemplate } from "@microsoft/fast-element";

export class TitleBarContentRequest {
  private view: HTMLView | null = null;

  constructor(private template: ViewTemplate, private model: any = {}) {}

  public getContent() {
    if (this.view === null) {
      this.view = this.template.create();
      this.view.bind(this.model, defaultExecutionContext);
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