import courseData from '../mockData/course.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let courses = [...courseData]

export const getAll = async () => {
  await delay(300)
  return [...courses]
}

export const getById = async (id) => {
  await delay(200)
  const course = courses.find(c => c.id === id)
  return course ? { ...course } : null
}

export const create = async (courseData) => {
  await delay(400)
  const newCourse = {
    ...courseData,
    id: `course-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  courses.unshift(newCourse)
  return { ...newCourse }
}

export const update = async (id, updateData) => {
  await delay(300)
  const index = courses.findIndex(c => c.id === id)
  if (index === -1) throw new Error('Course not found')
  
  courses[index] = { ...courses[index], ...updateData }
  return { ...courses[index] }
}

export const delete_ = async (id) => {
  await delay(250)
  const index = courses.findIndex(c => c.id === id)
  if (index === -1) throw new Error('Course not found')
  
  courses.splice(index, 1)
  return true
}