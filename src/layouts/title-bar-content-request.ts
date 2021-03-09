import { defaultExecutionContext, DOM, html, HTMLView, ViewTemplate } from "@microsoft/fast-element";

export class TitleBarContentRequest {
  private view: HTMLView | null = null;
  private template: ViewTemplate;

  constructor(titleOrTemplate: ViewTemplate | string, private model: any = {}) {
    this.template = typeof titleOrTemplate === 'string'
      ? html`${titleOrTemplate}`
      : titleOrTemplate;
  }

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