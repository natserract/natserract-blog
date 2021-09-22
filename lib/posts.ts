import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import { blogConfig as config } from '~/src/config/blog.config'
const postsDirectory = join(process.cwd(), "./_posts")

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

interface PostFieldI {
  date: string
}

export type PostsFieldT =
  | "title"
  | "content"
  | "date"
  | "slug"
  | "author"
  | "coverImage"
  | "coverImageAlt"
  | "excerpt"
  | "draft";

export function getPostBySlug(slug, fields: PostsFieldT[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: Array<PostsFieldT> = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1: PostFieldI, post2: PostFieldI) => (post1.date > post2.date ? -1 : 1))
  return posts
}
