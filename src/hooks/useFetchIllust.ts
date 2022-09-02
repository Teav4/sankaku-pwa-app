import { SEARCH_ILLUST } from '@/constants/apiURL'
import { GET_ILLUST } from '@/constants/queryKey'
import axios, { AxiosResponse } from 'axios'
import { useInfiniteQuery } from 'react-query'

export interface tagProps {
  id: number
  name_en: string
  name_ja: string
  type: number
  count: number
  post_count: number
  pool_count: number
  locale: string
  rating: string
  version: number
  tagName: string
  total_post_count: number
  total_pool_count: number
  name: string
}

export interface imageProps {
  id: number
  rating: string
  status: string
  author: {
    id: number
    name: string
    avatar: string
    avatar_rating: string
  }
  sample_url: string
  sample_width: number
  sample_height: number
  preview_url: string
  preview_width: number
  preview_height: number
  file_url: string
  width: number
  height: number
  file_size: number
  file_type: string
  created_at: {
    json_class: string
    s: number
    n: number
  }
  has_children: boolean
  has_comments: boolean
  has_notes: boolean
  is_favorited: boolean
  user_vote: null
  md5: string
  parent_id: null
  change: number
  fav_count: number
  recommended_posts: number
  recommended_score: number
  vote_count: number
  total_score: number
  comment_count: null
  source: string
  in_visible_pool: boolean
  is_premium: boolean
  is_rating_locked: boolean
  is_note_locked: boolean
  is_status_locked: boolean
  redirect_to_signup: boolean
  sequence: null
  tags: tagProps[]
}

interface GetImageResponse {
  data: imageProps[]
  meta: {
    next: string
    prev: string
  }
}
export interface SearchIllustConfigProps {
  order_by?:
    | 'popularity'
    | 'date'
    | 'quality'
    | 'random'
    | 'recently_favorited'
    | 'recently_voted'
  limit?: number
  tags?: string[]
  rating?: {
    g?: boolean
    r15?: boolean
    r18?: boolean
  }
  next?: string
}

export function useFetchIllust(config: SearchIllustConfigProps) {
  return useInfiniteQuery(
    [GET_ILLUST],
    async ({ pageParam = '' }) => {
      const orderBy = config.order_by || 'date'
      const limit = config.limit || 40
      const tags = config.tags || []
      const next = config.next || pageParam
      // const rating = config.rating || { g: true, r15: true, r18: true }
      const r18 = config?.rating?.r18 === undefined ? true : config.rating.r18
      const g = config?.rating?.g === undefined ? true : config.rating.g
      const r15 = config?.rating?.r15 === undefined ? true : config.rating.r15

      if (orderBy !== 'date') tags.push(`order:${orderBy}`)
      if (g) tags.push(`rating:q`)
      if (r15) tags.push(`rating:s`)
      if (r18) tags.push(`rating:e`)

      const tagsQs = tags.join(' ')

      const response = await axios.get<null, AxiosResponse<GetImageResponse>>(
        SEARCH_ILLUST,
        {
          headers: {
            dnd: 1,
            origin: 'https://beta.sankakucomplex.com',
            referer: 'https://beta.sankakucomplex.com/',
            accept: 'application/vnd.sankaku.api+json;v=2'
          },
          params: {
            lang: 'en',
            limit: limit,
            next: next,
            prev: '',
            hide_posts_in_books: 'in-larger-tags',
            default_threshold: 1,
            tags: tagsQs
          }
        }
      )

      return response.data
    },
    {
      cacheTime: 15000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.meta.next ?? ''
    }
  )
}
