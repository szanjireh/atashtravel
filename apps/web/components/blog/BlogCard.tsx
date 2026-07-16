import Link from "next/link";

interface BlogCardProps {
  article: {
    title: string;
    slug: string;
    excerpt?: string;
    cover_image?: string;
    created_at: string;
  };
}

export default function BlogCard({ article }: BlogCardProps) {
  return (
    <article className="rounded-xl border bg-white overflow-hidden shadow-sm">
      {article.cover_image && (
        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">
          {article.title}
        </h2>

        <p className="text-gray-600 mb-4">
          {article.excerpt}
        </p>

        <Link
          href={`/blog/${article.slug}`}
          className="text-blue-600"
        >
          ادامه مطلب
        </Link>
      </div>
    </article>
  );
}
