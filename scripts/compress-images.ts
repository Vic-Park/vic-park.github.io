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

	fs.rmSync(publicImagesPath, { recursive: true, force: true });
	await Promise.all(
		imagePaths.map(async (imagePath) => {
			const folderPath = path.relative(
				imageAssetsPath,
				path.dirname(imagePath)
			);
			await imagemin([imagePath], {
				destination: path.join(publicImagesPath, folderPath),
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
