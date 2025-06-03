import userData from '../mockData/user.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let users = [...userData]

export const getAll = async () => {
  await delay(300)
  return [...users]
}

export const getById = async (id) => {
  await delay(200)
  const user = users.find(u => u.id === id)
  return user ? { ...user } : null
}

export const create = async (userData) => {
  await delay(400)
  const newUser = {
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  users.unshift(newUser)
  return { ...newUser }
}

export const update = async (id, updateData) => {
  await delay(300)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) throw new Error('User not found')
  
  users[index] = { ...users[index], ...updateData }
  return { ...users[index] }
}

export const delete_ = async (id) => {
  await delay(250)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) throw new Error('User not found')
  
  users.splice(index, 1)
  return true
}

