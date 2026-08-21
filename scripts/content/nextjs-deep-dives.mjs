/*
 * Step-by-step walkthroughs for the Next.js interview questions.
 *
 * Same shape and intent as the other deep-dive files: the short `answer` is
 * what you say out loud, and this walks the mechanism one step at a time.
 *
 * Keyed by the EXACT question text in `generalInterviewQuestions`. Unmatched
 * keys are reported at import time (see the bottom of nextjs.mjs).
 *
 * IMPORTANT — this file is written against Next.js 16, verified against the
 * docs bundled in node_modules/next/dist/docs. Several things changed from
 * the widely-taught Next 13/14 material, and the answers say so explicitly
 * because an interviewer may still be asking the older question:
 *
 *   - Middleware is now called PROXY (proxy.ts at the project root).
 *   - Caching is Cache Components: `use cache`, cacheLife, cacheTag. The old
 *     four-layer vocabulary (Request Memoization, Data Cache, Full Route
 *     Cache, Router Cache) appears nowhere in the Next 16 docs.
 *   - Partial Prerendering is the DEFAULT behaviour with Cache Components,
 *     not an experimental flag.
 *   - fetch is NOT cached by default.
 *   - updateTag is new: immediate expiry for read-your-own-writes, Server
 *     Actions only. revalidateTag is stale-while-revalidate.
 *   - params, searchParams, cookies() and headers() are async.
 */

