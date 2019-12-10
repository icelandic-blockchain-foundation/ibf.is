import React from "react";
import { graphql } from "gatsby";
import Layout from "src/ui/components/Layout";
import Menu from "src/ui/components/Menu";
import Section from "src/ui/components/Section";
import BlogContent from "src/ui/components/BlogContent";
import { H3 } from "src/ui/components/Typography";
import TranslationContext from "src/utility/TranslationContext";
import { withLang } from "src/utility/Translation";

export const query = graphql`
  query BlogPostQuery($lang: String!, $uid: String!) {
    posts: allPrismicPost(
      filter: {
        lang: { eq: $lang }
        uid: { eq: $uid }
        data: { on_blog: { eq: "yes" } }
      }
    ) {
      edges {
        previous {
          uid
          data {
            title {
              text
            }
          }
        }
        next {
          uid
          data {
            title {
              text
            }
          }
        }
        node {
          uid
          data {
            image {
              url
            }
            on_blog
            date: publish_date(formatString: "DD/MM/YY HH:MM")
            summary {
              text
            }
            text {
              html
            }
            title {
              text
            }
            author {
              document {
                ... on PrismicMember {
                  id
                  data {
                    name {
                      text
                    }
                    title {
                      text
                    }
                  }
                }
              }
            }
            body {
              ... on PrismicPostBodyPodcastSlice {
                id
                primary {
                  podcast {
                    id
                    document {
                      ... on PrismicPodcast {
                        id
                        data {
                          description {
                            text
                          }
                          image {
                            url
                          }
                          embed {
                            html
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on PrismicPostBodyEventSlice {
                id
                primary {
                  event {
                    document {
                      ... on PrismicEvent {
                        id
                        data {
                          address
                          title {
                            text
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on PrismicPostBodyExternalLink {
                id
                primary {
                  link {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

//@TODO need to fetch all blog post and filter on on_blog to generate successful bottom links
const BlogPost = ({ data, pageContext }) => {
  const { uid, lang } = pageContext;

  const T = withLang(lang);

  let posts = pageContext.posts;
  const post = data.posts.edges[0];

  if (!post) throw Error("Post not found");

  const title = post.node.data.title.text;
  const date = post.node.data.date;
  const text = post.node.data.text.html;

  const body = post.node.data.body[0];

  const image = post.node.data.image ? post.node.data.image.url : null;
  let next = null;
  let previous = null;

  posts = posts.filter(p => p.on_blog === "yes");

  posts.forEach((post, index) => {
    if (post.uid !== uid) return true;

    if (posts[index + 1]) next = posts[index + 1];
    if (posts[index - 1]) previous = posts[index - 1];

    return false;
  });

  const slices = [];

  if (body) {
    if (body.primary.podcast && body.primary.podcast.document) {
      slices.push({
        type: "podcast",
        data: {
          text: body.primary.podcast.document.data.text
            ? body.primary.podcast.document.data.text.text
            : null,
          image: body.primary.podcast.document.data.image
            ? body.primary.podcast.document.data.image.url
            : null,
        },
        component: (
          <div>
            <H3>Hlustaðu á þáttinn:</H3>
            <div
              dangerouslySetInnerHTML={{
                __html: body.primary.podcast.document.data.embed.html,
              }}
              style={{
                marginTop: "8px",
                marginBottom: "32px",
              }}
            />
          </div>
        ),
      });
    }
  }

  return (
    <TranslationContext.Provider value={lang}>
      <Layout>
        <Menu />
        <Section
          top="xlarge"
          bottom="xlarge"
          number={date}
          backgroundText={T("blog")}
          legendText={title}
          legendTextColor="dark"
        >
          <BlogContent
            title={title}
            content={text}
            slices={slices}
            previous={previous}
            next={next}
            image={image}
          />
        </Section>
      </Layout>
    </TranslationContext.Provider>
  );
};
export default BlogPost;
