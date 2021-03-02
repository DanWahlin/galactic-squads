import { Binding, BindingBehavior, BindingDirective, CaptureType, ExecutionContext } from "@microsoft/fast-element";

class SyncDirective extends BindingDirective {
  public createBehavior(target: Node): BindingBehavior {
    const behavior = super.createBehavior(target);

    (behavior as any).originalBind = behavior.bind;
    (behavior as any).originalUnbind = behavior.unbind;
    
    behavior.bind = bind;
    behavior.unbind = unbind;

    (behavior as any).changeEvent = determineChangeEvent(target as HTMLElement);
    (behavior as any).changeHandler = () => {
      const value = behavior.target.value;
      const last = (behavior.bindingObserver as any).last;
      last.propertySource[last.propertyName] = value;
    };

    return behavior;
  }
}

function bind(this: BindingBehavior, source: any, context: ExecutionContext) {
  (this as any).originalBind.call(this, source, context);
  (this.target as HTMLElement).addEventListener((this as any).changeEvent, (this as any).changeHandler);
}

function unbind(this: BindingBehavior) {
  (this as any).originalUnbind.call(this);
  (this.target as HTMLElement).removeEventListener((this as any).changeEvent, (this as any).changeHandler);
}

function determineChangeEvent(target: HTMLElement) {
  switch (target.tagName) {
    case 'INPUT':
    case 'FLUENT-TEXT-FIELD':
    case 'FLUENT-TEXT-AREA':
      return 'input';
    default:
      return 'change';
  }
}

export function sync<TSource = any, TReturn = any>(
  binding: Binding<TSource, TReturn>
): CaptureType<TSource> {
  return new SyncDirective(binding);
}