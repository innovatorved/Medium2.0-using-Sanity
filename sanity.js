import {
    createCurrentUserHook,
    createClient
} from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

const sanityConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: process.env.NEXT_PUBLIC_SANITY_DATASET === "production",
    apiVersion: "2022-02-18",
}

// create client using config details
const sanityClient = createClient(sanityConfig);

// // Image Url Builder
const urlFor = (source) => imageUrlBuilder(sanityConfig).image(source);

const usetCurrentUser = createCurrentUserHook(sanityConfig);

export {
    sanityConfig,
    sanityClient,
    urlFor,
    usetCurrentUser
}
