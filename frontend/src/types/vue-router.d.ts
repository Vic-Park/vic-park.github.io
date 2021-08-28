import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    hideNavigationHeader?: boolean;
    navigationHeaderClass?: string;
  }
}
