const { google } = require('googleapis')
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const path = require('path')
const fs = require('fs')


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