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
          {
            question: 'What happens to data at each layer as it travels down the stack (encapsulation)?',
            options: ['Data is deleted', 'Each layer adds its own header', 'Data is encrypted only', 'Nothing happens'],
            correctIndex: 1,
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
          {
            question: 'Why does the internet cache DNS results at multiple levels (browser, OS, resolver)?',
            options: [
              'To make lookups slower',
              'To avoid repeating the same domain-to-IP lookup every time, speeding things up',
              'DNS results cannot be cached',
              'To hide the IP address permanently',
            ],
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
          {
            question: 'Why does DNS typically use UDP rather than TCP?',
            options: [
              'DNS cannot use UDP',
              'DNS queries are small and need to be fast; UDP avoids handshake overhead for such quick request/response exchanges',
              'UDP is more reliable than TCP',
              'DNS never sends any data',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you choose TCP over UDP and vice versa?',
            difficulty: 'medium',
            frequency: 'common',
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
          {
            question: 'What port does HTTPS use by default (vs port 80 for HTTP)?',
            options: ['21', '443', '8080', '3000'],
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
          {
            question: 'What does the browser do after receiving the HTML response?',
            options: [
              'Nothing, the process is complete',
              'Parses the HTML, requests linked CSS/JS/images, builds the DOM, and renders the page',
              'Immediately closes the TCP connection with no further action',
              'Sends the HTML back to the server',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Routers, Switches & Packet Routing',
        difficulty: 'medium',
        tags: ['routing', 'router', 'switch', 'packets'],
        explanation: {
          english:
            "Data doesn't travel across the internet in one piece — it's broken into small **packets**, each with source/destination addresses, sent independently, and reassembled at the destination. Different networking devices move these packets:\n\n- **Switches** operate within a local network (LAN), using MAC addresses to forward data to the correct connected device — like a smart mail sorter for one building.\n- **Routers** connect different networks together (e.g. your home network to the internet) and use IP addresses to decide the next hop for a packet, based on a **routing table**. Each router only knows the next hop, not the entire path — this is like asking for directions at each junction rather than knowing the whole route upfront.\n- Packets from the same message can take DIFFERENT paths across the internet and arrive out of order — this is exactly why TCP (which reorders and reassembles them) exists on top of IP (which just tries to deliver each packet, best-effort).",
          hinglish:
            "Data internet pe ek piece mein nahi jaata — ye chhote **packets** mein toota jaata hai, har ek source/destination addresses ke saath, independently bheja jaata hai, aur destination pe reassemble hota hai. Alag-alag networking devices in packets ko move karte hain:\n\n- **Switches** ek local network (LAN) ke andar operate karte hain, MAC addresses use karke data ko sahi connected device tak forward karte hain — ek building ke liye smart mail sorter jaisa.\n- **Routers** alag-alag networks ko jodte hain (jaise tumhara home network internet se) aur IP addresses use karke decide karte hain packet ka next hop, ek **routing table** ke basis pe. Har router sirf next hop jaanta hai, poora path nahi — ye har junction pe directions poochne jaisa hai, poora route pehle se jaane bina.\n- Ek hi message ke packets internet pe ALAG paths le sakte hain aur out of order pahunch sakte hain — isiliye TCP (jo unhe reorder aur reassemble karta hai) IP ke upar exist karta hai (jo sirf best-effort har packet deliver karne ki koshish karta hai).",
        },
        dailyLifeExample:
          "Ek switch waise hai jaise ek office building ka reception desk — sirf usi building ke andar letters (packets) sahi department (device) tak pahunchata hai. Ek router waise hai jaise ek city ka post office jo alag-alag cities (networks) ke beech mail route karta hai, har baar sirf agla junction/city dekh ke, poora sfar plan kiye bina.",
        codeExample:
          "// Message split into packets, each independently routed:\n// Packet 1: Src=A, Dst=B, seq=1  -> may go via Router X\n// Packet 2: Src=A, Dst=B, seq=2  -> may go via Router Y (different path!)\n// Packet 3: Src=A, Dst=B, seq=3  -> may go via Router X again\n//\n// At destination B: TCP reorders using seq numbers -> 1, 2, 3\n// (IP just does best-effort delivery, no ordering guarantee)\n//\n// A router's routing table (simplified):\n// Destination network   Next hop\n// 10.0.0.0/24            -> directly connected\n// 0.0.0.0/0 (default)    -> ISP gateway",
        keyPoints: [
          'Data is broken into packets, each routed independently and reassembled at the destination',
          'Switches forward data within a local network using MAC addresses',
          'Routers connect different networks and forward packets between them using IP addresses and a routing table',
          'Each router only knows the next hop, not the full path to the destination',
          'Packets from one message can take different paths and arrive out of order — TCP reorders them on top of IP',
        ],
        quiz: [
          {
            question: 'What is the key difference between a switch and a router?',
            options: [
              'They are identical devices',
              'A switch forwards data within a local network (MAC addresses); a router connects different networks together (IP addresses)',
              'A router only works with UDP',
              'A switch is used only for wireless connections',
            ],
            correctIndex: 1,
          },
          {
            question: 'How much of the path to the destination does a single router typically know?',
            options: [
              'The entire end-to-end path',
              'Only the next hop, based on its routing table',
              'Nothing at all',
              'Only the final destination\'s MAC address',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why can packets from the same message arrive at the destination out of order?',
            options: [
              'This never happens in practice',
              'Different packets can take different paths across the network, each with different delays',
              'IP guarantees ordered delivery, so this is a bug',
              'Routers deliberately shuffle packets',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Load Balancing & CDNs',
        difficulty: 'medium',
        tags: ['load-balancing', 'cdn', 'scalability'],
        explanation: {
          english:
            "A single server can't handle unlimited traffic, and users are scattered globally — two problems solved by different techniques.\n\n**Load balancing** distributes incoming requests across multiple backend servers so no single one is overwhelmed, and so traffic keeps flowing even if one server goes down (health checks detect and route around failures). Common strategies: **round robin** (rotate through servers evenly), **least connections** (send to the server currently handling the fewest requests), and **IP hash** (same client consistently reaches the same server — useful for session data).\n\nA **CDN (Content Delivery Network)** solves the geography problem: it caches static content (images, CSS, JS, videos) on servers physically distributed around the world ('edge locations'), so a user in Mumbai gets content from a nearby edge server instead of a far-away origin server — dramatically cutting latency. CDNs also absorb huge amounts of traffic, protecting the origin server from being overwhelmed (including during DDoS attacks).",
          hinglish:
            "Ek single server unlimited traffic handle nahi kar sakta, aur users globally scattered hote hain — do problems, do alag techniques se solve hoti hain.\n\n**Load balancing** incoming requests ko multiple backend servers mein distribute karta hai taaki koi ek overwhelmed na ho, aur agar ek server down ho jaaye toh bhi traffic chalta rahe (health checks failures detect karke unke around route karte hain). Common strategies: **round robin** (servers ke through evenly rotate), **least connections** (jis server pe currently sabse kam requests hon usko bhejo), aur **IP hash** (same client consistently ek hi server tak pahunche — session data ke liye useful).\n\nEk **CDN (Content Delivery Network)** geography problem solve karta hai: ye static content (images, CSS, JS, videos) ko duniya bhar mein physically distributed servers ('edge locations') pe cache karta hai, taaki Mumbai ka user ek nearby edge server se content paaye, ek door origin server ki jagah — latency dramatically kam karta hai. CDNs bahut zyada traffic bhi absorb karte hain, origin server ko overwhelmed hone se bachate hain (DDoS attacks ke dauraan bhi).",
        },
        dailyLifeExample:
          "Load balancing waise hai jaise ek bank mein multiple counters hona aur ek guard jo customers ko sabse khaali counter pe bhejta hai — ek counter pe lambi line nahi lagti. CDN waise hai jaise ek national chain ke local branches har city mein hona — tumhe har baar head office (origin server) tak jaane ki zaroorat nahi, nearest branch (edge server) se kaam ho jaata hai.",
        codeExample:
          "// Load balancer strategies (conceptual)\n// Round robin:      server1 -> server2 -> server3 -> server1 -> ...\n// Least connections: send to whichever server has fewest active requests\n// IP hash:           hash(client_ip) % num_servers -> always same server\n//\n// CDN flow:\n// User in Mumbai requests image.jpg\n//   -> nearest edge server (Mumbai) has it cached? Serve immediately (fast)\n//   -> not cached? Edge fetches from origin server once, caches it, then serves",
        keyPoints: [
          'Load balancing spreads requests across multiple servers to avoid overload and handle server failures',
          'Common strategies: round robin, least connections, IP hash',
          'A CDN caches static content on geographically distributed edge servers, reducing latency',
          'CDNs reduce load on the origin server and help absorb traffic spikes/DDoS attacks',
          'Load balancing solves capacity; CDNs solve geographic distance to users',
        ],
        quiz: [
          {
            question: 'What problem does load balancing primarily solve?',
            options: [
              'It makes a single server infinitely powerful',
              'It distributes incoming requests across multiple servers so none is overwhelmed and traffic survives a server failure',
              'It encrypts network traffic',
              'It replaces the need for DNS',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does a CDN reduce latency for users far from the origin server?',
            options: [
              'It makes the internet itself faster',
              'It caches content on servers physically distributed close to users, so requests do not have to travel all the way to the origin',
              'It compresses all data to zero bytes',
              'It has no effect on latency',
            ],
            correctIndex: 1,
          },
          {
            question: 'In the "IP hash" load balancing strategy, what is the key property?',
            options: [
              'Requests are always sent to a random server',
              'The same client IP is consistently routed to the same backend server',
              'It only works for HTTPS',
              'It ignores the server\'s current load entirely and never adapts',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'NAT & Firewalls',
        difficulty: 'medium',
        tags: ['nat', 'firewall', 'security', 'private-ip'],
        explanation: {
          english:
            "Two everyday networking mechanisms most people never think about but rely on constantly:\n\n**NAT (Network Address Translation)**: there aren't enough IPv4 addresses for every device on Earth to have its own public one. Instead, devices on a home/office network get **private IP addresses** (like 192.168.x.x or 10.x.x.x) that are only meaningful inside that network. Your router performs NAT: it translates these private addresses to its single public IP when traffic leaves the network, and translates responses back to the correct internal device, tracking which internal device made which request. This is why multiple devices on your WiFi can all use the internet through one public IP.\n\n**Firewalls** inspect and filter network traffic based on rules (allowed ports, IP addresses, protocols), blocking unwanted or malicious traffic before it reaches your devices — acting as a security checkpoint between your network and the wider internet. They can be hardware (built into routers) or software (on individual machines), and modern firewalls also do stateful inspection, tracking ongoing connections rather than just single packets.",
          hinglish:
            "Do everyday networking mechanisms jinke baare mein zyadatar log kabhi nahi sochte par constantly unpe depend karte hain:\n\n**NAT (Network Address Translation)**: duniya ke har device ko apna public IPv4 address dene ke liye kaafi addresses nahi hain. Iske bajaye, home/office network ke devices **private IP addresses** paate hain (jaise 192.168.x.x ya 10.x.x.x) jo sirf us network ke andar meaningful hain. Tumhara router NAT karta hai: jab traffic network se bahar jaata hai, ye in private addresses ko apne single public IP mein translate karta hai, aur responses ko wapas sahi internal device mein translate karta hai, track karte hue ki kaunse internal device ne kaunsi request bheji thi. Isiliye tumhare WiFi pe multiple devices ek hi public IP se internet use kar paate hain.\n\n**Firewalls** rules (allowed ports, IP addresses, protocols) ke basis pe network traffic inspect aur filter karte hain, unwanted ya malicious traffic ko tumhare devices tak pahunchne se pehle block karte hue — tumhare network aur wider internet ke beech ek security checkpoint ki tarah kaam karte hue. Ye hardware (routers mein built-in) ya software (individual machines pe) ho sakte hain, aur modern firewalls stateful inspection bhi karte hain, sirf single packets ke bajaye ongoing connections track karte hain.",
        },
        dailyLifeExample:
          "NAT waise hai jaise ek office ka ek hi main phone number ho, par andar har employee ka apna extension ho — bahar se calls sirf us main number se hoti hain, par reception (router) jaanta hai kaunsi call kis extension (device) ke liye thi. Firewall waise hai jaise ek building ka security guard jo ek list ke against check karta hai kaun andar aa sakta hai aur kaun nahi.",
        codeExample:
          "// NAT translation table (conceptual, on your home router)\n// Internal (private)         External (public, shared)\n// 192.168.1.5:54321   <->    203.0.113.9:40001\n// 192.168.1.8:51234   <->    203.0.113.9:40002\n// Router remembers this mapping to route responses back correctly\n\n// Simple firewall rule examples\n// ALLOW  inbound TCP port 443 (HTTPS)\n// ALLOW  inbound TCP port 80  (HTTP)\n// DENY   inbound TCP port 23  (old, insecure Telnet)\n// DENY   all other unsolicited inbound traffic",
        keyPoints: [
          'NAT lets many devices with private IP addresses share one public IP address',
          'Your router performs NAT, tracking which internal device made which outbound request',
          'Private IP ranges (like 192.168.x.x, 10.x.x.x) are only meaningful within a local network',
          'Firewalls filter network traffic based on rules (ports, IPs, protocols), blocking unwanted traffic',
          'Firewalls can be hardware or software, and modern ones do stateful connection tracking',
        ],
        quiz: [
          {
            question: 'What problem does NAT solve?',
            options: [
              'It encrypts all network traffic',
              'It lets multiple devices with private IP addresses share a single public IP address',
              'It speeds up DNS lookups',
              'It replaces the need for routers',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is a private IP address (like 192.168.1.5) used for?',
            options: [
              'It is used to identify a device globally on the public internet',
              'It identifies a device only within its local network; it is translated by NAT for outbound internet traffic',
              'It is the same as a MAC address',
              'It is only used by DNS servers',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does a firewall primarily do?',
            options: [
              'It speeds up your internet connection',
              'It inspects and filters network traffic based on rules, blocking unwanted or malicious traffic',
              'It translates domain names to IP addresses',
              'It caches static website content',
            ],
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
    frequency: 'common',
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

  // ─── Models & Layers ───────────────────────────────────────────
  {
    question: 'What are the 7 layers of the OSI model and what does each do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'From bottom to top: PHYSICAL (raw bits over cable/radio — voltages, connectors), DATA LINK (frames between directly connected nodes, MAC addressing, error detection — switches live here), NETWORK (routing packets across networks, IP addressing — routers live here), TRANSPORT (end-to-end delivery, TCP/UDP, ports, reliability), SESSION (establishing and managing conversations), PRESENTATION (encryption, compression, encoding/format translation), APPLICATION (HTTP, DNS, SMTP — what the user\'s software actually speaks). A common mnemonic: "Please Do Not Throw Sausage Pizza Away".',
      hinglish:
        'Neeche se upar: PHYSICAL (cable/radio pe raw bits — voltages, connectors), DATA LINK (directly connected nodes ke beech frames, MAC addressing, error detection — switches yahan rehte hain), NETWORK (networks ke across packets route karna, IP addressing — routers yahan rehte hain), TRANSPORT (end-to-end delivery, TCP/UDP, ports, reliability), SESSION (conversations establish aur manage karna), PRESENTATION (encryption, compression, encoding/format translation), APPLICATION (HTTP, DNS, SMTP — jo user ka software actually bolta hai). Ek common mnemonic: "Please Do Not Throw Sausage Pizza Away".',
    },
  },
  {
    question: 'Why does the TCP/IP model have 4 layers instead of the OSI model\'s 7?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'OSI is a theoretical reference model designed by committee before the internet standardised; TCP/IP is the practical model derived from what was actually built and deployed. TCP/IP merges OSI\'s Session, Presentation, and Application into one APPLICATION layer (real protocols like HTTP handle all three concerns themselves) and merges Physical and Data Link into a LINK layer. In practice engineers use OSI vocabulary for discussion ("that is a layer 7 problem") but TCP/IP describes how the internet genuinely works.',
      hinglish:
        'OSI ek theoretical reference model hai jo internet standardise hone se pehle committee ne design kiya; TCP/IP wo practical model hai jo actually jo bana aur deploy hua usse derive hua. TCP/IP OSI ke Session, Presentation, aur Application ko ek APPLICATION layer mein merge karta hai (HTTP jaise real protocols teeno concerns khud handle karte hain) aur Physical aur Data Link ko ek LINK layer mein merge karta hai. Practically engineers discussion ke liye OSI vocabulary use karte hain ("wo ek layer 7 problem hai") par TCP/IP describe karta hai ki internet genuinely kaise kaam karta hai.',
    },
  },
  {
    question: 'What is encapsulation in networking?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Encapsulation is each layer wrapping the data from the layer above with its own HEADER as it travels down the stack. Your HTTP request gets a TCP header (adding ports and sequence numbers), then an IP header (adding source/destination IP), then an Ethernet header (adding MAC addresses). At the receiving end the reverse happens — DECAPSULATION — with each layer stripping its own header and passing the payload up. This is what lets layers stay independent: each only reads its own header.',
      hinglish:
        'Encapsulation matlab har layer upar wali layer ke data ko apne HEADER se wrap karti hai jaise wo stack ke neeche jaata hai. Tumhari HTTP request ko ek TCP header milta hai (ports aur sequence numbers add karte hue), phir ek IP header (source/destination IP add karte hue), phir ek Ethernet header (MAC addresses add karte hue). Receiving end pe ulta hota hai — DECAPSULATION — har layer apna header strip karke payload upar pass karti hai. Yahi layers ko independent rehne deta hai: har ek sirf apna header padhti hai.',
    },
  },
  {
    question: 'What is the difference between a MAC address and an IP address?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A MAC address is a PHYSICAL, permanent hardware identifier burned into a network card (48-bit, like 00:1A:2B:3C:4D:5E), used only for delivery within a single local network segment (layer 2). An IP address is a LOGICAL, assignable address (layer 3) used to route across networks globally, and it changes when you move networks. Analogy: the IP address is the postal address that gets a letter to the right building anywhere in the world; the MAC address is the specific person in that building who receives it.',
      hinglish:
        'Ek MAC address ek PHYSICAL, permanent hardware identifier hai jo network card mein burn hota hai (48-bit, jaise 00:1A:2B:3C:4D:5E), sirf ek single local network segment ke andar delivery ke liye use hota hai (layer 2). Ek IP address ek LOGICAL, assignable address hai (layer 3) jo globally networks ke across route karne ke liye use hota hai, aur network badalne pe badal jaata hai. Analogy: IP address wo postal address hai jo ek chitthi ko duniya mein kahin bhi sahi building tak pahunchata hai; MAC address us building mein wo specific insaan hai jo use receive karta hai.',
    },
  },
  {
    question: 'What is ARP and why is it needed?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'ARP (Address Resolution Protocol) maps a known IP address to the MAC address needed to actually deliver a frame on the local network. It is needed because IP routing gets a packet to the right network, but the final hop requires a layer-2 MAC address. The device broadcasts "who has 192.168.1.5?" to everyone on the segment; the owner replies with its MAC, and the result is cached in an ARP table. Its trust-based design enables ARP spoofing, a classic local-network attack.',
      hinglish:
        'ARP (Address Resolution Protocol) ek known IP address ko us MAC address se map karta hai jo local network pe ek frame actually deliver karne ke liye chahiye. Ye isliye zaroori hai kyunki IP routing packet ko sahi network tak le jaati hai, par final hop ko ek layer-2 MAC address chahiye. Device segment pe sabko broadcast karta hai "192.168.1.5 kiske paas hai?"; owner apna MAC reply karta hai, aur result ek ARP table mein cache hota hai. Iska trust-based design ARP spoofing enable karta hai, ek classic local-network attack.',
    },
  },
  {
    question: 'What is the difference between a hub, a switch, and a router?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A HUB (layer 1, obsolete) blindly repeats every incoming signal out of all ports — wasteful and collision-prone. A SWITCH (layer 2) learns which MAC address sits on which port and forwards frames only to the correct port, within one local network. A ROUTER (layer 3) connects DIFFERENT networks, using IP addresses and a routing table to decide the next hop — it is what lets your home network reach the internet. Simply: hubs repeat, switches forward within a network, routers move between networks.',
      hinglish:
        'Ek HUB (layer 1, obsolete) har incoming signal ko blindly saare ports se repeat karta hai — wasteful aur collision-prone. Ek SWITCH (layer 2) seekhta hai ki kaunsa MAC address kis port pe hai aur frames sirf correct port pe forward karta hai, ek local network ke andar. Ek ROUTER (layer 3) ALAG networks jodta hai, IP addresses aur ek routing table use karke next hop decide karta hai — yahi tumhare home network ko internet tak pahunchata hai. Simply: hubs repeat karte hain, switches ek network ke andar forward karte hain, routers networks ke beech move karte hain.',
    },
  },

  // ─── IP & Addressing ───────────────────────────────────────────
  {
    question: 'What is the difference between IPv4 and IPv6?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'IPv4 uses 32-bit addresses (about 4.3 billion, written as 192.168.1.1) — exhausted years ago, which is why NAT became ubiquitous. IPv6 uses 128-bit addresses (about 3.4x10^38, written in hex like 2001:0db8::1), effectively unlimited, so every device can have a globally unique address and NAT becomes unnecessary. IPv6 also simplifies the header for faster routing, has built-in IPsec support, and uses stateless address autoconfiguration. Adoption remains gradual since the two are not directly interoperable.',
      hinglish:
        'IPv4 32-bit addresses use karta hai (about 4.3 billion, 192.168.1.1 ki tarah likhe) — saalon pehle khatam ho gaye, isliye NAT ubiquitous ban gaya. IPv6 128-bit addresses use karta hai (about 3.4x10^38, hex mein likhe jaise 2001:0db8::1), effectively unlimited, isliye har device ka ek globally unique address ho sakta hai aur NAT unnecessary ban jaata hai. IPv6 faster routing ke liye header bhi simplify karta hai, built-in IPsec support rakhta hai, aur stateless address autoconfiguration use karta hai. Adoption gradual hai kyunki dono directly interoperable nahi hain.',
    },
  },
  {
    question: 'What are public and private IP addresses?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'PUBLIC IPs are globally unique and routable on the internet — assigned by your ISP. PRIVATE IPs come from reserved ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) that are only meaningful inside a local network and are never routed on the public internet, so the same 192.168.1.5 exists in millions of homes simultaneously without conflict. NAT on your router translates between the two, which is why an entire household of devices can share one public IP.',
      hinglish:
        'PUBLIC IPs globally unique aur internet pe routable hain — tumhare ISP se assigned. PRIVATE IPs reserved ranges se aate hain (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) jo sirf ek local network ke andar meaningful hain aur kabhi public internet pe route nahi hote, isliye wahi 192.168.1.5 millions gharon mein ek saath bina conflict ke exist karta hai. Tumhare router pe NAT dono ke beech translate karta hai, isliye ek poore ghar ke devices ek public IP share kar sakte hain.',
    },
  },
  {
    question: 'What is a subnet mask and what is CIDR notation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A subnet mask splits an IP address into a NETWORK portion and a HOST portion, letting a device determine whether a destination is local (deliver directly) or remote (send to the router). CIDR notation writes this compactly as /N, where N is the number of leading network bits: 192.168.1.0/24 means the first 24 bits are the network, leaving 8 bits for hosts — 256 addresses, of which 254 are usable (the first is the network address, the last is broadcast).',
      hinglish:
        'Ek subnet mask ek IP address ko ek NETWORK portion aur ek HOST portion mein split karta hai, ek device ko determine karne deta hai ki ek destination local hai (directly deliver karo) ya remote (router ko bhejo). CIDR notation ise compactly /N ke roop mein likhta hai, jahan N leading network bits ki number hai: 192.168.1.0/24 matlab pehle 24 bits network hain, hosts ke liye 8 bits chhodte hue — 256 addresses, jinme se 254 usable hain (pehla network address hai, aakhri broadcast).',
    },
  },
  {
    question: 'What is subnetting and why do networks use it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Subnetting divides one large network into smaller logical networks. Reasons: PERFORMANCE (broadcast traffic stays confined to a smaller segment instead of flooding thousands of devices), SECURITY (you can firewall between subnets, isolating finance from guest WiFi), ORGANISATION (a subnet per department or floor), and efficient ADDRESS allocation (giving a 10-device office a /28 rather than wasting a full /24). It is fundamental to any network larger than a home.',
      hinglish:
        'Subnetting ek bade network ko chhote logical networks mein divide karta hai. Wajahein: PERFORMANCE (broadcast traffic ek chhote segment tak confined rehta hai, hazaron devices ko flood karne ke bajaye), SECURITY (tum subnets ke beech firewall laga sakte ho, finance ko guest WiFi se isolate karte hue), ORGANISATION (per department ya floor ek subnet), aur efficient ADDRESS allocation (ek 10-device office ko ek poora /24 waste karne ke bajaye ek /28 dena). Ye ghar se bade kisi bhi network ke liye fundamental hai.',
    },
  },
  {
    question: 'What is DHCP and how does it work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'DHCP (Dynamic Host Configuration Protocol) automatically assigns IP configuration to devices joining a network, removing the need to configure every device by hand. The four-step DORA exchange: the client broadcasts DISCOVER, servers reply with an OFFER, the client broadcasts a REQUEST for one offer, and the server sends an ACK confirming the lease. Along with the IP it supplies the subnet mask, default gateway, and DNS servers. Addresses are LEASED for a limited time and must be renewed.',
      hinglish:
        'DHCP (Dynamic Host Configuration Protocol) network join karne wale devices ko automatically IP configuration assign karta hai, har device ko haath se configure karne ki zaroorat hataate hue. Chaar-step DORA exchange: client DISCOVER broadcast karta hai, servers ek OFFER reply karte hain, client ek offer ke liye REQUEST broadcast karta hai, aur server lease confirm karta ek ACK bhejta hai. IP ke saath ye subnet mask, default gateway, aur DNS servers bhi deta hai. Addresses ek limited time ke liye LEASE hote hain aur renew karne padte hain.',
    },
  },
  {
    question: 'What is a default gateway?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The default gateway is the router a device sends traffic to when the destination is NOT on its own local subnet. The device compares the destination IP against its own subnet mask: if local, it delivers directly via ARP/MAC; if not, it hands the packet to the default gateway, which forwards it onward toward the internet. This is why a wrong or missing gateway means you can reach machines on your LAN but nothing outside it — a classic connectivity symptom.',
      hinglish:
        'Default gateway wo router hai jise ek device traffic bhejta hai jab destination uske apne local subnet pe NAHI hai. Device destination IP ko apne subnet mask ke against compare karta hai: agar local hai, wo ARP/MAC se directly deliver karta hai; agar nahi, wo packet default gateway ko de deta hai, jo use internet ki taraf aage forward karta hai. Isiliye ek galat ya missing gateway matlab tum apne LAN ki machines tak pahunch sakte ho par uske bahar kuch nahi — ek classic connectivity symptom.',
    },
  },
  {
    question: 'How does NAT work and why is it needed?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'NAT (Network Address Translation) lets many devices with private IPs share one public IP. When an internal device sends traffic out, the router rewrites the source to its own public IP and a unique port, recording the mapping in a translation table. When the reply arrives on that port, it looks up the table and rewrites the destination back to the internal device. It became essential because IPv4 addresses ran out, and as a side effect provides a crude firewall — unsolicited inbound traffic has no table entry to match.',
      hinglish:
        'NAT (Network Address Translation) private IPs wale bahut devices ko ek public IP share karne deta hai. Jab ek internal device traffic bahar bhejta hai, router source ko apne public IP aur ek unique port se rewrite karta hai, mapping ko ek translation table mein record karte hue. Jab reply us port pe aata hai, wo table dekhta hai aur destination ko wapas internal device pe rewrite karta hai. Ye isliye essential ban gaya kyunki IPv4 addresses khatam ho gaye, aur ek side effect ke roop mein ek crude firewall deta hai — unsolicited inbound traffic ke paas match karne ko koi table entry nahi hoti.',
    },
  },
  {
    question: 'What is port forwarding?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Port forwarding creates a manual NAT rule that maps a specific port on the router\'s public IP to a specific internal device and port — for example, forwarding public port 25565 to 192.168.1.50:25565 so an outside player can reach a game server on your LAN. It is needed because NAT normally blocks unsolicited inbound connections (no translation entry exists). Security note: it deliberately punches a hole through that protection, so the exposed service must be properly secured.',
      hinglish:
        'Port forwarding ek manual NAT rule banata hai jo router ke public IP pe ek specific port ko ek specific internal device aur port se map karta hai — for example, public port 25565 ko 192.168.1.50:25565 pe forward karna taaki ek bahar ka player tumhare LAN pe ek game server tak pahunch sake. Ye isliye zaroori hai kyunki NAT normally unsolicited inbound connections block karta hai (koi translation entry exist nahi karti). Security note: ye deliberately us protection mein ek chhed karta hai, isliye exposed service properly secured honi chahiye.',
    },
  },

  // ─── Transport Layer ───────────────────────────────────────────
  {
    question: 'How does TCP guarantee reliable delivery?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Through several cooperating mechanisms. SEQUENCE NUMBERS label every byte so the receiver can reorder packets that arrive out of order and detect gaps. ACKNOWLEDGEMENTS confirm what was received. RETRANSMISSION resends anything not acknowledged before a timeout. CHECKSUMS detect corrupted data so it can be discarded and resent. FLOW CONTROL (the receive window) stops a fast sender overwhelming a slow receiver. Together these turn IP\'s unreliable best-effort delivery into an ordered, complete byte stream.',
      hinglish:
        'Kai cooperating mechanisms ke through. SEQUENCE NUMBERS har byte ko label karte hain taaki receiver out of order aaye packets reorder kar sake aur gaps detect kar sake. ACKNOWLEDGEMENTS confirm karte hain kya receive hua. RETRANSMISSION wo sab dobara bhejta hai jo ek timeout se pehle acknowledge nahi hua. CHECKSUMS corrupted data detect karte hain taaki use discard karke dobara bheja jaaye. FLOW CONTROL (receive window) ek fast sender ko ek slow receiver ko overwhelm karne se rokta hai. Saath mein ye IP ki unreliable best-effort delivery ko ek ordered, complete byte stream mein badal dete hain.',
    },
  },
  {
    question: 'What is the TCP 4-way handshake for closing a connection?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Closing takes four steps because TCP connections are full-duplex — each direction must be closed independently. The initiator sends FIN, the peer replies ACK (that direction is now closed), then when the peer has finished sending it sends its own FIN, and the initiator replies ACK. The initiator then waits in TIME_WAIT (typically 2x maximum segment lifetime) to ensure the final ACK arrived and that stray delayed packets do not corrupt a new connection reusing the same port pair.',
      hinglish:
        'Closing ko chaar steps lagte hain kyunki TCP connections full-duplex hain — har direction ko independently close karna padta hai. Initiator FIN bhejta hai, peer ACK reply karta hai (wo direction ab band), phir jab peer ka bhejna khatam ho jaaye wo apna FIN bhejta hai, aur initiator ACK reply karta hai. Initiator phir TIME_WAIT mein wait karta hai (typically 2x maximum segment lifetime) ye ensure karne ke liye ki final ACK pahuncha aur stray delayed packets usi port pair ko reuse karne wale ek naye connection ko corrupt na karein.',
    },
  },
  {
    question: 'What is TCP flow control vs congestion control?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'FLOW control protects the RECEIVER: it advertises a receive window saying how much buffer space it has, preventing a fast sender from overwhelming a slow endpoint. CONGESTION control protects the NETWORK: the sender infers congestion from packet loss and delay, and adjusts its sending rate via algorithms like slow start and AIMD (additive increase, multiplicative decrease). The distinction matters — flow control is a two-party negotiation, congestion control is each sender inferring the state of a shared network it cannot see.',
      hinglish:
        'FLOW control RECEIVER ko protect karta hai: ye ek receive window advertise karta hai jo batata hai uske paas kitna buffer space hai, ek fast sender ko ek slow endpoint overwhelm karne se rokte hue. CONGESTION control NETWORK ko protect karta hai: sender packet loss aur delay se congestion infer karta hai, aur slow start aur AIMD (additive increase, multiplicative decrease) jaise algorithms se apni sending rate adjust karta hai. Distinction matter karta hai — flow control ek two-party negotiation hai, congestion control har sender ka ek shared network ka state infer karna hai jise wo dekh nahi sakta.',
    },
  },
  {
    question: 'What is a port number and what are well-known ports?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A port number (16-bit, 0-65535) identifies WHICH application on a machine a packet belongs to — the IP gets it to the right computer, the port gets it to the right program, so one server can run a web server and a database simultaneously. Well-known ports (0-1023) are reserved by convention: 20/21 FTP, 22 SSH, 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL, 27017 MongoDB, 6379 Redis.',
      hinglish:
        'Ek port number (16-bit, 0-65535) identify karta hai ki ek packet machine pe KAUNSI application ka hai — IP use sahi computer tak pahunchata hai, port use sahi program tak, isliye ek server ek web server aur ek database ek saath chala sakta hai. Well-known ports (0-1023) convention se reserved hain: 20/21 FTP, 22 SSH, 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL, 27017 MongoDB, 6379 Redis.',
    },
  },
  {
    question: 'What is a socket?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A socket is the programming endpoint of a network connection — the API through which an application sends and receives data. A TCP connection is uniquely identified by a 4-TUPLE: source IP, source port, destination IP, destination port. This is why one server on port 443 can serve thousands of simultaneous clients: each connection differs in the client IP/port, making every tuple unique even though the server side is identical.',
      hinglish:
        'Ek socket ek network connection ka programming endpoint hai — wo API jiske through ek application data bhejti aur receive karti hai. Ek TCP connection ek 4-TUPLE se uniquely identify hota hai: source IP, source port, destination IP, destination port. Isiliye port 443 pe ek server hazaron simultaneous clients serve kar sakta hai: har connection client IP/port mein differ karta hai, har tuple ko unique banate hue chahe server side identical ho.',
    },
  },

  // ─── DNS ───────────────────────────────────────────
  {
    question: 'Walk through what happens during a DNS lookup.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Caches are checked first — browser cache, OS cache, then the local hosts file. On a miss, the query goes to a RECURSIVE RESOLVER (usually your ISP\'s or 8.8.8.8), which walks the hierarchy: it asks a ROOT server, which points to the .com TLD server, which points to the AUTHORITATIVE nameserver for example.com, which returns the actual A record. The resolver caches the answer for its TTL and returns it to you. Notice the client makes one request; the resolver does the multi-step walking.',
      hinglish:
        'Pehle caches check hote hain — browser cache, OS cache, phir local hosts file. Miss pe, query ek RECURSIVE RESOLVER ko jaati hai (usually tumhare ISP ka ya 8.8.8.8), jo hierarchy walk karta hai: wo ek ROOT server se poochta hai, jo .com TLD server pe point karta hai, jo example.com ke AUTHORITATIVE nameserver pe point karta hai, jo actual A record return karta hai. Resolver answer ko uske TTL ke liye cache karta hai aur tumhe return karta hai. Dhyan do client ek request karta hai; resolver multi-step walking karta hai.',
    },
  },
  {
    question: 'What are the common DNS record types?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A maps a domain to an IPv4 address; AAAA maps to IPv6. CNAME aliases one domain to another (www.example.com to example.com) — it cannot coexist with other records at the same name. MX specifies mail servers with priority values. TXT holds arbitrary text, used heavily for domain verification, SPF, DKIM, and DMARC email authentication. NS delegates a zone to its authoritative nameservers. PTR does reverse lookup (IP to name). SOA holds zone administrative metadata.',
      hinglish:
        'A ek domain ko ek IPv4 address se map karta hai; AAAA IPv6 se. CNAME ek domain ko doosre ka alias banata hai (www.example.com se example.com) — ye same name pe doosre records ke saath coexist nahi kar sakta. MX priority values ke saath mail servers specify karta hai. TXT arbitrary text rakhta hai, domain verification, SPF, DKIM, aur DMARC email authentication ke liye heavily use hota hai. NS ek zone ko uske authoritative nameservers ko delegate karta hai. PTR reverse lookup karta hai (IP se name). SOA zone administrative metadata rakhta hai.',
    },
  },
  {
    question: 'What is DNS TTL and what tradeoff does it create?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'TTL (Time To Live) tells resolvers how many seconds to cache a record before re-querying. The tradeoff is directly between performance and agility. A HIGH TTL (say 86400) means fast lookups and low DNS load, but a change takes up to a day to propagate everywhere. A LOW TTL (say 60) means changes take effect almost immediately, at the cost of far more DNS queries. Standard practice: lower the TTL well BEFORE a planned migration, cut over, then raise it again.',
      hinglish:
        'TTL (Time To Live) resolvers ko batata hai ki ek record ko dobara query karne se pehle kitne seconds cache karna hai. Tradeoff directly performance aur agility ke beech hai. Ek HIGH TTL (maano 86400) matlab fast lookups aur low DNS load, par ek change ko har jagah propagate hone mein ek din tak lag sakta hai. Ek LOW TTL (maano 60) matlab changes almost immediately effect mein aate hain, bahut zyada DNS queries ke cost pe. Standard practice: ek planned migration se ACHHE PEHLE TTL kam karo, cut over karo, phir dobara badha do.',
    },
  },
  {
    question: 'What is the difference between an A record and a CNAME?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An A record points a name DIRECTLY at an IP address — one lookup, and you control the IP. A CNAME points a name at ANOTHER NAME, requiring the resolver to then resolve that name too (an extra lookup), but meaning you never have to update it when the target\'s IP changes. Key restrictions: a CNAME cannot coexist with any other record at the same name, which is why the root/apex domain (example.com, which needs SOA and NS records) traditionally cannot be a CNAME.',
      hinglish:
        'Ek A record ek naam ko SEEDHA ek IP address pe point karta hai — ek lookup, aur IP tumhare control mein. Ek CNAME ek naam ko DOOSRE NAAM pe point karta hai, resolver ko phir us naam ko bhi resolve karna padta hai (ek extra lookup), par matlab target ka IP badalne pe tumhe kabhi update nahi karna padta. Key restrictions: ek CNAME same name pe kisi doosre record ke saath coexist nahi kar sakta, isiliye root/apex domain (example.com, jise SOA aur NS records chahiye) traditionally ek CNAME nahi ho sakta.',
    },
  },

  // ─── HTTP & Web ───────────────────────────────────────────
  {
    question: 'What are the main HTTP status code categories?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '1xx informational (rare, e.g. 101 Switching Protocols for WebSockets). 2xx SUCCESS: 200 OK, 201 Created, 204 No Content. 3xx REDIRECTION: 301 permanent, 302/307 temporary, 304 Not Modified (cache hit). 4xx CLIENT errors: 400 Bad Request, 401 Unauthenticated, 403 Forbidden (authenticated but not allowed), 404 Not Found, 429 Too Many Requests. 5xx SERVER errors: 500 Internal Error, 502 Bad Gateway, 503 Unavailable, 504 Gateway Timeout. The 4xx/5xx split matters: 4xx means the client must change something, 5xx means the server failed.',
      hinglish:
        '1xx informational (rare, jaise WebSockets ke liye 101 Switching Protocols). 2xx SUCCESS: 200 OK, 201 Created, 204 No Content. 3xx REDIRECTION: 301 permanent, 302/307 temporary, 304 Not Modified (cache hit). 4xx CLIENT errors: 400 Bad Request, 401 Unauthenticated, 403 Forbidden (authenticated par allowed nahi), 404 Not Found, 429 Too Many Requests. 5xx SERVER errors: 500 Internal Error, 502 Bad Gateway, 503 Unavailable, 504 Gateway Timeout. 4xx/5xx split matter karta hai: 4xx matlab client ko kuch badalna hoga, 5xx matlab server fail hua.',
    },
  },
  {
    question: 'What is the difference between HTTP/1.1, HTTP/2, and HTTP/3?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'HTTP/1.1 sends one request at a time per connection, so a slow response blocks everything behind it (head-of-line blocking) — browsers worked around this by opening ~6 parallel connections. HTTP/2 adds MULTIPLEXING: many concurrent streams over ONE connection, plus binary framing and header compression — but a lost TCP packet still stalls all streams, since TCP guarantees order. HTTP/3 fixes that by moving to QUIC over UDP, where each stream is independent, so packet loss affects only its own stream, and connections establish faster.',
      hinglish:
        'HTTP/1.1 per connection ek time mein ek request bhejta hai, isliye ek slow response uske peeche sab kuch block karta hai (head-of-line blocking) — browsers ne ~6 parallel connections khol ke iska workaround kiya. HTTP/2 MULTIPLEXING add karta hai: EK connection pe bahut concurrent streams, plus binary framing aur header compression — par ek khoya TCP packet abhi bhi saare streams rok deta hai, kyunki TCP order guarantee karta hai. HTTP/3 use QUIC over UDP pe move karke fix karta hai, jahan har stream independent hai, isliye packet loss sirf apne stream ko affect karta hai, aur connections faster establish hote hain.',
    },
  },
  {
    question: 'How does HTTPS/TLS actually work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A TLS handshake combines asymmetric and symmetric cryptography. The client sends supported cipher suites; the server responds with its CERTIFICATE containing its public key, signed by a Certificate Authority the client trusts. The client verifies that signature (proving server identity), then the two use asymmetric crypto (today usually ECDHE key exchange) to agree on a shared SESSION KEY. All actual data is then encrypted with fast SYMMETRIC encryption using that key. This gives confidentiality, integrity, and authentication together.',
      hinglish:
        'Ek TLS handshake asymmetric aur symmetric cryptography combine karta hai. Client supported cipher suites bhejta hai; server apna CERTIFICATE respond karta hai jisme uski public key hoti hai, ek Certificate Authority se signed jispe client trust karta hai. Client us signature ko verify karta hai (server identity prove karte hue), phir dono asymmetric crypto (aaj usually ECDHE key exchange) use karke ek shared SESSION KEY pe agree karte hain. Saara actual data phir us key se fast SYMMETRIC encryption se encrypt hota hai. Ye confidentiality, integrity, aur authentication saath mein deta hai.',
    },
  },
  {
    question: 'What is a TLS certificate and what does a Certificate Authority do?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A certificate binds a domain name to a public key, signed by a Certificate Authority. The CA\'s role is TRUST: your browser ships with a list of trusted root CAs, so when a CA signs a certificate the browser can verify the signature and conclude the key genuinely belongs to that domain. Without CAs, an attacker could present their own key for your bank\'s domain. Certificates chain from a leaf up through intermediates to a trusted root, and expire deliberately to limit compromise windows.',
      hinglish:
        'Ek certificate ek domain name ko ek public key se bind karta hai, ek Certificate Authority se signed. CA ka role TRUST hai: tumhara browser trusted root CAs ki ek list ke saath aata hai, isliye jab ek CA ek certificate sign karta hai browser signature verify karke conclude kar sakta hai ki key genuinely us domain ki hai. CAs ke bina, ek attacker tumhare bank ke domain ke liye apni key present kar sakta tha. Certificates ek leaf se intermediates ke through ek trusted root tak chain karte hain, aur compromise windows limit karne ke liye deliberately expire hote hain.',
    },
  },
  {
    question: 'What is the difference between cookies, sessions, and tokens?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A COOKIE is just a storage mechanism — a small value the browser stores and automatically sends back with every request to that domain. A SESSION is a server-side concept: the server stores the actual user state and gives the browser only a session ID (usually in a cookie) to look it up — stateful, easy to revoke, but requires shared session storage when scaling to many servers. A TOKEN (like JWT) carries the user data itself, signed so the server can verify it without any lookup — stateless and scale-friendly, but hard to revoke before expiry.',
      hinglish:
        'Ek COOKIE bas ek storage mechanism hai — ek chhoti value jo browser store karta hai aur us domain ki har request ke saath automatically wapas bhejta hai. Ek SESSION ek server-side concept hai: server actual user state store karta hai aur browser ko sirf ek session ID deta hai (usually ek cookie mein) use lookup karne ke liye — stateful, revoke karna easy, par bahut servers pe scale karte waqt shared session storage chahiye. Ek TOKEN (jaise JWT) user data khud carry karta hai, signed taaki server bina kisi lookup ke verify kar sake — stateless aur scale-friendly, par expiry se pehle revoke karna mushkil.',
    },
  },
  {
    question: 'What is CORS and why does it exist?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'CORS relaxes the browser\'s Same-Origin Policy, which by default blocks JavaScript on one origin from reading responses from another. That policy exists to stop a malicious site reading your bank\'s data using your logged-in cookies. CORS lets a server explicitly opt in via Access-Control-Allow-Origin headers. Crucially, CORS is enforced by the BROWSER, not the server — which is why a request that fails in the browser works fine from curl or another server.',
      hinglish:
        'CORS browser ki Same-Origin Policy ko relax karta hai, jo default se ek origin ke JavaScript ko doosre se responses padhne se block karti hai. Wo policy isliye exist karti hai taaki ek malicious site tumhare logged-in cookies use karke tumhare bank ka data na padh sake. CORS ek server ko Access-Control-Allow-Origin headers se explicitly opt in karne deta hai. Crucially, CORS BROWSER enforce karta hai, server nahi — isiliye ek request jo browser mein fail hoti hai wo curl ya doosre server se theek chalti hai.',
    },
  },
  {
    question: 'What is a CORS preflight request?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'For requests that could change server state, the browser first sends an OPTIONS "preflight" asking permission before sending the real request. It is triggered by non-simple requests: methods other than GET/POST/HEAD, custom headers, or a JSON content type. The server must respond with Access-Control-Allow-Origin, -Methods, and -Headers; only then does the browser send the actual request. This exists so a malicious page cannot cause a destructive DELETE before the server has agreed to accept cross-origin calls.',
      hinglish:
        'Un requests ke liye jo server state badal sakti hain, browser real request bhejne se pehle ek OPTIONS "preflight" bhejta hai permission maangte hue. Ye non-simple requests se trigger hota hai: GET/POST/HEAD ke alawa methods, custom headers, ya ek JSON content type. Server ko Access-Control-Allow-Origin, -Methods, aur -Headers ke saath respond karna padta hai; tabhi browser actual request bhejta hai. Ye isliye exist karta hai taaki ek malicious page server ke cross-origin calls accept karne pe agree karne se pehle ek destructive DELETE na kara sake.',
    },
  },
  {
    question: 'How does browser caching work with HTTP headers?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Cache-Control is the primary header: max-age sets how long a response is FRESH (used with no server contact at all), no-cache means revalidate before using, no-store forbids caching entirely. When a cached copy goes stale, the browser REVALIDATES using ETag (a content hash, sent back as If-None-Match) or Last-Modified (sent back as If-Modified-Since). If unchanged, the server returns 304 Not Modified with no body — saving bandwidth while confirming freshness.',
      hinglish:
        'Cache-Control primary header hai: max-age set karta hai ek response kitni der FRESH hai (bina kisi server contact ke use hota hai), no-cache matlab use karne se pehle revalidate karo, no-store caching poori tarah forbid karta hai. Jab ek cached copy stale ho jaati hai, browser ETag (ek content hash, If-None-Match ke roop mein wapas bheja) ya Last-Modified (If-Modified-Since ke roop mein wapas bheja) se REVALIDATE karta hai. Agar unchanged hai, server 304 Not Modified bina body ke return karta hai — bandwidth bachate hue jabki freshness confirm karte hue.',
    },
  },
  {
    question: 'What is a CDN and how does it improve performance?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A CDN is a network of servers ("edge locations") distributed worldwide that cache your content near users. Benefits: LATENCY drops because data travels a much shorter physical distance (a Mumbai user hits a Mumbai edge, not a Virginia origin); ORIGIN LOAD drops since the CDN absorbs most requests; and it provides resilience against traffic spikes and DDoS by soaking traffic at the edge. It is ideal for static assets, and modern CDNs also cache API responses and run edge compute.',
      hinglish:
        'Ek CDN duniya bhar mein distributed servers ("edge locations") ka ek network hai jo tumhara content users ke paas cache karta hai. Benefits: LATENCY girti hai kyunki data bahut chhoti physical distance travel karta hai (ek Mumbai user ek Mumbai edge hit karta hai, ek Virginia origin nahi); ORIGIN LOAD girta hai kyunki CDN zyadatar requests absorb karta hai; aur ye traffic spikes aur DDoS ke against resilience deta hai edge pe traffic soak karke. Ye static assets ke liye ideal hai, aur modern CDNs API responses bhi cache karte hain aur edge compute chalate hain.',
    },
  },
  {
    question: 'What is the difference between WebSockets and HTTP polling?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'POLLING repeatedly asks "anything new?" on a schedule — simple but wasteful, since most responses are empty, and updates are delayed by up to the poll interval. LONG POLLING holds the request open until data exists, reducing waste but still paying HTTP overhead per cycle. WEBSOCKETS upgrade the connection once (via an HTTP 101 handshake) to a persistent full-duplex channel, letting either side push instantly with minimal per-message overhead — the right choice for chat, live collaboration, and trading feeds.',
      hinglish:
        'POLLING baar-baar ek schedule pe poochta hai "kuch naya?" — simple par wasteful, kyunki zyadatar responses khaali hote hain, aur updates poll interval tak delay hote hain. LONG POLLING request ko tab tak khula rakhta hai jab tak data na ho, waste kam karte hue par abhi bhi per cycle HTTP overhead dete hue. WEBSOCKETS connection ko ek baar upgrade karte hain (ek HTTP 101 handshake se) ek persistent full-duplex channel mein, dono sides ko minimal per-message overhead ke saath instantly push karne dete hue — chat, live collaboration, aur trading feeds ke liye sahi choice.',
    },
  },

  // ─── Security & Operations ───────────────────────────────────────────
  {
    question: 'What is a firewall and what types exist?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A firewall filters traffic against rules, blocking anything not explicitly permitted. PACKET-FILTERING firewalls inspect each packet\'s IP/port in isolation — fast but naive. STATEFUL firewalls track connection state, so they can allow return traffic for connections you initiated while blocking unsolicited inbound. APPLICATION-layer firewalls (WAFs) understand HTTP and can block SQL injection or XSS payloads. Layering them is standard: network firewall for ports, WAF for application-level attacks.',
      hinglish:
        'Ek firewall traffic ko rules ke against filter karta hai, jo explicitly permitted nahi hai use block karte hue. PACKET-FILTERING firewalls har packet ka IP/port isolation mein inspect karte hain — fast par naive. STATEFUL firewalls connection state track karte hain, isliye wo tumhare shuru kiye connections ka return traffic allow kar sakte hain jabki unsolicited inbound block karte hain. APPLICATION-layer firewalls (WAFs) HTTP samajhte hain aur SQL injection ya XSS payloads block kar sakte hain. Inhe layer karna standard hai: ports ke liye network firewall, application-level attacks ke liye WAF.',
    },
  },
  {
    question: 'What is a DDoS attack and how do you defend against it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A DDoS floods a target from MANY distributed sources (usually a botnet), exhausting bandwidth, connections, or CPU so legitimate users cannot get through. The "distributed" part is what makes it hard — you cannot simply block one IP. Defences: a CDN or scrubbing service absorbing traffic at the edge, rate limiting per IP, SYN cookies against SYN floods, autoscaling to absorb spikes, and upstream filtering by your provider. Application-layer (layer 7) attacks are hardest, since each request looks legitimate.',
      hinglish:
        'Ek DDoS ek target ko BAHUT distributed sources se flood karta hai (usually ek botnet), bandwidth, connections, ya CPU khatam karte hue taaki legitimate users na ghus sakein. "Distributed" hissa hi ise mushkil banata hai — tum simply ek IP block nahi kar sakte. Defences: ek CDN ya scrubbing service edge pe traffic absorb karte hue, per IP rate limiting, SYN floods ke against SYN cookies, spikes absorb karne ke liye autoscaling, aur tumhare provider se upstream filtering. Application-layer (layer 7) attacks sabse mushkil hain, kyunki har request legitimate lagti hai.',
    },
  },
  {
    question: 'What is a man-in-the-middle attack?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A MITM attacker secretly positions themselves between two parties, able to read and modify traffic while both believe they are talking directly. Common vectors: rogue public WiFi, ARP spoofing on a LAN, and DNS spoofing. TLS is the primary defence — encryption prevents reading, and certificate verification prevents impersonation, since the attacker cannot produce a CA-signed certificate for a domain they do not control. This is precisely why browsers show a hard warning on certificate errors and why HSTS forces HTTPS.',
      hinglish:
        'Ek MITM attacker chupke se do parties ke beech position leta hai, traffic padhne aur modify karne mein saksham jabki dono maante hain ki wo directly baat kar rahe hain. Common vectors: rogue public WiFi, LAN pe ARP spoofing, aur DNS spoofing. TLS primary defence hai — encryption padhna rokta hai, aur certificate verification impersonation rokta hai, kyunki attacker ek aise domain ke liye CA-signed certificate nahi bana sakta jo uske control mein nahi. Yahi exactly wajah hai ki browsers certificate errors pe ek hard warning dikhate hain aur HSTS HTTPS force karta hai.',
    },
  },
  {
    question: 'What is a VPN and how does it work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A VPN creates an encrypted TUNNEL between your device and a VPN server, so all traffic is encrypted before leaving your machine and emerges from the VPN server\'s IP. Two distinct uses: CORPORATE VPNs give remote employees secure access to internal networks as if physically present; CONSUMER VPNs hide traffic from the local network/ISP and mask your IP. Important limitation: a VPN moves trust rather than removing it — the VPN provider can now see what your ISP previously could.',
      hinglish:
        'Ek VPN tumhare device aur ek VPN server ke beech ek encrypted TUNNEL banata hai, isliye saara traffic tumhari machine chhodne se pehle encrypt hota hai aur VPN server ke IP se nikalta hai. Do distinct uses: CORPORATE VPNs remote employees ko internal networks ka secure access dete hain jaise wo physically present hon; CONSUMER VPNs traffic ko local network/ISP se chhupate hain aur tumhara IP mask karte hain. Important limitation: ek VPN trust ko hataata nahi, move karta hai — VPN provider ab wo dekh sakta hai jo pehle tumhara ISP dekh sakta tha.',
    },
  },
  {
    question: 'What is the difference between a proxy and a reverse proxy?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A FORWARD proxy sits in front of CLIENTS and acts on their behalf — the server sees the proxy\'s IP, not the client\'s. Used for corporate filtering, caching, and anonymity. A REVERSE proxy sits in front of SERVERS and acts on their behalf — the client thinks it is talking to the real server. Used for load balancing, TLS termination, caching, and hiding backend topology. Nginx, HAProxy, and Cloudflare are typical reverse proxies; the difference is simply which side it represents.',
      hinglish:
        'Ek FORWARD proxy CLIENTS ke aage baithta hai aur unki taraf se act karta hai — server proxy ka IP dekhta hai, client ka nahi. Corporate filtering, caching, aur anonymity ke liye use hota hai. Ek REVERSE proxy SERVERS ke aage baithta hai aur unki taraf se act karta hai — client sochta hai wo real server se baat kar raha hai. Load balancing, TLS termination, caching, aur backend topology chhupane ke liye use hota hai. Nginx, HAProxy, aur Cloudflare typical reverse proxies hain; difference bas ye hai ki wo kis side ko represent karta hai.',
    },
  },
  {
    question: 'How does a load balancer work and what algorithms does it use?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A load balancer distributes incoming requests across multiple backend servers, running HEALTH CHECKS so failed servers are removed from rotation automatically. Algorithms: ROUND ROBIN (rotate evenly — simple, assumes equal servers), LEAST CONNECTIONS (send to the least busy — better for variable request durations), IP HASH (same client always reaches the same server — gives sticky sessions), and WEIGHTED variants for servers of differing capacity. Layer 4 balancers route on IP/port; layer 7 can route on URL path or headers.',
      hinglish:
        'Ek load balancer incoming requests ko multiple backend servers mein distribute karta hai, HEALTH CHECKS chalate hue taaki failed servers automatically rotation se hat jaayein. Algorithms: ROUND ROBIN (evenly rotate — simple, equal servers assume karta hai), LEAST CONNECTIONS (sabse kam busy ko bhejo — variable request durations ke liye better), IP HASH (same client hamesha same server pe pahunchta hai — sticky sessions deta hai), aur alag capacity wale servers ke liye WEIGHTED variants. Layer 4 balancers IP/port pe route karte hain; layer 7 URL path ya headers pe route kar sakte hain.',
    },
  },
  {
    question: 'What is latency, bandwidth, and throughput?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'LATENCY is DELAY — how long one packet takes to travel (measured in ms, bounded ultimately by the speed of light and distance). BANDWIDTH is CAPACITY — the maximum data rate a link can theoretically carry (Mbps). THROUGHPUT is ACTUAL achieved rate, always at or below bandwidth due to protocol overhead, congestion, and loss. The classic analogy: bandwidth is how many lanes the highway has, latency is how long the journey takes, throughput is how many cars actually arrive per hour.',
      hinglish:
        'LATENCY DELAY hai — ek packet ko travel karne mein kitna time lagta hai (ms mein measured, ultimately speed of light aur distance se bounded). BANDWIDTH CAPACITY hai — maximum data rate jo ek link theoretically carry kar sakta hai (Mbps). THROUGHPUT ACTUAL achieved rate hai, hamesha bandwidth pe ya usse neeche protocol overhead, congestion, aur loss ki wajah se. Classic analogy: bandwidth matlab highway mein kitni lanes hain, latency matlab safar mein kitna time lagta hai, throughput matlab per hour kitni gaadiyan actually pahunchti hain.',
    },
  },
  {
    question: 'What causes network latency and how do you reduce it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Four components: PROPAGATION delay (physical distance divided by signal speed — irreducible except by moving closer), TRANSMISSION delay (packet size divided by link rate), QUEUING delay (waiting in router buffers when congested), and PROCESSING delay. Reductions: use a CDN to cut physical distance, reduce round trips (HTTP/2 multiplexing, connection reuse, batching requests), compress payloads, use TLS session resumption, and place servers in regions near users. Note that propagation delay sets a hard floor no optimisation can beat.',
      hinglish:
        'Chaar components: PROPAGATION delay (physical distance bata signal speed — paas jaane ke alawa irreducible), TRANSMISSION delay (packet size bata link rate), QUEUING delay (congested hone pe router buffers mein wait), aur PROCESSING delay. Reductions: physical distance kam karne ke liye ek CDN use karo, round trips kam karo (HTTP/2 multiplexing, connection reuse, requests batch karna), payloads compress karo, TLS session resumption use karo, aur servers ko users ke paas regions mein rakho. Note karo ki propagation delay ek hard floor set karta hai jise koi optimisation beat nahi kar sakta.',
    },
  },
  {
    question: 'What network troubleshooting tools do you know?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PING tests basic reachability and round-trip time using ICMP. TRACEROUTE shows every hop along the path, revealing where latency spikes or packets die. NSLOOKUP/DIG query DNS directly to check resolution. NETSTAT/SS lists open ports and active connections. CURL tests HTTP endpoints with full header visibility. TCPDUMP/WIRESHARK capture actual packets for deep inspection. IFCONFIG/IP shows local interface configuration. A methodical order — ping, then DNS, then port, then application — localises most problems quickly.',
      hinglish:
        'PING ICMP se basic reachability aur round-trip time test karta hai. TRACEROUTE path ka har hop dikhata hai, reveal karte hue kahan latency spike hoti hai ya packets marte hain. NSLOOKUP/DIG resolution check karne ke liye DNS ko directly query karte hain. NETSTAT/SS open ports aur active connections list karte hain. CURL full header visibility ke saath HTTP endpoints test karta hai. TCPDUMP/WIRESHARK deep inspection ke liye actual packets capture karte hain. IFCONFIG/IP local interface configuration dikhate hain. Ek methodical order — ping, phir DNS, phir port, phir application — zyadatar problems jaldi localise kar deta hai.',
    },
  },
  {
    question: 'How would you debug "the website is not loading"?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Work UP the stack in order. (1) Is there any connectivity at all — ping the gateway, then 8.8.8.8. (2) Is DNS resolving — nslookup the domain; if the IP resolves but the name does not, it is DNS. (3) Is the port reachable — telnet or nc to port 443, ruling out firewall blocks. (4) Is TLS valid — check certificate expiry. (5) What does the server actually say — curl -v for status codes and headers. (6) Is it the browser — try incognito or another device to rule out cache/extensions. Each step eliminates a layer.',
      hinglish:
        'Stack ke UPAR order mein kaam karo. (1) Koi connectivity hai bhi — gateway ko ping karo, phir 8.8.8.8. (2) DNS resolve ho raha hai — domain ko nslookup karo; agar IP resolve hota hai par naam nahi, ye DNS hai. (3) Port reachable hai — port 443 pe telnet ya nc karo, firewall blocks rule out karte hue. (4) TLS valid hai — certificate expiry check karo. (5) Server actually kya kehta hai — status codes aur headers ke liye curl -v. (6) Ye browser hai — cache/extensions rule out karne ke liye incognito ya doosra device try karo. Har step ek layer eliminate karta hai.',
    },
  },
  {
    question: 'What is the difference between symmetric and asymmetric encryption?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'SYMMETRIC encryption uses ONE shared key for both encrypting and decrypting (AES) — very fast, but the key must somehow be shared securely first, which is the hard problem. ASYMMETRIC encryption uses a KEY PAIR: anyone can encrypt with the public key, only the private key can decrypt (RSA, ECC) — solves key distribution, but is orders of magnitude slower. TLS uses both pragmatically: asymmetric crypto to securely agree on a session key, then fast symmetric encryption for the actual data.',
      hinglish:
        'SYMMETRIC encryption encrypt aur decrypt dono ke liye EK shared key use karta hai (AES) — bahut fast, par key ko pehle kisi tarah securely share karna padta hai, jo hard problem hai. ASYMMETRIC encryption ek KEY PAIR use karta hai: koi bhi public key se encrypt kar sakta hai, sirf private key decrypt kar sakti hai (RSA, ECC) — key distribution solve karta hai, par orders of magnitude slower hai. TLS dono ko pragmatically use karta hai: ek session key pe securely agree karne ke liye asymmetric crypto, phir actual data ke liye fast symmetric encryption.',
    },
  },
  {
    question: 'What is packet switching vs circuit switching?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'CIRCUIT switching reserves a dedicated end-to-end path for the entire session (the traditional telephone network) — guaranteed capacity and constant latency, but the circuit sits idle and wasted during silence. PACKET switching splits data into independently routed packets sharing links with everyone else (the internet) — far more efficient use of capacity and resilient to link failures, at the cost of variable latency, possible reordering, and possible loss. The internet chose packet switching precisely for that efficiency and resilience.',
      hinglish:
        'CIRCUIT switching poore session ke liye ek dedicated end-to-end path reserve karta hai (traditional telephone network) — guaranteed capacity aur constant latency, par circuit silence ke dauraan idle aur waste padta hai. PACKET switching data ko independently routed packets mein split karta hai jo sabke saath links share karte hain (internet) — capacity ka bahut zyada efficient use aur link failures ke liye resilient, variable latency, possible reordering, aur possible loss ke cost pe. Internet ne packet switching exactly us efficiency aur resilience ke liye choose kiya.',
    },
  },
  {
    question: 'What happens when you type a URL and press Enter? (full walkthrough)',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '(1) The browser parses the URL and checks its cache. (2) DNS resolves the domain to an IP, checking browser, OS, then resolver caches. (3) ARP finds the gateway MAC if needed. (4) A TCP connection opens via the 3-way handshake. (5) For HTTPS, a TLS handshake verifies the certificate and agrees a session key. (6) The browser sends the HTTP request. (7) The request may traverse a CDN, load balancer, and reverse proxy before reaching an application server, which may query a database. (8) The response returns; the browser parses HTML, requests sub-resources (CSS/JS/images), builds the DOM and CSSOM, and renders — progressively painting as resources arrive.',
      hinglish:
        '(1) Browser URL parse karta hai aur apna cache check karta hai. (2) DNS domain ko ek IP mein resolve karta hai, browser, OS, phir resolver caches check karte hue. (3) Zaroorat ho to ARP gateway MAC dhundhta hai. (4) Ek TCP connection 3-way handshake se khulta hai. (5) HTTPS ke liye, ek TLS handshake certificate verify karta hai aur ek session key pe agree karta hai. (6) Browser HTTP request bhejta hai. (7) Request ek application server tak pahunchne se pehle ek CDN, load balancer, aur reverse proxy se guzar sakti hai, jo ek database query kar sakta hai. (8) Response wapas aata hai; browser HTML parse karta hai, sub-resources (CSS/JS/images) maangta hai, DOM aur CSSOM banata hai, aur render karta hai — resources aate hi progressively paint karte hue.',
    },
  },
  {
    question: 'What is the difference between TCP and IP — why are they always mentioned together?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'They operate at different layers and solve different halves of the problem. IP (layer 3) handles ADDRESSING and ROUTING — getting a packet to the right machine anywhere in the world — but it is unreliable and unordered by design: packets may be lost, duplicated, or arrive out of sequence. TCP (layer 4) sits on top and adds RELIABILITY — sequence numbers, acknowledgements, retransmission, and ordering — turning IP\'s best-effort delivery into a dependable byte stream. Together "TCP/IP" gives you both delivery and dependability.',
      hinglish:
        'Ye alag layers pe operate karte hain aur problem ke alag halves solve karte hain. IP (layer 3) ADDRESSING aur ROUTING handle karta hai — ek packet ko duniya mein kahin bhi sahi machine tak pahunchana — par ye by design unreliable aur unordered hai: packets kho sakte hain, duplicate ho sakte hain, ya out of sequence aa sakte hain. TCP (layer 4) uske upar baithta hai aur RELIABILITY add karta hai — sequence numbers, acknowledgements, retransmission, aur ordering — IP ki best-effort delivery ko ek dependable byte stream mein badalte hue. Saath mein "TCP/IP" tumhe delivery aur dependability dono deta hai.',
    },
  },
  {
    question: 'What is Quality of Service (QoS) in networking?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'QoS is the set of techniques for prioritising some traffic over other traffic when a link is congested, since not all traffic has equal requirements. A video call needs low, consistent latency and tolerates some loss; a file download needs throughput but does not care about delay. Mechanisms include traffic CLASSIFICATION (tagging packets by type), PRIORITY QUEUING (serving high-priority queues first), TRAFFIC SHAPING (smoothing bursts), and bandwidth RESERVATION. Without QoS, a large download can make voice calls unusable on the same link.',
      hinglish:
        'QoS un techniques ka set hai jo link congested hone pe kuch traffic ko doosre traffic pe prioritise karti hain, kyunki saare traffic ki requirements equal nahi hoti. Ek video call ko low, consistent latency chahiye aur kuch loss tolerate karta hai; ek file download ko throughput chahiye par delay ki parwah nahi. Mechanisms mein traffic CLASSIFICATION (packets ko type se tag karna), PRIORITY QUEUING (high-priority queues pehle serve karna), TRAFFIC SHAPING (bursts smooth karna), aur bandwidth RESERVATION shamil hain. QoS ke bina, ek bada download usi link pe voice calls ko unusable bana sakta hai.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
