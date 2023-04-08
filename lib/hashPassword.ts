import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export async function comparePassword(password, hash) {
    const result = await bcrypt.compare(password, hash)
    return result
}
