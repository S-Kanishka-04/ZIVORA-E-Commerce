export function getImage(imgObj) {
  if (!imgObj) return "/images/no-image.png";

  if (imgObj.image) {
    return imgObj.image; // public folder image
  }

  if (imgObj.url) {
    return `http://localhost:8000${imgObj.url}`; // backend served
  }

  return "/images/no-image.png";
}
