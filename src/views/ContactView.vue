<template>
    <div class="container text-white font-vt232 min-h-screen">
        <div class="about-wrapper mb-2 block border border-gray-700 dark:bg-black  md:w-full rounded-[5px] p-4 md:p-6 mt-[50px] hover:shadow-lg transition duration-300">
          <div class="float-right text-md md:text-5xl">
              <TypeWriter
                :strings="['Hello World', 'Lorem ipsum dolor.']"
                cursor="|"
                :delay="50"
                :deleteSpeed="20"
                :loop="true"
                :autoStart="true"
                :pauseFor="1500"
              />
            </div>
          <div class="pfp-wrapper relative float-top bottom-1">
                <img class="w-[150px] px-[10px] md:w-[150px]" src="../assets/image.png" alt="">   
            <h5 class="text-[white] mb-2 text-3xl tracking-tight">
                Keo Vuththana
            </h5>
          </div>
          <div class="phone-email-wrapper relative">
            <div class="phone-number flex gap-3 items-center">
                      <i class="fa fa-phone"></i>
                      <p class="text-xl">+855 718808839</p>
                    </div>
                    <div class="gmail flex gap-3 items-center">
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                      <p class="text-xl">vuththanakeo69@gmail.com</p>
                  </div>
          </div>
            <div class="info-wrapper flex flex-col gap-3 mt-[20px]">
                <p class=".animatedTitle text-2xl">
                  <!--Mark-->
                </p>
                <div class="contact-info text-center text-lg">
                    <p class="text-2xl tracking-wider">Find me on</p>
                    <ul class="flex justify-center gap-3 text-xl">
                        <li><a href="https://discord.com/users/452761144583651328" target="_blank"><i class="fa-brands fa-discord hover:scale-125 duration-300"></i></a></li>
                        <li><a href="https://t.me/keovuththana"><i class="fa-brands fa-telegram hover:scale-125 duration-300" aria-hidden="true"></i></a></li>
                        <li><a href="https://github.com/Vuththana"><i class="fa-brands fa-github hover:scale-125 duration-300"></i></a></li>
                        <li><a href="https://www.facebook.com/profile.php?id=100013441156247"><i class="fa-brands fa-facebook hover:scale-125 duration-300" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        
        <div class="music-player bg-black shadow-lg rounded p-3">
            <div class="group flex-row md:flex text-sm md:text-2xl">
                <img class="w-[300px] h-[250px] duration-300 mx-auto md:w-72 md:h-full block rounded" :src="currentSong.img_src" alt="">
                <div class="mx-auto my-auto">
                    <h1 class="text-2xl">{{ currentSong.author }} - {{ currentSong.title }}</h1>
                    <div class="songinfo-bar flex flex-col gap-3 justify-center"> 
                        <span class="text-center">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span><input class="mx-2"
                            type="range"
                            min="0"
                            :max="duration"
                            step="0.01"
                            v-model="currentTime"
                            @input="seek"
                        />
                        <div class="controls flex justify-center">
                          <button @click="nextSong"><i class="fa fa-angle-double-left"></i></button>
                            <button @click="togglePlayPause">
                                <i :class="iconClass" id="controlIcon"></i>
                            </button>
                            <button @click="nextSong"><i class="fa fa-angle-double-right"></i></button>
                            <audio autoplay ref="audio" @loadedmetadata="updateDuration" @timeupdate="updateTime" @ended="resetIcon">
                                <source :src="currentSong.src" type="audio/mpeg" />
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="text-center mb-2 border border-gray-700 bg-black rounded-[10px] w-full p-6 mt-[50px]">
                <div class="aboutme-wrapper">
                  <p class="text-3xl underline">About Me:</p>
                    <div class="aboutme-text-wrapper text-2xl">
                      <ul>
                        <li><span>Name: Keo Vuththana</span></li>
                        <li><span>Age: 21</span></li>
                        <li><span>Birthday: 30/June/2003</span></li>
                        <li><span>Major: ITE YEAR 3</span></li>
                        <li><span>Zodiac: Cancer</span></li>
                      </ul>
                    </div>
                </div>
                <div class="mt-[40px] text-2xl wannalearn-wrapper">
                  <p><span class="text-3xl underline">Short Summary of my learning journey</span> <br> Most of my learning journey is all from learning from YouTube, Posting problems online other experience developers
                    or ask AI and most importantly reading documentations.<br>
                    If you have questions along your journey, you can ask me by clicking the social icons above and reaching out there.
                  </p>
                </div>
                <div class="text-center text-3xl project-wrapper mt-[50px]">
                    <p>Profession:</p>
                    <ul class="flex gap-4 justify-center">
                        <li>
                          <i class="fa-brands fa-html5 text-[#FF5733] hover:scale-125 duration-300"></i>
                          <p class="text-base">HTML5</p>
                        </li>
                        <li>
                          <i class="fa-brands fa-css3-alt text-[#2980B9] hover:scale-125 duration-300"></i>
                          <p class="text-base">CSS</p>
                        </li>
                        <li>
                          <i class="fa-brands fa-js hover:scale-125 duration-300"></i>
                          <p class="text-base">JS</p>
                        </li>
                        <li>
                          <i class="fa-brands fa-php hover:scale-125 duration-300"></i>
                          <p class="text-base">PHP</p>
                        </li>
                        <li>
                          <i class="fa fa-database hover:scale-125 duration-300" aria-hidden="true"></i>
                          <p class="text-base">SQL</p>
                      </li>
                    </ul>
                </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, h, defineComponent } from 'vue';
