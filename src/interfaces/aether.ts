import { AuthUser } from "./auth"

import { APIUser, DiscordGuild } from "@/interfaces/discord"

export type ShardStats = {
  id: number
  wsPing: number
  guilds: number
  unavailableGuilds: number
  status: number
}

export type ClusterStats = {
  id: number
  name: string
  env: string
  user: string
  userId: string
  uptime: string
  started: string
  cpu: number
  ram: string
  ramBytes: number
  totalRam: string
  totalRamBytes: number
  pid: number
  version: string
  versions: string
  guilds: number
  unavailableGuilds: number
  users: number
  commands: number
  restPing: number
  shards: ShardStats[]
  error?: string
  reason?: string
  code?: number
}

export type FireStats = {
  cpu: number
  ramBytes: number
  totalRamBytes: number
  aetherStats?: {
    ramBytes: number
    restLatency: number
  }
  clusterCount: number
  shardCount: number
  guilds: number
  users: number
  clusters: ClusterStats[]
}

export type Command = {
  name: string
  description: string
  usage: string
  aliases: string
  category?: string
}

export type CategoryFlag = {
  name: string
  description: string
  usage: string
}

export type Category = {
  id: number
  name: string
  commands: Command[]
  flags?: CategoryFlag[]
  Note?: string
}

export type DiscoverableGuild = {
  name: string
  id: string
  icon: string
  splash: string
  vanity: string
  members: number
  key?: number
}

export type UserGuild = DiscordGuild & {
  premium: boolean
}

export type Payload = {
  op: number // opcode
  d?: unknown // data
  s?: number // sequence
  t?: string // type as UPPER_SNAKE_CASE
  n?: string // nonce
}

export enum EventType {
  IDENTIFY_CLIENT,
  RESUME_CLIENT,
  HELLO,
  HEARTBEAT,
  HEARTBEAT_ACK,
  SUBSCRIBE,
  GUILD_CREATE,
  GUILD_DELETE,
  GUILD_SYNC,
  REALTIME_STATS,
  COMMANDS_UPDATE,
  DISCOVERY_UPDATE,
  NOTIFICATION,
  REMINDERS_UPDATE,
  CONFIG_UPDATE,
  GUILD_JOIN_REQUEST,
  DATA_REQUEST,
  PUSH_ROUTE,
}

export type Notification = {
  text: string
  severity: "success" | "info" | "warning" | "error"
  horizontal: "left" | "right" | "center"
  vertical: "top" | "bottom"
  autoHideDuration: number
}

export type Reminder = {
  user: string
  text: string
  link: string
  legacy: boolean
  timestamp: number
}

export type IdentifyResponse = {
  guilds?: { id: string; unavailable: true }[]
  config?: Record<string, unknown>
  user?: APIUser
  session: string
}

export type ResumeResponse = {
  guilds: DiscordGuild[]
  user: AuthUser
  replayed: number
  session: string
  config: Record<string, unknown>
}
