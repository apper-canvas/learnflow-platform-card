import enrollmentData from '../mockData/enrollment.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let enrollments = [...enrollmentData]

export const getAll = async () => {
  await delay(300)
  return [...enrollments]
}

export const getById = async (id) => {
  await delay(200)
  const enrollment = enrollments.find(e => e.id === id)
  return enrollment ? { ...enrollment } : null
}

export const create = async (enrollmentData) => {
  await delay(400)
  const newEnrollment = {
    ...enrollmentData,
    id: `enrollment-${Date.now()}`,
    enrolledAt: new Date().toISOString()
  }
  enrollments.push(newEnrollment)
  return { ...newEnrollment }
}

export const update = async (id, updateData) => {
  await delay(300)
  const index = enrollments.findIndex(e => e.id === id)
  if (index === -1) throw new Error('Enrollment not found')
  
  enrollments[index] = { ...enrollments[index], ...updateData }
  return { ...enrollments[index] }
}

export const delete_ = async (id) => {
  await delay(250)
  const index = enrollments.findIndex(e => e.id === id)
  if (index === -1) throw new Error('Enrollment not found')
  
  enrollments.splice(index, 1)
  return true
}

export const delete = delete_