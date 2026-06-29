import blog1 from "../assets/blogs/1.png";
import blog2 from "../assets/blogs/2.jpg";
import blog1_1 from "../assets/blogs/3.png";
import blog3 from "../assets/blogs/3.png";
import blog4 from "../assets/blogs/4.jpg";
import blog5 from "../assets/blogs/5.png";
import blog6 from "../assets/blogs/6.png";
import blog1_2 from "../assets/blogs/7.jpg";  

export const HOME_BLOG_COUNT = 5;

const LOREM_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
];

export const BLOG_POSTS = [
  {
    id: "blog-1",
    slug: "marketing-guide-5-steps-organic",
    title: "Marketing Guide: 5 Steps to Success.",
    date: "June 30, 2022",
    category: "Organic",
    image: blog1,
    content: LOREM_PARAGRAPHS,
    gallery: [blog1_1, blog1_2],
  },
  {
    id: "blog-2",
    slug: "solve-business-deal-issue-fruits",
    title: "Best way to solve business deal issue in market.",
    date: "June 24, 2022",
    category: "Fruits",
    image: blog4,
    content: LOREM_PARAGRAPHS,
    gallery: [blog5, blog6],
  },
  {
    id: "blog-3",
    slug: "business-ideas-grow-traffic-vegetables",
    title: "Business ideas to grow your business traffic.",
    date: "January 30, 2022",
    category: "Vegetables",
    image: blog5,
    content: LOREM_PARAGRAPHS,
    gallery: [blog2, blog4],
  },
  {
    id: "blog-4",
    slug: "marketing-guide-5-steps-fastfood",
    title: "Marketing Guide: 5 Steps to Success to way.",
    date: "January 25, 2022",
    category: "Fastfood",
    image: blog6,
    content: LOREM_PARAGRAPHS,
    gallery: [blog3, blog1],
  },
  {
    id: "blog-5",
    slug: "business-ideas-grow-traffic-snacks",
    title: "Business ideas to grow your business traffic.",
    date: "January 18, 2022",
    category: "Snacks",
    image: blog2,
    content: LOREM_PARAGRAPHS,
    gallery: [blog4, blog5],
  },
];

export const getBlogPostBySlug = (slug) =>
  BLOG_POSTS.find((post) => post.slug === slug);

export const getRecentPosts = (currentSlug, limit = 5) =>
  BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, limit);

export const getBlogCategories = () => {
  const counts = BLOG_POSTS.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([name, count]) => ({ name, count }));
};
