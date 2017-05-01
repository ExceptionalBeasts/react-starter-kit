import faker from 'faker'

import {
  SEX_MALE,
  SEX_FEMALE,
  ORIENTATION_STRAIGHT,
  ORIENTATION_BI,
  PRESENTS_AS_MALE,
  PRESENTS_AS_FEMALE,
  RACE_WHITE,
  RACE_MULTIRACIAL,
  PARTY_TYPES_SINGLES
} from '../src/common/people'

function createPosts (count) {
  const posts = []

  for (var i = 1; i <= count; i++) {
    posts.push({
      postId: faker.random.uuid(),
      account_id: faker.random.uuid(),
      market_id: 'market-1',
      display_name: faker.name.findName(),
      headline: faker.lorem.sentence(),
      age: Math.floor(Math.random() * 54) + 21,
      party: [{
        sex: SEX_MALE,
        orientation: ORIENTATION_STRAIGHT,
        age: Math.floor(Math.random() * 54) + 21,
        race: RACE_MULTIRACIAL,
        attributes: [],
        activities: []
      }, {
        sex: SEX_FEMALE,
        orientation: ORIENTATION_BI,
        age: Math.floor(Math.random() * 54) + 21,
        race: RACE_WHITE,
        attributes: [],
        activities: []
      }],
      datetime_start: '',
      datetime_end: '',
      looking_for_parties: [PARTY_TYPES_SINGLES],
      looking_for_attributes: [{
        sex: SEX_FEMALE,
        orientations: [ORIENTATION_BI],
        races: [],
        age_min: 18,
        age_max: 40,
        attributes: [],
        activities: []
      }],
      public_photos: [],
      private_photos: [],
      is_verified: true,
      applicants: []
    })
  }

  return posts
}

export default createPosts(100)
