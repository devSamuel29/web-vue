<template>
  <div class="relative w-[800px] h-auto" @mouseover="showControls = true" @mouseleave="showControls = false">
    <video class="w-full" :src="src" :muted="muted" :autoplay="autoplay" :controls="controls" :loop="loop" :width="width"
      :height="height" :poster="poster" :preload="preload" :playsinline="true" ref="player" @click="togglePlayPause" />
    <div v-show="showControls" class="absolute bottom-0 w-full flex flex-col p-4">
      <input type="range" min="0" :max="duration" v-model="currentTime"
        class="w-full h-3 appearance-none rounded-md bg-gray-300 focus:outline-none" @input="seekVideo" />
      <div class="flex items-center">
        <button @click="togglePlayPause">
          <i v-html="isPlaying ? pauseIcon : playIcon"></i>
        </button>
        <span class="ml-2">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

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
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      playIcon: feather.icons.play.toSvg({ class: 'w-4 h-4' }),
      pauseIcon: feather.icons.pause.toSvg({ class: 'w-4 h-4' }),
    };
  },
  computed: {
    videoElement() {
      return this.$refs.player;
    },
  },
  watch: {
    controls(newVal) {
      if (newVal) {
        this.isPlaying = true;
      }
    },
  },
  mounted() {
    this.videoElement.addEventListener("timeupdate", this.updateTime);
    this.videoElement.addEventListener("ended", this.videoEnded);
    if (this.controls) {
      this.isPlaying = true;
    }
  },
  methods: {
    togglePlayPause() {
      if (this.videoElement.paused) {
        this.videoElement.play();
        this.isPlaying = true;
      } else {
        this.videoElement.pause();
        this.isPlaying = false;
      }
    },
    updateTime() {
      this.currentTime = this.videoElement.currentTime;
      this.duration = this.videoElement.duration;
    },
    videoEnded() {
      this.isPlaying = false;
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    },
    seekVideo() {
      this.videoElement.currentTime = this.currentTime;
    },
    showControlsOnHover() {
      this.showControls = true;
    },
    hideControlsOnMouseLeave() {
      this.showControls = false;
    },
  },
};
</script>
