import { EventEmitter } from "events"

import * as React from "react"
import { getSession } from "next-auth/client"

import { EventHandler } from "@/lib/ws/event-handler"
import { Websocket } from "@/lib/ws/websocket"
import { fire } from "@/constants"

const useWebsocket = (emitter: EventEmitter) => {
  const [handler, setHandler] = React.useState<EventHandler>()
  React.useEffect(() => {
    let ws: Websocket
    const initHandler = async () => {
      const session = await getSession()
      const handler = new EventHandler(session, emitter)
      ws = new Websocket(
        typeof window == "undefined"
          ? fire.websiteSocketUrl
          : `${fire.websiteSocketUrl}?sessionId=${window.sessionStorage.getItem("aether_session") || ""}&seq=${
              window.sessionStorage.getItem("aether_seq") || "0"
            }`,
        handler,
      )
      handler.setWebsocket(ws)
      if (typeof window != "undefined" && window.sessionStorage.getItem("aether_session")?.length == 32)
        handler.session = window.sessionStorage.getItem("aether_session") as string
      setHandler(handler)
    }
    initHandler()

    return () => ws?.close()
  }, [emitter])

  return handler
}

export default useWebsocket
