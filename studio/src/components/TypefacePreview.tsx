import {useCallback, useEffect, useState} from 'react'
import {Stack, Text} from '@sanity/ui'
import {ObjectInputProps, useClient} from 'sanity'

export const TypefacePreview = (props: ObjectInputProps) => {
  const client = useClient({apiVersion: '2023-03-25'})
  const {renderDefault, value} = props
  const asset = value?.asset as {_ref?: string} | undefined

  const [fontUrl, setFontUrl] = useState<string | null>(null)
  const [originalFilename, setOriginalFilename] = useState<string | null>(null)

  const loadFontUrl = useCallback(async () => {
    if (!asset?._ref) {
      setFontUrl(null)
      return
    }

    const query = `*[_type=='sanity.fileAsset' && _id=='${asset._ref}'][0]{url, originalFilename}`
    const res = await client.fetch(query)
    if (res?.url) {
      setFontUrl(res.url)
      setOriginalFilename(res.originalFilename)
    }
  }, [asset?._ref, client])

  useEffect(() => {
    loadFontUrl()
  }, [loadFontUrl])

  const fontFace = fontUrl
    ? `
    @font-face {
      font-family: 'preview-font';
      src: url(${fontUrl}) format('opentype');
    }
  `
    : ''

  const list = [...Array(7).keys()]

  return (
    <Stack space={5}>
      {renderDefault(props)}
      {fontUrl && (
        <Stack space={3}>
          <style>{fontFace}</style>
          {list.map((item, i) => (
            <Text size={i} key={i} textOverflow="ellipsis">
              <div
                style={{
                  fontFamily: 'preview-font',
                  fontSize: `${16 + i * 4}px`,
                }}
              >
                {originalFilename} ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </div>
            </Text>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
