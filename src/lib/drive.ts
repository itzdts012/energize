import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

export async function uploadToDrive(file: File, fileName: string) {
  const buffer = await file.arrayBuffer();
  const response = await drive.files.create({
    requestBody: { name: fileName },
    media: { mimeType: file.type, body: Buffer.from(buffer) },
    fields: 'id,webViewLink,webContentLink',
  });
  return response.data;
}

export async function getFileUrl(fileId: string) {
  const response = await drive.files.get({
    fileId,
    fields: 'webViewLink,webContentLink',
  });
  return response.data.webContentLink;
}

export async function deleteFromDrive(fileId: string) {
  await drive.files.delete({ fileId });
}
