export interface Post{
    _id: string;
    _createdAt: string;
    title: string;
    description: string;
    author : {
        name: string;
        image: string;
        email: string;
    };
    mainImage: string;
    slug: {
        current: string;
    };
    body: [object];
}