import { useRouter } from 'next/router'
const Article = () => {
  const router = useRouter()
  const { id } = router.query
  return <>{id}</>
}

export default Article
