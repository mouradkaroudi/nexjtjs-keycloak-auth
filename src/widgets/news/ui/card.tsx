import Image from "next/image";

export function Card({ post }) {
  const { url, title,  publishedAt, source, description, author, urlToImage} = post;
  return (
    <article className="flex flex-row items-start gap-6">
      <div className="aspect-square flex-shrink-0 w-64">
        <a href={url}>
          <img
            src={urlToImage}
            alt=""
            className="w-full h-full rounded-2xl object-cover"
          />
        </a>
      </div>
      <div className="">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={publishedAt} className="text-gray-500">
            {publishedAt}
          </time>
          <a
            href={"#"}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {source.name}
          </a>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href={url}>
              <span className="absolute inset-0" />
              {title}
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {description}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a href="#">
                <span className="absolute inset-0" />
                {author}
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
