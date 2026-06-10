// Data Science curriculum — beginner -> intermediate -> advanced.
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
  title: 'Data Science',
  slug: 'data-science',
  description:
    'Data se insights nikalna — lifecycle, data cleaning, EDA, statistics aur machine learning basics. Python ke saath, English + Hinglish, desi examples aur code ke saath.',
  icon: '📊',
  tags: ['data-science', 'machine-learning', 'statistics', 'python', 'analytics'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 17,
};

const beginner = [
  {
    title: 'Data Science Foundations',
    level: 'beginner',
    description: 'Data Science kya hai, lifecycle aur data types.',
    concepts: [
      {
        title: 'What is Data Science',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'Data Science is the practice of extracting insights and predictions from data using statistics, programming, and domain knowledge. It overlaps with but is broader than Machine Learning: it includes collecting, cleaning, exploring, visualising, and communicating data — not just modelling. A data scientist turns messy raw data into decisions, reports, or predictive models.',
          hinglish:
            'Data Science data se insights aur predictions nikalne ki practice hai — statistics, programming, aur domain knowledge se. Ye Machine Learning ke saath overlap karta hai par usse broader hai: isme data collect, clean, explore, visualise, aur communicate karna shaamil hai — sirf modelling nahi. Ek data scientist messy raw data ko decisions, reports, ya predictive models mein badal deta hai.',
        },
        dailyLifeExample:
          'Data Science ek detective jaisa hai — bikhre clues (raw data) se pattern dhoondh kar kahani (insight) banata hai jo decision lene mein madad kare.',
        codeExample:
          '# A data scientist combines:\n# - Statistics (what does the data say?)\n# - Programming (Python, SQL, pandas)\n# - Domain knowledge (what matters to the business?)\n#\n# Workflow: collect -> clean -> explore -> model -> communicate',
        keyPoints: [
          'Extract insights/predictions from data',
          'Stats + programming + domain knowledge',
          'Broader than ML (collect, clean, explore, communicate)',
          'Turns raw data into decisions & models',
        ],
        quiz: [
          {
            question: 'Data Science is…',
            options: ['only building ML models', 'extracting insights from data using stats, code & domain knowledge', 'a database', 'a chart tool'],
            correctIndex: 1,
          },
          {
            question: 'Which is part of the data science workflow?',
            options: ['only modelling', 'collect, clean, explore, model, communicate', 'only visualisation', 'only coding'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'The Data Science Lifecycle',
        difficulty: 'easy',
        tags: ['workflow', 'lifecycle'],
        explanation: {
          english:
            'A typical project follows stages: (1) define the problem/question, (2) collect data, (3) clean & prepare it, (4) explore (EDA) to find patterns, (5) model (build/train), (6) evaluate, and (7) deploy & communicate results. It is iterative — insights often send you back to earlier steps. Surprisingly, cleaning and preparing data usually takes the most time (often ~80%).',
          hinglish:
            'Ek typical project in stages se guzarta hai: (1) problem/question define karo, (2) data collect karo, (3) clean & prepare karo, (4) explore (EDA) karke patterns dhoondho, (5) model (build/train), (6) evaluate, aur (7) deploy & results communicate karo. Ye iterative hai — insights aksar tumhe pichhle steps pe wapas bhejte hain. Surprisingly, data clean aur prepare karna sabse zyada time leta hai (aksar ~80%).',
        },
        dailyLifeExample:
          'Lifecycle khaana banane jaisa hai — recipe decide karo (problem), saamaan lao (collect), dho-kaat (clean), pakao (model), chakho (evaluate), serve karo (deploy). Sabse zyada time saaf-safai (cleaning) leti hai.',
        codeExample:
          '# Data Science Lifecycle\n# 1. Problem definition\n# 2. Data collection\n# 3. Data cleaning & preparation   <- often ~80% of the time\n# 4. Exploratory Data Analysis (EDA)\n# 5. Modelling\n# 6. Evaluation\n# 7. Deployment & communication\n# (iterative: loop back as you learn)',
        keyPoints: [
          'Problem -> collect -> clean -> EDA -> model -> evaluate -> deploy',
          'Iterative, not strictly linear',
          'Cleaning/prep usually takes the most time',
          'Communication of results is a core step',
        ],
        quiz: [
          {
            question: 'Which stage usually takes the most time?',
            options: ['modelling', 'data cleaning & preparation', 'deployment', 'naming the project'],
            correctIndex: 1,
          },
          {
            question: 'The data science lifecycle is…',
            options: ['strictly one-way', 'iterative (you loop back)', 'only one step', 'random'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Types of Data & Variables',
        difficulty: 'easy',
        tags: ['data-types', 'statistics'],
        explanation: {
          english:
            'Data comes in types that decide which analyses apply. Numerical (quantitative) data is continuous (height, price) or discrete (counts). Categorical (qualitative) data is nominal (no order: colour, city) or ordinal (ordered: small/medium/large, ratings). Structured data fits tables (rows/columns); unstructured data is text, images, audio. Knowing the type guides cleaning, encoding, and which charts/models to use.',
          hinglish:
            'Data alag types mein aata hai jo decide karte hain kaunsa analysis lagega. Numerical (quantitative) data continuous (height, price) ya discrete (counts) hota hai. Categorical (qualitative) data nominal (no order: colour, city) ya ordinal (ordered: small/medium/large, ratings) hota hai. Structured data tables mein fit hota hai (rows/columns); unstructured data text, images, audio. Type jaanne se cleaning, encoding, aur kaunse charts/models use karne hain guide hota hai.',
        },
        dailyLifeExample:
          'Numerical = "kitne" (price, age). Categorical = "kis tarah ka" (red/blue, small/large). Ordinal mein order hota hai (small < medium < large), nominal mein nahi (red, blue — koi bada-chhota nahi).',
        codeExample:
          '# Numerical: continuous (1.75 m), discrete (3 children)\n# Categorical:\n#   nominal  -> ["red", "blue", "green"]      (no order)\n#   ordinal  -> ["low", "medium", "high"]     (ordered)\n# Structured (tables) vs unstructured (text/images)\n#\n# Type decides encoding, charts, and model choice.',
        keyPoints: [
          'Numerical: continuous or discrete',
          'Categorical: nominal (no order) or ordinal (ordered)',
          'Structured (tables) vs unstructured (text/images)',
          'Type guides cleaning, encoding & visualisation',
        ],
        quiz: [
          {
            question: '"Small, Medium, Large" is which type of data?',
            options: ['numerical continuous', 'ordinal categorical', 'nominal categorical', 'unstructured'],
            correctIndex: 1,
          },
          {
            question: 'City names (Delhi, Pune, Mumbai) are…',
            options: ['ordinal', 'nominal categorical', 'continuous', 'discrete'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Data Wrangling & EDA',
    level: 'intermediate',
    description: 'Data clean karna, explore karna aur visualise karna.',
    concepts: [
      {
        title: 'Data Cleaning',
        difficulty: 'medium',
        tags: ['cleaning', 'preprocessing'],
        explanation: {
          english:
            'Real data is messy: missing values, duplicates, wrong types, inconsistent formats, and outliers. Cleaning handles these — drop or impute missing values (mean/median/mode or model-based), remove duplicates, fix data types and units, standardise categories ("NY" vs "New York"), and decide what to do with outliers. Clean data is the foundation; "garbage in, garbage out" — a model is only as good as its data.',
          hinglish:
            'Real data messy hota hai: missing values, duplicates, galat types, inconsistent formats, aur outliers. Cleaning inhe handle karti hai — missing values drop ya impute karo (mean/median/mode ya model-based), duplicates hatao, data types aur units fix karo, categories standardise karo ("NY" vs "New York"), aur outliers ka kya karna decide karo. Clean data foundation hai; "garbage in, garbage out" — model utna hi achha jitna uska data.',
        },
        dailyLifeExample:
          'Data cleaning sabzi dhone-kaatne jaisa hai — kharab tukde hatao, mitti saaf karo, sahi size mein kaato. Phir hi achhi dish (model) banegi.',
        codeExample:
          'import pandas as pd\n\ndf = df.drop_duplicates()                 # remove duplicates\ndf["age"] = pd.to_numeric(df["age"], errors="coerce")  # fix type\ndf["age"] = df["age"].fillna(df["age"].median())       # impute missing\ndf["city"] = df["city"].str.strip().str.title()        # standardise\n# Inspect & handle outliers separately (e.g. IQR rule)',
        keyPoints: [
          'Handle missing values (drop or impute)',
          'Remove duplicates; fix types & units',
          'Standardise inconsistent categories',
          'Garbage in, garbage out — clean data first',
        ],
        quiz: [
          {
            question: 'Filling missing values with the median is called…',
            options: ['dropping', 'imputation', 'encoding', 'scaling'],
            correctIndex: 1,
          },
          {
            question: '"Garbage in, garbage out" means…',
            options: ['models fix bad data', 'a model is only as good as its data', 'delete all data', 'data never matters'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Exploratory Data Analysis (EDA)',
        difficulty: 'medium',
        tags: ['eda', 'analysis'],
        explanation: {
          english:
            'EDA is investigating data to understand it before modelling — using summary statistics (mean, median, spread) and visualisations (histograms, box plots, scatter plots, correlation heatmaps). The goal is to find patterns, spot anomalies, check assumptions, and form hypotheses. EDA tells you which features matter, what to clean, and which model might fit — it is detective work, not final analysis.',
          hinglish:
            'EDA data ko modelling se pehle samajhne ke liye investigate karna hai — summary statistics (mean, median, spread) aur visualisations (histograms, box plots, scatter plots, correlation heatmaps) se. Goal: patterns dhoondhna, anomalies pakadna, assumptions check karna, aur hypotheses banana. EDA batata hai kaunse features matter karte hain, kya clean karna hai, aur kaunsa model fit ho sakta hai — ye detective work hai, final analysis nahi.',
        },
        dailyLifeExample:
          'EDA naye sheher mein ghoom kar samajhne jaisa hai — pehle ek tour lo (charts dekho), areas ka feel lo, phir decide karo kahan rehna (model banana) hai.',
        codeExample:
          'df.describe()          # summary stats per column\ndf.info()              # types & non-null counts\ndf["price"].hist()     # distribution\ndf.corr()              # correlations between numeric columns\n# scatter plots, box plots -> spot patterns & outliers',
        keyPoints: [
          'Understand data before modelling',
          'Summary stats + visualisations',
          'Find patterns, anomalies, check assumptions',
          'Guides cleaning, feature & model choice',
        ],
        quiz: [
          {
            question: 'EDA is mainly about…',
            options: ['deploying models', 'understanding & exploring data before modelling', 'writing the report', 'collecting data'],
            correctIndex: 1,
          },
          {
            question: 'Which is a common EDA visualisation?',
            options: ['histogram', 'Dockerfile', 'API route', 'CSS grid'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Data Visualization',
        difficulty: 'easy',
        tags: ['visualization', 'charts'],
        explanation: {
          english:
            'Visualisation turns numbers into charts so patterns are easy to see and communicate. Match the chart to the question: histograms for distributions, bar charts for category comparisons, line charts for trends over time, scatter plots for relationships between two numbers, box plots for spread/outliers. Good charts are honest (no misleading axes), labelled, and uncluttered. Tools: Matplotlib, Seaborn, Plotly.',
          hinglish:
            'Visualisation numbers ko charts mein badal deta hai taaki patterns dekhna aur communicate karna aasaan ho. Chart ko question se match karo: distributions ke liye histograms, category comparison ke liye bar charts, time ke trends ke liye line charts, do numbers ke relationship ke liye scatter plots, spread/outliers ke liye box plots. Achhe charts honest (no misleading axes), labelled, aur saaf hote hain. Tools: Matplotlib, Seaborn, Plotly.',
        },
        dailyLifeExample:
          'Ek table of numbers vs ek chart — chart se trend ek nazar mein dikh jaata hai, jaise report card ke marks ka graph turant batata hai progress.',
        codeExample:
          'import matplotlib.pyplot as plt\nimport seaborn as sns\n\nsns.histplot(df["price"])        # distribution\nsns.scatterplot(x="size", y="price", data=df)  # relationship\nsns.boxplot(x="city", y="price", data=df)      # spread/outliers\nplt.show()',
        keyPoints: [
          'Match chart to the question',
          'Histogram=distribution, line=trend, scatter=relationship',
          'Box plot shows spread & outliers',
          'Keep charts honest, labelled, uncluttered',
        ],
        quiz: [
          {
            question: 'To show a trend over time you use a…',
            options: ['pie chart', 'line chart', 'histogram', 'heatmap'],
            correctIndex: 1,
          },
          {
            question: 'A scatter plot is best for showing…',
            options: ['a single value', 'the relationship between two numeric variables', 'a category count', 'code'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Feature Engineering',
        difficulty: 'hard',
        tags: ['features', 'preprocessing'],
        explanation: {
          english:
            'Feature engineering creates or transforms input variables to help models learn better — often more impactful than the model choice itself. Techniques: encoding categoricals (one-hot, label, target encoding), scaling/normalising numbers, creating new features (e.g. price per square foot), binning, extracting parts of dates, and handling skew with log transforms. Good features make patterns easier for the model to detect.',
          hinglish:
            'Feature engineering input variables ko create ya transform karta hai taaki models behtar seekhein — aksar model choice se zyada impactful. Techniques: categoricals encode karna (one-hot, label, target encoding), numbers scale/normalise karna, naye features banana (jaise price per square foot), binning, dates ke parts nikalna, aur log transforms se skew handle karna. Achhe features patterns ko model ke liye detect karna aasaan bana dete hain.',
        },
        dailyLifeExample:
          'Feature engineering ingredients ko prep karne jaisa hai — sahi kataai aur marination (transform) se dish (model) ka swaad (accuracy) kaafi behtar ho jaata hai.',
        codeExample:
          'import pandas as pd, numpy as np\n\n# One-hot encode a categorical\ndf = pd.get_dummies(df, columns=["city"])\n# New feature\ndf["price_per_sqft"] = df["price"] / df["sqft"]\n# Reduce skew\ndf["log_price"] = np.log1p(df["price"])\n# Extract from a date\ndf["month"] = pd.to_datetime(df["date"]).dt.month',
        keyPoints: [
          'Create/transform inputs to help the model',
          'Encode categoricals; scale numbers',
          'Build domain features (ratios, date parts)',
          'Often more impactful than the model choice',
        ],
        quiz: [
          {
            question: 'Converting "city" into 0/1 columns is called…',
            options: ['scaling', 'one-hot encoding', 'binning', 'imputation'],
            correctIndex: 1,
          },
          {
            question: 'Feature engineering is…',
            options: ['always less important than the model', 'often more impactful than the model choice', 'only for images', 'deployment'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Statistics for Data Science',
    level: 'intermediate',
    description: 'Descriptive stats, probability aur correlation.',
    concepts: [
      {
        title: 'Descriptive Statistics',
        difficulty: 'medium',
        tags: ['statistics'],
        explanation: {
          english:
            'Descriptive statistics summarise data. Measures of central tendency: mean (average, sensitive to outliers), median (middle, robust to outliers), mode (most frequent). Measures of spread: range, variance, and standard deviation (typical distance from the mean). Together they describe where data centres and how spread out it is — the first thing you compute in EDA.',
          hinglish:
            'Descriptive statistics data ko summarise karti hain. Central tendency ke measures: mean (average, outliers se affected), median (middle, outliers se robust), mode (sabse frequent). Spread ke measures: range, variance, aur standard deviation (mean se typical distance). Ye milke batate hain data kahan center hota hai aur kitna spread hai — EDA mein sabse pehle yahi compute karte ho.',
        },
        dailyLifeExample:
          'Class ke marks: mean average batata hai, par ek topper ya zero usse kheench leta hai — median (beech wala) zyada honest picture deta hai. Standard deviation batata hai marks kitne bikhre hain.',
        codeExample:
          'df["score"].mean()    # average\ndf["score"].median()  # middle value (robust to outliers)\ndf["score"].mode()    # most frequent\ndf["score"].std()     # standard deviation (spread)\ndf["score"].describe()# all at once',
        keyPoints: [
          'Central tendency: mean, median, mode',
          'Median is robust to outliers; mean is not',
          'Spread: range, variance, standard deviation',
          'First summary you compute in EDA',
        ],
        quiz: [
          {
            question: 'Which average is most robust to outliers?',
            options: ['mean', 'median', 'mode', 'range'],
            correctIndex: 1,
          },
          {
            question: 'Standard deviation measures…',
            options: ['the center', 'the spread of data', 'the count', 'the maximum'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Correlation vs Causation',
        difficulty: 'medium',
        tags: ['statistics', 'correlation'],
        explanation: {
          english:
            'Correlation measures how two variables move together, from -1 (opposite) through 0 (none) to +1 (together). Crucially, correlation does NOT imply causation — two things can move together due to coincidence or a hidden third factor (a confounder). Ice-cream sales and drownings both rise in summer (confounder: heat), not because ice cream causes drowning. Establishing causation needs controlled experiments (A/B tests), not just correlation.',
          hinglish:
            'Correlation measure karta hai do variables saath kaise move karte hain, -1 (ulta) se 0 (koi nahi) se +1 (saath) tak. Important: correlation causation imply NAHI karta — do cheezein coincidence ya ek hidden teesre factor (confounder) ki wajah se saath move kar sakti hain. Ice-cream sales aur drownings dono garmi mein badhte hain (confounder: garmi), ice cream se drowning nahi hoti. Causation establish karne ke liye controlled experiments (A/B tests) chahiye, sirf correlation nahi.',
        },
        dailyLifeExample:
          'Garmi mein ice cream aur cold drinks dono bikte hain — iska matlab ice cream se cold drink nahi bikti. Dono ka asli kaaran garmi (confounder) hai.',
        codeExample:
          '# Correlation matrix (Pearson) for numeric columns\ndf.corr()\n#\n# corr near +1 -> move together; near -1 -> opposite; 0 -> none\n# BUT correlation != causation (watch for confounders).\n# For causation, run a controlled experiment (A/B test).',
        keyPoints: [
          'Correlation: -1 to +1 (how variables move together)',
          'Correlation does NOT imply causation',
          'Beware confounders (hidden third factors)',
          'Causation needs controlled experiments (A/B tests)',
        ],
        quiz: [
          {
            question: 'A correlation of -1 means the variables…',
            options: ['are unrelated', 'move in exactly opposite directions', 'are identical', 'cause each other'],
            correctIndex: 1,
          },
          {
            question: 'Correlation between two variables proves…',
            options: ['causation', 'nothing about causation by itself', 'a bug', 'randomness'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Machine Learning',
    level: 'advanced',
    description: 'Supervised/unsupervised, regression, classification aur evaluation.',
    concepts: [
      {
        title: 'Supervised vs Unsupervised Learning',
        difficulty: 'medium',
        tags: ['machine-learning'],
        explanation: {
          english:
            'In supervised learning the data has labels (known answers) and the model learns to predict them — regression (predict a number, e.g. price) and classification (predict a category, e.g. spam/not-spam). In unsupervised learning there are no labels; the model finds structure itself — clustering (group similar items) and dimensionality reduction (compress features). There is also reinforcement learning (learn by reward/penalty through trial and error).',
          hinglish:
            'Supervised learning mein data ke labels (known answers) hote hain aur model unhe predict karna seekhta hai — regression (number predict, jaise price) aur classification (category predict, jaise spam/not-spam). Unsupervised learning mein labels nahi; model khud structure dhoondhta hai — clustering (similar items group) aur dimensionality reduction (features compress). Reinforcement learning bhi hai (reward/penalty se trial-and-error seekhna).',
        },
        dailyLifeExample:
          'Supervised = teacher solved examples deta hai (labels). Unsupervised = bina batao students ko khud groups banane do (similar logon ko ek saath). Reinforcement = video game khel ke score se seekhna.',
        codeExample:
          '# Supervised: features X + labels y\n#   Regression     -> predict a number (house price)\n#   Classification -> predict a category (spam / not spam)\n#\n# Unsupervised: features X only, no labels\n#   Clustering     -> group similar customers\n#   Dim. reduction -> compress features (PCA)',
        keyPoints: [
          'Supervised: labelled data (regression/classification)',
          'Unsupervised: no labels (clustering, dim. reduction)',
          'Regression predicts numbers; classification predicts categories',
          'Reinforcement learning: learn via reward/penalty',
        ],
        quiz: [
          {
            question: 'Predicting house price from features is…',
            options: ['classification', 'regression (supervised)', 'clustering', 'unsupervised'],
            correctIndex: 1,
          },
          {
            question: 'Grouping similar customers without labels is…',
            options: ['regression', 'clustering (unsupervised)', 'classification', 'labelling'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between classification and regression?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'Both are supervised learning. Regression predicts a continuous numeric value (house price, temperature, sales) and is evaluated with metrics like MAE, MSE, RMSE, or R². Classification predicts a discrete category/label (spam vs not-spam, disease vs healthy) and is evaluated with accuracy, precision, recall, F1, and ROC-AUC. The key difference is the output type: a number vs a class.',
              hinglish:
                'Dono supervised learning hain. Regression ek continuous numeric value predict karta hai (house price, temperature, sales) aur MAE, MSE, RMSE, ya R² jaise metrics se evaluate hota hai. Classification ek discrete category/label predict karta hai (spam vs not-spam, disease vs healthy) aur accuracy, precision, recall, F1, ROC-AUC se evaluate hota hai. Key difference output type hai: ek number vs ek class.',
            },
          },
        ],
      },
      {
        title: 'Regression',
        difficulty: 'hard',
        tags: ['regression', 'machine-learning'],
        explanation: {
          english:
            'Regression predicts a continuous number from input features. Linear regression fits a straight line (y = mx + b, generalised to many features) by minimising the squared error between predictions and actual values. It is interpretable (each coefficient shows a feature\'s effect) and a great baseline. Extensions: polynomial regression for curves, and regularised versions (Ridge/Lasso) to prevent overfitting. Evaluate with RMSE/MAE and R².',
          hinglish:
            'Regression input features se ek continuous number predict karta hai. Linear regression ek straight line fit karta hai (y = mx + b, kai features tak generalise) predictions aur actual values ke beech squared error minimise karke. Ye interpretable hai (har coefficient ek feature ka effect dikhata hai) aur ek badhiya baseline. Extensions: curves ke liye polynomial regression, aur overfitting rokne ke liye regularised versions (Ridge/Lasso). RMSE/MAE aur R² se evaluate karo.',
        },
        dailyLifeExample:
          'Regression past data se trend ki line kheenchne jaisa hai — "itne sqft pe ghar ki keemat itni" — phir naye ghar ka price us line se andaza lagana.',
        codeExample:
          'from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = LinearRegression().fit(X_train, y_train)\npreds = model.predict(X_test)\n# Evaluate with RMSE / R^2 on the test set',
        keyPoints: [
          'Predicts a continuous number',
          'Linear regression minimises squared error',
          'Interpretable coefficients; strong baseline',
          'Evaluate with RMSE/MAE and R²; regularise to avoid overfit',
        ],
        quiz: [
          {
            question: 'Linear regression output is…',
            options: ['a category', 'a continuous number', 'a cluster', 'an image'],
            correctIndex: 1,
          },
          {
            question: 'Which metric evaluates a regression model?',
            options: ['accuracy', 'RMSE / R²', 'precision', 'recall'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Classification & Evaluation Metrics',
        difficulty: 'hard',
        tags: ['classification', 'metrics'],
        explanation: {
          english:
            'Classification predicts categories (e.g. logistic regression, decision trees, random forests). Accuracy (correct / total) is misleading on imbalanced data — if 99% of emails are not spam, predicting "not spam" always is 99% accurate but useless. Better metrics: precision (of predicted positives, how many were right), recall (of actual positives, how many were caught), and F1 (their harmonic mean). The confusion matrix (TP/FP/TN/FN) underlies all of these.',
          hinglish:
            'Classification categories predict karta hai (jaise logistic regression, decision trees, random forests). Accuracy (correct / total) imbalanced data pe misleading hai — agar 99% emails spam nahi, to hamesha "not spam" predict karna 99% accurate par useless. Better metrics: precision (predicted positives mein se kitne sahi the), recall (actual positives mein se kitne pakde), aur F1 (inka harmonic mean). Confusion matrix (TP/FP/TN/FN) in sabke peeche hai.',
        },
        dailyLifeExample:
          'Spam filter: precision = "jo spam bola wo sach mein spam tha?" recall = "saare spam pakde ya kuch chhoot gaye?" Dono ka balance F1 deta hai.',
        codeExample:
          'from sklearn.metrics import classification_report, confusion_matrix\n\npreds = model.predict(X_test)\nprint(confusion_matrix(y_test, preds))   # TP, FP, TN, FN\nprint(classification_report(y_test, preds)) # precision, recall, F1\n# Accuracy alone can mislead on imbalanced data.',
        keyPoints: [
          'Predicts categories (logistic reg, trees, forests)',
          'Accuracy misleads on imbalanced data',
          'Precision, recall, F1 give a fuller picture',
          'Confusion matrix (TP/FP/TN/FN) underlies the metrics',
        ],
        quiz: [
          {
            question: 'Why can accuracy mislead on imbalanced data?',
            options: ['it is always wrong', 'predicting the majority class can score high yet be useless', 'it needs images', 'it is slow'],
            correctIndex: 1,
          },
          {
            question: 'Recall measures…',
            options: ['of actual positives, how many were caught', 'typing speed', 'model size', 'training time'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Overfitting, Train/Test Split & Cross-Validation',
        difficulty: 'hard',
        tags: ['overfitting', 'validation'],
        explanation: {
          english:
            'Overfitting is when a model memorises the training data (including noise) and fails on new data — high train accuracy, low test accuracy. Underfitting is too simple a model that misses patterns. To detect and prevent: split data into train/test (and a validation set), or use k-fold cross-validation (train on k-1 folds, test on the held-out fold, rotate). Fight overfitting with more data, simpler models, regularisation, and early stopping.',
          hinglish:
            'Overfitting tab hai jab model training data (noise samet) ratt leta hai aur naye data pe fail hota hai — high train accuracy, low test accuracy. Underfitting matlab itna simple model jo patterns hi miss kar de. Detect aur prevent karne ke liye: data ko train/test (aur ek validation set) mein split karo, ya k-fold cross-validation use karo (k-1 folds pe train, held-out fold pe test, rotate). Overfitting se lado zyada data, simpler models, regularisation, aur early stopping se.',
        },
        dailyLifeExample:
          'Overfitting ek student jaisa hai jo sirf pichhle saal ke exact question-answers ratt leta hai — practice paper pe 100%, par naya paper aaya to fail. Samajh ke padhna (generalise) zaroori hai.',
        codeExample:
          'from sklearn.model_selection import train_test_split, cross_val_score\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel.fit(X_train, y_train)\n# Train >> test score => overfitting\nscores = cross_val_score(model, X, y, cv=5)  # 5-fold CV\nprint(scores.mean())',
        keyPoints: [
          'Overfit: great on train, poor on test',
          'Underfit: too simple, misses patterns',
          'Use train/test split or k-fold cross-validation',
          'Fix overfit: more data, simpler model, regularisation',
        ],
        quiz: [
          {
            question: 'High training accuracy but low test accuracy indicates…',
            options: ['underfitting', 'overfitting', 'perfect model', 'a clean dataset'],
            correctIndex: 1,
          },
          {
            question: 'k-fold cross-validation helps you…',
            options: ['deploy faster', 'estimate model performance more reliably', 'collect data', 'draw charts'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is overfitting and how do you prevent it?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Overfitting is when a model learns the training data too well — including its noise — so it performs great on training data but poorly on unseen data (it fails to generalise). You detect it via a large gap between train and validation/test scores. Prevent it with: more/representative training data, a simpler model or fewer features, regularisation (L1/L2), dropout (for neural nets), early stopping, and proper validation (train/test split + cross-validation). The goal is good performance on data the model has never seen.',
              hinglish:
                'Overfitting tab hai jab model training data ko bahut achhe se seekh leta hai — uska noise samet — to wo training data pe great par unseen data pe poor perform karta hai (generalise nahi kar pata). Ise train aur validation/test scores ke bade gap se detect karte ho. Prevent karo: zyada/representative training data, simpler model ya kam features, regularisation (L1/L2), dropout (neural nets ke liye), early stopping, aur proper validation (train/test split + cross-validation) se. Goal hai us data pe achhi performance jo model ne kabhi dekha hi nahi.',
            },
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'Walk me through the steps of a typical data science project.',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Define the problem and success metric; collect and understand the data; clean and prepare it (missing values, types, duplicates); do EDA to find patterns and check assumptions; engineer features; split into train/validation/test; build and tune models; evaluate with appropriate metrics on unseen data; and finally deploy and communicate results to stakeholders. It is iterative — findings often send you back to earlier steps — and cleaning/prep usually consumes most of the time.',
      hinglish:
        'Problem aur success metric define karo; data collect aur samjho; clean aur prepare karo (missing values, types, duplicates); EDA karke patterns dhoondho aur assumptions check karo; features engineer karo; train/validation/test mein split karo; models build aur tune karo; unseen data pe sahi metrics se evaluate karo; aur aakhir mein deploy aur stakeholders ko results communicate karo. Ye iterative hai — findings aksar pichhle steps pe wapas bhejte hain — aur cleaning/prep zyadatar time leta hai.',
    },
  },
  {
    question: 'How do you handle missing data?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'First understand why it is missing (random vs systematic) and how much. Options: drop rows/columns if missingness is small or the column is mostly empty; impute with mean/median/mode (simple) or model-based/KNN imputation (smarter); add a "was-missing" indicator flag; or use models that handle missing values natively. Avoid leaking test data into imputation — fit imputers on the training set only. The right choice depends on the amount, the mechanism, and the downstream model.',
      hinglish:
        'Pehle samjho kyun missing hai (random vs systematic) aur kitna. Options: rows/columns drop karo agar missingness chhoti ho ya column zyadatar khaali; mean/median/mode (simple) ya model-based/KNN imputation (smarter) se impute karo; ek "was-missing" indicator flag add karo; ya aise models use karo jo missing values natively handle karein. Test data ko imputation mein leak mat karo — imputers sirf training set pe fit karo. Sahi choice amount, mechanism, aur downstream model pe depend karti hai.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
