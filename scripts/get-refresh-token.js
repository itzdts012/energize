const { google } = require('googleapis');
const http = require('http');
const url = require('url');

const oauth2Client = new google.auth.OAuth2(
  '703630750284-brst7uar51hfhe5p9o439untlpos11ga.apps.googleusercontent.com',
  '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',
  'http://localhost:3000'
);

const scopes = ['https://www.googleapis.com/auth/drive.file'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

const server = http.createServer(async (req, res) => {
  if (req.url.indexOf('/?code=') > -1) {
    const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
    const code = qs.get('code');
    
    res.end('✅ Authentication successful! Check your terminal for the token.');
    
    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log('\n\n✅ SUCCESS! Copy this to your .env file:\n');
      console.log(`GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"\n`);
    } catch (error) {
      console.error('Error getting token:', error);
    }
    
    server.close();
    process.exit(0);
  }
});

server.listen(3001, () => {
  console.log('\n🔗 Copy and paste this URL into your browser:\n');
  console.log(authUrl);
  console.log('\nWaiting for authentication...\n');
});
