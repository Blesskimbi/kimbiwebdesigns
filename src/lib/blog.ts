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
    tags?: string[];
    faqs?: { q: string; a: string }[];
}

export const getAllPosts = async (): Promise<BlogPost[]> => {
    // Vite's import.meta.glob to get all markdown files
    const modules = import.meta.glob('../../posts/*.md', { query: '?raw', eager: true });
    
    const posts = Object.keys(modules).map((path) => {
        const content = (modules[path] as any).default;
        const { data, content: body } = matter(content);
        
        // Use filename as ID if slug is not present
        const id = path.split('/').pop()?.replace('.md', '') || '';
        
        return {
            id,
            ...data,
            content: body,
            slug: data.slug || id,
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
