import { useState } from 'react'
import HookCard from './HookCard'

const code = `function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(128)

  function handleClick() {
    setLiked(!liked)
    setTotalLikes(liked ? totalLikes - 1 : totalLikes + 1)
  }

  return (
    <button onClick={handleClick}>
      {liked ? '❤️' : '🤍'} {totalLikes} likes
    </button>
  )
}`

export default function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(128)

  function handleClick() {
    setLiked(!liked)
    setTotalLikes(liked ? totalLikes - 1 : totalLikes + 1)
  }

  return (
    <HookCard
      title="Total Likes"
      hook="useState"
      blurb="Two state variables that update together from one click."
      code={code}
      state={{ liked, totalLikes }}
    >
      <button className={`demo-btn like ${liked ? 'liked' : ''}`} onClick={handleClick}>
        {liked ? '❤️' : '🤍'} {totalLikes} likes
      </button>
    </HookCard>
  )
}
