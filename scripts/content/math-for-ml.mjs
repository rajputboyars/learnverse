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
  icon: 'divide',
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

  // ─── Linear Algebra ───────────────────────────────────────────
  {
    question: 'What is a scalar, vector, matrix, and tensor?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'They form a hierarchy by number of dimensions. A SCALAR is a single number (5). A VECTOR is a 1-D array of numbers ([2, 5, 7]) — used to represent one data point or one feature set. A MATRIX is a 2-D grid of numbers — typically a whole dataset (rows = samples, columns = features). A TENSOR is the general term for any n-dimensional array; a colour image is a 3-D tensor (height x width x colour channels), and a batch of images is 4-D.',
      hinglish:
        'Ye dimensions ki number se ek hierarchy banate hain. Ek SCALAR ek single number hai (5). Ek VECTOR numbers ka 1-D array hai ([2, 5, 7]) — ek data point ya ek feature set represent karne ke liye use hota hai. Ek MATRIX numbers ka 2-D grid hai — typically ek poora dataset (rows = samples, columns = features). Ek TENSOR kisi bhi n-dimensional array ka general term hai; ek colour image ek 3-D tensor hai (height x width x colour channels), aur images ka ek batch 4-D hai.',
    },
  },
  {
    question: 'Why is matrix multiplication so important in machine learning?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Almost every operation in a neural network is a matrix multiplication. A layer computing "weights x inputs" for thousands of neurons at once IS a matrix multiply. This matters practically because matrix multiplication is embarrassingly parallel — thousands of independent multiply-add operations — which is exactly what GPUs are built to do. Expressing your model as matrix operations rather than Python loops is what makes training feasible at all.',
      hinglish:
        'Ek neural network mein almost har operation ek matrix multiplication hai. Ek layer jo hazaron neurons ke liye ek saath "weights x inputs" compute karti hai wo ek matrix multiply HI hai. Ye practically matter karta hai kyunki matrix multiplication embarrassingly parallel hai — hazaron independent multiply-add operations — jo exactly wahi hai jo GPUs karne ke liye bane hain. Apne model ko Python loops ke bajaye matrix operations ke roop mein express karna hi training ko feasible banata hai.',
    },
  },
  {
    question: 'What is the dot product and what does it mean geometrically?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The dot product multiplies corresponding elements of two vectors and sums the results, giving a single number. Geometrically it measures ALIGNMENT: a large positive value means the vectors point in a similar direction, zero means they are perpendicular (unrelated), and negative means they point oppositely. This is the mathematical foundation of similarity search in ML — cosine similarity is just a dot product normalised by the vectors\' lengths.',
      hinglish:
        'Dot product do vectors ke corresponding elements ko multiply karta hai aur results ko sum karta hai, ek single number dete hue. Geometrically ye ALIGNMENT measure karta hai: ek bada positive value matlab vectors similar direction mein point karte hain, zero matlab wo perpendicular hain (unrelated), aur negative matlab wo ulti taraf point karte hain. Ye ML mein similarity search ki mathematical foundation hai — cosine similarity bas ek dot product hai jo vectors ki lengths se normalise kiya gaya hai.',
    },
  },
  {
    question: 'What is cosine similarity and why is it used instead of Euclidean distance for embeddings?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Cosine similarity measures the ANGLE between two vectors, ignoring their magnitude, producing a value from -1 (opposite) to 1 (identical direction). For text embeddings this is preferable to Euclidean distance because document LENGTH shouldn\'t affect meaning — a short tweet and a long article about the same topic point in a similar DIRECTION even though their vector magnitudes differ hugely. Euclidean distance would wrongly treat them as dissimilar; cosine similarity correctly identifies them as related.',
      hinglish:
        'Cosine similarity do vectors ke beech ka ANGLE measure karta hai, unki magnitude ignore karte hue, -1 (opposite) se 1 (identical direction) tak value dete hue. Text embeddings ke liye ye Euclidean distance se better hai kyunki document LENGTH meaning ko affect nahi karni chahiye — ek chhota tweet aur ek lamba article same topic pe similar DIRECTION mein point karte hain chahe unki vector magnitudes bahut alag hon. Euclidean distance unhe galat tarike se dissimilar treat karega; cosine similarity correctly unhe related identify karta hai.',
    },
  },
  {
    question: 'What is the transpose of a matrix?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        'The transpose flips a matrix over its diagonal — rows become columns and columns become rows, so an m x n matrix becomes n x m. In ML it appears constantly for practical reasons: making dimensions line up for matrix multiplication (you can only multiply A x B if A\'s columns match B\'s rows), and in the backpropagation equations, where gradients flowing backward involve the transpose of the forward weight matrix.',
      hinglish:
        'Transpose ek matrix ko uske diagonal pe flip karta hai — rows columns ban jaati hain aur columns rows, isliye ek m x n matrix n x m ban jaata hai. ML mein ye practical reasons se constantly dikhta hai: matrix multiplication ke liye dimensions line up karna (tum A x B sirf tab multiply kar sakte ho jab A ke columns B ki rows se match karein), aur backpropagation equations mein, jahan backward flow karne wale gradients forward weight matrix ke transpose ko involve karte hain.',
    },
  },
  {
    question: 'What is an identity matrix and an inverse matrix?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'The IDENTITY matrix (I) has 1s on its diagonal and 0s elsewhere — it is the matrix equivalent of the number 1, since A x I = A. The INVERSE of A (written A⁻¹) is the matrix that satisfies A x A⁻¹ = I — the matrix equivalent of a reciprocal. Inverses are used to solve linear systems analytically, but in practice ML avoids computing them for large matrices because it is numerically unstable and expensive; iterative methods like gradient descent are used instead.',
      hinglish:
        'IDENTITY matrix (I) mein diagonal pe 1s aur baaki jagah 0s hote hain — ye number 1 ka matrix equivalent hai, kyunki A x I = A. A ka INVERSE (A⁻¹ likha jaata hai) wo matrix hai jo A x A⁻¹ = I satisfy karta hai — ek reciprocal ka matrix equivalent. Inverses linear systems ko analytically solve karne ke liye use hote hain, par practically ML bade matrices ke liye unhe compute karne se bachta hai kyunki ye numerically unstable aur expensive hai; iske bajaye gradient descent jaise iterative methods use hote hain.',
    },
  },
  {
    question: 'What is matrix rank and why does it matter?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Rank is the number of linearly INDEPENDENT rows (or columns) in a matrix — effectively how much genuinely unique information it contains. If one column is just 2x another, it adds no new information and the rank drops. In ML, low rank signals redundant features (multicollinearity), which makes models unstable. It is also the key concept behind LoRA fine-tuning, which approximates a large weight update with two small LOW-RANK matrices, drastically cutting trainable parameters.',
      hinglish:
        'Rank ek matrix mein linearly INDEPENDENT rows (ya columns) ki number hai — effectively wo kitni genuinely unique information rakhta hai. Agar ek column bas doosre ka 2x hai, wo koi nayi information add nahi karta aur rank gir jaata hai. ML mein, low rank redundant features (multicollinearity) signal karta hai, jo models ko unstable banata hai. Ye LoRA fine-tuning ke peeche ka key concept bhi hai, jo ek bade weight update ko do chhote LOW-RANK matrices se approximate karta hai, trainable parameters drastically kam karte hue.',
    },
  },
  {
    question: 'What is Principal Component Analysis (PCA) in mathematical terms?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PCA finds new axes (principal components) along which the data varies the most, then projects the data onto the first few of them to reduce dimensions while keeping maximum information. Mathematically: compute the covariance matrix of the data, then find its EIGENVECTORS (the new axes) and EIGENVALUES (how much variance each axis captures). Sorting by eigenvalue and keeping the top k gives you the best possible k-dimensional linear compression of your data.',
      hinglish:
        'PCA naye axes (principal components) dhundhta hai jinke along data sabse zyada vary karta hai, phir data ko unme se pehle kuch pe project karta hai dimensions kam karne ke liye jabki maximum information rakhte hue. Mathematically: data ka covariance matrix compute karo, phir uske EIGENVECTORS (naye axes) aur EIGENVALUES (har axis kitna variance capture karta hai) dhundho. Eigenvalue se sort karke top k rakhna tumhe tumhare data ka best possible k-dimensional linear compression deta hai.',
    },
  },
  {
    question: 'What is a norm (L1 vs L2) in linear algebra?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A norm measures the "size" or length of a vector. The L2 norm (Euclidean) is the square root of the sum of squares — ordinary straight-line distance. The L1 norm (Manhattan) is the sum of absolute values — distance if you can only travel along grid lines. In ML these define regularisation penalties: L2 shrinks all weights smoothly toward zero, while L1\'s geometry drives some weights EXACTLY to zero, producing sparse models that effectively perform feature selection.',
      hinglish:
        'Ek norm ek vector ka "size" ya length measure karta hai. L2 norm (Euclidean) squares ke sum ka square root hai — ordinary straight-line distance. L1 norm (Manhattan) absolute values ka sum hai — distance agar tum sirf grid lines ke along travel kar sako. ML mein ye regularisation penalties define karte hain: L2 saare weights ko smoothly zero ki taraf shrink karta hai, jabki L1 ki geometry kuch weights ko EXACTLY zero pe le jaati hai, sparse models produce karte hue jo effectively feature selection karte hain.',
    },
  },

  // ─── Calculus ───────────────────────────────────────────
  {
    question: 'What is a derivative and what does it tell you?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A derivative measures the RATE OF CHANGE — how much the output changes for a tiny change in the input. Geometrically it is the slope of the curve at a point. In ML this is exactly what training needs: the derivative of the loss with respect to a weight tells you "if I nudge this weight up slightly, does the error go up or down, and by how much?" — which is precisely the information gradient descent uses to improve the model.',
      hinglish:
        'Ek derivative RATE OF CHANGE measure karta hai — input mein ek tiny change ke liye output kitna badalta hai. Geometrically ye ek point pe curve ka slope hai. ML mein yahi exactly training ko chahiye: ek weight ke respect mein loss ka derivative batata hai "agar main is weight ko thoda upar nudge karoon, error upar jaayega ya neeche, aur kitna?" — jo exactly wo information hai jise gradient descent model improve karne ke liye use karta hai.',
    },
  },
  {
    question: 'What is a partial derivative and a gradient?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A PARTIAL derivative is the derivative with respect to ONE variable while holding all others fixed — it isolates the effect of a single weight. The GRADIENT is the vector containing every partial derivative at once. Geometrically the gradient points in the direction of STEEPEST INCREASE, which is why gradient descent moves in the NEGATIVE gradient direction to decrease loss. For a model with a billion weights, the gradient is a billion-dimensional vector.',
      hinglish:
        'Ek PARTIAL derivative ek variable ke respect mein derivative hai jabki baaki sab fixed rakhe jaate hain — ye ek single weight ka effect isolate karta hai. GRADIENT wo vector hai jisme ek saath har partial derivative hota hai. Geometrically gradient STEEPEST INCREASE ki direction mein point karta hai, isliye gradient descent loss kam karne ke liye NEGATIVE gradient direction mein move karta hai. Ek billion weights wale model ke liye, gradient ek billion-dimensional vector hai.',
    },
  },
  {
    question: 'What is the chain rule and why is it the heart of backpropagation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The chain rule computes the derivative of nested (composed) functions: if y depends on u, and u depends on x, then dy/dx = (dy/du) x (du/dx). A neural network is exactly a deeply nested composition of functions — layer after layer. Backpropagation applies the chain rule repeatedly, working backwards from the loss, to figure out how each weight deep inside the network contributed to the final error. Without it, we\'d have no efficient way to train multi-layer networks at all.',
      hinglish:
        'Chain rule nested (composed) functions ka derivative compute karta hai: agar y u pe depend karta hai, aur u x pe, toh dy/dx = (dy/du) x (du/dx). Ek neural network exactly functions ka ek deeply nested composition hai — layer ke baad layer. Backpropagation chain rule ko baar-baar apply karta hai, loss se ulta kaam karte hue, ye figure out karne ke liye ki network ke andar deep har weight ne final error mein kitna contribute kiya. Iske bina, multi-layer networks train karne ka koi efficient tareeka hi nahi hota.',
    },
  },
  {
    question: 'What is a local minimum vs a global minimum?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A GLOBAL minimum is the lowest possible loss anywhere; a LOCAL minimum is a valley that is lowest only in its immediate neighbourhood, where gradient descent can get stuck since every direction points uphill. Interestingly, in very high-dimensional deep networks, true local minima are rarely the practical problem — SADDLE POINTS (flat in some directions, curved in others) are far more common, and most local minima found in practice give similarly good performance.',
      hinglish:
        'Ek GLOBAL minimum kahin bhi sabse kam possible loss hai; ek LOCAL minimum ek valley hai jo sirf apne immediate neighbourhood mein sabse kam hai, jahan gradient descent atak sakta hai kyunki har direction uphill point karti hai. Interestingly, bahut high-dimensional deep networks mein, true local minima rarely practical problem hote hain — SADDLE POINTS (kuch directions mein flat, doosron mein curved) bahut zyada common hain, aur practically mile zyadatar local minima similarly achhi performance dete hain.',
    },
  },
  {
    question: 'What is a convex function and why does convexity matter for optimisation?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A convex function is bowl-shaped: any straight line between two points on the curve lies above the curve. Its critical property is having exactly ONE minimum, so gradient descent is GUARANTEED to find the global optimum. Linear and logistic regression have convex loss functions, which is why they train reliably. Deep neural network losses are highly NON-convex with countless local minima — training them works well in practice, but offers no mathematical guarantee of finding the best solution.',
      hinglish:
        'Ek convex function bowl-shaped hai: curve pe do points ke beech koi bhi straight line curve ke upar hoti hai. Iski critical property hai ki isme exactly EK minimum hota hai, isliye gradient descent global optimum dhundhne ki GUARANTEE deta hai. Linear aur logistic regression ke convex loss functions hote hain, isliye wo reliably train hote hain. Deep neural network losses highly NON-convex hote hain countless local minima ke saath — unhe train karna practically achha kaam karta hai, par best solution dhundhne ki koi mathematical guarantee nahi deta.',
    },
  },
  {
    question: 'What is the learning rate in terms of calculus?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The gradient tells you the DIRECTION to move and the local steepness, but not how FAR to step. The learning rate is the scalar multiplier that converts the gradient into an actual step size: new_weight = old_weight - (learning_rate x gradient). Because the gradient is only accurate very near the current point, too large a step overshoots into a region where the gradient no longer applies — which is exactly why an excessive learning rate causes divergence.',
      hinglish:
        'Gradient tumhe move karne ki DIRECTION aur local steepness batata hai, par ye nahi ki KITNA door step lena hai. Learning rate wo scalar multiplier hai jo gradient ko ek actual step size mein convert karta hai: new_weight = old_weight - (learning_rate x gradient). Kyunki gradient sirf current point ke bahut paas accurate hota hai, bahut bada step ek aise region mein overshoot kar jaata hai jahan gradient apply nahi hota — yahi exactly wajah hai ki ek excessive learning rate divergence cause karta hai.',
    },
  },

  // ─── Probability & Statistics ───────────────────────────────────────────
  {
    question: 'What is the difference between probability and likelihood?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'They ask opposite questions. PROBABILITY: given a known model, how likely is this data? (Model fixed, data varies.) LIKELIHOOD: given observed data, how well does this model explain it? (Data fixed, model parameters vary.) Training a model is Maximum Likelihood Estimation — searching for the parameters that make the observed training data most likely. Cross-entropy loss is mathematically equivalent to negative log-likelihood, which is why minimising it maximises how well the model explains the data.',
      hinglish:
        'Ye ulte sawaal poochte hain. PROBABILITY: ek known model diya gaya, ye data kitna likely hai? (Model fixed, data varies.) LIKELIHOOD: observed data diya gaya, ye model use kitna achha explain karta hai? (Data fixed, model parameters vary.) Ek model train karna Maximum Likelihood Estimation hai — un parameters ko dhundhna jo observed training data ko sabse zyada likely banayein. Cross-entropy loss mathematically negative log-likelihood ke barabar hai, isliye ise minimise karna maximise karta hai ki model data ko kitna achha explain karta hai.',
    },
  },
  {
    question: 'What is a probability distribution?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A probability distribution describes how likely each possible outcome is, with all probabilities summing to 1. DISCRETE distributions cover countable outcomes (a dice roll, class labels) — described by a probability mass function. CONTINUOUS distributions cover ranges (height, temperature) — described by a probability density function. A classifier\'s softmax output IS a probability distribution over the possible classes.',
      hinglish:
        'Ek probability distribution batata hai ki har possible outcome kitna likely hai, saari probabilities 1 tak sum hoti hui. DISCRETE distributions countable outcomes cover karti hain (ek dice roll, class labels) — ek probability mass function se describe hoti hain. CONTINUOUS distributions ranges cover karti hain (height, temperature) — ek probability density function se describe hoti hain. Ek classifier ka softmax output possible classes pe ek probability distribution HI hai.',
    },
  },
  {
    question: 'What is the normal (Gaussian) distribution and why does it appear everywhere?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The normal distribution is the symmetric bell curve, defined entirely by its mean (centre) and standard deviation (spread), with ~68% of values within one standard deviation and ~95% within two. It appears everywhere because of the CENTRAL LIMIT THEOREM: sums or averages of many independent random effects tend toward a normal distribution regardless of the underlying distributions. In ML it underpins weight initialisation schemes, Gaussian noise in diffusion models, and many statistical tests.',
      hinglish:
        'Normal distribution symmetric bell curve hai, poori tarah apne mean (centre) aur standard deviation (spread) se defined, ~68% values ek standard deviation ke andar aur ~95% do ke andar. Ye har jagah dikhta hai CENTRAL LIMIT THEOREM ki wajah se: bahut saare independent random effects ke sums ya averages ek normal distribution ki taraf jaate hain, underlying distributions ki parwah kiye bina. ML mein ye weight initialisation schemes, diffusion models mein Gaussian noise, aur bahut saare statistical tests ka base hai.',
    },
  },
  {
    question: 'What is the difference between mean, median, and mode?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'MEAN is the arithmetic average — sensitive to outliers, since one extreme value drags it. MEDIAN is the middle value when sorted — robust to outliers. MODE is the most frequent value. Classic example: for salaries [30k, 35k, 40k, 45k, 5000k], the mean (~1030k) is misleading while the median (40k) accurately represents a typical salary. For skewed data or data with outliers, always report the median.',
      hinglish:
        'MEAN arithmetic average hai — outliers ke liye sensitive, kyunki ek extreme value ise kheench leti hai. MEDIAN sort karne pe middle value hai — outliers ke liye robust. MODE sabse frequent value hai. Classic example: salaries [30k, 35k, 40k, 45k, 5000k] ke liye, mean (~1030k) misleading hai jabki median (40k) accurately ek typical salary represent karta hai. Skewed data ya outliers wale data ke liye, hamesha median report karo.',
    },
  },
  {
    question: 'What is variance and standard deviation?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Both measure SPREAD. Variance is the average of squared differences from the mean; standard deviation is its square root. The key practical difference is units: variance is in squared units (hard to interpret), while standard deviation is in the SAME units as the original data, making it directly interpretable ("average deviation is 5 kg"). Variance appears in the maths (bias-variance tradeoff, PCA); standard deviation appears in reporting and interpretation.',
      hinglish:
        'Dono SPREAD measure karte hain. Variance mean se squared differences ka average hai; standard deviation uska square root hai. Key practical difference units hai: variance squared units mein hai (interpret karna mushkil), jabki standard deviation original data ke SAME units mein hai, jo ise directly interpretable banata hai ("average deviation 5 kg hai"). Variance maths mein dikhta hai (bias-variance tradeoff, PCA); standard deviation reporting aur interpretation mein dikhta hai.',
    },
  },
  {
    question: 'What is Bayes\' theorem and where is it used in ML?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Bayes\' theorem describes how to UPDATE a belief given new evidence: P(A|B) = P(B|A) x P(A) / P(B). In words: posterior = (likelihood x prior) / evidence. Its ML applications are wide: the Naive Bayes classifier applies it directly (famously for spam filtering), Bayesian optimisation uses it for smart hyperparameter search, and it provides the theoretical foundation for reasoning about uncertainty in probabilistic models.',
      hinglish:
        'Bayes\' theorem batata hai ki naye evidence ke saath ek belief ko kaise UPDATE karein: P(A|B) = P(B|A) x P(A) / P(B). Shabdon mein: posterior = (likelihood x prior) / evidence. Iske ML applications wide hain: Naive Bayes classifier ise directly apply karta hai (famously spam filtering ke liye), Bayesian optimisation ise smart hyperparameter search ke liye use karta hai, aur ye probabilistic models mein uncertainty ke baare mein reason karne ki theoretical foundation deta hai.',
    },
  },
  {
    question: 'What is conditional probability?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Conditional probability P(A|B) is the probability of A GIVEN that B has already happened — it narrows the sample space to only cases where B is true. Example: the probability someone owns a car might be 40%, but P(owns car | earns over 1 crore) is far higher. This concept is fundamental to language models, which literally compute P(next word | all previous words) at every generation step.',
      hinglish:
        'Conditional probability P(A|B) A ki probability hai YE MAANTE HUE ki B already ho chuka hai — ye sample space ko sirf un cases tak narrow karta hai jahan B true hai. Example: kisi ke paas car hone ki probability 40% ho sakti hai, par P(car hai | 1 crore se zyada kamaata hai) bahut zyada hai. Ye concept language models ke liye fundamental hai, jo literally har generation step pe P(next word | saare previous words) compute karte hain.',
    },
  },
  {
    question: 'What is entropy in information theory?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Entropy measures UNCERTAINTY or "surprise" in a distribution. A fair coin has maximum entropy (1 bit — genuinely unpredictable); a coin that always lands heads has zero entropy (no information gained from a flip). In ML: decision trees split on the feature that most REDUCES entropy (information gain), and cross-entropy loss measures how much extra uncertainty your predicted distribution has compared to the true one — minimising it means making your predictions match reality.',
      hinglish:
        'Entropy ek distribution mein UNCERTAINTY ya "surprise" measure karta hai. Ek fair coin ki maximum entropy hoti hai (1 bit — genuinely unpredictable); ek coin jo hamesha heads aata hai uski zero entropy hai (ek flip se koi information nahi milti). ML mein: decision trees us feature pe split karte hain jo entropy sabse zyada KAM kare (information gain), aur cross-entropy loss measure karta hai ki tumhare predicted distribution mein true wale ke comparison mein kitni extra uncertainty hai — ise minimise karna matlab apni predictions ko reality se match karana.',
    },
  },
  {
    question: 'What is the Central Limit Theorem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The Central Limit Theorem states that the distribution of SAMPLE MEANS approaches a normal distribution as sample size grows, REGARDLESS of the shape of the original population distribution. This is remarkably powerful: it means you can use normal-distribution-based statistics (confidence intervals, z-tests, A/B test significance) on almost any data, as long as your samples are reasonably large and independent — you don\'t need the underlying data itself to be normally distributed.',
      hinglish:
        'Central Limit Theorem kehta hai ki SAMPLE MEANS ka distribution ek normal distribution ki taraf jaata hai jaise sample size badhta hai, original population distribution ke shape ki PARWAH KIYE BINA. Ye remarkably powerful hai: iska matlab tum almost kisi bhi data pe normal-distribution-based statistics (confidence intervals, z-tests, A/B test significance) use kar sakte ho, jab tak tumhare samples reasonably bade aur independent hon — tumhe underlying data ko khud normally distributed hone ki zaroorat nahi.',
    },
  },
  {
    question: 'What is a p-value?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A p-value is the probability of observing a result at least as extreme as yours, ASSUMING the null hypothesis (no real effect) is true. A small p-value (conventionally < 0.05) means your result would be unlikely by pure chance, so you reject the null hypothesis. Crucially, it is NOT the probability that your hypothesis is correct — a very common misinterpretation. It only tells you how surprising your data would be in a world with no real effect.',
      hinglish:
        'Ek p-value tumhare jitne ya usse zyada extreme result observe karne ki probability hai, YE MAANTE HUE ki null hypothesis (koi real effect nahi) true hai. Ek chhoti p-value (conventionally < 0.05) matlab tumhara result pure chance se unlikely hoga, isliye tum null hypothesis reject karte ho. Crucially, ye tumhari hypothesis correct hone ki probability NAHI hai — ek bahut common misinterpretation. Ye sirf batata hai ki ek aise duniya mein jahan koi real effect nahi hai, tumhara data kitna surprising hoga.',
    },
  },
  {
    question: 'What is the difference between correlation and causation?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Correlation means two variables move together statistically; causation means one actually CAUSES the other. Correlation can arise without causation via a confounding variable (ice cream sales and drowning both rise in summer — heat causes both) or pure coincidence. ML models learn CORRELATIONS, which is why a model can be highly accurate yet capture a spurious pattern that breaks in deployment. Establishing causation requires controlled experiments (A/B tests) or causal inference methods, not just observational data.',
      hinglish:
        'Correlation matlab do variables statistically saath move karte hain; causation matlab ek actually doosre ko CAUSE karta hai. Correlation causation ke bina aa sakta hai ek confounding variable ke through (ice cream sales aur drowning dono garmiyon mein badhte hain — heat dono ko cause karti hai) ya pure coincidence se. ML models CORRELATIONS seekhte hain, isliye ek model highly accurate ho sakta hai par ek spurious pattern capture kar sakta hai jo deployment mein toot jaaye. Causation establish karne ke liye controlled experiments (A/B tests) ya causal inference methods chahiye, sirf observational data nahi.',
    },
  },
  {
    question: 'What is the difference between a population and a sample?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        'A POPULATION is every member of the group you care about (all Indian voters); a SAMPLE is the subset you actually measure (5,000 surveyed voters). Since measuring an entire population is usually impossible, statistics uses samples to INFER population properties — with a margin of error. The critical requirement is that the sample be REPRESENTATIVE; a biased sample (e.g. only surveying smartphone users) produces confidently wrong conclusions no matter how large it is.',
      hinglish:
        'Ek POPULATION us group ka har member hai jiski tumhe parwah hai (saare Indian voters); ek SAMPLE wo subset hai jo tum actually measure karte ho (5,000 surveyed voters). Kyunki ek poori population measure karna usually impossible hai, statistics samples use karke population properties INFER karti hai — ek margin of error ke saath. Critical requirement hai ki sample REPRESENTATIVE ho; ek biased sample (jaise sirf smartphone users survey karna) confidently galat conclusions deta hai chahe wo kitna bhi bada ho.',
    },
  },
  {
    question: 'What is standardisation (z-score) vs normalisation (min-max scaling)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'STANDARDISATION (z-score) rescales data to mean 0 and standard deviation 1 using (x - mean) / std — it preserves outliers and has no bounded range, preferred when data is roughly normal or for algorithms assuming zero-centred input. NORMALISATION (min-max) squeezes data into a fixed [0, 1] range using (x - min) / (max - min) — simple and bounded, but a single extreme outlier compresses all other values into a tiny sliver of the range.',
      hinglish:
        'STANDARDISATION (z-score) data ko mean 0 aur standard deviation 1 pe rescale karta hai (x - mean) / std se — ye outliers preserve karta hai aur iska koi bounded range nahi, preferred jab data roughly normal ho ya zero-centred input assume karne wale algorithms ke liye. NORMALISATION (min-max) data ko ek fixed [0, 1] range mein squeeze karta hai (x - min) / (max - min) se — simple aur bounded, par ek single extreme outlier baaki saari values ko range ke ek tiny sliver mein compress kar deta hai.',
    },
  },
  {
    question: 'Why is feature scaling necessary for many ML algorithms?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Algorithms that rely on distances or gradients treat larger numeric ranges as more important. If "salary" ranges 0-10,00,000 and "age" ranges 0-100, salary will completely dominate a distance calculation (KNN, K-means) or produce wildly uneven gradients (neural networks, gradient descent), making training slow and unstable. Scaling puts all features on comparable footing. Tree-based models (Decision Trees, Random Forest, XGBoost) are the notable exception — they split on thresholds and are scale-invariant.',
      hinglish:
        'Wo algorithms jo distances ya gradients pe depend karte hain, bade numeric ranges ko zyada important treat karte hain. Agar "salary" 0-10,00,000 range karti hai aur "age" 0-100, salary ek distance calculation (KNN, K-means) ko poori tarah dominate karegi ya wildly uneven gradients produce karegi (neural networks, gradient descent), training ko slow aur unstable banate hue. Scaling saare features ko comparable footing pe rakhta hai. Tree-based models (Decision Trees, Random Forest, XGBoost) notable exception hain — wo thresholds pe split karte hain aur scale-invariant hote hain.',
    },
  },
  {
    question: 'What is the curse of dimensionality?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'As the number of features grows, the volume of the space grows exponentially, so your data points become increasingly sparse and far apart. Consequences: distance-based methods break down (everything becomes roughly equidistant, so "nearest neighbour" loses meaning), the data needed for reliable learning grows exponentially, and overfitting becomes much easier. This is exactly why dimensionality reduction (PCA), feature selection, and regularisation are so important with high-dimensional data.',
      hinglish:
        'Jaise features ki number badhti hai, space ka volume exponentially badhta hai, isliye tumhare data points increasingly sparse aur ek doosre se door ho jaate hain. Consequences: distance-based methods toot jaate hain (sab kuch roughly equidistant ho jaata hai, isliye "nearest neighbour" apna matlab kho deta hai), reliable learning ke liye chahiye data exponentially badhta hai, aur overfitting bahut easier ho jaata hai. Yahi exactly wajah hai ki high-dimensional data ke saath dimensionality reduction (PCA), feature selection, aur regularisation itne important hain.',
    },
  },
  {
    question: 'What is covariance and how is it different from correlation?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'COVARIANCE measures whether two variables move together — positive means they rise together, negative means one rises as the other falls. Its problem is that its magnitude depends on the variables\' units, so you cannot compare covariances across different variable pairs. CORRELATION is covariance normalised to a standard [-1, 1] range, making it unit-free and directly comparable. Covariance appears inside the maths (the covariance matrix in PCA); correlation appears when interpreting relationships.',
      hinglish:
        'COVARIANCE measure karta hai ki do variables saath move karte hain ya nahi — positive matlab wo saath badhte hain, negative matlab ek badhta hai jab doosra girta hai. Iski problem hai ki iski magnitude variables ke units pe depend karti hai, isliye tum different variable pairs ke across covariances compare nahi kar sakte. CORRELATION covariance hai jo ek standard [-1, 1] range mein normalise kiya gaya hai, jo ise unit-free aur directly comparable banata hai. Covariance maths ke andar dikhta hai (PCA mein covariance matrix); correlation relationships interpret karte waqt dikhta hai.',
    },
  },
  {
    question: 'What are eigenvalues and eigenvectors, intuitively?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'When a matrix transforms a vector, most vectors get rotated AND stretched. An EIGENVECTOR is a special vector whose DIRECTION does not change under that transformation — it only gets scaled. Its EIGENVALUE is the scaling factor. Intuitively, eigenvectors reveal the "natural axes" of a transformation. In PCA, the eigenvectors of the covariance matrix are the principal components (the natural axes of variation), and their eigenvalues tell you how much variance each one explains.',
      hinglish:
        'Jab ek matrix ek vector ko transform karta hai, zyadatar vectors rotate AUR stretch hote hain. Ek EIGENVECTOR ek special vector hai jiski DIRECTION us transformation mein nahi badalti — wo sirf scale hota hai. Iska EIGENVALUE wo scaling factor hai. Intuitively, eigenvectors ek transformation ke "natural axes" reveal karte hain. PCA mein, covariance matrix ke eigenvectors principal components hote hain (variation ke natural axes), aur unke eigenvalues batate hain ki har ek kitna variance explain karta hai.',
    },
  },
  {
    question: 'What is the difference between discrete and continuous random variables?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        'A DISCRETE random variable takes countable, separate values — a dice roll (1-6), number of website visits, a class label. Its probabilities are given by a probability MASS function, and P(X = 3) is a meaningful nonzero number. A CONTINUOUS random variable takes any value in a range — height, temperature, time. It uses a probability DENSITY function, and P(X = exactly 1.7000...) is technically zero; only ranges like P(1.6 < X < 1.8) have meaningful probability.',
      hinglish:
        'Ek DISCRETE random variable countable, separate values leta hai — ek dice roll (1-6), website visits ki number, ek class label. Iski probabilities ek probability MASS function se milti hain, aur P(X = 3) ek meaningful nonzero number hai. Ek CONTINUOUS random variable ek range mein koi bhi value leta hai — height, temperature, time. Ye ek probability DENSITY function use karta hai, aur P(X = exactly 1.7000...) technically zero hai; sirf P(1.6 < X < 1.8) jaisi ranges ki meaningful probability hoti hai.',
    },
  },
  {
    question: 'What is maximum likelihood estimation (MLE)?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'MLE is the principle of choosing the model parameters that make the OBSERVED data most probable. You write the likelihood of the data as a function of the parameters, then find the parameters maximising it (in practice, maximising the LOG-likelihood, since sums are easier to differentiate than products). This is not a niche idea — it is the theoretical justification for most standard loss functions: minimising cross-entropy loss IS maximum likelihood estimation for a classifier.',
      hinglish:
        'MLE wo principle hai jisme wo model parameters choose karte hain jo OBSERVED data ko sabse zyada probable banayein. Tum data ki likelihood ko parameters ke ek function ke roop mein likhte ho, phir wo parameters dhundhte ho jo use maximise karein (practically, LOG-likelihood maximise karna, kyunki sums products se differentiate karna easier hai). Ye koi niche idea nahi hai — ye zyadatar standard loss functions ka theoretical justification hai: cross-entropy loss minimise karna ek classifier ke liye maximum likelihood estimation HI hai.',
    },
  },
  {
    question: 'What is a confidence interval?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A confidence interval gives a RANGE of plausible values for an unknown quantity, along with a confidence level. "The average is 50 ± 3 with 95% confidence" means that if you repeated this sampling procedure many times, about 95% of the intervals produced would contain the true value. It communicates UNCERTAINTY, which a single point estimate hides — reporting "accuracy is 91%" is far less honest than "accuracy is 91% ± 2%".',
      hinglish:
        'Ek confidence interval ek unknown quantity ke liye plausible values ki ek RANGE deta hai, ek confidence level ke saath. "Average 50 ± 3 hai 95% confidence ke saath" matlab agar tum is sampling procedure ko bahut baar repeat karo, produce hue intervals mein se about 95% mein true value hogi. Ye UNCERTAINTY communicate karta hai, jo ek single point estimate chhupa deta hai — "accuracy 91% hai" report karna "accuracy 91% ± 2% hai" se bahut kam honest hai.',
    },
  },
  {
    question: 'What is a saddle point and why does it matter in deep learning?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A saddle point is where the gradient is zero but it is neither a minimum nor a maximum — the surface curves UP in some directions and DOWN in others (shaped like a horse saddle or mountain pass). In high-dimensional deep networks, saddle points vastly outnumber true local minima, and they are the more common cause of training stalling, since the gradient is near zero and progress crawls. Momentum-based optimisers help specifically by carrying velocity through these flat regions.',
      hinglish:
        'Ek saddle point wahan hai jahan gradient zero hai par wo na minimum hai na maximum — surface kuch directions mein UPAR curve karta hai aur doosron mein NEECHE (ek horse saddle ya mountain pass jaisa shape). High-dimensional deep networks mein, saddle points true local minima se bahut zyada hote hain, aur wo training ruk jaane ka zyada common cause hain, kyunki gradient near zero hota hai aur progress rengti hai. Momentum-based optimisers specifically in flat regions se velocity le jaake madad karte hain.',
    },
  },
  {
    question: 'What is a Jacobian and a Hessian?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'The JACOBIAN is the matrix of all FIRST-order partial derivatives of a vector-valued function — it generalises the gradient to functions with multiple outputs, and is what backpropagation effectively chains together. The HESSIAN is the matrix of all SECOND-order partial derivatives, describing the CURVATURE of the loss surface. Second-order optimisation methods use the Hessian to take much smarter steps, but for a model with a billion parameters the Hessian would have a billion-squared entries — computationally impossible, which is why deep learning sticks to first-order methods like Adam.',
      hinglish:
        'JACOBIAN ek vector-valued function ke saare FIRST-order partial derivatives ka matrix hai — ye gradient ko multiple outputs wale functions tak generalise karta hai, aur yahi hai jise backpropagation effectively chain karta hai. HESSIAN saare SECOND-order partial derivatives ka matrix hai, jo loss surface ki CURVATURE describe karta hai. Second-order optimisation methods Hessian use karke bahut smarter steps lete hain, par ek billion parameters wale model ke liye Hessian mein billion-squared entries hongi — computationally impossible, isliye deep learning Adam jaise first-order methods pe hi rehta hai.',
    },
  },
  {
    question: 'What is one-hot encoding and why is it needed?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'One-hot encoding converts a categorical value into a vector of all zeros with a single 1 at the position for that category. It is needed because assigning arbitrary integers (red=1, green=2, blue=3) would falsely imply an ORDER and that blue is somehow "3x" red, which no model should learn. One-hot removes that false ordering. Its downside is producing very high-dimensional sparse vectors for categories with many values, which is exactly the problem embeddings solve.',
      hinglish:
        'One-hot encoding ek categorical value ko saare zeros ke ek vector mein convert karta hai jisme us category ki position pe ek single 1 hota hai. Ye zaroori hai kyunki arbitrary integers assign karna (red=1, green=2, blue=3) galat tarike se ek ORDER imply karega aur ye ki blue kisi tarah red ka "3x" hai, jo koi model nahi seekhna chahiye. One-hot wo false ordering hata deta hai. Iska downside bahut high-dimensional sparse vectors produce karna hai un categories ke liye jinme bahut values hain, jo exactly wo problem hai jo embeddings solve karte hain.',
    },
  },
  {
    question: 'What is the difference between L1 and L2 regularisation, mathematically?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'L2 adds the sum of SQUARED weights to the loss. Its derivative is proportional to the weight itself, so the shrinking force gets weaker as weights approach zero — pushing them close to but never exactly zero. L1 adds the sum of ABSOLUTE weights. Its derivative is a CONSTANT regardless of weight size, so the shrinking force stays strong all the way down, driving weights exactly to zero. This mathematical difference is precisely why L1 produces sparse models and L2 does not.',
      hinglish:
        'L2 loss mein SQUARED weights ka sum add karta hai. Iska derivative weight ke khud proportional hai, isliye shrinking force weaker ho jaati hai jab weights zero ke paas aate hain — unhe paas tak push karte hue par kabhi exactly zero nahi. L1 ABSOLUTE weights ka sum add karta hai. Iska derivative weight size ki parwah kiye bina ek CONSTANT hai, isliye shrinking force poore neeche tak strong rehti hai, weights ko exactly zero pe le jaate hue. Yahi mathematical difference exactly wajah hai ki L1 sparse models produce karta hai aur L2 nahi.',
    },
  },
  {
    question: 'What is the softmax function mathematically, and why exponentiate?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Softmax converts a vector of raw scores (logits) into probabilities: exp(zi) / sum(exp(zj)) for all j. Exponentiating serves two purposes: it makes every value POSITIVE (probabilities cannot be negative, and logits can be), and it AMPLIFIES differences so higher scores gain disproportionately more probability. Dividing by the sum guarantees the outputs total exactly 1, forming a valid probability distribution over the classes.',
      hinglish:
        'Softmax raw scores (logits) ke ek vector ko probabilities mein convert karta hai: saare j ke liye exp(zi) / sum(exp(zj)). Exponentiate karna do purposes serve karta hai: ye har value ko POSITIVE banata hai (probabilities negative nahi ho sakti, aur logits ho sakte hain), aur ye differences ko AMPLIFY karta hai taaki higher scores disproportionately zyada probability paayein. Sum se divide karna guarantee karta hai ki outputs exactly 1 tak total hon, classes pe ek valid probability distribution banate hue.',
    },
  },
  {
    question: 'What is gradient clipping and what problem does it solve mathematically?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Gradient clipping caps the gradient\'s magnitude (norm) at a threshold before the weight update, rescaling it if it exceeds that limit while preserving its direction. It solves EXPLODING gradients: when gradients grow enormous, the update step overshoots into a completely different region of the loss surface, destroying the learned weights and producing NaN loss. Clipping keeps the step size bounded and stable, and is standard practice when training RNNs and Transformers.',
      hinglish:
        'Gradient clipping weight update se pehle gradient ki magnitude (norm) ko ek threshold pe cap karta hai, agar wo limit exceed kare to use rescale karta hai jabki uski direction preserve karte hue. Ye EXPLODING gradients solve karta hai: jab gradients enormous ho jaate hain, update step loss surface ke ek bilkul different region mein overshoot kar jaata hai, seekhe hue weights destroy karte hue aur NaN loss produce karte hue. Clipping step size ko bounded aur stable rakhta hai, aur RNNs aur Transformers train karte waqt standard practice hai.',
    },
  },
  {
    question: 'What does it mean for a function to be differentiable, and why must ML models be differentiable?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A function is differentiable if it has a well-defined derivative everywhere — intuitively, it is smooth with no sharp corners or breaks. Gradient-based training REQUIRES this, because you cannot compute a gradient where none exists. This constraint shapes real design choices: accuracy is not differentiable (it jumps in steps), which is why we train against cross-entropy loss and only MEASURE accuracy. ReLU is technically non-differentiable exactly at zero, but frameworks simply define a value there and it works fine in practice.',
      hinglish:
        'Ek function differentiable hai agar iska har jagah ek well-defined derivative ho — intuitively, ye smooth hai bina sharp corners ya breaks ke. Gradient-based training ise ZAROORI maangti hai, kyunki tum wahan gradient compute nahi kar sakte jahan koi exist na kare. Ye constraint real design choices shape karta hai: accuracy differentiable nahi hai (ye steps mein jump karti hai), isliye hum cross-entropy loss ke against train karte hain aur accuracy sirf MEASURE karte hain. ReLU technically exactly zero pe non-differentiable hai, par frameworks bas wahan ek value define kar dete hain aur ye practically theek kaam karta hai.',
    },
  },
  {
    question: 'What is the difference between interpolation and extrapolation, and why is extrapolation risky in ML?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'INTERPOLATION is predicting within the range of values the model saw during training; EXTRAPOLATION is predicting outside it. Models are generally reliable when interpolating and unreliable when extrapolating, because they only learned patterns that held inside the training range and have no basis for what happens beyond it. A model trained on house prices from 500-2000 sq ft can confidently produce an absurd number for a 50,000 sq ft property — which is why checking whether production inputs fall inside the training distribution matters.',
      hinglish:
        'INTERPOLATION un values ki range ke andar predict karna hai jo model ne training mein dekhi; EXTRAPOLATION uske bahar predict karna hai. Models generally interpolate karte waqt reliable hote hain aur extrapolate karte waqt unreliable, kyunki unhe sirf wo patterns seekhe jo training range ke andar hold karte the aur uske aage kya hota hai iska koi basis nahi hai. 500-2000 sq ft ke house prices pe train hua model ek 50,000 sq ft property ke liye confidently ek absurd number de sakta hai — isliye ye check karna matter karta hai ki production inputs training distribution ke andar girte hain ya nahi.',
    },
  },
  {
    question: 'What is a linear transformation and how does it relate to neural network layers?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A linear transformation maps vectors to vectors while preserving addition and scalar multiplication — geometrically it can rotate, scale, shear, or project space, but always keeps the origin fixed and straight lines straight. Every dense neural network layer computes exactly this (weights x input) plus a bias shift. The critical insight: composing linear transformations only ever gives another linear transformation, which is precisely why non-linear activation functions are mandatory between layers.',
      hinglish:
        'Ek linear transformation vectors ko vectors pe map karta hai jabki addition aur scalar multiplication preserve karte hue — geometrically ye space ko rotate, scale, shear, ya project kar sakta hai, par hamesha origin ko fixed aur straight lines ko straight rakhta hai. Har dense neural network layer exactly yahi compute karti hai (weights x input) plus ek bias shift. Critical insight: linear transformations compose karne se hamesha ek doosra linear transformation hi milta hai, jo exactly wajah hai ki layers ke beech non-linear activation functions mandatory hain.',
    },
  },
  {
    question: 'What is the difference between a parametric and non-parametric model?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A PARAMETRIC model has a FIXED number of parameters decided before training (linear regression, neural networks) — once trained, the data can be discarded, since all learned knowledge lives in those parameters. A NON-PARAMETRIC model\'s complexity grows with the data (K-Nearest Neighbours, decision trees) and typically needs to retain the training data (or structures derived from it) at prediction time. Parametric models are compact and fast at inference; non-parametric models are more flexible but heavier.',
      hinglish:
        'Ek PARAMETRIC model mein training se pehle decide kiya gaya ek FIXED number of parameters hote hain (linear regression, neural networks) — ek baar trained, data discard kiya ja sakta hai, kyunki saara learned knowledge un parameters mein rehta hai. Ek NON-PARAMETRIC model ki complexity data ke saath badhti hai (K-Nearest Neighbours, decision trees) aur typically prediction time pe training data (ya usse derive kiye structures) rakhna padta hai. Parametric models inference pe compact aur fast hote hain; non-parametric models zyada flexible par bhaari hote hain.',
    },
  },
  {
    question: 'What is stochastic vs deterministic in the context of ML algorithms?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'DETERMINISTIC means the same input always produces exactly the same output. STOCHASTIC means randomness is involved, so results vary between runs. Many ML components are deliberately stochastic: random weight initialisation, shuffled mini-batches in SGD, dropout, and data augmentation. This randomness genuinely helps (it escapes poor local minima and improves generalisation) but it means you must SET A RANDOM SEED to make experiments reproducible — otherwise two identical training runs give different models.',
      hinglish:
        'DETERMINISTIC matlab same input hamesha exactly same output deta hai. STOCHASTIC matlab randomness involved hai, isliye results runs ke beech vary karte hain. Bahut saare ML components deliberately stochastic hain: random weight initialisation, SGD mein shuffled mini-batches, dropout, aur data augmentation. Ye randomness genuinely madad karta hai (ye poor local minima se bachta hai aur generalisation improve karta hai) par iska matlab hai ki experiments reproducible banane ke liye tumhe ek RANDOM SEED SET karna padta hai — warna do identical training runs different models denge.',
    },
  },
  {
    question: 'What is Type I and Type II error?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A TYPE I error is a FALSE POSITIVE — rejecting a true null hypothesis, i.e. detecting an effect that isn\'t real (a fire alarm with no fire). A TYPE II error is a FALSE NEGATIVE — failing to reject a false null hypothesis, i.e. missing a real effect (a fire with no alarm). There is an inherent tradeoff: making your test stricter reduces Type I errors but increases Type II. Which one you tolerate depends entirely on stakes — medical screening accepts more false positives to avoid missing a real disease.',
      hinglish:
        'Ek TYPE I error ek FALSE POSITIVE hai — ek true null hypothesis reject karna, matlab ek aisa effect detect karna jo real nahi hai (bina aag ke fire alarm). Ek TYPE II error ek FALSE NEGATIVE hai — ek false null hypothesis reject karne mein fail hona, matlab ek real effect miss karna (bina alarm ke aag). Ek inherent tradeoff hai: apna test stricter banane se Type I errors kam hote hain par Type II badhte hain. Tum kaunsa tolerate karte ho ye poori tarah stakes pe depend karta hai — medical screening ek real disease miss karne se bachne ke liye zyada false positives accept karti hai.',
    },
  },
  {
    question: 'Why do we use log-probabilities instead of raw probabilities in ML?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Three reasons. NUMERICAL STABILITY: multiplying many small probabilities (0.001 x 0.002 x ...) underflows to zero in floating-point arithmetic, whereas adding their logs stays in a safe range. SIMPLER MATH: logs turn products into sums, and sums are far easier to differentiate — essential for gradient computation. BETTER GRADIENTS: log-loss penalises confidently wrong predictions very heavily, producing stronger learning signals than raw probabilities would.',
      hinglish:
        'Teen wajahein. NUMERICAL STABILITY: bahut saari chhoti probabilities multiply karna (0.001 x 0.002 x ...) floating-point arithmetic mein zero tak underflow kar jaata hai, jabki unke logs add karna ek safe range mein rehta hai. SIMPLER MATH: logs products ko sums mein badal dete hain, aur sums differentiate karna bahut easier hai — gradient computation ke liye essential. BETTER GRADIENTS: log-loss confidently galat predictions ko bahut heavily penalise karta hai, raw probabilities se stronger learning signals produce karte hue.',
    },
  },
];
