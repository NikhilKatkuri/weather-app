import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const heightPercentage = (p: number): number => {
  if (p > 1) throw new Error(`height : ${p} is to be in range(0,1)`);

  return height * p;
};
const widthPercentage = (p: number): number => {
  if (p > 1) throw new Error(`width : ${p} is to be in range(0,1)`);

  return width * p;
};

export { heightPercentage, widthPercentage };

