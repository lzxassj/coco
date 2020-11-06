import Vue, { VNode } from "vue";

declare module "vue/types/vue" {
  interface Vue {
    // 以下是在main.ts中挂载到Vue.prototype上的变量
    $utils: any;
  }
}

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
