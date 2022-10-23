import fs from 'fs';
import globby from 'globby';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';
import resizeImg from 'resize-img';

const imageAssetsPath = path.join(__dirname, '../assets/images');
const publicImagesPath = path.join(__dirname, '../frontend/public/images');

export async function compressImages() {
	await fs.promises.mkdir(publicImagesPath, { recursive: true });

	const imagePaths = await globby([`${imageAssetsPath}/**/*.{jpg,png}`]);

	await Promise.all(
		imagePaths.map(async (imagePath) => {
			const destImageFolderPath = path.join(
				publicImagesPath,
				path.relative(imageAssetsPath, path.dirname(imagePath))
			);
			await fs.promises.mkdir(destImageFolderPath, { recursive: true });
			const destImageFilePath = path.join(
				destImageFolderPath,
				path.basename(imagePath)
			);

			if (fs.existsSync(destImageFilePath)) return;

			let srcImageFilePath;
			if (imagePath.includes('club-icons')) {
				// Copy a resized version of the image to the public/ folder
				await fs.promises.writeFile(
					destImageFilePath,
					await resizeImg(await fs.promises.readFile(imagePath), {
						height: 400,
						width: 400,
					})
				);
				srcImageFilePath = destImageFilePath;
			} else {
				srcImageFilePath = imagePath;
			}

			// Optimize the resized image
			await imagemin([srcImageFilePath], {
				destination: destImageFolderPath,
				plugins: [
					imageminJpegtran(),
					imageminMozjpeg({
						quality: 70,
					}),
					imageminPngquant({
						quality: [0.1, 0.2],
					}),
					imageminOptipng({
						optimizationLevel: 7,
					}),
				],
			});
		})
	);
}

void compressImages();
