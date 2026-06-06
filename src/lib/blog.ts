import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Ensure Buffer is available for gray-matter in the browser
if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    date: string;
    imageUrl: string;
    slug: string;
    readingTime: number;
    tags?: string[];
    seoTitle?: string;
    metaDescription?: string;
}

export const getAllPosts = async (): Promise<BlogPost[]> => {
    // Vite's import.meta.glob to get all markdown files
    const modules = import.meta.glob('../../posts/*.md', { query: '?raw', eager: true });
    
    const posts = Object.keys(modules).map((path) => {
        const content = (modules[path] as any).default;
        const { data, content: body } = matter(content);

        const id = path.split('/').pop()?.replace('.md', '') || '';
        const wordCount = body.trim().split(/\s+/).length;
        const readingTime = Math.max(1, Math.round(wordCount / 200));

        return {
            id,
            ...data,
            content: body,
            slug: data.slug || id,
            excerpt: data.excerpt || data.metaDescription || '',
            category: data.category || 'General',
            imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80',
            readingTime,
        } as BlogPost;
    });

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug);
};

export const getRecentPosts = async (limit: number = 5): Promise<BlogPost[]> => {
    const posts = await getAllPosts();
    return posts.slice(0, limit);
};

export const getCategories = async (): Promise<string[]> => {
    const posts = await getAllPosts();
    const categories = new Set(posts.map(post => post.category));
    return Array.from(categories);
};
