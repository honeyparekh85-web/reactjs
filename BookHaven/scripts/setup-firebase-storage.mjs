/**
 * Deploy storage rules + apply CORS for Firebase PDF uploads.
 */
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..';

console.log('1/2 Deploying storage.rules to Firebase...\n');
try {
  execSync('firebase deploy --only storage --project bookhaven-fd300', {
    stdio: 'inherit',
    cwd: root,
  });
} catch {
  console.warn('Storage rules deploy failed. Enable Storage in Firebase Console first.\n');
}

console.log('\n2/2 Applying Storage CORS...\n');
execSync('node scripts/apply-storage-cors.mjs', { stdio: 'inherit', cwd: root });
