import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function UploadImage(fieldname: string, folder: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: `./uploads/${folder}`,
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
      }),
    ),
  );
}
