import type { App, AppContext, ComponentInternalInstance } from "vue";
import { createVNode, render } from "vue";

export function useDialog(component: any) {
  const instances = new Map<any, any>();

  // This function is used to initialize the component instance
  const initInstance = (
    props: any,
    container: HTMLElement,
    appContext?: AppContext | null
  ) => {
    const vnode = createVNode(component, props);
    vnode.appContext = appContext as AppContext;
    render(vnode, container);

    document.body.appendChild(container);
    return vnode.component;
  };

  // This function is used to generate a container element
  const genContainer = () => {
    return document.createElement("div");
  };

  // This function is used to show the dialog
  const showDialog = (props: any, appContext?: AppContext) => {
    const container = genContainer();
    const instance = initInstance(
      props,
      container,
      appContext
    ) as ComponentInternalInstance;
    const vm: any = instance.proxy;

    props.onVanish = () => {
      document.body.removeChild(container);
      render(null, container);
      instances.delete(vm);
    };

    vm.visible = true;
    return instance.proxy;
  };

  // This function is used to create a dialog
  const Dialog: any = (props: any, callback: any, appContext?: AppContext) => {
    props.on = props.on || {};
    props.on.submit = callback;

    return new Promise((resolve, reject) => {
      const vm = showDialog(props, appContext ?? (Dialog as any)._context);

      instances.set(vm, { props, resolve, reject });
    });
  };

  // This function is used to close all dialogs
  Dialog.close = () => {
    instances.forEach((instance) => {
      instance.doClose?.();
    });

    instances.clear();
  };

  Dialog._context = null;

  Dialog.install = (app: App) => {
    Dialog._context = app._context;
  };

  return Dialog;
}
