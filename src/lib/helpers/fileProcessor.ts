import path from 'path';
import fs from 'fs/promises';

export const fileProcessor = async (file: File, endPoint: string) => {
	const filePath = path.join(
		process.cwd(),
		'static',
		'images',
		endPoint,
		`${crypto.randomUUID()}.${(file as Blob).type.split('/')[1]}`
	);
	// write file in accordance with path
	await fs.writeFile(filePath, Buffer.from(await (file as Blob).arrayBuffer()));
	//getting relative path that starts with /static
	const staticIndex = filePath.indexOf('/images');
	const relativePath = path.join('/', filePath.substring(staticIndex));

	return relativePath;
};
