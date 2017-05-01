import React from 'react'
import PostPreviewComponent from './components/post-preview/post-preview-component'
import posts from '../mock/posts'

const AppComponent = props => {
  const postList = posts.map(post => <div><PostPreviewComponent key={post.id} data={post}/></div>)

  return <section>{postList}</section>
}

export default AppComponent
