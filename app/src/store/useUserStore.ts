import { defineStore } from 'pinia';
// import type { User } from '@/types'

// const user = useStorage('user')

export const useUserStore = defineStore('user', {
  state: () => ({
     user: '',
     points: 0,
     totalPoints: 0
  }),
  actions: {
    setUser(user: string) {
      this.user = user;
    },
    setPoints(points: number) {
      this.points = points
    },
    setTotalPoints(totalPoints: number) {
      this.totalPoints = totalPoints
    },
    resetUser() {
        this.user = ''
    }
  },
  getters: {
    getUser(): string {
      return this.user
    },
    getPoints(): number {
      return this.points
    },
    getTotalPoints(): number {
      return this.totalPoints
    }
  }
});
