import fs from 'fs';
import globby from 'globby';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';

const imageAssetsPath = path.join(__dirname, '../assets/images');
const publicImagesPath = path.join(__dirname, '../frontend/public/images');

export async function compressImages() {
	fs.mkdirSync(publicImagesPath, { recursive: true });

	const imagePaths = await globby([`${imageAssetsPath}/**/*.{jpg,png}`]);

	await Promise.all(
		imagePaths.map(async (imagePath) => {
			const destImageFolderPath = path.join(
				publicImagesPath,
				path.relative(imageAssetsPath, path.dirname(imagePath))
			);
			const destImageFilePath = path.join(
				destImageFolderPath,
				path.basename(imagePath)
			);
			if (fs.existsSync(destImageFilePath)) return;
			await imagemin([imagePath], {
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
