export type Activity = {
  id: string
  title: string
  description: string
  type: string
  startTime: string
  endTime: string
  date: string
  duration: {
    hours: number
    minutes: number
  }
  barometer: string
  image?: string
}
