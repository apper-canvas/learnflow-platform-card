import assignmentData from '../mockData/assignment.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let assignments = [...assignmentData]

export const getAll = async () => {
  await delay(300)
  return [...assignments]
}

export const getById = async (id) => {
  await delay(200)
  const assignment = assignments.find(a => a.id === id)
  return assignment ? { ...assignment } : null
}

export const create = async (assignmentData) => {
  await delay(400)
  const newAssignment = {
    ...assignmentData,
    id: `assignment-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  assignments.push(newAssignment)
  return { ...newAssignment }
}

export const update = async (id, updateData) => {
  await delay(300)
  const index = assignments.findIndex(a => a.id === id)
  if (index === -1) throw new Error('Assignment not found')
  
  assignments[index] = { ...assignments[index], ...updateData }
  return { ...assignments[index] }
}

export const delete_ = async (id) => {
  await delay(250)
  const index = assignments.findIndex(a => a.id === id)
  if (index === -1) throw new Error('Assignment not found')
  
  assignments.splice(index, 1)
  return true
}

