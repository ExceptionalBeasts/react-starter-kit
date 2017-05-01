/* eslint no-console:0 */
import * as constants from '../../client/src/lib/constants'

// Mock data
const documents = [{
  'id': 'd001',
  'date': '2016-07-18T14:51:06.157Z',
  'title': 'Some file',
  'type': 'document', // ["document", "image", "video", "link"]
  'about': 'A short description about this piece of documents.',
  'uri': 'app://path/to/some/file.docx',
  'icon': 'app://path/to/some/icon.png',
  'upvotes': ['a001'],
  'downvotes': []
}, {
  'id': 'd002',
  'date': '2016-07-18T14:51:06.157Z',
  'title': 'Another file',
  'type': 'document', // ["document", "image", "video", "link"]
  'about': 'A short description about this piece of documents.',
  'uri': 'app://path/to/some/file.docx',
  'icon': 'app://path/to/some/icon.png',
  'upvotes': [],
  'downvotes': ['a001']
}]

const flag = {
  'id': 'f001',
  'userId': 'a005',
  'date': 'date-time'
}

const flags = {
  'd': [flag],
  'f': [],
  'c': [],
  'n': []
}

const voteType = {
  'VOTE_TYPE_REFUTE': 'refute',
  'VOTE_TYPE_DISBELEIVE': 'disbelieve',
  'VOTE_TYPE_BELIEVE': 'believe',
  'VOTE_TYPE_VOUCH': 'vouch',
  'VOTE_TYPE_COMMENT': 'comment'
}

const vote = {
  'id': 'v001',
  'userId': 'a008',
  'type': voteType.VOTE_TYPE_BELIEVE,
  'date': 'date-time',
  'title': 'This is a title',
  'body': "Here's a bunch of text about this vote.",
  'documents': documents,
  'flags': flags
}

const categories = [{
  'id': 'c001',
  'name': 'government'
}, {
  'id': 'c002',
  'name': 'technology'
}]

const posts = [{
  'id': 'p000',
  'authorId': 'a001',
  'date': '2016-07-18T14:51:06.157Z',
  'lastActivityDate': '2016-07-19T14:51:06.157Z',
  'title': 'Some Sort of Title',
  'body': 'This is sanitized HTML.',
  'ledeUri': 'app://path/to/some/file.png',
  'documents': documents,
  'categories': ['c001'],
  'tags': ['word1', 'word2'],
  'votes': [vote],
  'flags': flags,
  'watcher': ['a002'],
  'score': 95.67
}, {
  'id': 'p001',
  'authorId': 'a002',
  'date': '2016-07-20T14:51:06.157Z',
  'lastActivityDate': '2016-07-29T14:51:06.157Z',
  'title': 'Another short title',
  'body': 'This is sanitized HTML.',
  'ledeUri': 'app://path/to/some/file.png',
  'documents': documents,
  'categories': ['c002'],
  'votes': [vote],
  'flags': flags,
  'watcher': ['a002'],
  'score': 75.23
}]

// Mock API
export default {
  getPosts (options = {}) {
    let filteredPosts = posts
    let ids

    return new Promise((resolve, reject) => {
      if (typeof options === 'string') {
        ids = [options]
      } else if (Array.isArray(options)) {
        ids = options
      } else if (Array.isArray(options.ids)) {
        ids = options.ids
      }

      if (ids) {
        filteredPosts = posts.filter((post) => post.id in ids)
        resolve(filteredPosts.count === 1 ? filteredPosts[0] : filteredPosts)
      }

      resolve(filteredPosts.sort((a, b) => b.id < a.id))
    })
  },

  savePost (post) {

  },

  savePostDocumentationVote (postId, docId, voteDirection) {
    const testUser = 'a001'

    let postToMutate = posts.filter(post => post.id === postId)[0]

    return new Promise((resolve, reject) => {
      let docToMutate, post

      if (!postToMutate) {
        reject('We couldn\'t find that post.')
      }

      docToMutate = postToMutate.documents.filter(d => d.id === docId)[0]

      if (!docToMutate) {
        reject('We couldn\'t find that piece of documents.')
      }

      if (voteDirection === constants.VOTE_UP) {
        docToMutate.upvotes = [...docToMutate.upvotes.filter(uid => uid !== testUser), testUser]
        docToMutate.downvotes = [...docToMutate.downvotes.filter(uid => uid !== testUser)]
      } else if (voteDirection === constants.VOTE_DOWN) {
        docToMutate.upvotes = [...docToMutate.upvotes.filter(uid => uid !== testUser)]
        docToMutate.downvotes = [...docToMutate.downvotes.filter(uid => uid !== testUser), testUser]
      }

      post = Object.assign({}, postToMutate, {
        'lastActivityDate': (new Date().toISOString()),
        'documents': [
          ...postToMutate.documents.filter(d => d.id !== docId),
          docToMutate
        ].sort((a, b) => b.id < a.id),
        'score': 89.75
      })

      const postDoc = post.documents.filter(d => d.id === docId)[0]
      console.log('votes in post:', postDoc.upvotes, postDoc.downvotes)
      console.log('votes in doc:', docToMutate.upvotes, docToMutate.downvotes)

      resolve(post)
    })
  },

  getCategories (ids) {
    if (ids) {
      return categories.filter((cat) => cat.id in ids)
    }
    return categories
  }
}
