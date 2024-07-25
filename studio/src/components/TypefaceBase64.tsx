// /components/MyCustomStringInput.jsx
import {forwardRef, useCallback, useEffect, useState} from 'react'
import {Stack, Text, TextInput, Button, Flex} from '@sanity/ui'
import {ObjectInputProps, StringInputProps, set, unset, useClient, useFormValue} from 'sanity'
import {useId} from '@reach/auto-id' // hook to generate unique IDs
// import {client} from '../../sanity-client'
import {blobToBase64} from './utils'

export const TypefaceBase64 = (props: StringInputProps) => {
  const client = useClient({apiVersion: '2023-03-25'})
  const {elementProps, onChange, value = ''} = props
  const asset: any = useFormValue(['typefaceFile', 'asset'])
  // console.log(props)
  // console.log(asset)

  const [base64, setBase64] = useState<string>(value || '')
  const inputId = useId()

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  const getTypeFaceData = () => {
    // console.log("1. getTypeFaceData");
    console.log(props)
    // return
    if (!asset) {
      alert('Upload file first')
      return
    }
    const assetId = asset._ref
    const query = `*[_type=='sanity.fileAsset' && _id=='${assetId}'][0]{assetId,url,path,originalFilename}`

    client.fetch(query).then((res) => {
      const fileUrl = res.url
      fetch(fileUrl)
        .then((res) => res.blob())
        .then(blobToBase64)
        .then((res) => {
          console.log(res)
          setBase64(res)
        })
      // setData(JSON.stringify(res));
    })
  }

  useEffect(() => {
    if (base64) {
      onChange(base64 ? set(base64) : unset())
    }
  }, [base64])

  const fontFace = `
    @font-face {
      font-family: 'test';
      src: url(${base64}) format('opentype');
    }
  `

  const list = [...Array(5).keys()]
  return (
    <Stack space={5}>
      <Flex>
        <TextInput {...elementProps} onChange={handleChange} value={value} />
        <Button mode="ghost" text="Generate base64" onClick={getTypeFaceData} />
      </Flex>
      {base64 && (
        <Stack space={3}>
          <style>{fontFace}</style>

          {list.map((item, i) => (
            <Text size={i} key={i}>
              <div
                className="preview"
                style={{
                  fontFamily: 'test',
                }}
              >
                Watch "Jeopardy!", Alex Trebek's fun TV quiz game.
              </div>
            </Text>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
