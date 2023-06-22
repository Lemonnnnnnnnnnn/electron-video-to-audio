<script setup>
import { ref } from 'vue'
let videoUrl = ref('')
let videoFile = ref('')

const handleDrop = (e) => {
  //阻止默认行为
  e.preventDefault()
  //获取文件列表
  const files = e.dataTransfer.files

  if (files && files.length > 0) {
    //获取文件路径
    const path = files[0].path
    // console.log('path:', path)
    videoUrl.value = path
    videoFile.value = files[0]
  }
}

const handleClick = async (type) => {
  if (videoFile.value) {
    const fileParams = {
      name: videoFile.value.name,
      path: videoFile.value.path,
      fileType: videoFile.value.type,
      operateType: type
    }
    try {
      await window.api.transform(fileParams)
      alert('成功！！！')
    } catch (e) {
      alert(e)
    }
  } else {
    alert('请先传入视频文件！！！')
  }
}

//阻止拖拽结束事件默认行为
// dragWrapper.addEventListener('dragover', (e) => {
//   e.preventDefault()
// })
</script>

<template>
  <div class="wrap" @drop="handleDrop" @dragenter.prevent @dragover.prevent>
    <div>
      <p class="title">先把视频文件拖进来</p>
      <video width="320" height="240" controls :src="videoUrl">您的浏览器不支持 video 标签。</video>
      <div>
        <div class="middle">
          <button @click="handleClick(1)">转换为音频</button>
        </div>
        <div class="middle">
          <button @click="handleClick(2)">转换为音频并且<strong>前面</strong>加五秒空白</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wrap {
  width: 800px;
  height: 570px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
}

button {
  background-color: #49624a;
  border: 2px solid transparent;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

button:hover {
  border: 2px solid rgb(110, 171, 108);
}

button:active {
  border: 2px solid rgb(110, 171, 108);
  transform: translateY(8px);
}

.middle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
</style>
