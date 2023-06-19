// Create a canvas element

function saveDOM(domID) {
  const element = document.getElementById(domID);
  const canvas = document.createElement("canvas");
  canvas.width = element.offsetWidth;
  canvas.height = element.offsetHeight;

  // Get the 2D rendering context of the canvas
  const context = canvas.getContext("2d");

  // Draw the element onto the canvas
  context.drawImage(element, 0, 0);

  // Convert the canvas to an image file
  const image = canvas.toDataURL("image/png");

  // Create a link element to download the image
  const link = document.createElement("a");
  link.href = image;
  link.download = "dom_image.png";
  link.click();
}
