import { useEffect, useRef } from 'react'

// Mock socket for demo - replace with actual socket.io-client connection
export function useSocket(onMessage) {
  const ref = useRef(null)

  useEffect(() => {
    // TODO: connect to real socket server
    // ref.current = io(import.meta.env.VITE_SOCKET_URL)
    // ref.current.on('message', onMessage)
    return () => {
      if (ref.current) ref.current.disconnect()
    }
  }, [])

  function sendMessage(data) {
    // ref.current?.emit('message', data)
  }

  return { sendMessage }
}