import React from "react";
import { getPostBySlug, getAllPosts } from "../../../lib";
import markdownToHtml from "../../../lib/markdownToHtml";
import Layout from "~/src/components/layout";
import Content from "~/src/components/content";

const pathDirectory = "../src/pages/contributing/_contributing";

const Contributing = ({ post }) => {
  if (!post) {
    return <div>Post is undefined</div>;
  }

  return (
    <Layout>
      <Content data={post} />
    </Layout>
  );
};

export async function getStaticProps() {
  const post: any = getPostBySlug(pathDirectory, [
    "title",
    "excerpt",
    "date",
    "slug",
    "author",
    "content",
    "coverImage",
    "coverImageAlt",
    "draft",
  ]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export default Contributing;
