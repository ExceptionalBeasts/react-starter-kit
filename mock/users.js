const users = [
  { userId: 'user-1', email: 'user1@server.com' },
  { userId: 'user-2', email: 'user2@server.com' }
]

export function getUsers ({ userId }) {
  let _users = users
  if (userId) _users = _users.filter(user => user.userId === userId)
  return _users
}
