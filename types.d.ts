declare module "*?bpt" {
  const text: string;
  export default text;
}

declare module "*?raw" {
  const text: string;
  export default text;
}

declare const unsafeWindow: Window & {
  registerWikidotPlugin: (a: any) => Promise<void>;
  usertoolsDefined: boolean;
};
