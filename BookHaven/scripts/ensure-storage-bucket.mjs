/**
 * Creates default GCS bucket (if missing) and applies CORS for browser uploads.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const keyFile = path.join(root, 'serviceAccountKey.json');
const projectId = 'bookhaven-fd300';

const corsConfig = [
  {
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173',
      'https://bookhaven-fd300.web.app',
      'https://bookhaven-fd300.firebaseapp.com',
    ],
    method: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    responseHeader: [
      'Content-Type',
      'Authorization',
      'Content-Length',
      'User-Agent',
      'X-Requested-With',
      'X-Firebase-Locale',
      'x-goog-resumable',
      'x-goog-upload-command',
      'x-goog-upload-header-content-length',
      'x-goog-upload-header-content-type',
      'x-goog-upload-offset',
      'x-goog-upload-protocol',
      'x-goog-upload-status',
      'X-Goog-Upload-Protocol',
      'X-Goog-Upload-Command',
      'X-Goog-Upload-Header-Content-Type',
      'X-Goog-Upload-Status',
    ],
    maxAgeSeconds: 3600,
  },
];

const readBucketFromEnv = () => {
  const envPath = path.join(root, '.env');
  if (!existsSync(envPath)) return null;
  const match = readFileSync(envPath, 'utf8').match(/^VITE_FIREBASE_STORAGE_BUCKET=(.+)$/m);
  return match?.[1]?.trim().replace(/^["']|["']$/g, '') || null;
};

if (!existsSync(keyFile)) {
  console.error('Missing serviceAccountKey.json in project root.');
  process.exit(1);
}

const { Storage } = await import('@google-cloud/storage');
const storage = new Storage({ projectId, keyFilename: keyFile });

const bucketNames = [
  ...new Set([
    readBucketFromEnv(),
    `${projectId}.firebasestorage.app`,
    `${projectId}.appspot.com`,
  ].filter(Boolean)),
];

console.log('Ensuring Storage bucket + CORS for BookHaven...\n');

let primaryBucket = null;

for (const bucketName of bucketNames) {
  const bucket = storage.bucket(bucketName);
  const [exists] = await bucket.exists();

  if (!exists) {
    console.log(`Creating bucket: ${bucketName}`);
    try {
      await storage.createBucket(bucketName, {
        location: 'US',
        storageClass: 'STANDARD',
      });
      console.log(`✓ Created gs://${bucketName}`);
    } catch (error) {
      console.warn(`✗ Could not create ${bucketName}: ${error.message}`);
      continue;
    }
  } else {
    console.log(`✓ Bucket exists: ${bucketName}`);
  }

  try {
    await bucket.setCorsConfiguration(corsConfig);
    console.log(`✓ CORS applied: gs://${bucketName}`);
    primaryBucket = bucketName;
    break;
  } catch (error) {
    console.warn(`✗ CORS failed for ${bucketName}: ${error.message}`);
  }
}

if (!primaryBucket) {
  console.error(`
Could not create bucket or apply CORS.

Enable Firebase Storage manually (required once):
  https://console.firebase.google.com/project/bookhaven-fd300/storage
  Click "Get started" → choose location → Done

Then run again: npm run firebase:cors
`);
  process.exit(1);
}

console.log(`
Success! Using bucket: ${primaryBucket}
Ensure .env has: VITE_FIREBASE_STORAGE_BUCKET=${primaryBucket}
Restart: npm run dev
`);
