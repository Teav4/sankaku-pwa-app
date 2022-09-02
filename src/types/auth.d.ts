export interface CurrentUser {
  email: string
  hide_ads: boolean
  subscription_level: number
  filter_content: boolean
  has_mail: boolean
  receive_dmails: boolean
  email_verification_status: string
  is_verified: boolean
  verifications_count: number
  blacklist_is_hidden: boolean
  blacklisted_tags: string[][]
  blacklisted: string[]
  mfa_method: number
  last_logged_in_at: Date
  favorite_count: number
  post_favorite_count: number
  pool_favorite_count: number
  vote_count: number
  post_vote_count: number
  pool_vote_count: number
  recommended_posts_for_user: number
  subscriptions: any[]
  id: number
  name: string
  level: number
  upload_limit: number
  created_at: Date
  favs_are_private: boolean
  avatar_url: string
  avatar_rating: string
  post_upload_count: number
  pool_upload_count: number
  comment_count: number
  post_update_count: number
  note_update_count: number
  wiki_update_count: number
  forum_post_count: number
  pool_update_count: number
  series_update_count: number
  tag_update_count: number
  artist_update_count: number
}

declare interface LoginResponse {
  success: boolean
  token_type: string
  access_token: string
  refresh_token: string
  current_user: CurrentUser
  has_mail: boolean
  filter_content: boolean
  password_hash: string
}
