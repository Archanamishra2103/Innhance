const Jimp = require('jimp');

async function processIcon() {
  try {
    const image = await Jimp.read('public/assets/logo.jpeg');
    // Resize for favicon size while keeping quality high
    image.resize(256, 256);
    // Crop it to a circle to remove the white corners
    image.circle();
    // Save as transparent PNG
    await image.writeAsync('public/assets/favicon.png');
    console.log('Successfully created circular favicon.png');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processIcon();
