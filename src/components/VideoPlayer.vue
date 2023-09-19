<template>
  <video
    :src="src"
    :muted="muted"
    :autoplay="autoplay"
    :controls="controls"
    :loop="loop"
    :width="width"
    :height="height"
    :poster="poster"
    :preload="preload"
    :playsinline="true"
    ref="player"
  />
</template>

<script>
  export default {
    name: "VideoPlayer",
    props: {
      src: { type: String, required: true },
      controls: { type: Boolean, required: false, default: false },
      loop: { type: Boolean, required: false, default: false },
      width: { type: Number, required: false, default: 500 },
      height: { type: Number, required: false, default: 281 },
      autoplay: { type: Boolean, required: false, default: false },
      muted: { type: Boolean, required: false, default: false },
      poster: { type: String, required: false },
      preload: { type: String, required: false, default: "auto" },
    },
  }
</script>