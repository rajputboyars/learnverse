// AI & Machine Learning curriculum — beginner -> intermediate -> advanced.
// In-depth coverage of ML algorithms and deep learning. Same shape as javascript.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'AI & Machine Learning',
  slug: 'ai-ml',
  description:
    'Machine Learning aur Deep Learning in depth — algorithms (regression, trees, SVM, KNN, clustering), training (gradient descent, regularization) aur neural networks (CNN, RNN, transformers). Python ke saath, English + Hinglish, desi examples aur code.',
  icon: 'brain',
  tags: ['ai', 'machine-learning', 'deep-learning', 'python', 'neural-networks'],
  difficulty: 'advanced',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 19,
};

const beginner = [
  {
    title: 'ML Foundations',
    level: 'beginner',
    description: 'ML kya hai, types, workflow aur basics.',
    concepts: [
      {
        title: 'What is Machine Learning (AI vs ML vs DL)',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'Machine Learning is a way to make computers learn patterns from data instead of being explicitly programmed with rules. AI is the broad goal of intelligent behaviour; ML is a subset that learns from data; Deep Learning is a further subset of ML using multi-layer neural networks. Instead of writing "if email contains X then spam", you feed labelled examples and the model learns the rule itself.',
          hinglish:
            'Machine Learning computers ko data se patterns seekhane ka tareeka hai, explicit rules se program karne ke bajaye. AI broad goal hai intelligent behaviour ka; ML ek subset hai jo data se seekhta hai; Deep Learning ML ka aur subset hai jo multi-layer neural networks use karta hai. "Agar email mein X ho to spam" likhne ke bajaye, tum labelled examples dete ho aur model rule khud seekh leta hai.',
        },
        dailyLifeExample:
          'Bachche ko "billi" pehchanna sikhana — tum rules nahi dete, bahut saari billi ki photos dikhate ho, wo khud pattern seekh leta hai. ML bhi waise hi examples se seekhta hai.',
        codeExample:
          '# Traditional programming: rules -> output\n# if "win money" in email: spam = True\n#\n# Machine Learning: data + answers -> learns the rule\n# model.fit(emails, labels)   # learn from examples\n# model.predict(new_email)    # apply the learned rule\n#\n# AI  ⊃ Machine Learning ⊃ Deep Learning',
        keyPoints: [
          'ML learns patterns from data, not hand-coded rules',
          'AI ⊃ ML ⊃ Deep Learning',
          'Deep Learning = multi-layer neural networks',
          'Give examples; the model learns the rule',
        ],
        quiz: [
          {
            question: 'Machine Learning differs from traditional programming because it…',
            options: ['uses faster CPUs', 'learns rules from data instead of being given rules', 'needs no data', 'only works on images'],
            correctIndex: 1,
          },
          {
            question: 'Deep Learning is…',
            options: ['broader than AI', 'a subset of ML using neural networks', 'unrelated to ML', 'a database'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between Artificial Intelligence, Machine Learning, and Deep Learning?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'AI is the broad field of building systems that exhibit intelligent behaviour (which could even be rule-based). Machine Learning is a subset of AI where systems learn patterns from data rather than being explicitly programmed. Deep Learning is a subset of ML that uses neural networks with many layers to learn complex representations, powering modern image, speech, and language systems. So they nest: AI ⊃ ML ⊃ DL.',
              hinglish:
                'AI broad field hai intelligent behaviour wale systems banane ka (jo rule-based bhi ho sakta hai). Machine Learning AI ka subset hai jahan systems data se patterns seekhte hain, explicitly program hone ke bajaye. Deep Learning ML ka subset hai jo bahut layers wale neural networks se complex representations seekhta hai, modern image, speech, aur language systems chalata hai. To ye nest karte hain: AI ⊃ ML ⊃ DL.',
            },
          },
        ],
      },
      {
        title: 'Types of Machine Learning',
        difficulty: 'easy',
        tags: ['supervised', 'unsupervised', 'reinforcement'],
        explanation: {
          english:
            'Three main paradigms. Supervised learning trains on labelled data (input + correct answer) to predict labels — regression (numbers) and classification (categories). Unsupervised learning finds structure in unlabelled data — clustering and dimensionality reduction. Reinforcement learning learns by trial and error, receiving rewards or penalties for actions (used in games and robotics). The label availability decides which paradigm fits.',
          hinglish:
            'Teen main paradigms. Supervised learning labelled data (input + correct answer) pe train hota hai labels predict karne ke liye — regression (numbers) aur classification (categories). Unsupervised learning unlabelled data mein structure dhoondhta hai — clustering aur dimensionality reduction. Reinforcement learning trial-and-error se seekhta hai, actions pe rewards ya penalties paake (games aur robotics mein). Label available hai ya nahi, ye decide karta hai kaunsa paradigm fit hai.',
        },
        dailyLifeExample:
          'Supervised = teacher solved examples deta hai (labels). Unsupervised = bina batao students ko khud groups banane do. Reinforcement = video game khel ke score (reward) se seekhna.',
        codeExample:
          '# Supervised:    X (features) + y (labels) -> predict y\n#   Regression     -> price, temperature (a number)\n#   Classification -> spam/ham, disease/healthy (a class)\n# Unsupervised:  X only (no labels)\n#   Clustering          -> group similar customers\n#   Dim. reduction (PCA)-> compress features\n# Reinforcement: agent + environment + reward signal',
        keyPoints: [
          'Supervised: labelled data (regression/classification)',
          'Unsupervised: no labels (clustering, PCA)',
          'Reinforcement: learn from rewards/penalties',
          'Label availability picks the paradigm',
        ],
        quiz: [
          {
            question: 'Spam detection with labelled emails is…',
            options: ['unsupervised', 'supervised classification', 'reinforcement', 'clustering'],
            correctIndex: 1,
          },
          {
            question: 'Grouping customers with no labels is…',
            options: ['supervised', 'unsupervised clustering', 'regression', 'reinforcement'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'The ML Workflow',
        difficulty: 'easy',
        tags: ['workflow', 'pipeline'],
        explanation: {
          english:
            'A typical ML project: (1) frame the problem and pick a metric, (2) collect and clean data, (3) split into train/validation/test, (4) engineer features, (5) choose and train a model, (6) tune hyperparameters using the validation set, (7) evaluate on the untouched test set, and (8) deploy and monitor. Crucially, the test set is only used once at the end — peeking at it during tuning leaks information and inflates your scores.',
          hinglish:
            'Ek typical ML project: (1) problem frame karo aur metric chuno, (2) data collect aur clean karo, (3) train/validation/test mein split karo, (4) features engineer karo, (5) model choose aur train karo, (6) validation set se hyperparameters tune karo, (7) untouched test set pe evaluate karo, aur (8) deploy aur monitor karo. Important: test set sirf aakhir mein ek baar use hota hai — tuning ke dauraan jhaank ne se information leak hoti hai aur scores fool ban jaate hain.',
        },
        dailyLifeExample:
          'Test set ek final exam jaisa hai — agar tum exam ke questions pehle se dekh lo (test pe tune karo), to marks fake honge. Isliye final test aakhir tak chhupa ke rakho.',
        codeExample:
          '# 1. Problem + metric\n# 2. Data collection + cleaning\n# 3. Train / validation / test split\n# 4. Feature engineering\n# 5. Train a model\n# 6. Tune hyperparameters on VALIDATION\n# 7. Evaluate ONCE on TEST (untouched)\n# 8. Deploy + monitor\n# Never tune on the test set (data leakage!).',
        keyPoints: [
          'Frame problem -> data -> split -> features -> train -> tune -> test -> deploy',
          'Tune on validation; evaluate once on test',
          'Test set must stay untouched until the end',
          'Monitor the model after deployment',
        ],
        quiz: [
          {
            question: 'You should tune hyperparameters using the…',
            options: ['test set', 'validation set', 'training labels only', 'deployment data'],
            correctIndex: 1,
          },
          {
            question: 'Using the test set during tuning causes…',
            options: ['faster training', 'data leakage and inflated scores', 'better generalisation', 'nothing'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Features, Labels & Train/Test Split',
        difficulty: 'easy',
        tags: ['features', 'data'],
        explanation: {
          english:
            'Features (X) are the input variables the model learns from; the label (y) is the target it predicts. A dataset is a table where each row is an example and columns are features (plus the label in supervised learning). We split data into a training set (to learn) and a test set (to measure generalisation), typically 80/20. Features often need scaling/encoding so the model treats them fairly.',
          hinglish:
            'Features (X) input variables hain jinse model seekhta hai; label (y) wo target hai jo predict hota hai. Dataset ek table hai jahan har row ek example aur columns features (plus supervised mein label) hote hain. Data ko training set (seekhne ke liye) aur test set (generalisation measure karne ke liye) mein split karte hain, aksar 80/20. Features ko aksar scaling/encoding chahiye taaki model unhe fairly treat kare.',
        },
        dailyLifeExample:
          'Ghar ki keemat predict karni hai: features = sqft, bedrooms, location; label = price. Model in features se price ka rishta seekhta hai.',
        codeExample:
          'from sklearn.model_selection import train_test_split\n\n# X = features (e.g. sqft, bedrooms), y = label (price)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n# train on (X_train, y_train); evaluate on (X_test, y_test)',
        keyPoints: [
          'Features (X) = inputs; label (y) = target',
          'Each row = one example',
          'Split into train (learn) and test (evaluate)',
          'Scale/encode features for fair learning',
        ],
        quiz: [
          {
            question: 'In supervised learning, the label is…',
            options: ['an input feature', 'the target the model predicts', 'the row count', 'the test set'],
            correctIndex: 1,
          },
          {
            question: 'A common train/test split ratio is…',
            options: ['50/50', '80/20', '99/1', '10/90'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Feature Scaling: Normalization & Standardization',
        difficulty: 'medium',
        tags: ['scaling', 'preprocessing', 'normalization'],
        explanation: {
          english:
            "Many algorithms (KNN, SVM, K-Means, gradient descent-based models) compare or combine features using distance or magnitude — so if one feature is 'age' (0-100) and another is 'income' (0-1,000,000), income will completely dominate the calculation just because its numbers are bigger, NOT because it is more important. Feature scaling fixes this by putting all features on a comparable range. Standardization (Z-score) rescales each feature to mean 0, standard deviation 1 — good when data roughly follows a normal distribution. Normalization (Min-Max) rescales to a fixed range, usually [0, 1] — good when you want a bounded range or the data isn't normally distributed. Always fit the scaler on the TRAINING data only, then apply the same transform to the test data — never fit on test data (that leaks information).",
          hinglish:
            "Bahut saare algorithms (KNN, SVM, K-Means, gradient descent-based models) features ko distance ya magnitude se compare/combine karte hain — isliye agar ek feature 'age' hai (0-100) aur doosra 'income' (0-1,000,000), to income poore calculation pe hawi ho jaayega sirf isliye kyunki uske numbers bade hain, isliye NAHI ki wo zyada important hai. Feature scaling ye theek karta hai sab features ko ek comparable range pe laake. Standardization (Z-score) har feature ko mean 0, standard deviation 1 pe rescale karta hai — achha jab data roughly normal distribution follow kare. Normalization (Min-Max) ek fixed range pe rescale karta hai, aksar [0, 1] — achha jab bounded range chahiye ya data normally distributed na ho. Hamesha scaler ko sirf TRAINING data pe fit karo, phir wahi transform test data pe apply karo — kabhi bhi test data pe fit mat karo (isse information leak hoti hai).",
        },
        dailyLifeExample:
          "Feature scaling ek race jaisi hai jaha kuch runners kilometers mein distance measure karte hain aur kuch miles mein — sabko fair compare karne ke liye pehle sabko same unit mein convert karna padta hai. Agar aisa na karo, 'zyada bada number' wala automatically 'jeetne' lagega, chahe wo actually behtar na ho.",
        codeExample:
          "from sklearn.preprocessing import StandardScaler, MinMaxScaler\n\n# Standardization: mean 0, std 1\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)  # fit + transform on TRAIN\nX_test_scaled = scaler.transform(X_test)        # only transform on TEST (never fit!)\n\n# Normalization: rescale to [0, 1]\nminmax = MinMaxScaler()\nX_train_norm = minmax.fit_transform(X_train)\nX_test_norm = minmax.transform(X_test)\n\n# Without scaling: income (0-1,000,000) would dominate age (0-100)\n# in any distance-based calculation, even if age matters more!",
        keyPoints: [
          'Distance/magnitude-based algorithms (KNN, SVM, K-Means) need features on comparable scales',
          'Standardization (Z-score): rescales to mean 0, std 1',
          'Normalization (Min-Max): rescales to a fixed range, usually [0, 1]',
          'Without scaling, a large-magnitude feature can dominate just because of its units, not its importance',
          'Fit the scaler on TRAINING data only; apply (transform) that same fit to test data — never fit on test data',
        ],
        quiz: [
          {
            question: "Why does a feature like 'income' (0-1,000,000) need scaling before use in KNN?",
            options: ['It does not need scaling', 'Without scaling, its large numeric range would dominate distance calculations regardless of its actual importance', 'KNN cannot use numeric features', 'Scaling makes the model faster only'],
            correctIndex: 1,
          },
          {
            question: 'What does standardization (Z-score) rescale a feature to?',
            options: ['A range of [0, 1]', 'Mean 0 and standard deviation 1', 'All values to 1', 'Integer values only'],
            correctIndex: 1,
          },
          {
            question: 'Why should you fit a scaler only on the training data, not the test data?',
            options: ['It does not matter which you fit on', 'Fitting on test data leaks information about the test set into training, giving an unrealistically optimistic evaluation', 'Test data cannot be scaled', 'Fitting is only for training labels'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Supervised Learning Algorithms',
    level: 'intermediate',
    description: 'Regression, trees, KNN, SVM aur Naive Bayes.',
    concepts: [
      {
        title: 'Linear Regression',
        difficulty: 'medium',
        tags: ['regression', 'algorithm'],
        explanation: {
          english:
            'Linear regression predicts a continuous number by fitting a straight line (or hyperplane) y = w·x + b that minimises the mean squared error between predictions and actual values. It is simple, fast, and interpretable — each weight tells how much a feature moves the prediction. Assumptions include a roughly linear relationship and limited multicollinearity. It is the classic baseline for any regression problem.',
          hinglish:
            'Linear regression ek continuous number predict karta hai ek straight line (ya hyperplane) y = w·x + b fit karke jo predictions aur actual values ke beech mean squared error minimise kare. Ye simple, fast, aur interpretable hai — har weight batata hai ek feature prediction ko kitna move karta hai. Assumptions: roughly linear relationship aur kam multicollinearity. Ye kisi bhi regression problem ka classic baseline hai.',
        },
        dailyLifeExample:
          'Past data se "itne sqft pe itni keemat" wali line kheench lena, phir naye ghar ka price us line se andaza lagana — yahi linear regression hai.',
        codeExample:
          'from sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X_train, y_train)\nmodel.predict(X_test)\nmodel.coef_     # weight per feature (interpretable)\nmodel.intercept_  # the bias term b',
        keyPoints: [
          'Predicts a number; fits y = w·x + b',
          'Minimises mean squared error',
          'Interpretable weights; strong baseline',
          'Assumes a roughly linear relationship',
        ],
        quiz: [
          {
            question: 'Linear regression predicts…',
            options: ['a category', 'a continuous number', 'a cluster', 'an image'],
            correctIndex: 1,
          },
          {
            question: 'Linear regression minimises…',
            options: ['accuracy', 'mean squared error', 'the number of features', 'tree depth'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Logistic Regression',
        difficulty: 'medium',
        tags: ['classification', 'algorithm'],
        explanation: {
          english:
            'Despite the name, logistic regression is a classification algorithm. It computes a linear score and passes it through the sigmoid function to output a probability between 0 and 1, then thresholds it (e.g. at 0.5) into a class. It is the go-to baseline for binary classification — interpretable, fast, and well-calibrated. Multiclass versions use softmax. It is trained by minimising log loss (cross-entropy).',
          hinglish:
            'Naam ke bawajood, logistic regression ek classification algorithm hai. Ye ek linear score nikaal kar use sigmoid function se 0 aur 1 ke beech probability mein badalta hai, phir use threshold (jaise 0.5) pe class mein convert karta hai. Ye binary classification ka go-to baseline hai — interpretable, fast, aur well-calibrated. Multiclass versions softmax use karte hain. Ye log loss (cross-entropy) minimise karke train hota hai.',
        },
        dailyLifeExample:
          'Logistic regression doctor ke "X-ray dekh ke 80% chance hai ki fracture hai" jaisa hai — ek probability deta hai, phir cutoff se decision (fracture / no fracture).',
        codeExample:
          'from sklearn.linear_model import LogisticRegression\nclf = LogisticRegression().fit(X_train, y_train)\nclf.predict(X_test)          # class (0/1)\nclf.predict_proba(X_test)    # probability per class\n# sigmoid maps the linear score to (0, 1)',
        keyPoints: [
          'Classification, not regression',
          'Sigmoid -> probability; threshold -> class',
          'Trained by minimising log loss (cross-entropy)',
          'Great interpretable baseline for binary tasks',
        ],
        quiz: [
          {
            question: 'Logistic regression is used for…',
            options: ['predicting numbers', 'classification', 'clustering', 'dimensionality reduction'],
            correctIndex: 1,
          },
          {
            question: 'Which function turns the score into a probability?',
            options: ['ReLU', 'sigmoid', 'sort', 'mean'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why is logistic regression called "regression" if it does classification?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Because under the hood it is a linear regression on the log-odds (logit) of the outcome — it fits a linear function w·x + b to the log-odds, then the sigmoid maps that to a probability in (0,1). So the "regression" refers to modelling a continuous quantity (the log-odds/probability); we then threshold that probability to make a class decision, which is why we use it for classification.',
              hinglish:
                'Kyunki andar se ye outcome ke log-odds (logit) pe linear regression hai — ye log-odds pe ek linear function w·x + b fit karta hai, phir sigmoid use (0,1) probability mein map karta hai. To "regression" ek continuous quantity (log-odds/probability) model karne ko kehte hain; phir us probability ko threshold karke class decision lete hain, isiliye classification ke liye use hota hai.',
            },
          },
        ],
      },
      {
        title: 'Decision Trees',
        difficulty: 'medium',
        tags: ['decision-tree', 'algorithm'],
        explanation: {
          english:
            'A decision tree splits data with a series of yes/no questions on features, forming a tree whose leaves give a prediction. At each node it picks the split that best separates the classes (using Gini impurity or information gain/entropy). Trees are highly interpretable and need little preprocessing, but a deep tree easily overfits — control it with max depth, min samples per leaf, or pruning.',
          hinglish:
            'Decision tree data ko features pe yes/no questions ki series se split karta hai, ek tree banake jiske leaves prediction dete hain. Har node pe wo split chunta hai jo classes ko best separate kare (Gini impurity ya information gain/entropy se). Trees bahut interpretable hain aur kam preprocessing chahiye, par deep tree aasaani se overfit ho jaata hai — ise max depth, min samples per leaf, ya pruning se control karo.',
        },
        dailyLifeExample:
          'Decision tree ek doctor ke flowchart jaisa hai — "bukhar hai? haan -> khaansi hai? haan -> ...". Har sawaal options ko kam karta jaata hai jab tak diagnosis na mile.',
        codeExample:
          'from sklearn.tree import DecisionTreeClassifier\nclf = DecisionTreeClassifier(max_depth=4).fit(X_train, y_train)\n# Splits chosen by Gini / information gain.\n# Shallow tree -> less overfitting.',
        keyPoints: [
          'Series of yes/no splits -> leaf prediction',
          'Splits chosen by Gini / information gain',
          'Interpretable; little preprocessing needed',
          'Deep trees overfit — limit depth / prune',
        ],
        quiz: [
          {
            question: 'Decision trees choose splits using…',
            options: ['random guesses', 'Gini impurity / information gain', 'gradient descent', 'k-means'],
            correctIndex: 1,
          },
          {
            question: 'A very deep decision tree tends to…',
            options: ['underfit', 'overfit', 'run forever', 'lose features'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Random Forests & Ensembles',
        difficulty: 'hard',
        tags: ['ensemble', 'random-forest'],
        explanation: {
          english:
            'A random forest trains many decision trees on random subsets of data and features, then averages (regression) or votes (classification). This ensemble reduces the overfitting of a single tree and usually gives strong accuracy with little tuning. It is an example of bagging. Boosting (e.g. gradient boosting, XGBoost) is another ensemble that builds trees sequentially, each correcting the previous one — often top performers on tabular data.',
          hinglish:
            'Random forest bahut decision trees ko data aur features ke random subsets pe train karta hai, phir average (regression) ya vote (classification) karta hai. Ye ensemble ek single tree ke overfitting ko kam karta hai aur aksar kam tuning mein strong accuracy deta hai. Ye bagging ka example hai. Boosting (jaise gradient boosting, XGBoost) ek aur ensemble hai jo trees sequentially banata hai, har ek pichhle ko correct karta — tabular data pe aksar top performers.',
        },
        dailyLifeExample:
          'Random forest "ek expert se nahi, panel se raay lena" jaisa hai — bahut trees ki majority vote ek tree se zyada reliable hoti hai (wisdom of the crowd).',
        codeExample:
          'from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier(n_estimators=200).fit(X_train, y_train)\n# Many trees on random data/feature subsets -> vote/average.\n# Bagging reduces variance vs a single tree.',
        keyPoints: [
          'Many trees on random subsets -> vote/average',
          'Reduces single-tree overfitting (bagging)',
          'Strong accuracy with little tuning',
          'Boosting (XGBoost) builds trees sequentially',
        ],
        quiz: [
          {
            question: 'A random forest combines predictions by…',
            options: ['picking one tree', 'voting/averaging across many trees', 'sorting', 'clustering'],
            correctIndex: 1,
          },
          {
            question: 'Random forests primarily reduce a single tree\'s…',
            options: ['interpretability', 'overfitting (variance)', 'training data', 'features'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'K-Nearest Neighbors (KNN)',
        difficulty: 'medium',
        tags: ['knn', 'algorithm'],
        explanation: {
          english:
            'KNN is a simple, "lazy" algorithm: to classify a new point, it finds the k closest training points (by distance) and takes their majority label (or average for regression). There is no real training — all work happens at prediction time, which is slow for large datasets. It needs feature scaling (distance is sensitive to scale) and a good choice of k (small k = noisy, large k = too smooth).',
          hinglish:
            'KNN ek simple, "lazy" algorithm hai: ek naya point classify karne ke liye, wo k closest training points (distance se) dhoondhta hai aur unka majority label leta hai (ya regression ke liye average). Koi real training nahi — saara kaam prediction time pe hota hai, jo bade datasets pe slow hai. Ise feature scaling chahiye (distance scale-sensitive hai) aur k ka achha choice (chhota k = noisy, bada k = too smooth).',
        },
        dailyLifeExample:
          'KNN "apne aas-paas wale logon jaisa ban" jaisa hai — naye mohalle mein tum apne 5 nearest padosi (k=5) ki tarah categorise ho jaate ho.',
        codeExample:
          'from sklearn.neighbors import KNeighborsClassifier\nclf = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)\n# No real training; prediction = majority vote of 5 nearest.\n# MUST scale features (distance is scale-sensitive).',
        keyPoints: [
          'Predict by majority of k nearest points',
          'Lazy: work happens at prediction time (slow at scale)',
          'Requires feature scaling',
          'k too small = noisy; too large = oversmoothed',
        ],
        quiz: [
          {
            question: 'KNN classifies a point using…',
            options: ['a trained equation', 'the majority label of its k nearest neighbours', 'random choice', 'a decision tree'],
            correctIndex: 1,
          },
          {
            question: 'KNN especially requires…',
            options: ['feature scaling', 'no data', 'a GPU', 'labels-free data'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Support Vector Machines (SVM)',
        difficulty: 'hard',
        tags: ['svm', 'algorithm'],
        explanation: {
          english:
            'An SVM finds the decision boundary (hyperplane) that maximises the margin — the gap between the boundary and the nearest points of each class (the support vectors). A wide margin generalises better. For non-linear data, the kernel trick maps features into a higher dimension where they become separable (RBF/polynomial kernels) without computing that space explicitly. SVMs are powerful on small-to-medium, high-dimensional datasets.',
          hinglish:
            'SVM wo decision boundary (hyperplane) dhoondhta hai jo margin maximise kare — boundary aur har class ke nearest points (support vectors) ke beech ka gap. Wide margin better generalise karta hai. Non-linear data ke liye, kernel trick features ko higher dimension mein map karta hai jahan wo separable ban jaate hain (RBF/polynomial kernels) bina us space ko explicitly compute kiye. SVMs small-to-medium, high-dimensional datasets pe powerful hain.',
        },
        dailyLifeExample:
          'SVM do groups ke beech sabse chaudi (widest) sadak banane jaisa hai — dono taraf maximum jagah chhod kar, taaki naye points confidently sahi side girein.',
        codeExample:
          'from sklearn.svm import SVC\nclf = SVC(kernel="rbf", C=1.0).fit(X_train, y_train)\n# Maximises the margin between classes.\n# Kernel trick handles non-linear boundaries.',
        keyPoints: [
          'Maximises the margin between classes',
          'Support vectors = nearest boundary points',
          'Kernel trick handles non-linear data',
          'Strong on small/medium high-dimensional data',
        ],
        quiz: [
          {
            question: 'An SVM tries to maximise the…',
            options: ['number of trees', 'margin between classes', 'learning rate', 'cluster count'],
            correctIndex: 1,
          },
          {
            question: 'The kernel trick lets an SVM handle…',
            options: ['missing data', 'non-linear boundaries', 'text only', 'huge datasets fastest'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Naive Bayes',
        difficulty: 'medium',
        tags: ['naive-bayes', 'algorithm'],
        explanation: {
          english:
            'Naive Bayes is a probabilistic classifier based on Bayes’ theorem with a "naive" assumption that features are independent given the class. Despite this simplification, it works remarkably well for text (spam filtering, sentiment) and is extremely fast and scalable. It estimates the probability of each class given the features and picks the highest. Variants: Multinomial (counts), Bernoulli (binary), Gaussian (continuous).',
          hinglish:
            'Naive Bayes ek probabilistic classifier hai jo Bayes’ theorem pe based hai ek "naive" assumption ke saath ki features class ke given independent hain. Is simplification ke bawajood, ye text (spam filtering, sentiment) ke liye bahut achha kaam karta hai aur extremely fast aur scalable hai. Ye features ke given har class ki probability estimate karke highest chunta hai. Variants: Multinomial (counts), Bernoulli (binary), Gaussian (continuous).',
        },
        dailyLifeExample:
          'Spam filter har shabd ki "spam-ness" alag-alag jod kar faisla karta hai — bhale shabd ek doosre se related hon, wo "naive" maan leta hai ki independent hain, aur phir bhi achha chalta hai.',
        codeExample:
          'from sklearn.naive_bayes import MultinomialNB\nclf = MultinomialNB().fit(X_train, y_train)  # great for text\n# P(class | features) via Bayes theorem;\n# assumes features are independent given the class.',
        keyPoints: [
          'Based on Bayes theorem',
          '"Naive" = assumes feature independence',
          'Fast, scalable; excellent for text',
          'Variants: Multinomial, Bernoulli, Gaussian',
        ],
        quiz: [
          {
            question: 'The "naive" assumption in Naive Bayes is that features are…',
            options: ['continuous', 'independent given the class', 'sorted', 'scaled'],
            correctIndex: 1,
          },
          {
            question: 'Naive Bayes is especially popular for…',
            options: ['image generation', 'text classification (spam, sentiment)', 'clustering', 'regression'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Unsupervised Learning',
    level: 'intermediate',
    description: 'Clustering aur dimensionality reduction.',
    concepts: [
      {
        title: 'K-Means Clustering',
        difficulty: 'medium',
        tags: ['clustering', 'kmeans'],
        explanation: {
          english:
            'K-Means groups unlabelled data into k clusters. It places k centroids, assigns each point to the nearest centroid, moves each centroid to the mean of its points, and repeats until stable. You must choose k in advance (the elbow method or silhouette score helps). It assumes roughly spherical, similarly-sized clusters and is sensitive to scaling and initial centroids (k-means++ helps).',
          hinglish:
            'K-Means unlabelled data ko k clusters mein group karta hai. Ye k centroids rakhta hai, har point ko nearest centroid pe assign karta hai, har centroid ko uske points ke mean pe move karta hai, aur stable hone tak repeat karta hai. k pehle se chunna padta hai (elbow method ya silhouette score madad karte hain). Ye roughly spherical, similar-size clusters maan leta hai aur scaling aur initial centroids ke prati sensitive hai (k-means++ madad karta hai).',
        },
        dailyLifeExample:
          'K-Means bina labels ke customers ko "behaviour ke hisaab se 3 groups" mein baant ne jaisa hai — har group ka ek center (typical customer) ban jaata hai.',
        codeExample:
          'from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=3, n_init="auto").fit(X)\nkm.labels_      # cluster assignment per point\nkm.cluster_centers_  # the k centroids\n# Choose k with the elbow method / silhouette score.',
        keyPoints: [
          'Groups data into k clusters (no labels)',
          'Assign to nearest centroid, recompute, repeat',
          'Choose k (elbow method / silhouette)',
          'Sensitive to scaling & initial centroids',
        ],
        quiz: [
          {
            question: 'In K-Means, you must choose…',
            options: ['the labels', 'the number of clusters k', 'the tree depth', 'the learning rate'],
            correctIndex: 1,
          },
          {
            question: 'A centroid is…',
            options: ['a labelled point', 'the mean (center) of a cluster', 'an outlier', 'a feature'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Dimensionality Reduction (PCA)',
        difficulty: 'hard',
        tags: ['pca', 'dimensionality-reduction'],
        explanation: {
          english:
            'Principal Component Analysis (PCA) compresses many correlated features into a few new features (principal components) that capture the most variance, while losing as little information as possible. It helps fight the "curse of dimensionality", speeds up models, removes redundancy, and enables 2D/3D visualisation of high-dimensional data. The components are ordered by how much variance they explain; you keep the top few.',
          hinglish:
            'Principal Component Analysis (PCA) bahut correlated features ko kuch naye features (principal components) mein compress karta hai jo sabse zyada variance capture karein, jitni kam ho sake utni information khoke. Ye "curse of dimensionality" se ladta hai, models tez karta hai, redundancy hataata hai, aur high-dimensional data ka 2D/3D visualisation possible karta hai. Components variance explain karne ke order mein hote hain; top kuch rakhte ho.',
        },
        dailyLifeExample:
          'PCA ek lambi report ka short summary banane jaisa hai — kam pages (features) mein zyadatar important baat (variance) rakh lena, detail thodi kho ke par kaam aasaan.',
        codeExample:
          'from sklearn.decomposition import PCA\npca = PCA(n_components=2)         # compress to 2 dims\nX_2d = pca.fit_transform(X_scaled)\npca.explained_variance_ratio_     # variance kept per component\n# Useful for speed-up and 2D visualisation.',
        keyPoints: [
          'Compress many features into fewer components',
          'Keep components with the most variance',
          'Fights the curse of dimensionality; speeds models',
          'Enables 2D/3D visualisation; scale features first',
        ],
        quiz: [
          {
            question: 'PCA reduces dimensions while keeping the most…',
            options: ['rows', 'variance/information', 'labels', 'clusters'],
            correctIndex: 1,
          },
          {
            question: 'PCA is a form of…',
            options: ['supervised classification', 'unsupervised dimensionality reduction', 'reinforcement learning', 'data collection'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Training & Evaluation',
    level: 'intermediate',
    description: 'Gradient descent, regularization aur metrics.',
    concepts: [
      {
        title: 'Gradient Descent & Loss Functions',
        difficulty: 'hard',
        tags: ['optimization', 'gradient-descent'],
        explanation: {
          english:
            'A loss function measures how wrong the model is (e.g. MSE for regression, cross-entropy for classification). Gradient descent is the optimiser that minimises it: compute the gradient (slope) of the loss with respect to the weights, then step the weights in the opposite direction, repeating until the loss stops improving. The learning rate controls step size — too high overshoots/diverges, too low is painfully slow. Variants: batch, stochastic (SGD), and mini-batch.',
          hinglish:
            'Loss function batata hai model kitna galat hai (jaise regression ke liye MSE, classification ke liye cross-entropy). Gradient descent wo optimiser hai jo use minimise karta hai: loss ka weights ke respect gradient (slope) nikaalo, phir weights ko ulti direction mein step karo, loss improve hona ruk ne tak repeat. Learning rate step size control karta hai — bahut high overshoot/diverge, bahut low painfully slow. Variants: batch, stochastic (SGD), aur mini-batch.',
        },
        dailyLifeExample:
          'Gradient descent dhund mein pahaad se neeche utarne jaisa hai — har kadam sabse dhalaan wali (steepest) direction mein neeche, jab tak valley (minimum loss) na mile. Bade kadam (high learning rate) fisla sakte hain.',
        codeExample:
          '# One gradient descent step (conceptual)\n# loss      = mean_squared_error(y, model(X))\n# gradient  = d(loss)/d(weights)\n# weights  -= learning_rate * gradient   # step downhill\n# repeat until loss stops decreasing\n#\n# learning_rate too high -> diverge; too low -> slow',
        keyPoints: [
          'Loss measures wrongness (MSE, cross-entropy)',
          'Gradient descent steps weights downhill',
          'Learning rate = step size (tune carefully)',
          'Batch / SGD / mini-batch variants',
        ],
        quiz: [
          {
            question: 'Gradient descent updates weights in the direction that…',
            options: ['increases the loss', 'decreases the loss (opposite the gradient)', 'is random', 'adds features'],
            correctIndex: 1,
          },
          {
            question: 'A learning rate that is too high can cause the model to…',
            options: ['train perfectly', 'overshoot/diverge', 'use less data', 'overfit only'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is gradient descent and what role does the learning rate play?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Gradient descent is an iterative optimisation algorithm that minimises a loss function by repeatedly moving the model’s parameters in the direction opposite to the gradient of the loss (downhill). The learning rate is the step size of each update: too large and it overshoots the minimum or diverges; too small and convergence is very slow. In practice we use stochastic or mini-batch gradient descent (updating on subsets) for speed, often with adaptive optimisers like Adam that adjust the effective step size per parameter.',
              hinglish:
                'Gradient descent ek iterative optimisation algorithm hai jo loss function ko minimise karta hai — baar-baar model ke parameters ko loss ke gradient ke opposite (downhill) move karke. Learning rate har update ka step size hai: bahut bada to minimum overshoot ya diverge, bahut chhota to convergence bahut slow. Practice mein speed ke liye stochastic ya mini-batch gradient descent (subsets pe update) use karte hain, aksar Adam jaise adaptive optimisers ke saath jo per-parameter effective step size adjust karte hain.',
            },
          },
        ],
      },
      {
        title: 'Bias-Variance Tradeoff & Regularization',
        difficulty: 'hard',
        tags: ['bias-variance', 'regularization', 'overfitting'],
        explanation: {
          english:
            'Total error splits into bias (error from an over-simple model that underfits) and variance (error from an over-complex model that overfits to noise). Lowering one often raises the other — the bias-variance tradeoff. Regularization adds a penalty for large weights to curb variance: L2 (Ridge) shrinks weights, L1 (Lasso) can zero some out (feature selection). Other tools: more data, simpler models, dropout, and early stopping.',
          hinglish:
            'Total error do hisson mein baant ta hai: bias (over-simple model ka error jo underfit kare) aur variance (over-complex model ka error jo noise pe overfit kare). Ek kam karne se aksar doosra badhta hai — yahi bias-variance tradeoff hai. Regularization bade weights pe penalty laga kar variance kam karta hai: L2 (Ridge) weights shrink karta hai, L1 (Lasso) kuch ko zero kar deta hai (feature selection). Doosre tools: zyada data, simpler models, dropout, aur early stopping.',
        },
        dailyLifeExample:
          'High bias = ek student jo bahut moti samajh rakhta hai (sab kuch over-simplify). High variance = ek student jo har detail ratt leta hai par naye sawaal pe fail. Achha student beech mein (balanced) hota hai.',
        codeExample:
          'from sklearn.linear_model import Ridge, Lasso\nRidge(alpha=1.0).fit(X_train, y_train)  # L2: shrink weights\nLasso(alpha=0.1).fit(X_train, y_train)  # L1: zero out some\n# Higher alpha = stronger regularization = less variance.',
        keyPoints: [
          'Bias = underfit; Variance = overfit',
          'Lowering one often raises the other (tradeoff)',
          'L2 (Ridge) shrinks weights; L1 (Lasso) zeros some',
          'Also: more data, dropout, early stopping',
        ],
        quiz: [
          {
            question: 'High variance usually means the model is…',
            options: ['underfitting', 'overfitting', 'too simple', 'unbiased'],
            correctIndex: 1,
          },
          {
            question: 'Which regularization can set some weights to exactly zero?',
            options: ['L2 (Ridge)', 'L1 (Lasso)', 'dropout', 'none'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Hyperparameter Tuning: Grid Search & Random Search',
        difficulty: 'hard',
        tags: ['hyperparameters', 'grid-search', 'tuning'],
        explanation: {
          english:
            "Hyperparameters are settings YOU choose before training (like KNN's k, a tree's max depth, or regularization strength) — different from the model's learned parameters (weights). Grid Search tries EVERY combination from a predefined set of values for each hyperparameter (exhaustive but expensive — the combinations multiply fast). Random Search instead samples random combinations, which is often nearly as good but far cheaper when you have many hyperparameters, since not every hyperparameter matters equally. Both are always evaluated using cross-validation on the training/validation data — NEVER on the test set, which stays untouched until final evaluation to avoid data leakage.",
          hinglish:
            "Hyperparameters wo settings hain jo TUM training se pehle choose karte ho (jaise KNN ka k, ek tree ki max depth, ya regularization strength) — model ke seekhe hue parameters (weights) se alag. Grid Search har hyperparameter ke liye predefined values ke set se HAR combination try karta hai (exhaustive par expensive — combinations tezi se badhte hain). Random Search iske bajaye random combinations sample karta hai, jo aksar lagbhag utna hi achha hota hai par bahut sasta jab bahut saare hyperparameters hon, kyunki har hyperparameter equally matter nahi karta. Dono ko hamesha training/validation data pe cross-validation se evaluate kiya jaata hai — test set pe KABHI NAHI, jo final evaluation tak untouched rehta hai data leakage se bachne ke liye.",
        },
        dailyLifeExample:
          "Grid Search ek restaurant menu ke HAR combination try karna hai — har starter, main, dessert ka pairing chakh ke best combo dhoondhna (thorough par slow). Random Search random combos try karna hai — utna thorough nahi, par tezi se ek achhi combo mil jaati hai bina sab kuch chakhe.",
        codeExample:
          "from sklearn.model_selection import GridSearchCV, RandomizedSearchCV\nfrom sklearn.neighbors import KNeighborsClassifier\n\nparam_grid = {\n    'n_neighbors': [3, 5, 7, 9, 11],\n    'weights': ['uniform', 'distance'],\n}\n\n# Grid Search: tries ALL 5 x 2 = 10 combinations, with 5-fold CV each\ngrid = GridSearchCV(KNeighborsClassifier(), param_grid, cv=5)\ngrid.fit(X_train, y_train)  # test set NOT used here\nprint(grid.best_params_)    # the winning combination\n\n# Random Search: samples a fixed number of random combinations instead\nrandom_search = RandomizedSearchCV(\n    KNeighborsClassifier(), param_grid, n_iter=5, cv=5\n)\nrandom_search.fit(X_train, y_train)\n\n# Only AFTER tuning is done, evaluate ONCE on the held-out test set\n# grid.best_estimator_.score(X_test, y_test)",
        keyPoints: [
          'Hyperparameters are chosen before training (k, max depth, learning rate); parameters are learned during training (weights)',
          'Grid Search: exhaustively tries every combination — thorough but can be very slow',
          'Random Search: samples random combinations — often nearly as good, much cheaper',
          'Both use cross-validation on train/validation data, never the test set',
          'The test set stays untouched until the very end, after tuning is finished',
        ],
        quiz: [
          {
            question: "What is the key difference between a model's hyperparameters and its parameters?",
            options: ['They are the same thing', 'Hyperparameters are chosen by you before training; parameters (like weights) are learned automatically during training', 'Parameters are chosen before training', 'Hyperparameters only apply to neural networks'],
            correctIndex: 1,
          },
          {
            question: 'Why might Random Search be preferred over Grid Search with many hyperparameters?',
            options: ['Random Search always finds the best result', 'It samples combinations instead of trying every single one, which is much cheaper while often nearly as effective', 'Grid Search does not work with more than one hyperparameter', 'Random Search does not need cross-validation'],
            correctIndex: 1,
          },
          {
            question: 'When should the test set be used during hyperparameter tuning?',
            options: ['Continuously, to check progress', 'Never during tuning — only ONCE at the very end, after tuning is fully complete', 'Only for Grid Search, not Random Search', 'At the start, before training'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Evaluation Metrics',
        difficulty: 'medium',
        tags: ['metrics', 'evaluation'],
        explanation: {
          english:
            'Pick metrics that match the task. Regression: MAE, MSE/RMSE, and R². Classification: accuracy (misleading on imbalanced data), precision (of predicted positives, how many were right), recall (of actual positives, how many were caught), F1 (their balance), and ROC-AUC. The confusion matrix (TP/FP/TN/FN) underlies classification metrics. For imbalanced problems, prefer precision/recall/F1 over raw accuracy.',
          hinglish:
            'Task se match karne wale metrics chuno. Regression: MAE, MSE/RMSE, aur R². Classification: accuracy (imbalanced data pe misleading), precision (predicted positives mein se kitne sahi), recall (actual positives mein se kitne pakde), F1 (inka balance), aur ROC-AUC. Confusion matrix (TP/FP/TN/FN) classification metrics ke peeche hai. Imbalanced problems ke liye raw accuracy se precision/recall/F1 prefer karo.',
        },
        dailyLifeExample:
          'Cancer test: recall = "saare asli patients pakde ya chhoot gaye?" (miss karna khatarnak). Precision = "jise positive bola wo sach mein tha?" Dono ka balance F1.',
        codeExample:
          'from sklearn.metrics import classification_report, confusion_matrix\nprint(confusion_matrix(y_test, preds))     # TP/FP/TN/FN\nprint(classification_report(y_test, preds))# precision/recall/F1\n# Regression: mean_absolute_error, r2_score',
        keyPoints: [
          'Regression: MAE, RMSE, R²',
          'Classification: precision, recall, F1, ROC-AUC',
          'Accuracy misleads on imbalanced data',
          'Confusion matrix underlies classification metrics',
        ],
        quiz: [
          {
            question: 'For a rare-disease detector, the most critical metric is often…',
            options: ['accuracy', 'recall (catch all true cases)', 'R²', 'RMSE'],
            correctIndex: 1,
          },
          {
            question: 'F1 score is the balance between…',
            options: ['bias and variance', 'precision and recall', 'MAE and MSE', 'train and test'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Deep Learning',
    level: 'advanced',
    description: 'Neural networks, backprop, CNNs, RNNs aur transformers.',
    concepts: [
      {
        title: 'Neural Networks & the Perceptron',
        difficulty: 'hard',
        tags: ['neural-network', 'perceptron', 'deep-learning'],
        explanation: {
          english:
            'A neural network is built from neurons: each computes a weighted sum of its inputs, adds a bias, and passes it through an activation function. A single neuron (perceptron) can only learn linear boundaries; stacking neurons into layers (input → hidden → output) lets the network learn complex, non-linear patterns. "Deep" learning just means many hidden layers. The network learns by adjusting all the weights to minimise a loss.',
          hinglish:
            'Neural network neurons se bana hota hai: har ek apne inputs ka weighted sum nikaalta hai, bias add karta hai, aur use activation function se pass karta hai. Ek single neuron (perceptron) sirf linear boundaries seekh sakta hai; neurons ko layers (input → hidden → output) mein stack karne se network complex, non-linear patterns seekhta hai. "Deep" learning ka matlab bas bahut hidden layers. Network saare weights adjust karke loss minimise karta hai.',
        },
        dailyLifeExample:
          'Ek neuron ek chhote decision-maker jaisa hai jo kuch signals ko weigh karke "fire" karta hai. Bahut neurons ki layers milke ek team banti hai jo billi vs kutta jaisa complex faisla le sakti hai.',
        codeExample:
          '# One neuron: output = activation( w·x + b )\n#\n# A network stacks layers:\n#   input -> hidden layer(s) -> output\n# Each connection has a weight; training adjusts them all.\n#\n# (Keras) a small network:\n# model = Sequential([Dense(16, activation="relu"),\n#                     Dense(1, activation="sigmoid")])',
        keyPoints: [
          'Neuron: weighted sum + bias -> activation',
          'A single perceptron learns only linear boundaries',
          'Hidden layers enable non-linear patterns',
          '"Deep" = many hidden layers',
        ],
        quiz: [
          {
            question: 'A single perceptron can only learn boundaries that are…',
            options: ['non-linear', 'linear', 'circular', 'random'],
            correctIndex: 1,
          },
          {
            question: 'What makes a network "deep"?',
            options: ['big data', 'many hidden layers', 'a GPU', 'high accuracy'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Backpropagation & Activation Functions',
        difficulty: 'hard',
        tags: ['backpropagation', 'activation', 'deep-learning'],
        explanation: {
          english:
            'Activation functions add non-linearity so networks can model complex relationships — ReLU (fast, default for hidden layers), sigmoid (0–1, output probabilities), tanh, and softmax (multiclass output). Backpropagation is how networks learn: after a forward pass computes the loss, it applies the chain rule backward through the layers to compute each weight’s gradient, then gradient descent updates the weights. Without non-linear activations, stacked layers would collapse into a single linear function.',
          hinglish:
            'Activation functions non-linearity add karte hain taaki networks complex relationships model kar sakein — ReLU (fast, hidden layers ka default), sigmoid (0–1, output probabilities), tanh, aur softmax (multiclass output). Backpropagation se networks seekhte hain: forward pass loss compute karta hai, phir chain rule ko layers ke through backward apply karke har weight ka gradient nikalta hai, phir gradient descent weights update karta hai. Non-linear activations ke bina, stacked layers ek single linear function mein collapse ho jaate.',
        },
        dailyLifeExample:
          'Backpropagation team ke kaam ke baad "blame/credit" ko peeche tak baant ne jaisa hai — har neuron ko pata chal jaata hai usne error mein kitna contribute kiya, taaki wo apne aap ko thoda sudhaar le.',
        codeExample:
          '# Activations\n# ReLU:    max(0, x)        -> hidden layers (default)\n# sigmoid: 1/(1+e^-x)      -> binary output (0..1)\n# softmax:                  -> multiclass probabilities\n#\n# Backprop: forward -> loss -> chain rule backward\n#           -> gradients -> gradient descent updates weights',
        keyPoints: [
          'Activations add non-linearity (ReLU/sigmoid/softmax)',
          'Without them, deep layers collapse to linear',
          'Backprop = chain rule backward to get gradients',
          'Then gradient descent updates the weights',
        ],
        quiz: [
          {
            question: 'The default activation for hidden layers is usually…',
            options: ['sigmoid', 'ReLU', 'softmax', 'none'],
            correctIndex: 1,
          },
          {
            question: 'Backpropagation computes gradients using the…',
            options: ['k-means algorithm', 'chain rule', 'confusion matrix', 'elbow method'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why do neural networks need non-linear activation functions?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Each layer computes a linear transform (weighted sum + bias). If you stack linear transforms without non-linearities, the whole network is mathematically equivalent to a single linear layer — it cannot model curves or complex patterns no matter how deep it is. Non-linear activations (ReLU, sigmoid, tanh) break this, letting the network approximate arbitrarily complex functions (the universal approximation idea). ReLU is the common default because it is cheap and avoids the vanishing-gradient problem better than sigmoid/tanh.',
              hinglish:
                'Har layer ek linear transform (weighted sum + bias) compute karti hai. Agar tum linear transforms ko bina non-linearities ke stack karo, poora network mathematically ek single linear layer ke barabar hai — chahe kitna bhi deep ho, curves ya complex patterns model nahi kar sakta. Non-linear activations (ReLU, sigmoid, tanh) ise todte hain, network ko arbitrarily complex functions approximate karne dete hain (universal approximation idea). ReLU common default hai kyunki ye sasta hai aur sigmoid/tanh se vanishing-gradient problem better avoid karta hai.',
            },
          },
        ],
      },
      {
        title: 'Convolutional Neural Networks (CNNs)',
        difficulty: 'hard',
        tags: ['cnn', 'computer-vision'],
        explanation: {
          english:
            'CNNs are the workhorse for images. Convolutional layers slide small filters (kernels) across the image to detect local patterns — edges, then textures, then shapes — sharing weights so they are efficient and translation-invariant. Pooling layers downsample to reduce size and add robustness. Early layers learn simple features, deeper layers combine them into high-level concepts. CNNs power image classification, detection, and segmentation.',
          hinglish:
            'CNNs images ke liye workhorse hain. Convolutional layers chhote filters (kernels) ko image pe slide karke local patterns detect karti hain — edges, phir textures, phir shapes — weights share karke, isliye efficient aur translation-invariant. Pooling layers downsample karke size kam aur robustness add karti hain. Early layers simple features seekhti hain, deeper layers unhe high-level concepts mein combine karti hain. CNNs image classification, detection, aur segmentation chalati hain.',
        },
        dailyLifeExample:
          'CNN ek artist ki tarah pehle simple lines (edges) pehchanta hai, phir unse shapes, phir poora chehra — chhote tukdo se badi tasveer samajhna.',
        codeExample:
          '# CNN building blocks (Keras-style)\n# Conv2D  -> detect local patterns with sliding filters\n# Pooling -> downsample (smaller, more robust)\n# stack: Conv -> Pool -> Conv -> Pool -> Flatten -> Dense\n#\n# Early layers: edges; deeper layers: shapes/objects.',
        keyPoints: [
          'Convolution: sliding filters detect local patterns',
          'Weight sharing -> efficient, translation-invariant',
          'Pooling downsamples for robustness',
          'Early layers = edges; deep layers = objects',
        ],
        quiz: [
          {
            question: 'CNNs are primarily designed for…',
            options: ['text only', 'images / spatial data', 'tabular data', 'audio only'],
            correctIndex: 1,
          },
          {
            question: 'A convolution layer works by…',
            options: ['sorting pixels', 'sliding small filters to detect local patterns', 'clustering', 'removing layers'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'RNNs & Sequence Models',
        difficulty: 'hard',
        tags: ['rnn', 'lstm', 'sequence'],
        explanation: {
          english:
            'Recurrent Neural Networks process sequences (text, time series, speech) one step at a time, carrying a hidden state that acts as memory of what came before. Plain RNNs struggle with long-range dependencies due to vanishing gradients; LSTM and GRU add gates that control what to remember and forget, handling longer sequences. RNNs were the standard for language tasks before Transformers largely replaced them.',
          hinglish:
            'Recurrent Neural Networks sequences (text, time series, speech) ko ek-ek step process karte hain, ek hidden state carry karke jo pehle aaye ka memory hota hai. Plain RNNs vanishing gradients ki wajah se long-range dependencies pe struggle karte hain; LSTM aur GRU gates add karte hain jo control karte hain kya yaad rakhna aur bhoolna hai, lambe sequences handle karke. RNNs language tasks ke liye standard the, jab tak Transformers ne unhe zyadatar replace nahi kar diya.',
        },
        dailyLifeExample:
          'RNN ek kahani padhte hue pichhli lines yaad rakhne jaisa hai — agla shabd samajhne ke liye context (memory) chahiye. LSTM ke gates decide karte hain kya yaad rakhna hai aur kya bhoolna.',
        codeExample:
          '# RNN processes a sequence step by step:\n# h_t = f(W·x_t + U·h_{t-1})   # hidden state = memory\n#\n# Plain RNN: vanishing gradients on long sequences\n# LSTM / GRU: gates control remember/forget -> longer memory\n# Used for text, time series, speech (pre-Transformer era).',
        keyPoints: [
          'Process sequences step by step with a hidden state',
          'Hidden state = memory of earlier steps',
          'Plain RNNs struggle with long-range (vanishing gradients)',
          'LSTM/GRU gates handle longer sequences',
        ],
        quiz: [
          {
            question: 'RNNs are designed for…',
            options: ['images', 'sequential data (text, time series)', 'tabular data', 'clustering'],
            correctIndex: 1,
          },
          {
            question: 'LSTMs improve on plain RNNs by adding…',
            options: ['convolutions', 'gates to control memory', 'more pixels', 'clustering'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Transformers & Attention',
        difficulty: 'hard',
        tags: ['transformer', 'attention', 'deep-learning'],
        explanation: {
          english:
            'Transformers replaced RNNs for most language tasks and power modern LLMs. Their key idea is self-attention: every token looks at every other token and weighs how relevant each is, capturing long-range relationships in parallel (unlike RNNs’ sequential processing). This parallelism makes them fast to train on huge data and great at context. The architecture (multi-head attention + feed-forward layers, stacked) underlies BERT, GPT, and Claude.',
          hinglish:
            'Transformers ne zyadatar language tasks ke liye RNNs ko replace kar diya aur modern LLMs chalate hain. Inka key idea self-attention hai: har token har doosre token ko dekhta hai aur weigh karta hai ki kaunsa kitna relevant hai, long-range relationships ko parallel mein capture karke (RNNs ke sequential processing ke ulat). Ye parallelism unhe huge data pe train karne mein fast aur context mein great banata hai. Architecture (multi-head attention + feed-forward layers, stacked) BERT, GPT, aur Claude ke peeche hai.',
        },
        dailyLifeExample:
          'Attention ek meeting mein har shabd pe "ye kis se related hai" dhyan dene jaisa hai — "wo" kis cheez ko refer karta hai, ye sentence ke baaki words ko dekh kar decide hota hai.',
        codeExample:
          '# Self-attention (intuition)\n# For each token, compute relevance (weights) to all tokens,\n# then mix their values weighted by relevance.\n#\n# Transformer = multi-head attention + feed-forward, stacked.\n# Parallel (not step-by-step) -> fast on huge data.\n# Powers BERT, GPT, Claude.',
        keyPoints: [
          'Self-attention: every token weighs every other token',
          'Captures long-range context in parallel',
          'Faster to train than sequential RNNs',
          'Foundation of modern LLMs (BERT, GPT, Claude)',
        ],
        quiz: [
          {
            question: 'The key mechanism in a Transformer is…',
            options: ['convolution', 'self-attention', 'pooling', 'recurrence'],
            correctIndex: 1,
          },
          {
            question: 'A major advantage of Transformers over RNNs is…',
            options: ['they process tokens in parallel', 'they need no data', 'they only work on images', 'they are smaller'],
            correctIndex: 0,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why did Transformers replace RNNs for most NLP tasks?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'RNNs process tokens sequentially, which is slow and makes it hard to capture long-range dependencies (information has to survive many steps, and gradients vanish). Transformers use self-attention, where every token directly attends to every other token in one step — capturing long-range context regardless of distance — and this is highly parallelisable, so they train far faster on large datasets and GPUs. Combined with scale, this is why Transformers (BERT, GPT, Claude) dominate modern NLP.',
              hinglish:
                'RNNs tokens ko sequentially process karte hain, jo slow hai aur long-range dependencies capture karna mushkil banata hai (information ko bahut steps survive karni padti hai, aur gradients vanish ho jaate hain). Transformers self-attention use karte hain, jahan har token ek step mein har doosre token ko directly attend karta hai — distance chahe jo ho long-range context capture karke — aur ye highly parallelisable hai, isliye large datasets aur GPUs pe kaafi fast train hote hain. Scale ke saath, isiliye Transformers (BERT, GPT, Claude) modern NLP pe dominate karte hain.',
            },
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between overfitting and underfitting, and how do you address each?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Underfitting (high bias) is when a model is too simple to capture the underlying pattern — both training and test scores are poor; fix it with a more complex model, better features, or less regularization. Overfitting (high variance) is when a model memorises the training data including noise — great training score but poor test score; fix it with more data, a simpler model, regularization (L1/L2), dropout, early stopping, and cross-validation. The goal is the sweet spot that generalises to unseen data.',
      hinglish:
        'Underfitting (high bias) tab hai jab model itna simple ho ki underlying pattern hi capture na kare — training aur test dono scores kharab; fix: zyada complex model, better features, ya kam regularization. Overfitting (high variance) tab jab model training data noise samet ratt le — great training score par poor test; fix: zyada data, simpler model, regularization (L1/L2), dropout, early stopping, aur cross-validation. Goal wo sweet spot hai jo unseen data pe generalise kare.',
    },
  },
  {
    question: 'How would you choose which ML algorithm to use for a problem?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Start from the problem type and data. Is it supervised (labels) or unsupervised? Regression or classification? Then consider data size and dimensionality, interpretability needs, training/inference speed, and whether the data is tabular, text, or images. Practical heuristics: logistic/linear regression as an interpretable baseline; tree ensembles (Random Forest, XGBoost) often win on tabular data; KNN/SVM for small datasets; CNNs for images; Transformers for text/sequences. Always validate empirically with cross-validation rather than trusting one choice — "no free lunch": no single algorithm is best for everything.',
      hinglish:
        'Problem type aur data se shuru karo. Supervised (labels) ya unsupervised? Regression ya classification? Phir data size aur dimensionality, interpretability ki zaroorat, training/inference speed, aur data tabular/text/images hai ya nahi consider karo. Practical heuristics: interpretable baseline ke liye logistic/linear regression; tabular data pe aksar tree ensembles (Random Forest, XGBoost) jeet te hain; chhote datasets pe KNN/SVM; images ke liye CNNs; text/sequences ke liye Transformers. Hamesha cross-validation se empirically validate karo, ek choice pe bharosa mat karo — "no free lunch": koi ek algorithm har cheez ke liye best nahi.',
    },
  },

  // ─── Core ML Concepts ────────────────────────────────────────
  {
    question: 'What is the bias-variance tradeoff?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'BIAS is error from wrong assumptions — a model too simple to capture the pattern, which underfits and performs poorly on both training and test data. VARIANCE is sensitivity to the particular training sample — a model so flexible it memorises noise, which overfits and performs well on training but badly on test. Total error decomposes into bias² plus variance plus irreducible noise. Reducing one usually raises the other, so the goal is the sweet spot, found empirically with a validation set.',
      hinglish:
        'BIAS galat assumptions se aane wali error hai — ek model itna simple ki pattern pakad na sake, jo underfit karta hai aur training aur test dono pe kharab karta hai. VARIANCE khaas training sample ke prati sensitivity hai — ek model itna flexible ki noise ratt le, jo overfit karta hai aur training pe achha par test pe kharab karta hai. Total error bias² plus variance plus irreducible noise mein bant-ti hai. Ek kam karna usually doosra badhata hai, isliye lakshya wo sweet spot hai, jo ek validation set se empirically milta hai.',
    },
  },
  {
    question: 'What is overfitting and how do you prevent it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Overfitting is when a model learns noise and quirks specific to the training data instead of the underlying pattern, so training accuracy keeps rising while validation accuracy stalls or falls. Prevention: get more data or augment it, simplify the model, apply regularisation (L1, L2, dropout), use early stopping on a validation set, and cross-validate. The single most reliable signal is a widening gap between training and validation performance.',
      hinglish:
        'Overfitting tab hai jab ek model underlying pattern ke bajaye training data ka khaas noise aur quirks seekh le, isliye training accuracy badhti rehti hai jabki validation accuracy ruk jaati ya girti hai. Prevention: zyada data lao ya augment karo, model simple karo, regularisation lagao (L1, L2, dropout), ek validation set pe early stopping use karo, aur cross-validate karo. Sabse reliable signal training aur validation performance ke beech chaudta gap hai.',
    },
  },
  {
    question: 'What is regularisation and how do L1 and L2 differ?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Regularisation adds a penalty on model complexity to the loss, discouraging the large weights that let a model fit noise. L2 (ridge) penalises squared weights, shrinking them all smoothly towards zero without eliminating any — good when many features contribute a little. L1 (lasso) penalises absolute values and drives some weights exactly to ZERO, so it performs feature selection. Elastic Net combines both. The strength is a hyperparameter tuned on validation data.',
      hinglish:
        'Regularisation loss mein model complexity pe ek penalty jodta hai, un bade weights ko rokte hue jo ek model ko noise fit karne dete hain. L2 (ridge) squared weights pe penalty lagata hai, sabko smoothly zero ki taraf sikodta hai bina kisi ko khatam kiye — tab achha jab bahut features thoda-thoda contribute karein. L1 (lasso) absolute values pe penalty lagata hai aur kuch weights ko bilkul ZERO kar deta hai, isliye ye feature selection karta hai. Elastic Net dono jodta hai. Strength ek hyperparameter hai jo validation data pe tune hota hai.',
    },
  },
  {
    question: 'What is cross-validation and why is a single train-test split not enough?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'K-fold cross-validation splits data into k parts, trains on k-1 and validates on the remaining one, rotating through all k and averaging. A single split gives one estimate that depends heavily on which rows happened to land in the test set — with a small dataset that variance is large enough to mislead you about which model is better. Use STRATIFIED folds for imbalanced classes, and time-series splits when order matters, since random folds leak the future.',
      hinglish:
        'K-fold cross-validation data ko k hisson mein baantta hai, k-1 pe train aur bache ek pe validate karta hai, saare k ghumate hue aur average karte hue. Ek single split ek estimate deta hai jo bahut is pe depend karta hai ki kaunsi rows test set mein pahunchi — ek chhote dataset pe wo variance itna bada hota hai ki tumhe galat bata de ki kaunsa model behtar hai. Imbalanced classes ke liye STRATIFIED folds use karo, aur jab order matter kare tab time-series splits, kyunki random folds bhavishya leak karte hain.',
    },
  },
  {
    question: 'Why is accuracy a poor metric for imbalanced data?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'If 99% of transactions are legitimate, a model predicting "not fraud" every time scores 99% accuracy while catching zero fraud — the metric rewards ignoring the class you actually care about. Use PRECISION (of those flagged, how many were real), RECALL (of the real cases, how many were caught), F1 for their balance, and PR-AUC, which is more informative than ROC-AUC under heavy imbalance. Which one you optimise depends on whether a false positive or a false negative costs more.',
      hinglish:
        'Agar 99% transactions legitimate hain, har baar "fraud nahi" predict karne wala ek model 99% accuracy paata hai jabki zero fraud pakadta hai — metric us class ko ignore karne ka inaam deta hai jiski tumhe actually parwah hai. PRECISION (jinhe flag kiya, unme kitne asli the), RECALL (asli cases mein se kitne pakde), unke balance ke liye F1, aur PR-AUC use karo, jo bhaari imbalance mein ROC-AUC se zyada informative hai. Tum kise optimise karte ho ye is pe depend karta hai ki ek false positive ya ek false negative kiska cost zyada hai.',
    },
  },
  {
    question: 'What is the difference between precision and recall?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PRECISION is TP/(TP+FP) — of everything the model flagged positive, what fraction really was. RECALL is TP/(TP+FN) — of all the real positives, what fraction the model found. They trade off: lowering the decision threshold catches more positives (higher recall) but flags more false alarms (lower precision). Spam filtering wants high precision, because a lost real email is worse than a spam that slips through; cancer screening wants high recall.',
      hinglish:
        'PRECISION TP/(TP+FP) hai — model ne jo bhi positive flag kiya, usme se kitna hissa sach mein tha. RECALL TP/(TP+FN) hai — saare asli positives mein se model ne kitna hissa dhoondha. Wo trade off karte hain: decision threshold girana zyada positives pakadta hai (zyada recall) par zyada false alarms flag karta hai (kam precision). Spam filtering ko high precision chahiye, kyunki ek khoya asli email ek nikal gaye spam se bura hai; cancer screening ko high recall chahiye.',
    },
  },
  {
    question: 'What is the ROC curve and AUC?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The ROC curve plots true positive rate against false positive rate as the decision threshold sweeps from 0 to 1. AUC, the area under it, is the probability the model ranks a random positive above a random negative — 0.5 is random guessing, 1.0 is perfect. Its strength is being threshold-independent. Its weakness is that under heavy class imbalance it looks optimistic, because false positive rate has a huge denominator, so PR-AUC is the better choice there.',
      hinglish:
        'ROC curve true positive rate ko false positive rate ke against plot karta hai jab decision threshold 0 se 1 tak jhaadu maare. AUC, uske neeche ka area, wo probability hai ki model ek random positive ko ek random negative se upar rank kare — 0.5 random andaaza hai, 1.0 perfect. Iski taakat threshold-independent hona hai. Iski kamzori ye hai ki bhaari class imbalance mein ye optimistic dikhta hai, kyunki false positive rate ka denominator bahut bada hai, isliye wahan PR-AUC behtar choice hai.',
    },
  },
  {
    question: 'What is gradient descent and what are its variants?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Gradient descent minimises loss by repeatedly stepping in the direction of steepest descent, scaled by a learning rate. BATCH uses all data per step — stable but slow. STOCHASTIC uses one sample — fast and noisy, and the noise can help escape shallow minima. MINI-BATCH uses 32-256 samples and is the practical standard, balancing stability with GPU efficiency. Adaptive optimisers such as Adam adjust a per-parameter learning rate using running estimates of gradient moments.',
      hinglish:
        'Gradient descent loss ko baar-baar sabse tez dhalaan ki disha mein kadam rakh kar kam karta hai, ek learning rate se scale karke. BATCH per step saara data use karta hai — stable par slow. STOCHASTIC ek sample use karta hai — fast aur noisy, aur wo noise shallow minima se nikalne mein madad kar sakta hai. MINI-BATCH 32-256 samples use karta hai aur practical standard hai, stability ko GPU efficiency ke saath balance karte hue. Adam jaise adaptive optimisers gradient moments ke running estimates se per-parameter learning rate adjust karte hain.',
    },
  },
  {
    question: 'What happens if the learning rate is too high or too low?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'TOO HIGH and updates overshoot the minimum: loss oscillates, spikes, or diverges to NaN. TOO LOW and training crawls, may stall in a poor region, and wastes enormous compute. Practical approach: use a learning-rate finder or start around 1e-3 for Adam, then apply a SCHEDULE — warmup followed by cosine or step decay — so early steps are large enough to explore and later steps small enough to converge. It is the single most impactful hyperparameter.',
      hinglish:
        'BAHUT ZYADA hone pe updates minimum se aage nikal jaate hain: loss jhoolti hai, uchhalti hai, ya NaN tak bhatak jaati hai. BAHUT KAM hone pe training rengti hai, ek kharab region mein atak sakti hai, aur bahut saara compute barbaad karti hai. Practical approach: ek learning-rate finder use karo ya Adam ke liye lagbhag 1e-3 se shuru karo, phir ek SCHEDULE lagao — warmup ke baad cosine ya step decay — taaki shuruaati steps explore karne ke liye kaafi bade hon aur baad ke converge karne ke liye kaafi chhote. Ye sabse zyada asar daalne wala hyperparameter hai.',
    },
  },
  {
    question: 'What is the difference between parameters and hyperparameters?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'PARAMETERS are learned from data during training — the weights and biases the optimiser updates. HYPERPARAMETERS are set BEFORE training and control how learning happens: learning rate, number of layers, regularisation strength, batch size, tree depth. Parameters are found by gradient descent; hyperparameters are found by search — grid, random, or Bayesian — evaluated on a validation set, never on the test set, or your final estimate becomes optimistic.',
      hinglish:
        'PARAMETERS training ke dauraan data se seekhe jaate hain — wo weights aur biases jinhe optimiser update karta hai. HYPERPARAMETERS training se PEHLE set hote hain aur control karte hain ki seekhna kaise ho: learning rate, layers ki sankhya, regularisation strength, batch size, tree depth. Parameters gradient descent se milte hain; hyperparameters search se — grid, random, ya Bayesian — jo ek validation set pe evaluate hote hain, kabhi test set pe nahi, warna tumhara final estimate optimistic ho jaata hai.',
    },
  },
  {
    question: 'What is feature engineering and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Feature engineering creates informative inputs from raw data — extracting day-of-week from a timestamp, computing a ratio, aggregating a user\'s past behaviour, binning a skewed variable. On tabular problems it typically moves the metric more than swapping algorithms does, because a good feature encodes domain knowledge the model cannot infer from the raw columns. Deep learning reduces the need for it on images and text, but on tabular data it remains decisive.',
      hinglish:
        'Feature engineering raw data se informative inputs banati hai — ek timestamp se day-of-week nikalna, ek ratio compute karna, ek user ka pichhla behaviour aggregate karna, ek skewed variable ko bin karna. Tabular problems pe ye typically algorithms badalne se zyada metric hilati hai, kyunki ek achha feature wo domain knowledge encode karta hai jo model raw columns se nahi nikal sakta. Deep learning images aur text pe iski zaroorat kam karta hai, par tabular data pe ye nirnaayak rehti hai.',
    },
  },
  {
    question: 'What is data leakage and how do you avoid it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Leakage is when information unavailable at prediction time reaches the model during training, producing brilliant validation scores that collapse in production. Classic causes: fitting a scaler or imputer on the FULL dataset before splitting, including a feature computed from the target, using future data in a time-series split, or duplicate rows spanning both sets. Prevention: split first, fit every transformation inside a pipeline on the training fold only, and question any feature that seems too predictive.',
      hinglish:
        'Leakage tab hai jab prediction ke waqt unavailable jaankaari training ke dauraan model tak pahunch jaaye, aise shandaar validation scores banate hue jo production mein dhah jaate hain. Classic causes: split se pehle POORE dataset pe ek scaler ya imputer fit karna, target se compute kiya ek feature include karna, ek time-series split mein future data use karna, ya dono sets mein failay duplicate rows. Prevention: pehle split karo, har transformation ko ek pipeline ke andar sirf training fold pe fit karo, aur kisi bhi bahut predictive lagte feature pe sawaal karo.',
    },
  },
  {
    question: 'How do you handle missing data?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'First ask WHY it is missing, since that determines what is valid. Missing at random can be imputed with mean, median, or a model-based method; missing not at random carries information, so adding an "is_missing" indicator often helps more than any imputation. Dropping rows is fine when few and random, dangerous when the missingness correlates with the target. Critically, fit the imputer on the training fold only — computing a mean over the full dataset is leakage.',
      hinglish:
        'Pehle poochho ki wo KYUN missing hai, kyunki wahi decide karta hai ki kya valid hai. Random se missing ko mean, median, ya ek model-based method se impute kiya ja sakta hai; jo random se missing nahi wo jaankaari rakhta hai, isliye ek "is_missing" indicator jodna aksar kisi bhi imputation se zyada madad karta hai. Rows girana tab theek hai jab kam aur random hon, khatarnak jab missingness target se correlate kare. Critically, imputer ko sirf training fold pe fit karo — poore dataset pe ek mean compute karna leakage hai.',
    },
  },
  {
    question: 'What is the curse of dimensionality?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'As dimensions grow, the volume of the space explodes, so any fixed number of samples becomes sparse and every point ends up roughly equidistant from every other. That breaks distance-based methods such as KNN and clustering, makes overfitting easier since there are more ways to separate points spuriously, and means the data needed grows exponentially. Remedies: feature selection, dimensionality reduction such as PCA, regularisation, and using domain knowledge to keep only meaningful features.',
      hinglish:
        'Dimensions badhne pe space ka volume phat jaata hai, isliye samples ki koi bhi fixed sankhya sparse ho jaati hai aur har point har doosre se lagbhag barabar doori pe pahunch jaata hai. Ye KNN aur clustering jaise distance-based methods ko todta hai, overfitting aasaan banata hai kyunki points ko jhoothe tareeke se alag karne ke zyada raaste hain, aur matlab hai ki zaroori data exponentially badhta hai. Ilaaj: feature selection, PCA jaisi dimensionality reduction, regularisation, aur sirf meaningful features rakhne ke liye domain knowledge.',
    },
  },
  {
    question: 'What is PCA and when should you use it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PCA finds orthogonal directions of maximum variance and projects data onto the top few, reducing dimensions while retaining most of the variation. Use it to compress correlated features, speed up training, remove multicollinearity, or visualise high-dimensional data in 2D. Caveats: it requires SCALED features or large-magnitude ones dominate, the resulting components are linear combinations and therefore not interpretable, and it is unsupervised, so it may discard a low-variance direction that predicts the target well.',
      hinglish:
        'PCA maximum variance ki orthogonal directions dhoondhta hai aur data ko upar ki kuch pe project karta hai, dimensions kam karte hue jabki zyadatar variation rakhte hue. Ise correlated features compress karne, training tez karne, multicollinearity hataane, ya high-dimensional data ko 2D mein dekhne ke liye use karo. Caveats: ise SCALED features chahiye warna badi magnitude wale haavi ho jaate hain, banne wale components linear combinations hain aur isliye interpretable nahi, aur ye unsupervised hai, isliye ye ek low-variance direction gira sakta hai jo target achha predict karti ho.',
    },
  },
  {
    question: 'What is the difference between bagging and boosting?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'BAGGING trains many models INDEPENDENTLY on bootstrap samples and averages them, which reduces VARIANCE — Random Forest is the canonical example, and it parallelises trivially. BOOSTING trains models SEQUENTIALLY, each correcting the previous one\'s errors, which reduces BIAS — XGBoost and LightGBM are the standard implementations and usually win on tabular data. Boosting typically achieves higher accuracy but overfits more easily and cannot be parallelised across trees.',
      hinglish:
        'BAGGING bahut models ko bootstrap samples pe SWATANTR roop se train karke unka average leta hai, jo VARIANCE kam karta hai — Random Forest canonical example hai, aur ye aasaani se parallel hota hai. BOOSTING models ko KRAMANUSAAR train karta hai, har ek pichhle ki errors sudhaarte hue, jo BIAS kam karta hai — XGBoost aur LightGBM standard implementations hain aur usually tabular data pe jeette hain. Boosting typically zyada accuracy paata hai par asaani se overfit karta hai aur trees ke across parallel nahi ho sakta.',
    },
  },
  {
    question: 'Why do gradient boosted trees usually beat neural networks on tabular data?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Tabular data has heterogeneous features with no spatial or sequential structure for a network to exploit, often with skewed distributions and many irrelevant columns. Tree ensembles handle mixed types natively, are invariant to monotonic feature scaling, capture non-linear thresholds and interactions directly, and need far less tuning and data. Neural networks excel where structure exists — images, text, audio — which is exactly what tabular data lacks.',
      hinglish:
        'Tabular data mein heterogeneous features hote hain bina kisi spatial ya sequential structure ke jise ek network use kar sake, aksar skewed distributions aur bahut irrelevant columns ke saath. Tree ensembles mixed types natively handle karte hain, monotonic feature scaling ke prati invariant hain, non-linear thresholds aur interactions seedha pakadte hain, aur bahut kam tuning aur data chahte hain. Neural networks wahan excel karte hain jahan structure ho — images, text, audio — jo theek wahi hai jo tabular data mein nahi hai.',
    },
  },
  {
    question: 'What is the difference between supervised, unsupervised, and reinforcement learning?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'SUPERVISED learning has labelled examples and learns a mapping from input to output — classification and regression. UNSUPERVISED learning has no labels and finds structure — clustering, dimensionality reduction, anomaly detection. REINFORCEMENT learning has an agent taking actions in an environment and learning from delayed REWARDS rather than labelled answers. Self-supervised learning sits between: labels are generated from the data itself, which is how modern language models are pretrained.',
      hinglish:
        'SUPERVISED learning mein labelled examples hote hain aur ye input se output ka ek mapping seekhta hai — classification aur regression. UNSUPERVISED learning mein labels nahi hote aur ye structure dhoondhta hai — clustering, dimensionality reduction, anomaly detection. REINFORCEMENT learning mein ek agent ek environment mein actions leta hai aur labelled jawabon ke bajaye der se milne wale REWARDS se seekhta hai. Self-supervised learning beech mein baithta hai: labels data se hi generate hote hain, jisse modern language models pretrain hote hain.',
    },
  },
  {
    question: 'What is the difference between a training, validation, and test set?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The TRAINING set fits the model parameters. The VALIDATION set tunes hyperparameters and selects between models. The TEST set is touched ONCE, at the very end, to estimate real-world performance. The reason for three is that any set you make decisions on becomes optimistically biased — if you tune against the test set, you have effectively trained on it, and its estimate is no longer honest. A typical split is 60/20/20, or cross-validation plus a held-out test set.',
      hinglish:
        'TRAINING set model parameters fit karta hai. VALIDATION set hyperparameters tune karta hai aur models ke beech chunta hai. TEST set EK BAAR chhua jaata hai, bilkul aakhir mein, real-world performance ka andaaza lagane ke liye. Teen hone ki wajah ye hai ki jis bhi set pe tum decisions lete ho wo optimistically biased ho jaata hai — agar tum test set ke against tune karte ho, tumne effectively us pe train kar liya, aur uska estimate ab imaandaar nahi. Ek typical split 60/20/20 hai, ya cross-validation plus ek held-out test set.',
    },
  },
  {
    question: 'How do you handle class imbalance?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Options at three levels. DATA: oversample the minority (SMOTE synthesises new points rather than duplicating), or undersample the majority. ALGORITHM: use class weights so minority errors cost more, which most libraries support directly. EVALUATION: use precision, recall, F1, and PR-AUC rather than accuracy, and tune the decision THRESHOLD instead of accepting 0.5. Threshold tuning is often the cheapest effective fix and is frequently overlooked.',
      hinglish:
        'Teen levels pe options. DATA: minority ko oversample karo (SMOTE duplicate karne ke bajaye naye points banata hai), ya majority ko undersample karo. ALGORITHM: class weights use karo taaki minority errors zyada cost karein, jo zyadatar libraries seedha support karti hain. EVALUATION: accuracy ke bajaye precision, recall, F1, aur PR-AUC use karo, aur 0.5 maanne ke bajaye decision THRESHOLD tune karo. Threshold tuning aksar sabse sasta effective fix hai aur baar-baar chhoot jaata hai.',
    },
  },
  {
    question: 'What is the difference between a decision tree and a random forest?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A single decision tree splits data on feature thresholds and is highly interpretable, but it is unstable — a small change in data can produce a completely different tree — and it overfits readily. A RANDOM FOREST trains many trees on bootstrap samples with a random subset of features considered at each split, then averages them. The randomness decorrelates the trees, so averaging cancels much of their individual variance, at the cost of interpretability.',
      hinglish:
        'Ek single decision tree data ko feature thresholds pe split karta hai aur bahut interpretable hai, par ye unstable hai — data mein ek chhota change ek bilkul alag tree bana sakta hai — aur ye aasaani se overfit karta hai. Ek RANDOM FOREST bahut trees ko bootstrap samples pe train karta hai, har split pe features ka ek random subset dekhte hue, phir unka average leta hai. Randomness trees ko decorrelate karti hai, isliye averaging unki individual variance ka bahut hissa kaat deta hai, interpretability ke cost pe.',
    },
  },
  {
    question: 'What is the difference between logistic and linear regression?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'LINEAR regression predicts a continuous value and minimises squared error. LOGISTIC regression predicts a PROBABILITY for a binary outcome: it passes the linear combination through a sigmoid to squash it into (0,1) and minimises log loss. Despite the name it is a classifier. Using linear regression for classification fails because it produces values outside [0,1] and its squared-error loss is a poor fit for a probability, giving a non-convex optimisation.',
      hinglish:
        'LINEAR regression ek continuous value predict karta hai aur squared error kam karta hai. LOGISTIC regression ek binary outcome ke liye ek PROBABILITY predict karta hai: ye linear combination ko ek sigmoid se guzaar kar (0,1) mein daba deta hai aur log loss kam karta hai. Naam ke bawajood ye ek classifier hai. Classification ke liye linear regression use karna fail hota hai kyunki ye [0,1] ke bahar values banata hai aur uska squared-error loss ek probability ke liye kharab fit hai, ek non-convex optimisation dete hue.',
    },
  },
  {
    question: 'What is a confusion matrix?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A table cross-tabulating predicted against actual classes, giving true positives, false positives, true negatives, and false negatives. Every classification metric is derived from these four numbers. Its practical value is showing WHICH errors the model makes — a model with 90% accuracy might be failing entirely on one class, which a single accuracy figure completely hides. For multi-class problems it reveals exactly which pairs of classes are being confused.',
      hinglish:
        'Ek table jo predicted ko actual classes ke against cross-tabulate karta hai, true positives, false positives, true negatives, aur false negatives deta hua. Har classification metric in chaar numbers se nikalta hai. Iski practical value ye dikhana hai ki model KAUNSI errors karta hai — 90% accuracy wala ek model ek class pe poori tarah fail ho sakta hai, jise ek akela accuracy figure poori tarah chhupa deta hai. Multi-class problems ke liye ye theek dikhata hai ki kaunse class pairs confuse ho rahe hain.',
    },
  },
  {
    question: 'What is the difference between generative and discriminative models?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A DISCRIMINATIVE model learns the boundary between classes directly, modelling P(y|x) — logistic regression, SVMs, most neural classifiers. A GENERATIVE model learns how the data itself is distributed, P(x|y) and P(x), so it can also generate new samples — Naive Bayes, GANs, diffusion models, language models. Discriminative models usually classify better with enough data; generative models can work with less labelled data and support sampling and density estimation.',
      hinglish:
        'Ek DISCRIMINATIVE model classes ke beech ki seema seedha seekhta hai, P(y|x) model karte hue — logistic regression, SVMs, zyadatar neural classifiers. Ek GENERATIVE model seekhta hai ki data khud kaise distributed hai, P(x|y) aur P(x), isliye wo naye samples bhi bana sakta hai — Naive Bayes, GANs, diffusion models, language models. Discriminative models kaafi data ke saath usually behtar classify karte hain; generative models kam labelled data se kaam kar sakte hain aur sampling aur density estimation support karte hain.',
    },
  },
  {
    question: 'What is k-means clustering and what are its limitations?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'K-means partitions data into k clusters by alternately assigning each point to its nearest centroid and recomputing centroids until stable. Limitations: you must choose k in advance (use the elbow method or silhouette score), it assumes roughly spherical, similarly sized clusters, it is sensitive to initialisation — hence k-means++ — and to outliers, and it requires scaled features. For irregular shapes or unknown cluster counts, DBSCAN or hierarchical clustering fit better.',
      hinglish:
        'K-means data ko k clusters mein baantta hai, baari-baari har point ko uske sabse paas ke centroid pe assign karke aur centroids dobara compute karke jab tak sthir na ho. Limitations: tumhe k pehle chunna padta hai (elbow method ya silhouette score use karo), ye lagbhag gol, ek jaise size ke clusters maanta hai, ye initialisation ke prati sensitive hai — isiliye k-means++ — aur outliers ke prati, aur ise scaled features chahiye. Tedhe shapes ya anjaan cluster counts ke liye, DBSCAN ya hierarchical clustering behtar fit hain.',
    },
  },
  {
    question: 'What is transfer learning?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Transfer learning reuses a model trained on a large general dataset as the starting point for a related task, so you inherit learned representations rather than starting from random weights. With a small dataset you FREEZE most layers and train only the head; with more data you fine-tune the whole network at a low learning rate. It is why practitioners can get strong results from a few thousand images, and it is the foundation of the entire pretrained-model ecosystem.',
      hinglish:
        'Transfer learning ek bade general dataset pe train hue model ko ek related task ke liye shuruaat ki tarah dobara use karta hai, isliye tum random weights se shuru karne ke bajaye seekhe hue representations paate ho. Ek chhote dataset ke saath tum zyadatar layers FREEZE karke sirf head train karte ho; zyada data ke saath tum poore network ko ek kam learning rate pe fine-tune karte ho. Isiliye practitioners kuch hazaar images se strong results paa sakte hain, aur yahi poore pretrained-model ecosystem ki neev hai.',
    },
  },
  {
    question: 'What is the difference between fine-tuning and prompting for an LLM?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PROMPTING changes only the input, so it needs no training, is instant to iterate on, and adapts per request — but it consumes context and cannot teach genuinely new behaviour. FINE-TUNING updates weights on task examples, which produces consistent formatting, encodes domain style, and reduces prompt length — but it requires curated data, compute, and versioning. Practical order: prompt engineering first, then RAG for knowledge, then fine-tuning only when the first two are demonstrably insufficient.',
      hinglish:
        'PROMPTING sirf input badalta hai, isliye ise koi training nahi chahiye, iterate karna instant hai, aur ye per request adapt hota hai — par ye context khaata hai aur genuinely naya behaviour nahi sikha sakta. FINE-TUNING task examples pe weights update karta hai, jo consistent formatting banata hai, domain style encode karta hai, aur prompt length kam karta hai — par ise curated data, compute, aur versioning chahiye. Practical order: pehle prompt engineering, phir knowledge ke liye RAG, phir fine-tuning sirf tab jab pehle do saaf taur pe kaafi na hon.',
    },
  },
  {
    question: 'What is an embedding?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An embedding maps a discrete item — a word, sentence, image, or product — to a dense vector where SEMANTIC similarity corresponds to geometric closeness, so "king" sits near "queen". Unlike one-hot encoding, dimensions are learned and shared, so the model generalises across similar items. Embeddings power semantic search, recommendation, clustering, and RAG retrieval, and are typically compared with cosine similarity in a vector database.',
      hinglish:
        'Ek embedding ek discrete item — ek word, sentence, image, ya product — ko ek dense vector pe map karta hai jahan SEMANTIC similarity geometric nazdeeki se milti hai, isliye "king" "queen" ke paas baithta hai. One-hot encoding ke ulat, dimensions seekhe aur share hote hain, isliye model similar items ke across generalise karta hai. Embeddings semantic search, recommendation, clustering, aur RAG retrieval chalate hain, aur typically ek vector database mein cosine similarity se compare hote hain.',
    },
  },
  {
    question: 'What is model drift and how do you detect it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'DATA DRIFT is when the input distribution shifts — new user demographics, a changed upstream pipeline. CONCEPT DRIFT is when the relationship between inputs and target changes, so the same input should now yield a different answer. Detection: monitor input feature distributions with a statistical test such as KS or PSI, track prediction distributions, and watch live metrics against delayed ground truth. The response is retraining on recent data, ideally automated on a schedule or a drift alert.',
      hinglish:
        'DATA DRIFT tab hai jab input distribution khisak jaaye — naye user demographics, ek badla hua upstream pipeline. CONCEPT DRIFT tab hai jab inputs aur target ka rishta badle, isliye wahi input ab ek alag jawab dena chahiye. Detection: input feature distributions ko KS ya PSI jaise ek statistical test se monitor karo, prediction distributions track karo, aur live metrics ko der se aati ground truth ke against dekho. Jawab recent data pe retraining hai, ideally ek schedule ya ek drift alert pe automated.',
    },
  },
  {
    question: 'How do you deploy a machine learning model?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Serialise the model along with the full preprocessing pipeline, so training and serving apply identical transformations — a mismatch here is the most common production bug. Wrap it in an API, containerise it, and version model, data, and code together so any prediction can be traced. Roll out with shadow traffic or a canary before full release, and monitor latency, error rate, input distributions, and prediction distributions. Batch scoring is simpler than real-time serving when latency permits.',
      hinglish:
        'Model ko poore preprocessing pipeline ke saath serialise karo, taaki training aur serving ek jaise transformations lagayein — yahan ka mismatch sabse common production bug hai. Use ek API mein wrap karo, containerise karo, aur model, data, aur code ko saath version karo taaki koi bhi prediction trace ho sake. Poore release se pehle shadow traffic ya ek canary se roll out karo, aur latency, error rate, input distributions, aur prediction distributions monitor karo. Jab latency ijaazat de to batch scoring real-time serving se simpler hai.',
    },
  },
  {
    question: 'What is SHAP and why is model interpretability important?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'SHAP assigns each feature a contribution to a specific prediction using Shapley values from cooperative game theory, giving both local explanations for one case and global feature importance. Interpretability matters for debugging (a feature dominating unexpectedly usually indicates leakage), for regulated domains such as credit and healthcare where explanation is a legal requirement, for detecting bias, and for earning the trust of the people expected to act on the output.',
      hinglish:
        'SHAP har feature ko ek khaas prediction mein ek contribution deta hai, cooperative game theory ke Shapley values se, ek case ke liye local explanations aur global feature importance dono dete hue. Interpretability debugging ke liye matter karti hai (ek feature ka anaapekshit roop se haavi hona usually leakage batata hai), credit aur healthcare jaise regulated domains ke liye jahan explanation ek kanooni zaroorat hai, bias pakadne ke liye, aur un logon ka bharosa kamane ke liye jinse output pe kaam karne ki ummeed hai.',
    },
  },
  {
    question: 'What is the difference between batch and online learning?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'BATCH learning trains on the full dataset at once and is redeployed periodically — simple, reproducible, and the right default for most systems. ONLINE learning updates incrementally as each example arrives, adapting quickly to change and handling data too large to hold in memory. Its costs are real: it is much harder to debug and reproduce, and it can be poisoned by bad or adversarial data, since a bad batch immediately degrades the live model.',
      hinglish:
        'BATCH learning poore dataset pe ek baar train karta hai aur samay-samay pe dobara deploy hota hai — simple, reproducible, aur zyadatar systems ke liye sahi default. ONLINE learning har example aane pe incrementally update karta hai, badlav ke saath jaldi adapt karte hue aur itna bada data handle karte hue jo memory mein na aa sake. Iske costs asli hain: ise debug aur reproduce karna bahut mushkil hai, aur ise kharab ya adversarial data se zeher diya ja sakta hai, kyunki ek kharab batch turant live model bigaad deta hai.',
    },
  },
  {
    question: 'What is A/B testing for machine learning models?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Route a fraction of live traffic to the new model and the rest to the current one, then compare BUSINESS metrics — conversion, revenue, retention — not just offline accuracy, because a model that scores better offline frequently does not improve the outcome that matters. Randomise assignment, run long enough for statistical significance, and pick the metric before you start. Shadow mode, where the new model predicts without affecting users, is a useful safety step first.',
      hinglish:
        'Live traffic ka ek hissa naye model pe aur baaki current pe bhejo, phir BUSINESS metrics compare karo — conversion, revenue, retention — sirf offline accuracy nahi, kyunki offline behtar score karne wala model aksar us nateeje ko behtar nahi karta jo matter karta hai. Assignment randomise karo, statistical significance ke liye kaafi lamba chalao, aur metric shuru karne se pehle chuno. Shadow mode, jahan naya model bina users ko affect kiye predict karta hai, pehle ek useful safety step hai.',
    },
  },
  {
    question: 'What is the difference between AI, machine learning, and deep learning?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'They are nested. AI is the broadest field: any system performing tasks that appear to require intelligence, including rule-based expert systems with no learning at all. MACHINE LEARNING is the subset that learns patterns from data rather than following hand-written rules. DEEP LEARNING is the subset of ML using multi-layer neural networks, which excel when data is abundant and unstructured — images, audio, text — and where features are best learned rather than engineered.',
      hinglish:
        'Wo ek doosre ke andar hain. AI sabse chaudi field hai: koi bhi system jo aise kaam kare jo intelligence maangte lagein, including bina kisi learning ke rule-based expert systems. MACHINE LEARNING wo subset hai jo haath se likhe rules follow karne ke bajaye data se patterns seekhta hai. DEEP LEARNING ML ka wo subset hai jo multi-layer neural networks use karta hai, jo tab excel karte hain jab data bharpoor aur unstructured ho — images, audio, text — aur jahan features engineer karne ke bajaye seekhna behtar ho.',
    },
  },
  {
    question: 'What is an activation function and why is it needed?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An activation function introduces NON-LINEARITY between layers. Without it, stacking layers is pointless — a composition of linear maps is itself just one linear map, so a hundred-layer network would have exactly the expressive power of a single layer. ReLU is the standard hidden-layer choice for being cheap and avoiding saturation; sigmoid outputs a probability for binary classification; softmax normalises to a distribution for multi-class. Variants such as GELU are common in transformers.',
      hinglish:
        'Ek activation function layers ke beech NON-LINEARITY laata hai. Iske bina, layers stack karna bekaar hai — linear maps ka ek composition khud bas ek linear map hai, isliye ek sau-layer network ki expressive power theek ek single layer jitni hoti. ReLU standard hidden-layer choice hai kyunki ye sasta hai aur saturation se bachta hai; sigmoid binary classification ke liye ek probability deta hai; softmax multi-class ke liye ek distribution mein normalise karta hai. GELU jaise variants transformers mein common hain.',
    },
  },
  {
    question: 'What is dropout?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Dropout randomly deactivates a fraction of neurons during each training step, so the network cannot rely on any single unit and must learn redundant, distributed representations. It is effectively training an ensemble of subnetworks that share weights. It applies only during TRAINING — at inference all neurons are active with activations scaled appropriately, which is why forgetting to call `model.eval()` in PyTorch produces mysteriously inconsistent predictions.',
      hinglish:
        'Dropout har training step ke dauraan neurons ka ek hissa randomly band kar deta hai, isliye network kisi ek unit pe bharosa nahi kar sakta aur use redundant, distributed representations seekhne padte hain. Ye effectively weights share karte subnetworks ka ek ensemble train karna hai. Ye sirf TRAINING ke dauraan lagta hai — inference pe saare neurons active hote hain activations theek se scale hokar, isiliye PyTorch mein `model.eval()` call karna bhoolna rahasyamayi roop se inconsistent predictions banata hai.',
    },
  },
  {
    question: 'What is batch normalisation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Batch norm normalises each layer\'s inputs using the mean and variance of the current mini-batch, then rescales with learned parameters. It allows higher learning rates, speeds convergence, and acts as mild regularisation. It depends on batch statistics, so it behaves poorly with very small batches and must switch to running averages at inference. Layer normalisation, which normalises across features rather than the batch, is preferred in transformers for exactly that reason.',
      hinglish:
        'Batch norm har layer ke inputs ko current mini-batch ke mean aur variance se normalise karta hai, phir seekhe hue parameters se dobara scale karta hai. Ye zyada learning rates allow karta hai, convergence tez karta hai, aur halki regularisation ki tarah kaam karta hai. Ye batch statistics pe depend karta hai, isliye bahut chhote batches ke saath kharab behave karta hai aur inference pe running averages pe switch karna padta hai. Layer normalisation, jo batch ke bajaye features ke across normalise karta hai, theek isi wajah se transformers mein prefer kiya jaata hai.',
    },
  },
  {
    question: 'What is the vanishing gradient problem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'In a deep network, backpropagation multiplies gradients layer by layer. If those factors are consistently below one — as with saturated sigmoid or tanh activations — the product shrinks exponentially and early layers receive almost no gradient, so they stop learning. Solutions: ReLU-family activations that do not saturate for positive inputs, residual connections giving gradients a direct path, careful initialisation, and normalisation layers. The opposite failure, exploding gradients, is handled with gradient clipping.',
      hinglish:
        'Ek deep network mein, backpropagation gradients ko layer dar layer multiply karta hai. Agar wo factors lagatar ek se kam hain — jaise saturated sigmoid ya tanh activations ke saath — product exponentially sikudta hai aur shuruaati layers ko almost koi gradient nahi milta, isliye wo seekhna band kar deti hain. Solutions: ReLU-family activations jo positive inputs ke liye saturate nahi hote, residual connections jo gradients ko ek seedha raasta dete hain, dhyaan se initialisation, aur normalisation layers. Ulti failure, exploding gradients, gradient clipping se sambhali jaati hai.',
    },
  },
  {
    question: 'What is a confusion between correlation and causation in ML?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Models learn CORRELATIONS, which is enough for prediction but not for deciding interventions. A model may learn that customers who contact support churn more — but removing support would not reduce churn, because contacting support is a symptom, not a cause. The distinction becomes critical the moment someone uses model output to justify an action. Establishing causation needs experiments or causal inference methods, not a better fit on observational data.',
      hinglish:
        'Models CORRELATIONS seekhte hain, jo prediction ke liye kaafi hai par interventions decide karne ke liye nahi. Ek model seekh sakta hai ki support se sampark karne wale customers zyada churn karte hain — par support hataana churn kam nahi karega, kyunki support se sampark ek lakshan hai, ek karan nahi. Ye farak us pal critical ho jaata hai jab koi ek action justify karne ke liye model output use kare. Causation sthapit karne ke liye experiments ya causal inference methods chahiye, observational data pe ek behtar fit nahi.',
    },
  },
  {
    question: 'How do you detect and reduce bias in a machine learning model?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Detect it by measuring performance SEPARATELY across demographic groups rather than only in aggregate, since an overall metric hides a model that works well for the majority and poorly for a minority. Audit the training data for representation, and check whether proxy features encode a protected attribute — postcode often encodes race. Mitigations: rebalance or augment data, apply fairness constraints during training, adjust thresholds per group, and keep humans in the loop for consequential decisions.',
      hinglish:
        'Ise performance ko demographic groups ke across ALAG-ALAG maap kar pakado, sirf aggregate mein nahi, kyunki ek overall metric ek aise model ko chhupa deta hai jo majority ke liye achha aur ek minority ke liye kharab kaam karta hai. Training data ka representation ke liye audit karo, aur check karo ki proxy features ek protected attribute encode karte hain ya nahi — postcode aksar race encode karta hai. Mitigations: data rebalance ya augment karo, training ke dauraan fairness constraints lagao, per group thresholds adjust karo, aur bade nateeje wale decisions ke liye insaan loop mein rakho.',
    },
  },
  {
    question: 'What is the difference between a loss function and an evaluation metric?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The LOSS is what the optimiser minimises during training, so it must be differentiable and well-behaved — cross-entropy, MSE. The METRIC is what you actually care about and report — accuracy, F1, revenue, click-through rate — and it often is NOT differentiable, so it cannot be optimised directly. That gap is why a model can improve on loss while the metric stagnates, and why you should always track both, selecting models on the metric.',
      hinglish:
        'LOSS wo hai jise optimiser training ke dauraan kam karta hai, isliye use differentiable aur achhe behaviour wala hona chahiye — cross-entropy, MSE. METRIC wo hai jiski tumhe actually parwah hai aur jise tum report karte ho — accuracy, F1, revenue, click-through rate — aur wo aksar differentiable NAHI hota, isliye use seedha optimise nahi kiya ja sakta. Wahi gap wajah hai ki ek model loss pe behtar ho sakta hai jabki metric ruka rahe, aur isiliye tumhe hamesha dono track karne chahiye, models metric pe chunte hue.',
    },
  },
  {
    question: 'What is early stopping?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Early stopping monitors validation loss during training and halts when it stops improving for a set number of epochs (the patience), restoring the best checkpoint. It prevents overfitting without needing to guess the right number of epochs, and saves compute. Two practical points: monitor VALIDATION loss, never training loss, which keeps falling regardless; and set patience high enough that a temporary plateau does not stop a run that would have improved.',
      hinglish:
        'Early stopping training ke dauraan validation loss monitor karta hai aur tab rok deta hai jab wo tay sankhya ke epochs (patience) tak behtar hona band kar de, sabse achha checkpoint wapas laate hue. Ye sahi epochs ka andaaza lagaye bina overfitting rokta hai, aur compute bachata hai. Do practical points: VALIDATION loss monitor karo, kabhi training loss nahi, jo chahe kuch bhi ho girti rehti hai; aur patience itna zyada rakho ki ek asthayi plateau ek aise run ko na roke jo behtar hone wala tha.',
    },
  },
  {
    question: 'What is the difference between epoch, batch, and iteration?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An EPOCH is one complete pass over the training dataset. A BATCH is the group of samples processed before a single weight update. An ITERATION is one such update. So with 10,000 samples and a batch size of 100, one epoch equals 100 iterations. Larger batches give more stable gradients and better GPU utilisation but fewer updates per epoch and sometimes worse generalisation, which is why batch size interacts with learning rate.',
      hinglish:
        'Ek EPOCH training dataset pe ek poora pass hai. Ek BATCH samples ka wo group hai jo ek single weight update se pehle process hota hai. Ek ITERATION ek aisa update hai. Isliye 10,000 samples aur 100 ke batch size ke saath, ek epoch 100 iterations ke barabar hai. Bade batches zyada stable gradients aur behtar GPU utilisation dete hain par per epoch kam updates aur kabhi-kabhi kharab generalisation, isiliye batch size learning rate se interact karta hai.',
    },
  },
  {
    question: 'Why do you need to scale features for some algorithms but not others?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Algorithms that use DISTANCES or gradients are sensitive to scale: KNN, SVM, k-means, PCA, and neural networks all let a feature measured in thousands dominate one measured in fractions. Tree-based models split on thresholds within a single feature at a time, so any monotonic rescaling leaves the splits unchanged and scaling is unnecessary. Standardisation suits roughly normal data; min-max suits bounded ranges; and the scaler must be fitted on training data only.',
      hinglish:
        'Jo algorithms DISTANCES ya gradients use karte hain wo scale ke prati sensitive hain: KNN, SVM, k-means, PCA, aur neural networks sab hazaaron mein maape ek feature ko dashamlav mein maape ek pe haavi hone dete hain. Tree-based models ek baar mein ek hi feature ke andar thresholds pe split karte hain, isliye koi bhi monotonic rescaling splits ko nahi badalti aur scaling gair-zaroori hai. Standardisation lagbhag normal data ko suit karta hai; min-max bounded ranges ko; aur scaler sirf training data pe fit hona chahiye.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
