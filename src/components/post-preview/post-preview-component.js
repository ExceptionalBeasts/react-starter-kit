import React from 'react'
import mockPosts from '../../../mock/posts'
import { object } from 'prop-types'

console.log(mockPosts)

const PostPreviewComponent = ({ data }) => {
  const header = (
    <header>
      header
    </header>
  )

  const avatar = (
    <div className="post-preview-avatar avatar">
      avatar
    </div>
  )

  const detail = (
    <div className="post-preview-detail">
      detail
    </div>
  )

  const stats = (
    <div className="post-preview-stats">
      stats
    </div>
  )

  return (
    <section className='post-preview'>
      { header } { avatar } { detail } { stats }
    </section>
  )
}

PostPreviewComponent.propTypes = {
  data: object
}

export default PostPreviewComponent
