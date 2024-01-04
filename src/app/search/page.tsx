import PostList from "@/components/posts/postList"
import { fetchPostsBySearchTerm } from "@/db/queries/post"
import { redirect } from "next/navigation"

type SearchPageProps = {
    searchParams: {
        term: string
    }
}

export default async function SearchPage({ searchParams }: Readonly<SearchPageProps>) {
    const { term } = searchParams

    if(!term) redirect('/')

    return <div>
        <PostList fetchData={() => fetchPostsBySearchTerm(term)}/>
    </div>
}