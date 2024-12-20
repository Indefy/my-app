import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:9200' });

export async function searchNotes(query: string, from: number = 0, size: number = 10) {
  const { body } = await client.search({
    index: 'notes',
    body: {
      from,
      size,
      query: {
        multi_match: {
          query,
          fields: ['title', 'content', 'tags'],
        },
      },
    },
  });

  return body.hits.hits.map((hit: any) => ({
    id: hit._id,
    ...hit._source,
  }));
}