import song1 from '../assets/eyedress.mp3'
import song2 from '../assets/vrienden.mp3'
import img1 from '../assets/song1.png'
import img2 from '../assets/song2.png'
import TypeWriter from '../components/TypeWriter.vue';

const isHovered = ref(false)

const audio = ref(null);
const state = reactive({
  currentIndex: 0,
  isPlaying: false,
  currentTime: 0,
  audioDuration: 0,
})

const currentTime = ref(0);
const duration = ref(0);
const songs = [
  { 
    title: "Something About you",
    author: "Eyedress",
    img_src: img1,
    src: song1
  },
  { 
    title: "Vrienden Voor Altijd",
    author: "Bankzitters",
    img_src: img2,
    src: song2
  },
]

const currentSong = computed(() => songs[state.currentIndex])


const iconClass = computed(() => {
  return state.isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
});


const playAudio = async () => {
  if (audio.value) {
    try {
      await audio.value.play();
      state.isPlaying = true;
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }
};

const pauseAudio = () => {
  if (audio.value) {
    audio.value.pause();
    state.isPlaying = false;
  }
};

const togglePlayPause = () => {
  if(state.isPlaying) {
    pauseAudio()
  } else {
    playAudio()
  }
}

const nextSong = () => {
  state.currentIndex = (state.currentIndex + 1) % songs.length
  playAudio()
  console.log(state.currentIndex)
  if (audio.value) {
    audio.value.load(); // Ensure the audio element is reloaded with the new source
    playAudio(); // Play the new song
  }
}


const seek = () => {
  if (audio.value) {
    audio.value.currentTime = currentTime.value;
  }
};

const updateDuration = () => {
  if (audio.value) {
    duration.value = audio.value.duration;
  }
};

// Update the current time as the audio plays
const updateTime = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime;
  }
};

// Reset icon and current time when audio ends
const resetIcon = () => {
  isPlaying.value = false;
  currentTime.value = 0;
};

// Format time in MM:SS
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

</script>


<style scoped>

    .controls button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        aspect-ratio: 1/1;
        margin: 20px;
        background: rgba(163, 162, 164, 0.3);
        color: var(--primary-clr);
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.3);
        outline: 0;
        font-size: 1.1rem;
        box-shadow: 0 10px 20px rgba(5, 36, 28, 0.3);
        cursor: pointer;
        transition: all 0.3s linear;
    }
</style>
