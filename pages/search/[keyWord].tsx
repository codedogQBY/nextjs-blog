import { useRouter } from 'next/router'
const Search = () => {
  const router = useRouter()
  const { keyWord } = router.query
  return <>{keyWord}</>
}

export default Search
