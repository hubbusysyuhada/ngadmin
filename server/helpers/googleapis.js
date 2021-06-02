const { google } = require('googleapis')
const CLIENT_ID = '995660962769-end20evrvhe4bjgtqtn1kvibb33lvo0p.apps.googleusercontent.com'
const CLIENT_SECRET = 'N8Vapg9_QOul6nlo6ap9ETlv'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04KqE7jkDOl13CgYIARAAGAQSNwF-L9IrEYsE3s4n9BkiIG1OA1lg648RSIVR-mikgriihfA6_bLVVhCCBkw_NWrSWhKiJ4fJ3wM'
const path = require('path')
const fs = require('fs')
const mime = require('mime-types')


const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)


oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

async function uploadFileToGoogleDrive (filename, filepath) {
    try {
        const tempPath = path.join(__dirname, `${filepath.filename}`)
        const response = await drive.files.create({
            requestBody: {
                name: filename,
                mimeType: filepath.mimetype,
            },
            media: {
                mimeType: filepath.mimetype,
                body: fs.createReadStream(tempPath)
            }
        })
        fs.unlinkSync(tempPath)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function deleteFile (fileId) {
    try {
        return await drive.files.delete({
            fileId
        })
    } catch (error) {
        console.error(error);
    }
}

async function generatePublicUrl (fileId) {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        return await drive.files.get({
            fileId,
            fields: 'webContentLink'
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    uploadFileToGoogleDrive,
    deleteFile,
    generatePublicUrl
}