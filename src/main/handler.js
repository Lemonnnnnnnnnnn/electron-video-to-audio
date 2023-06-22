const ffmpegPath = require('ffmpeg-static')
const { execSync } = require('child_process')
const fs = require('fs')

const homedir = require('os').homedir()
const desktopDir = `${homedir}/Desktop`
// const outputFileNameInit = `${desktopDir}/这是转换好的音乐文件.mp3`
const silentAudioPath = './resources/silent-audio.mp3'

const getOutputFileName = (baseName, index = 0) => {
  // 判断baseName是否存在
  if (fs.existsSync(baseName)) {
    // 获取文件名的前缀和后缀
    const fileName = baseName.split('.')[0]
    const suffix = baseName.split('.')[1]

    const newName = `${fileName}${index + 1}.${suffix}`

    return getOutputFileName(newName, index + 1)
  } else {
    return baseName
  }
}

export const handleTransform = (e, file) => {
  return new Promise((resolve, reject) => {
    if (file.fileType !== 'video/x-matroska' && file.fileType !== 'video/mp4') {
      reject('传入的文件必须是mp4或mkv文件！！！')
    }
    const inputFileName = file.name.split('.')[0]

    const outputFileNameInit = `${desktopDir}/${inputFileName}.mp3`

    const outputFileName = getOutputFileName(outputFileNameInit)

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