export const deepDives = {
  /* ─── The App Router and the server/client split ──────────── */

  'What is the Next.js App Router and how does it differ from the Pages Router?': [
    {
      heading: { en: 'A directory, and a different default', hi: 'Ek directory, aur ek alag default' },
      body: {
        en: 'The App Router lives in app/ and builds routes from nested folders with special files — page, layout, loading, error. The Pages Router lives in pages/ and maps one file to one route. The deeper difference is that in app/ every component is a Server Component unless you opt out.',
        hi: 'App Router app/ mein rehta hai aur nested folders aur khaas files se routes banata hai — page, layout, loading, error. Pages Router pages/ mein rehta hai aur ek file ko ek route se jodta hai. Gehra farq ye hai ki app/ mein har component Server Component hai jab tak tum khud bahar na niklo.',
      },
      diagram: `app/
  layout.jsx          shared shell, persists across navigation
  page.jsx            /
  blog/
    layout.jsx        nested, wraps everything below
    page.jsx          /blog
    [slug]/page.jsx   /blog/:slug
    loading.jsx       Suspense fallback for this segment
    error.jsx         error boundary for this segment`,
    },
    {
      heading: { en: 'Data fetching moved into the component', hi: 'Data fetching component ke andar aa gayi' },
      body: {
        en: 'The Pages Router had getServerSideProps and getStaticProps at the page level, so only a page could fetch. In the App Router any Server Component can be async and await directly, so data is fetched where it is used rather than threaded down as props.',
        hi: 'Pages Router mein page ke star pe getServerSideProps aur getStaticProps the, toh sirf page fetch kar sakta tha. App Router mein koi bhi Server Component async ho sakta hai aur seedha await kar sakta hai, toh data wahin aata hai jahan use hota hai, props mein piroya nahi jaata.',
      },
      code: `// pages/blog.jsx
export async function getServerSideProps() { return { props: { posts } }; }

// app/blog/page.jsx
export default async function Page() {
  const posts = await db.posts.findMany();   // ✓ in the component
  return <List posts={posts} />;
}`,
    },
    {
      heading: { en: 'Layouts persist; _app re-rendered', hi: 'Layouts tikte hain; _app dobara render hota tha' },
      body: {
        en: 'A layout does not re-render when you navigate between routes beneath it, so its state and scroll position survive. In the Pages Router, _app re-rendered on every navigation, which is why keeping sidebar state was awkward.',
        hi: 'Uske neeche ke routes ke beech ghoomte waqt layout dobara render nahi hota, toh uski state aur scroll bacha rehta hai. Pages Router mein _app har navigation pe dobara render hota tha, isliye sidebar ki state rakhna bhadda tha.',
      },
    },
    {
      heading: { en: 'The special files replace the old conventions', hi: 'Khaas files purane riwaajon ki jagah leti hain' },
      body: {
        en: 'loading.jsx wraps the segment in Suspense automatically. error.jsx is an error boundary for that segment. not-found, route, template and default cover the rest. In the Pages Router most of this was custom code in _app or _document.',
        hi: 'loading.jsx us segment ko apne aap Suspense mein lapet deta hai. error.jsx us segment ki error boundary hai. not-found, route, template aur default baaki sambhaalte hain. Pages Router mein iska zyadatar hissa _app ya _document mein khud likha jaata tha.',
      },
    },
    {
      heading: { en: 'They can coexist during a migration', hi: 'Migration ke dauraan dono saath chal sakte hain' },
      body: {
        en: 'Both directories can exist in one project, and app/ takes precedence for a conflicting path. That is what makes an incremental migration possible — move one route at a time rather than rewriting the application.',
        hi: 'Ek hi project mein dono directories reh sakti hain, aur takraate path pe app/ ki jeet hoti hai. Isi se dhire-dhire migration mumkin hai — poora application dobara likhne ki jagah ek-ek route badlo.',
      },
    },
    {
      heading: { en: 'The App Router is where the new work happens', hi: 'Naya kaam App Router mein hi ho raha hai' },
      body: {
        en: 'Server Components, Server Actions, streaming, Partial Prerendering and Cache Components are all App Router only. The Pages Router is supported but receives no new features, so a new project should start in app/.',
        hi: 'Server Components, Server Actions, streaming, Partial Prerendering aur Cache Components — sab sirf App Router mein hain. Pages Router chalta hai par usme naye features nahi aate, toh naya project app/ se shuru hona chahiye.',
      },
    },
  ],

  'What are React Server Components and what problem do they solve?': [
    {
      heading: { en: 'Components that render only on the server', hi: 'Aise components jo sirf server pe render hote hain' },
      body: {
        en: 'A Server Component runs during the request or the build and never reaches the browser. Neither the component nor anything it imports is sent to the client — what ships is the rendered output, not the code.',
        hi: 'Server Component request ya build ke waqt chalta hai aur browser tak kabhi nahi pahunchta. Na wo component na uske imports client tak jaate hain — jo jaata hai wo render kiya hua output hai, code nahi.',
      },
    },
    {
      heading: { en: 'The problem: the bundle grew with the app', hi: 'Problem: bundle app ke saath badhta gaya' },
      body: {
        en: 'In a traditional React app every component, every date library and every markdown parser is downloaded and parsed by the browser, even if it only produces static text. Server Components remove that code from the bundle entirely.',
        hi: 'Aam React app mein har component, har date library aur har markdown parser browser download aur parse karta hai, chahe wo sirf sthir text hi banaye. Server Components us code ko bundle se poori tarah hata dete hain.',
      },
      code: `import { format } from 'date-fns';        // in a Client Component: shipped
                                          // in a Server Component: not shipped

export default async function Post({ id }) {
  const post = await db.posts.find(id);   // ✓ direct DB access, no API layer
  return <time>{format(post.at, 'PPP')}</time>;
}`,
    },
    {
      heading: { en: 'And the client-server waterfall', hi: 'Aur client-server ka waterfall' },
      body: {
        en: 'The second problem. In a client-rendered app the browser loads JavaScript, renders, discovers it needs data, requests it, then renders again — and a nested component starts its request only after its parent finished. On the server the data is already next to the component.',
        hi: 'Doosri problem. Client-rendered app mein browser JavaScript load karta hai, render karta hai, pata chalta hai data chahiye, request karta hai, phir dobara render karta hai — aur nested component apni request tab shuru karta hai jab parent khatam ho. Server pe data component ke bagal mein hi hota hai.',
      },
    },
    {
      heading: { en: 'What they cannot do', hi: 'Ye kya nahi kar sakte' },
      body: {
        en: 'No useState, useEffect, useContext or refs. No event handlers. No browser APIs. Nothing interactive — because there is no JavaScript on the client to run it. That is the trade, and it is what the boundary is for.',
        hi: 'Na useState, na useEffect, na useContext, na refs. Na event handlers. Na browser APIs. Kuch bhi interactive nahi — kyunki client pe usse chalane ke liye JavaScript hai hi nahi. Yahi sauda hai, aur boundary isi ke liye hai.',
      },
    },
    {
      heading: { en: 'They compose with Client Components', hi: 'Ye Client Components ke saath judte hain' },
      body: {
        en: 'A Client Component cannot import a Server Component, but it can receive one as children. That is the pattern that keeps an interactive shell thin while its contents stay on the server.',
        hi: 'Client Component kisi Server Component ko import nahi kar sakta, par usse children ki tarah le sakta hai. Yahi pattern interactive shell ko patla rakhta hai aur uska content server pe.',
      },
      code: `<ClientTabs>
  <ServerChart />      {/* ✓ stays on the server */}
</ClientTabs>`,
    },
    {
      heading: { en: 'RSC is not SSR', hi: 'RSC, SSR nahi hai' },
      body: {
        en: 'The distinction interviewers probe. SSR renders the whole app to HTML and then hydrates all of it in the browser. RSC decides per component whether any JavaScript ships at all. They compose, but they solve different problems.',
        hi: 'Interviewers yahi farq kuredte hain. SSR poore app ko HTML mein render karta hai aur phir sab kuch browser mein hydrate karta hai. RSC har component ke liye tay karta hai ki JavaScript bhejni bhi hai ya nahi. Ye saath chalte hain, par alag problems hal karte hain.',
      },
    },
  ],

  'Explain the four caching layers in Next.js (Request Memoization, Data Cache, Full Route Cache, Router Cache).': [
    {
      heading: { en: 'First: this vocabulary is from Next 13 and 14', hi: 'Pehle: ye shabdaawali Next 13 aur 14 ki hai' },
      body: {
        en: 'Answer the question, but say this. Those four names do not appear anywhere in the Next.js 16 documentation. The model was replaced by Cache Components with an explicit `use cache` directive. Knowing both is what a current answer looks like.',
        hi: 'Sawaal ka jawab do, par ye kaho. Ye chaar naam Next.js 16 ki documentation mein kahin nahi hain. Us model ki jagah Cache Components aur saaf-saaf `use cache` directive aa gaya. Dono jaanna hi aaj ka jawab hai.',
      },
    },
    {
      heading: { en: 'Request Memoization — within one render pass', hi: 'Request Memoization — ek render pass ke andar' },
      body: {
        en: 'Identical fetch calls during a single render return the same result, so three components asking for the same user cause one request. This is React deduplication, not a Next.js cache, and it lives only for that render.',
        hi: 'Ek hi render ke dauraan ek jaise fetch calls wahi nateeja dete hain, toh ek hi user maangne wale teen components ek hi request karte hain. Ye React ki deduplication hai, Next.js ka cache nahi, aur ye sirf us render tak rehta hai.',
      },
      code: `// still true in Next 16 — use React's cache() for non-fetch functions
import { cache } from 'react';
export const getUser = cache(async (id) => db.users.find(id));`,
    },
    {
      heading: { en: 'Data Cache — persistent, across requests', hi: 'Data Cache — sthaayi, requests ke paar' },
      body: {
        en: 'A server-side store of fetch results that survives requests and deploys. The important change: fetch is NO LONGER cached by default. In Next 16 you opt in explicitly, either with cache: force-cache or by wrapping the work in `use cache`.',
        hi: 'Fetch ke nateejon ka server-side store jo requests aur deploys ke paar bachta hai. Zaroori badlaav: fetch ab default se cache NAHI hota. Next 16 mein tum khud chunte ho, ya cache: force-cache se ya kaam ko `use cache` mein lapet kar.',
      },
      code: `await fetch(url);                          // NOT cached
await fetch(url, { cache: 'force-cache' }); // cached`,
    },
    {
      heading: { en: 'Full Route Cache — the rendered HTML', hi: 'Full Route Cache — render kiya hua HTML' },
      body: {
        en: 'The prerendered HTML and RSC payload for a static route, produced at build time and reused. In Next 16 this is expressed through Partial Prerendering: the static shell is prerendered and the uncached parts stream in.',
        hi: 'Kisi static route ka pehle se bana HTML aur RSC payload, build ke waqt banaya aur dobara use kiya jaata hai. Next 16 mein ye Partial Prerendering se hota hai: sthir dhaancha pehle se ban jaata hai aur bina cache wale hisse stream ho kar aate hain.',
      },
    },
    {
      heading: { en: 'Router Cache — in the browser', hi: 'Router Cache — browser mein' },
      body: {
        en: 'The client keeps the RSC payload of visited and prefetched routes in memory, so going back is instant with no server round trip. It is per session and cleared on a full reload.',
        hi: 'Client dekhi hui aur pehle se laayi gayi routes ka RSC payload memory mein rakhta hai, toh wapas jaana turant hota hai, bina server ke chakkar ke. Ye har session ka apna hai aur poore reload pe saaf ho jaata hai.',
      },
    },
    {
      heading: { en: 'What Next 16 replaced it with', hi: 'Next 16 ne uski jagah kya diya' },
      body: {
        en: 'Cache Components. You enable cacheComponents in the config and mark what should be cached with `use cache`, controlling lifetime with cacheLife and invalidation with cacheTag. Nothing is cached implicitly, which was the main complaint about the old model.',
        hi: 'Cache Components. Config mein cacheComponents chaalu karo aur jo cache karna hai use `use cache` se batao, umar cacheLife se aur invalidation cacheTag se. Kuch bhi chup-chaap cache nahi hota, aur purane model ki mukhya shikayat yahi thi.',
      },
      code: `// next.config.ts →  { cacheComponents: true }

export async function getProducts() {
  'use cache';
  cacheLife('hours');
  cacheTag('products');
  return db.products.findMany();
}`,
    },
    {
      heading: { en: 'How to answer it out loud', hi: 'Bol kar kaise jawab dena' },
      body: {
        en: '"Those are the Next 13 and 14 layers — request-scoped memoization, a persistent data cache, the prerendered route cache and the client router cache. In Next 16 that vocabulary is gone: caching is opt-in through `use cache` with cacheLife and cacheTag, and fetch is no longer cached by default."',
        hi: '"Wo Next 13 aur 14 ki layers hain — ek request tak ki memoization, sthaayi data cache, pehle se bana route cache aur client ka router cache. Next 16 mein wo shabdaawali chali gayi: caching ab `use cache` se chunni padti hai, cacheLife aur cacheTag ke saath, aur fetch default se cache nahi hota."',
      },
    },
  ],

  'How do you protect a route in Next.js App Router (e.g. an admin dashboard)?': [
    {
      heading: { en: 'Check in the Data Access Layer, not only at the edge', hi: 'Sirf kinaare pe nahi, Data Access Layer mein jaancho' },
      body: {
        en: 'This is the answer the Next.js docs push hardest. Put the authorisation check next to the data — in the function that reads it — so every caller is protected regardless of which route reached it.',
        hi: 'Next.js ke docs isi jawab pe sabse zyada zor dete hain. Authorisation ki jaanch data ke bagal mein rakho — us function mein jo usse padhta hai — taaki har caller surakshit rahe, chahe kisi bhi route se aaya ho.',
      },
      code: `// lib/dal.js
import 'server-only';

export async function requireAdmin() {
  const session = await getSession();
  if (!session) unauthorized();          // renders unauthorized.jsx
  if (session.role !== 'admin') forbidden();
  return session;
}`,
    },
    {
      heading: { en: 'Proxy is an optimistic check, not the gate', hi: 'Proxy ek anumaan wali jaanch hai, gate nahi' },
      body: {
        en: 'Middleware is called Proxy in Next 16, and the docs are explicit that it should not be your session management or authorisation solution. Use it to redirect an obviously logged-out visitor early; do not rely on it for the real decision.',
        hi: 'Next 16 mein Middleware ko Proxy kehte hain, aur docs saaf kehte hain ki wo tumhara session management ya authorisation ka hal nahi hona chahiye. Usse saaf-saaf logged-out visitor ko jaldi redirect karne ke liye lo; asli faisla uspe mat chhodo.',
      },
      code: `// proxy.ts — at the project root
export function proxy(request) {
  if (!request.cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
export const config = { matcher: '/admin/:path*' };`,
    },
    {
      heading: { en: 'Why the layout is not a security boundary', hi: 'Layout suraksha ki seema kyun nahi hai' },
      body: {
        en: 'A common mistake. A layout does not re-render on every navigation between its children, so a check placed there can be skipped on a client-side navigation. Check in the page or, better, in the data function.',
        hi: 'Ek aam galti. Layout apne children ke beech har navigation pe dobara render nahi hota, toh wahan rakhi jaanch client-side navigation pe chhoot sakti hai. Page mein jaancho, ya usse behtar, data wale function mein.',
      },
    },
    {
      heading: { en: 'Server Actions need their own check', hi: 'Server Actions ko apni jaanch chahiye' },
      body: {
        en: 'Critical, and often missed. A Server Action is reachable by a direct POST whether or not the UI that calls it is rendered. Protecting the page does nothing for the action — every action must verify auth itself.',
        hi: 'Ye zaroori hai aur aksar chhoot jaata hai. Server Action seedhi POST se pahuncha ja sakta hai, chahe usse bulane wala UI render hua ho ya nahi. Page bachaane se action pe kuch nahi hota — har action ko khud auth jaanchna hoga.',
      },
      code: `'use server';
export async function deleteUser(id) {
  await requireAdmin();      // ✓ every time
  await db.users.delete(id);
}`,
    },
    {
      heading: { en: 'unauthorized and forbidden render a file', hi: 'unauthorized aur forbidden ek file render karte hain' },
      body: {
        en: 'Next 16 has unauthorized() and forbidden() alongside notFound(). Calling one renders the matching special file and sends the right status, which is cleaner than a manual redirect and keeps the URL intact.',
        hi: 'Next 16 mein notFound() ke saath unauthorized() aur forbidden() bhi hain. Inhe bulane se milti hui khaas file render hoti hai aur sahi status jaata hai, jo haath se kiye redirect se saaf hai aur URL bhi wahi rehta hai.',
      },
    },
    {
      heading: { en: 'And use server-only to stop leaks', hi: 'Aur leaks rokne ke liye server-only lo' },
      body: {
        en: 'Importing the server-only package at the top of a data module makes the build fail if a Client Component ever imports it. That turns an accidental leak of a database call into the client bundle from a security incident into a build error.',
        hi: 'Kisi data module ke upar server-only package import karo toh koi Client Component usse import kare tab build fail ho jaata hai. Isse client bundle mein galti se gaya database call security ki ghatna nahi, ek build error ban jaata hai.',
      },
    },
  ],

  'What is the difference between Server Actions and Route Handlers?': [
    {
      heading: { en: 'A function you call versus an endpoint you fetch', hi: 'Ek function jise bulate ho vs ek endpoint jise fetch karte ho' },
      body: {
        en: 'A Server Action is an async function marked "use server" that you call directly from a component — Next.js creates the endpoint for you. A Route Handler is a file that exports GET or POST and gives you a real URL.',
        hi: 'Server Action ek async function hai jispe "use server" likha hota hai aur jise tum seedha component se bulate ho — endpoint Next.js banata hai. Route Handler ek file hai jo GET ya POST export karti hai aur tumhe ek asli URL deti hai.',
      },
      code: `// Server Action
'use server';
export async function createPost(formData) { … }
<form action={createPost}>

// Route Handler — app/api/posts/route.js
export async function POST(request) { … }`,
    },
    {
      heading: { en: 'Actions are for your own UI', hi: 'Actions tumhare apne UI ke liye hain' },
      body: {
        en: 'They are the mutation path for your own forms and buttons. You get progressive enhancement — a form works before JavaScript loads — plus type safety across the boundary and no fetch call to write.',
        hi: 'Ye tumhare apne forms aur buttons ke liye mutation ka raasta hain. Progressive enhancement milta hai — JavaScript load hone se pehle bhi form chalta hai — saath mein boundary ke paar type safety aur koi fetch likhne ki zaroorat nahi.',
      },
    },
    {
      heading: { en: 'Route Handlers are for everything else', hi: 'Route Handlers baaki sab ke liye hain' },
      body: {
        en: 'A public API for a mobile client or a third party. A webhook receiver. Anything needing a specific HTTP method, custom headers, a streamed response, or a URL someone else will call. An Action gives you none of that.',
        hi: 'Mobile client ya kisi third party ke liye public API. Webhook lene wala endpoint. Har wo cheez jise khaas HTTP method, custom headers, streamed response, ya aisa URL chahiye jise koi aur bulaye. Action ye kuch nahi deta.',
      },
    },
    {
      heading: { en: 'Both run on the server and both need auth', hi: 'Dono server pe chalte hain aur dono ko auth chahiye' },
      body: {
        en: 'The point people miss about Actions. Next.js creates an encrypted action id and removes unused actions from the bundle, but the docs are explicit: treat every action as reachable by a direct POST and verify auth inside it.',
        hi: 'Actions ke baare mein log yahi chookte hain. Next.js ek encrypted action id banata hai aur bekaar actions bundle se hata deta hai, par docs saaf kehte hain: har action ko seedhi POST se pahunchne laayak maano aur uske andar auth jaancho.',
      },
    },
    {
      heading: { en: 'Actions run in sequence, which matters', hi: 'Actions kram se chalte hain, aur ye maayne rakhta hai' },
      body: {
        en: 'Server Actions are invoked one at a time rather than in parallel, because they are treated as mutations that may depend on each other. For a read-heavy endpoint that is the wrong shape — use a Route Handler.',
        hi: 'Server Actions ek-ek karke chalte hain, parallel nahi, kyunki unhe aise mutations maana jaata hai jo ek doosre pe nirbhar ho sakte hain. Zyada read wale endpoint ke liye ye galat shakl hai — Route Handler lo.',
      },
    },
    {
      heading: { en: 'And with Cache Components, GET handlers prerender', hi: 'Aur Cache Components ke saath GET handlers prerender hote hain' },
      body: {
        en: 'A Next 16 detail worth knowing. With cacheComponents on, a GET Route Handler follows the same model as a page — it can be prerendered at build time if it does not touch uncached or request-time data.',
        hi: 'Next 16 ki ek jaanne laayak baat. cacheComponents chaalu ho toh GET Route Handler page jaisa hi chalta hai — agar wo bina cache wale ya request-time data ko na chhue toh build ke waqt prerender ho sakta hai.',
      },
    },
    {
      heading: { en: 'The rule', hi: 'Rule' },
      body: {
        en: '"Server Actions for mutations from my own UI — forms and buttons — because of progressive enhancement and no API layer to maintain. Route Handlers when something outside my app needs a URL, or when I need control of the HTTP response."',
        hi: '"Apne UI se hone wale mutations ke liye Server Actions — forms aur buttons — kyunki progressive enhancement milta hai aur koi API layer sambhalni nahi padti. Route Handlers tab jab app ke bahar kisi ko URL chahiye, ya jab HTTP response ka control chahiye."',
      },
    },
  ],

  'What is streaming SSR and how does Suspense enable it in Next.js?': [
    {
      heading: { en: 'Send HTML in pieces as it becomes ready', hi: 'HTML tukdon mein bhejo, jaise-jaise taiyaar ho' },
      body: {
        en: 'Traditional SSR waits for every data fetch, renders the whole page, then sends it — so the slowest query sets the time to first byte. Streaming sends the shell immediately and pushes the rest down the same connection as it resolves.',
        hi: 'Aam SSR har data fetch ka intezaar karta hai, poora page render karta hai, phir bhejta hai — toh sabse dheemi query hi pehle byte ka samay tay karti hai. Streaming dhaancha turant bhejta hai aur baaki usi connection pe taiyaar hote hi bhejta rehta hai.',
      },
      diagram: `blocking SSR   [wait for everything] ──────────► full HTML
streaming      shell ──► slow section ──► another   as each resolves`,
    },
    {
      heading: { en: 'Suspense marks where the page can split', hi: 'Suspense batata hai page kahan tut sakta hai' },
      body: {
        en: 'A Suspense boundary tells React "this part may not be ready — send the fallback now and the real content later". Without a boundary there is nowhere to split, so the response waits for everything.',
        hi: 'Suspense boundary React se kehti hai "ye hissa shaayad taiyaar na ho — abhi fallback bhejo aur asli content baad mein". Boundary na ho toh tootne ki koi jagah nahi, toh response sab kuch ka intezaar karta hai.',
      },
      code: `export default function Page() {
  return (
    <>
      <Header />                          {/* in the first chunk */}
      <Suspense fallback={<Skeleton />}>
        <SlowComments />                  {/* streamed later */}
      </Suspense>
    </>
  );
}`,
    },
    {
      heading: { en: 'loading.jsx is a Suspense boundary', hi: 'loading.jsx ek Suspense boundary hai' },
      body: {
        en: 'Next.js wraps a segment in Suspense automatically when you add loading.jsx, using it as the fallback. It is the whole-segment version; an explicit Suspense boundary is how you stream one part while the rest is already visible.',
        hi: 'loading.jsx jodo toh Next.js us segment ko apne aap Suspense mein lapet deta hai aur usse fallback banata hai. Ye poore segment wala roop hai; saaf Suspense boundary se tum ek hissa stream karte ho jabki baaki pehle se dikh raha hota hai.',
      },
    },
    {
      heading: { en: 'The user sees content sooner, not faster overall', hi: 'User ko content jaldi dikhta hai, kul samay tez nahi hota' },
      body: {
        en: 'Be precise about this. Streaming does not make the slow query faster. It improves time to first byte and perceived performance by letting the browser start rendering and loading assets while the server is still working.',
        hi: 'Ispe theek raho. Streaming dheemi query ko tez nahi karta. Wo pehle byte ka samay aur mehsoos hone wali performance sudhaarta hai, kyunki browser render aur assets load karna shuru kar deta hai jabki server abhi kaam kar raha hota hai.',
      },
    },
    {
      heading: { en: 'Boundary placement is the design decision', hi: 'Boundary kahan rakhni hai, yahi design ka faisla hai' },
      body: {
        en: 'One boundary around the whole page means everything waits for the slowest part. Several smaller ones let fast sections appear immediately. Put them where a meaningful chunk of UI can stand on its own.',
        hi: 'Poore page pe ek boundary matlab sab kuch sabse dheeme hisse ka intezaar karega. Kai chhoti boundaries tez hisson ko turant dikha deti hain. Unhe wahan rakho jahan UI ka koi matlab wala tukda apne aap khada ho sake.',
      },
    },
    {
      heading: { en: 'In Next 16 this is how PPR works', hi: 'Next 16 mein PPR aise hi chalta hai' },
      body: {
        en: 'With Cache Components enabled, the static shell is prerendered and anything not cached must be inside a Suspense boundary. If it is not, the build fails with an explicit "uncached data was accessed outside of Suspense" error rather than silently making the route dynamic.',
        hi: 'Cache Components chaalu ho toh sthir dhaancha pehle se ban jaata hai aur jo cache nahi hai use Suspense boundary ke andar hona chahiye. Na ho toh build chup-chaap route ko dynamic banane ki jagah saaf "uncached data was accessed outside of Suspense" error deta hai.',
      },
    },
  ],

  'How does Next.js handle image and font optimization, and why does it matter for performance?': [
    {
      heading: { en: 'Both target Core Web Vitals, from opposite ends', hi: 'Dono Core Web Vitals pe hain, do alag taraf se' },
      body: {
        en: 'next/image mostly attacks LCP and CLS — the largest element loading fast and the page not jumping. next/font attacks CLS and render blocking — no layout shift when the font swaps and no round trip to Google.',
        hi: 'next/image zyadatar LCP aur CLS pe kaam karta hai — sabse bada element jaldi aaye aur page uchhle nahi. next/font CLS aur render blocking pe — font badalne pe layout na khiske aur Google tak chakkar na lage.',
      },
    },
    {
      heading: { en: 'What next/image actually does', hi: 'next/image asal mein kya karta hai' },
      body: {
        en: 'Serves a modern format such as WebP or AVIF when the browser supports it, resizes to the requested dimensions, lazy loads below the fold, and reserves the space from width and height so nothing shifts when the image arrives.',
        hi: 'Browser support kare toh WebP ya AVIF jaisa modern format deta hai, maangi gayi size mein badalta hai, fold ke neeche lazy load karta hai, aur width aur height se jagah pehle se rok leta hai taaki image aane pe kuch khiske nahi.',
      },
      code: `import Image from 'next/image';

<Image src="/hero.png" alt="" width={1200} height={600} priority />
// priority = eager load + preload, for the LCP image only`,
    },
    {
      heading: { en: 'The dimensions requirement is the point', hi: 'Dimensions ki shart hi asli baat hai' },
      body: {
        en: 'People find width and height annoying. They are what eliminates layout shift — the browser reserves the box before the bytes arrive. Use fill with a positioned parent when the size is genuinely unknown.',
        hi: 'Logon ko width aur height jhanjhat lagti hai. Wahi layout shift khatam karti hain — bytes aane se pehle browser dabba rok leta hai. Jab size sach mein pata na ho tab positioned parent ke saath fill use karo.',
      },
    },
    {
      heading: { en: 'priority is for exactly one image', hi: 'priority theek ek image ke liye hai' },
      body: {
        en: 'It disables lazy loading and adds a preload hint. Use it on the LCP image — usually the hero — and nowhere else. Marking several as priority makes them compete and defeats the purpose.',
        hi: 'Ye lazy loading band karta hai aur preload ka ishara jodta hai. Isse LCP wali image pe lagao — aam taur pe hero — aur kahin nahi. Kai ko priority dena unhe aapas mein bhida deta hai aur maqsad hi khatam kar deta hai.',
      },
    },
    {
      heading: { en: 'What next/font does', hi: 'next/font kya karta hai' },
      body: {
        en: 'It downloads the font at build time and self-hosts it, so there is no request to Google at runtime — better privacy and one fewer connection. It also generates a size-adjusted fallback so the swap from fallback to real font does not move the text.',
        hi: 'Wo font build ke waqt download karke khud host karta hai, toh runtime pe Google tak koi request nahi jaati — behtar privacy aur ek connection kam. Wo size-adjusted fallback bhi banata hai taaki fallback se asli font pe jaate waqt text hile nahi.',
      },
      code: `import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });

<body className={inter.className}>`,
    },
    {
      heading: { en: 'Subset, and load fonts at the layout level', hi: 'Subset karo, aur fonts layout ke star pe load karo' },
      body: {
        en: 'Declaring subsets ships only the characters you need, which is often a large saving. And load the font once in the root layout rather than per component, or the same font is initialised repeatedly.',
        hi: 'subsets batao toh sirf zaroori characters jaate hain, jo aksar badi bachat hai. Aur font ko har component ki jagah root layout mein ek baar load karo, warna wahi font baar-baar shuru hota hai.',
      },
    },
    {
      heading: { en: 'And optimisation is not free', hi: 'Aur optimisation muft nahi hai' },
      body: {
        en: 'Image transformation happens on demand and is billed on most platforms. On a self-hosted deployment you need sharp installed and enough CPU, or you configure an external loader and let a CDN do it.',
        hi: 'Image ka roop badalna zaroorat pe hota hai aur zyadatar platforms pe uska paisa lagta hai. Khud host karo toh sharp install aur kaafi CPU chahiye, ya bahari loader set karo aur CDN se karwao.',
      },
    },
  ],

  'What is layout.jsx persistence and why does it matter for performance?': [
    {
      heading: { en: 'A layout does not re-render on navigation below it', hi: 'Apne neeche ke navigation pe layout dobara render nahi hota' },
      body: {
        en: 'When you navigate between two routes that share a layout, only the changed segment re-renders. The layout keeps its React state, its scroll position and its DOM. That is what "persistence" means here.',
        hi: 'Jab tum ek hi layout wale do routes ke beech jaate ho, toh sirf badla hua segment dobara render hota hai. Layout apni React state, scroll position aur DOM rakhta hai. Yahan "persistence" ka yahi matlab hai.',
      },
      diagram: `/dashboard/users  →  /dashboard/settings

layout.jsx     unchanged — state and scroll preserved
  page.jsx     re-rendered`,
    },
    {
      heading: { en: 'What that saves', hi: 'Isse kya bachta hai' },
      body: {
        en: 'The layout is not re-fetched, not re-rendered and not re-hydrated. A sidebar that loads navigation data fetches it once for the whole session rather than on every page change.',
        hi: 'Layout na dobara fetch hota hai, na dobara render, na dobara hydrate. Jo sidebar navigation ka data load karta hai wo poore session mein ek baar laata hai, har page badalne pe nahi.',
      },
    },
    {
      heading: { en: 'And what it fixes for the user', hi: 'Aur user ke liye ye kya theek karta hai' },
      body: {
        en: 'An open sidebar stays open. A scrolled list stays where it was. A video in the layout keeps playing. In the Pages Router _app re-rendered on every navigation, which is why holding that state was awkward.',
        hi: 'Khula sidebar khula rehta hai. Scroll ki hui list wahin rehti hai. Layout ka video chalta rehta hai. Pages Router mein _app har navigation pe dobara render hota tha, isliye wo state rakhna bhadda tha.',
      },
    },
    {
      heading: { en: 'The consequence people trip over', hi: 'Jis nateeje se log thokar khaate hain' },
      body: {
        en: 'A layout does not re-run on navigation, so an auth check placed there can be skipped on a client-side navigation between its children. A layout is not a security boundary — check in the page or the data layer.',
        hi: 'Layout navigation pe dobara nahi chalta, toh wahan rakhi auth ki jaanch uske children ke beech client-side navigation pe chhoot sakti hai. Layout suraksha ki seema nahi hai — page ya data layer mein jaancho.',
      },
    },
    {
      heading: { en: 'Use template.jsx when you need the opposite', hi: 'Ulta chahiye toh template.jsx lo' },
      body: {
        en: 'template.jsx has the same shape as a layout but creates a new instance on every navigation, so state resets and effects re-run. That is what you want for an enter animation or per-route analytics.',
        hi: 'template.jsx layout jaisa hi hai par har navigation pe naya instance banata hai, toh state reset hoti hai aur effects dobara chalte hain. Enter animation ya har route ke analytics ke liye yahi chahiye.',
      },
    },
    {
      heading: { en: 'Put the right things in a layout', hi: 'Layout mein sahi cheezein rakho' },
      body: {
        en: 'Shared chrome that genuinely does not change — navigation, the sidebar, providers. Anything that must reflect the current route belongs in the page, because the layout will not re-render to update it.',
        hi: 'Wo saanjha dhaancha jo sach mein nahi badalta — navigation, sidebar, providers. Jo bhi maujooda route dikhaana ho wo page mein jaaye, kyunki usse badalne ke liye layout dobara render nahi hoga.',
      },
    },
  ],

  'What is the difference between Server Components and Client Components?': [
    {
      heading: { en: 'Where it runs, and whether its code ships', hi: 'Ye kahan chalta hai, aur uska code jaata hai ya nahi' },
      body: {
        en: 'A Server Component runs only on the server and its code never reaches the browser. A Client Component runs on the server to produce the initial HTML and then again in the browser to hydrate, so its code must be downloaded.',
        hi: 'Server Component sirf server pe chalta hai aur uska code browser tak kabhi nahi pahunchta. Client Component pehle HTML banane ke liye server pe chalta hai aur phir hydrate hone ke liye browser mein, toh uska code download karna padta hai.',
      },
      diagram: `Server Component   server only          JS shipped: none
Client Component   server + browser     JS shipped: the component
                                        and everything it imports`,
    },
    {
      heading: { en: 'Server is the default; client is opt-in', hi: 'Default server hai; client chunna padta hai' },
      body: {
        en: 'Every component in app/ is a Server Component unless the file starts with "use client". That directive marks a boundary — everything imported below it also becomes client code, which is why placement matters.',
        hi: 'app/ mein har component Server Component hai jab tak file "use client" se shuru na ho. Wo directive ek seema banati hai — uske neeche import hui har cheez bhi client code ban jaati hai, isiliye jagah maayne rakhti hai.',
      },
    },
    {
      heading: { en: 'What each one can do', hi: 'Har ek kya kar sakta hai' },
      body: {
        en: 'A Server Component can be async and await directly, read a database, use secrets, and import a heavy library at no bundle cost. A Client Component can use state, effects, refs, event handlers and browser APIs. Neither can do the other\'s job.',
        hi: 'Server Component async ho sakta hai aur seedha await kar sakta hai, database padh sakta hai, secrets use kar sakta hai, aur bhaari library bina bundle ki keemat ke import kar sakta hai. Client Component state, effects, refs, event handlers aur browser APIs use kar sakta hai. Koi doosre ka kaam nahi kar sakta.',
      },
      code: `// Server Component
export default async function Page() {
  const posts = await db.posts.findMany();   // ✓
  return <List posts={posts} />;
}

// Client Component
'use client';
export function Counter() { const [n, setN] = useState(0); }`,
    },
    {
      heading: { en: 'The composition rule', hi: 'Jodne ka rule' },
      body: {
        en: 'A Client Component cannot IMPORT a Server Component, but it can RECEIVE one as children. That is the pattern that keeps an interactive shell thin while its contents stay on the server.',
        hi: 'Client Component kisi Server Component ko IMPORT nahi kar sakta, par usse children ki tarah LE sakta hai. Yahi pattern interactive shell ko patla rakhta hai aur uska content server pe.',
      },
      code: `// ✗ inside a Client Component
import ServerChart from './ServerChart';

// ✓ pass it in from a Server Component
<ClientTabs><ServerChart /></ClientTabs>`,
    },
    {
      heading: { en: 'Props must be serialisable', hi: 'Props serialisable hone chahiye' },
      body: {
        en: 'Anything crossing from server to client goes over the network, so it must serialise. Objects, arrays, dates and JSX are fine; a function, a class instance or a Symbol is not — except a Server Action, which is passed by reference.',
        hi: 'Server se client jaane wali har cheez network paar karti hai, toh usse serialise hona chahiye. Objects, arrays, dates aur JSX theek hain; function, class instance ya Symbol nahi — sivaay Server Action ke, jo reference se jaata hai.',
      },
    },
    {
      heading: { en: 'Use server-only to make a leak a build error', hi: 'Leak ko build error banane ke liye server-only lo' },
      body: {
        en: 'Importing the server-only package in a data module makes the build fail if a Client Component ever imports it. That converts an accidental leak of a secret or a database call into an error you cannot ship.',
        hi: 'Kisi data module mein server-only package import karo toh koi Client Component usse import kare tab build fail ho jaata hai. Isse galti se leak hua secret ya database call aisa error ban jaata hai jise tum bhej hi nahi sakte.',
      },
    },
  ],

  'Where should you place the "use client" boundary?': [
    {
      heading: { en: 'As far down the tree as you can', hi: 'Tree mein jitna neeche ho sake' },
      body: {
        en: 'The directive marks a boundary, not a single component. Everything imported below it becomes client code, so placing it high pulls the whole subtree into the bundle. Push it to the leaves that actually need interactivity.',
        hi: 'Ye directive ek seema banati hai, ek component nahi. Uske neeche import hui har cheez client code ban jaati hai, toh usse upar rakhna poora subtree bundle mein kheench leta hai. Usse un patton tak neeche le jao jinhe sach mein interactivity chahiye.',
      },
      diagram: `'use client' at the layout   →  the whole app ships to the browser
'use client' on the button   →  one button ships`,
    },
    {
      heading: { en: 'The concrete mistake', hi: 'Thos galti' },
      body: {
        en: 'A page needs one interactive dropdown, so someone adds "use client" at the top of the page. Now the page, the chart library it imports and every child are all in the bundle, and none of them needed to be.',
        hi: 'Kisi page ko ek interactive dropdown chahiye, toh koi page ke upar "use client" laga deta hai. Ab page, uski import ki hui chart library aur har bachcha bundle mein hain, aur inme se kisi ki zaroorat nahi thi.',
      },
    },
    {
      heading: { en: 'Extract the interactive part', hi: 'Interactive hisse ko alag nikaalo' },
      body: {
        en: 'The fix is almost always to pull the stateful piece into its own file with the directive, and leave the page as a Server Component that renders it. One small file crosses the boundary instead of everything.',
        hi: 'Ilaaj lagbhag hamesha yahi hai ki state wale hisse ko apni file mein directive ke saath nikaal lo, aur page ko Server Component rehne do jo usse render kare. Sab kuch ki jagah ek chhoti file seema paar karti hai.',
      },
      code: `// app/page.jsx — stays a Server Component
import { Dropdown } from './dropdown';
export default async function Page() {
  const data = await db.query();
  return <><Chart data={data} /><Dropdown /></>;
}

// app/dropdown.jsx
'use client';
export function Dropdown() { const [open, setOpen] = useState(false); }`,
    },
    {
      heading: { en: 'Use children to keep server content inside', hi: 'Server content andar rakhne ko children lo' },
      body: {
        en: 'When an interactive wrapper must surround server-rendered content — a tab panel, a modal, an accordion — pass the content as children from a Server Component. The wrapper is client, the contents are not.',
        hi: 'Jab koi interactive wrapper server pe bane content ko gherna ho — tab panel, modal, accordion — toh content ko Server Component se children ki tarah bhejo. Wrapper client hai, andar ka nahi.',
      },
    },
    {
      heading: { en: 'Providers are the legitimate high boundary', hi: 'Providers hi jaayaz upar wali seema hain' },
      body: {
        en: 'A context provider genuinely has to wrap the tree. Put the directive on a small Providers component that renders children, and mount it in the root layout — the layout itself stays a Server Component.',
        hi: 'Context provider ko sach mein poora tree gherna padta hai. Directive ek chhote Providers component pe rakho jo children render kare, aur usse root layout mein lagao — layout khud Server Component hi rehta hai.',
      },
      code: `// app/providers.jsx
'use client';
export function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}`,
    },
    {
      heading: { en: 'Verify rather than assume', hi: 'Maan lene ki jagah jaancho' },
      body: {
        en: 'The bundle analyser tells you what actually shipped. A boundary you placed correctly can still pull in a large dependency through one import, and only the output shows it.',
        hi: 'Bundle analyser bataata hai asal mein kya gaya. Theek jagah rakhi hui seema bhi ek import se koi badi dependency kheench sakti hai, aur ye sirf output dikhata hai.',
      },
    },
  ],

  'What are the rendering strategies in Next.js and when do you use each?': [
    {
      heading: { en: 'Four, plus the one that combines them', hi: 'Chaar, aur ek jo inhe milaata hai' },
      body: {
        en: 'Static rendering at build time, dynamic rendering per request, incremental regeneration in between, and client-side rendering in the browser. Partial Prerendering combines the first two in a single route.',
        hi: 'Build ke waqt static, har request pe dynamic, beech mein incremental regeneration, aur browser mein client-side. Partial Prerendering pehle do ko ek hi route mein milaa deta hai.',
      },
      diagram: `static    build time      fastest, same for everyone
ISR       build + refresh cached, revalidated on a schedule or a tag
dynamic   per request     personalised, slower
client    in the browser  interactive, needs JS`,
    },
    {
      heading: { en: 'Static is the default and you should keep it', hi: 'Static default hai aur usse rakhna chahiye' },
      body: {
        en: 'A route is static unless something forces it otherwise. It is prerendered once and served from a CDN, so it is the fastest and cheapest option. Marketing pages, docs and blog posts should all be static.',
        hi: 'Route static hi rehta hai jab tak koi cheez usse badle na. Wo ek baar prerender hota hai aur CDN se milta hai, toh ye sabse tez aur sasta vikalp hai. Marketing pages, docs aur blog posts sab static hone chahiye.',
      },
    },
    {
      heading: { en: 'Dynamic when the response depends on the request', hi: 'Dynamic jab response request pe nirbhar ho' },
      body: {
        en: 'Reading cookies, headers or searchParams makes a route dynamic, because the output differs per visitor. A dashboard, a cart or anything behind a login is dynamic by nature and there is no point fighting it.',
        hi: 'Cookies, headers ya searchParams padhna route ko dynamic bana deta hai, kyunki output har visitor ke liye alag hai. Dashboard, cart ya login ke peeche ki koi bhi cheez swabhaav se dynamic hai aur usse ladne ka koi matlab nahi.',
      },
      code: `const session = (await cookies()).get('session');   // → dynamic`,
    },
    {
      heading: { en: 'ISR for content that changes on its own schedule', hi: 'ISR us content ke liye jo apne samay pe badalta hai' },
      body: {
        en: 'A product page or an article is not personalised but does change. Prerender it and revalidate on a timer or on demand, so visitors get a cached response and the content is never more than a known age out of date.',
        hi: 'Product page ya article personalised nahi hai par badalta zaroor hai. Usse prerender karo aur samay pe ya zaroorat pe revalidate karo, taaki visitors ko cached response mile aur content ek maloom umar se zyada purana kabhi na ho.',
      },
    },
    {
      heading: { en: 'Client-side for what only the browser knows', hi: 'Jo sirf browser jaanta hai uske liye client-side' },
      body: {
        en: 'A live chart on a websocket, a map, anything reading window or localStorage. Note this is not a route-level choice in the App Router — it is a Client Component inside an otherwise server-rendered page.',
        hi: 'Websocket pe chalta live chart, map, ya window ya localStorage padhne wali koi cheez. Dhyaan do App Router mein ye route ka chunav nahi hai — ye kisi server-rendered page ke andar ek Client Component hai.',
      },
    },
    {
      heading: { en: 'And in Next 16, PPR is the default with Cache Components', hi: 'Aur Next 16 mein Cache Components ke saath PPR default hai' },
      body: {
        en: 'The current answer. Enable cacheComponents and a route is no longer wholly static or wholly dynamic: the shell is prerendered and anything uncached streams in behind a Suspense boundary. The choice moves from per route to per component.',
        hi: 'Aaj ka jawab. cacheComponents chaalu karo toh route na poora static rehta hai na poora dynamic: dhaancha prerender hota hai aur bina cache wala hissa Suspense boundary ke peeche stream ho kar aata hai. Chunav route se badal kar component pe aa jaata hai.',
      },
    },
  ],

  /* ─── Rendering, caching and revalidation ─────────────────── */

  'What makes a route dynamic rather than static in the App Router?': [
    {
      heading: { en: 'Touching anything that depends on the request', hi: 'Aisi cheez chhoona jo request pe nirbhar ho' },
      body: {
        en: 'A route is static by default. It becomes dynamic the moment it reads something that can only be known per request — cookies, headers, searchParams, or the connection.',
        hi: 'Route default se static hai. Wo us pal dynamic ban jaata hai jab wo koi aisi cheez padhe jo sirf har request pe hi pata chal sakti hai — cookies, headers, searchParams, ya connection.',
      },
      code: `await cookies();       // → dynamic
await headers();        // → dynamic
await searchParams;     // → dynamic
await connection();     // → explicitly dynamic`,
    },
    {
      heading: { en: 'These APIs are async in Next 15 and 16', hi: 'Next 15 aur 16 mein ye APIs async hain' },
      body: {
        en: 'A change people still trip over. cookies, headers, params and searchParams all return promises now and must be awaited. Older tutorials read them synchronously, and that code no longer works.',
        hi: 'Ek badlaav jispe log ab bhi thokar khaate hain. cookies, headers, params aur searchParams ab promises dete hain aur inhe await karna padta hai. Purane tutorials inhe synchronously padhte hain, aur wo code ab nahi chalta.',
      },
      code: `const { slug } = await params;                   // ✓
const session = (await cookies()).get('session');  // ✓`,
    },
    {
      heading: { en: 'An explicit segment config also forces it', hi: 'Saaf segment config bhi majboor kar deta hai' },
      body: {
        en: 'export const dynamic = "force-dynamic" opts the whole segment out of prerendering, and revalidate = 0 does the same thing. Use them deliberately rather than as a way to silence a build error you did not understand.',
        hi: 'export const dynamic = "force-dynamic" poore segment ko prerendering se bahar kar deta hai, aur revalidate = 0 bhi wahi karta hai. Inhe soch kar use karo, kisi aise build error ko chup karane ke liye nahi jise tumne samjha hi nahi.',
      },
    },
    {
      heading: { en: 'A dynamic segment is not automatically dynamic', hi: 'Dynamic segment apne aap dynamic nahi hota' },
      body: {
        en: 'The naming confuses people. A [slug] route can still be fully static if you provide generateStaticParams — Next.js prerenders one page per value at build time. Dynamic SEGMENT and dynamic RENDERING are different things.',
        hi: 'Naam se uljhan hoti hai. [slug] route poori tarah static reh sakta hai agar tum generateStaticParams do — Next.js har value ka ek page build ke waqt prerender kar deta hai. Dynamic SEGMENT aur dynamic RENDERING alag cheezein hain.',
      },
      code: `export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));   // ✓ still static
}`,
    },
    {
      heading: { en: 'Check the build output rather than guessing', hi: 'Andaaze ki jagah build output dekho' },
      body: {
        en: 'next build prints a symbol per route — static, SSG with generated params, or dynamic. If a route you expected to be static is marked dynamic, something in it read a request-time API, and the output is where you find that out.',
        hi: 'next build har route pe ek nishaan chhaapta hai — static, generate kiye params wala SSG, ya dynamic. Jis route ko tumne static socha tha wo dynamic dikhe, toh usme kisi ne request-time API padhi hai, aur ye output se hi pata chalta hai.',
      },
    },
    {
      heading: { en: 'With Cache Components the question changes shape', hi: 'Cache Components ke saath sawaal ki shakl badal jaati hai' },
      body: {
        en: 'In Next 16 with cacheComponents on, a route is no longer wholly one or the other. Uncached data must sit inside a Suspense boundary or be marked `use cache`, and the build fails with an explicit error if it is not — rather than silently making the whole route dynamic.',
        hi: 'Next 16 mein cacheComponents chaalu ho toh route poori tarah ek ya doosra nahi rehta. Bina cache wala data ya toh Suspense boundary ke andar ho ya `use cache` se mark ho, aur na ho toh build saaf error deta hai — poore route ko chup-chaap dynamic banane ki jagah.',
      },
    },
  ],

  'What is ISR and how does revalidation work?': [
    {
      heading: { en: 'Static pages that refresh without a rebuild', hi: 'Static pages jo bina rebuild ke taaza ho jaate hain' },
      body: {
        en: 'Incremental Static Regeneration prerenders a page and then updates it in the background after it goes stale. You get CDN-speed responses with content that is never more than a known age out of date, and no full redeploy.',
        hi: 'Incremental Static Regeneration page ko prerender karta hai aur purana hone pe background mein usse update kar deta hai. CDN jaisi raftaar milti hai aur content ek maloom umar se zyada purana nahi hota, aur poora redeploy bhi nahi karna padta.',
      },
    },
    {
      heading: { en: 'Stale-while-revalidate is the mechanism', hi: 'Machinery stale-while-revalidate hai' },
      body: {
        en: 'The detail that matters. The first visitor after expiry still gets the STALE page — the regeneration happens in the background and the next visitor gets the fresh one. Nobody waits for the rebuild.',
        hi: 'Yahi baat maayne rakhti hai. Expiry ke baad pehla visitor bhi PURANA page hi paata hai — regeneration background mein hoti hai aur agla visitor naya paata hai. Rebuild ka intezaar koi nahi karta.',
      },
      diagram: `t=0    build → page cached
t=61s  visitor A → stale page served, regeneration starts
t=62s  visitor B → fresh page`,
    },
    {
      heading: { en: 'Time-based revalidation', hi: 'Samay pe revalidation' },
      body: {
        en: 'Set an interval and the page refreshes on that schedule. In the legacy model that is the revalidate segment export; with Cache Components it is cacheLife inside a `use cache` scope.',
        hi: 'Ek antaraal set karo aur page usi samay pe taaza hota hai. Purane model mein wo revalidate wala segment export hai; Cache Components ke saath wo `use cache` ke andar cacheLife hai.',
      },
      code: `export const revalidate = 3600;      // legacy model

async function getPosts() {           // Cache Components
  'use cache';
  cacheLife('hours');
  return db.posts.findMany();
}`,
    },
    {
      heading: { en: 'On-demand revalidation is usually better', hi: 'Zaroorat pe revalidation aam taur pe behtar hai' },
      body: {
        en: 'A timer is a guess. Invalidating when the content actually changes — from a CMS webhook or after a mutation — means the page is always correct and you are not regenerating pages nobody asked for.',
        hi: 'Timer ek andaaza hai. Jab content sach mein badle tab invalidate karna — CMS webhook se ya kisi mutation ke baad — matlab page hamesha sahi hai aur tum wo pages dobara nahi bana rahe jinhe kisi ne maanga hi nahi.',
      },
      code: `import { revalidateTag } from 'next/cache';
revalidateTag('posts');       // from a webhook or a Server Action`,
    },
    {
      heading: { en: 'Next 16 splits invalidation in two', hi: 'Next 16 invalidation ko do mein baant deta hai' },
      body: {
        en: 'revalidateTag is stale-while-revalidate — fast, but the user who made the change may still see the old content. updateTag expires immediately for read-your-own-writes, and it can only be used in a Server Action. That distinction is new and worth knowing.',
        hi: 'revalidateTag stale-while-revalidate hai — tez, par jisne badlaav kiya use purana content dikh sakta hai. updateTag turant expire karta hai, apna hi likha turant dikhane ke liye, aur wo sirf Server Action mein chalta hai. Ye farq naya hai aur jaanne laayak.',
      },
      code: `revalidateTag('posts', 'max');   // background refresh
updateTag('posts');               // immediate — after the user's own write`,
    },
    {
      heading: { en: 'And ISR needs a shared store when you scale', hi: 'Aur scale pe ISR ko saanjha store chahiye' },
      body: {
        en: 'The operational catch. Each instance keeps its own regenerated pages on local disk, so with several containers one may serve fresh content and another stale. A shared cache handler is needed outside a platform that provides one.',
        hi: 'Operational pech. Har instance apne banaye pages local disk pe rakhta hai, toh kai containers mein ek naya content de sakta hai aur doosra purana. Jo platform ye khud na de, wahan saanjha cache handler chahiye.',
      },
    },
  ],

  'What are Server Actions and what are the security considerations?': [
    {
      heading: { en: 'An async function that runs on the server', hi: 'Ek async function jo server pe chalta hai' },
      body: {
        en: 'Mark a function "use server" and you can call it directly from a component. Next.js creates the endpoint, serialises the arguments and returns the result — you write no fetch and no API route.',
        hi: 'Kisi function pe "use server" likho aur usse seedha component se bula sakte ho. Next.js endpoint banata hai, arguments serialise karta hai aur nateeja laata hai — na fetch likhna padta hai na API route.',
      },
      code: `'use server';
export async function createPost(formData) {
  await db.posts.create({ title: formData.get('title') });
  revalidatePath('/posts');
}`,
    },
    {
      heading: { en: 'The security model in one sentence', hi: 'Security ka model ek line mein' },
      body: {
        en: 'This is the whole question. A Server Action is a public HTTP endpoint. It is reachable by a direct POST whether or not the UI that calls it is ever rendered, so protecting the page protects nothing.',
        hi: 'Poora sawaal yahi hai. Server Action ek public HTTP endpoint hai. Usse seedhi POST se pahuncha ja sakta hai, chahe usse bulane wala UI kabhi render ho ya na ho, toh page bachaane se kuch nahi bachta.',
      },
    },
    {
      heading: { en: 'What Next.js does for you', hi: 'Next.js tumhare liye kya karta hai' },
      body: {
        en: 'Two things, both worth naming. Action ids are encrypted and non-deterministic, and they are recalculated between builds. And unused actions are removed from the bundle by dead code elimination, so they never get a public endpoint at all.',
        hi: 'Do cheezein, dono batane laayak. Action ids encrypted aur anischit hain, aur builds ke beech dobara banti hain. Aur bekaar actions dead code elimination se bundle se hat jaate hain, toh unhe public endpoint milta hi nahi.',
      },
    },
    {
      heading: { en: 'And what it explicitly does not', hi: 'Aur wo saaf-saaf kya nahi karta' },
      body: {
        en: 'The docs are blunt: those measures reduce risk where an auth layer is missing, but you must still verify authentication and authorisation inside every action. Nothing about the framework does that for you.',
        hi: 'Docs saaf kehte hain: ye upaay tab jokhim kam karte hain jab auth layer hi na ho, par tumhe har action ke andar authentication aur authorisation khud jaanchni hi hai. Framework ye tumhare liye nahi karta.',
      },
      code: `'use server';
export async function deleteUser(id) {
  const session = await requireAdmin();      // ✓ every action, every time
  await db.users.delete(id);
}`,
    },
    {
      heading: { en: 'Validate the arguments too', hi: 'Arguments bhi validate karo' },
      body: {
        en: 'Everything arriving is client input, including hidden form fields and anything you closed over. A schema at the top of the action is the same discipline as validating a request body in an API route.',
        hi: 'Jo bhi aata hai wo client ka input hai, chhupe hue form fields aur closure mein pakdi cheezein samet. Action ke shuru mein ek schema wahi anushaasan hai jo API route mein request body validate karna.',
      },
    },
    {
      heading: { en: 'Do not leak internals through the return value', hi: 'Return value se andar ki cheezein leak mat karo' },
      body: {
        en: 'Whatever an action returns is serialised to the client. Returning a full database row can expose a password hash or an internal flag. Return exactly the shape the UI needs.',
        hi: 'Action jo bhi return kare wo client tak serialise ho kar jaata hai. Poori database row lautana password hash ya koi andar ka flag khol sakta hai. Bilkul wahi shakl lautao jo UI ko chahiye.',
      },
    },
    {
      heading: { en: 'And they run in sequence', hi: 'Aur ye kram se chalte hain' },
      body: {
        en: 'Server Actions are invoked one at a time rather than in parallel, because they are treated as mutations that may depend on each other. For a read-heavy call that is the wrong shape — use a Route Handler instead.',
        hi: 'Server Actions ek-ek karke chalte hain, parallel nahi, kyunki unhe aise mutations maana jaata hai jo ek doosre pe nirbhar ho sakte hain. Zyada read wale call ke liye ye galat shakl hai — Route Handler lo.',
      },
    },
  ],

  'How does caching work in the Next.js App Router?': [
    {
      heading: { en: 'In Next 16, caching is explicit', hi: 'Next 16 mein caching saaf-saaf hai' },
      body: {
        en: 'Lead with this. The old model cached a lot implicitly, which surprised people. Cache Components inverts it: nothing is cached unless you say so with `use cache`, and fetch is no longer cached by default.',
        hi: 'Isi se shuru karo. Purana model bahut kuch chup-chaap cache kar deta tha, jo logon ko chaunkata tha. Cache Components isse ulta deta hai: kuch cache nahi hota jab tak tum `use cache` se na kaho, aur fetch ab default se cache nahi hota.',
      },
      code: `// next.config.ts
export default { cacheComponents: true };`,
    },
    {
      heading: { en: 'use cache works at two levels', hi: 'use cache do star pe chalta hai' },
      body: {
        en: 'Put the directive in a data function to cache the result, or at the top of a component or page to cache the rendered UI. Arguments and closed-over values become part of the cache key, so different inputs get separate entries.',
        hi: 'Directive ko kisi data function mein rakho toh nateeja cache hota hai, ya kisi component ya page ke upar rakho toh render kiya UI. Arguments aur closure ki values cache key ka hissa ban jaati hain, toh alag inputs ki alag entries banti hain.',
      },
      code: `export async function getProducts(categoryId) {
  'use cache';
  cacheLife('hours');
  cacheTag('products');
  return db.products.findMany({ where: { categoryId } });
}`,
    },
    {
      heading: { en: 'cacheLife sets the lifetime', hi: 'cacheLife umar tay karta hai' },
      body: {
        en: 'It takes a named profile such as seconds, minutes, hours or days, or a custom object. It only works inside a `use cache` scope — calling it anywhere else does nothing.',
        hi: 'Ye seconds, minutes, hours ya days jaisa naam wala profile leta hai, ya koi custom object. Ye sirf `use cache` ke andar chalta hai — kahin aur bulane se kuch nahi hota.',
      },
    },
    {
      heading: { en: 'cacheTag sets the invalidation handle', hi: 'cacheTag invalidation ka handle deta hai' },
      body: {
        en: 'Tag a cache entry and you can invalidate it later by name from a Server Action or a webhook. Several functions can share a tag, so one call refreshes everything related to that entity.',
        hi: 'Kisi cache entry pe tag lagao aur baad mein Server Action ya webhook se naam se usse invalidate kar sakte ho. Kai functions ek hi tag rakh sakte hain, toh ek call us cheez se juda sab kuch taaza kar deti hai.',
      },
    },
    {
      heading: { en: 'What is not cached must be in Suspense', hi: 'Jo cache nahi hai wo Suspense mein hona chahiye' },
      body: {
        en: 'The rule that makes Partial Prerendering work. Any component reading uncached or request-time data must sit inside a Suspense boundary. If it does not, the build fails with an explicit error naming the problem.',
        hi: 'Yahi rule Partial Prerendering ko chalata hai. Jo component bina cache wala ya request-time data padhe wo Suspense boundary ke andar hona chahiye. Na ho toh build saaf error ke saath fail hota hai jo problem ka naam bataata hai.',
      },
      code: `<Suspense fallback={<Skeleton />}>
  <LiveOrders />        {/* reads cookies — must be here */}
</Suspense>`,
    },
    {
      heading: { en: 'The browser still caches navigation', hi: 'Browser abhi bhi navigation cache karta hai' },
      body: {
        en: 'Separate from the server side, the client keeps the payload of visited and prefetched routes in memory so going back is instant. That is why a stale page can persist after a mutation until you invalidate or refresh.',
        hi: 'Server se alag, client dekhi hui aur pehle se laayi gayi routes ka payload memory mein rakhta hai taaki wapas jaana turant ho. Isiliye kisi mutation ke baad purana page tab tak reh sakta hai jab tak tum invalidate ya refresh na karo.',
      },
    },
    {
      heading: { en: 'And there is a legacy path', hi: 'Aur ek purana raasta bhi hai' },
      body: {
        en: 'If Cache Components is not enabled, the old model applies and the docs cover it separately. Say which one you are describing — an answer that mixes the two vocabularies sounds like it was learned from two different years of tutorials.',
        hi: 'Cache Components chaalu na ho toh purana model chalta hai aur docs usse alag se bataate hain. Batao tum kaunsa keh rahe ho — dono shabdaawali mila dene wala jawab do alag saalon ke tutorials se seekha hua lagta hai.',
      },
    },
  ],

  'What is streaming and how does Suspense enable it?': [
    {
      heading: { en: 'The server sends the response in chunks', hi: 'Server response tukdon mein bhejta hai' },
      body: {
        en: 'Rather than building the whole response and sending it at the end, the server writes what is ready and keeps the connection open. The browser can start parsing, loading CSS and rendering while the rest is still being produced.',
        hi: 'Poora response bana kar aakhir mein bhejne ki jagah, server jo taiyaar hai wo likh deta hai aur connection khula rakhta hai. Browser parse karna, CSS load karna aur render karna shuru kar deta hai jabki baaki abhi ban raha hota hai.',
      },
    },
    {
      heading: { en: 'Suspense is where the response is allowed to split', hi: 'Suspense wahi jagah hai jahan response tut sakta hai' },
      body: {
        en: 'React needs a declared point at which it can substitute a fallback and continue. A Suspense boundary is that declaration. With no boundary there is no split point, so the response waits for the slowest thing in the tree.',
        hi: 'React ko ek batayi hui jagah chahiye jahan wo fallback rakh kar aage badh sake. Suspense boundary wahi elaan hai. Boundary na ho toh tootne ki jagah nahi, toh response tree ki sabse dheemi cheez ka intezaar karta hai.',
      },
      code: `<Suspense fallback={<Skeleton />}>
  <SlowSection />
</Suspense>`,
    },
    {
      heading: { en: 'How the swap actually happens', hi: 'Badalna asal mein kaise hota hai' },
      body: {
        en: 'The fallback is sent in the first chunk. When the real content resolves, the server sends it later in the same response along with a small inline script that swaps it into place. No client-side fetch is involved.',
        hi: 'Fallback pehle chunk mein jaata hai. Asli content taiyaar hone pe server usse usi response mein aage bhejta hai, saath mein ek chhota inline script jo usse jagah pe laga deta hai. Isme koi client-side fetch nahi hota.',
      },
    },
    {
      heading: { en: 'Selective hydration follows from it', hi: 'Isse selective hydration nikalti hai' },
      body: {
        en: 'Because the page arrives in pieces, React hydrates them as they arrive and prioritises whatever the user interacts with first. A slow section no longer blocks the rest of the page from becoming interactive.',
        hi: 'Page tukdon mein aata hai, isliye React unhe aate hi hydrate karta hai aur usse pehle karta hai jispe user pehle interact kare. Koi dheema hissa ab baaki page ko interactive hone se nahi rokta.',
      },
    },
    {
      heading: { en: 'Placement is the design decision', hi: 'Jagah hi design ka faisla hai' },
      body: {
        en: 'One boundary around everything means everything waits. Several smaller ones let the fast parts appear immediately. Put a boundary where a meaningful chunk of UI can stand alone, and make the fallback the right shape so nothing shifts when it swaps.',
        hi: 'Sab kuch pe ek boundary matlab sab intezaar karega. Kai chhoti boundaries tez hisson ko turant dikha deti hain. Boundary wahan rakho jahan UI ka koi matlab wala tukda akela khada ho sake, aur fallback ki shakl aisi rakho ki badalte waqt kuch khiske nahi.',
      },
    },
    {
      heading: { en: 'And in Next 16 it is not optional for uncached data', hi: 'Aur Next 16 mein bina cache wale data ke liye ye optional nahi' },
      body: {
        en: 'With Cache Components enabled, anything reading uncached or request-time data must be inside a Suspense boundary or the build fails. Streaming stops being an optimisation you remember and becomes part of the model.',
        hi: 'Cache Components chaalu ho toh bina cache wala ya request-time data padhne wali har cheez Suspense boundary ke andar honi chahiye, warna build fail hota hai. Streaming ek yaad rakhne wali optimisation nahi, model ka hissa ban jaati hai.',
      },
    },
  ],

  'What is the difference between loading.tsx and a Suspense boundary?': [
    {
      heading: { en: 'loading is a Suspense boundary with a fixed position', hi: 'loading ek tay jagah wali Suspense boundary hai' },
      body: {
        en: 'Adding loading.jsx to a segment makes Next.js wrap that segment\'s page in Suspense automatically, using the file as the fallback. It is not a different mechanism — it is the same one, placed for you.',
        hi: 'Kisi segment mein loading.jsx jodo toh Next.js us segment ke page ko apne aap Suspense mein lapet deta hai aur us file ko fallback banata hai. Ye alag machinery nahi — wahi hai, bas tumhare liye rakhi hui.',
      },
      diagram: `loading.jsx        wraps the WHOLE segment — one fallback
<Suspense>         wraps whatever you choose — many, nested`,
    },
    {
      heading: { en: 'The granularity is the difference', hi: 'Farq bareeki ka hai' },
      body: {
        en: 'loading.jsx replaces the entire segment while it loads, so nothing on the page is visible. A manual boundary lets the header, the nav and the fast sections render immediately with only the slow part showing a skeleton.',
        hi: 'loading.jsx load hote waqt poora segment badal deta hai, toh page pe kuch dikhta hi nahi. Haath se lagayi boundary header, nav aur tez hisson ko turant dikha deti hai aur skeleton sirf dheeme hisse pe hota hai.',
      },
    },
    {
      heading: { en: 'loading also covers navigation', hi: 'loading navigation bhi cover karta hai' },
      body: {
        en: 'A useful property people miss. Because it wraps the segment, loading.jsx shows instantly on a client-side navigation into that route, before the new page has any data. A manual Suspense boundary inside the page cannot do that.',
        hi: 'Ek kaam ki baat jo log chook jaate hain. Wo segment ko lapetta hai, isliye us route mein client-side navigation pe loading.jsx turant dikhta hai, naye page ko data milne se pehle. Page ke andar haath se lagayi Suspense boundary ye nahi kar sakti.',
      },
    },
    {
      heading: { en: 'Use both, at different levels', hi: 'Dono lo, alag star pe' },
      body: {
        en: 'loading.jsx for the route transition, so the user gets instant feedback when they click. Suspense boundaries inside the page for the slow sections, so the shell appears and the individual pieces fill in.',
        hi: 'Route badalne ke liye loading.jsx, taaki click pe user ko turant jawab mile. Page ke andar dheeme hisson pe Suspense boundaries, taaki dhaancha dikhe aur tukde bharte jaayein.',
      },
      code: `// app/dashboard/loading.jsx      → instant on navigation
// app/dashboard/page.jsx
<Suspense fallback={<ChartSkeleton />}>
  <SlowChart />                    {/* the rest is already visible */}
</Suspense>`,
    },
    {
      heading: { en: 'A fallback that changes size causes layout shift', hi: 'Size badalne wala fallback layout khiska deta hai' },
      body: {
        en: 'True for both. A spinner replaced by a tall table moves everything below it. A skeleton with the same dimensions as the real content is what makes streaming feel smooth rather than jumpy.',
        hi: 'Dono ke liye sach. Spinner ki jagah lambi table aaye toh neeche ka sab hil jaata hai. Asli content jitni hi size wala skeleton hi streaming ko uchhal-kood ki jagah smooth banata hai.',
      },
    },
    {
      heading: { en: 'And a segment gets only one', hi: 'Aur har segment ko ek hi milta hai' },
      body: {
        en: 'loading.jsx is one file per segment, so there is no way to vary it. When different parts of a page need different fallbacks, that is exactly the case for explicit Suspense boundaries.',
        hi: 'loading.jsx har segment mein ek hi file hai, toh usse badla nahi ja sakta. Jab page ke alag hisson ko alag fallbacks chahiye, tab saaf Suspense boundaries ka case banta hai.',
      },
    },
  ],

  'How do error boundaries work in the App Router?': [
    {
      heading: { en: 'error.jsx wraps its segment', hi: 'error.jsx apne segment ko lapetta hai' },
      body: {
        en: 'Adding error.jsx to a folder creates a React error boundary around that segment\'s page and its children. An error thrown below it renders the file instead of crashing the route.',
        hi: 'Kisi folder mein error.jsx jodo toh us segment ke page aur uske children ke aas-paas React error boundary ban jaati hai. Uske neeche phenka gaya error route todne ki jagah wo file render kar deta hai.',
      },
      code: `'use client';      // error.jsx must be a Client Component

export default function Error({ error, reset }) {
  return (
    <>
      <p>Something went wrong</p>
      <button onClick={reset}>Try again</button>
    </>
  );
}`,
    },
    {
      heading: { en: 'It must be a Client Component', hi: 'Ye Client Component hona hi chahiye' },
      body: {
        en: 'Error boundaries need state and lifecycle, which only exist on the client, so the file must start with "use client". Forgetting the directive is the first thing that goes wrong.',
        hi: 'Error boundaries ko state aur lifecycle chahiye, jo sirf client pe hain, toh file "use client" se shuru honi chahiye. Sabse pehle yahi directive bhoolne se galat hota hai.',
      },
    },
    {
      heading: { en: 'reset re-renders the segment', hi: 'reset segment ko dobara render karta hai' },
      body: {
        en: 'The second prop is a function that attempts to re-render the boundary\'s contents. That is genuinely useful for a transient failure — a flaky request retried without a full page reload.',
        hi: 'Doosra prop ek function hai jo boundary ke content ko dobara render karne ki koshish karta hai. Kisi astai failure ke liye ye sach mein kaam ka hai — kharaab request bina poore page reload ke dobara chal jaati hai.',
      },
    },
    {
      heading: { en: 'It does not catch its own layout', hi: 'Ye apne layout ko nahi pakadta' },
      body: {
        en: 'The scoping detail people miss. error.jsx sits INSIDE its segment\'s layout, so an error thrown in that layout escapes it and bubbles to the parent. To catch a root layout error you need global-error.jsx.',
        hi: 'Scope wali baat jo log chookte hain. error.jsx apne segment ke layout ke ANDAR baithta hai, toh us layout ka error usse bach kar parent tak jaata hai. Root layout ka error pakadne ke liye global-error.jsx chahiye.',
      },
      diagram: `layout.jsx        ← an error here is NOT caught below
  error.jsx       ← catches errors in page.jsx and children
    page.jsx`,
    },
    {
      heading: { en: 'global-error replaces the root layout', hi: 'global-error root layout ki jagah leta hai' },
      body: {
        en: 'It is the last resort, and because the root layout has failed it must render its own html and body tags. It only applies in production, so testing it locally needs a production build.',
        hi: 'Ye aakhri sahara hai, aur root layout fail ho chuka hai isliye usse apne html aur body tags khud render karne padte hain. Ye sirf production mein lagta hai, toh local pe test karne ke liye production build chahiye.',
      },
      code: `'use client';
export default function GlobalError({ error, reset }) {
  return <html><body><p>Fatal error</p></body></html>;
}`,
    },
    {
      heading: { en: 'What it does not catch', hi: 'Ye kya nahi pakadta' },
      body: {
        en: 'Errors in an event handler, in asynchronous code, or thrown after the response started streaming. Those need try/catch where they happen. And notFound, unauthorized and forbidden are not errors — they render their own files.',
        hi: 'Event handler ke errors, async code ke, ya response stream shuru hone ke baad phenke gaye. Unhe wahin try/catch chahiye jahan wo hote hain. Aur notFound, unauthorized aur forbidden errors nahi hain — wo apni files render karte hain.',
      },
    },
    {
      heading: { en: 'And the message is redacted in production', hi: 'Aur production mein message chhupa diya jaata hai' },
      body: {
        en: 'A server-side error message is not sent to the client in production — you get a generic message and a digest hash. Log the real error on the server and use the digest to find it, rather than expecting the message in the browser.',
        hi: 'Production mein server ka error message client tak nahi jaata — ek aam message aur ek digest hash milta hai. Asli error server pe log karo aur digest se usse dhoondho, browser mein message ki ummeed mat karo.',
      },
    },
  ],

  'What is the difference between the App Router and the Pages Router?': [
    {
      heading: { en: 'The default changed, and everything follows', hi: 'Default badla, aur baaki sab usi se' },
      body: {
        en: 'In pages/ every component is a Client Component. In app/ every component is a Server Component unless it opts out. That single inversion explains most of the other differences.',
        hi: 'pages/ mein har component Client Component hai. app/ mein har component Server Component hai jab tak wo bahar na nikle. Yahi ek palatna baaki zyadatar farq samjha deta hai.',
      },
    },
    {
      heading: { en: 'Data fetching', hi: 'Data fetching' },
      body: {
        en: 'Page-level getServerSideProps and getStaticProps become an async component that awaits directly, at any depth. getStaticPaths becomes generateStaticParams. The data moves to where it is used.',
        hi: 'Page ke star ke getServerSideProps aur getStaticProps ki jagah ek async component aata hai jo kisi bhi gehraai pe seedha await karta hai. getStaticPaths ki jagah generateStaticParams. Data wahin chala jaata hai jahan use hota hai.',
      },
      diagram: `pages/                       app/
getServerSideProps           an async Server Component
getStaticProps               use cache / cacheLife
getStaticPaths               generateStaticParams
_app + _document             layout.jsx
API routes                   route.js handlers
next/router                  next/navigation`,
    },
    {
      heading: { en: 'Layouts and the special files', hi: 'Layouts aur khaas files' },
      body: {
        en: 'app/ has nested layouts that persist across navigation, plus loading, error, not-found and template as conventions. In pages/ this was _app and _document plus your own code.',
        hi: 'app/ mein nested layouts hain jo navigation ke paar tikte hain, saath mein loading, error, not-found aur template riwaaj ke taur pe. pages/ mein ye _app aur _document aur tumhara apna code tha.',
      },
    },
    {
      heading: { en: 'The hooks moved and changed', hi: 'Hooks badle aur badal gaye' },
      body: {
        en: 'useRouter now comes from next/navigation and no longer exposes query or pathname — you use useSearchParams, usePathname and useParams instead. Importing the old one in app/ throws at runtime.',
        hi: 'useRouter ab next/navigation se aata hai aur query ya pathname nahi deta — uski jagah useSearchParams, usePathname aur useParams. app/ mein purana import karo toh runtime pe error aata hai.',
      },
    },
    {
      heading: { en: 'Everything new is App Router only', hi: 'Har nayi cheez sirf App Router mein hai' },
      body: {
        en: 'Server Actions, streaming, Partial Prerendering, Cache Components, parallel and intercepting routes. The Pages Router still works and is still supported, but it is receiving no new capability.',
        hi: 'Server Actions, streaming, Partial Prerendering, Cache Components, parallel aur intercepting routes. Pages Router abhi bhi chalta hai aur support mein hai, par usme koi nayi khoobi nahi aa rahi.',
      },
    },
    {
      heading: { en: 'And they can run side by side', hi: 'Aur dono saath chal sakte hain' },
      body: {
        en: 'Both directories can exist in one project, with app/ winning a conflicting path. That is what makes migration incremental — move one route at a time rather than attempting a rewrite.',
        hi: 'Ek hi project mein dono directories reh sakti hain, takraate path pe app/ jeetta hai. Isi se migration dhire-dhire hoti hai — poora rewrite karne ki jagah ek-ek route badlo.',
      },
    },
  ],

  'How do you fetch data in a Server Component?': [
    {
      heading: { en: 'Make the component async and await', hi: 'Component ko async banao aur await karo' },
      body: {
        en: 'There is no special API. A Server Component can be an async function, so you await whatever you need — a database call, an ORM, fetch — directly in the body and use the result in the JSX.',
        hi: 'Koi khaas API nahi hai. Server Component async function ho sakta hai, toh jo chahiye wo seedha body mein await karo — database call, ORM, fetch — aur nateeja JSX mein use karo.',
      },
      code: `export default async function Page() {
  const posts = await db.posts.findMany();
  return <List posts={posts} />;
}`,
    },
    {
      heading: { en: 'You can talk to the database directly', hi: 'Tum seedha database se baat kar sakte ho' },
      body: {
        en: 'There is no need for an internal API route. Calling your own /api endpoint from a Server Component adds a network hop to your own server for no benefit — the component is already on the server.',
        hi: 'Kisi andar wale API route ki zaroorat nahi. Server Component se apne hi /api endpoint ko bulana bina fayde ke apne hi server tak ek network hop jodta hai — component pehle se server pe hai.',
      },
      code: `await fetch('http://localhost:3000/api/posts');   // ✗ pointless hop
await db.posts.findMany();                          // ✓`,
    },
    {
      heading: { en: 'Parallelise independent fetches', hi: 'Alag fetches parallel karo' },
      body: {
        en: 'Awaiting one after another creates a waterfall inside a single component. If the calls do not depend on each other, start them together with Promise.all so the waits overlap.',
        hi: 'Ek ke baad ek await karna ek hi component ke andar waterfall bana deta hai. Agar calls ek doosre pe nirbhar nahi hain, toh Promise.all se saath shuru karo taaki intezaar overlap ho jaayein.',
      },
      code: `const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);`,
    },
    {
      heading: { en: 'Deduplicate with React cache', hi: 'React ke cache se dohraav hatao' },
      body: {
        en: 'If two components in the same render need the same data, wrapping the function in React\'s cache makes the second call return the first result. That avoids passing data down as props purely to avoid a duplicate query.',
        hi: 'Agar ek hi render ke do components ko wahi data chahiye, toh function ko React ke cache mein lapetne se doosri call pehla nateeja de deti hai. Isse sirf dohri query se bachne ke liye data ko props mein neeche bhejna nahi padta.',
      },
      code: `import { cache } from 'react';
export const getUser = cache(async (id) => db.users.find(id));`,
    },
    {
      heading: { en: 'Decide caching explicitly in Next 16', hi: 'Next 16 mein caching saaf tay karo' },
      body: {
        en: 'fetch is not cached by default any more. If the data can be reused, mark the function `use cache` with a cacheLife and a cacheTag. If it must be fresh per request, leave it uncached and put the component inside a Suspense boundary.',
        hi: 'fetch ab default se cache nahi hota. Data dobara use ho sakta hai toh function pe `use cache` cacheLife aur cacheTag ke saath lagao. Har request pe taaza chahiye toh usse bina cache ke chhodo aur component ko Suspense boundary mein rakho.',
      },
    },
    {
      heading: { en: 'And put the auth check next to the data', hi: 'Aur auth ki jaanch data ke bagal mein rakho' },
      body: {
        en: 'Because any component can now fetch, the check belongs in the data function rather than at the route. A Data Access Layer that verifies the session before returning anything protects every caller, whichever route reached it.',
        hi: 'Ab koi bhi component fetch kar sakta hai, isliye jaanch route pe nahi, data function mein honi chahiye. Aisi Data Access Layer jo kuch dene se pehle session jaanche, har caller ko bachaati hai, chahe wo kisi bhi route se aaya ho.',
      },
    },
  ],

  'What is a route handler and when do you still need one?': [
    {
      heading: { en: 'A file that exports HTTP methods', hi: 'Ek file jo HTTP methods export karti hai' },
      body: {
        en: 'route.js in a folder creates an endpoint at that path. You export a function per method, receive a standard Request and return a standard Response. It is the App Router replacement for pages/api.',
        hi: 'Kisi folder mein route.js us path pe endpoint bana deta hai. Har method ka ek function export karo, ek standard Request lo aur standard Response do. Ye pages/api ki jagah App Router ka roop hai.',
      },
      code: `// app/api/posts/route.js
export async function GET(request) {
  return Response.json(await db.posts.findMany());
}
export async function POST(request) {
  const body = await request.json();
}`,
    },
    {
      heading: { en: 'You do not need one to fetch your own data', hi: 'Apna data laane ke liye iski zaroorat nahi' },
      body: {
        en: 'The most common unnecessary use. A Server Component can query the database directly, so an internal API route just adds a network hop and a layer to maintain. Route handlers are for callers OUTSIDE your render.',
        hi: 'Sabse aam bekaar upyog. Server Component seedha database query kar sakta hai, toh andar wala API route sirf ek network hop aur ek sambhalne wali layer jodta hai. Route handlers un callers ke liye hain jo tumhare render ke BAHAR hain.',
      },
    },
    {
      heading: { en: 'When you genuinely need one', hi: 'Iski sach mein zaroorat kab hai' },
      body: {
        en: 'A public API for a mobile app or a third party. A webhook receiver. An OAuth callback. A file download or an image response. Anything that must be a real URL someone else calls.',
        hi: 'Mobile app ya third party ke liye public API. Webhook lene wala endpoint. OAuth callback. File download ya image response. Har wo cheez jo asli URL honi chahiye jise koi aur bulaye.',
      },
    },
    {
      heading: { en: 'And when a Server Action is the better fit', hi: 'Aur Server Action kab behtar hai' },
      body: {
        en: 'For a mutation triggered by your own form or button, an action gives you progressive enhancement, type safety and no endpoint to secure separately. Reach for a route handler when the caller is not your own UI.',
        hi: 'Apne hi form ya button se hone wale mutation ke liye action progressive enhancement, type safety aur alag se secure karne wala koi endpoint na hona deta hai. Route handler tab lo jab bulane wala tumhara apna UI na ho.',
      },
    },
    {
      heading: { en: 'With Cache Components, GET handlers prerender', hi: 'Cache Components ke saath GET handlers prerender hote hain' },
      body: {
        en: 'A Next 16 change worth knowing. With cacheComponents on, a GET route handler follows the same model as a page: it runs at request time by default but is prerendered at build if it touches no uncached or runtime data.',
        hi: 'Next 16 ka ek jaanne laayak badlaav. cacheComponents chaalu ho toh GET route handler page jaisa hi chalta hai: default se request ke waqt, par bina cache wale ya runtime data ko chhue toh build pe prerender ho jaata hai.',
      },
    },
    {
      heading: { en: 'It is a public endpoint, so treat it as one', hi: 'Ye public endpoint hai, toh usse waisa hi maano' },
      body: {
        en: 'Validate the body, check auth, rate limit, and set the size limit. A route handler has none of the framework conveniences a page has — everything an Express endpoint needs, this needs too.',
        hi: 'Body validate karo, auth jaancho, rate limit lagao, aur size ki seema rakho. Route handler ko page wali koi framework suvidha nahi milti — jo bhi Express endpoint ko chahiye, isse bhi chahiye.',
      },
    },
  ],

  'What is middleware in Next.js and what are its limits?': [
    {
      heading: { en: 'In Next 16 it is called Proxy', hi: 'Next 16 mein isse Proxy kehte hain' },
      body: {
        en: 'Lead with this. Middleware was renamed to Proxy in Next.js 16 to better describe what it does; the functionality is unchanged. The file is proxy.ts at the project root, beside app/ or pages/.',
        hi: 'Isi se shuru karo. Next.js 16 mein Middleware ka naam Proxy kar diya gaya taaki uska kaam saaf ho; kaam wahi hai. File project ke root mein proxy.ts hai, app/ ya pages/ ke bagal mein.',
      },
      code: `// proxy.ts
import { NextResponse } from 'next/server';

export function proxy(request) {
  if (!request.cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
export const config = { matcher: '/dashboard/:path*' };`,
    },
    {
      heading: { en: 'It runs before the request is handled', hi: 'Ye request sambhale jaane se pehle chalta hai' },
      body: {
        en: 'It can rewrite, redirect, set request or response headers, or respond directly. It sits in front of every matched route, which is what makes it useful for concerns that apply everywhere.',
        hi: 'Ye rewrite, redirect, request ya response ke headers set, ya seedha jawab de sakta hai. Ye har match hue route ke aage baithta hai, isliye har jagah lagne wale kaamon ke liye kaam ka hai.',
      },
    },
    {
      heading: { en: 'Use the matcher, or it runs on everything', hi: 'Matcher lo, warna ye har cheez pe chalta hai' },
      body: {
        en: 'Without a matcher it executes for every request including static assets, which is pure overhead on every image and script. Scope it to the paths that actually need it.',
        hi: 'Matcher na ho toh ye har request pe chalta hai, static assets samet, jo har image aur script pe bekaar ka bojh hai. Usse unhi paths tak seemit karo jinhe sach mein chahiye.',
      },
    },
    {
      heading: { en: 'It is not the place for authorisation', hi: 'Authorisation ki jagah ye nahi hai' },
      body: {
        en: 'The docs are explicit: Proxy should not be your session management or authorisation solution. Use it for an optimistic redirect of an obviously logged-out visitor, and do the real check in the Data Access Layer.',
        hi: 'Docs saaf kehte hain: Proxy tumhara session management ya authorisation ka hal nahi hona chahiye. Usse saaf logged-out visitor ko anumaan se redirect karne ke liye lo, aur asli jaanch Data Access Layer mein karo.',
      },
    },
    {
      heading: { en: 'It is not for data fetching', hi: 'Ye data fetching ke liye nahi hai' },
      body: {
        en: 'It sits on the critical path of every matched request, so anything slow there is added to every page load. The docs also note that fetch cache and revalidate options have no effect inside Proxy.',
        hi: 'Ye har match hui request ke asli raaste pe baithta hai, toh wahan koi dheemi cheez har page load mein jud jaati hai. Docs ye bhi kehte hain ki Proxy ke andar fetch ke cache aur revalidate options ka koi asar nahi hota.',
      },
    },
    {
      heading: { en: 'One file, and no runtime override', hi: 'Ek file, aur runtime badalna mana' },
      body: {
        en: 'Only one proxy file per project is supported — organise the logic into modules and import them. And the runtime segment config cannot be used in Proxy, so you do not choose Node or Edge there.',
        hi: 'Har project mein ek hi proxy file chalti hai — logic ko modules mein baanto aur import karo. Aur Proxy mein runtime wala segment config nahi chalta, toh wahan Node ya Edge tum nahi chunte.',
      },
    },
    {
      heading: { en: 'Prefer config redirects when they are enough', hi: 'Jahan config ke redirects kaafi hon wahan wahi lo' },
      body: {
        en: 'For a static redirect, the redirects option in next.config is simpler and does not run your code at all. Reach for Proxy only when you need the request data or the logic is conditional.',
        hi: 'Sthir redirect ke liye next.config ka redirects option simple hai aur tumhara code chalata hi nahi. Proxy tabhi lo jab request ka data chahiye ho ya logic shart pe ho.',
      },
    },
  ],

  /* ─── Runtimes, routing conventions and the browser ───────── */

  'What is the difference between the Edge and Node.js runtimes?': [
    {
      heading: { en: 'Full Node versus a browser-like subset', hi: 'Poora Node vs browser jaisa chhota hissa' },
      body: {
        en: 'The Node.js runtime is the default and has every Node API. The Edge runtime is a smaller environment with only web-standard APIs — fetch, Request, Response, Web Crypto — and no fs, no net, no native modules.',
        hi: 'Node.js runtime default hai aur usme har Node API hai. Edge runtime ek chhota environment hai jisme sirf web-standard APIs hain — fetch, Request, Response, Web Crypto — na fs, na net, na native modules.',
      },
      code: `export const runtime = 'nodejs';    // default
export const runtime = 'edge';`,
    },
    {
      heading: { en: 'What Edge buys you', hi: 'Edge se kya milta hai' },
      body: {
        en: 'A near-instant cold start and deployment close to the user, because the isolate is tiny. That matters for something on the critical path of every request — geolocation, an A/B split, a redirect — where a few hundred milliseconds of cold start would be visible.',
        hi: 'Lagbhag turant cold start aur user ke paas deployment, kyunki isolate bahut chhota hai. Har request ke asli raaste pe baithi kisi cheez ke liye ye maayne rakhta hai — geolocation, A/B split, redirect — jahan kuch sau millisecond ka cold start dikh jaata.',
      },
    },
    {
      heading: { en: 'What it costs', hi: 'Keemat kya hai' },
      body: {
        en: 'Many npm packages do not work — anything touching a Node built-in or a native binary. A database driver over TCP will not run; you need an HTTP-based client. And bundle size and CPU time limits are tighter than on Node.',
        hi: 'Kai npm packages nahi chalte — jo bhi Node ke built-in ya native binary ko chhue. TCP wala database driver nahi chalega; HTTP wala client chahiye. Aur bundle size aur CPU samay ki seemayein Node se tang hain.',
      },
    },
    {
      heading: { en: 'Two limits worth knowing', hi: 'Do seemayein jaanne laayak' },
      body: {
        en: 'The docs are explicit: the Edge runtime does not support ISR, and runtime: edge is NOT supported with Cache Components. Either of those alone rules Edge out of most page routes in a modern app.',
        hi: 'Docs saaf kehte hain: Edge runtime ISR support nahi karta, aur Cache Components ke saath runtime: edge chalta NAHI. Inme se ek bhi modern app ke zyadatar page routes se Edge ko bahar kar deti hai.',
      },
    },
    {
      heading: { en: 'Proxy is where Edge actually fits', hi: 'Edge asal mein Proxy mein fit hota hai' },
      body: {
        en: 'Proxy — the renamed middleware — is the canonical Edge use case, and you cannot set the runtime there anyway. Short, fast, request-shaped work on the critical path is exactly what the runtime was designed for.',
        hi: 'Proxy — naya naam wala middleware — Edge ka asli case hai, aur wahan runtime set kiya hi nahi ja sakta. Asli raaste pe chhota, tez, request jaisa kaam — runtime isi ke liye bana tha.',
      },
    },
    {
      heading: { en: 'The default is right for almost everything', hi: 'Lagbhag har cheez ke liye default hi sahi hai' },
      body: {
        en: 'Say this plainly. Node is the default because it works with the whole ecosystem and supports every Next.js feature. Choose Edge for a specific latency-sensitive path, not as a general preference.',
        hi: 'Ye saaf kaho. Node default hai kyunki wo poore ecosystem ke saath chalta hai aur Next.js ka har feature support karta hai. Edge kisi khaas latency wale raaste ke liye chuno, aam pasand ke taur pe nahi.',
      },
    },
  ],

  'How does the next/image component help performance?': [
    {
      heading: { en: 'It fixes the two image-shaped Core Web Vitals', hi: 'Ye image wale do Core Web Vitals theek karta hai' },
      body: {
        en: 'Images are usually the largest element on a page and the most common cause of layout shift. next/image targets LCP by shrinking and prioritising the bytes, and CLS by reserving the space before they arrive.',
        hi: 'Images aam taur pe page ka sabse bada element hoti hain aur layout shift ki sabse aam wajah. next/image LCP pe bytes chhote karke aur unhe priority de kar kaam karta hai, aur CLS pe unke aane se pehle jagah rok kar.',
      },
    },
    {
      heading: { en: 'Format and size are chosen per request', hi: 'Format aur size har request pe chune jaate hain' },
      body: {
        en: 'It serves WebP or AVIF when the browser accepts it and resizes to the dimensions actually needed, so a phone does not download a two-thousand-pixel-wide hero. The transformation is cached after the first request.',
        hi: 'Browser maane toh WebP ya AVIF deta hai aur usi size mein badalta hai jitni sach mein zaroorat hai, toh phone do hazaar pixel chaudi hero download nahi karta. Pehli request ke baad wo roop cache ho jaata hai.',
      },
    },
    {
      heading: { en: 'Lazy loading is the default', hi: 'Lazy loading default hai' },
      body: {
        en: 'Anything below the fold is not requested until it approaches the viewport, using the browser\'s native lazy loading. On a long page that alone can remove most of the initial image weight.',
        hi: 'Fold ke neeche ki har cheez tab tak nahi maangi jaati jab tak wo viewport ke paas na aaye, browser ki apni lazy loading se. Lambe page pe akela yahi shuruaati image ka zyadatar bojh hata deta hai.',
      },
    },
    {
      heading: { en: 'width and height prevent the shift', hi: 'width aur height shift rokte hain' },
      body: {
        en: 'They are required for a reason: the browser reserves the correct box before the bytes arrive, so nothing below jumps. When the size is genuinely unknown, fill with a positioned parent does the same job.',
        hi: 'Ye wajah se zaroori hain: browser bytes aane se pehle sahi dabba rok leta hai, toh neeche kuch nahi uchhalta. Jab size sach mein pata na ho toh positioned parent ke saath fill wahi kaam karta hai.',
      },
      code: `<Image src="/hero.png" alt="" width={1200} height={600} priority />
<Image src={remote} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" />`,
    },
    {
      heading: { en: 'priority on exactly one image', hi: 'priority theek ek image pe' },
      body: {
        en: 'It disables lazy loading and adds a preload hint, which is right for the LCP element and wrong everywhere else. Marking several as priority makes them compete for bandwidth and slows the one that mattered.',
        hi: 'Ye lazy loading band karta hai aur preload ka ishara jodta hai, jo LCP wale element ke liye sahi hai aur baaki har jagah galat. Kai ko priority dena unhe bandwidth ke liye bhida deta hai aur jo zaroori thi usse dheema kar deta hai.',
      },
    },
    {
      heading: { en: 'sizes matters when you use fill', hi: 'fill use karo toh sizes maayne rakhta hai' },
      body: {
        en: 'Without it the browser assumes the image is full viewport width and downloads the largest candidate. Telling it the real rendered width at each breakpoint is often the single biggest saving on a responsive grid.',
        hi: 'Iske bina browser maan leta hai ki image poori viewport chaudi hai aur sabse bada version download karta hai. Har breakpoint pe asli chaudai batana responsive grid pe aksar sabse badi bachat hoti hai.',
      },
    },
    {
      heading: { en: 'And the deployment caveat', hi: 'Aur deployment wali chetavni' },
      body: {
        en: 'Optimisation runs on demand and costs CPU or money. Self-hosted you need sharp installed and headroom; otherwise configure an external loader and let a CDN do the transformation. A remote source also needs to be allowlisted in the config.',
        hi: 'Optimisation zaroorat pe chalti hai aur CPU ya paisa leti hai. Khud host karo toh sharp aur kaafi jagah chahiye; warna bahari loader set karo aur CDN se karwao. Bahari source ko config mein allowlist bhi karna padta hai.',
      },
    },
  ],

  'How does next/font improve loading?': [
    {
      heading: { en: 'It self-hosts the font at build time', hi: 'Ye build ke waqt font khud host kar leta hai' },
      body: {
        en: 'The font file is downloaded during the build and served from your own origin, so there is no runtime request to Google. That removes a DNS lookup, a connection and a third-party dependency from the critical path.',
        hi: 'Font file build ke dauraan download hoti hai aur tumhare apne origin se milti hai, toh runtime pe Google tak koi request nahi jaati. Isse asli raaste se ek DNS lookup, ek connection aur ek third-party dependency hat jaati hai.',
      },
      code: `import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function Layout({ children }) {
  return <html className={inter.className}><body>{children}</body></html>;
}`,
    },
    {
      heading: { en: 'And it eliminates the layout shift', hi: 'Aur ye layout shift khatam karta hai' },
      body: {
        en: 'The more valuable half. next/font generates a fallback with adjusted metrics — size-adjust, ascent and descent — so the fallback occupies the same space as the real font. When the swap happens, nothing moves.',
        hi: 'Zyada keemti hissa yahi hai. next/font badle hue metrics wala fallback banata hai — size-adjust, ascent aur descent — taaki fallback asli font jitni hi jagah le. Badalte waqt kuch hilta nahi.',
      },
    },
    {
      heading: { en: 'Subsetting cuts the file down', hi: 'Subsetting file chhoti kar deta hai' },
      body: {
        en: 'Declaring subsets ships only the character ranges you need. A full font covering every script is far larger than the Latin subset most sites actually render, and this is often the biggest single saving.',
        hi: 'subsets batao toh sirf zaroori character ranges jaati hain. Har lipi wala poora font us Latin subset se kahin bada hai jo zyadatar sites asal mein dikhaati hain, aur ye aksar sabse badi ek bachat hoti hai.',
      },
    },
    {
      heading: { en: 'Privacy is a real reason too', hi: 'Privacy bhi ek asli wajah hai' },
      body: {
        en: 'Because nothing is requested from Google at runtime, no visitor IP reaches a third party for a font. That matters for GDPR, and some jurisdictions have ruled that loading Google Fonts directly is a violation.',
        hi: 'Runtime pe Google se kuch nahi maanga jaata, toh font ke liye kisi visitor ka IP third party tak nahi jaata. GDPR mein ye maayne rakhta hai, aur kuch jagahon ne Google Fonts seedha load karne ko ullanghan maana hai.',
      },
    },
    {
      heading: { en: 'Load it once, in the root layout', hi: 'Isse ek baar, root layout mein load karo' },
      body: {
        en: 'Calling the loader per component re-initialises the same font repeatedly. Declare it once at the top and apply the generated className or a CSS variable, which is also how you use it from Tailwind.',
        hi: 'Har component mein loader bulana wahi font baar-baar shuru karta hai. Usse upar ek baar batao aur bana hua className ya CSS variable lagao, aur Tailwind se bhi isse aise hi use karte ho.',
      },
      code: `const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
<html className={inter.variable}>`,
    },
    {
      heading: { en: 'Local fonts work the same way', hi: 'Local fonts bhi aise hi chalte hain' },
      body: {
        en: 'next/font/local takes a file path and applies the same self-hosting and fallback-metric treatment. Use it for a licensed brand font, and prefer a variable font so one file covers every weight.',
        hi: 'next/font/local ek file path leta hai aur wahi self-hosting aur fallback-metric wala kaam karta hai. Licensed brand font ke liye isse lo, aur variable font behtar hai taaki ek file har weight cover kare.',
      },
    },
  ],

  'How do you handle metadata and SEO in the App Router?': [
    {
      heading: { en: 'Export metadata from a layout or a page', hi: 'Layout ya page se metadata export karo' },
      body: {
        en: 'A static metadata object is the simplest form. Next.js renders the tags into the head, and metadata from nested segments merges with the parent so a layout can set defaults for everything below it.',
        hi: 'Sthir metadata object sabse simple roop hai. Next.js tags ko head mein daal deta hai, aur nested segments ka metadata parent ke saath mil jaata hai, toh layout apne neeche sab ke liye defaults tay kar sakta hai.',
      },
      code: `export const metadata = {
  title: 'Learnverse',
  description: 'Developer courses in English and Hinglish',
};`,
    },
    {
      heading: { en: 'generateMetadata for anything dynamic', hi: 'Dynamic cheezon ke liye generateMetadata' },
      body: {
        en: 'An async function that receives the params and returns the object. It runs on the server before the page renders, and the fetch it makes is deduplicated with the one in the page, so there is no double query.',
        hi: 'Ek async function jo params leta hai aur object deta hai. Ye page render hone se pehle server pe chalta hai, aur uski fetch page wali fetch ke saath ek hi mani jaati hai, toh dohri query nahi hoti.',
      },
      code: `export async function generateMetadata({ params }) {
  const { slug } = await params;                // ✓ params is async
  const post = await getPost(slug);
  return { title: post.title, description: post.excerpt };
}`,
    },
    {
      heading: { en: 'The title template saves repetition', hi: 'Title template dohraav bachaata hai' },
      body: {
        en: 'Set a template in the root layout and every child only supplies its own part. absolute lets one page opt out entirely, which is what you want on a landing page.',
        hi: 'Root layout mein template rakho aur har bachcha sirf apna hissa deta hai. absolute se koi ek page poori tarah bahar nikal sakta hai, aur landing page pe wahi chahiye.',
      },
      code: `title: { template: '%s | Learnverse', default: 'Learnverse' }
// a child exporting title: 'Courses' renders "Courses | Learnverse"`,
    },
    {
      heading: { en: 'Open Graph images are file conventions', hi: 'Open Graph images file riwaaj hain' },
      body: {
        en: 'An opengraph-image file in a segment is picked up automatically and the tags are generated. You can also write opengraph-image.tsx that renders JSX to an image, which is how per-post social cards are produced without a design tool.',
        hi: 'Kisi segment mein opengraph-image file apne aap uth jaati hai aur tags ban jaate hain. Tum opengraph-image.tsx bhi likh sakte ho jo JSX se image banata hai, aur har post ke social cards bina design tool ke aise hi bante hain.',
      },
    },
    {
      heading: { en: 'metadataBase fixes relative URLs', hi: 'metadataBase relative URLs theek karta hai' },
      body: {
        en: 'A commonly missed detail. Open Graph and Twitter tags need absolute URLs. Without metadataBase set in the root layout, a relative image path produces a broken preview on every social platform.',
        hi: 'Aksar chhoot jaane wali baat. Open Graph aur Twitter tags ko poore URLs chahiye. Root layout mein metadataBase set na ho toh relative image path har social platform pe toota hua preview deta hai.',
      },
      code: `export const metadata = { metadataBase: new URL('https://example.com') };`,
    },
    {
      heading: { en: 'sitemap and robots are files too', hi: 'sitemap aur robots bhi files hain' },
      body: {
        en: 'sitemap.js and robots.js in the app directory export a function returning the data, and Next.js serves them at the right URL with the right content type. No route handler and no manual XML.',
        hi: 'app directory mein sitemap.js aur robots.js ek function export karte hain jo data deta hai, aur Next.js unhe sahi URL pe sahi content type ke saath deta hai. Na route handler chahiye na haath se XML.',
      },
    },
    {
      heading: { en: 'And SEO is mostly not metadata', hi: 'Aur SEO zyadatar metadata hai hi nahi' },
      body: {
        en: 'Worth saying. Server rendering so crawlers see content, fast Core Web Vitals, correct status codes, canonical URLs and semantic HTML matter more than the tags. Next.js gives you the first two by default, which is the real SEO argument.',
        hi: 'Ye kehna chahiye. Server rendering taaki crawlers content dekhein, tez Core Web Vitals, sahi status codes, canonical URLs aur semantic HTML — ye tags se zyada maayne rakhte hain. Next.js pehli do default se deta hai, aur asli SEO wala tark yahi hai.',
      },
    },
  ],

  'What are parallel routes and intercepting routes?': [
    {
      heading: { en: 'Parallel routes render several pages in one layout', hi: 'Parallel routes ek layout mein kai pages dikhate hain' },
      body: {
        en: 'A folder named with an @ becomes a named slot that the layout receives as a prop alongside children. Each slot has its own loading and error state and streams independently.',
        hi: '@ se shuru hone wala folder ek naam wala slot ban jaata hai jo layout ko children ke saath prop ki tarah milta hai. Har slot ki apni loading aur error state hoti hai aur wo alag stream hota hai.',
      },
      code: `app/dashboard/
  layout.jsx
  @team/page.jsx
  @analytics/page.jsx

export default function Layout({ children, team, analytics }) {
  return <>{children}{team}{analytics}</>;
}`,
    },
    {
      heading: { en: 'The point is independent loading', hi: 'Asli baat alag-alag loading hai' },
      body: {
        en: 'A dashboard with three panels can show each as it resolves, and a failure in one shows its own error state without taking down the others. Doing that with plain composition means one shared loading and error path.',
        hi: 'Teen panels wala dashboard har ek ko taiyaar hote hi dikha sakta hai, aur ek ke fail hone pe uska apna error dikhta hai, baaki nahi girte. Saadi composition se karo toh loading aur error ka ek hi saanjha raasta milta hai.',
      },
    },
    {
      heading: { en: 'default.jsx handles the unmatched case', hi: 'Na milne wala case default.jsx sambhaalta hai' },
      body: {
        en: 'On a hard reload Next.js cannot know what a slot should show if the URL does not match it, and without default.jsx the route 404s. This is the single most common parallel-routes bug.',
        hi: 'Poore reload pe Next.js ko pata nahi hota ki URL match na kare toh slot mein kya dikhe, aur default.jsx na ho toh route 404 de deta hai. Parallel routes ka sabse aam bug yahi hai.',
      },
    },
    {
      heading: { en: 'Intercepting routes show a route in place', hi: 'Intercepting routes route ko wahin dikhate hain' },
      body: {
        en: 'A folder with a (.) or (..) prefix catches a navigation to another route and renders it inside the current layout instead. The classic case is a photo grid where clicking opens a modal but the URL becomes the photo page.',
        hi: '(.) ya (..) prefix wala folder kisi doosre route ki navigation pakad kar usse maujooda layout ke andar render kar deta hai. Classic case photo grid hai jahan click pe modal khulta hai par URL photo page ban jaata hai.',
      },
      code: `app/feed/page.jsx
app/photo/[id]/page.jsx        full page — on a direct visit
app/feed/@modal/(.)photo/[id]/page.jsx    modal — on a click`,
    },
    {
      heading: { en: 'Why the combination is the point', hi: 'Ye jodi hi asli baat kyun hai' },
      body: {
        en: 'Together they give a shareable modal. Clicking shows the modal over the feed with the photo URL; sharing that URL and loading it fresh shows the full page. Both behaviours from one route, which is otherwise fiddly to build.',
        hi: 'Milkar ye share hone laayak modal dete hain. Click pe feed ke upar modal aur URL photo ka; wahi URL share karke naya kholo toh poora page. Ek hi route se dono behaviour, jo warna banana jhanjhat hai.',
      },
    },
    {
      heading: { en: 'Use them sparingly', hi: 'Inhe kam use karo' },
      body: {
        en: 'The folder syntax is unusual and the failure modes — a missing default, a mismatched matcher — are confusing to debug. They are worth it for a genuine modal-with-URL requirement and overkill for a layout you could compose normally.',
        hi: 'Folder wali syntax ajeeb hai aur failures — gayab default, na milta matcher — debug karne mein uljhaate hain. URL wale asli modal ke liye ye keemti hain aur aise layout ke liye zyada hain jise tum aam tareeke se jod sakte ho.',
      },
    },
  ],

  'What is a route group and when is it useful?': [
    {
      heading: { en: 'A folder in parentheses that does not affect the URL', hi: 'Brackets wala folder jo URL nahi badalta' },
      body: {
        en: 'Wrapping a folder name in parentheses organises files without adding a path segment. app/(marketing)/about/page.jsx serves /about, not /marketing/about.',
        hi: 'Folder ke naam ko brackets mein rakhna files ko sambhaalta hai par path mein koi segment nahi jodta. app/(marketing)/about/page.jsx /about deta hai, /marketing/about nahi.',
      },
      code: `app/
  (marketing)/about/page.jsx      →  /about
  (shop)/cart/page.jsx            →  /cart`,
    },
    {
      heading: { en: 'The real use is a scoped layout', hi: 'Asli upyog ek seemit layout hai' },
      body: {
        en: 'This is why they exist. Put a layout inside the group and it applies to every route in it and nothing outside. Marketing pages get the marketing chrome; the app pages get the dashboard shell; neither URL changes.',
        hi: 'Ye isi liye hain. Group ke andar ek layout rakho aur wo usi ke har route pe lagta hai, bahar kisi pe nahi. Marketing pages ko marketing ka dhaancha; app pages ko dashboard ka; aur kisi ka URL nahi badalta.',
      },
      code: `app/
  (marketing)/layout.jsx     header + footer
  (app)/layout.jsx           sidebar + auth shell`,
    },
    {
      heading: { en: 'And multiple root layouts', hi: 'Aur kai root layouts' },
      body: {
        en: 'If each top-level group has its own layout with html and body tags, they become separate root layouts. That lets a marketing site and an application have genuinely different documents — different fonts, different providers.',
        hi: 'Agar har top-level group ka apna layout ho jisme html aur body tags hon, toh wo alag root layouts ban jaate hain. Isse marketing site aur application ke sach mein alag documents ho sakte hain — alag fonts, alag providers.',
      },
    },
    {
      heading: { en: 'They also just organise the tree', hi: 'Ye tree ko sambhaalte bhi hain' },
      body: {
        en: 'Even without a layout, grouping related routes keeps a large app navigable. It is the same reason you use folders anywhere — the difference is that here folders normally change the URL and this one does not.',
        hi: 'Bina layout ke bhi, jude hue routes ko group karna bade app ko sambhaalne laayak rakhta hai. Wahi wajah jo kahin bhi folders use karne ki hoti hai — farq ye ki yahan folders aam taur pe URL badalte hain aur ye nahi badalta.',
      },
    },
    {
      heading: { en: 'The conflict you can create', hi: 'Jo takraav tum bana sakte ho' },
      body: {
        en: 'Because the group name disappears from the path, two groups can produce the same route. app/(a)/about and app/(b)/about both resolve to /about and the build fails. The parentheses hide the collision until then.',
        hi: 'Group ka naam path se gaayab ho jaata hai, isliye do groups ek hi route bana sakte hain. app/(a)/about aur app/(b)/about dono /about bante hain aur build fail ho jaata hai. Tab tak brackets is takraav ko chhupaye rakhte hain.',
      },
    },
    {
      heading: { en: 'And navigating between root layouts is a full load', hi: 'Aur root layouts ke beech jaana poora load hai' },
      body: {
        en: 'A detail worth knowing. Moving between two groups that each have their own root layout reloads the document rather than doing a client-side navigation, because the whole html element changes.',
        hi: 'Jaanne laayak baat. Do aise groups ke beech jaana jinke apne root layouts hain, client-side navigation ki jagah poora document reload karta hai, kyunki poora html element badal jaata hai.',
      },
    },
  ],

  'How do you handle authentication in Next.js?': [
    {
      heading: { en: 'Three separate concerns, and people conflate them', hi: 'Teen alag cheezein, aur log inhe mila dete hain' },
      body: {
        en: 'Authentication is proving who you are. Session management is remembering it across requests. Authorisation is deciding what you may do. A good answer separates the three, because they are solved in different places.',
        hi: 'Authentication matlab ye saabit karna ki tum kaun ho. Session management matlab usse requests ke paar yaad rakhna. Authorisation matlab ye tay karna ki tum kya kar sakte ho. Achha jawab teeno ko alag karta hai, kyunki ye alag jagah hal hote hain.',
      },
    },
    {
      heading: { en: 'Do not write the auth yourself', hi: 'Auth khud mat likho' },
      body: {
        en: 'Auth.js, Clerk, Lucia or a hosted provider handle the protocol details — OAuth flows, token rotation, CSRF, password hashing. Rolling your own is the answer that worries an interviewer rather than impressing them.',
        hi: 'Auth.js, Clerk, Lucia ya koi hosted provider protocol ki bareekiyan sambhaalte hain — OAuth flows, token rotation, CSRF, password hashing. Khud banana wo jawab hai jo interviewer ko prabhaavit nahi, chintit karta hai.',
      },
    },
    {
      heading: { en: 'Session in an httpOnly cookie', hi: 'Session ek httpOnly cookie mein' },
      body: {
        en: 'A cookie the browser sends automatically and JavaScript cannot read, so an XSS cannot steal it. Set secure and sameSite as well. Storing a token in localStorage is the common mistake — it is readable by any script on the page.',
        hi: 'Aisi cookie jo browser apne aap bhejta hai aur JavaScript padh nahi sakti, toh XSS usse chura nahi sakta. secure aur sameSite bhi lagao. Token ko localStorage mein rakhna aam galti hai — usse page ka koi bhi script padh sakta hai.',
      },
      code: `(await cookies()).set('session', token, {
  httpOnly: true, secure: true, sameSite: 'lax', maxAge: 86400,
});`,
    },
    {
      heading: { en: 'Check in the Data Access Layer', hi: 'Data Access Layer mein jaancho' },
      body: {
        en: 'The pattern the Next.js docs recommend. Put the session check in the function that reads the data, so every caller is protected regardless of the route. Cache it with React cache so several components in one render do not re-verify.',
        hi: 'Next.js ke docs yahi pattern sujhaate hain. Session ki jaanch us function mein rakho jo data padhta hai, taaki har caller surakshit ho, route chahe koi bhi ho. Usse React cache se cache karo taaki ek render ke kai components dobara jaanch na karein.',
      },
      code: `import 'server-only';
export const verifySession = cache(async () => {
  const token = (await cookies()).get('session')?.value;
  if (!token) unauthorized();
  return decrypt(token);
});`,
    },
    {
      heading: { en: 'Proxy is an optimistic redirect only', hi: 'Proxy sirf anumaan wala redirect hai' },
      body: {
        en: 'The docs say explicitly that Proxy should not be your session management or authorisation solution. Use it to bounce an obviously logged-out visitor before rendering; never treat it as the gate.',
        hi: 'Docs saaf kehte hain ki Proxy tumhara session management ya authorisation ka hal nahi hona chahiye. Usse render se pehle saaf logged-out visitor ko wapas bhejne ke liye lo; usse gate kabhi mat maano.',
      },
    },
    {
      heading: { en: 'Server Actions need their own check', hi: 'Server Actions ko apni jaanch chahiye' },
      body: {
        en: 'The gap people leave. An action is a public POST endpoint reachable whether or not its UI rendered. Protecting the page does nothing — verify the session inside every action that mutates anything.',
        hi: 'Wo khaali jagah jo log chhod dete hain. Action ek public POST endpoint hai jo UI render ho ya na ho, pahuncha ja sakta hai. Page bachaane se kuch nahi hota — har badlaav karne wale action ke andar session jaancho.',
      },
    },
    {
      heading: { en: 'And a layout is not a boundary', hi: 'Aur layout koi seema nahi hai' },
      body: {
        en: 'A layout does not re-render on navigation between its children, so a check placed there can be skipped. Combined with the two points above: the only reliable place is next to the data and inside the action.',
        hi: 'Layout apne children ke beech navigation pe dobara render nahi hota, toh wahan rakhi jaanch chhoot sakti hai. Upar ki do baaton ke saath: bharosemand jagah sirf data ke bagal mein aur action ke andar hai.',
      },
    },
  ],

  'What is hydration and what causes a hydration error?': [
    {
      heading: { en: 'Attaching React to server-rendered HTML', hi: 'Server ke HTML se React ko jodna' },
      body: {
        en: 'The server sends HTML that looks finished but is inert. Hydration is React running the same components in the browser and attaching event listeners to the EXISTING DOM rather than recreating it.',
        hi: 'Server aisa HTML bhejta hai jo poora dikhta hai par bejaan hai. Hydration matlab React wahi components browser mein chala kar MAUJOODA DOM pe event listeners lagata hai, usse dobara banane ki jagah.',
      },
    },
    {
      heading: { en: 'The contract: the first render must match', hi: 'Shart: pehla render milna chahiye' },
      body: {
        en: 'React expects the tree it renders in the browser to be identical to the HTML the server produced. If they differ it cannot trust the markup, logs an error and re-renders that subtree on the client — so you paid for SSR and got nothing.',
        hi: 'React ummeed karta hai ki browser ka tree server ke HTML se bilkul same ho. Alag hon toh wo markup pe bharosa nahi kar sakta, error deta hai aur us subtree ko client pe dobara render karta hai — toh SSR ki keemat di aur mila kuch nahi.',
      },
    },
    {
      heading: { en: 'The five usual causes', hi: 'Paanch aam wajah' },
      body: {
        en: 'Anything non-deterministic or environment-dependent. Date or time formatting. Math.random or a generated id. Reading window, localStorage or a cookie during render. A locale or timezone difference between server and browser. And invalid HTML nesting, which the browser silently corrects.',
        hi: 'Koi bhi anischit ya environment pe nirbhar cheez. Date ya time ki formatting. Math.random ya banayi gayi id. Render ke dauraan window, localStorage ya cookie padhna. Server aur browser ke beech locale ya timezone ka farq. Aur galat HTML nesting, jise browser chup-chaap sudhaar deta hai.',
      },
      code: `<p>{new Date().toLocaleString()}</p>       // ✗ differs
<p>{localStorage.getItem('name')}</p>       // ✗ undefined on the server
<p><div /></p>                              // ✗ the browser moves the div`,
    },
    {
      heading: { en: 'The fix: render it after mount', hi: 'Ilaaj: mount ke baad render karo' },
      body: {
        en: 'Produce the same neutral output on both sides for the first pass, then update in an effect. An effect only runs in the browser, so the first render matches and the real value appears immediately after.',
        hi: 'Pehle chakkar mein dono taraf wahi tatasth output do, phir effect mein update karo. Effect sirf browser mein chalta hai, toh pehla render mil jaata hai aur asli value uske turant baad aa jaati hai.',
      },
      code: `const [time, setTime] = useState(null);
useEffect(() => setTime(new Date().toLocaleString()), []);
return <p>{time ?? 'Loading…'}</p>;`,
    },
    {
      heading: { en: 'Or defer the component entirely', hi: 'Ya poore component ko taal do' },
      body: {
        en: 'For a component that genuinely cannot render on the server — one reading window on mount, or a browser-only chart library — next/dynamic with ssr false skips server rendering for it altogether.',
        hi: 'Jo component sach mein server pe render nahi ho sakta — mount pe window padhne wala, ya sirf browser wali chart library — uske liye ssr false wala next/dynamic server rendering poori tarah chhod deta hai.',
      },
      code: `const Chart = dynamic(() => import('./Chart'), { ssr: false });`,
    },
    {
      heading: { en: 'suppressHydrationWarning is narrow', hi: 'suppressHydrationWarning tang hai' },
      body: {
        en: 'It silences the warning for one element and one level deep, and it is legitimate for something genuinely time-based. It does not fix the mismatch — it hides it — so never apply it broadly.',
        hi: 'Ye ek element aur ek level tak warning chup kara deta hai, aur sach mein samay pe nirbhar cheez ke liye jaayaz hai. Ye mismatch theek nahi karta — chhupata hai — isliye isse har jagah mat lagao.',
      },
    },
    {
      heading: { en: 'And a browser extension can cause it too', hi: 'Aur browser extension bhi ye kar sakta hai' },
      body: {
        en: 'Worth knowing before you spend an hour on it. An extension that injects an attribute into the body produces a hydration mismatch that does not reproduce in incognito. Check there before assuming the bug is yours.',
        hi: 'Ek ghanta lagane se pehle jaanne laayak. Jo extension body mein koi attribute daal deta hai wo aisa hydration mismatch banata hai jo incognito mein nahi hota. Bug apna maanne se pehle wahan dekh lo.',
      },
    },
  ],

  'What is the difference between the Link component and a plain anchor?': [
    {
      heading: { en: 'One navigates on the client, the other reloads', hi: 'Ek client pe navigate karta hai, doosra reload' },
      body: {
        en: 'A plain anchor triggers a full document load: the bundle re-downloads, React remounts and all client state is lost. Link intercepts the click and does a client-side navigation, fetching only the new segment.',
        hi: 'Saada anchor poora document load karwaata hai: bundle dobara download hota hai, React dobara mount hota hai aur saari client state kho jaati hai. Link click pakad kar client-side navigation karta hai aur sirf naya segment laata hai.',
      },
      code: `<a href="/about">About</a>          // ✗ full reload
<Link href="/about">About</Link>      // ✓ client-side`,
    },
    {
      heading: { en: 'It still renders a real anchor', hi: 'Ye phir bhi asli anchor render karta hai' },
      body: {
        en: 'Important for accessibility and behaviour. The output is an a element with an href, so middle-click, right-click, open-in-new-tab and screen readers all work. Only the left click is intercepted.',
        hi: 'Accessibility aur behaviour ke liye zaroori. Output ek a element hai href ke saath, toh middle-click, right-click, naye tab mein kholna aur screen readers sab chalte hain. Sirf left click pakda jaata hai.',
      },
    },
    {
      heading: { en: 'Prefetching is the bigger win', hi: 'Badi jeet prefetching hai' },
      body: {
        en: 'In production, Next.js prefetches the linked route when the Link enters the viewport, so the payload is already cached when the user clicks. That is what makes navigation feel instant, and a plain anchor gets none of it.',
        hi: 'Production mein Link viewport mein aate hi Next.js us route ko pehle se le aata hai, toh click ke waqt payload cache mein hota hai. Isi se navigation turant lagta hai, aur saade anchor ko ye kuch nahi milta.',
      },
    },
    {
      heading: { en: 'Layouts persist across a Link navigation', hi: 'Link navigation pe layouts tikte hain' },
      body: {
        en: 'Because it is client-side, the shared layout is not re-rendered — its state, scroll position and any playing media survive. A full reload destroys all of that, which is the user-visible difference.',
        hi: 'Ye client-side hai, isliye saanjha layout dobara render nahi hota — uski state, scroll position aur chal raha media bacha rehta hai. Poora reload ye sab khatam kar deta hai, aur user ko yahi farq dikhta hai.',
      },
    },
    {
      heading: { en: 'When an anchor is correct', hi: 'Anchor kab sahi hai' },
      body: {
        en: 'An external URL, a file download, a mailto or tel link, or a deliberate hard navigation — for example after logging out, where you want every cache and all client state cleared.',
        hi: 'Bahari URL, file download, mailto ya tel link, ya jaan-boojh kar poora navigation — jaise logout ke baad, jahan tum har cache aur saari client state saaf karna chahte ho.',
      },
    },
    {
      heading: { en: 'And prefetching has a cost', hi: 'Aur prefetching ki keemat hai' },
      body: {
        en: 'A page with hundreds of links prefetches a lot of payloads the user will never open, which wastes bandwidth and server work. Setting prefetch to false on a long list is a legitimate optimisation.',
        hi: 'Sau links wala page bahut saare payloads pehle se le aata hai jinhe user kabhi nahi kholega, jo bandwidth aur server ka kaam barbaad karta hai. Lambi list pe prefetch false karna jaayaz optimisation hai.',
      },
      code: `<Link href={href} prefetch={false}>      // ✓ on a long list`,
    },
  ],

  'How do you optimise the JavaScript bundle in a Next.js app?': [
    {
      heading: { en: 'Measure first with the analyser', hi: 'Pehle analyser se naapo' },
      body: {
        en: 'Never guess. next build prints the per-route First Load JS, and the bundle analyser shows which module is responsible. Almost every real win is one unexpectedly large dependency rather than your own code.',
        hi: 'Andaaza kabhi mat lagao. next build har route ka First Load JS chhaapta hai, aur bundle analyser bataata hai kaunsa module zimmedaar hai. Lagbhag har asli jeet tumhare code ki nahi, kisi anchahe bade dependency ki hoti hai.',
      },
      code: `ANALYZE=true npm run build      // with @next/bundle-analyzer`,
    },
    {
      heading: { en: 'The biggest lever is the client boundary', hi: 'Sabse bada lever client boundary hai' },
      body: {
        en: 'Every component below a "use client" directive ships. Moving the directive down to the leaf that actually needs interactivity often removes more from the bundle than any other change, because it takes that component\'s imports with it.',
        hi: '"use client" ke neeche ka har component bundle mein jaata hai. Directive ko us patte tak neeche laana jise sach mein interactivity chahiye, aksar kisi bhi aur badlaav se zyada hataata hai, kyunki uske saath uske imports bhi jaate hain.',
      },
    },
    {
      heading: { en: 'Lazy-load what is not needed immediately', hi: 'Jo turant nahi chahiye usse lazy load karo' },
      body: {
        en: 'next/dynamic splits a component into its own chunk fetched on demand. A modal, a chart, a rich text editor or anything below the fold does not belong in the initial payload.',
        hi: 'next/dynamic component ko apne chunk mein daal deta hai jo zaroorat pe aata hai. Modal, chart, rich text editor ya fold ke neeche ki koi cheez shuruaati payload mein nahi honi chahiye.',
      },
      code: `const Editor = dynamic(() => import('./Editor'), { loading: () => <Skeleton /> });`,
    },
    {
      heading: { en: 'Replace the heavy dependency', hi: 'Bhaari dependency badlo' },
      body: {
        en: 'Often the single largest saving. moment for date-fns or Temporal, lodash for the specific function, a full icon set for the four icons you use. Check whether the package ships ES modules at all — a CommonJS-only package cannot be tree-shaken.',
        hi: 'Aksar sabse badi ek bachat. moment ki jagah date-fns ya Temporal, poora lodash ki jagah wahi ek function, poora icon set ki jagah wo chaar icons. Ye bhi dekho ki package ES modules deta bhi hai ya nahi — sirf CommonJS wala package tree-shake nahi hota.',
      },
    },
    {
      heading: { en: 'Import only what you use', hi: 'Sirf wahi import karo jo use hota hai' },
      body: {
        en: 'A named import from a barrel file can pull in the whole library if it is not properly tree-shakeable. Importing the specific path avoids that, and optimizePackageImports in the config does it automatically for known packages.',
        hi: 'Barrel file se named import poori library kheench sakta hai agar wo theek se tree-shakeable na ho. Khaas path se import karne se ye bach jaata hai, aur config mein optimizePackageImports maloom packages ke liye ye apne aap karta hai.',
      },
      code: `import { debounce } from 'lodash';            // ✗ may pull everything
import debounce from 'lodash/debounce';        // ✓`,
    },
    {
      heading: { en: 'Move work to the server', hi: 'Kaam server pe le jao' },
      body: {
        en: 'The option unique to Next.js. A markdown parser, a syntax highlighter or a date library used only to produce text can run in a Server Component and ship nothing at all. That is not code splitting — it is code deletion.',
        hi: 'Sirf Next.js wala vikalp. Markdown parser, syntax highlighter ya sirf text banane wali date library Server Component mein chal sakti hai aur kuch bhi nahi bhejti. Ye code splitting nahi — code hataana hai.',
      },
    },
    {
      heading: { en: 'And keep the shared chunk small', hi: 'Aur saanjha chunk chhota rakho' },
      body: {
        en: 'Anything imported by the root layout is in the First Load JS of every route. A provider, an analytics script or a font loader added there is paid for on every page, so it deserves more scrutiny than a leaf component.',
        hi: 'Root layout jo bhi import kare wo har route ke First Load JS mein hai. Wahan joda gaya provider, analytics script ya font loader har page pe keemat leta hai, toh usse kisi patte wale component se zyada jaanchna chahiye.',
      },
    },
  ],

  /* ─── Config, data flow and deployment ────────────────────── */

  'What is next/dynamic and when should you use it?': [
    {
      heading: { en: 'Code splitting for a component', hi: 'Kisi component ke liye code splitting' },
      body: {
        en: 'next/dynamic wraps a dynamic import so the component becomes its own chunk, fetched when it is first rendered rather than in the initial bundle. It is React.lazy with a loading state and SSR control built in.',
        hi: 'next/dynamic ek dynamic import ko lapetta hai taaki component apna chunk ban jaaye, jo shuruaati bundle ki jagah pehli baar render hone pe aaye. Ye React.lazy hi hai, loading state aur SSR ke control ke saath.',
      },
      code: `import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./Editor'), {
  loading: () => <Skeleton />,
});`,
    },
    {
      heading: { en: 'Use it for what is not needed on first paint', hi: 'Jo pehle paint pe nahi chahiye uske liye lo' },
      body: {
        en: 'A modal that opens on click, a chart below the fold, a rich text editor on an admin page, a map. Anything large that most visitors never trigger is paying for itself in every initial page load.',
        hi: 'Click pe khulne wala modal, fold ke neeche ka chart, admin page ka rich text editor, koi map. Har wo badi cheez jise zyadatar visitors chhoote bhi nahi, har shuruaati page load mein apni keemat le rahi hai.',
      },
    },
    {
      heading: { en: 'ssr false is the browser-only escape hatch', hi: 'ssr false sirf-browser wala raasta hai' },
      body: {
        en: 'Some libraries touch window at import time and cannot render on the server at all. Disabling SSR for that component skips it during the server render, which also removes a whole class of hydration mismatch.',
        hi: 'Kuch libraries import ke waqt hi window chhoo leti hain aur server pe render ho hi nahi sakti. Us component ke liye SSR band karna server render mein usse chhod deta hai, jisse hydration mismatch ki poori shreni bhi hat jaati hai.',
      },
      code: `const Map = dynamic(() => import('./Map'), { ssr: false });`,
    },
    {
      heading: { en: 'ssr false only works in a Client Component', hi: 'ssr false sirf Client Component mein chalta hai' },
      body: {
        en: 'A Next 15 and 16 change that trips people. You cannot pass ssr false from a Server Component — the option only makes sense on the client. Move the dynamic import into a Client Component wrapper.',
        hi: 'Next 15 aur 16 ka ek badlaav jispe log phasate hain. Server Component se ssr false nahi de sakte — ye option sirf client pe matlab rakhta hai. Dynamic import ko kisi Client Component wrapper mein le jao.',
      },
    },
    {
      heading: { en: 'It is not needed for a Server Component', hi: 'Server Component ke liye iski zaroorat nahi' },
      body: {
        en: 'The point people miss. A Server Component already ships no JavaScript, so there is nothing to split. If a heavy library is only used to produce markup, moving it to the server removes it entirely — which beats lazy loading it.',
        hi: 'Wo baat jo log chookte hain. Server Component pehle se koi JavaScript nahi bhejta, toh baantne ko kuch hai hi nahi. Agar koi bhaari library sirf markup banane ke liye hai, toh usse server pe le jaana usse poori tarah hata deta hai — jo lazy load karne se behtar hai.',
      },
    },
    {
      heading: { en: 'Give it a loading state the right shape', hi: 'Usse sahi shakl wala loading state do' },
      body: {
        en: 'The chunk is fetched over the network, so there is a visible gap. A skeleton matching the real dimensions avoids a layout shift the moment it arrives, which is the same discipline as a Suspense fallback.',
        hi: 'Chunk network se aata hai, toh ek dikhne wala gap hota hai. Asli size jaisa skeleton uske aate hi layout shift se bacha leta hai, aur ye wahi anushaasan hai jo Suspense fallback ka hai.',
      },
    },
    {
      heading: { en: 'And do not split everything', hi: 'Aur har cheez ko mat baanto' },
      body: {
        en: 'Each dynamic import is an extra network request at the moment the user needs the component. Splitting a five-kilobyte component trades a small bundle saving for a visible delay. Split what the analyser shows is large.',
        hi: 'Har dynamic import us pal ek extra network request hai jab user ko component chahiye. Paanch kilobyte ka component baantna chhoti bundle bachat ke badle dikhne wali deri deta hai. Wahi baanto jo analyser bada dikhaye.',
      },
    },
  ],

  'How do you handle environment variables in Next.js?': [
    {
      heading: { en: 'The NEXT_PUBLIC prefix is the whole rule', hi: 'Poora rule NEXT_PUBLIC prefix hai' },
      body: {
        en: 'A variable without the prefix is server-only and never reaches the browser. A variable with it is inlined into the client bundle at build time and is therefore public. That one prefix is the security boundary.',
        hi: 'Bina prefix wala variable sirf server ka hai aur browser tak kabhi nahi jaata. Prefix wala build ke waqt client bundle mein daal diya jaata hai aur isliye public hai. Wahi ek prefix suraksha ki seema hai.',
      },
      code: `DATABASE_URL=…                    // server only
NEXT_PUBLIC_ANALYTICS_ID=…         // in the browser bundle, public`,
    },
    {
      heading: { en: 'Public means public, permanently', hi: 'Public matlab public, hamesha ke liye' },
      body: {
        en: 'The value is baked into the JavaScript at build time, so anyone can read it in devtools. Putting an API secret behind NEXT_PUBLIC because "the code is minified" is the mistake this question is looking for.',
        hi: 'Value build ke waqt JavaScript mein pak jaati hai, toh koi bhi usse devtools mein padh sakta hai. "Code minified hai" soch kar NEXT_PUBLIC ke peeche API secret rakhna wahi galti hai jo ye sawaal dhoondh raha hai.',
      },
    },
    {
      heading: { en: 'Inlined at build, not read at runtime', hi: 'Build pe daala jaata hai, runtime pe padha nahi' },
      body: {
        en: 'The consequence that surprises people in Docker. A NEXT_PUBLIC value is substituted during next build, so changing it in the container environment afterwards does nothing — you must rebuild, or pass it at build time.',
        hi: 'Docker mein logon ko chaunkane wala nateeja. NEXT_PUBLIC ki value next build ke dauraan bhar di jaati hai, toh baad mein container ke environment mein badalne se kuch nahi hota — rebuild karo, ya build ke waqt do.',
      },
    },
    {
      heading: { en: 'Server variables are read at runtime', hi: 'Server ke variables runtime pe padhe jaate hain' },
      body: {
        en: 'A non-prefixed variable is read from process.env when the server code runs, so it can differ per environment with the same image. That asymmetry between the two kinds is worth stating clearly.',
        hi: 'Bina prefix wala variable tab process.env se padha jaata hai jab server code chalta hai, toh wahi image alag environments mein alag value le sakti hai. Dono prakaar ka ye antar saaf batana chahiye.',
      },
    },
    {
      heading: { en: 'Validate at startup', hi: 'Shuruaat mein validate karo' },
      body: {
        en: 'The habit that pays for itself. Parse the whole environment through a schema at boot so a missing DATABASE_URL crashes with a clear message rather than appearing as undefined inside a connection string under load.',
        hi: 'Wo aadat jo apni keemat vasool karti hai. Boot pe poore environment ko schema se parse karo taaki gayab DATABASE_URL saaf message ke saath crash kare, load mein kisi connection string ke andar undefined ban kar na aaye.',
      },
      code: `export const env = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
}).parse(process.env);`,
    },
    {
      heading: { en: 'The file loading order', hi: 'Files load hone ka kram' },
      body: {
        en: 'Next.js loads .env.local, then .env.development or .env.production, then .env, with earlier ones winning. .env.local is gitignored by default and is where your personal values belong; .env holds committed defaults with no secrets.',
        hi: 'Next.js pehle .env.local, phir .env.development ya .env.production, phir .env load karta hai, aur pehle wale jeetate hain. .env.local default se gitignored hai aur tumhari apni values wahan hain; .env mein commit hone wale defaults hain, secrets nahi.',
      },
    },
    {
      heading: { en: 'And use server-only as a backstop', hi: 'Aur server-only ko suraksha ki tarah lo' },
      body: {
        en: 'Importing the server-only package in a module that reads a secret makes the build fail if a Client Component ever imports it. That turns an accidental secret leak into an error you cannot ship.',
        hi: 'Jo module secret padhta hai usme server-only package import karo toh koi Client Component usse import kare tab build fail ho jaata hai. Isse galti se hua secret leak aisa error ban jaata hai jise tum bhej hi nahi sakte.',
      },
    },
  ],

  'What is the difference between generateStaticParams and getStaticPaths?': [
    {
      heading: { en: 'The same job, in the two routers', hi: 'Wahi kaam, do routers mein' },
      body: {
        en: 'Both tell Next.js which values of a dynamic segment to prerender at build time. getStaticPaths is the Pages Router version; generateStaticParams is the App Router replacement.',
        hi: 'Dono Next.js ko batate hain ki dynamic segment ki kaunsi values build ke waqt prerender karni hain. getStaticPaths Pages Router wala roop hai; generateStaticParams App Router ka naya roop.',
      },
      code: `// pages/blog/[slug].jsx
export async function getStaticPaths() {
  return { paths: posts.map((p) => ({ params: { slug: p.slug } })),
           fallback: 'blocking' };
}

// app/blog/[slug]/page.jsx
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}`,
    },
    {
      heading: { en: 'The return shape is simpler', hi: 'Return ki shakl simple hai' },
      body: {
        en: 'getStaticPaths returns an object with a paths array of nested params objects and a fallback field. generateStaticParams returns a flat array of param objects and nothing else — the fallback behaviour moved to a separate config.',
        hi: 'getStaticPaths ek object deta hai jisme nested params objects ka paths array aur ek fallback field hota hai. generateStaticParams sirf param objects ka seedha array deta hai — fallback wala behaviour alag config mein chala gaya.',
      },
    },
    {
      heading: { en: 'fallback became dynamicParams', hi: 'fallback, dynamicParams ban gaya' },
      body: {
        en: 'The behaviour for a value you did not prerender is now a boolean segment export. True — the default — renders it on demand and caches it, matching the old fallback blocking. False returns a 404, matching fallback false.',
        hi: 'Jo value tumne prerender nahi ki uska behaviour ab ek boolean segment export hai. True — jo default hai — usse zaroorat pe render karke cache karta hai, purane fallback blocking jaisa. False 404 deta hai, fallback false jaisa.',
      },
      code: `export const dynamicParams = false;      // 404 for anything not listed`,
    },
    {
      heading: { en: 'It pairs with the page, not replaces it', hi: 'Ye page ke saath chalta hai, uski jagah nahi' },
      body: {
        en: 'A difference worth noting. getStaticPaths worked alongside getStaticProps, which fetched the data. generateStaticParams only lists the params — the page itself is an async component that fetches, and the two fetches are deduplicated.',
        hi: 'Ek batane laayak farq. getStaticPaths, getStaticProps ke saath chalta tha jo data laata tha. generateStaticParams sirf params batata hai — page khud ek async component hai jo fetch karta hai, aur dono fetches ek hi maani jaati hain.',
      },
    },
    {
      heading: { en: 'Nested segments compose', hi: 'Nested segments judte hain' },
      body: {
        en: 'For a route with two dynamic segments, a parent generateStaticParams runs first and the child receives each parent value, generating combinations. That composition had no clean equivalent in the Pages Router.',
        hi: 'Do dynamic segments wale route mein parent ka generateStaticParams pehle chalta hai aur bachche ko har parent value milti hai, jisse jodiyaan banti hain. Pages Router mein is jodne ka koi saaf joda nahi tha.',
      },
    },
    {
      heading: { en: 'And it does not make the route static by itself', hi: 'Aur ye akela route ko static nahi banata' },
      body: {
        en: 'The caveat. If the page also reads cookies or headers, the route is dynamic regardless of the params you generated. Check the build output rather than assuming the export was enough.',
        hi: 'Chetavni. Agar page cookies ya headers bhi padhta hai, toh tumhare generate kiye params ke bawajood route dynamic hai. Ye maan lene ki jagah ki export kaafi tha, build output dekho.',
      },
    },
  ],

  'What is the difference between revalidatePath and revalidateTag?': [
    {
      heading: { en: 'By URL versus by label', hi: 'URL se vs label se' },
      body: {
        en: 'revalidatePath invalidates the cache for a specific route. revalidateTag invalidates every cache entry carrying that tag, wherever it is used. One is location-based, the other is data-based.',
        hi: 'revalidatePath kisi khaas route ka cache invalidate karta hai. revalidateTag us tag wali har cache entry ko, wo jahan bhi use ho. Ek jagah pe hai, doosra data pe.',
      },
      code: `revalidatePath('/blog/hello-world');
revalidateTag('posts');`,
    },
    {
      heading: { en: 'Tags scale, paths do not', hi: 'Tags scale karte hain, paths nahi' },
      body: {
        en: 'The argument for tags. One post appears on its own page, the index, the sitemap and the author page. Tagging the data invalidates all four with one call; with paths you must list every route and remember to update the list.',
        hi: 'Tags ke haq mein tark. Ek post apne page pe, index pe, sitemap pe aur author page pe dikhti hai. Data pe tag lagao toh ek call chaaron invalidate kar deti hai; paths ke saath har route ginana aur list update karna yaad rakhna padta hai.',
      },
    },
    {
      heading: { en: 'How a tag gets attached', hi: 'Tag lagta kaise hai' },
      body: {
        en: 'In the legacy model you pass next.tags to a fetch. With Cache Components you call cacheTag inside a `use cache` scope, which also covers non-fetch work such as a direct database query.',
        hi: 'Purane model mein tum fetch ko next.tags dete ho. Cache Components ke saath tum `use cache` ke andar cacheTag bulaate ho, jo bina fetch wale kaam — jaise seedhi database query — ko bhi cover karta hai.',
      },
      code: `export async function getPosts() {
  'use cache';
  cacheTag('posts');
  return db.posts.findMany();
}`,
    },
    {
      heading: { en: 'revalidatePath can take a type', hi: 'revalidatePath ek type bhi le sakta hai' },
      body: {
        en: 'A second argument of page or layout. Passing layout invalidates the layout and everything below it, which is how you refresh a whole section. Without it, only that exact path is affected.',
        hi: 'Doosra argument page ya layout. layout do toh wo layout aur uske neeche ka sab invalidate hota hai, aur aise hi poora section taaza karte ho. Bina uske sirf wahi ek path badalta hai.',
      },
      code: `revalidatePath('/blog', 'layout');      // the whole section`,
    },
    {
      heading: { en: 'Next 16 adds updateTag beside them', hi: 'Next 16 inke saath updateTag jodta hai' },
      body: {
        en: 'The current distinction. revalidateTag is stale-while-revalidate — fast, but the user who made the change may briefly see the old content. updateTag expires immediately for read-your-own-writes, and works only in a Server Action.',
        hi: 'Aaj ka farq. revalidateTag stale-while-revalidate hai — tez, par jisne badlaav kiya use thodi der purana content dikh sakta hai. updateTag turant expire karta hai, apna likha turant dikhane ke liye, aur sirf Server Action mein chalta hai.',
      },
      code: `revalidateTag('posts', 'max');    // background refresh, stale served
updateTag('posts');                // immediate, after the user's own write`,
    },
    {
      heading: { en: 'Both run on the server only', hi: 'Dono sirf server pe chalte hain' },
      body: {
        en: 'They must be called from a Server Action or a Route Handler — there is no client equivalent. Note also that neither returns a promise you should await for the data; they mark the cache and return.',
        hi: 'Inhe Server Action ya Route Handler se hi bulana padta hai — client mein iska koi joda nahi. Ye bhi dhyaan do ki koi bhi aisa promise nahi deta jise data ke liye await karo; ye cache pe nishaan laga kar laut jaate hain.',
      },
    },
    {
      heading: { en: 'The rule', hi: 'Rule' },
      body: {
        en: '"Tags by default, because the invalidation follows the data rather than a list of URLs I have to maintain. revalidatePath when I genuinely mean one route — after a mutation that affects only that page."',
        hi: '"Default tags, kyunki invalidation URLs ki us list ke bajaye data ke peeche chalti hai jise mujhe sambhalna pade. revalidatePath tab jab sach mein ek hi route ki baat ho — aise mutation ke baad jo sirf us page pe asar kare."',
      },
    },
  ],

  'How do you deal with a request waterfall in Next.js?': [
    {
      heading: { en: 'A waterfall is sequential work that could be parallel', hi: 'Waterfall wo kramwar kaam hai jo parallel ho sakta tha' },
      body: {
        en: 'Each request starts only after the previous one finished, so the total time is the sum rather than the maximum. Three three-hundred-millisecond calls become nine hundred milliseconds instead of three hundred.',
        hi: 'Har request pichhli ke khatam hone ke baad hi shuru hoti hai, toh kul samay adhiktam nahi, jod ban jaata hai. Teen sau millisecond wali teen calls teen sau ki jagah nau sau millisecond ho jaati hain.',
      },
      diagram: `waterfall  [──A──][──B──][──C──]   900ms
parallel   [──A──]
           [──B──]                 300ms
           [──C──]`,
    },
    {
      heading: { en: 'Cause one: sequential awaits in one component', hi: 'Wajah ek: ek component mein kramwar awaits' },
      body: {
        en: 'The easiest to fix and the most common. If the calls do not depend on each other, start them all and await once with Promise.all. Only keep them sequential when the second genuinely needs the first result.',
        hi: 'Sabse aasaan aur sabse aam. Agar calls ek doosre pe nirbhar nahi hain, toh sab shuru karo aur Promise.all se ek baar await karo. Kramwar tabhi rakho jab doosre ko sach mein pehle ka nateeja chahiye.',
      },
      code: `const user = await getUser(id);
const posts = await getPosts(id);          // ✗ waits for user

const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);   // ✓`,
    },
    {
      heading: { en: 'Cause two: nested components fetching in turn', hi: 'Wajah do: nested components baari-baari fetch karte hue' },
      body: {
        en: 'A parent awaits, renders a child, and the child awaits. The child cannot start until the parent finished, so the tree depth becomes the request depth. This is the waterfall Server Components can still create.',
        hi: 'Parent await karta hai, bachcha render karta hai, aur bachcha await karta hai. Bachcha tab tak shuru nahi hota jab tak parent khatam na ho, toh tree ki gehraai hi requests ki gehraai ban jaati hai. Server Components ye waterfall ab bhi bana sakte hain.',
      },
    },
    {
      heading: { en: 'Fix: start the fetch early, await late', hi: 'Ilaaj: fetch jaldi shuru, await der se' },
      body: {
        en: 'Call the function without awaiting in the parent and pass the promise down. The request is in flight while the parent renders, and the child awaits a promise that has already been running.',
        hi: 'Parent mein bina await kiye function bulao aur promise neeche bhejo. Parent ke render hote waqt request chal rahi hoti hai, aur bachcha aise promise ko await karta hai jo pehle se chal raha tha.',
      },
      code: `const postsPromise = getPosts(id);       // started, not awaited
const user = await getUser(id);
return <Posts promise={postsPromise} />;   // child awaits it`,
    },
    {
      heading: { en: 'Or break the dependency with Suspense', hi: 'Ya Suspense se nirbharta todo' },
      body: {
        en: 'Put the slow child in its own Suspense boundary. The parent renders and streams immediately, and the child fetches in parallel behind a fallback rather than blocking the whole page.',
        hi: 'Dheeme bachche ko apni Suspense boundary mein rakho. Parent turant render aur stream ho jaata hai, aur bachcha poora page rokne ki jagah fallback ke peeche parallel mein fetch karta hai.',
      },
    },
    {
      heading: { en: 'Cause three: the client-side waterfall', hi: 'Wajah teen: client-side waterfall' },
      body: {
        en: 'A Client Component that fetches in an effect cannot start until the JavaScript has loaded and hydrated, and a nested one waits again. Moving the fetch to a Server Component removes both round trips.',
        hi: 'Jo Client Component effect mein fetch karta hai wo tab tak shuru nahi hota jab tak JavaScript load aur hydrate na ho, aur nested wala phir intezaar karta hai. Fetch ko Server Component mein le jaana dono chakkar hata deta hai.',
      },
    },
    {
      heading: { en: 'And deduplicate rather than thread props', hi: 'Aur props piroene ki jagah dohraav hatao' },
      body: {
        en: 'Sometimes the waterfall is really a duplicate. Wrapping the data function in React cache lets two components each ask for the same record while only one query runs, so you do not need to fetch in the parent purely to pass it down.',
        hi: 'Kabhi waterfall asal mein dohraav hota hai. Data function ko React cache mein lapetne se do components wahi record maang sakte hain aur query ek hi chalti hai, toh sirf neeche bhejne ke liye parent mein fetch karne ki zaroorat nahi.',
      },
    },
  ],

  'How do you deploy a Next.js app outside Vercel?': [
    {
      heading: { en: 'Three shapes, depending on what you use', hi: 'Teen roop, is baat pe ki tum kya use karte ho' },
      body: {
        en: 'A static export if the app has no server features. A Node server in a container for the normal case. Or a platform adapter for a serverless host. Which one is available depends on the features you rely on.',
        hi: 'Agar app mein koi server feature nahi hai toh static export. Aam case mein container mein Node server. Ya serverless host ke liye koi platform adapter. Kaunsa mil sakta hai ye tumhare use kiye features pe hai.',
      },
      diagram: `output: 'export'     static files → any CDN — no SSR, no ISR, no actions
output: 'standalone' Node server → Docker, ECS, Cloud Run, a VM
adapter              serverless → Netlify, AWS, Cloudflare`,
    },
    {
      heading: { en: 'standalone is the one you usually want', hi: 'Aam taur pe standalone hi chahiye hota hai' },
      body: {
        en: 'Setting output to standalone makes the build emit a minimal server with only the dependencies it actually traced. The Docker image drops from something like a gigabyte to a couple of hundred megabytes.',
        hi: 'output ko standalone karo toh build ek chhota server nikaalta hai jisme sirf wahi dependencies hain jo sach mein chahiye. Docker image lagbhag ek gigabyte se do sau megabyte pe aa jaati hai.',
      },
      code: `// next.config.ts
export default { output: 'standalone' };

// Dockerfile — copy .next/standalone, .next/static and public
CMD ["node", "server.js"]`,
    },
    {
      heading: { en: 'Static export gives up a lot', hi: 'Static export bahut kuch chhod deta hai' },
      body: {
        en: 'No SSR, no ISR, no Server Actions, no route handlers, no image optimisation and no Proxy. It is right for documentation or a marketing site and wrong for anything with a server-side feature — the build will tell you which one you used.',
        hi: 'Na SSR, na ISR, na Server Actions, na route handlers, na image optimisation, na Proxy. Documentation ya marketing site ke liye theek hai aur kisi bhi server-side feature wali cheez ke liye galat — build bata dega tumne kaunsa use kiya.',
      },
    },
    {
      heading: { en: 'ISR needs a shared cache when you scale', hi: 'Scale pe ISR ko saanjha cache chahiye' },
      body: {
        en: 'The operational catch people hit first. Each instance writes regenerated pages to its own local disk, so with several containers one serves fresh content and another stale. Configure a custom cache handler backed by Redis or S3.',
        hi: 'Operational pech jispe log pehle takraate hain. Har instance apne local disk pe banaye pages likhta hai, toh kai containers mein ek naya content deta hai aur doosra purana. Redis ya S3 wala custom cache handler set karo.',
      },
      code: `export default { cacheHandler: require.resolve('./cache-handler.js') };`,
    },
    {
      heading: { en: 'Image optimisation needs sharp and CPU', hi: 'Image optimisation ko sharp aur CPU chahiye' },
      body: {
        en: 'On a self-hosted deployment the transformation runs in your process. Install sharp, give the container headroom, and cap the allowed sizes — or configure an external loader and let a CDN do it instead.',
        hi: 'Khud host karo toh roop badalna tumhare process mein hota hai. sharp install karo, container ko jagah do, aur allowed sizes seemit karo — ya bahari loader set karke CDN se karwao.',
      },
    },
    {
      heading: { en: 'And the deployment details that catch people', hi: 'Aur wo deployment ki baatein jo logon ko pakadti hain' },
      body: {
        en: 'NEXT_PUBLIC values are inlined at build time, so they must be passed to the build rather than the container. Set NODE_ENV to production. And a build id that differs between instances breaks asset loading during a rolling deploy — pin it.',
        hi: 'NEXT_PUBLIC ki values build ke waqt bhar jaati hain, toh unhe container ko nahi, build ko dena hota hai. NODE_ENV production rakho. Aur instances ke beech alag build id rolling deploy mein assets tod deti hai — usse tay kar do.',
      },
    },
    {
      heading: { en: 'The honest summary', hi: 'Imaandaar saaraansh' },
      body: {
        en: '"A standalone build in a container covers almost everything, and it is what I would reach for. The parts that need attention are ISR with a shared cache handler, image optimisation, and remembering that public env vars are baked in at build time."',
        hi: '"Container mein standalone build lagbhag sab kuch cover karta hai, aur main wahi uthaunga. Dhyaan un hisson pe chahiye: saanjhe cache handler ke saath ISR, image optimisation, aur ye yaad rakhna ki public env vars build ke waqt hi pak jaate hain."',
      },
    },
  ],

  'What is Partial Prerendering?': [
    {
      heading: { en: 'One route that is both static and dynamic', hi: 'Ek route jo static bhi hai aur dynamic bhi' },
      body: {
        en: 'PPR breaks the old choice between a fully static route and a fully dynamic one. A static shell is prerendered and served instantly, and the personalised parts stream into it in the same response.',
        hi: 'PPR poore static aur poore dynamic route ke beech ka purana chunav tod deta hai. Ek sthir dhaancha pehle se ban kar turant milta hai, aur personalised hisse usi response mein usme stream ho jaate hain.',
      },
      diagram: `first byte:  header, nav, product layout   ← prerendered shell
streamed in: your cart, your price          ← per request`,
    },
    {
      heading: { en: 'The problem it solves', hi: 'Ye kaunsi problem hal karta hai' },
      body: {
        en: 'Before PPR, one personalised element made an entire route dynamic. A product page with a cart badge in the header could not be static at all, even though ninety-nine per cent of it was the same for everyone.',
        hi: 'PPR se pehle ek personalised element poore route ko dynamic bana deta tha. Header mein cart badge wala product page bilkul static nahi ho sakta tha, jabki uska ninyaanve pratishat sab ke liye ek jaisa tha.',
      },
    },
    {
      heading: { en: 'Suspense is the boundary between the two', hi: 'Dono ke beech ki seema Suspense hai' },
      body: {
        en: 'Everything outside a Suspense boundary that can be resolved at build time becomes the shell. Everything inside one is deferred to request time. The boundary is not a hint — it is the actual dividing line.',
        hi: 'Suspense boundary ke bahar jo bhi build ke waqt tay ho sake wo dhaancha ban jaata hai. Andar ka sab request ke waqt pe taal diya jaata hai. Boundary koi ishara nahi — wahi asli baantne wali rekha hai.',
      },
      code: `export default function Page() {
  return (
    <>
      <ProductDetails />                 {/* prerendered */}
      <Suspense fallback={<CartSkeleton />}>
        <Cart />                         {/* reads cookies — streamed */}
      </Suspense>
    </>
  );
}`,
    },
    {
      heading: { en: 'In Next 16 it is the default with Cache Components', hi: 'Next 16 mein Cache Components ke saath ye default hai' },
      body: {
        en: 'The update that matters. PPR was an experimental flag for a long time. With cacheComponents enabled it is simply how rendering works, and there is no separate flag to turn on.',
        hi: 'Wo update jo maayne rakhta hai. PPR lambe samay tak experimental flag tha. cacheComponents chaalu ho toh rendering aise hi hoti hai, aur alag se koi flag chaalu nahi karna padta.',
      },
    },
    {
      heading: { en: 'The build enforces the boundaries', hi: 'Build seemayein lagoo karta hai' },
      body: {
        en: 'This is what makes it workable rather than subtle. If a component reads uncached or request-time data and is not inside a Suspense boundary or marked `use cache`, the build fails with an explicit error naming the problem — instead of silently making the route dynamic.',
        hi: 'Isi se ye sookshm nahi, kaam ka banta hai. Agar koi component bina cache wala ya request-time data padhe aur wo na Suspense boundary mein ho na `use cache` se mark ho, toh build saaf error deta hai jo problem ka naam bataata hai — route ko chup-chaap dynamic banane ki jagah.',
      },
    },
    {
      heading: { en: 'One shell for everyone', hi: 'Sab ke liye ek dhaancha' },
      body: {
        en: 'The shell is generated once at build time and served from the CDN to every visitor, so it must contain nothing personalised. Anything that differs per user has to be behind a boundary — that is the constraint you design around.',
        hi: 'Dhaancha build ke waqt ek baar banta hai aur CDN se har visitor ko milta hai, toh usme kuch bhi personalised nahi hona chahiye. Jo bhi har user ke liye alag ho wo boundary ke peeche jaana chahiye — design isi bandhan ke aas-paas hota hai.',
      },
    },
    {
      heading: { en: 'And it needs a host that streams', hi: 'Aur isse stream karne wala host chahiye' },
      body: {
        en: 'Worth mentioning for a self-hosted deployment. The benefit depends on the platform sending a chunked response and on a CDN that does not buffer the whole thing before forwarding it.',
        hi: 'Khud host karne walon ke liye batane laayak. Fayda is baat pe hai ki platform chunked response bheje aur CDN poora response jama karke aage bhejne ki jagah stream kare.',
      },
    },
  ],

  'How do you handle forms in the App Router?': [
    {
      heading: { en: 'A Server Action as the form action', hi: 'Form ke action mein ek Server Action' },
      body: {
        en: 'Pass the function directly to the form\'s action prop. It receives FormData, runs on the server, and works before JavaScript has loaded — that is progressive enhancement, and it is the reason to prefer this over an onSubmit handler.',
        hi: 'Function ko seedha form ke action prop mein do. Usse FormData milta hai, wo server pe chalta hai, aur JavaScript load hone se pehle bhi chalta hai — yahi progressive enhancement hai, aur isse onSubmit handler se behtar maanne ki wajah bhi.',
      },
      code: `'use server';
export async function createPost(formData) {
  const title = formData.get('title');
  await db.posts.create({ title });
  revalidatePath('/posts');
}

<form action={createPost}>
  <input name="title" />
</form>`,
    },
    {
      heading: { en: 'useActionState for the result and pending', hi: 'Nateeja aur pending ke liye useActionState' },
      body: {
        en: 'It wraps the action and returns the last result, a wrapped action and a pending boolean. That gives you validation errors on the page and a disabled button while it runs, without any manual state.',
        hi: 'Wo action ko lapetta hai aur pichhla nateeja, lapeta hua action aur ek pending boolean deta hai. Isse page pe validation errors aur chalte waqt band button mil jaata hai, bina koi state khud rakhe.',
      },
      code: `'use client';
const [state, action, pending] = useActionState(createPost, null);

<form action={action}>
  <input name="title" />
  {state?.error && <p>{state.error}</p>}
  <button disabled={pending}>Save</button>
</form>`,
    },
    {
      heading: { en: 'Validate on the server, always', hi: 'Hamesha server pe validate karo' },
      body: {
        en: 'Client validation is a convenience for the user, not a guarantee. The action is a public POST endpoint, so parse the FormData through a schema inside it and return the errors as the action\'s result.',
        hi: 'Client ki validation user ki suvidha hai, guarantee nahi. Action ek public POST endpoint hai, toh uske andar FormData ko schema se parse karo aur errors ko action ke nateeje ki tarah lauta do.',
      },
      code: `const parsed = CreatePost.safeParse(Object.fromEntries(formData));
if (!parsed.success) return { error: 'Title is required' };`,
    },
    {
      heading: { en: 'useFormStatus for a nested submit button', hi: 'Nested submit button ke liye useFormStatus' },
      body: {
        en: 'A separate button component cannot see the parent\'s pending state through props without threading it. useFormStatus reads it from the enclosing form — but it only works in a component INSIDE the form, not the one that renders it.',
        hi: 'Alag button component parent ki pending state props se nahi dekh sakta jab tak piroya na jaaye. useFormStatus usse ghere hue form se padh leta hai — par ye sirf form ke ANDAR wale component mein chalta hai, usme nahi jo form render karta hai.',
      },
    },
    {
      heading: { en: 'Revalidate or redirect after the mutation', hi: 'Mutation ke baad revalidate ya redirect karo' },
      body: {
        en: 'Without it the page shows the cached pre-mutation data and the user thinks the save failed. In Next 16, updateTag is the right call after the user\'s own write because it expires immediately rather than serving stale content.',
        hi: 'Iske bina page mutation se pehle wala cached data dikhata hai aur user ko lagta hai save fail ho gaya. Next 16 mein user ke apne write ke baad updateTag sahi hai kyunki wo purana content dene ki jagah turant expire karta hai.',
      },
      code: `updateTag('posts');
redirect('/posts');`,
    },
    {
      heading: { en: 'Reset and optimistic updates', hi: 'Reset aur optimistic updates' },
      body: {
        en: 'A form with an action resets automatically on success when it is uncontrolled. For instant feedback, useOptimistic renders the expected result immediately and rolls back if the action fails.',
        hi: 'Uncontrolled form action ke saath safalta pe apne aap reset ho jaata hai. Turant feedback ke liye useOptimistic ummeed wala nateeja turant dikha deta hai aur action fail ho toh wapas le leta hai.',
      },
    },
    {
      heading: { en: 'And check auth inside the action', hi: 'Aur action ke andar auth jaancho' },
      body: {
        en: 'The point that closes the loop. The action is reachable by a direct POST regardless of whether the form rendered, so protecting the page protects nothing. Verify the session in the action itself, every time.',
        hi: 'Wo baat jo chakkar poora karti hai. Form render hua ho ya nahi, action seedhi POST se pahuncha ja sakta hai, toh page bachaane se kuch nahi bachta. Har baar action ke andar hi session jaancho.',
      },
    },
  ],

  'What is the difference between useRouter in the App Router and the Pages Router?': [
    {
      heading: { en: 'Different package, smaller surface', hi: 'Alag package, chhota surface' },
      body: {
        en: 'In pages/ it comes from next/router and carries the route state — pathname, query, asPath — as well as the navigation methods. In app/ it comes from next/navigation and only has the methods.',
        hi: 'pages/ mein ye next/router se aata hai aur route ki state rakhta hai — pathname, query, asPath — aur navigation ke methods bhi. app/ mein ye next/navigation se aata hai aur usme sirf methods hain.',
      },
      code: `import { useRouter } from 'next/router';       // pages/
import { useRouter } from 'next/navigation';   // app/`,
    },
    {
      heading: { en: 'The state moved to separate hooks', hi: 'State alag hooks mein chali gayi' },
      body: {
        en: 'This is the actual answer. router.pathname becomes usePathname, router.query splits into useSearchParams and useParams. Each is a focused hook, so a component only subscribes to the part it reads.',
        hi: 'Asli jawab yahi hai. router.pathname ab usePathname hai, router.query useSearchParams aur useParams mein bant gaya. Har ek alag hook hai, toh component sirf usi hisse ko subscribe karta hai jo wo padhta hai.',
      },
      diagram: `pages/                    app/
router.pathname           usePathname()
router.query (params)     useParams()
router.query (search)     useSearchParams()
router.push/replace       useRouter().push/replace`,
    },
    {
      heading: { en: 'Importing the wrong one throws', hi: 'Galat wala import karo toh error aata hai' },
      body: {
        en: 'Using next/router inside app/ produces a runtime error telling you the router is not mounted. It is a common migration bug, and the error message is at least explicit about the cause.',
        hi: 'app/ ke andar next/router use karo toh runtime error aata hai jo bataata hai ki router mounted nahi hai. Migration ka ye aam bug hai, aur error message kam se kam wajah saaf bata deta hai.',
      },
    },
    {
      heading: { en: 'The methods changed too', hi: 'Methods bhi badle' },
      body: {
        en: 'push and replace remain but events, beforePopState and the isReady flag are gone. refresh is new — it re-fetches the current route from the server without losing client state, which is how you update after a mutation.',
        hi: 'push aur replace hain par events, beforePopState aur isReady flag chale gaye. refresh naya hai — wo client state khoye bina maujooda route ko server se dobara laata hai, aur mutation ke baad aise hi update karte ho.',
      },
      code: `router.refresh();      // re-fetch the server data, keep client state`,
    },
    {
      heading: { en: 'These are all Client Component hooks', hi: 'Ye sab Client Component ke hooks hain' },
      body: {
        en: 'Any of them requires "use client". In a Server Component you read params and searchParams from the page props instead — and remember they are async, so you await them.',
        hi: 'Inme se kisi ke liye bhi "use client" chahiye. Server Component mein tum params aur searchParams page ke props se padhte ho — aur yaad rakho wo async hain, toh unhe await karo.',
      },
      code: `export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const { q } = await searchParams;
}`,
    },
    {
      heading: { en: 'And useSearchParams forces a Suspense boundary', hi: 'Aur useSearchParams Suspense boundary maangta hai' },
      body: {
        en: 'A detail that fails the build rather than the runtime. Because it depends on the request, a component using useSearchParams must be inside a Suspense boundary or the route cannot be prerendered. The build error names the component.',
        hi: 'Ek baat jo runtime nahi, build fail karti hai. Wo request pe nirbhar hai, isliye useSearchParams wala component Suspense boundary mein hona chahiye warna route prerender nahi ho sakta. Build ka error component ka naam bata deta hai.',
      },
    },
  ],

  'When should you use Next.js instead of plain React?': [
    {
      heading: { en: 'When you need a server at all', hi: 'Jab tumhe server chahiye hi ho' },
      body: {
        en: 'Plain React with Vite is a client bundle — there is no server rendering, no routing and no backend. The moment you need any of those, you are either adopting a framework or building one badly.',
        hi: 'Vite wala saada React ek client bundle hai — na server rendering, na routing, na backend. Jis pal inme se kuch chahiye, tum ya toh framework apna rahe ho ya usse kharaab tareeke se bana rahe ho.',
      },
    },
    {
      heading: { en: 'SEO and the first paint', hi: 'SEO aur pehla paint' },
      body: {
        en: 'A client-rendered app sends an empty div and fills it after the JavaScript loads. For a marketing site, a blog, an e-commerce catalogue or anything a crawler or a link preview must read, server rendering is the whole point.',
        hi: 'Client-rendered app ek khaali div bhejta hai aur JavaScript load hone ke baad usse bharta hai. Marketing site, blog, e-commerce catalogue ya kisi bhi aisi cheez ke liye jise crawler ya link preview padhna hai, server rendering hi asli baat hai.',
      },
    },
    {
      heading: { en: 'The bundle argument', hi: 'Bundle wala tark' },
      body: {
        en: 'The strongest technical reason today. Server Components let a page ship no JavaScript for the parts that are not interactive, including the libraries they import. Plain React ships everything to the browser by definition.',
        hi: 'Aaj sabse mazboot takneeki wajah. Server Components kisi page ko un hisson ke liye koi JavaScript na bhejne dete hain jo interactive nahi hain, unki libraries samet. Saada React paribhasha se hi sab kuch browser tak bhejta hai.',
      },
    },
    {
      heading: { en: 'What you get without assembling it', hi: 'Jo bina jode mil jaata hai' },
      body: {
        en: 'Routing, data fetching, caching, image and font optimisation, a bundler already configured, and a place to put backend code. With plain React each of those is a decision, a dependency and something to keep upgrading.',
        hi: 'Routing, data fetching, caching, image aur font optimisation, pehle se set bundler, aur backend code rakhne ki jagah. Saade React mein inme se har ek ek faisla, ek dependency aur upgrade karte rehne wali cheez hai.',
      },
    },
    {
      heading: { en: 'When plain React is the right answer', hi: 'Saada React kab sahi jawab hai' },
      body: {
        en: 'Be specific here, because it is what makes the answer credible. An internal dashboard behind a login where SEO is irrelevant. A component library. An Electron or embedded app with no server. Or a highly interactive tool where every screen is dynamic anyway.',
        hi: 'Yahan saaf raho, kyunki isi se jawab bharosemand banta hai. Login ke peeche ka internal dashboard jahan SEO bemaani hai. Component library. Bina server wala Electron ya embedded app. Ya bahut interactive tool jahan har screen waise bhi dynamic hai.',
      },
    },
    {
      heading: { en: 'And name the costs', hi: 'Aur keematein batao' },
      body: {
        en: 'A build step and a server to run and pay for. A genuinely steep learning curve around the server-client boundary and caching. And a framework that changes fast — the middleware-to-proxy rename and the new caching model in Next 16 are recent examples.',
        hi: 'Ek build step aur ek server jise chalana aur uska paisa dena hai. Server-client boundary aur caching ke aas-paas sach mein mushkil seekhne ki chadhaai. Aur ek framework jo tezi se badalta hai — middleware se proxy naam badalna aur Next 16 ka naya caching model haal ki misaalein hain.',
      },
    },
    {
      heading: { en: 'The judgement to state', hi: 'Batane laayak faisla' },
      body: {
        en: '"Next.js when the app is public-facing, content-heavy, or needs a backend — the SEO, first paint and bundle benefits are real. Plain React for an internal tool behind a login, a library, or anything with no server. It is a question about the product, not about which is better."',
        hi: '"Next.js tab jab app public ho, content wala ho, ya usse backend chahiye — SEO, pehla paint aur bundle ke faayde asli hain. Login ke peeche ke internal tool, kisi library, ya bina server wali cheez ke liye saada React. Ye sawaal product ka hai, ye nahi ki kaun behtar hai."',
      },
    },
  ],
};
