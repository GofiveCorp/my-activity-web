import { Activity } from '../_types/activity'
import instance from './axios'

export async function uploadImage(id: string, formData: FormData) {
  try {
    const res = await instance.post(`/api/activities/${id}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return res
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}

export async function updateActivity(id: string, data: Activity) {
  try {
    const res = await instance.put(`/api/activities/${id}`, data)

    return res
  } catch (error) {
    console.error('Error updating activity:', error)
  }
}

export async function createActivity(data: Activity) {
  try {
    const res = await instance.post('/api/activities', data)

    return res
  } catch (error) {
    console.error('Error creating activity:', error)
  }
}

export async function getActivityByType(type: string) {
  try {
    if (type === null) return

    const res = await instance.get(`/api/activities?type=${type}`)

    return res
  } catch (error) {
    console.error('Error getting activity by type:', error)
  }
}

export async function deleteActivity(id: string) {
  try {
    const res = await instance.delete(`/api/activities/${id}`)

    return res
  } catch (error) {
    console.error('Error deleting activity:', error)
  }
}

export async function getActivityById(id: string) {
  try {
    const res = await instance.get(`/api/activities/${id}`)

    return res
  } catch (error) {
    console.error('Error getting activity by id:', error)
  }
}
