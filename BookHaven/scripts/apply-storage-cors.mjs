/**
 * Applies cors.json to Firebase Storage bucket(s).
 * Uses @google-cloud/storage (serviceAccountKey.json or gcloud ADC).
 */
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const corsFile = path.join(root, 'cors.json');
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

const buckets = [
  ...new Set([
    readBucketFromEnv(),
    `${projectId}.firebasestorage.app`,
    `${projectId}.appspot.com`,
  ].filter(Boolean)),
];

const applyWithGoogleCloudSdk = async () => {
  const { Storage } = await import('@google-cloud/storage');
  const options = { projectId };
  if (existsSync(keyFile)) {
    options.keyFilename = keyFile;
    console.log('Using serviceAccountKey.json\n');
  } else {
    console.log('Using Application Default Credentials (gcloud auth application-default login)\n');
  }

  const storage = new Storage(options);
  let applied = 0;

  for (const bucketName of buckets) {
    try {
      const bucket = storage.bucket(bucketName);
      const [exists] = await bucket.exists();
      if (!exists) {
        console.warn(`Skip ${bucketName} — bucket does not exist`);
        continue;
      }
      await bucket.setCorsConfiguration(corsConfig);
      console.log(`✓ CORS applied: gs://${bucketName}`);
      applied += 1;
    } catch (error) {
      console.warn(`✗ ${bucketName}: ${error.message}`);
    }
  }

  return applied;
};

const applyWithGcloudCli = () => {
  let applied = 0;
  for (const bucket of buckets) {
    const gsUrl = bucket.startsWith('gs://') ? bucket : `gs://${bucket}`;
    try {
      execSync(`gcloud storage buckets update ${gsUrl} --cors-file="${corsFile}"`, {
        stdio: 'pipe',
        cwd: root,
      });
      console.log(`✓ CORS applied (gcloud): ${gsUrl}`);
      applied += 1;
    } catch {
      console.warn(`✗ gcloud failed for ${gsUrl}`);
    }
  }
  return applied;
};

console.log('BookHaven — Firebase Storage CORS setup\n');

let applied = 0;
try {
  applied = await applyWithGoogleCloudSdk();
} catch (error) {
  console.warn('Google Cloud SDK library failed:', error.message);
}

if (applied === 0) {
  applied = applyWithGcloudCli();
}

if (applied === 0) {
  console.error(`
Could not update bucket CORS automatically.

ONE-TIME SETUP (pick one):

A) Service account (easiest on Windows):
   1. Firebase Console → Project Settings → Service accounts → Generate new private key
   2. Save the file as: serviceAccountKey.json  (in the BookHaven project folder)
   3. Run: npm run firebase:cors

B) Google Cloud SDK:
   gcloud auth application-default login
   npm run firebase:cors

C) Manual in browser:
   1. https://console.cloud.google.com/storage/browser?project=${projectId}
   2. Bucket → Configuration → CORS → Edit
   3. Paste contents of cors.json → Save

Then restart: npm run dev
`);
  process.exit(1);
}

console.log('\nDone. PDF uploads will use Firebase Storage. Restart npm run dev and try /library');
