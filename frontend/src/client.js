import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId:'l4l5gprs',
    dataset:'production',
    apiVersion:'2022-11-16',
    useCdn:'true',
    token:process.env.REACT_APP_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
