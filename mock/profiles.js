const profiles = [{
  profileId: 'profile-1',
  userId: 'user-1',
  displayName: 'User Numero One',
  age: 37,
  dateTimeStart: '',
  dateTimeEnd: ''
}]

export function getProfiles ({ profileId, userId, minAge, maxAge, dateTimeStart, dateTimeEnd }) {
  let _profiles = profiles
  if (profileId) _profiles = _profiles.filter(profile => profile.profileId === profileId)
  if (userId) _profiles = _profiles.filter(profile => profile.userId === userId)
  if (minAge && maxAge) _profiles = _profiles.filter(profile => minAge <= profile.age && profile.age <= maxAge)
  if (dateTimeStart && dateTimeEnd) _profiles = _profiles.filter(profile => dateTimeStart >= profile.dateTimeStart && profile.dateTimeEnd <= dateTimeEnd)
  return _profiles
}
