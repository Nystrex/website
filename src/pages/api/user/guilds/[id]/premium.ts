import { StatusCodes } from "http-status-codes"

import { createErrorResponse } from "@/utils/fetcher"
import { toggleGuildPremium } from "@/lib/aether"
import { AuthenticatedApiHandler, PutTogglePremiumGuildResponse } from "@/types"
import { error, withSession } from "@/utils/api-handler-utils"

const handler: AuthenticatedApiHandler<PutTogglePremiumGuildResponse> = async (session, req, res) => {
  if (req.method != "PUT" && req.method != "DELETE") {
    error(res, StatusCodes.METHOD_NOT_ALLOWED)
    return
  }

  const guildId = req.query.id

  if (typeof guildId !== "string") {
    error(res, StatusCodes.BAD_REQUEST)
    return
  }

  try {
    const premiumGuilds = await toggleGuildPremium(session.accessToken, guildId, req.method)

    res.json(premiumGuilds)
  } catch (e) {
    const errorResponse = createErrorResponse(e)
    error(res, errorResponse.code, errorResponse.error)
  }
}

export default withSession(handler)
