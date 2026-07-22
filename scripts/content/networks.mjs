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
