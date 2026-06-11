// Computer Networks curriculum — CS fundamentals.
// Same shape as javascript.mjs, consumed by scripts/seed.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Computer Networks',
  slug: 'computer-networks',
  description:
    'Networking fundamentals — OSI/TCP-IP model, TCP vs UDP, IP & DNS, HTTP/HTTPS aur "how the web works". Interview-ready, English + Hinglish, desi examples ke saath.',
  icon: '🌐',
  tags: ['computer-networks', 'cs-fundamentals', 'interview', 'http', 'tcp-ip'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 23,
};

const beginner = [
  {
    title: 'Network Models',
    level: 'beginner',
    description: 'OSI aur TCP/IP model.',
    concepts: [
      {
        title: 'The OSI & TCP/IP Models',
        difficulty: 'medium',
        tags: ['osi', 'tcp-ip', 'model'],
        explanation: {
          english:
            'Networking is organised into layers, each with one job, so complexity is broken down. The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. The practical TCP/IP model collapses these into 4: Link, Internet (IP), Transport (TCP/UDP), Application (HTTP/DNS). Each layer adds its own header as data goes down (encapsulation) and strips it going up. Layering lets each part evolve independently.',
          hinglish:
            'Networking ko layers mein organise kiya jaata hai, har ek ka ek kaam, taaki complexity tooti rahe. OSI model mein 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. Practical TCP/IP model inhe 4 mein collapse karta hai: Link, Internet (IP), Transport (TCP/UDP), Application (HTTP/DNS). Har layer data neeche jaate apna header add karti hai (encapsulation) aur upar jaate strip karti hai. Layering har part ko independently evolve karne deti hai.',
        },
        dailyLifeExample:
          'Layers ek chitthi bhejne jaisa hai — tum message likhte ho (application), lifaafe mein daalte ho (transport), address lagate ho (network), aur postman pahunchata hai (physical). Har layer ka apna kaam.',
        codeExample:
          '// TCP/IP model (data flows down then up)\n// Application  (HTTP, DNS, SMTP)\n// Transport    (TCP, UDP)        + port numbers\n// Internet     (IP)             + IP addresses\n// Link         (Ethernet, WiFi) + MAC addresses\n// Each layer adds a header (encapsulation).',
        keyPoints: [
          'Layered design: each layer one job',
          'OSI = 7 layers; TCP/IP = 4 layers',
          'Encapsulation: each layer adds a header',
          'Layering enables independent evolution',
        ],
        quiz: [
          {
            question: 'How many layers does the OSI model have?',
            options: ['4', '5', '7', '10'],
            correctIndex: 2,
          },
          {
            question: 'HTTP and DNS operate at which layer?',
            options: ['Physical', 'Transport', 'Application', 'Link'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'IP Addresses & DNS',
        difficulty: 'easy',
        tags: ['ip', 'dns'],
        explanation: {
          english:
            'An IP address uniquely identifies a device on a network (IPv4 like 192.168.1.1, or IPv6 for far more addresses). DNS (Domain Name System) is the "phonebook of the internet" — it translates human-friendly domain names (google.com) into IP addresses. When you visit a site, your computer asks a DNS resolver for the domain\'s IP, then connects to that IP. DNS results are cached at many levels to speed this up.',
          hinglish:
            'IP address ek network pe device ko uniquely identify karta hai (IPv4 jaise 192.168.1.1, ya IPv6 bahut zyada addresses ke liye). DNS (Domain Name System) "internet ki phonebook" hai — ye human-friendly domain names (google.com) ko IP addresses mein translate karta hai. Jab tum site visit karte ho, computer ek DNS resolver se domain ka IP poochta hai, phir us IP se connect karta hai. DNS results kai levels pe cache hote hain speed ke liye.',
        },
        dailyLifeExample:
          'DNS phone ke contacts jaisa hai — tum "Mummy" (domain) dial karte ho, phone number (IP) khud lag jaata hai. Tumhe number yaad rakhne ki zaroorat nahi.',
        codeExample:
          '// You type: google.com\n// 1. Ask DNS resolver: "IP of google.com?"\n// 2. DNS replies: 142.250.x.x\n// 3. Browser connects to that IP\n// (results cached in browser, OS, resolver)',
        keyPoints: [
          'IP address uniquely identifies a device',
          'IPv4 (192.168.x.x) vs IPv6 (more addresses)',
          'DNS = domain name -> IP (internet phonebook)',
          'DNS results are cached for speed',
        ],
        quiz: [
          {
            question: 'DNS translates…',
            options: ['IP to MAC', 'domain names to IP addresses', 'HTTP to HTTPS', 'files to folders'],
            correctIndex: 1,
          },
          {
            question: 'An IP address identifies…',
            options: ['a website\'s colour', 'a device on a network', 'a CSS class', 'a database row'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Transport & Web',
    level: 'intermediate',
    description: 'TCP vs UDP, HTTP/HTTPS.',
    concepts: [
      {
        title: 'TCP vs UDP',
        difficulty: 'medium',
        tags: ['tcp', 'udp', 'transport'],
        explanation: {
          english:
            'TCP and UDP are transport-layer protocols. TCP is connection-oriented and reliable: it sets up a connection (3-way handshake), guarantees ordered, error-checked, retransmitted delivery — used for web, email, file transfer. UDP is connectionless and fast: no handshake, no guarantee of order or delivery, lower overhead — used for live video/voice, gaming, and DNS, where speed matters more than perfection. Choose TCP for correctness, UDP for low latency.',
          hinglish:
            'TCP aur UDP transport-layer protocols hain. TCP connection-oriented aur reliable hai: connection set up karta hai (3-way handshake), ordered, error-checked, retransmitted delivery guarantee karta hai — web, email, file transfer ke liye. UDP connectionless aur fast hai: no handshake, order ya delivery ki koi guarantee nahi, kam overhead — live video/voice, gaming, aur DNS ke liye, jahan speed perfection se zyada matter karti hai. Correctness ke liye TCP, low latency ke liye UDP.',
        },
        dailyLifeExample:
          'TCP registered post jaisa hai — confirm hota hai ki pahuncha, kho jaye to dobara bheja jaata hai. UDP normal announcement jaisa hai — bol diya, sun liya to theek, miss ho gaya to ho gaya (live match commentary).',
        codeExample:
          '// TCP: 3-way handshake -> reliable, ordered\n//   SYN -> SYN-ACK -> ACK, then data\n//   used by: HTTP, HTTPS, email, file transfer\n// UDP: no handshake -> fast, no guarantees\n//   used by: video/voice calls, gaming, DNS',
        keyPoints: [
          'TCP: connection-oriented, reliable, ordered',
          'TCP 3-way handshake (SYN/SYN-ACK/ACK)',
          'UDP: connectionless, fast, no guarantees',
          'TCP for correctness; UDP for low latency',
        ],
        quiz: [
          {
            question: 'Which protocol guarantees ordered, reliable delivery?',
            options: ['UDP', 'TCP', 'IP', 'DNS'],
            correctIndex: 1,
          },
          {
            question: 'Live video calls usually use…',
            options: ['TCP', 'UDP', 'FTP', 'SMTP'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you choose TCP over UDP and vice versa?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Choose TCP when correctness and completeness matter more than latency: web pages (HTTP/HTTPS), file downloads, email, and APIs — you need every byte, in order, with retransmission on loss. Choose UDP when speed and low latency matter more than perfect delivery: live video/audio calls, online gaming, and DNS lookups — a dropped packet is better than a delayed one, and the application can tolerate or handle loss itself. TCP adds handshakes, ordering, and congestion control (overhead); UDP is a thin, fast, fire-and-forget layer.',
              hinglish:
                'TCP tab chuno jab correctness aur completeness latency se zyada matter karein: web pages (HTTP/HTTPS), file downloads, email, aur APIs — har byte, order mein, loss pe retransmission chahiye. UDP tab jab speed aur low latency perfect delivery se zyada matter karein: live video/audio calls, online gaming, aur DNS lookups — dropped packet delayed se behtar hai, aur application loss tolerate ya handle kar sakti hai. TCP handshakes, ordering, aur congestion control (overhead) add karta hai; UDP ek thin, fast, fire-and-forget layer hai.',
            },
          },
        ],
      },
      {
        title: 'HTTP & HTTPS',
        difficulty: 'medium',
        tags: ['http', 'https'],
        explanation: {
          english:
            'HTTP is the application-layer protocol for the web — a stateless request/response model with methods (GET, POST, PUT, DELETE), status codes (200, 404, 500), and headers. HTTPS is HTTP over TLS: it encrypts the connection so data cannot be read or tampered with in transit, and verifies the server\'s identity via a certificate. Modern HTTP/2 and HTTP/3 add multiplexing and speed. Always use HTTPS — browsers now flag plain HTTP as insecure.',
          hinglish:
            'HTTP web ka application-layer protocol hai — ek stateless request/response model methods (GET, POST, PUT, DELETE), status codes (200, 404, 500), aur headers ke saath. HTTPS HTTP over TLS hai: ye connection encrypt karta hai taaki data transit mein padha ya tamper na ho sake, aur server ki identity certificate se verify karta hai. Modern HTTP/2 aur HTTP/3 multiplexing aur speed add karte hain. Hamesha HTTPS use karo — browsers ab plain HTTP ko insecure flag karte hain.',
        },
        dailyLifeExample:
          'HTTP ek postcard jaisa hai (koi bhi padh le). HTTPS ek sealed, tamper-proof lifaafa jaisa hai — sirf receiver padh sakta hai, aur pakka hota hai ki sahi bande ne bheja.',
        codeExample:
          '// HTTP request\n// GET /users/42 HTTP/1.1\n// Host: api.example.com\n//\n// HTTP response\n// HTTP/1.1 200 OK\n// Content-Type: application/json\n//\n// HTTPS = HTTP + TLS (encryption + identity)',
        keyPoints: [
          'HTTP: stateless request/response (methods, status, headers)',
          'HTTPS = HTTP over TLS (encrypted + verified)',
          'TLS protects against eavesdropping & tampering',
          'Prefer HTTP/2 & HTTP/3; always use HTTPS',
        ],
        quiz: [
          {
            question: 'HTTPS adds which key benefit over HTTP?',
            options: ['faster typing', 'encryption + server identity', 'more colours', 'no headers'],
            correctIndex: 1,
          },
          {
            question: 'HTTP is described as…',
            options: ['stateful', 'stateless request/response', 'a database', 'a CSS framework'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'How the Web Works',
    level: 'advanced',
    description: 'End-to-end request journey.',
    concepts: [
      {
        title: 'What Happens When You Type a URL',
        difficulty: 'hard',
        tags: ['web', 'http', 'dns'],
        explanation: {
          english:
            'A classic interview walk-through. (1) The browser checks caches, then DNS resolves the domain to an IP. (2) It opens a TCP connection to that IP (and a TLS handshake for HTTPS). (3) It sends an HTTP request. (4) The server (often behind a load balancer/CDN) processes it and returns an HTTP response (HTML). (5) The browser parses the HTML, requests linked CSS/JS/images, builds the DOM, and renders the page. Caching, CDNs, and keep-alive connections speed up the whole journey.',
          hinglish:
            'Ek classic interview walk-through. (1) Browser caches check karta hai, phir DNS domain ko IP mein resolve karta hai. (2) Us IP se TCP connection kholta hai (aur HTTPS ke liye TLS handshake). (3) Ek HTTP request bhejta hai. (4) Server (aksar load balancer/CDN ke peeche) use process karke HTTP response (HTML) deta hai. (5) Browser HTML parse karta hai, linked CSS/JS/images maangta hai, DOM banata hai, aur page render karta hai. Caching, CDNs, aur keep-alive connections poore safar ko tez karte hain.',
        },
        dailyLifeExample:
          'URL type karna restaurant mein order dene jaisa hai — address dhoondho (DNS), waiter se baat (TCP), order do (HTTP request), khana aaye (response), table set karke khao (render).',
        codeExample:
          '// Type "google.com" ->\n// 1. Cache + DNS lookup -> IP\n// 2. TCP connection (+ TLS for HTTPS)\n// 3. HTTP GET request\n// 4. Server (LB/CDN) -> HTTP response (HTML)\n// 5. Browser parses HTML, fetches CSS/JS, renders DOM',
        keyPoints: [
          'DNS resolves domain -> IP (with caching)',
          'TCP connection (+ TLS handshake for HTTPS)',
          'HTTP request -> server -> HTTP response',
          'Browser parses HTML, fetches assets, renders',
        ],
        quiz: [
          {
            question: 'The first step after typing a URL (besides cache) is…',
            options: ['render the page', 'DNS resolution to an IP', 'send email', 'open a database'],
            correctIndex: 1,
          },
          {
            question: 'For HTTPS, before sending the HTTP request the browser also does a…',
            options: ['SQL query', 'TLS handshake', 'page render', 'CSS parse'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between HTTP and HTTPS?',
    difficulty: 'easy',
    frequency: 'very-common',
    answer: {
      english:
        'HTTP sends data in plain text, so anyone between the client and server can read or modify it. HTTPS is HTTP layered over TLS/SSL: it encrypts the data (confidentiality), detects tampering (integrity), and authenticates the server via a digital certificate (so you know you are talking to the real site). HTTPS uses port 443 (HTTP uses 80) and is now the standard — browsers warn on plain HTTP.',
      hinglish:
        'HTTP data plain text mein bhejta hai, to client aur server ke beech koi bhi use padh ya modify kar sakta hai. HTTPS HTTP ko TLS/SSL ke upar layer karta hai: ye data encrypt karta hai (confidentiality), tampering detect karta hai (integrity), aur server ko digital certificate se authenticate karta hai (taaki pata ho ki asli site se baat ho rahi). HTTPS port 443 use karta hai (HTTP 80) aur ab standard hai — browsers plain HTTP pe warn karte hain.',
    },
  },
  {
    question: 'What is a 3-way handshake in TCP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The 3-way handshake establishes a reliable TCP connection before data transfer. The client sends SYN (synchronise, with an initial sequence number); the server replies SYN-ACK (acknowledging the client and sending its own sequence number); the client replies ACK. After these three steps both sides agree on sequence numbers and the connection is open. This setup is why TCP is reliable but has more overhead than connectionless UDP.',
      hinglish:
        '3-way handshake data transfer se pehle ek reliable TCP connection establish karta hai. Client SYN bhejta hai (synchronise, ek initial sequence number ke saath); server SYN-ACK reply karta hai (client ko acknowledge karke apna sequence number bhejta hai); client ACK reply karta hai. In teen steps ke baad dono sides sequence numbers pe agree karte hain aur connection khul jaata hai. Yahi setup TCP ko reliable banata hai par connectionless UDP se zyada overhead deta hai.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
