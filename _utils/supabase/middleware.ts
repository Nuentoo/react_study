import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  // console.log(supabaseResponse)

  // supabaseResponse.headers.set('Cache-Control', 'no-store');

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_CHAT_URL,
    process.env.NEXT_PUBLIC_SUPABASE_CHAT_ANON_KEY,
    {
      cookies: {
        getAll() {
          // console.log(request.cookies.getAll()) // なんか、取得数多いのは気のせい、、？
          return request.cookies.getAll(); // 利用可能なすべての cookie を返す（next.js）
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(
            ({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options), // 送信リクエストに cookie を設定（next.js）
          );
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // return NextResponse.redirect(url) // TODO: ログイン画面へ遷移コメントアウト状態
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
