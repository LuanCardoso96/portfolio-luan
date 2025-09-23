// Stub para NewsFeeds entity
export class NewsFeeds {
  static async list() {
    return [
      {
        id: '1',
        feed_name: 'Marvel News',
        feed_url: 'https://example.com/marvel-rss',
        category: 'marvel_dc',
        active: true
      },
      {
        id: '2',
        feed_name: 'Celebrity News',
        feed_url: 'https://example.com/celebrity-rss',
        category: 'fofocas',
        active: true
      }
    ]
  }
}
