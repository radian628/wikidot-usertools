declare namespace GM {
  let getValue: (key: string, defaultValue: string) => Promise<string>;
  let setValue: (key: string, value: string) => Promise<void>;
}
