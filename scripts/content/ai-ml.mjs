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
  icon: '🧠',
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
            frequency: 'very-common',
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
            frequency: 'very-common',
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
    frequency: 'very-common',
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
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
