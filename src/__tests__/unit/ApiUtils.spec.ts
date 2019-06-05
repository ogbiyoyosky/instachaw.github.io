import { callApi } from '@Utilities'

const fetch = (window.fetch as any);

const storeData = { id: 2, title: 'Genesis, Choba' }

describe('Api Utils', () => {
  afterEach(() => {
    fetch.resetMocks()
  })
  
  test('Call api can be invoked', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: storeData
      })
    )

    await callApi({
      endpoint: 'v1/stores/2',
      method: 'GET'
    })
    .then((response:any) => response.json())
    .then((res:any) => {
      expect(res.id).toEqual(storeData.id)
      expect(res.name).toEqual(storeData.title)
    })
  })
})
