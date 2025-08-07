import { useLoadingStore } from '@/stores/loadingStore'
import axios from 'axios'
import { useEffect, useState } from 'react'

function useDataDownload(url: string) {
  const { setLoading } = useLoadingStore()
  const [data, setData] = useState<unknown>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(url)
        setData(response.data)
      } catch (err) {
        console.log('Error fetching data:', err)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [setLoading, url])

  return { data }
}

export default useDataDownload
