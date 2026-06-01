import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

const normalizeContentType = (file) => {
  if (file?.type) return file.type;
  if (file?.name?.toLowerCase().endsWith('.pdf')) return 'application/pdf';
  return 'application/octet-stream';
};

export const uploadFileToStorage = async (file, folder = 'uploads') => {
  if (!file) {
    throw new Error('Please choose a file before uploading.');
  }

  const safeFileName = file.name.replace(/[^\w.-]/g, '_');
  const fileRef = ref(storage, `${folder}/${Date.now()}_${safeFileName}`);
  const metadata = { contentType: normalizeContentType(file) };
  try {
    const snapshot = await uploadBytes(fileRef, file, metadata);
    return {
      fileUrl: await getDownloadURL(snapshot.ref),
      filePath: snapshot.ref.fullPath,
    };
  } catch (error) {
    const message = error?.message || '';
    if (
      message.includes('CORS')
      || message.includes('network')
      || error?.code === 'storage/retry-limit-exceeded'
    ) {
      throw new Error(
        'PDF upload blocked by Storage CORS. Run "npm run firebase:cors" (needs Google Cloud SDK), ' +
        'or for local dev set VITE_USE_FIREBASE_EMULATORS=true in .env and run "npm run emulators".',
      );
    }
    throw error;
  }
};

export const deleteFileFromStorage = async (filePath) => {
  if (!filePath) return;
  const fileRef = ref(storage, filePath);
  await deleteObject(fileRef);
};
