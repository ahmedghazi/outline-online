import React from 'react'
import ReactPlayer from 'react-player'
type Props = {
  props: {
    url: string
  }
}

const EmbedPreview = (props: Props): JSX.Element => {
  const {url, renderDefault} = props

  const playerConfig = {
    youtube: {
      playerVars: {
        controls: 1,
        disablekb: 1,
        enablejsapi: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        cc_load_policy: 0,
        showinfo: 0,
        rel: 0,
        origin: 'https://studio-eker-backoffice.sanity.studio',
      },
      embedOptions: {
        host: 'https://www.youtube-nocookie.com',
      },
    },
  }

  if (!url) return <div>{renderDefault(props)}</div>
  return (
    <div>
      {renderDefault({...props, title: 'YouTube Embed'})}
      <ReactPlayer url={url} config={playerConfig} width="100%" height="auto" />
    </div>
  )
}

export default {
  title: 'Embed',
  name: 'embed',
  type: 'object',

  fields: [
    {
      name: 'url',
      type: 'url',
      description: 'url publique du media ex: https://www.youtube.com/watch?v=exTZ9vB6ZeE',
    },
  ],
  components: {
    preview: EmbedPreview, // Add custom preview component
  },
  preview: {
    select: {
      url: 'url',
    },
  },
}
