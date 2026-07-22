// Math for Machine Learning course — intermediate.
// Covers: Linear Algebra, Calculus & Gradients, Probability & Statistics for ML.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Math for Machine Learning',
  slug: 'math-for-ml',
  description:
    'ML samajhne ke liye zaroori maths — Linear Algebra (vectors, matrices), Calculus (derivatives, gradient descent), aur Probability & Statistics. Har topic intuition-first, code ke saath, English aur Hinglish mein.',
  icon: '➗',
  tags: ['math', 'linear-algebra', 'calculus', 'statistics', 'machine-learning'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 39,
};

const linearAlgebra = [
  {
    title: 'Linear Algebra',
    level: 'intermediate',
    description: 'Vectors, matrices aur unke operations — ML data ki language.',
    concepts: [
      {
        title: 'Vectors & Matrices',
        difficulty: 'easy',
        tags: ['vectors', 'matrices', 'linear-algebra'],
        explanation: {
          english:
            'In machine learning, data is represented as **vectors** and **matrices**. A vector is an ordered list of numbers — one data point (e.g. a house = [area, bedrooms, price]). A matrix is a grid of numbers — a whole dataset where each row is one example and each column is one feature.\n\nWhy this matters: every ML model — linear regression, neural networks, transformers — is ultimately doing matrix multiplication under the hood. When a model "predicts", it is multiplying an input vector by a weight matrix.\n\n**Core objects:**\n- **Scalar**: a single number (e.g. `5`)\n- **Vector**: 1-D array `[2, 4, 6]` — a point or direction\n- **Matrix**: 2-D array — a table of numbers, or a transformation\n- **Tensor**: n-D array — images (3-D), batches (4-D) in deep learning',
          hinglish:
            'Machine learning mein data ko **vectors** aur **matrices** ke roop mein represent karte hain. Vector numbers ki ordered list hai — ek data point (jaise ghar = [area, bedrooms, price]). Matrix numbers ka grid hai — poora dataset jahan har row ek example aur har column ek feature hai.\n\nYe kyon important hai: har ML model — linear regression, neural networks, transformers — andar se matrix multiplication kar raha hai. Jab model "predict" karta hai, wo input vector ko weight matrix se multiply kar raha hota hai.\n\n**Core objects:**\n- **Scalar**: ek single number (jaise `5`)\n- **Vector**: 1-D array `[2, 4, 6]` — ek point ya direction\n- **Matrix**: 2-D array — numbers ki table, ya transformation\n- **Tensor**: n-D array — images (3-D), batches (4-D) deep learning mein',
        },
        dailyLifeExample:
          'Socho ek Excel sheet jisme har row ek student hai aur columns marks hain (Maths, Physics, Chemistry). Wo poori sheet ek matrix hai, aur ek student ki row ek vector. ML bas is table pe fast maths karta hai.',
        codeExample:
          'import numpy as np\n\n# A vector = one house: [area(sqft), bedrooms, price(lakh)]\nhouse = np.array([1200, 3, 85])\n\n# A matrix = dataset of 3 houses (rows = examples, cols = features)\nX = np.array([\n    [1200, 3, 85],\n    [800,  2, 55],\n    [1500, 4, 110],\n])\n\nprint(X.shape)      # (3, 3) -> 3 examples, 3 features\nprint(X[0])         # first house (a vector)\nprint(X[:, 0])      # all areas (a column/feature)',
        keyPoints: [
          'Vector = ordered list of numbers (one data point)',
          'Matrix = grid of numbers (a dataset: rows=examples, cols=features)',
          'Tensor = n-dimensional array (images, batches in deep learning)',
          'Every ML prediction is matrix multiplication under the hood',
          'NumPy is the standard tool for vectors/matrices in Python',
        ],
        quiz: [
          {
            question: 'In an ML dataset matrix, what do rows and columns usually represent?',
            options: [
              'Rows = features, columns = examples',
              'Rows = examples, columns = features',
              'Both are features',
              'Both are labels',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is a tensor?',
            options: [
              'A single number',
              'A 1-D array only',
              'An n-dimensional array (generalisation of vectors/matrices)',
              'A type of database',
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Dot Product & Matrix Multiplication',
        difficulty: 'medium',
        tags: ['dot-product', 'matrix-multiplication', 'weights'],
        explanation: {
          english:
            'The **dot product** multiplies two vectors element-wise and sums the result — it measures how much two vectors align. In ML, the dot product of an input vector and a weight vector gives a weighted sum, which is exactly what a single neuron computes.\n\n**Matrix multiplication** extends this: it applies many weighted sums at once. If `X` is your data (m examples × n features) and `W` is a weight matrix (n × k), then `X @ W` produces predictions for all examples in one operation. This is why GPUs (which do matrix maths fast) power modern AI.\n\n**Rule:** to multiply `A (m×n)` by `B (n×p)`, the inner dimensions must match (`n == n`), giving a result of shape `m×p`.',
          hinglish:
            '**Dot product** do vectors ko element-wise multiply karke sum karta hai — ye measure karta hai ki do vectors kitne align hain. ML mein input vector aur weight vector ka dot product ek weighted sum deta hai, jo exactly ek neuron compute karta hai.\n\n**Matrix multiplication** isko extend karta hai: ek saath bahut saare weighted sums apply karta hai. Agar `X` tumhara data hai (m examples × n features) aur `W` weight matrix (n × k), toh `X @ W` saare examples ke predictions ek operation mein deta hai. Isiliye GPUs (jo matrix maths fast karte hain) modern AI ko power dete hain.\n\n**Rule:** `A (m×n)` ko `B (n×p)` se multiply karne ke liye inner dimensions match hone chahiye (`n == n`), result `m×p` shape ka hoga.',
        },
        dailyLifeExample:
          'Dot product waise hai jaise bill banana: quantities [2 chai, 3 samosa] aur prices [10, 15] ka dot product = 2×10 + 3×15 = 65 rupees. ML bas isi weighted-sum ko lakhon baar karta hai.',
        codeExample:
          'import numpy as np\n\n# One neuron: weighted sum of inputs\ninputs  = np.array([2, 3])       # [chai, samosa]\nweights = np.array([10, 15])     # [price, price]\nprint(np.dot(inputs, weights))   # 65\n\n# Matrix multiply: predict for many examples at once\nX = np.array([[2, 3], [1, 5], [4, 0]])   # 3 examples, 2 features\nW = np.array([[10], [15]])               # 2 features -> 1 output\nprint(X @ W)   # [[65], [85], [40]]  one prediction per row',
        keyPoints: [
          'Dot product = element-wise multiply then sum (a weighted sum)',
          'A single neuron computes a dot product of inputs and weights',
          'Matrix multiplication runs many weighted sums in parallel',
          'Inner dimensions must match: (m×n) @ (n×p) = (m×p)',
          'GPUs accelerate matrix multiplication — the core of deep learning',
        ],
        quiz: [
          {
            question: 'To multiply matrix A (3×4) with matrix B, what shape must B have?',
            options: ['4×k (inner dims match)', '3×k', 'k×3', 'Any shape'],
            correctIndex: 0,
          },
          {
            question: 'What does a single neuron essentially compute?',
            options: [
              'A sort of the inputs',
              'A dot product of inputs and weights (a weighted sum)',
              'The maximum input',
              'A random number',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Eigenvalues & Eigenvectors: The Math Behind PCA',
        difficulty: 'hard',
        tags: ['eigenvalues', 'eigenvectors', 'pca'],
        explanation: {
          english:
            "Most vectors change DIRECTION when you multiply them by a matrix (a transformation). But for any square matrix, there are special vectors that only get STRETCHED or SHRUNK — never rotated — by that transformation. These are eigenvectors, and the amount they get stretched by is their eigenvalue: `A @ v = λ * v` (the matrix A times eigenvector v equals just a scalar λ times v — no direction change). In ML, this powers PCA (Principal Component Analysis): the eigenvectors of a dataset's covariance matrix point in the directions of maximum spread (variance) in the data, and their eigenvalues tell you HOW MUCH variance each direction captures — letting you keep only the top few directions and discard the rest with minimal information loss.",
          hinglish:
            "Zyaadatar vectors DIRECTION badal dete hain jab tum unhe ek matrix (ek transformation) se multiply karte ho. Par kisi bhi square matrix ke liye, kuch special vectors hote hain jo sirf STRETCH ya SHRINK hote hain — kabhi rotate nahi hote — us transformation se. Ye eigenvectors hain, aur jitna wo stretch hote hain wo unka eigenvalue hai: `A @ v = λ * v` (matrix A ka eigenvector v se multiply karna sirf ek scalar λ ka v se multiply karne jaisa hai — koi direction change nahi). ML mein, ye PCA (Principal Component Analysis) ko power deta hai: ek dataset ki covariance matrix ke eigenvectors data mein maximum spread (variance) ki directions batate hain, aur unke eigenvalues batate hain ki har direction KITNA variance capture karti hai — isse tum sirf top kuch directions rakh sakte ho aur baaki chhod sakte ho minimal information loss ke saath.",
        },
        dailyLifeExample:
          "Eigenvector ek compass ki soi jaisa hai jo North-South line pe hai — chahe zameen ghumti rahe (transformation), wo soi apni hi line pe rehti hai, bas lambi ya chhoti ho sakti hai (eigenvalue), ghoomti nahi. PCA ek photo ko crop karne jaisa hai — jo directions mein sabse zyada 'interesting variation' hai (bade eigenvalues) unhe rakho, baaki (chhote eigenvalues) crop kar do bina zyada detail khoye.",
        codeExample:
          "import numpy as np\n\nA = np.array([[2, 0],\n              [0, 3]])\n\neigenvalues, eigenvectors = np.linalg.eig(A)\nprint('Eigenvalues:', eigenvalues)   # [2. 3.]\nprint('Eigenvectors:\\n', eigenvectors)\n\n# Verify: A @ v == eigenvalue * v (no direction change, just scaling)\nv = eigenvectors[:, 0]\nlam = eigenvalues[0]\nprint(np.allclose(A @ v, lam * v))   # True\n\n# In PCA: eigenvectors of the covariance matrix = principal component directions\n# eigenvalues = how much variance each direction explains\n# Keep the top-k eigenvectors with the largest eigenvalues -> dimensionality reduction",
        keyPoints: [
          'An eigenvector of a matrix only gets scaled (stretched/shrunk), never rotated, by that matrix',
          'The eigenvalue is the scaling factor: A @ v = λ * v',
          "In PCA, eigenvectors of the covariance matrix point in the data's directions of maximum spread",
          'Eigenvalues tell you how much variance each direction (eigenvector) explains',
          'Keeping only the top eigenvectors (by eigenvalue) is how PCA reduces dimensions with minimal information loss',
        ],
        quiz: [
          {
            question: 'What makes a vector an "eigenvector" of a matrix A?',
            options: ['It has the largest values', 'Multiplying it by A only scales it (stretches/shrinks) without changing its direction', 'It is always [1, 1]', 'It must be a unit vector'],
            correctIndex: 1,
          },
          {
            question: 'In A @ v = λ * v, what does λ (the eigenvalue) represent?',
            options: ['The direction of v', 'The scaling factor applied to v by the transformation', 'The number of dimensions', 'Always zero'],
            correctIndex: 1,
          },
          {
            question: 'In PCA, what do the eigenvalues of the covariance matrix tell you?',
            options: ['Nothing useful', 'How much variance each corresponding eigenvector (direction) explains in the data', 'The number of data points', 'The mean of the data'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const calculus = [
  {
    title: 'Calculus & Optimisation',
    level: 'intermediate',
    description: 'Derivatives, gradients aur gradient descent — models kaise seekhte hain.',
    concepts: [
      {
        title: 'Derivatives & Gradients',
        difficulty: 'medium',
        tags: ['derivatives', 'gradient', 'calculus'],
        explanation: {
          english:
            'A **derivative** measures how fast a function changes — its slope at a point. In ML, we have a **loss function** that measures how wrong the model is. The derivative of the loss tells us which direction to nudge the weights to reduce the error.\n\nWhen a function has many inputs (millions of weights), the collection of all partial derivatives is called the **gradient**. The gradient is a vector pointing in the direction of steepest increase. To *minimise* loss, we step in the *opposite* direction of the gradient.\n\nThis single idea — "follow the negative gradient" — is how essentially all neural networks learn.',
          hinglish:
            '**Derivative** measure karta hai ki function kitni tezi se change hota hai — kisi point pe uska slope. ML mein hamare paas ek **loss function** hota hai jo batata hai model kitna galat hai. Loss ka derivative batata hai ki error kam karne ke liye weights ko kis direction mein nudge karein.\n\nJab function ke bahut saare inputs hote hain (millions of weights), sab partial derivatives ke collection ko **gradient** kehte hain. Gradient ek vector hai jo steepest increase ki direction mein point karta hai. Loss *minimise* karne ke liye hum gradient ki *opposite* direction mein step lete hain.\n\nYahi ek idea — "negative gradient follow karo" — se lagभग saare neural networks seekhte hain.',
        },
        dailyLifeExample:
          'Socho tum andhere mein ek pahaadi se neeche utar rahe ho (loss minimise). Har step pe tum paer se check karte ho kaunsi direction sabse zyada dhalaan hai (gradient), aur us se ulti taraf neeche kadam badhate ho. Bas yahi gradient descent hai.',
        codeExample:
          '# Numerical derivative of f(x) = x^2 at x = 3 (true slope = 2x = 6)\ndef f(x):\n    return x ** 2\n\nh = 1e-5\nx = 3\nslope = (f(x + h) - f(x)) / h\nprint(round(slope, 3))   # ~6.0  -> the derivative/gradient at x=3',
        keyPoints: [
          'Derivative = slope = how fast a function changes',
          'Loss function measures how wrong the model is',
          'Gradient = vector of all partial derivatives (steepest-increase direction)',
          'To minimise loss, move in the negative gradient direction',
          '"Follow the negative gradient" is how neural networks learn',
        ],
        quiz: [
          {
            question: 'To minimise a loss function, in which direction do we update the weights?',
            options: [
              'Same direction as the gradient',
              'Opposite (negative) direction of the gradient',
              'Perpendicular to the gradient',
              'A random direction',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does the gradient of a loss function represent?',
            options: [
              'The final accuracy',
              'The direction of steepest increase of the loss',
              'The number of features',
              'The learning rate',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Gradient Descent',
        difficulty: 'medium',
        tags: ['gradient-descent', 'learning-rate', 'optimisation'],
        explanation: {
          english:
            '**Gradient descent** is the optimisation algorithm that trains most ML models. It repeatedly:\n1. Computes the gradient of the loss w.r.t. the weights\n2. Updates each weight a small step in the negative gradient direction: `w = w - learning_rate * gradient`\n3. Repeats until the loss stops improving\n\nThe **learning rate** controls step size. Too large → you overshoot and diverge. Too small → training is painfully slow. Choosing it well is one of the most important practical skills in ML.\n\n**Variants:** Batch (use all data each step), Stochastic/SGD (one example at a time), and Mini-batch (small groups — the standard in deep learning). Modern optimisers like **Adam** adapt the learning rate automatically.',
          hinglish:
            '**Gradient descent** wo optimisation algorithm hai jo zyadatar ML models ko train karta hai. Ye baar-baar:\n1. Weights ke respect mein loss ka gradient compute karta hai\n2. Har weight ko negative gradient direction mein chhota step update karta hai: `w = w - learning_rate * gradient`\n3. Tab tak repeat karta hai jab tak loss improve hona band na ho\n\n**Learning rate** step size control karta hai. Bahut bada → overshoot ho ke diverge. Bahut chhota → training bahut slow. Ise theek choose karna ML ki sabse important practical skills mein se ek hai.\n\n**Variants:** Batch (har step pe saara data), Stochastic/SGD (ek example at a time), aur Mini-batch (chhote groups — deep learning ka standard). **Adam** jaise modern optimisers learning rate automatically adapt karte hain.',
        },
        dailyLifeExample:
          'Learning rate waise hai jaise pahaadi se utarte waqt kadam ki lambai. Bade chhalang (high LR) se tum gir sakte ho ya valley cross kar sakte ho; bahut chhote kadam (low LR) se pahunchne mein raat ho jayegi. Sahi size chahiye.',
        codeExample:
          '# Minimise f(w) = (w - 4)^2 ; true minimum at w = 4\ndef grad(w):\n    return 2 * (w - 4)   # derivative of (w-4)^2\n\nw = 0.0\nlr = 0.1               # learning rate\nfor step in range(20):\n    w = w - lr * grad(w)\nprint(round(w, 3))     # ~4.0  -> converged to the minimum',
        keyPoints: [
          'Gradient descent updates weights: w = w - learning_rate * gradient',
          'Learning rate too high = diverge; too low = very slow training',
          'SGD / mini-batch process subsets of data for speed',
          'Adam is a popular optimiser that adapts the learning rate',
          'Iterate until the loss plateaus (stops improving)',
        ],
        quiz: [
          {
            question: 'What happens if the learning rate is set too high?',
            options: [
              'Training is very slow but stable',
              'The model can overshoot the minimum and diverge',
              'Nothing changes',
              'The dataset shrinks',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which is the standard approach in deep learning?',
            options: ['Full-batch only', 'Mini-batch gradient descent', 'No gradients', 'Manual weight tuning'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain gradient descent in one or two lines.',
            answer: {
              english:
                'Gradient descent is an iterative optimisation algorithm that minimises a loss function by repeatedly updating parameters in the negative direction of the gradient, scaled by a learning rate, until the loss converges.',
              hinglish:
                'Gradient descent ek iterative optimisation algorithm hai jo loss function ko minimise karta hai — parameters ko gradient ki negative direction mein (learning rate se scale karke) baar-baar update karke, jab tak loss converge na ho jaye.',
            },
          },
        ],
      },
      {
        title: 'The Chain Rule: How Backpropagation Really Works',
        difficulty: 'hard',
        tags: ['chain-rule', 'backpropagation', 'derivatives'],
        explanation: {
          english:
            "A neural network is a chain of functions: input -> layer 1 -> layer 2 -> ... -> loss. To do gradient descent, you need the gradient of the LOSS with respect to EVERY weight, even ones buried deep in early layers, far from the loss. The chain rule from calculus is exactly the tool for this: if y depends on u, and u depends on x, then dy/dx = dy/du * du/dx — you multiply the derivatives along the chain. Backpropagation applies the chain rule layer by layer, working BACKWARD from the loss: it computes how much the loss changes with respect to the last layer's output, then uses that to compute the change with respect to the second-to-last layer, and so on, all the way back to the first layer — reusing each layer's result instead of recomputing everything from scratch.",
          hinglish:
            "Ek neural network functions ki ek chain hai: input -> layer 1 -> layer 2 -> ... -> loss. Gradient descent karne ke liye, tumhe LOSS ka gradient HAR weight ke respect mein chahiye, chahe wo early layers mein kitni bhi deep gadi ho, loss se bahut door. Calculus ka chain rule exactly isi ke liye tool hai: agar y, u pe depend kare, aur u, x pe depend kare, to dy/dx = dy/du * du/dx — tum chain ke saath derivatives ko multiply karte ho. Backpropagation chain rule ko layer-by-layer apply karta hai, loss se BACKWARD kaam karte hue: ye pehle calculate karta hai ki loss last layer ke output ke respect mein kitna badalta hai, phir usse use karta hai second-to-last layer ke respect mein change calculate karne ke liye, aur aise hi first layer tak — har layer ka result reuse karte hue, sab kuch scratch se dobara compute karne ke bajaye.",
        },
        dailyLifeExample:
          "Chain rule ek 'Chinese whispers' game jaisa hai chala ke ulta — agar tumhe pata karna hai ki pehle bande ke message mein chhoti si galti aakhri bande tak kitna asar dalegi, tumhe har step ke 'asar' (derivative) ko chain mein multiply karna padega. Backpropagation isi asar ko AAKHRI bande se PEHLE bande tak, ek-ek step peeche jaate hue calculate karta hai — har step ka kaam dobara nahi karna padta.",
        codeExample:
          "# Simple chain: loss = (w * x - target)^2, with an extra layer: y = w * x, loss = (y - target)^2\n# We want d(loss)/dw using the chain rule\n\nx = 2.0\nw = 3.0\ntarget = 10.0\n\n# Forward pass\ny = w * x            # y = 6.0\nloss = (y - target) ** 2   # loss = 16.0\n\n# Backward pass (chain rule): d(loss)/dw = d(loss)/dy * dy/dw\nd_loss_d_y = 2 * (y - target)   # derivative of (y-target)^2 w.r.t. y  -> -8.0\ndy_dw = x                        # derivative of (w*x) w.r.t. w        -> 2.0\nd_loss_dw = d_loss_d_y * dy_dw   # chain rule multiplication           -> -16.0\n\nprint('Gradient of loss w.r.t. w:', d_loss_dw)\n# This is exactly what backpropagation does, layer by layer, for millions of weights",
        keyPoints: [
          'A neural network is a CHAIN of functions from input to loss',
          'The chain rule: dy/dx = dy/du * du/dx — multiply derivatives along the chain',
          'Backpropagation applies the chain rule backward, from the loss toward the first layer',
          "Each layer's gradient is reused to compute the next (earlier) layer's gradient — no recomputation from scratch",
          'This is how gradients reach weights buried deep in early layers, far from the loss',
        ],
        quiz: [
          {
            question: 'What does the chain rule let you compute?',
            options: ['The size of a dataset', 'The derivative of a composed function by multiplying the derivatives of each step in the chain', 'The learning rate automatically', 'The number of layers needed'],
            correctIndex: 1,
          },
          {
            question: 'Why does backpropagation work BACKWARD, from the loss toward the first layer?',
            options: ['It is arbitrary, forward would work identically', "It reuses each layer's computed gradient to efficiently compute the next (earlier) layer's gradient via the chain rule, avoiding redundant recomputation", 'Backward is required by Python syntax', 'It has nothing to do with the chain rule'],
            correctIndex: 1,
          },
          {
            question: 'Why does a deep network need the chain rule to update weights in its EARLY layers?',
            options: ['Early layers do not need gradients', "Early-layer weights are many function-compositions away from the loss, so their gradient must be built by chaining derivatives through every layer in between", 'The chain rule only applies to the last layer', 'Early layers use a different, simpler formula'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const statistics = [
  {
    title: 'Probability & Statistics',
    level: 'intermediate',
    description: 'Distributions, mean/variance aur probability — data samajhne ke liye.',
    concepts: [
      {
        title: 'Mean, Variance & Distributions',
        difficulty: 'easy',
        tags: ['statistics', 'variance', 'distribution', 'normalisation'],
        explanation: {
          english:
            'Statistics summarises data. **Mean** is the average (centre), **variance** measures spread (how far values are from the mean), and **standard deviation** is the square root of variance (in the same units as the data).\n\nMany ML techniques assume features are on a similar scale, so we **normalise** (rescale to mean 0, std 1) using `(x - mean) / std`. This helps gradient descent converge faster and stops large-scale features from dominating.\n\nThe **normal (Gaussian) distribution** — the bell curve — appears everywhere: measurement noise, model errors, weight initialisation. Knowing its shape (mean at centre, ~68% within 1 std) builds strong data intuition.',
          hinglish:
            'Statistics data ko summarise karti hai. **Mean** average hai (centre), **variance** spread measure karti hai (values mean se kitni door hain), aur **standard deviation** variance ka square root hai (data ke same units mein).\n\nBahut saari ML techniques assume karti hain ki features similar scale pe hain, isliye hum **normalise** karte hain (mean 0, std 1 pe rescale) `(x - mean) / std` se. Isse gradient descent tezi se converge karta hai aur bade-scale features dominate nahi karte.\n\n**Normal (Gaussian) distribution** — bell curve — har jagah dikhta hai: measurement noise, model errors, weight initialisation. Iski shape jaanna (mean centre pe, ~68% 1 std ke andar) strong data intuition banata hai.',
        },
        dailyLifeExample:
          'Class ke marks socho: mean = average marks, variance batati hai marks kitne bikhre hain (sab 70 ke aaspaas vs koi 30 koi 95). Normalisation waise hai jaise sab subjects ko same scale pe laana taaki comparison fair ho.',
        codeExample:
          'import numpy as np\n\nmarks = np.array([70, 68, 95, 30, 72, 74])\nprint("mean:", marks.mean())\nprint("std :", round(marks.std(), 2))\n\n# Normalise (standardise) to mean 0, std 1\nz = (marks - marks.mean()) / marks.std()\nprint("normalised:", np.round(z, 2))',
        keyPoints: [
          'Mean = average (centre of the data)',
          'Variance/std = spread of the data around the mean',
          'Normalise features with (x - mean) / std for stable training',
          'Normalisation prevents large-scale features from dominating',
          'The normal (Gaussian) bell curve appears throughout ML',
        ],
        quiz: [
          {
            question: 'Why do we normalise features before training many ML models?',
            options: [
              'To delete outliers',
              'To put features on a similar scale so training is stable and fair',
              'To increase the dataset size',
              'To convert text to numbers',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does variance measure?',
            options: [
              'The average value',
              'How spread out the data is around the mean',
              'The largest value',
              'The number of features',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Probability for ML',
        difficulty: 'medium',
        tags: ['probability', 'bayes', 'classification'],
        explanation: {
          english:
            'Probability lets models express **uncertainty**. A classifier does not just say "cat" — it says "90% cat, 10% dog". These are probabilities between 0 and 1 that sum to 1 across classes.\n\n**Conditional probability** `P(A|B)` is the chance of A given B is true. **Bayes\' theorem** flips it: `P(A|B) = P(B|A) * P(A) / P(B)`. It underpins spam filters (P(spam | words)) and many probabilistic models.\n\nIn deep learning, the final **softmax** layer turns raw scores into a probability distribution over classes, and **cross-entropy loss** measures how far predicted probabilities are from the true label. Understanding probability is essential to reading model outputs correctly.',
          hinglish:
            'Probability models ko **uncertainty** express karne deti hai. Classifier sirf "cat" nahi kehta — wo kehta hai "90% cat, 10% dog". Ye 0 aur 1 ke beech probabilities hain jo classes ke across sum karke 1 hoti hain.\n\n**Conditional probability** `P(A|B)` matlab B true hone par A ka chance. **Bayes\' theorem** ise flip karta hai: `P(A|B) = P(B|A) * P(A) / P(B)`. Ye spam filters (P(spam | words)) aur bahut se probabilistic models ka base hai.\n\nDeep learning mein final **softmax** layer raw scores ko classes ke over probability distribution mein badalti hai, aur **cross-entropy loss** measure karta hai ki predicted probabilities true label se kitni door hain. Model outputs sahi padhne ke liye probability samajhna essential hai.',
        },
        dailyLifeExample:
          'Mausam app kehti hai "70% chance of rain" — ye probability hai. Bayes theorem waise hai jaise: agar zameen geeli hai, toh baarish hui thi iska chance kitna? (evidence dekhkar cause ka probability update karna).',
        codeExample:
          'import numpy as np\n\n# Softmax turns raw scores into probabilities that sum to 1\ndef softmax(scores):\n    e = np.exp(scores - np.max(scores))\n    return e / e.sum()\n\nscores = np.array([2.0, 1.0, 0.1])   # cat, dog, rabbit\nprobs = softmax(scores)\nprint(np.round(probs, 3))            # e.g. [0.659 0.242 0.099]\nprint("sum:", round(probs.sum(), 3)) # 1.0',
        keyPoints: [
          'Probabilities (0–1) let models express uncertainty across classes',
          'Conditional probability P(A|B) = chance of A given B',
          'Bayes\' theorem powers spam filters and probabilistic models',
          'Softmax converts scores into a probability distribution',
          'Cross-entropy loss compares predicted probabilities to the true label',
        ],
        quiz: [
          {
            question: 'What does a softmax layer output?',
            options: [
              'A single integer class id',
              'Probabilities over classes that sum to 1',
              'The gradient',
              'The raw pixel values',
            ],
            correctIndex: 1,
          },
          {
            question: 'Bayes\' theorem lets you compute P(A|B) from which quantities?',
            options: [
              'Only P(A)',
              'P(B|A), P(A) and P(B)',
              'The learning rate',
              'The dataset size',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const curriculum = [
  ...linearAlgebra,
  ...calculus,
  ...statistics,
];

export const generalInterviewQuestions = [
  {
    question: 'Why is linear algebra important for machine learning?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Data in ML is represented as vectors, matrices, and tensors, and every model computation (from linear regression to transformers) is fundamentally matrix multiplication. Linear algebra provides the language and operations to represent data and compute predictions efficiently, especially on GPUs.',
      hinglish:
        'ML mein data vectors, matrices aur tensors ke roop mein hota hai, aur har model computation (linear regression se transformers tak) fundamentally matrix multiplication hai. Linear algebra data represent karne aur predictions efficiently compute karne ki language aur operations deti hai — khaaskar GPUs pe.',
    },
  },
  {
    question: 'What is the role of calculus in training neural networks?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Calculus provides derivatives/gradients of the loss with respect to the model\'s weights. Gradient descent uses these gradients to iteratively update weights in the direction that reduces error, which is how neural networks learn.',
      hinglish:
        'Calculus loss ke derivatives/gradients deta hai model ke weights ke respect mein. Gradient descent in gradients ka use karke weights ko iteratively us direction mein update karta hai jo error kam kare — isi se neural networks seekhte hain.',
    },
  },
];
