export declare const createBlog: (req: Request, payload: {
    title: string;
    content: string;
}) => Promise<{
    author: {
        email: string;
        name: string;
    };
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    content: string;
    image: string | null;
    authorId: number;
}>;
export declare const BlogService: {
    createBlog: (req: Request, payload: {
        title: string;
        content: string;
    }) => Promise<{
        author: {
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        image: string | null;
        authorId: number;
    }>;
};
//# sourceMappingURL=blog.service.d.ts.map