import sharp from 'sharp';

export const resizeImage = async (
    imageBuffer: Buffer,
    options: { width?: number, height?: number, format?: string, quality?: number, grayscale?: boolean }
): Promise<Buffer> => {
    let image = sharp(imageBuffer);

    if (options.width || options.height) {
        image = image.resize(options.width, options.height);
    }

    if (options.format) {
        image = image.toFormat(options.format as keyof sharp.FormatEnum, {
            quality: options.quality
        });
    }

    if (options.grayscale) {
        image = image.grayscale();
    }

    return await image.toBuffer();
};