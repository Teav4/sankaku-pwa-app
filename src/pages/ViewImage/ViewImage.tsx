import { Image } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'

export function ViewImage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const url = searchParams.get('url') || ''

  return (
    <Image
      showSkeleton
      src={`https://sankaku.teav4.com/?url=${encodeURIComponent(url)}`}
      maxDelay={10000}
      objectFit="cover"
    />
  )
}
