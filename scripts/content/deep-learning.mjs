// Deep Learning course — advanced.
// Covers: Neural networks, backpropagation, CNNs, RNNs/Transformers, PyTorch basics.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Deep Learning',
  slug: 'deep-learning',
  description:
    'Neural networks se lekar modern architectures tak — perceptrons, activation functions, backpropagation, CNNs (images), RNNs aur Transformers (sequences), aur PyTorch basics. Advanced AI ka core, English aur Hinglish mein.',
  icon: '🔥',
  tags: ['deep-learning', 'neural-networks', 'pytorch', 'cnn', 'transformers'],
  difficulty: 'advanced',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 40,
};

const foundations = [
  {
    title: 'Neural Network Foundations',
    level: 'intermediate',
    description: 'Neurons, layers, activations aur backpropagation.',
    concepts: [
      {
        title: 'Neurons, Layers & Activation Functions',
        difficulty: 'medium',
        tags: ['neuron', 'layers', 'activation', 'relu'],
        explanation: {
          english:
            'A neural network is built from **neurons**. Each neuron computes a weighted sum of its inputs (`w·x + b`) and then applies a non-linear **activation function**. Stacking neurons into **layers** and layers into a network lets the model learn complex patterns.\n\nWithout activation functions, stacking layers would just be one big linear function — useless for complex data. Activations add non-linearity:\n- **ReLU** `max(0, x)` — the default; fast and avoids vanishing gradients\n- **Sigmoid** — squashes to (0,1), used for binary output\n- **Softmax** — turns a layer\'s outputs into class probabilities\n\nA typical network: input layer → hidden layers (ReLU) → output layer (sigmoid/softmax). "Deep" learning simply means many hidden layers.',
          hinglish:
            'Neural network **neurons** se bana hota hai. Har neuron apne inputs ka weighted sum compute karta hai (`w·x + b`) aur phir ek non-linear **activation function** apply karta hai. Neurons ko **layers** mein aur layers ko network mein stack karke model complex patterns seekhta hai.\n\nActivation functions ke bina layers stack karna bas ek bada linear function ban jaata — complex data ke liye bekaar. Activations non-linearity add karti hain:\n- **ReLU** `max(0, x)` — default; fast aur vanishing gradients avoid karta hai\n- **Sigmoid** — (0,1) mein squash karta hai, binary output ke liye\n- **Softmax** — layer ke outputs ko class probabilities mein badalta hai\n\nTypical network: input layer → hidden layers (ReLU) → output layer (sigmoid/softmax). "Deep" learning ka matlab bas bahut saari hidden layers.',
        },
        dailyLifeExample:
          'Neuron waise hai jaise ek chhota decision-maker: "agar samosa garam (input) hai aur bhookh zyada (input) hai, toh kharido". Bahut saare aise decision-makers layers mein milkar ek badi decision (jaise photo mein billi hai ya nahi) le lete hain.',
        codeExample:
          'import numpy as np\n\ndef relu(x):\n    return np.maximum(0, x)\n\n# One layer: 3 inputs -> 2 neurons\nx = np.array([1.0, -2.0, 0.5])\nW = np.array([[0.2, 0.8, -0.5],\n              [0.1, -0.3, 0.9]])\nb = np.array([0.0, 0.1])\n\nz = W @ x + b        # weighted sums\nout = relu(z)        # activation\nprint(np.round(out, 3))',
        keyPoints: [
          'A neuron = weighted sum (w·x + b) + a non-linear activation',
          'Activations add non-linearity so networks can learn complex patterns',
          'ReLU is the default hidden-layer activation (fast, avoids vanishing gradients)',
          'Sigmoid → binary output; Softmax → multi-class probabilities',
          '"Deep" = many stacked hidden layers',
        ],
        quiz: [
          {
            question: 'Why do neural networks need non-linear activation functions?',
            options: [
              'To make training slower',
              'Without them, stacked layers collapse into a single linear function',
              'To reduce the number of weights',
              'They are optional and rarely used',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which activation is the common default for hidden layers?',
            options: ['Sigmoid', 'ReLU', 'Softmax', 'Tanh only'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Backpropagation & Training Loop',
        difficulty: 'hard',
        tags: ['backpropagation', 'training', 'loss', 'epochs'],
        explanation: {
          english:
            '**Backpropagation** is how a network learns. It uses the chain rule of calculus to compute the gradient of the loss with respect to every weight, efficiently, layer by layer from output back to input.\n\nThe **training loop** repeats:\n1. **Forward pass** — feed a batch through the network to get predictions\n2. **Loss** — compare predictions to the true labels (e.g. cross-entropy)\n3. **Backward pass** — backprop computes gradients for all weights\n4. **Update** — the optimiser (SGD/Adam) nudges weights down the gradient\n\nOne pass over the whole dataset is an **epoch**; training runs for many epochs. Frameworks like PyTorch compute gradients automatically (autograd), so you rarely write backprop by hand — but understanding it is key to debugging training.',
          hinglish:
            '**Backpropagation** se network seekhta hai. Ye calculus ke chain rule ka use karke loss ka gradient har weight ke respect mein efficiently compute karta hai — output se input tak layer by layer peeche.\n\n**Training loop** repeat hoti hai:\n1. **Forward pass** — ek batch ko network se guzaar ke predictions lo\n2. **Loss** — predictions ko true labels se compare karo (jaise cross-entropy)\n3. **Backward pass** — backprop saare weights ke gradients compute karta hai\n4. **Update** — optimiser (SGD/Adam) weights ko gradient ke neeche nudge karta hai\n\nPoore dataset pe ek pass ek **epoch** hai; training bahut epochs chalti hai. PyTorch jaise frameworks gradients automatically compute karte hain (autograd), toh backprop haath se likhna padta nahi — par ise samajhna training debug karne ke liye key hai.',
        },
        dailyLifeExample:
          'Backprop waise hai jaise cricket coach: shot galat gaya (loss), coach peeche jaake batata hai — grip thodi galat thi, footwork thoda off tha (har step ka contribution). Agli ball pe player choti corrections karta hai. Bahut balls (epochs) baad shot perfect.',
        codeExample:
          '# Conceptual PyTorch training loop\nimport torch\n\nmodel = torch.nn.Linear(3, 1)\nopt = torch.optim.Adam(model.parameters(), lr=0.01)\nloss_fn = torch.nn.MSELoss()\n\nX = torch.randn(16, 3)\ny = torch.randn(16, 1)\n\nfor epoch in range(100):\n    opt.zero_grad()          # reset gradients\n    pred = model(X)          # 1. forward pass\n    loss = loss_fn(pred, y)  # 2. loss\n    loss.backward()          # 3. backprop (autograd)\n    opt.step()               # 4. update weights\nprint(round(loss.item(), 4))',
        keyPoints: [
          'Backpropagation uses the chain rule to get gradients for every weight',
          'Training loop: forward pass → loss → backward pass → update',
          'An epoch = one full pass over the training dataset',
          'Optimisers (SGD/Adam) apply the weight updates',
          'PyTorch autograd computes gradients automatically',
        ],
        quiz: [
          {
            question: 'What is the correct order of one training step?',
            options: [
              'Update → loss → forward → backward',
              'Forward pass → compute loss → backward pass → update weights',
              'Backward → forward → update → loss',
              'Loss → update → forward → backward',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is an epoch?',
            options: [
              'One weight update',
              'One full pass over the entire training dataset',
              'One neuron',
              'One layer',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is backpropagation?',
            answer: {
              english:
                'Backpropagation is the algorithm that computes gradients of the loss with respect to all network weights using the chain rule, propagating errors backward from the output layer to the input layer. These gradients are then used by an optimiser to update the weights.',
              hinglish:
                'Backpropagation wo algorithm hai jo chain rule ka use karke loss ke gradients saare network weights ke respect mein compute karta hai — errors ko output layer se input layer tak peeche propagate karke. Ye gradients phir optimiser weights update karne ke liye use karta hai.',
            },
          },
        ],
      },
    ],
  },
];

const architectures = [
  {
    title: 'Modern Architectures',
    level: 'advanced',
    description: 'CNNs images ke liye, RNNs aur Transformers sequences ke liye.',
    concepts: [
      {
        title: 'CNNs for Images',
        difficulty: 'hard',
        tags: ['cnn', 'convolution', 'computer-vision'],
        explanation: {
          english:
            '**Convolutional Neural Networks (CNNs)** are designed for images. Instead of connecting every pixel to every neuron (too many weights), a CNN slides small **filters (kernels)** across the image to detect local patterns — edges, then textures, then shapes, then objects — layer by layer.\n\nKey building blocks:\n- **Convolution layer** — applies learnable filters to detect features\n- **Pooling layer** — downsamples (e.g. max pooling) to shrink size and add robustness\n- **Fully connected layer** — combines features for the final classification\n\nCNNs power image classification, object detection, and medical imaging. This weight-sharing design makes them far more efficient than plain networks on visual data.',
          hinglish:
            '**Convolutional Neural Networks (CNNs)** images ke liye design kiye gaye hain. Har pixel ko har neuron se connect karne ke bajaye (bahut zyada weights), CNN chhote **filters (kernels)** ko image pe slide karke local patterns detect karta hai — edges, phir textures, phir shapes, phir objects — layer by layer.\n\nKey building blocks:\n- **Convolution layer** — learnable filters apply karke features detect karta hai\n- **Pooling layer** — downsample karta hai (jaise max pooling) size chhota karne aur robustness ke liye\n- **Fully connected layer** — final classification ke liye features combine karta hai\n\nCNNs image classification, object detection, aur medical imaging power karte hain. Ye weight-sharing design unhe visual data pe plain networks se kaafi efficient banata hai.',
        },
        dailyLifeExample:
          'CNN waise hai jaise ek jasoos jo photo ko chhoti khidki se scan karta hai — pehle lakeerein dekhta hai, phir aankh-naak jaise parts, phir poora chehra pehchaanta hai. Har layer thodi badi cheez samajhti hai.',
        codeExample:
          '# A tiny CNN in PyTorch for 28x28 grayscale digits (MNIST-style)\nimport torch.nn as nn\n\ncnn = nn.Sequential(\n    nn.Conv2d(1, 16, kernel_size=3, padding=1),  # detect features\n    nn.ReLU(),\n    nn.MaxPool2d(2),                              # 28x28 -> 14x14\n    nn.Conv2d(16, 32, kernel_size=3, padding=1),\n    nn.ReLU(),\n    nn.MaxPool2d(2),                              # 14x14 -> 7x7\n    nn.Flatten(),\n    nn.Linear(32 * 7 * 7, 10),                    # 10 classes\n)\nprint(cnn)',
        keyPoints: [
          'CNNs slide small learnable filters across images to detect local patterns',
          'Layers build up: edges → textures → shapes → objects',
          'Pooling downsamples to shrink size and add robustness',
          'Weight sharing makes CNNs efficient vs fully-connected nets on images',
          'Used for classification, object detection, medical imaging',
        ],
        quiz: [
          {
            question: 'What does a convolution layer do in a CNN?',
            options: [
              'Connects every pixel to every neuron',
              'Slides learnable filters over the image to detect local features',
              'Sorts the pixels',
              'Removes colour',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the purpose of a pooling layer?',
            options: [
              'To add more weights',
              'To downsample the feature maps (shrink size, add robustness)',
              'To increase image resolution',
              'To compute the loss',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'RNNs & Transformers for Sequences',
        difficulty: 'hard',
        tags: ['rnn', 'transformer', 'attention', 'nlp'],
        explanation: {
          english:
            'For sequences (text, time series, audio), order matters. **RNNs (and LSTMs/GRUs)** process tokens one at a time, carrying a hidden "memory" forward. They work but are slow (sequential) and struggle with long-range dependencies.\n\n**Transformers** replaced RNNs for most tasks. Their key idea is **self-attention**: every token can directly look at every other token and weigh how relevant each is. This captures long-range context and — crucially — processes the whole sequence in parallel, which is perfect for GPUs.\n\nTransformers are the backbone of modern AI: **BERT** (understanding), **GPT/Claude/Gemini** (generation), and vision transformers for images. Understanding attention is essential to understanding LLMs.',
          hinglish:
            'Sequences (text, time series, audio) ke liye order matter karta hai. **RNNs (aur LSTMs/GRUs)** tokens ko ek-ek karke process karte hain, ek hidden "memory" aage carry karte hue. Ye kaam karte hain par slow hain (sequential) aur long-range dependencies mein struggle karte hain.\n\n**Transformers** ne zyadatar tasks mein RNNs ko replace kar diya. Inka key idea hai **self-attention**: har token har doosre token ko directly dekh sakta hai aur weigh kar sakta hai ki kaun kitna relevant hai. Ye long-range context capture karta hai aur — crucially — poori sequence parallel mein process karta hai, jo GPUs ke liye perfect hai.\n\nTransformers modern AI ki backbone hain: **BERT** (understanding), **GPT/Claude/Gemini** (generation), aur vision transformers images ke liye. Attention samajhna LLMs samajhne ke liye essential hai.',
        },
        dailyLifeExample:
          'Attention waise hai jaise ek sentence padhte waqt tumhara dimaag: "usne bank ke paas gaadi rok di" — "gaadi" samajhne ke liye tum "rok di" pe zyada dhyaan dete ho, "bank" pe kam. Transformer har word ke liye aise hi relevance weigh karta hai — ek saath.',
        codeExample:
          '# Self-attention intuition (single head, simplified)\nimport numpy as np\n\ndef softmax(x):\n    e = np.exp(x - x.max(axis=-1, keepdims=True))\n    return e / e.sum(axis=-1, keepdims=True)\n\n# 3 tokens, each a 4-dim vector (toy Q, K, V = same here)\nX = np.random.rand(3, 4)\nscores = X @ X.T / np.sqrt(4)   # how much each token attends to others\nweights = softmax(scores)       # attention weights (rows sum to 1)\nout = weights @ X               # context-mixed representation\nprint(np.round(weights, 2))',
        keyPoints: [
          'RNNs/LSTMs process sequences step by step (slow, limited long-range memory)',
          'Transformers use self-attention: every token attends to every other token',
          'Attention captures long-range context and runs in parallel (GPU-friendly)',
          'Transformers power BERT, GPT, Claude, Gemini, and vision transformers',
          'Understanding attention is the key to understanding LLMs',
        ],
        quiz: [
          {
            question: 'What is the key mechanism in a Transformer?',
            options: [
              'Convolution',
              'Self-attention (tokens attend to each other)',
              'Max pooling',
              'Sequential memory only',
            ],
            correctIndex: 1,
          },
          {
            question: 'A major advantage of Transformers over RNNs is that they:',
            options: [
              'Use fewer numbers',
              'Process the whole sequence in parallel and capture long-range context',
              'Do not need training',
              'Only work on images',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const curriculum = [
  ...foundations,
  ...architectures,
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between machine learning and deep learning?',
    difficulty: 'easy',
    frequency: 'very-common',
    answer: {
      english:
        'Machine learning is the broad field of algorithms that learn patterns from data (including simple models like linear regression and decision trees, often with manual feature engineering). Deep learning is a subset that uses multi-layer neural networks to automatically learn features from raw data (images, text, audio), excelling on large datasets with enough compute.',
      hinglish:
        'Machine learning algorithms ka broad field hai jo data se patterns seekhte hain (simple models jaise linear regression, decision trees bhi, aksar manual feature engineering ke saath). Deep learning uska subset hai jo multi-layer neural networks use karke raw data (images, text, audio) se features automatically seekhta hai — bade datasets aur compute pe excel karta hai.',
    },
  },
  {
    question: 'Why did Transformers largely replace RNNs?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Transformers use self-attention, letting every token directly attend to every other token. This captures long-range dependencies better than RNNs and allows the entire sequence to be processed in parallel (instead of step-by-step), making training far faster and more scalable on GPUs.',
      hinglish:
        'Transformers self-attention use karte hain, jisse har token har doosre token ko directly attend karta hai. Ye RNNs se better long-range dependencies capture karta hai aur poori sequence parallel mein process hone deta hai (step-by-step ke bajaye), jisse training GPUs pe kaafi fast aur scalable ho jaati hai.',
    },
  },
];
