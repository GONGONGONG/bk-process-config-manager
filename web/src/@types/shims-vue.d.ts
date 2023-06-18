declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare global {
  interface Window {
    // Moment: Moment
    // omEnv: { [key: string]: T }
    // setOmLocal: (localKey: string, value: T) => void
    // getOmLocal: (localKey: string) => string
  }
}
