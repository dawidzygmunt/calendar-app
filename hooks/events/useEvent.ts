import { useQuery } from '@tanstack/react-query'
import eventClient from '@/services/eventsService'

const useEvent = (id: string) =>
  useQuery({
    queryKey: ['events', id],
    queryFn: async () => {
      return await eventClient.getOne(id)
    },
  })
export default useEvent
