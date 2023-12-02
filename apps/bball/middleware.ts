import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // TODO: do auth logic here maybe to remove ProfileLink lag

  return NextResponse.next()
}