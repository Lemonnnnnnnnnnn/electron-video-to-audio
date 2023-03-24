const ffmpegPath = require('ffmpeg-static')
const { spawn } = require('child_process')

export const handleTransform = (e, file) => {
  if (file.type !== 'video/x-matroska' && file.type !== 'video/mp4') {
    return new Error('传入的文件必须是mp4或mkv文件')
  }

  // console.log(file)
  // const ffmpeg = spawn(ffmpegPath, ['-i', '1.mp4', 'output.mp3'])
}

// Handle FFmpeg process events
// ffmpeg.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`)
// })

// ffmpeg.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`)
// })

// ffmpeg.on('close', (code) => {
//   console.log(`FFmpeg process exited with code ${code}`)
// })

// const shell = require("shelljs");
// const { dialog } = require("electron");
// const fs = require("fs");

// function handleTransform(event, file) {
//   if (file.type === "video/x-matroska" || file.type === "video/mp4") {
//     switch (file.index) {
//       case 1: {
//         func1(file);
//         break;
//       }
//       case 2: {
//         func2(file);
//         break;
//       }
//       case 3: {
//         func3(file);
//         break;
//       }
//     }
//   } else {
//     showMessage("请上传mp4或mkv文件", "失败", "error");
//   }
// }

// function func1(file) {
//   const command = `ffmpeg.exe -y -i "${file.path}" output.mp3`;
//   shell.exec(command, (code, stdout, stderr) => {
//     if (code == 0) {
//       showMessage("输出文件名为output.mp3", "成功");
//     } else {
//       showMessage(JSON.stringify(stderr), "失败", "error");
//     }
//   });
// }

// function func2(file) {
//   const command = `ffmpeg.exe -y -i "${file.path}" preProcess.mp3`;
//   shell.exec(command, (code, stdout, stderr) => {
//     if (code == 0) {
//       if (fs.existsSync("output.mp3")) {
//         fs.unlinkSync("output.mp3");
//       }

//       const concat_command =
//         'ffmpeg.exe -i "concat:silent-audio.mp3|preProcess.mp3" -acodec copy output.mp3';

//       shell.exec(concat_command, (code, stdout, stderr2) => {
//         if (code == 0) {
//           showMessage("输出文件名为output.mp3", "成功");
//           fs.unlinkSync("preProcess.mp3");
//         } else {
//           showMessage("拼接静音音频失败", JSON.stringify(stderr2), "error");
//         }
//       });
//     } else {
//       showMessage("请上传mp4或mkv文件", JSON.stringify(stderr), "error");
//     }
//   });
// }

// function func3(file) {
//   const command = `ffmpeg.exe -y -i "${file.path}" preProcess.mp3`;
//   shell.exec(command, (code, stdout, stderr) => {
//     if (code == 0) {
//       if (fs.existsSync("output.mp3")) {
//         fs.unlinkSync("output.mp3");
//       }

//       const concat_command =
//         'ffmpeg.exe -i "concat:silent-audio.mp3|preProcess.mp3|silent-audio.mp3" -acodec copy output.mp3';

//       shell.exec(concat_command, (code, stdout, stderr2) => {
//         if (code == 0) {
//           showMessage("输出文件名为output.mp3", "成功");
//           fs.unlinkSync("preProcess.mp3");
//         } else {
//           showMessage("拼接静音音频失败", JSON.stringify(stderr2), "error");
//         }
//       });
//     } else {
//       showMessage("请上传mp4或mkv文件", JSON.stringify(stderr), "error");
//     }
//   });
// }

// function showMessage(message, title, type) {
//   dialog.showMessageBox(
//     {
//       title, //信息提示框标题
//       message, //信息提示框内容
//       noLink: true, //win下的样式
//       type, //图标类型
//     },
//     function (index) {
//       console.log(index);
//     }
//   );
// }

// module.exports = {
//   handleTransform,
// };
