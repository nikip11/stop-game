import { defineStore } from 'pinia';

export const useTimerStore = defineStore('timer', {
  state: () => ({
     seconds: 0,
     letter: ''
  }),
  actions: {
    setSeconds(seconds: number) {
      this.seconds = seconds;
    },
    setLetter(letter: string) {
      this.letter = letter
    }
  },
  getters: {
    getSeconds(): number {
      return this.seconds
    },
    getLetter(): string {
      return this.letter
    }
  }
});
