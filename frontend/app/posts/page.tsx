import api from "../lib/axios"


// 型定義（Goの構造体と合わせる）
interface Post {
  id: number;
  content: string;
  author: string;
}

export default async function Home() {

  const baseURL = typeof window === 'undefined' 
  ? process.env.API_URL_SERVER 
  : process.env.NEXT_PUBLIC_API_URL;

  // Server Component内なので、直接asyncでデータを取得できる
  // これがSSR（Server Side Rendering）の基本形です
  const response = await api.get<Post[]>(`${baseURL}/api/posts`);
  const posts = response.data;

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold border-b pb-4">Timeline</h1>
      <div className="divide-y">
        {posts.map((post) => (
          <div key={post.id} className="py-4">
            <p className="font-bold">@{post.author}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
