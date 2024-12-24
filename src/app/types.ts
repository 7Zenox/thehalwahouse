export type WeightOption = {
    weight: string;
    price: number;
    serves: string;
  };
  
  export interface Halwa {
    name: string;
    description: string;
    small: WeightOption;
    medium: WeightOption;
    large: WeightOption;
    path: string;
  }
  