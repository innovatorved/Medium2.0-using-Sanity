import type { NextApiRequest, NextApiResponse } from 'next';

import sanityClient from "@sanity/client";


const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: process.env.NEXT_PUBLIC_SANITY_DATASET === "production",
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
}
const client = sanityClient(config);

export default async function createComments(
  req: NextApiRequest,
  res: NextApiResponse
){
  
    const { _id , name , email , comment } = req.body;
    try {
        await client.create({
            _type : "comment",
            post:{
                _type:"reference",
                _ref:_id,
            },
            name,
            email,
            comment,
        });

    } catch (err) {
        return res.status(500).json({ message : "Coudnot Submit result" ,err , state : false});
    }
    return res.status(200).json({ message : "Comment Submitted" , state:true});
        
}