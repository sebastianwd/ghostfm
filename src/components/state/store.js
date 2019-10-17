import { createStore, computed, actionOn, action, memo } from "easy-peasy"

const layoutModel = {
  videoPosition: { docked: true, fixed: false, hidden: false },
  sidebarState: "SHOW", // "HIDE"
  toggleVideoPosition: action(state => {
    if (state.videoPosition.docked) {
      state.videoPosition.fixed = true
      state.videoPosition.docked = false
    } else if (state.videoPosition.fixed) {
      state.videoPosition.hidden = true
      state.videoPosition.fixed = false
    } else if (state.videoPosition.hidden) {
      state.videoPosition.docked = true
      state.videoPosition.hidden = false
    }
  }),
}

const playerModel = {
  url: null,
  pip: false,
  playing: false,
  controls: false,
  light: false,
  volume: 0.8,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
  playTrack: action((state, payload) => {
    state.played = 0
    state.url = `https://www.youtube.com/watch?v=${payload.videoId}`
    state.loaded = 0
    state.pip = false
    state.playing = true
  }),
  handleProgress: action((state, payload) => {
    state.played = payload.played
    state.playedSeconds = payload.playedSeconds
    state.loaded = payload.loaded
    state.loadedSeconds = payload.loadedSeconds
  }),
  handleDuration: action((state, payload) => {
    state.duration = payload
  }),
  handleSeekMouseUp: action(state => {
    state.seeking = false
  }),
  handleSeekChange: action((state, payload) => {
    state.played = payload
  }),
  handleSeekMouseDown: action(state => {
    state.seeking = true
  }),
  handlePlay: action(state => {
    console.log("song playing")
    state.playing = true
  }),
  handlePause: action(state => {
    console.log("song paused")
    state.playing = false
  }),
  handlePlayPause: action(state => {
    if (!state.url) {
      return
    }
    state.playing = !state.playing
  }),
  handleEnded: action(state => {
    console.log("song ended")
    state.playing = false
  }),
}

const playlistModel = {
  queue: [],
  current: {
    image: "",
    track: "",
    artist: "",
    album: "",
  },
  onPlay: actionOn(
    (actions, storeActions) => storeActions.player.playTrack,
    (state, target) => {
      state.current = target.payload.current
    }
  ),

  /*{
    track: trackName,
    artist: artistName,
  }*/
  nextTrack: computed(state => {
    if (!state.queue || !state.current.track) {
      return null
    }
    const currentTrackIndex = state.queue.findIndex(
      item => item.track === state.current.track
    )
    const nextTrack = state.queue[currentTrackIndex + 1]
    if (!nextTrack) {
      return null
    }
    return nextTrack
  }),
  prevTrack: computed(state => {
    if (!state.queue || !state.current.track) {
      return null
    }
    const currentTrackIndex = state.queue.findIndex(
      item => item.track === state.current.track
    )
    const prevTrack = state.queue[currentTrackIndex - 1]
    if (!prevTrack) {
      return null
    }
    return prevTrack
  }),
  setQueue: action((state, payload) => {
    let queue = payload.tracks.map(({ artist, name }, index) => {
      return { index: index, artist: artist.strArtist, track: name }
    })
    state.queue = queue
  }),
}

const storeModel = {
  player: playerModel,
  playlist: playlistModel,
  layout: layoutModel,
}

const store = createStore(storeModel)

export default store
