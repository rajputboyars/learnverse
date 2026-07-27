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
      {
        title: 'Vanishing & Exploding Gradients',
        difficulty: 'hard',
        tags: ['vanishing-gradients', 'exploding-gradients', 'deep-networks'],
        explanation: {
          english:
            "Backpropagation multiplies gradients together as it moves backward through every layer of a deep network — that's the chain rule. But repeated multiplication is dangerous: if each layer's gradient is a number slightly LESS than 1, multiplying many of them together (in a very deep network) shrinks the result toward ZERO by the time it reaches the early layers — the vanishing gradient problem. Those early layers then barely update, and the network stops learning from its earliest layers. The opposite can also happen: if gradients are slightly GREATER than 1, repeated multiplication makes them EXPLODE toward infinity, causing wildly unstable weight updates (or NaN values). Fixes include: better activation functions (ReLU instead of sigmoid/tanh, which saturate), careful weight initialization, batch normalization, residual/skip connections (which let gradients bypass layers), and gradient clipping (capping gradients to a maximum value to prevent explosions).",
          hinglish:
            "Backpropagation gradients ko ek doosre se multiply karta hai jaise wo deep network ki har layer se peeche jaata hai — yahi chain rule hai. Par baar-baar multiply karna dangerous hai: agar har layer ka gradient 1 se thoda KAM ho, to bahut saare ko multiply karne se (ek bahut deep network mein) result early layers tak pahunchte-pahunchte ZERO ki taraf shrink ho jaata hai — vanishing gradient problem. Wo early layers phir mushkil se update hote hain, aur network apni earliest layers se seekhna band kar deta hai. Ulta bhi ho sakta hai: agar gradients 1 se thode ZYADA hon, baar-baar multiply karne se wo infinity ki taraf EXPLODE ho jaate hain, jisse wildly unstable weight updates (ya NaN values) hote hain. Fixes mein shaamil hain: behtar activation functions (ReLU, sigmoid/tanh ke bajaye jo saturate hote hain), careful weight initialization, batch normalization, residual/skip connections (jo gradients ko layers bypass karne dete hain), aur gradient clipping (gradients ko ek maximum value tak cap karna explosions rokne ke liye).",
        },
        dailyLifeExample:
          "Vanishing gradients ek 'Chinese whispers' game jaisa hai jo bahut zyada logon ke through khela jaaye — original message (gradient) itna weaken/distort ho jaata hai ki pehle bande tak pahunchte-pahunchte kuch bacha hi nahi (zero ho gaya). Exploding gradients ulta hai — jaise ek afwaah jo har bande ke through badhti hi jaati hai, aakhir tak ek bilkul bhi bahka hua, extreme version ban jaati hai.",
        codeExample:
          "import torch\nimport torch.nn as nn\n\n# Sigmoid saturates (near-zero gradient) for large |x| -> contributes to vanishing gradients\n# ReLU does not saturate for x > 0 -> much healthier gradient flow in deep nets\nmodel_bad = nn.Sequential(*[nn.Linear(50, 50), nn.Sigmoid()] * 20)  # deep + sigmoid = risky\nmodel_better = nn.Sequential(*[nn.Linear(50, 50), nn.ReLU()] * 20)   # deep + ReLU = healthier\n\n# Gradient clipping: prevents exploding gradients during training\noptimizer = torch.optim.Adam(model_better.parameters(), lr=0.001)\n# ... after loss.backward() ...\ntorch.nn.utils.clip_grad_norm_(model_better.parameters(), max_norm=1.0)\noptimizer.step()",
        keyPoints: [
          'Backprop multiplies gradients layer by layer — repeated multiplication can shrink (vanish) or grow (explode) the result',
          'Vanishing gradients: early layers barely update, the network stops learning from its earliest layers',
          'Exploding gradients: wildly unstable weight updates, sometimes NaN values',
          'ReLU (vs sigmoid/tanh which saturate), batch normalization, and residual/skip connections help vanishing gradients',
          'Gradient clipping caps gradient magnitude to prevent exploding gradients',
        ],
        quiz: [
          {
            question: 'What causes the vanishing gradient problem in deep networks?',
            options: ['Too little training data', 'Repeatedly multiplying gradients slightly less than 1 through many layers shrinks the result toward zero by the time it reaches early layers', 'Using too few layers', 'The learning rate is too high'],
            correctIndex: 1,
          },
          {
            question: 'What is a practical fix specifically for exploding gradients during training?',
            options: ['Adding more layers', 'Gradient clipping — capping the gradient magnitude to a maximum value', 'Removing all activation functions', 'Increasing the batch size only'],
            correctIndex: 1,
          },
          {
            question: 'Why does ReLU generally help with vanishing gradients compared to sigmoid?',
            options: ['ReLU is just faster to compute, nothing else', 'Sigmoid saturates (near-zero gradient) for large inputs; ReLU does not saturate for positive inputs, so gradients flow better through deep networks', 'ReLU always outputs 1', 'There is no real difference'],
            correctIndex: 1,
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
      {
        title: 'Dropout & Batch Normalization: Regularizing Deep Networks',
        difficulty: 'hard',
        tags: ['dropout', 'batch-normalization', 'regularization'],
        explanation: {
          english:
            "Deep networks have so many parameters they easily overfit — memorizing training data instead of learning general patterns. Dropout combats this by randomly 'switching off' a fraction of neurons (e.g. 20-50%) on EVERY training step, forcing the network to not over-rely on any single neuron and effectively training many slightly-different sub-networks that get averaged together — a bit like an ensemble. Dropout is only active during TRAINING; at inference time all neurons are used (scaled appropriately). Batch Normalization is a different fix for a different problem: as weights update during training, the DISTRIBUTION of each layer's inputs keeps shifting (internal covariate shift), making training unstable and slow. BatchNorm re-centers and re-scales each layer's inputs (per mini-batch) to have a stable mean and variance, which lets you train faster, use higher learning rates, and makes the network less sensitive to initialization.",
          hinglish:
            "Deep networks mein itne saare parameters hote hain ki wo aasaani se overfit kar jaate hain — general patterns seekhne ke bajaye training data ratt lete hain. Dropout isse ladta hai HAR training step pe randomly neurons ka ek fraction (jaise 20-50%) 'switch off' karke, network ko kisi ek neuron pe zyada depend na karne ke liye majboor karte hue, effectively bahut saare thode-alag sub-networks train karke jo saath average ho jaate hain — ensemble jaisa kuch. Dropout sirf TRAINING ke dauraan active hota hai; inference time pe saare neurons use hote hain (appropriately scaled). Batch Normalization ek alag problem ka alag fix hai: jaise-jaise training mein weights update hote hain, har layer ke inputs ki DISTRIBUTION shift hoti rehti hai (internal covariate shift), training ko unstable aur slow bana deti hai. BatchNorm har layer ke inputs ko (per mini-batch) re-center aur re-scale karta hai stable mean aur variance ke saath, jisse tum fast train kar sakte ho, zyada learning rates use kar sakte ho, aur network initialization ke prati kam sensitive banta hai.",
        },
        dailyLifeExample:
          "Dropout ek sports team practice jaisa hai jaha coach randomly kuch players ko har practice session mein rest pe bhej deta hai — isse baaki team members har ek skill develop karte hain aur poori team kisi ek 'star player' pe over-depend nahi karti. Match day (inference) pe poori team khelti hai. BatchNorm ek assembly line jaisa hai jaha har station pe aane wale parts ko pehle ek consistent size/shape mein standardize kiya jaata hai, taaki agla station predictably kaam kar sake, chahe pichhle stations mein kitna bhi variation ho.",
        codeExample:
          "import torch.nn as nn\n\nmodel = nn.Sequential(\n    nn.Linear(784, 256),\n    nn.BatchNorm1d(256),   # stabilizes the distribution of layer inputs\n    nn.ReLU(),\n    nn.Dropout(0.3),       # randomly zeroes 30% of neurons EACH training step\n    nn.Linear(256, 128),\n    nn.BatchNorm1d(128),\n    nn.ReLU(),\n    nn.Dropout(0.3),\n    nn.Linear(128, 10),\n)\n\n# IMPORTANT: dropout/batchnorm behave differently in train vs eval mode\nmodel.train()  # dropout active, batchnorm uses batch statistics\n# ... training loop ...\n\nmodel.eval()   # dropout OFF (all neurons used), batchnorm uses running statistics\n# ... inference / evaluation ...",
        keyPoints: [
          'Dropout randomly disables a fraction of neurons on each training step to prevent overfitting',
          'Dropout is active only during training — all neurons are used at inference time',
          "Batch Normalization stabilizes each layer's input distribution during training (fixes internal covariate shift)",
          'BatchNorm allows faster training, higher learning rates, and less sensitivity to weight initialization',
          "Both behave differently in train vs eval mode — always call model.train()/model.eval() appropriately",
        ],
        quiz: [
          {
            question: 'What problem does Dropout help solve?',
            options: ['Slow training speed', 'Overfitting — the network memorizing training data instead of learning general patterns', 'Vanishing gradients only', 'Too few parameters'],
            correctIndex: 1,
          },
          {
            question: 'Is Dropout active during inference (making predictions on new data)?',
            options: ['Yes, always active', 'No — dropout is only active during training; all neurons are used at inference time', 'Only for the first prediction', 'Only if you forget to disable it'],
            correctIndex: 1,
          },
          {
            question: 'What problem does Batch Normalization primarily address?',
            options: ['It has nothing to do with training stability', "The distribution of each layer's inputs keeps shifting during training (internal covariate shift), making training unstable and slow", 'It only prevents overfitting like dropout', 'It replaces the need for activation functions'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: "Transfer Learning: Standing on Giants' Shoulders",
        difficulty: 'medium',
        tags: ['transfer-learning', 'fine-tuning', 'pretrained'],
        explanation: {
          english:
            "Training a large deep network from scratch needs huge datasets and massive compute — often unrealistic for an individual or small team. Transfer learning sidesteps this: you take a model already pretrained on a huge, general dataset (e.g. an image model trained on millions of photos, or a language model trained on huge amounts of text), and adapt it to YOUR specific, smaller task. The early/middle layers of a pretrained model have already learned general, reusable features (edges and textures for images; grammar and word meaning for text) — you typically FREEZE those layers (stop them from updating) and only train a new final layer (or a few) on your own smaller dataset. This needs far less data and compute than training from scratch, and usually gives BETTER results too, since the model starts with strong, general knowledge instead of random weights.",
          hinglish:
            "Ek bada deep network scratch se train karne ke liye huge datasets aur massive compute chahiye — akele ya chhoti team ke liye aksar unrealistic. Transfer learning ise bypass karta hai: tum ek pehle se hi ek huge, general dataset pe pretrained model lete ho (jaise ek image model jo lakhon photos pe train hua, ya ek language model jo bahut zyada text pe train hua), aur use APNE specific, chhote task ke liye adapt karte ho. Ek pretrained model ki early/middle layers ne pehle se hi general, reusable features seekh liye hain (images ke liye edges aur textures; text ke liye grammar aur word meaning) — tum typically un layers ko FREEZE kar dete ho (unhe update hone se rok dete ho) aur sirf ek naya final layer (ya kuch) apne chhote dataset pe train karte ho. Isse scratch se training se kaafi kam data aur compute chahiye, aur usually BEHTAR results bhi milte hain, kyunki model random weights ke bajaye strong, general knowledge se shuru hota hai.",
        },
        dailyLifeExample:
          "Transfer learning ek experienced chef ko naye restaurant mein hire karne jaisa hai — usse cooking basics (chopping, seasoning, heat control) sikhane ki zaroorat nahi, wo already jaanta hai. Tum bas use apni specific menu (naya, chhota task) sikhate ho. Ek fresh naya cook hire karna (scratch se training) bahut zyada time aur mehnat lega.",
        codeExample:
          "import torch\nimport torchvision.models as models\nimport torch.nn as nn\n\n# Load a model pretrained on ImageNet (millions of images)\nmodel = models.resnet18(pretrained=True)\n\n# Freeze all the pretrained layers — they already know general image features\nfor param in model.parameters():\n    param.requires_grad = False\n\n# Replace only the final layer, sized for YOUR task (e.g. 5 custom classes)\nmodel.fc = nn.Linear(model.fc.in_features, 5)\n# only model.fc's parameters will be trained — everything else stays frozen\n\n# Train on your own, much smaller dataset\n# optimizer = torch.optim.Adam(model.fc.parameters(), lr=0.001)",
        keyPoints: [
          'Transfer learning adapts a model pretrained on a huge, general dataset to a smaller, specific task',
          'Pretrained early/middle layers already know general, reusable features',
          'Freezing those layers and training only the final layer(s) needs far less data and compute',
          'Usually gives BETTER results than training from scratch, since it starts from strong general knowledge',
          'Extremely common in practice — most real-world deep learning starts from a pretrained model',
        ],
        quiz: [
          {
            question: 'What is the main benefit of transfer learning over training a deep network from scratch?',
            options: ['It always makes the model larger', 'It needs far less data and compute, by reusing general features already learned from a huge pretrained dataset', 'It removes the need for any training at all', 'It only works for image models'],
            correctIndex: 1,
          },
          {
            question: 'What does "freezing" layers in transfer learning mean?',
            options: ['Deleting those layers', 'Preventing those layers\' weights from updating during training, so only the new final layer(s) learn', 'Making the model run slower on purpose', 'Converting the model to a different framework'],
            correctIndex: 1,
          },
          {
            question: 'Why do early/middle layers of a pretrained image model transfer well to a new, different image task?',
            options: ['They do not transfer well at all', 'They already learned general, reusable low-level features like edges and textures, which are useful across many image tasks', 'They are randomly initialized anyway', 'They only work on the exact original dataset'],
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
    frequency: 'common',
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

  // ─── Neural Network Fundamentals ───────────────────────────────────────────
  {
    question: 'What is a neuron (perceptron) in a neural network?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A neuron is the basic computational unit: it takes several inputs, multiplies each by a learned weight, sums them, adds a bias, and passes the result through an activation function to produce its output. Mathematically: output = activation(w1*x1 + w2*x2 + ... + b). A single neuron can only learn a linear decision boundary; stacking many neurons across layers is what lets networks learn complex, non-linear patterns.',
      hinglish:
        'Ek neuron basic computational unit hai: ye kai inputs leta hai, har ek ko ek learned weight se multiply karta hai, unhe sum karta hai, ek bias add karta hai, aur result ko ek activation function se guzaar kar apna output banata hai. Mathematically: output = activation(w1*x1 + w2*x2 + ... + b). Ek single neuron sirf ek linear decision boundary seekh sakta hai; layers ke across bahut saare neurons stack karna hi networks ko complex, non-linear patterns seekhne deta hai.',
    },
  },
  {
    question: 'What are weights and biases in a neural network?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Weights determine how much influence each input has on a neuron\'s output — a large weight means that input matters a lot. Bias is an extra learned constant added to the weighted sum, letting the neuron shift its activation threshold so it can fire even when all inputs are zero. Together, weights and biases are the LEARNABLE PARAMETERS: training a network means finding the weight/bias values that minimise prediction error.',
      hinglish:
        'Weights decide karte hain ki har input ka ek neuron ke output pe kitna influence hai — ek bada weight matlab wo input bahut matter karta hai. Bias ek extra learned constant hai jo weighted sum mein add hota hai, neuron ko apna activation threshold shift karne deta hai taaki wo tab bhi fire kar sake jab saare inputs zero hon. Saath mein, weights aur biases LEARNABLE PARAMETERS hain: ek network train karna matlab wo weight/bias values dhundhna jo prediction error minimise karein.',
    },
  },
  {
    question: 'What is an activation function and why is it necessary?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An activation function introduces NON-LINEARITY into a neuron\'s output. Without it, no matter how many layers you stack, the entire network collapses mathematically into a single linear transformation — meaning it could never learn curved decision boundaries, image features, or language patterns. Activation functions are what give deep networks their expressive power to approximate almost any function.',
      hinglish:
        'Ek activation function ek neuron ke output mein NON-LINEARITY laata hai. Iske bina, tum chahe kitni bhi layers stack karo, poora network mathematically ek single linear transformation mein collapse ho jaata hai — matlab wo kabhi curved decision boundaries, image features, ya language patterns nahi seekh paayega. Activation functions hi deep networks ko wo expressive power dete hain ki wo almost koi bhi function approximate kar sakein.',
    },
  },
  {
    question: 'What is the ReLU activation function and why is it so popular?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'ReLU (Rectified Linear Unit) is simply f(x) = max(0, x) — it passes positive values through unchanged and turns all negatives to zero. It became the default hidden-layer activation because: it is extremely cheap to compute, it does not saturate for positive values (avoiding the vanishing-gradient problem that plagues sigmoid/tanh), and it produces sparse activations. Its weakness is the "dying ReLU" problem, where neurons stuck in the negative region output zero forever and stop learning — variants like Leaky ReLU address this.',
      hinglish:
        'ReLU (Rectified Linear Unit) simply f(x) = max(0, x) hai — ye positive values ko unchanged pass karta hai aur saare negatives ko zero bana deta hai. Ye default hidden-layer activation ban gaya kyunki: ye compute karna extremely sasta hai, positive values ke liye saturate nahi hota (us vanishing-gradient problem se bachta hai jo sigmoid/tanh ko pareshaan karti hai), aur sparse activations produce karta hai. Iski weakness "dying ReLU" problem hai, jahan negative region mein stuck neurons hamesha zero output karte hain aur seekhna band kar dete hain — Leaky ReLU jaise variants ise address karte hain.',
    },
  },
  {
    question: 'What is the difference between sigmoid, tanh, and softmax?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Sigmoid squashes any input into the range (0, 1) — used for BINARY classification output, since it reads as a probability. Tanh squashes into (-1, 1) — zero-centred, which historically made it preferable to sigmoid for hidden layers. Softmax takes a VECTOR of scores and converts it into a probability distribution summing to 1 — used for MULTI-CLASS classification output, where you need "probability of each of N classes". Both sigmoid and tanh saturate at their extremes, causing vanishing gradients, which is why ReLU replaced them in hidden layers.',
      hinglish:
        'Sigmoid kisi bhi input ko (0, 1) range mein squash karta hai — BINARY classification output ke liye use hota hai, kyunki ye ek probability ki tarah padha jaata hai. Tanh (-1, 1) mein squash karta hai — zero-centred, jo historically ise hidden layers ke liye sigmoid se better banata tha. Softmax scores ka ek VECTOR leta hai aur use ek probability distribution mein convert karta hai jo 1 tak sum hoti hai — MULTI-CLASS classification output ke liye use hota hai, jahan tumhe "N classes mein se har ek ki probability" chahiye. Sigmoid aur tanh dono apne extremes pe saturate hote hain, vanishing gradients cause karte hue, isliye ReLU ne unhe hidden layers mein replace kiya.',
    },
  },
  {
    question: 'What is forward propagation?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Forward propagation is the process of pushing input data FORWARD through the network — layer by layer, each layer computing weighted sums and applying activations — until a final prediction comes out. It is simply "running the model to get an output". During training, forward propagation happens first (to get a prediction and measure error), and backpropagation follows (to compute how to adjust the weights).',
      hinglish:
        'Forward propagation input data ko network se AAGE push karne ka process hai — layer by layer, har layer weighted sums compute karke activations apply karti hai — jab tak ek final prediction bahar na aaye. Ye simply "model chalake output lena" hai. Training ke dauraan, forward propagation pehle hoti hai (ek prediction lene aur error measure karne ke liye), aur backpropagation baad mein aati hai (ye compute karne ke liye ki weights kaise adjust karein).',
    },
  },
  {
    question: 'What is backpropagation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Backpropagation is the algorithm that computes how much each weight contributed to the final error, by applying the calculus CHAIN RULE backwards from the output layer to the input layer. It efficiently calculates the gradient (partial derivative of the loss with respect to every weight), which gradient descent then uses to nudge each weight in the direction that reduces error. Without backpropagation, training deep networks would be computationally infeasible — it is the single algorithm that made deep learning practical.',
      hinglish:
        'Backpropagation wo algorithm hai jo compute karta hai ki har weight ne final error mein kitna contribute kiya, calculus CHAIN RULE ko output layer se input layer tak ulta apply karke. Ye efficiently gradient calculate karta hai (har weight ke respect mein loss ka partial derivative), jise gradient descent phir har weight ko us direction mein nudge karne ke liye use karta hai jo error kam kare. Backpropagation ke bina, deep networks train karna computationally infeasible hota — yahi ek algorithm hai jisne deep learning ko practical banaya.',
    },
  },
  {
    question: 'What is a loss function?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A loss function measures HOW WRONG the model\'s prediction is compared to the true answer, producing a single number to minimise. It is the objective the entire training process optimises — the network adjusts its weights specifically to make this number smaller. Choosing the right loss function for your task is critical: the wrong one will train the model toward the wrong goal even if everything else is correct.',
      hinglish:
        'Ek loss function measure karta hai ki model ki prediction true answer ke comparison mein KITNI GALAT hai, ek single number produce karte hue jise minimise karna hai. Ye wo objective hai jise poora training process optimise karta hai — network apne weights specifically is number ko chhota karne ke liye adjust karta hai. Apne task ke liye sahi loss function choose karna critical hai: galat wala model ko galat goal ki taraf train karega chahe baaki sab kuch correct ho.',
    },
  },
  {
    question: 'What is the difference between MSE and Cross-Entropy loss?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'MSE (Mean Squared Error) averages the squared differences between predicted and actual values — used for REGRESSION (predicting continuous numbers like house price). Cross-Entropy measures the difference between two probability distributions and heavily penalises confident wrong predictions — used for CLASSIFICATION (predicting discrete classes). Using MSE for classification is a classic mistake: it produces weaker gradients and trains much more slowly than cross-entropy for that task.',
      hinglish:
        'MSE (Mean Squared Error) predicted aur actual values ke beech squared differences ka average nikaalta hai — REGRESSION ke liye use hota hai (house price jaise continuous numbers predict karna). Cross-Entropy do probability distributions ke beech difference measure karta hai aur confident galat predictions ko bahut zyada penalise karta hai — CLASSIFICATION ke liye use hota hai (discrete classes predict karna). Classification ke liye MSE use karna ek classic mistake hai: ye us task ke liye cross-entropy se weaker gradients produce karta hai aur bahut slowly train karta hai.',
    },
  },
  {
    question: 'What is gradient descent?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Gradient descent is the optimisation algorithm that actually trains the network. The gradient tells you which direction increases the loss; gradient descent steps in the OPPOSITE direction (downhill) to reduce it. Each weight is updated as: new_weight = old_weight - learning_rate * gradient. Repeating this over many examples slowly walks the model down the "loss landscape" toward a minimum where predictions are accurate.',
      hinglish:
        'Gradient descent wo optimisation algorithm hai jo actually network ko train karta hai. Gradient batata hai kaunsi direction loss badhati hai; gradient descent ULTI direction mein step leta hai (downhill) use kam karne ke liye. Har weight aise update hota hai: new_weight = old_weight - learning_rate * gradient. Ise bahut saare examples pe repeat karna model ko dheere-dheere "loss landscape" mein neeche ek minimum ki taraf le jaata hai jahan predictions accurate hoti hain.',
    },
  },
  {
    question: 'What is the learning rate and why does it matter so much?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The learning rate controls the SIZE of each weight-update step. Too high, and the model overshoots the minimum, bouncing around wildly or diverging entirely (loss becomes NaN). Too low, and training crawls, potentially taking days instead of hours or getting stuck in a poor local minimum. It is often the single most important hyperparameter to tune, which is why techniques like learning-rate schedules (gradually decreasing it) and adaptive optimisers (Adam) exist.',
      hinglish:
        'Learning rate har weight-update step ka SIZE control karta hai. Bahut zyada, aur model minimum ko overshoot kar deta hai, wildly bounce karta hai ya poori tarah diverge ho jaata hai (loss NaN ban jaata hai). Bahut kam, aur training rengti hai, ghanton ke bajaye din lag sakte hain ya ek poor local minimum mein atak sakta hai. Ye aksar tune karne ke liye sabse important single hyperparameter hota hai, isliye learning-rate schedules (dheere-dheere kam karna) aur adaptive optimisers (Adam) jaisi techniques exist karti hain.',
    },
  },
  {
    question: 'What is the difference between an epoch, a batch, and an iteration?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An EPOCH is one complete pass through the entire training dataset. A BATCH is the subset of examples processed together before one weight update. An ITERATION is one weight update (i.e. processing one batch). Example: 10,000 training images with batch size 100 means 100 iterations per epoch. Training for 10 epochs = 1,000 total iterations. Confusing these three is a very common interview slip.',
      hinglish:
        'Ek EPOCH poore training dataset ka ek complete pass hai. Ek BATCH examples ka wo subset hai jo ek weight update se pehle saath process hota hai. Ek ITERATION ek weight update hai (matlab ek batch process karna). Example: 10,000 training images batch size 100 ke saath matlab per epoch 100 iterations. 10 epochs ke liye training = total 1,000 iterations. In teeno ko confuse karna ek bahut common interview slip hai.',
    },
  },
  {
    question: 'What is the difference between batch, mini-batch, and stochastic gradient descent?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'BATCH gradient descent computes the gradient using the ENTIRE dataset before each update — very stable but extremely slow and memory-hungry on large data. STOCHASTIC (SGD) updates after EVERY single example — very fast per step but noisy, causing the loss to jump around. MINI-BATCH (typically 32-512 examples) is the practical middle ground used almost universally: stable enough to converge smoothly, small enough to fit in GPU memory, and large enough to exploit parallel hardware efficiently.',
      hinglish:
        'BATCH gradient descent har update se pehle POORE dataset se gradient compute karta hai — bahut stable par bade data pe extremely slow aur memory-hungry. STOCHASTIC (SGD) HAR single example ke baad update karta hai — per step bahut fast par noisy, loss ko udhar-idhar jump karwaata hai. MINI-BATCH (typically 32-512 examples) practical middle ground hai jo almost universally use hota hai: smoothly converge karne ke liye kaafi stable, GPU memory mein fit hone ke liye kaafi chhota, aur parallel hardware efficiently exploit karne ke liye kaafi bada.',
    },
  },
  {
    question: 'What are optimisers and how does Adam differ from plain SGD?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An optimiser is the rule for HOW to apply gradients to weights. Plain SGD uses a single fixed learning rate for every weight. MOMENTUM adds a "velocity" term so updates keep some direction from previous steps, helping push through flat regions and dampening oscillation. RMSprop scales the learning rate per-weight based on recent gradient magnitudes. ADAM combines momentum AND per-weight adaptive rates, which makes it converge quickly with little tuning — this is why Adam is the common default choice for most deep learning tasks.',
      hinglish:
        'Ek optimiser wo rule hai ki gradients ko weights pe KAISE apply karein. Plain SGD har weight ke liye ek single fixed learning rate use karta hai. MOMENTUM ek "velocity" term add karta hai taaki updates previous steps se kuch direction rakhein, flat regions se push karne mein madad karte hue aur oscillation dampen karte hue. RMSprop recent gradient magnitudes ke basis pe per-weight learning rate scale karta hai. ADAM momentum AUR per-weight adaptive rates dono combine karta hai, jisse ye kam tuning ke saath jaldi converge karta hai — isliye Adam zyadatar deep learning tasks ke liye common default choice hai.',
    },
  },
  {
    question: 'What is overfitting in deep learning?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Overfitting is when a model memorises the training data — including its noise and quirks — instead of learning generalisable patterns. The telltale sign: training loss keeps dropping while VALIDATION loss stops improving or starts rising. The model performs beautifully on data it has seen and poorly on anything new. Deep networks are especially prone to it because they have enough parameters to memorise the entire dataset if allowed.',
      hinglish:
        'Overfitting tab hai jab ek model training data ko ratta maar leta hai — uska noise aur quirks bhi — generalisable patterns seekhne ke bajaye. Pehchaan: training loss girta rehta hai jabki VALIDATION loss improve hona band kar deta hai ya badhne lagta hai. Model us data pe beautifully perform karta hai jo usne dekha hai aur kisi bhi naye pe kharab. Deep networks iske liye especially prone hain kyunki unke paas kaafi parameters hote hain poora dataset ratta maarne ke liye agar allow kiya jaaye.',
    },
  },
  {
    question: 'What is underfitting and how is it different from overfitting?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Underfitting is when the model is TOO SIMPLE (or under-trained) to capture even the basic patterns in the data — both training AND validation loss stay high. Overfitting is the opposite extreme: training loss is very low but validation loss is high. Underfitting is fixed by increasing model capacity, training longer, or improving features; overfitting is fixed by regularisation, more data, or reducing capacity. The goal is the sweet spot between the two.',
      hinglish:
        'Underfitting tab hai jab model data mein basic patterns bhi capture karne ke liye BAHUT SIMPLE (ya under-trained) ho — training AUR validation loss dono high rehte hain. Overfitting ulta extreme hai: training loss bahut kam par validation loss high. Underfitting model capacity badhane, zyada der train karne, ya features improve karne se fix hota hai; overfitting regularisation, zyada data, ya capacity kam karne se fix hota hai. Goal dono ke beech ka sweet spot hai.',
    },
  },
  {
    question: 'What is regularisation, and what is the difference between L1 and L2?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Regularisation adds a penalty term to the loss function that discourages overly complex models, reducing overfitting. L2 (Ridge/weight decay) penalises the SQUARE of weights, pushing all weights toward small-but-nonzero values — the most common choice in deep learning. L1 (Lasso) penalises the ABSOLUTE value of weights, driving some weights exactly to zero, which effectively performs automatic feature selection and produces sparse models.',
      hinglish:
        'Regularisation loss function mein ek penalty term add karta hai jo overly complex models ko discourage karta hai, overfitting kam karte hue. L2 (Ridge/weight decay) weights ke SQUARE ko penalise karta hai, saare weights ko chhote-par-nonzero values ki taraf push karte hue — deep learning mein sabse common choice. L1 (Lasso) weights ke ABSOLUTE value ko penalise karta hai, kuch weights ko exactly zero pe le jaata hai, jo effectively automatic feature selection karta hai aur sparse models produce karta hai.',
    },
  },
  {
    question: 'What is data augmentation?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Data augmentation artificially expands a training set by creating modified copies of existing examples — for images: rotating, flipping, cropping, adjusting brightness, adding noise; for text: synonym replacement or back-translation. The label stays the same (a rotated cat is still a cat), so the model learns that these variations do not change the answer, making it more robust and reducing overfitting without collecting any new data.',
      hinglish:
        'Data augmentation ek training set ko artificially expand karta hai existing examples ki modified copies banake — images ke liye: rotate, flip, crop, brightness adjust, noise add karna; text ke liye: synonym replacement ya back-translation. Label same rehta hai (ek rotated cat abhi bhi cat hai), isliye model seekhta hai ki ye variations answer nahi badalte, use zyada robust banate hue aur koi naya data collect kiye bina overfitting kam karte hue.',
    },
  },
  {
    question: 'What is early stopping?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Early stopping monitors validation loss during training and halts as soon as it stops improving for a set number of epochs ("patience"), then restores the weights from the best-performing epoch. It is the simplest and most practical anti-overfitting technique: rather than guessing the ideal number of epochs in advance, you let the validation metric tell you exactly when the model has stopped generalising better.',
      hinglish:
        'Early stopping training ke dauraan validation loss monitor karta hai aur jaise hi wo ek set number of epochs ("patience") tak improve hona band kar de, ruk jaata hai, phir best-performing epoch ke weights restore karta hai. Ye sabse simple aur practical anti-overfitting technique hai: pehle se ideal number of epochs guess karne ke bajaye, tum validation metric ko exactly batane dete ho ki model ne better generalise karna kab band kiya.',
    },
  },
  {
    question: 'Why do you split data into train, validation, and test sets?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'TRAIN is used to fit the weights. VALIDATION is used during development to tune hyperparameters and decide when to stop — the model never trains on it, but you make decisions based on it, so it becomes indirectly "contaminated". TEST is touched only ONCE at the very end, giving an honest estimate of real-world performance. Skipping the validation set and tuning against the test set is a classic mistake that produces falsely optimistic results.',
      hinglish:
        'TRAIN weights fit karne ke liye use hota hai. VALIDATION development ke dauraan hyperparameters tune karne aur decide karne ke liye ki kab rukna hai — model uspe kabhi train nahi hota, par tum uske basis pe decisions lete ho, isliye wo indirectly "contaminated" ho jaata hai. TEST sirf EK BAAR sabse end mein touch hota hai, real-world performance ka ek honest estimate dete hue. Validation set skip karke test set ke against tune karna ek classic mistake hai jo falsely optimistic results deta hai.',
    },
  },

  // ─── CNNs (Computer Vision) ───────────────────────────────────────────
  {
    question: 'What is a CNN (Convolutional Neural Network)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A CNN is a network architecture designed for grid-like data, especially images. Instead of connecting every pixel to every neuron (which would need astronomically many parameters), it slides small learnable FILTERS across the image to detect local patterns like edges, then combines those into higher-level features (shapes, then objects) in deeper layers. This gives it two key advantages: far fewer parameters, and translation invariance — a cat is recognised whether it appears top-left or bottom-right.',
      hinglish:
        'Ek CNN ek network architecture hai jo grid-like data ke liye design kiya gaya hai, especially images. Har pixel ko har neuron se connect karne ke bajaye (jisme astronomically bahut parameters chahiye honge), ye chhote learnable FILTERS ko image ke across slide karta hai local patterns jaise edges detect karne ke liye, phir unhe deeper layers mein higher-level features (shapes, phir objects) mein combine karta hai. Isse do key advantages milte hain: bahut kam parameters, aur translation invariance — ek cat pehchaani jaati hai chahe wo top-left ya bottom-right mein ho.',
    },
  },
  {
    question: 'What is a convolution operation and what are filters/kernels?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A filter (or kernel) is a small matrix of learnable weights, typically 3x3 or 5x5. The convolution operation slides this filter across the input, computing a dot product at each position, producing a "feature map" that highlights wherever that filter\'s pattern appears. Crucially, the SAME filter weights are reused at every position (weight sharing) — this is what makes CNNs parameter-efficient, and different filters in a layer learn to detect different patterns (one for vertical edges, one for curves, etc.).',
      hinglish:
        'Ek filter (ya kernel) learnable weights ka ek chhota matrix hai, typically 3x3 ya 5x5. Convolution operation is filter ko input ke across slide karta hai, har position pe ek dot product compute karta hai, ek "feature map" produce karte hue jo highlight karta hai jahan bhi us filter ka pattern dikhe. Crucially, WAHI filter weights har position pe reuse hote hain (weight sharing) — yahi CNNs ko parameter-efficient banata hai, aur ek layer mein different filters different patterns detect karna seekhte hain (ek vertical edges ke liye, ek curves ke liye, etc.).',
    },
  },
  {
    question: 'What is pooling in a CNN?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Pooling downsamples a feature map, reducing its spatial size. MAX pooling takes the largest value in each small window (e.g. 2x2), keeping the strongest detected feature; AVERAGE pooling takes the mean. Benefits: fewer parameters and computation in later layers, a larger effective receptive field, and some translation invariance (a feature shifted by one pixel still lands in the same pooling window). Modern architectures sometimes replace pooling with strided convolutions instead.',
      hinglish:
        'Pooling ek feature map ko downsample karta hai, uska spatial size kam karte hue. MAX pooling har chhote window (jaise 2x2) mein sabse badi value leta hai, sabse strong detected feature rakhte hue; AVERAGE pooling mean leta hai. Benefits: later layers mein kam parameters aur computation, ek bada effective receptive field, aur kuch translation invariance (ek pixel shift hua feature abhi bhi usi pooling window mein girta hai). Modern architectures kabhi-kabhi pooling ki jagah strided convolutions use karte hain.',
    },
  },
  {
    question: 'What are stride and padding in convolutions?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'STRIDE is how many pixels the filter jumps at each step — stride 1 moves one pixel at a time (dense, preserves size), stride 2 skips every other position (halves the output size, acting like downsampling). PADDING adds a border of (usually zero) pixels around the input, which lets the filter properly process edge pixels and allows the output to keep the SAME spatial dimensions as the input ("same" padding) instead of shrinking with each layer ("valid" padding).',
      hinglish:
        'STRIDE ye hai ki filter har step pe kitne pixels jump karta hai — stride 1 ek time mein ek pixel move karta hai (dense, size preserve karta hai), stride 2 har doosri position skip karta hai (output size aadha karta hai, downsampling jaisa kaam karte hue). PADDING input ke around (usually zero) pixels ka ek border add karta hai, jo filter ko edge pixels properly process karne deta hai aur output ko input ke SAME spatial dimensions rakhne deta hai ("same" padding) har layer ke saath shrink hone ke bajaye ("valid" padding).',
    },
  },

  // ─── RNNs & Sequences ───────────────────────────────────────────
  {
    question: 'What is an RNN (Recurrent Neural Network)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An RNN processes SEQUENTIAL data (text, time series, audio) by maintaining a hidden "memory" state that carries information from previous steps forward. At each time step, it combines the current input with the previous hidden state to produce a new hidden state — giving it a form of memory that plain feedforward networks lack. Its critical weakness is that it must process steps one at a time (no parallelism) and struggles to retain information across long sequences.',
      hinglish:
        'Ek RNN SEQUENTIAL data (text, time series, audio) ko process karta hai ek hidden "memory" state maintain karke jo previous steps se information aage le jaata hai. Har time step pe, ye current input ko previous hidden state ke saath combine karke ek naya hidden state banata hai — use ek tarah ki memory dete hue jo plain feedforward networks ke paas nahi hoti. Iski critical weakness hai ki ise steps ek-ek karke process karna padta hai (koi parallelism nahi) aur long sequences ke across information retain karne mein struggle karta hai.',
    },
  },
  {
    question: 'What is the vanishing gradient problem in RNNs?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'When backpropagating through many time steps, gradients get multiplied repeatedly by small numbers, shrinking exponentially until they effectively vanish. The practical result: the network cannot learn dependencies between distant elements — it forgets what happened 50 words ago. This is precisely why plain RNNs fail on long text, and why LSTM/GRU (with gating mechanisms that let gradients flow more directly) and later Transformers (with direct attention between all positions) were invented.',
      hinglish:
        'Jab bahut saare time steps ke through backpropagate karte hain, gradients baar-baar chhote numbers se multiply hote hain, exponentially shrink hote hue jab tak wo effectively vanish na ho jaayein. Practical result: network distant elements ke beech dependencies nahi seekh sakta — wo bhool jaata hai 50 words pehle kya hua tha. Yahi exactly wajah hai ki plain RNNs long text pe fail hote hain, aur LSTM/GRU (gating mechanisms ke saath jo gradients ko zyada directly flow karne dete hain) aur baad mein Transformers (saari positions ke beech direct attention ke saath) invent hue.',
    },
  },
  {
    question: 'What is an LSTM and how does it solve the vanishing gradient problem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An LSTM (Long Short-Term Memory) adds an explicit "cell state" — a memory highway that runs through the sequence with minimal modification — plus three learnable GATES: the forget gate (what to discard from memory), the input gate (what new information to store), and the output gate (what to expose as output). Because the cell state is mostly added to rather than repeatedly multiplied, gradients flow backward much more easily, allowing LSTMs to learn dependencies across hundreds of time steps.',
      hinglish:
        'Ek LSTM (Long Short-Term Memory) ek explicit "cell state" add karta hai — ek memory highway jo sequence se minimal modification ke saath guzarta hai — plus teen learnable GATES: forget gate (memory se kya discard karna hai), input gate (kaunsi nayi information store karni hai), aur output gate (output ke roop mein kya expose karna hai). Kyunki cell state mostly add hota hai baar-baar multiply hone ke bajaye, gradients bahut zyada easily backward flow karte hain, LSTMs ko sau se zyada time steps ke across dependencies seekhne dete hue.',
    },
  },
  {
    question: 'What is the difference between LSTM and GRU?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A GRU (Gated Recurrent Unit) is a simplified LSTM: it merges the forget and input gates into a single "update gate", adds a "reset gate", and drops the separate cell state (using only the hidden state). The result is fewer parameters and faster training with comparable accuracy on most tasks. Practical guidance: try GRU first for speed and smaller datasets; LSTM can edge ahead on very long sequences or when you have plenty of data.',
      hinglish:
        'Ek GRU (Gated Recurrent Unit) ek simplified LSTM hai: ye forget aur input gates ko ek single "update gate" mein merge karta hai, ek "reset gate" add karta hai, aur separate cell state drop kar deta hai (sirf hidden state use karte hue). Result hai kam parameters aur faster training, zyadatar tasks pe comparable accuracy ke saath. Practical guidance: speed aur chhote datasets ke liye pehle GRU try karo; LSTM bahut long sequences pe ya jab bahut data ho tab thoda aage nikal sakta hai.',
    },
  },
  {
    question: 'What is the attention mechanism?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Attention lets a model dynamically decide WHICH parts of the input matter most for the current output, rather than compressing everything into one fixed-size state. For each output position, it computes a set of weights over all input positions and takes a weighted sum — effectively "looking back" at the most relevant words. This solved the RNN bottleneck of cramming an entire sentence into a single vector, and is the core mechanism that makes Transformers work.',
      hinglish:
        'Attention ek model ko dynamically decide karne deta hai ki input ke KAUNSE parts current output ke liye sabse zyada matter karte hain, sab kuch ek fixed-size state mein compress karne ke bajaye. Har output position ke liye, ye saari input positions pe weights ka ek set compute karta hai aur ek weighted sum leta hai — effectively sabse relevant words pe "peeche dekhte hue". Isne RNN ka wo bottleneck solve kiya jisme poora sentence ek single vector mein ghusaana padta tha, aur yahi core mechanism hai jo Transformers ko kaam karta hai.',
    },
  },
  {
    question: 'What is self-attention?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Self-attention is attention applied WITHIN a single sequence: every token attends to every other token in the same sequence to build a context-aware representation of itself. In "The animal did not cross the street because it was too tired", self-attention is what lets the model connect "it" back to "animal" rather than "street". Each token produces Query, Key, and Value vectors; the similarity between a Query and all Keys determines how much of each Value gets mixed in.',
      hinglish:
        'Self-attention ek single sequence ke ANDAR apply hone wala attention hai: har token usi sequence ke har doosre token ko attend karta hai apna ek context-aware representation banane ke liye. "The animal did not cross the street because it was too tired" mein, self-attention hi model ko "it" ko "street" ke bajaye "animal" se connect karne deta hai. Har token Query, Key, aur Value vectors produce karta hai; ek Query aur saare Keys ke beech similarity decide karti hai ki har Value ka kitna mix hoga.',
    },
  },

  // ─── Modern Practice ───────────────────────────────────────────
  {
    question: 'What is transfer learning?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Transfer learning reuses a model already trained on a huge general dataset (e.g. ResNet on ImageNet, BERT on web text) and adapts it to your specific, smaller task. The early layers have already learned universally useful features (edges, textures, grammar), so you only need to retrain the final layers on your data. This lets you achieve strong results with a few thousand examples instead of millions, and hours of training instead of weeks.',
      hinglish:
        'Transfer learning ek aisa model reuse karta hai jo pehle se ek huge general dataset pe train hua hai (jaise ImageNet pe ResNet, web text pe BERT) aur use tumhare specific, chhote task ke liye adapt karta hai. Early layers ne already universally useful features (edges, textures, grammar) seekh liye hain, isliye tumhe sirf final layers ko apne data pe retrain karna hai. Isse tum millions ke bajaye kuch hazaar examples se, aur weeks ke bajaye ghanton ki training se strong results paa lete ho.',
    },
  },
  {
    question: 'What is the difference between freezing layers and fine-tuning all layers?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'FREEZING means locking the pre-trained layers so their weights never update — you only train the new head you added. This is fast, needs very little data, and is safest when your dataset is small or very similar to the original. FINE-TUNING ALL layers unfreezes everything and trains with a very LOW learning rate, letting the whole network adapt. This gives better results when you have more data or a domain quite different from the original, but risks destroying the useful pre-trained features if the learning rate is too high.',
      hinglish:
        'FREEZING matlab pre-trained layers ko lock karna taaki unke weights kabhi update na hon — tum sirf apna added naya head train karte ho. Ye fast hai, bahut kam data chahiye, aur sabse safe hai jab tumhara dataset chhota ho ya original se bahut similar ho. SAARI layers FINE-TUNE karna sab unfreeze karta hai aur ek bahut LOW learning rate se train karta hai, poore network ko adapt hone dete hue. Ye better results deta hai jab zyada data ho ya domain original se kaafi different ho, par agar learning rate bahut high ho to useful pre-trained features destroy hone ka risk hai.',
    },
  },
  {
    question: 'What is dropout and how does it work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Dropout randomly "switches off" a fraction of neurons (e.g. 50%) during EACH training step, forcing the network to not rely too heavily on any single neuron and instead learn redundant, robust representations. It effectively trains a huge ensemble of slightly different sub-networks that share weights. Critically, dropout is DISABLED at inference time — all neurons are active when actually making predictions, with outputs scaled appropriately.',
      hinglish:
        'Dropout HAR training step ke dauraan neurons ka ek fraction (jaise 50%) randomly "switch off" karta hai, network ko majboor karte hue ki wo kisi single neuron pe bahut zyada depend na kare aur uske bajaye redundant, robust representations seekhe. Ye effectively thode different sub-networks ka ek huge ensemble train karta hai jo weights share karte hain. Critically, dropout inference time pe DISABLED hota hai — actual predictions banate waqt saare neurons active hote hain, outputs appropriately scaled hote hue.',
    },
  },
  {
    question: 'What is batch normalisation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Batch normalisation normalises the inputs to each layer (per mini-batch) to have roughly zero mean and unit variance, then applies two learnable parameters to scale and shift them. Benefits: training becomes much more stable and faster, you can safely use higher learning rates, the network is less sensitive to weight initialisation, and it adds a mild regularisation effect. It largely solved the "internal covariate shift" problem that made very deep networks hard to train.',
      hinglish:
        'Batch normalisation har layer ke inputs ko normalise karta hai (per mini-batch) taaki unka roughly zero mean aur unit variance ho, phir unhe scale aur shift karne ke liye do learnable parameters apply karta hai. Benefits: training bahut zyada stable aur fast ho jaati hai, tum safely higher learning rates use kar sakte ho, network weight initialisation ke liye kam sensitive hota hai, aur ye ek mild regularisation effect bhi add karta hai. Isne largely wo "internal covariate shift" problem solve ki jo bahut deep networks ko train karna mushkil banati thi.',
    },
  },
  {
    question: 'Why is weight initialisation important?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'If all weights start at zero, every neuron in a layer computes exactly the same thing and receives identical gradients — the network can never break symmetry and learn distinct features. If weights start too large, activations and gradients explode; too small, and they vanish. Smart schemes like Xavier/Glorot (for tanh/sigmoid) and He initialisation (for ReLU) set the initial random scale based on layer size specifically to keep signal variance stable as it flows through many layers.',
      hinglish:
        'Agar saare weights zero pe start hon, ek layer mein har neuron exactly same cheez compute karta hai aur identical gradients receive karta hai — network kabhi symmetry tod ke distinct features nahi seekh sakta. Agar weights bahut bade start hon, activations aur gradients explode ho jaate hain; bahut chhote, aur wo vanish ho jaate hain. Xavier/Glorot (tanh/sigmoid ke liye) aur He initialisation (ReLU ke liye) jaise smart schemes initial random scale ko layer size ke basis pe set karte hain specifically taaki signal variance stable rahe jab wo bahut saari layers se flow kare.',
    },
  },
  {
    question: 'What is the exploding gradient problem and how do you fix it?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Exploding gradients are the opposite of vanishing: gradients get multiplied by large numbers repeatedly and grow exponentially, producing enormous weight updates that destabilise training — you typically see the loss suddenly become NaN or infinity. The standard fix is GRADIENT CLIPPING: cap the gradient norm at a threshold (e.g. 1.0) before applying the update. Proper weight initialisation, batch normalisation, and lower learning rates also help.',
      hinglish:
        'Exploding gradients vanishing ke ulat hain: gradients baar-baar bade numbers se multiply hote hain aur exponentially badhte hain, enormous weight updates produce karte hue jo training destabilise karte hain — typically tum dekhte ho loss achanak NaN ya infinity ban jaata hai. Standard fix hai GRADIENT CLIPPING: update apply karne se pehle gradient norm ko ek threshold (jaise 1.0) pe cap karo. Proper weight initialisation, batch normalisation, aur lower learning rates bhi madad karte hain.',
    },
  },
  {
    question: 'What is a GAN (Generative Adversarial Network)?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A GAN trains TWO networks against each other: a GENERATOR that creates fake samples from random noise, and a DISCRIMINATOR that tries to tell real samples from fake ones. They improve in competition — the generator gets better at fooling, the discriminator better at detecting — until the generated output becomes highly realistic. GANs powered the first wave of realistic AI face/image generation, though diffusion models have largely surpassed them for image quality and training stability.',
      hinglish:
        'Ek GAN DO networks ko ek doosre ke against train karta hai: ek GENERATOR jo random noise se fake samples banata hai, aur ek DISCRIMINATOR jo real samples ko fake se alag karne ki koshish karta hai. Wo competition mein improve karte hain — generator fool karne mein better hota hai, discriminator detect karne mein — jab tak generated output highly realistic na ban jaaye. GANs ne realistic AI face/image generation ki pehli wave power ki, chahe diffusion models ne image quality aur training stability ke liye unhe largely surpass kar diya hai.',
    },
  },
  {
    question: 'What is an autoencoder?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'An autoencoder is a network trained to RECONSTRUCT its own input. It has an ENCODER that compresses the input into a small "latent" representation (a bottleneck) and a DECODER that rebuilds the original from it. Because the bottleneck forces the model to discard noise and keep only essential information, autoencoders are used for dimensionality reduction, denoising, anomaly detection (high reconstruction error means an unusual input), and learning compressed representations.',
      hinglish:
        'Ek autoencoder ek network hai jo apne khud ke input ko RECONSTRUCT karne ke liye train hota hai. Isme ek ENCODER hota hai jo input ko ek chhote "latent" representation (ek bottleneck) mein compress karta hai aur ek DECODER jo usse original rebuild karta hai. Kyunki bottleneck model ko majboor karta hai ki wo noise discard kare aur sirf essential information rakhe, autoencoders dimensionality reduction, denoising, anomaly detection (high reconstruction error matlab ek unusual input), aur compressed representations seekhne ke liye use hote hain.',
    },
  },
  {
    question: 'What is an embedding layer in deep learning?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An embedding layer converts discrete categorical items (words, user IDs, product IDs) into dense, learnable vectors of fixed size. Unlike one-hot encoding — which produces huge sparse vectors with no notion of similarity — embeddings are compact and place semantically similar items close together in vector space, and those positions are LEARNED during training. This is the standard first layer for any NLP or recommendation model.',
      hinglish:
        'Ek embedding layer discrete categorical items (words, user IDs, product IDs) ko fixed size ke dense, learnable vectors mein convert karta hai. One-hot encoding ke ulat — jo huge sparse vectors produce karta hai bina similarity ke koi concept ke — embeddings compact hote hain aur semantically similar items ko vector space mein paas rakhte hain, aur wo positions training ke dauraan SEEKHE jaate hain. Ye kisi bhi NLP ya recommendation model ke liye standard first layer hai.',
    },
  },
  {
    question: 'Why are GPUs used for deep learning instead of CPUs?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Deep learning is dominated by matrix multiplications — thousands of independent, identical arithmetic operations. A CPU has a few very powerful cores optimised for sequential, branching logic; a GPU has thousands of simpler cores designed to run the same operation on many values simultaneously. Since neural network math is embarrassingly parallel, GPUs deliver 10-100x speedups, turning a training job that would take months on a CPU into days.',
      hinglish:
        'Deep learning matrix multiplications se dominated hai — hazaron independent, identical arithmetic operations. Ek CPU ke paas kuch bahut powerful cores hote hain jo sequential, branching logic ke liye optimised hain; ek GPU ke paas hazaron simpler cores hote hain jo same operation ko bahut saari values pe simultaneously chalane ke liye design kiye gaye hain. Kyunki neural network math embarrassingly parallel hai, GPUs 10-100x speedups dete hain, ek training job jo CPU pe mahine legi use dinon mein badalte hue.',
    },
  },
  {
    question: 'What is the difference between TensorFlow and PyTorch?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Both are the dominant deep learning frameworks. PyTorch (Meta) uses a dynamic, "define-by-run" computation graph that feels like normal Python — easier to debug and now the standard in research. TensorFlow (Google) originally used a static graph (faster to optimise/deploy but harder to debug), though TF 2.x adopted eager execution to close that gap; it retains stronger production tooling (TF Serving, TF Lite for mobile). In practice both can do everything; PyTorch dominates research and increasingly production too.',
      hinglish:
        'Dono dominant deep learning frameworks hain. PyTorch (Meta) ek dynamic, "define-by-run" computation graph use karta hai jo normal Python jaisa feel hota hai — debug karna easier aur ab research mein standard. TensorFlow (Google) originally ek static graph use karta tha (optimise/deploy karna faster par debug karna mushkil), chahe TF 2.x ne wo gap band karne ke liye eager execution adopt kiya; ye stronger production tooling rakhta hai (TF Serving, mobile ke liye TF Lite). Practically dono sab kuch kar sakte hain; PyTorch research mein dominate karta hai aur increasingly production mein bhi.',
    },
  },
  {
    question: 'What is a hyperparameter and how is it different from a parameter?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'PARAMETERS are the values the model LEARNS during training — the weights and biases. HYPERPARAMETERS are the settings YOU choose before training that control HOW learning happens: learning rate, batch size, number of layers, number of neurons per layer, dropout rate, choice of optimiser. Parameters are found by gradient descent; hyperparameters are found by experimentation (grid search, random search, or Bayesian optimisation) on the validation set.',
      hinglish:
        'PARAMETERS wo values hain jo model training ke dauraan SEEKHTA hai — weights aur biases. HYPERPARAMETERS wo settings hain jo TUM training se pehle choose karte ho jo control karte hain ki learning KAISE hoti hai: learning rate, batch size, layers ki number, per layer neurons ki number, dropout rate, optimiser ka choice. Parameters gradient descent se milte hain; hyperparameters validation set pe experimentation (grid search, random search, ya Bayesian optimisation) se milte hain.',
    },
  },
  {
    question: 'What is a learning rate schedule?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A learning rate schedule changes the learning rate DURING training rather than keeping it fixed. The common pattern is to start relatively high (making fast progress early) and decay it over time (allowing fine, precise convergence near the minimum). Popular schedules: step decay (drop by a factor every N epochs), cosine annealing (smooth decrease following a cosine curve), and warmup (start very low and ramp up for the first few epochs — essential for training Transformers stably).',
      hinglish:
        'Ek learning rate schedule training ke DAURAAN learning rate badalta hai use fixed rakhne ke bajaye. Common pattern hai relatively high se start karna (shuru mein fast progress karte hue) aur use time ke saath decay karna (minimum ke paas fine, precise convergence allow karte hue). Popular schedules: step decay (har N epochs pe ek factor se drop), cosine annealing (ek cosine curve follow karte hue smooth decrease), aur warmup (bahut low se start karke pehle kuch epochs mein ramp up — Transformers ko stably train karne ke liye essential).',
    },
  },
  {
    question: 'What are precision, recall, and F1 score?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PRECISION = of everything the model flagged as positive, what fraction actually was? (Punishes false alarms.) RECALL = of all the truly positive cases, what fraction did the model catch? (Punishes misses.) They trade off against each other. F1 is their harmonic mean, giving a single balanced score. Which matters more is domain-dependent: cancer screening prioritises RECALL (never miss a case), spam filtering prioritises PRECISION (never block a real email).',
      hinglish:
        'PRECISION = model ne jo bhi positive flag kiya, usme se actually kitna fraction tha? (False alarms ko punish karta hai.) RECALL = saare truly positive cases mein se, model ne kitna fraction pakada? (Misses ko punish karta hai.) Ye ek doosre ke against trade off karte hain. F1 unka harmonic mean hai, ek single balanced score deta hai. Kaunsa zyada matter karta hai ye domain-dependent hai: cancer screening RECALL ko priority deti hai (ek bhi case miss na ho), spam filtering PRECISION ko (ek bhi real email block na ho).',
    },
  },
  {
    question: 'Why is accuracy a misleading metric for imbalanced datasets?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'If 99% of your data is class A and 1% is class B, a model that blindly predicts "A" for everything achieves 99% accuracy while being completely useless — it never detects a single case of B. This is common in fraud detection, disease screening, and defect detection. For imbalanced data you must use precision, recall, F1, or AUC-ROC, which actually reflect performance on the rare-but-important minority class.',
      hinglish:
        'Agar tumhare data ka 99% class A hai aur 1% class B, ek model jo blindly sab kuch "A" predict karta hai 99% accuracy achieve karta hai jabki poori tarah useless hai — wo B ka ek bhi case detect nahi karta. Ye fraud detection, disease screening, aur defect detection mein common hai. Imbalanced data ke liye tumhe precision, recall, F1, ya AUC-ROC use karna padta hai, jo actually us rare-par-important minority class pe performance reflect karte hain.',
    },
  },
  {
    question: 'What is the bias-variance tradeoff?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'BIAS is error from overly simplistic assumptions — a high-bias model underfits, missing real patterns. VARIANCE is error from excessive sensitivity to the specific training data — a high-variance model overfits, memorising noise. Simple models have high bias/low variance; complex models the reverse. Total error is roughly bias² + variance + irreducible noise, so the goal is the sweet spot minimising their sum. Deep learning\'s trick is using very high-capacity (low-bias) models while controlling variance through regularisation, dropout, and huge datasets.',
      hinglish:
        'BIAS overly simplistic assumptions se aane wala error hai — ek high-bias model underfit karta hai, real patterns miss karta hai. VARIANCE specific training data ke prati excessive sensitivity se aane wala error hai — ek high-variance model overfit karta hai, noise ratta maarta hai. Simple models mein high bias/low variance hota hai; complex models mein ulta. Total error roughly bias² + variance + irreducible noise hai, isliye goal unka sum minimise karne wala sweet spot hai. Deep learning ka trick hai bahut high-capacity (low-bias) models use karna jabki variance ko regularisation, dropout, aur huge datasets se control karna.',
    },
  },
  {
    question: 'What is a confusion matrix?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A confusion matrix is a table cross-tabulating predicted labels against actual labels. For binary classification it has four cells: True Positives (correctly predicted positive), True Negatives (correctly predicted negative), False Positives (wrongly flagged as positive — a false alarm), and False Negatives (missed a real positive). Every other classification metric — accuracy, precision, recall, F1 — is computed directly from these four numbers, which is why reading a confusion matrix is a fundamental skill.',
      hinglish:
        'Ek confusion matrix ek table hai jo predicted labels ko actual labels ke against cross-tabulate karta hai. Binary classification ke liye iske chaar cells hote hain: True Positives (correctly predicted positive), True Negatives (correctly predicted negative), False Positives (galat tarike se positive flag kiya — ek false alarm), aur False Negatives (ek real positive miss kiya). Baaki har classification metric — accuracy, precision, recall, F1 — directly in chaar numbers se compute hota hai, isliye ek confusion matrix padhna ek fundamental skill hai.',
    },
  },
  {
    question: 'What is the difference between a shallow and a deep neural network?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        'A shallow network has one (or very few) hidden layers; a deep network has many. The value of depth is HIERARCHICAL feature learning: early layers learn simple primitives (edges), middle layers combine them into parts (an eye, a wheel), and late layers assemble those into whole concepts (a face, a car). A shallow network can theoretically approximate any function too, but would need an impractically enormous number of neurons in that single layer to match what depth achieves efficiently.',
      hinglish:
        'Ek shallow network mein ek (ya bahut kam) hidden layers hoti hain; ek deep network mein bahut. Depth ki value HIERARCHICAL feature learning hai: early layers simple primitives (edges) seekhti hain, middle layers unhe parts mein combine karti hain (ek aankh, ek wheel), aur late layers unhe poore concepts mein assemble karti hain (ek chehra, ek car). Ek shallow network theoretically koi bhi function approximate kar sakta hai, par us single layer mein impractically enormous number of neurons chahiye honge us cheez ko match karne ke liye jo depth efficiently achieve karta hai.',
    },
  },
  {
    question: 'How do you decide the number of layers and neurons in a network?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'There is no formula — it is empirical. The practical approach: (1) Start from a proven architecture for your task type (ResNet for images, Transformer for text) rather than designing from scratch. (2) If underfitting (both losses high), add capacity — more layers/neurons. (3) If overfitting (train loss low, val loss high), reduce capacity or add regularisation/data. (4) Use validation performance, not intuition, to decide. Transfer learning often removes this question entirely, since you inherit a proven architecture.',
      hinglish:
        'Koi formula nahi hai — ye empirical hai. Practical approach: (1) Apne task type ke liye ek proven architecture se start karo (images ke liye ResNet, text ke liye Transformer) scratch se design karne ke bajaye. (2) Agar underfitting ho (dono losses high), capacity add karo — zyada layers/neurons. (3) Agar overfitting ho (train loss low, val loss high), capacity kam karo ya regularisation/data add karo. (4) Decide karne ke liye validation performance use karo, intuition nahi. Transfer learning aksar ye sawaal poori tarah hata deta hai, kyunki tumhe ek proven architecture inherit ho jaata hai.',
    },
  },
  {
    question: 'What is a residual (skip) connection and why did ResNet need it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A residual connection adds a layer\'s INPUT directly to its output, letting information (and gradients) skip past the layer entirely. Before ResNet, stacking more than ~20 layers made networks WORSE, not better — gradients degraded too much to train them. Skip connections give gradients a direct highway backward, making 50, 100, even 1000-layer networks trainable. This one idea unlocked genuinely deep learning and appears in nearly every modern architecture, including Transformers.',
      hinglish:
        'Ek residual connection ek layer ke INPUT ko directly uske output mein add karta hai, information (aur gradients) ko layer ke aage poori tarah skip karne deta hai. ResNet se pehle, ~20 se zyada layers stack karna networks ko KHARAB banata tha, better nahi — gradients itne degrade ho jaate the ki unhe train nahi kar sakte the. Skip connections gradients ko ek direct highway backward dete hain, 50, 100, even 1000-layer networks ko trainable banate hue. Is ek idea ne genuinely deep learning unlock kiya aur ye almost har modern architecture mein dikhta hai, Transformers included.',
    },
  },
  {
    question: 'What is a softmax temperature and what does changing it do?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Temperature is a divisor applied to the logits before softmax. LOW temperature (e.g. 0.2) sharpens the distribution, making the highest-scoring option far more likely — output becomes focused, deterministic, and repetitive. HIGH temperature (e.g. 1.5) flattens the distribution, giving lower-ranked options a real chance — output becomes diverse and creative but potentially incoherent. This is the knob behind the "temperature" setting you see in LLM APIs.',
      hinglish:
        'Temperature ek divisor hai jo softmax se pehle logits pe apply hota hai. LOW temperature (jaise 0.2) distribution ko sharpen karta hai, highest-scoring option ko bahut zyada likely banate hue — output focused, deterministic, aur repetitive ho jaata hai. HIGH temperature (jaise 1.5) distribution ko flatten karta hai, lower-ranked options ko ek real chance dete hue — output diverse aur creative ho jaata hai par potentially incoherent. Yahi wo knob hai jo LLM APIs mein "temperature" setting ke peeche hota hai.',
    },
  },
  {
    question: 'What is model quantisation?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Quantisation reduces the numeric precision used to store weights — e.g. from 32-bit floats to 8-bit integers or 4-bit. This shrinks the model dramatically (a 4x-8x reduction in size and memory) and speeds up inference, with usually only a small accuracy loss. It is what makes it possible to run large models on phones, edge devices, or a single consumer GPU, and is the "Q" in QLoRA fine-tuning.',
      hinglish:
        'Quantisation weights store karne ke liye use hone wali numeric precision kam karta hai — jaise 32-bit floats se 8-bit integers ya 4-bit tak. Isse model dramatically shrink hota hai (size aur memory mein 4x-8x reduction) aur inference speed up hoti hai, usually sirf ek chhote accuracy loss ke saath. Yahi bade models ko phones, edge devices, ya ek single consumer GPU pe chalana possible banata hai, aur ye QLoRA fine-tuning mein "Q" hai.',
    },
  },
  {
    question: 'What is knowledge distillation?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Knowledge distillation trains a small "student" model to imitate the OUTPUT DISTRIBUTION of a large, accurate "teacher" model, rather than just learning from the hard labels. Because the teacher\'s soft probabilities carry richer information (e.g. "80% cat, 15% dog, 5% fox" reveals how similar the classes are), the student learns more than it could from labels alone — often reaching near-teacher accuracy at a fraction of the size and inference cost.',
      hinglish:
        'Knowledge distillation ek chhote "student" model ko ek bade, accurate "teacher" model ke OUTPUT DISTRIBUTION ki nakal karne ke liye train karta hai, sirf hard labels se seekhne ke bajaye. Kyunki teacher ki soft probabilities zyada rich information rakhti hain (jaise "80% cat, 15% dog, 5% fox" batata hai ki classes kitni similar hain), student akele labels se jitna seekh sakta tha usse zyada seekhta hai — aksar size aur inference cost ke ek fraction pe near-teacher accuracy tak pahunchte hue.',
    },
  },
  {
    question: 'How do you deploy a deep learning model to production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Typical path: (1) Export the trained model to a portable format (ONNX, TorchScript, SavedModel). (2) Optimise for inference — quantisation, pruning, or compiling with TensorRT. (3) Wrap it behind an API (FastAPI, TF Serving, TorchServe) running in a Docker container. (4) Add batching to serve multiple requests per GPU pass efficiently. (5) Monitor latency, throughput, and prediction drift in production, with a retraining pipeline ready for when accuracy degrades over time.',
      hinglish:
        'Typical path: (1) Trained model ko ek portable format mein export karo (ONNX, TorchScript, SavedModel). (2) Inference ke liye optimise karo — quantisation, pruning, ya TensorRT se compile karna. (3) Use ek API ke peeche wrap karo (FastAPI, TF Serving, TorchServe) jo ek Docker container mein chale. (4) Batching add karo taaki per GPU pass multiple requests efficiently serve ho. (5) Production mein latency, throughput, aur prediction drift monitor karo, ek retraining pipeline ready rakho jab accuracy time ke saath degrade ho.',
    },
  },
];
