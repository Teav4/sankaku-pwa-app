import * as React from 'react'
import { useFetchIllust, SearchIllustConfigProps } from '@/hooks/useFetchIllust'
import { Grid, Card, Image, Modal, Button, Text } from '@nextui-org/react'
import { useInView } from 'react-intersection-observer'
import { useLocation, useSearchParams } from 'react-router-dom'

interface ImageProps {
  url: string
  width: number
  height: number
}

type SelectOrderValue =
  | 'popularity'
  | 'date'
  | 'quality'
  | 'random'
  | 'recently_favorited'
  | 'recently_voted'

const ImageItem = ({ url, width, height }: ImageProps) => {
  return (
    <Card css={{ borderRadius: '.5rem' }}>
      <Card.Body css={{ padding: 0, height: 'fit-content' }}>
        <Image
          showSkeleton
          src={`https://sankaku.teav4.com/?url=${encodeURIComponent(url)}`}
          maxDelay={10000}
          objectFit="cover"
        />
      </Card.Body>
    </Card>
  )
}

export function Home() {
  const { ref, inView } = useInView()
  const [visible, setVisible] = React.useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const tags = searchParams.get('tags')
    ? searchParams.get('tags')?.split(' ')
    : []
  const orderBy =
    (searchParams.get('order_by') as SelectOrderValue) || 'popularity'
  const limit = searchParams.get('limit') || '20'

  const { data, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useFetchIllust({
      tags,
      limit: parseInt(limit),
      order_by: orderBy
    })

  const closeBtn = () => {
    setVisible(false)
    console.log('close')
  }

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <>
      {data?.pages.map((page, index) => (
        <Grid.Container gap={1} justify="center" wrap="wrap" key={index}>
          {page.data.map((item, index) => (
            <Grid xs={3.8} key={index}>
              <ImageItem
                url={item.preview_url}
                width={item.preview_width}
                height={item.preview_height}
              />
            </Grid>
          ))}
        </Grid.Container>
      ))}
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </>
  )
}
