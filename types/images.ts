type BgImage = "morning" | "afternoon" | "evening" | "night";

type imagesType = {
  [key in BgImage]: any;
};
export { BgImage, imagesType };
