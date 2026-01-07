export type FeaturedImage = {
  url: string;
  alt: string;
};

export type FeaturedItem = {
  id: string;
  label: string;
  title: string;
  preview: string;
  href: string;
  image?: FeaturedImage;
};
