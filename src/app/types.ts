// types.ts
export interface HalwaSize {
  weight: string;
  price: number;
  serves: string;
}

export interface HalwaItem {
  name: string;
  description: string;
  path: string;
  small?: HalwaSize;
  medium?: HalwaSize;
  large?: HalwaSize;
}
