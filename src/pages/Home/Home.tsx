import * as React from 'react'
import { useFetchIllust } from '@/hooks/useFetchIllust'
import { Grid, Card, Text, Image, Loading } from '@nextui-org/react'
import { useInView } from 'react-intersection-observer'

interface ImageProps {
  url: string
  width: number
  height: number
}

const ImageItem = ({ url, width, height }: ImageProps) => {
  return (
    <Card css={{ borderRadius: '.5rem' }}>
      <Card.Body css={{ padding: 0, height: 'fit-content' }}>
        <Image
          showSkeleton
          src={`http://localhost:3000/?url=${encodeURIComponent(url)}`}
          maxDelay={10000}
          objectFit="cover"
        />
      </Card.Body>
    </Card>
  )
}

export function Home() {
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useFetchIllust({ tags: ['genshin_impact'], limit: 40 })
  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView) {
      console.log(inView)
      fetchNextPage()
    }
  }, [inView])

  console.log(data)
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
