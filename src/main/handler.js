const ffmpegPath = require('ffmpeg-static')
const { execSync } = require('child_process')
const fs = require('fs')

const homedir = require('os').homedir()
const desktopDir = `${homedir}/Desktop`
const outputFileName = `${desktopDir}/这是转换好的音乐文件.mp3`
const silentAudioPath = './resources/silent-audio.mp3'

export const handleTransform = (e, file) => {
  return new Promise((resolve, reject) => {
    if (file.fileType !== 'video/x-matroska' && file.fileType !== 'video/mp4') {
      reject('传入的文件必须是mp4或mkv文件！！！')
    }

    if (file.operateType === 1) {
      try {
        execSync(`${ffmpegPath} -y -i ${file.path} ${outputFileName}`)
        resolve('success!')
      } catch (e) {
        reject(e)
      }
    }

    if (file.operateType === 2) {
      try {
        execSync(`${ffmpegPath} -y -i ${file.path} preProcess.mp3`)
        if (fs.existsSync(outputFileName)) {
          fs.unlinkSync(outputFileName)
        }

        execSync(
          `${ffmpegPath} -i "concat:${silentAudioPath}|preProcess.mp3" -acodec copy ${outputFileName}`
        )
        fs.unlinkSync('preProcess.mp3')

        resolve('success!')
      } catch (e) {
        reject(e)
      }
    }

    if (file.operateType === 3) {
      try {
        execSync(`${ffmpegPath} -y -i ${file.path} preProcess.mp3`)
        if (fs.existsSync(outputFileName)) {
          fs.unlinkSync(outputFileName)
        }

        execSync(
          `${ffmpegPath} -i "concat:${silentAudioPath}|preProcess.mp3|${silentAudioPath}" -acodec copy ${outputFileName}`
        )
        fs.unlinkSync('preProcess.mp3')

        resolve('success!')
      } catch (e) {
        reject(e)
      }
    }
  })
}
