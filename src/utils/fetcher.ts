import { getReasonPhrase, StatusCodes } from "http-status-codes"

import { AnyObject } from "@/types"
import { ApiErrorResponse } from "@/lib/api/response"

export class NetworkError extends Error {
  data?: AnyObject
  code: number

  constructor(code: number, data?: AnyObject, message = "An error occurred while fetching the data.") {
    super(message)
    this.code = code
    this.data = data
  }
}

export const createErrorResponse = (error: Error): ApiErrorResponse => {
  // eslint-disable-next-line no-prototype-builtins
  if (error instanceof NetworkError && typeof error.data == "object" && error.data?.hasOwnProperty("message")) {
    // convert discord errors into the same format used by aether/inv.wtf
    // 'tis hacky but it works, better than 500s and exceptions
    const data = error.data as any as ApiErrorResponse
    data.message = (error.data as { message: string; code: number })?.message
    data.statusCode = error.code
  }
  if (error instanceof NetworkError && typeof error.data == "object") {
    return error.data as any as ApiErrorResponse
  } else {
    const code = StatusCodes.INTERNAL_SERVER_ERROR
    return {
      success: false,
      statusCode: code,
      message: getReasonPhrase(code),
    }
  }
}

const fetcher = async <R = unknown>(url: string, options?: RequestInit): Promise<R> => {
  const response = await fetch(url, options)

  if (!response.ok) {
    const data = response.headers?.get("Content-Type")?.startsWith("application/json")
      ? await response.json()
      : await response.text()
    throw new NetworkError(response.status, data, data.error)
  }

  return response.json()
}

export default fetcher
