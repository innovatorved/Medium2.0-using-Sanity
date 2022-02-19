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
    comments: [Comment];
}

export interface Comment {
    approved : boolean;
    comment : string;
    email : string;
    name : string;
    post:{
        _ref: string;
        _type: string;
    };
    _id: string;
    _createdAt: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}