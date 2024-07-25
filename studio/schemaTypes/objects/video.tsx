import React from 'react'
// import getVideoId from 'get-video-id'

// const VideoPreview = (props) => {
//   const {url} = props
//   // console.log(url)
//   let iframeUrl = ''
//   if (!url) return <div>Waiting for url</div>
//   const {id} = getVideoId(url)
//   // console.log(id)

//   const isYoutube = url.indexOf('youtu') > -1
//   if (isYoutube) iframeUrl = `https://www.youtube.com/embed/${id}`

//   const isVimeo = url.indexOf('vimeo') > -1
//   if (isVimeo) iframeUrl = `https://player.vimeo.com/video/${id}`

//   if (!iframeUrl) return <div>{props.renderDefault(props)}</div>
//   return <iframe src={iframeUrl} width="100%" height="315" frameBorder="0"></iframe>
//   // return <pre>{url}</pre>
// }
import {FiPlay} from 'react-icons/fi'

export default {
  title: 'Video',
  name: 'video',
  type: 'object',
  icon: FiPlay,
  fields: [
    {
      name: 'url',
      type: 'url',
    },
    {
      name: 'placeholder',
      type: 'image',
    },
    // {
    //   name: 'aspectRatio',
    //   title: 'Aspect Ratio',
    //   type: 'string',
    //   description: 'width / height',
    // },
    // {
    //   name: 'autoplay',
    //   type: 'boolean',
    // },
    // {
    //   name: 'loop',
    //   type: 'boolean',
    // },
  ],
  components: {
    // preview: VideoPreview, // Add custom preview component
  },
  preview: {
    select: {
      title: 'url',
      media: 'placeholder',
    },
    // component: VideoPreview,
    prepare(selection: any) {
      console.log(selection)
      const {media, title} = selection
      return {
        title: title,
        media: media,
        subtitle: 'video',
      }
    },
  },
}
