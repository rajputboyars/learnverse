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
  icon: 'chart',
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
      {
        title: 'Hypothesis Testing & p-values',
        difficulty: 'hard',
        tags: ['hypothesis-testing', 'p-value', 'statistics'],
        explanation: {
          english:
            "Hypothesis testing is how data scientists decide if an observed effect (like a new website design increasing sign-ups) is REAL or just random luck. You start with a null hypothesis (H0: 'there is no real effect, any difference is chance') and an alternative hypothesis (H1: 'there IS a real effect'). A statistical test computes a p-value: the probability of seeing a result this extreme (or more) IF the null hypothesis were actually true. A small p-value (conventionally < 0.05) means the observed result would be unlikely under 'no effect', so you reject the null hypothesis. A p-value does NOT tell you the probability the null hypothesis is true, or the size/importance of the effect — a very common misinterpretation.",
          hinglish:
            "Hypothesis testing wo tarika hai jisse data scientists decide karte hain ki ek observed effect (jaise ek naya website design sign-ups badha raha hai) REAL hai ya sirf random luck. Tum ek null hypothesis se shuru karte ho (H0: 'koi real effect nahi hai, jo bhi difference hai wo chance se hai') aur ek alternative hypothesis (H1: 'EK real effect HAI'). Ek statistical test ek p-value calculate karta hai: is baat ki probability ki ye result (ya usse zyada extreme) dikhega AGAR null hypothesis actually true hoti. Ek chhota p-value (conventionally < 0.05) matlab observed result 'no effect' ke under unlikely hota, isliye tum null hypothesis reject kar dete ho. P-value ye NAHI batata ki null hypothesis true hone ki probability kya hai, ya effect kitna bada/important hai — ye ek bahut common galat samajh hai.",
        },
        dailyLifeExample:
          "Hypothesis testing ek court case jaisa hai — 'innocent until proven guilty' (null hypothesis: koi effect nahi hai). Tum evidence (data) collect karte ho, aur agar evidence itna strong hai ki 'agar innocent hota to ye evidence milna bahut unlikely tha' (chhota p-value), tabhi tum guilty (reject null hypothesis, effect real hai) declare karte ho.",
        codeExample:
          "from scipy import stats\n\n# Did the new button color increase clicks?\n# Group A (old color): click rates\ngroup_a = [0.10, 0.12, 0.09, 0.11, 0.10]\n# Group B (new color): click rates\ngroup_b = [0.15, 0.14, 0.16, 0.13, 0.15]\n\n# Null hypothesis (H0): no real difference between groups\n# Alternative (H1): there IS a real difference\nt_stat, p_value = stats.ttest_ind(group_a, group_b)\n\nprint(f'p-value: {p_value:.4f}')\nif p_value < 0.05:\n    print('Reject H0 — the difference is likely real (statistically significant)')\nelse:\n    print('Fail to reject H0 — not enough evidence of a real difference')",
        keyPoints: [
          'Null hypothesis (H0): assumes no real effect exists; alternative (H1): a real effect exists',
          'p-value: the probability of seeing this result (or more extreme) IF H0 were true',
          'Small p-value (commonly < 0.05) -> reject H0 -> the effect is likely real, not just chance',
          'A p-value does NOT tell you the probability H0 is true, nor how big/important the effect is',
          'Statistical significance is not the same as practical/business significance',
        ],
        quiz: [
          {
            question: 'What does a small p-value (e.g. 0.01) suggest?',
            options: ['The null hypothesis is definitely false', 'The observed result would be unlikely if the null hypothesis were true, so you reject it', 'There is no effect', 'The sample size is too small'],
            correctIndex: 1,
          },
          {
            question: 'What is a common MISINTERPRETATION of the p-value?',
            options: ['That it relates to the null hypothesis at all', 'Believing the p-value IS the probability that the null hypothesis is true (it is not)', 'That smaller is more significant', 'That it comes from a statistical test'],
            correctIndex: 1,
          },
          {
            question: 'What is the null hypothesis (H0) typically assumed to be?',
            options: ['That there IS a real, meaningful effect', 'That there is NO real effect — any observed difference is due to chance', 'That the data is wrong', 'That the sample size is too large'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'A/B Testing: Controlled Experiments',
        difficulty: 'hard',
        tags: ['ab-testing', 'experimentation'],
        explanation: {
          english:
            'An A/B test is a controlled experiment that proves causation, not just correlation. You randomly split users into Group A (control, sees the current version) and Group B (treatment, sees the new version), change ONLY ONE thing between them, and compare a metric (like conversion rate) between the two groups. Because assignment is RANDOM, any other factor (time of day, user type, weather) should average out equally between groups — so if B outperforms A, you can credit the change itself, not a confounder. Run the test long enough to reach a reasonable sample size, then use hypothesis testing (a p-value) to check if the difference is statistically significant, not just random noise.',
          hinglish:
            'A/B test ek controlled experiment hai jo causation prove karta hai, sirf correlation nahi. Tum users ko randomly Group A (control, current version dekhte hain) aur Group B (treatment, naya version dekhte hain) mein baant te ho, unke beech SIRF EK cheez badalte ho, aur ek metric (jaise conversion rate) dono groups ke beech compare karte ho. Kyunki assignment RANDOM hai, koi bhi doosra factor (din ka time, user type, weather) dono groups mein equally average out hona chahiye — isliye agar B, A se behtar perform kare, to tum us change ko hi credit de sakte ho, kisi confounder ko nahi. Test ko itni der chalao ki reasonable sample size mile, phir hypothesis testing (p-value) use karo ye check karne ke liye ki difference statistically significant hai, sirf random noise nahi.',
        },
        dailyLifeExample:
          'A/B test ek doctor ke clinical trial jaisa hai — kuch patients ko asli dawai (Group B) dete ho, kuch ko placebo (Group A), RANDOMLY assign karke. Agar asli dawai wale significantly behtar hon, to tum confident ho sakte ho ki dawai hi kaam kar rahi hai, koi aur wajah nahi (kyunki random assignment ne baaki sab factors balance kar diye).',
        codeExample:
          "# Simple A/B test structure\nimport numpy as np\nfrom scipy import stats\n\n# Randomly assign users to control (A) or treatment (B)\n# control: old checkout button; treatment: new checkout button\nconversions_a = 120   # out of\nvisitors_a = 1000\nconversions_b = 150   # out of\nvisitors_b = 1000\n\nrate_a = conversions_a / visitors_a  # 12%\nrate_b = conversions_b / visitors_b  # 15%\n\n# Statistical test to check if the 3% lift is real or just noise\ncount = np.array([conversions_a, conversions_b])\nnobs = np.array([visitors_a, visitors_b])\n\n# (conceptually — a proportions z-test)\n# if p_value < 0.05: the new button REALLY performs better\n# else: not enough evidence, could just be random variation",
        keyPoints: [
          'Random assignment to control (A) and treatment (B) is what makes A/B tests prove CAUSATION',
          'Change only ONE variable between groups — otherwise you cannot tell which change caused the effect',
          'Random assignment balances out confounders (time, user type, etc.) between the two groups equally',
          'Use hypothesis testing (p-value) to confirm the difference is statistically significant, not random noise',
          'Run long enough to get a meaningful sample size before drawing conclusions',
        ],
        quiz: [
          {
            question: 'Why does RANDOM assignment in an A/B test let you claim causation, not just correlation?',
            options: ['Randomness has no real purpose here', 'Random assignment balances out other factors (confounders) equally between groups, so any difference in outcome can be credited to the one thing that was changed', 'It makes the test run faster', 'It removes the need for a control group'],
            correctIndex: 1,
          },
          {
            question: 'In a proper A/B test, how many things should differ between Group A and Group B?',
            options: ['As many as possible', 'Exactly ONE — the specific thing being tested', 'At least three', 'It does not matter'],
            correctIndex: 1,
          },
          {
            question: 'After running an A/B test, why use a hypothesis test (p-value) on the results?',
            options: ['It is not necessary', 'To check whether the observed difference between groups is statistically significant or could just be random variation', 'To make the groups bigger', 'To randomly assign users'],
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
            frequency: 'common',
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
            frequency: 'common',
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

  // ─── Statistics Foundations ───────────────────────────────────────────
  {
    question: 'What is the difference between mean, median, and mode — and when do you use each?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'MEAN is the arithmetic average — it uses every value but is dragged badly by outliers. MEDIAN is the middle value when sorted — robust to outliers, which is why income and house prices are always reported as medians (a few billionaires would make the mean meaningless). MODE is the most frequent value — the only one that works for categorical data. Rule of thumb: use median for skewed distributions, mean for roughly symmetric ones, mode for categories.',
      hinglish:
        'MEAN arithmetic average hai — ye har value use karta hai par outliers se buri tarah kheencha jaata hai. MEDIAN sort karne pe beech ki value hai — outliers ke liye robust, isiliye income aur house prices hamesha medians ke roop mein report hote hain (kuch billionaires mean ko meaningless bana denge). MODE sabse frequent value hai — sirf yahi categorical data ke liye kaam karta hai. Rule of thumb: skewed distributions ke liye median, roughly symmetric ke liye mean, categories ke liye mode.',
    },
  },
  {
    question: 'What is standard deviation and variance?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'VARIANCE is the average of squared deviations from the mean — it measures spread, but its units are squared (rupees squared), which is meaningless to interpret. STANDARD DEVIATION is the square root of variance, returning to the original units so it can be read directly ("typical distance from the mean"). Squaring is not arbitrary: it makes deviations positive and penalises large deviations disproportionately, which is exactly why variance is sensitive to outliers.',
      hinglish:
        'VARIANCE mean se squared deviations ka average hai — ye spread measure karta hai, par iski units squared hoti hain (rupees squared), jo interpret karne ke liye meaningless hai. STANDARD DEVIATION variance ka square root hai, original units mein wapas aate hue taaki use directly padha ja sake ("mean se typical distance"). Squaring arbitrary nahi hai: ye deviations ko positive banata hai aur badi deviations ko disproportionately penalise karta hai, isiliye variance outliers ke liye sensitive hai.',
    },
  },
  {
    question: 'What is the normal distribution and the empirical rule?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The normal (Gaussian) distribution is the symmetric bell curve where mean, median, and mode coincide. The empirical rule states that roughly 68% of values fall within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3. This is why "3-sigma" is a common outlier threshold. It matters because many statistical tests assume normality, and thanks to the Central Limit Theorem, sample MEANS tend toward normality even when the underlying data is not normal.',
      hinglish:
        'Normal (Gaussian) distribution wo symmetric bell curve hai jahan mean, median, aur mode ek hi jagah hote hain. Empirical rule kehta hai ki roughly 68% values mean ke 1 standard deviation ke andar aati hain, 95% 2 ke andar, aur 99.7% 3 ke andar. Isiliye "3-sigma" ek common outlier threshold hai. Ye matter karta hai kyunki bahut statistical tests normality assume karte hain, aur Central Limit Theorem ki wajah se, sample MEANS normality ki taraf jaate hain chahe underlying data normal na ho.',
    },
  },
  {
    question: 'What is the Central Limit Theorem and why does it matter?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The CLT states that the distribution of SAMPLE MEANS approaches a normal distribution as sample size grows, REGARDLESS of the shape of the underlying population distribution. This is the foundation of practical inference: it means you can build confidence intervals and run hypothesis tests on the mean without knowing or assuming the population\'s true distribution. The common misreading is thinking it says your DATA becomes normal — it does not; only the distribution of sample means does.',
      hinglish:
        'CLT kehta hai ki SAMPLE MEANS ka distribution sample size badhne pe ek normal distribution ki taraf jaata hai, underlying population distribution ka shape CHAHE KUCH BHI HO. Ye practical inference ka foundation hai: iska matlab tum mean pe confidence intervals bana sakte ho aur hypothesis tests chala sakte ho bina population ka true distribution jaane ya assume kiye. Common misreading ye sochna hai ki ye kehta hai tumhara DATA normal ban jaata hai — nahi banta; sirf sample means ka distribution banta hai.',
    },
  },
  {
    question: 'What is a p-value and what does it actually mean?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A p-value is the probability of observing a result at least as extreme as yours ASSUMING the null hypothesis is true. It does NOT give the probability that the null hypothesis is true, and it does not measure effect size — the two most common misinterpretations. A small p-value (below your chosen alpha, typically 0.05) says the data would be surprising under the null, so you reject it. A huge sample can produce a tiny p-value for a completely trivial effect, which is why you must always report effect size alongside it.',
      hinglish:
        'Ek p-value tumhare jitna ya usse zyada extreme result observe karne ki probability hai YE MAAN KAR ki null hypothesis true hai. Ye ye probability NAHI deta ki null hypothesis true hai, aur ye effect size measure nahi karta — do sabse common misinterpretations. Ek chhota p-value (tumhare chosen alpha se neeche, typically 0.05) kehta hai ki data null ke under surprising hota, isliye tum use reject karte ho. Ek huge sample ek bilkul trivial effect ke liye ek tiny p-value produce kar sakta hai, isiliye tumhe hamesha uske saath effect size report karna chahiye.',
    },
  },
  {
    question: 'What are Type I and Type II errors?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A TYPE I error is a FALSE POSITIVE — rejecting a true null hypothesis, i.e. claiming an effect that does not exist. Its probability is alpha, the significance level you choose. A TYPE II error is a FALSE NEGATIVE — failing to detect a real effect, with probability beta; statistical POWER is 1-beta. The two trade off: lowering alpha to avoid false alarms makes you more likely to miss real effects. Which matters more is domain-dependent — a false positive in cancer screening causes anxiety and cost, a false negative can be fatal.',
      hinglish:
        'Ek TYPE I error ek FALSE POSITIVE hai — ek true null hypothesis reject karna, matlab ek aisa effect claim karna jo exist nahi karta. Iski probability alpha hai, wo significance level jo tum choose karte ho. Ek TYPE II error ek FALSE NEGATIVE hai — ek real effect detect na kar paana, probability beta ke saath; statistical POWER 1-beta hai. Dono trade off karte hain: false alarms avoid karne ke liye alpha kam karna tumhe real effects miss karne ki zyada sambhavna deta hai. Kaunsa zyada matter karta hai ye domain pe depend karta hai — cancer screening mein ek false positive anxiety aur cost deta hai, ek false negative fatal ho sakta hai.',
    },
  },
  {
    question: 'What is a confidence interval?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A confidence interval gives a RANGE of plausible values for a population parameter, rather than a single point estimate. The correct interpretation of "95% confidence" is about the PROCEDURE: if you repeated the sampling many times, 95% of the intervals constructed this way would contain the true parameter. It does NOT mean there is a 95% probability the true value lies in your particular interval — the true value is fixed, it is the interval that varies. Intervals narrow as sample size grows.',
      hinglish:
        'Ek confidence interval ek population parameter ke liye plausible values ki ek RANGE deta hai, ek single point estimate ke bajaye. "95% confidence" ka correct interpretation PROCEDURE ke baare mein hai: agar tum sampling bahut baar repeat karo, is tarah banaye gaye 95% intervals true parameter ko contain karenge. Iska matlab ye NAHI hai ki 95% probability hai ki true value tumhare particular interval mein hai — true value fixed hai, interval vary karta hai. Sample size badhne pe intervals sankuchit hote hain.',
    },
  },
  {
    question: 'What is the difference between correlation and causation?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Correlation means two variables move together; causation means one actually produces the change in the other. Correlation can arise without causation through a CONFOUNDER (ice cream sales and drownings both rise with temperature), REVERSE causation (you assumed A causes B when B causes A), or pure coincidence in large datasets. Establishing causation requires a randomised controlled experiment, or careful causal-inference techniques (instrumental variables, difference-in-differences) when experiments are impossible.',
      hinglish:
        'Correlation matlab do variables saath move karte hain; causation matlab ek actually doosre mein change produce karta hai. Correlation bina causation ke aa sakta hai ek CONFOUNDER se (ice cream sales aur drownings dono temperature ke saath badhte hain), REVERSE causation se (tumne maana A, B cause karta hai jabki B, A ko karta hai), ya bade datasets mein pure coincidence se. Causation establish karne ke liye ek randomised controlled experiment chahiye, ya jab experiments impossible hon tab careful causal-inference techniques (instrumental variables, difference-in-differences).',
    },
  },
  {
    question: 'How do you design and analyse an A/B test?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Before running: define ONE primary metric, state the minimum effect size worth detecting, and compute the required SAMPLE SIZE via power analysis — otherwise you cannot interpret the result. During: randomise assignment properly, run for whole business cycles (at least a full week to avoid day-of-week effects), and do not peek and stop early, which inflates false positives. After: check the p-value AND the confidence interval, verify the groups are balanced on key covariates, and beware running many metrics without correcting for multiple comparisons.',
      hinglish:
        'Chalane se pehle: EK primary metric define karo, detect karne layak minimum effect size batao, aur power analysis se required SAMPLE SIZE compute karo — warna tum result interpret nahi kar sakte. Dauraan: assignment properly randomise karo, poore business cycles ke liye chalao (day-of-week effects avoid karne ke liye kam se kam ek poora hafta), aur jhaank kar jaldi band mat karo, jo false positives badhata hai. Baad mein: p-value AUR confidence interval check karo, verify karo ki groups key covariates pe balanced hain, aur multiple comparisons correct kiye bina bahut metrics chalane se bacho.',
    },
  },
  {
    question: 'What is the multiple comparisons problem?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Every hypothesis test at alpha=0.05 has a 5% false-positive rate. Test 20 independent metrics and you expect roughly one "significant" result purely by chance, even when nothing real is happening. This is how teams accidentally ship changes based on noise, and it is the mechanism behind p-hacking. Corrections: Bonferroni (divide alpha by the number of tests — simple but very conservative) or Benjamini-Hochberg (controls the false discovery rate, more powerful). Best practice is to declare ONE primary metric in advance.',
      hinglish:
        'alpha=0.05 pe har hypothesis test ka ek 5% false-positive rate hai. 20 independent metrics test karo aur tum purely chance se roughly ek "significant" result expect karte ho, chahe kuch real ho hi nahi raha. Isi tarah teams galti se noise ke basis pe changes ship kar deti hain, aur yahi p-hacking ke peeche mechanism hai. Corrections: Bonferroni (alpha ko tests ki number se divide karo — simple par bahut conservative) ya Benjamini-Hochberg (false discovery rate control karta hai, zyada powerful). Best practice pehle se EK primary metric declare karna hai.',
    },
  },

  // ─── Data Handling ───────────────────────────────────────────
  {
    question: 'What steps do you take to clean a messy dataset?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A systematic pass: (1) inspect shape, dtypes, and a sample. (2) Handle MISSING values, deciding per column based on why they are missing. (3) Remove or investigate DUPLICATES. (4) Fix data TYPES (dates stored as strings, numbers with currency symbols). (5) Standardise inconsistent categories ("USA"/"U.S.A."/"us"). (6) Investigate OUTLIERS — decide whether they are errors or genuine extreme values. (7) Validate ranges and business rules (no negative ages). (8) Document every decision, since cleaning choices materially affect conclusions.',
      hinglish:
        'Ek systematic pass: (1) shape, dtypes, aur ek sample inspect karo. (2) MISSING values handle karo, per column decide karte hue ki wo kyun missing hain. (3) DUPLICATES remove ya investigate karo. (4) Data TYPES fix karo (dates strings ke roop mein stored, numbers currency symbols ke saath). (5) Inconsistent categories standardise karo ("USA"/"U.S.A."/"us"). (6) OUTLIERS investigate karo — decide karo wo errors hain ya genuine extreme values. (7) Ranges aur business rules validate karo (koi negative ages nahi). (8) Har decision document karo, kyunki cleaning choices conclusions ko materially affect karti hain.',
    },
  },
  {
    question: 'How do you detect and handle outliers?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'DETECT with: the IQR rule (outside Q1-1.5xIQR to Q3+1.5xIQR), z-scores beyond +/-3 (only valid for roughly normal data), visualisation (box plots, scatter plots), or model-based methods like Isolation Forest. HANDLE by first asking WHY: a data-entry error should be corrected or removed, but a genuine extreme value often carries the most important information — in fraud or anomaly detection the outliers ARE the signal. Options include capping (winsorising), transforming (log), or using robust models. Never delete outliers reflexively.',
      hinglish:
        'DETECT karo: IQR rule se (Q1-1.5xIQR se Q3+1.5xIQR ke bahar), +/-3 se aage z-scores (sirf roughly normal data ke liye valid), visualisation (box plots, scatter plots), ya Isolation Forest jaise model-based methods. HANDLE karo pehle KYUN poochh kar: ek data-entry error correct ya remove hona chahiye, par ek genuine extreme value aksar sabse important information rakhti hai — fraud ya anomaly detection mein outliers HI signal hain. Options mein capping (winsorising), transforming (log), ya robust models use karna shamil hai. Outliers ko kabhi reflexively delete mat karo.',
    },
  },
  {
    question: 'What is feature engineering and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Feature engineering is creating input variables that expose the underlying signal to a model more directly. Examples: extracting day-of-week and is-holiday from a timestamp, computing a ratio rather than giving two raw columns, aggregating a customer\'s past 30-day spend, binning a continuous variable, or encoding categoricals. It matters because a model can only learn from what you give it — good features frequently outperform a fancier algorithm on the same raw data, and domain knowledge is what makes them possible.',
      hinglish:
        'Feature engineering aise input variables banana hai jo underlying signal ko ek model ke saamne zyada directly expose karein. Examples: ek timestamp se day-of-week aur is-holiday nikalna, do raw columns dene ke bajaye ek ratio compute karna, ek customer ka past 30-day spend aggregate karna, ek continuous variable bin karna, ya categoricals encode karna. Ye isliye matter karta hai kyunki ek model sirf usi se seekh sakta hai jo tum use dete ho — achhe features usi raw data pe aksar ek fancier algorithm ko outperform karte hain, aur domain knowledge unhe possible banati hai.',
    },
  },
  {
    question: 'What is the difference between normalisation and standardisation?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'NORMALISATION (min-max scaling) rescales values into a fixed range, usually 0 to 1 — it preserves the shape of the distribution but is sensitive to outliers, since a single extreme value compresses everything else. STANDARDISATION (z-score) rescales to mean 0 and standard deviation 1 — it does not bound the range but handles outliers better and suits algorithms assuming roughly normal data. Both matter for distance-based methods (KNN, SVM, K-means) and gradient descent; tree-based models need neither.',
      hinglish:
        'NORMALISATION (min-max scaling) values ko ek fixed range mein rescale karta hai, usually 0 se 1 — ye distribution ka shape preserve karta hai par outliers ke liye sensitive hai, kyunki ek single extreme value baaki sab ko compress kar deti hai. STANDARDISATION (z-score) mean 0 aur standard deviation 1 pe rescale karta hai — ye range bound nahi karta par outliers better handle karta hai aur roughly normal data assume karne wale algorithms ko suit karta hai. Dono distance-based methods (KNN, SVM, K-means) aur gradient descent ke liye matter karte hain; tree-based models ko koi nahi chahiye.',
    },
  },
  {
    question: 'How do you encode categorical variables?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'ONE-HOT encoding creates a binary column per category — correct for nominal data with few categories, but explodes dimensionality with high-cardinality features. LABEL/ordinal encoding assigns integers — appropriate only when order genuinely exists (small/medium/large), since otherwise you falsely imply that category 3 is "greater than" category 1. TARGET encoding replaces a category with the mean target value — powerful for high cardinality but leaks badly unless computed within cross-validation folds. Tree models tolerate label encoding better than linear models do.',
      hinglish:
        'ONE-HOT encoding per category ek binary column banata hai — kam categories wale nominal data ke liye correct, par high-cardinality features ke saath dimensionality phaila deta hai. LABEL/ordinal encoding integers assign karta hai — sirf tab appropriate jab order genuinely exist kare (small/medium/large), kyunki warna tum galat imply karte ho ki category 3 category 1 se "bada" hai. TARGET encoding ek category ko mean target value se replace karta hai — high cardinality ke liye powerful par buri tarah leak karta hai jab tak cross-validation folds ke andar compute na ho. Tree models label encoding ko linear models se better tolerate karte hain.',
    },
  },
  {
    question: 'What is data leakage in data science?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Leakage is when information unavailable at real prediction time influences training, producing wonderful validation scores that collapse in production. Forms: TARGET leakage (a feature that is effectively a consequence of the outcome, like "cancellation_date" when predicting cancellation), TEMPORAL leakage (using future data for past predictions), and PREPROCESSING leakage (fitting a scaler or imputer on the full dataset before splitting). Guards: split FIRST then preprocess inside a pipeline, split time series chronologically, and be suspicious of any near-perfect score.',
      hinglish:
        'Leakage tab hai jab real prediction time pe unavailable information training ko influence kare, wonderful validation scores produce karte hue jo production mein collapse ho jaate hain. Forms: TARGET leakage (ek feature jo effectively outcome ka consequence hai, jaise cancellation predict karte waqt "cancellation_date"), TEMPORAL leakage (past predictions ke liye future data use karna), aur PREPROCESSING leakage (split karne se pehle full dataset pe ek scaler ya imputer fit karna). Guards: PEHLE split karo phir ek pipeline ke andar preprocess karo, time series ko chronologically split karo, aur kisi bhi near-perfect score pe shak karo.',
    },
  },
  {
    question: 'What is the curse of dimensionality?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'As the number of features grows, the volume of the feature space grows exponentially, so data becomes extremely SPARSE — points that seemed close together become roughly equidistant, which breaks distance-based algorithms like KNN and clustering. It also means the data needed to cover the space grows exponentially, so models overfit easily. Remedies: feature selection, dimensionality reduction (PCA), regularisation, and simply collecting more data or using algorithms less sensitive to dimensionality.',
      hinglish:
        'Jaise features ki number badhti hai, feature space ka volume exponentially badhta hai, isliye data extremely SPARSE ho jaata hai — wo points jo paas lagte the roughly equidistant ban jaate hain, jo KNN aur clustering jaise distance-based algorithms ko tod deta hai. Iska matlab bhi hai ki space cover karne ke liye chahiye data exponentially badhta hai, isliye models aasani se overfit karte hain. Remedies: feature selection, dimensionality reduction (PCA), regularisation, aur simply zyada data collect karna ya dimensionality ke liye kam sensitive algorithms use karna.',
    },
  },
  {
    question: 'What is PCA and when would you use it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PCA (Principal Component Analysis) finds new axes — linear combinations of the original features — ordered so the first captures the most variance, the second the next most, and so on. Keeping only the top components reduces dimensionality while retaining most of the information. Use it for visualisation, to reduce collinearity, or to speed up training. Caveats: you MUST standardise features first (otherwise large-scale features dominate), and the resulting components are not interpretable in domain terms.',
      hinglish:
        'PCA (Principal Component Analysis) naye axes dhundhta hai — original features ke linear combinations — is tarah ordered ki pehla sabse zyada variance capture kare, doosra agla sabse zyada, aur aage. Sirf top components rakhna dimensionality kam karta hai jabki zyadatar information retain karta hai. Ise visualisation, collinearity kam karne, ya training tez karne ke liye use karo. Caveats: tumhe pehle features standardise KARNE hi padenge (warna large-scale features dominate karte hain), aur resulting components domain terms mein interpretable nahi hote.',
    },
  },
  {
    question: 'How do you handle imbalanced datasets?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'First, change the METRIC — accuracy is useless when 99% of cases are one class, since predicting the majority always scores 99%. Use precision, recall, F1, or PR-AUC instead. Then options: resample (SMOTE to synthesise minority examples, or undersample the majority), apply CLASS WEIGHTS so minority errors cost more, adjust the decision THRESHOLD rather than defaulting to 0.5, or collect more minority data. Critically, resample only the TRAINING fold — resampling before splitting leaks synthetic data into validation.',
      hinglish:
        'Pehle, METRIC badlo — accuracy bekaar hai jab 99% cases ek class ke hon, kyunki majority predict karna hamesha 99% score karta hai. Uske bajaye precision, recall, F1, ya PR-AUC use karo. Phir options: resample karo (minority examples synthesise karne ke liye SMOTE, ya majority undersample), CLASS WEIGHTS apply karo taaki minority errors zyada cost karein, 0.5 pe default karne ke bajaye decision THRESHOLD adjust karo, ya zyada minority data collect karo. Critically, sirf TRAINING fold resample karo — split karne se pehle resample karna validation mein synthetic data leak karta hai.',
    },
  },

  // ─── Modelling & Evaluation ───────────────────────────────────────────
  {
    question: 'What is the bias-variance tradeoff?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'BIAS is error from overly simplistic assumptions — a high-bias model underfits, missing real patterns (a straight line through curved data). VARIANCE is error from excessive sensitivity to the training data — a high-variance model overfits, memorising noise and failing on new data. Increasing model complexity lowers bias but raises variance, and total error is minimised somewhere in the middle. Practically: underfitting shows poor train AND test scores; overfitting shows excellent train but poor test scores.',
      hinglish:
        'BIAS overly simplistic assumptions se error hai — ek high-bias model underfit karta hai, real patterns miss karte hue (curved data ke through ek straight line). VARIANCE training data ke liye excessive sensitivity se error hai — ek high-variance model overfit karta hai, noise memorise karta hai aur naye data pe fail hota hai. Model complexity badhana bias kam karta hai par variance badhata hai, aur total error kahin beech mein minimise hota hai. Practically: underfitting kharab train AUR test scores dikhata hai; overfitting excellent train par kharab test scores dikhata hai.',
    },
  },
  {
    question: 'What is cross-validation and why is it better than a single train-test split?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'K-fold cross-validation splits the data into k parts, trains on k-1 and validates on the held-out fold, rotating so every point is validated exactly once, then averages the scores. It is better than one split because a single split\'s score depends heavily on WHICH rows happened to land in the test set — especially with small data. CV gives a more stable estimate plus a variance across folds, telling you how sensitive your model is. For imbalanced data use STRATIFIED k-fold; for time series use forward-chaining, never random folds.',
      hinglish:
        'K-fold cross-validation data ko k parts mein split karta hai, k-1 pe train karta hai aur held-out fold pe validate karta hai, rotate karte hue taaki har point exactly ek baar validate ho, phir scores average karta hai. Ye ek split se better hai kyunki ek single split ka score bahut depend karta hai ki KAUNSI rows test set mein aayin — especially chhote data ke saath. CV ek zyada stable estimate plus folds ke across ek variance deta hai, tumhe batate hue ki tumhara model kitna sensitive hai. Imbalanced data ke liye STRATIFIED k-fold use karo; time series ke liye forward-chaining, kabhi random folds nahi.',
    },
  },
  {
    question: 'What is the difference between precision and recall?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PRECISION = of everything I flagged positive, what fraction actually was? It answers "how trustworthy are my alerts?" RECALL = of all actual positives, what fraction did I catch? It answers "how much am I missing?" They trade off: flagging more aggressively raises recall and lowers precision. Which matters depends on error cost — spam filtering favours precision (a lost real email is worse than one spam getting through), disease screening favours recall (a missed case is worse than a false alarm).',
      hinglish:
        'PRECISION = jo kuch maine positive flag kiya, usme se actually kitna fraction tha? Ye answer karta hai "mere alerts kitne trustworthy hain?" RECALL = saare actual positives mein se, maine kitna fraction pakda? Ye answer karta hai "main kitna miss kar raha hoon?" Ye trade off karte hain: zyada aggressively flag karna recall badhata hai aur precision kam karta hai. Kaunsa matter karta hai ye error cost pe depend karta hai — spam filtering precision favour karta hai (ek khoya real email ek spam nikal jaane se bura hai), disease screening recall favour karta hai (ek missed case ek false alarm se bura hai).',
    },
  },
  {
    question: 'What is the F1 score and when is it the wrong metric?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'F1 is the HARMONIC mean of precision and recall — harmonic rather than arithmetic so that a very low value in either drags the score down, preventing a model from looking good by maximising just one. It is useful for imbalanced data where accuracy misleads. It is the WRONG metric when precision and recall matter unequally (use F-beta to weight one higher), when you need calibrated probabilities rather than a hard classification, or when true negatives genuinely matter — F1 ignores them entirely.',
      hinglish:
        'F1 precision aur recall ka HARMONIC mean hai — arithmetic ke bajaye harmonic taaki kisi bhi ek mein bahut low value score ko neeche kheenche, ek model ko sirf ek maximise karke achha dikhne se rokte hue. Ye imbalanced data ke liye useful hai jahan accuracy misleading hai. Ye GALAT metric hai jab precision aur recall unequally matter karein (ek ko zyada weight dene ke liye F-beta use karo), jab tumhe ek hard classification ke bajaye calibrated probabilities chahiye, ya jab true negatives genuinely matter karein — F1 unhe poori tarah ignore karta hai.',
    },
  },
  {
    question: 'What is ROC-AUC and when should you prefer PR-AUC?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'ROC-AUC plots true positive rate against false positive rate across all thresholds; it equals the probability the model ranks a random positive above a random negative, and 0.5 means random guessing. The problem: with severe class imbalance, the false positive rate stays deceptively low because the negative class is enormous, so ROC-AUC looks great even for a weak model. PR-AUC (precision vs recall) focuses on the positive class and is far more informative for rare-event problems like fraud.',
      hinglish:
        'ROC-AUC saare thresholds ke across true positive rate ko false positive rate ke against plot karta hai; ye us probability ke barabar hai ki model ek random positive ko ek random negative se upar rank kare, aur 0.5 matlab random guessing. Problem: severe class imbalance ke saath, false positive rate deceptively low rehta hai kyunki negative class enormous hai, isliye ROC-AUC ek weak model ke liye bhi great dikhta hai. PR-AUC (precision vs recall) positive class pe focus karta hai aur fraud jaise rare-event problems ke liye bahut zyada informative hai.',
    },
  },
  {
    question: 'How do you explain a confusion matrix?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A confusion matrix cross-tabulates predictions against actual labels: TRUE POSITIVES (correctly predicted positive), TRUE NEGATIVES (correctly predicted negative), FALSE POSITIVES (predicted positive but actually negative — Type I error), and FALSE NEGATIVES (predicted negative but actually positive — Type II error). Every classification metric derives from these four cells: precision is TP/(TP+FP), recall is TP/(TP+FN), accuracy is (TP+TN)/total. It is the first thing to inspect because it shows exactly HOW a model is wrong, not just how often.',
      hinglish:
        'Ek confusion matrix predictions ko actual labels ke against cross-tabulate karta hai: TRUE POSITIVES (correctly positive predict), TRUE NEGATIVES (correctly negative predict), FALSE POSITIVES (positive predict par actually negative — Type I error), aur FALSE NEGATIVES (negative predict par actually positive — Type II error). Har classification metric in chaar cells se nikalta hai: precision TP/(TP+FP) hai, recall TP/(TP+FN), accuracy (TP+TN)/total. Ye sabse pehle inspect karne wali cheez hai kyunki ye exactly dikhata hai ki ek model KAISE galat hai, sirf kitni baar nahi.',
    },
  },
  {
    question: 'What is regularisation and how do L1 and L2 differ?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Regularisation adds a penalty on model complexity to the loss function, discouraging the large coefficients that cause overfitting. L2 (Ridge) penalises the SQUARE of coefficients, shrinking them all toward zero but rarely to exactly zero — good when many features contribute a little. L1 (Lasso) penalises the ABSOLUTE value, which drives some coefficients exactly to zero, performing automatic FEATURE SELECTION — good when you believe most features are irrelevant. Elastic Net combines both.',
      hinglish:
        'Regularisation loss function mein model complexity pe ek penalty add karta hai, un bade coefficients ko discourage karte hue jo overfitting cause karte hain. L2 (Ridge) coefficients ke SQUARE ko penalise karta hai, un sabko zero ki taraf shrink karte hue par rarely exactly zero tak — achha jab bahut features thoda-thoda contribute karein. L1 (Lasso) ABSOLUTE value penalise karta hai, jo kuch coefficients ko exactly zero tak le jaata hai, automatic FEATURE SELECTION karte hue — achha jab tum maano ki zyadatar features irrelevant hain. Elastic Net dono combine karta hai.',
    },
  },
  {
    question: 'What is the difference between supervised, unsupervised, and reinforcement learning?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'SUPERVISED learning trains on labelled examples to predict a known target — classification and regression. UNSUPERVISED learning finds structure in unlabelled data — clustering, dimensionality reduction, anomaly detection — with no ground truth to score against, making evaluation genuinely harder. REINFORCEMENT learning has an agent take ACTIONS in an environment and learn from rewards over time, suited to sequential decision problems like game playing and robotics where the right action depends on long-term consequences.',
      hinglish:
        'SUPERVISED learning ek known target predict karne ke liye labelled examples pe train karti hai — classification aur regression. UNSUPERVISED learning unlabelled data mein structure dhundhti hai — clustering, dimensionality reduction, anomaly detection — score karne ke liye koi ground truth nahi, evaluation ko genuinely mushkil banate hue. REINFORCEMENT learning mein ek agent ek environment mein ACTIONS leta hai aur time ke saath rewards se seekhta hai, game playing aur robotics jaise sequential decision problems ke liye suited jahan sahi action long-term consequences pe depend karta hai.',
    },
  },
  {
    question: 'How do you choose between different ML algorithms?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Consider: PROBLEM type (classification/regression/clustering), DATA SIZE (deep learning needs a lot; simple models work on small data), INTERPRETABILITY requirements (regulated domains may forbid a black box), TRAINING and INFERENCE constraints, and data structure (tabular data still favours gradient boosting; images and text favour neural networks). Practical approach: establish a simple BASELINE first (logistic regression, or predicting the mean), then only add complexity that measurably beats it.',
      hinglish:
        'Consider karo: PROBLEM type (classification/regression/clustering), DATA SIZE (deep learning ko bahut chahiye; simple models chhote data pe kaam karte hain), INTERPRETABILITY requirements (regulated domains ek black box forbid kar sakte hain), TRAINING aur INFERENCE constraints, aur data structure (tabular data abhi bhi gradient boosting favour karta hai; images aur text neural networks). Practical approach: pehle ek simple BASELINE banao (logistic regression, ya mean predict karna), phir sirf wo complexity add karo jo use measurably beat kare.',
    },
  },
  {
    question: 'What is the difference between bagging and boosting?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Both are ensembles but work oppositely. BAGGING trains many models INDEPENDENTLY in parallel on bootstrap samples and averages them — this reduces VARIANCE, making it ideal for high-variance learners like deep decision trees (Random Forest). BOOSTING trains models SEQUENTIALLY, each one focusing on the errors of the previous — this reduces BIAS and usually achieves higher accuracy (XGBoost, LightGBM), but is more prone to overfitting noise and cannot be parallelised across trees.',
      hinglish:
        'Dono ensembles hain par ulta kaam karte hain. BAGGING bootstrap samples pe bahut models INDEPENDENTLY parallel mein train karta hai aur average karta hai — ye VARIANCE kam karta hai, ise deep decision trees jaise high-variance learners ke liye ideal banate hue (Random Forest). BOOSTING models SEQUENTIALLY train karta hai, har ek pichhle ke errors pe focus karte hue — ye BIAS kam karta hai aur usually higher accuracy achieve karta hai (XGBoost, LightGBM), par noise overfit karne ke liye zyada prone hai aur trees ke across parallelise nahi ho sakta.',
    },
  },

  // ─── Practice & Communication ───────────────────────────────────────────
  {
    question: 'What does a typical data science project lifecycle look like?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '(1) Define the BUSINESS problem and how success will be measured — skipping this produces technically impressive but useless models. (2) Acquire and understand the data. (3) EDA to find patterns, quality problems, and shape hypotheses. (4) Clean and engineer features — typically the bulk of the effort. (5) Model, starting with a simple baseline. (6) Evaluate against the business metric, not just the loss. (7) Deploy. (8) Monitor and iterate. It is genuinely cyclical: findings at any stage frequently send you back.',
      hinglish:
        '(1) BUSINESS problem define karo aur success kaise measure hogi — ise skip karna technically impressive par useless models produce karta hai. (2) Data acquire aur samjho. (3) Patterns, quality problems, aur hypotheses banane ke liye EDA. (4) Features clean aur engineer karo — typically effort ka zyadatar hissa. (5) Model banao, ek simple baseline se shuru karke. (6) Business metric ke against evaluate karo, sirf loss ke nahi. (7) Deploy karo. (8) Monitor aur iterate karo. Ye genuinely cyclical hai: kisi bhi stage pe findings frequently tumhe wapas bhej dete hain.',
    },
  },
  {
    question: 'What is EDA and what do you actually look for?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Exploratory Data Analysis is understanding the data before modelling. Look for: the DISTRIBUTION of each variable (skew, multimodality), MISSING data patterns (is missingness itself informative?), OUTLIERS, RELATIONSHIPS between features and with the target (correlation matrices, scatter plots), CLASS balance, and data quality problems (impossible values, inconsistent categories, duplicates). The output is not just charts — it is a set of hypotheses and a list of the cleaning and feature-engineering decisions the data demands.',
      hinglish:
        'Exploratory Data Analysis modelling se pehle data samajhna hai. Dekho: har variable ka DISTRIBUTION (skew, multimodality), MISSING data patterns (kya missingness khud informative hai?), OUTLIERS, features ke beech aur target ke saath RELATIONSHIPS (correlation matrices, scatter plots), CLASS balance, aur data quality problems (impossible values, inconsistent categories, duplicates). Output sirf charts nahi hai — ye hypotheses ka ek set aur un cleaning aur feature-engineering decisions ki list hai jo data demand karta hai.',
    },
  },
  {
    question: 'How do you present technical findings to a non-technical audience?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Lead with the ANSWER and its business implication, not the methodology — executives want the conclusion first, with detail available on request. Translate metrics into money or user impact ("this reduces churn by 3%, roughly 2 crore annually") rather than quoting AUC. Use simple visuals over tables. Be explicit about UNCERTAINTY and assumptions in plain language. End with a concrete recommended ACTION. The most common failure is presenting the analytical journey chronologically instead of the decision-relevant result.',
      hinglish:
        'ANSWER aur uske business implication se shuru karo, methodology se nahi — executives ko pehle conclusion chahiye, detail request pe available. Metrics ko paise ya user impact mein translate karo ("ye churn 3% kam karta hai, roughly 2 crore salana") AUC quote karne ke bajaye. Tables ke bajaye simple visuals use karo. UNCERTAINTY aur assumptions ke baare mein plain language mein explicit raho. Ek concrete recommended ACTION pe khatam karo. Sabse common failure decision-relevant result ke bajaye analytical journey chronologically present karna hai.',
    },
  },
  {
    question: 'What is the difference between a data scientist, data analyst, and data engineer?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A DATA ENGINEER builds the infrastructure — pipelines, warehouses, and data quality systems that make reliable data available. A DATA ANALYST answers questions about what HAPPENED and why, using SQL, dashboards, and statistics to drive decisions. A DATA SCIENTIST focuses on what WILL happen or what to do about it, building predictive/statistical models and experiments. Roles overlap heavily and vary by company: in a small startup one person does all three, in a large company they are distinct teams.',
      hinglish:
        'Ek DATA ENGINEER infrastructure banata hai — pipelines, warehouses, aur data quality systems jo reliable data available karte hain. Ek DATA ANALYST is baare mein sawaal answer karta hai ki kya HUA aur kyun, SQL, dashboards, aur statistics use karke decisions drive karne ke liye. Ek DATA SCIENTIST is pe focus karta hai ki kya HOGA ya uske baare mein kya karna hai, predictive/statistical models aur experiments banate hue. Roles heavily overlap karte hain aur company se vary karte hain: ek chhote startup mein ek insaan teeno karta hai, ek badi company mein ye distinct teams hain.',
    },
  },
  {
    question: 'How do you validate that a model is actually working in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Offline scores are not evidence of production success. Validate by: monitoring the actual BUSINESS metric the model was meant to move; tracking prediction distribution for sudden shifts; comparing predictions against ground truth as labels arrive (often delayed); watching input feature drift; and, most convincingly, running an A/B test against the previous system or no model at all. Also check performance per data SLICE, since a model can improve overall while degrading for an important segment.',
      hinglish:
        'Offline scores production success ka evidence nahi hain. Validate karo: us actual BUSINESS metric ko monitor karke jise model ko move karna tha; sudden shifts ke liye prediction distribution track karke; labels aane pe (aksar delayed) predictions ko ground truth ke against compare karke; input feature drift dekhte hue; aur, sabse convincingly, previous system ya bilkul koi model nahi ke against ek A/B test chalake. Per data SLICE performance bhi check karo, kyunki ek model overall improve karte hue ek important segment ke liye degrade kar sakta hai.',
    },
  },
  {
    question: 'What is survivorship bias and can you give an example?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Survivorship bias is drawing conclusions only from the cases that "survived" some selection, while the failures are invisible. The classic example: WWII engineers wanted to armour the bullet-hole-covered areas of returning planes, until Abraham Wald pointed out those were exactly the survivable hits — the planes hit elsewhere never came back, so the UNMARKED areas needed armour. In data science it appears as analysing only current customers (ignoring churned ones) or only successful startups, producing systematically wrong conclusions.',
      hinglish:
        'Survivorship bias sirf un cases se conclusions nikaalna hai jo kisi selection se "bache", jabki failures invisible hain. Classic example: WWII engineers wapas aaye planes ke bullet-hole-covered areas pe armour lagana chahte the, jab tak Abraham Wald ne point out nahi kiya ki wo exactly survivable hits the — jo planes kahin aur hit hue wo kabhi wapas hi nahi aaye, isliye UNMARKED areas ko armour chahiye tha. Data science mein ye sirf current customers analyse karne (churned wale ignore karke) ya sirf successful startups ke roop mein aata hai, systematically galat conclusions produce karte hue.',
    },
  },
  {
    question: 'What is Simpson\'s paradox?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Simpson\'s paradox is when a trend that appears in separate groups REVERSES when the groups are combined. The famous case: UC Berkeley admissions appeared to favour men overall, yet within nearly every individual department women were admitted at equal or higher rates — because women applied disproportionately to the most competitive departments. It matters enormously in practice: it means aggregate statistics can point in the opposite direction to reality, so you must check whether a confounding grouping variable exists before concluding anything.',
      hinglish:
        'Simpson ka paradox tab hai jab separate groups mein dikhne wala ek trend groups combine hone pe ULTA ho jaaye. Famous case: UC Berkeley admissions overall men ko favour karte lage, phir bhi lagbhag har individual department ke andar women equal ya higher rates pe admit hui — kyunki women ne disproportionately sabse competitive departments mein apply kiya. Ye practically enormously matter karta hai: iska matlab aggregate statistics reality ke ulti direction mein point kar sakte hain, isliye kuch bhi conclude karne se pehle tumhe check karna padta hai ki koi confounding grouping variable exist karta hai ya nahi.',
    },
  },
  {
    question: 'What sampling methods do you know?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'SIMPLE RANDOM sampling gives every unit equal probability — unbiased but may under-represent small subgroups by chance. STRATIFIED sampling divides the population into strata and samples within each, guaranteeing representation of every group and usually reducing variance. CLUSTER sampling randomly selects whole groups (e.g. entire schools) — cheaper logistically but less precise. SYSTEMATIC sampling takes every nth unit — simple, but dangerous if the data has periodicity matching n.',
      hinglish:
        'SIMPLE RANDOM sampling har unit ko equal probability deta hai — unbiased par chance se chhote subgroups ko under-represent kar sakta hai. STRATIFIED sampling population ko strata mein divide karke har ek ke andar sample karta hai, har group ka representation guarantee karte hue aur usually variance kam karte hue. CLUSTER sampling randomly poore groups select karta hai (jaise poore schools) — logistically sasta par kam precise. SYSTEMATIC sampling har nth unit leta hai — simple, par khatarnak agar data mein n se match karti periodicity ho.',
    },
  },
  {
    question: 'What is the difference between a parametric and non-parametric model?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A PARAMETRIC model assumes a fixed functional form with a FIXED number of parameters regardless of data size — linear regression has one coefficient per feature whether you have 100 or 100 million rows. It is fast, interpretable, and data-efficient, but wrong if the assumed form does not match reality. A NON-PARAMETRIC model lets complexity GROW with the data (KNN, decision trees, kernel methods) — far more flexible, but needs more data, more compute, and overfits more readily.',
      hinglish:
        'Ek PARAMETRIC model ek fixed functional form assume karta hai ek FIXED number of parameters ke saath, data size chahe kuch bhi ho — linear regression mein per feature ek coefficient hai chahe tumhare paas 100 rows hon ya 100 million. Ye fast, interpretable, aur data-efficient hai, par galat hai agar assumed form reality se match na kare. Ek NON-PARAMETRIC model complexity ko data ke saath BADHNE deta hai (KNN, decision trees, kernel methods) — bahut zyada flexible, par zyada data, zyada compute chahiye, aur zyada aasani se overfit karta hai.',
    },
  },
  {
    question: 'How would you approach a problem where you have very little data?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Options in rough order: use SIMPLER models with strong inductive bias (linear/regularised models beat deep nets on small data); apply TRANSFER LEARNING or a pre-trained model so you only fine-tune; use cross-validation rather than a single holdout to extract maximum signal; AUGMENT the data where the domain allows; incorporate domain knowledge through feature engineering or Bayesian priors; and consider whether the problem can be reframed to use more plentiful proxy data. Also be honest about uncertainty — small data means wide confidence intervals.',
      hinglish:
        'Roughly order mein options: strong inductive bias wale SIMPLER models use karo (chhote data pe linear/regularised models deep nets ko beat karte hain); TRANSFER LEARNING ya ek pre-trained model apply karo taaki tum sirf fine-tune karo; maximum signal nikalne ke liye ek single holdout ke bajaye cross-validation use karo; jahan domain allow kare wahan data AUGMENT karo; feature engineering ya Bayesian priors ke through domain knowledge incorporate karo; aur consider karo ki kya problem ko zyada plentiful proxy data use karne ke liye reframe kiya ja sakta hai. Uncertainty ke baare mein honest bhi raho — chhota data matlab chaude confidence intervals.',
    },
  },
  {
    question: 'What is the difference between covariance and correlation?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Both measure how two variables move together, but COVARIANCE is unbounded and expressed in the product of the two units, making its magnitude impossible to interpret — a covariance of 500 tells you the direction but nothing about strength. CORRELATION is covariance NORMALISED by both standard deviations, producing a unit-free value between -1 and +1 where the magnitude is directly interpretable. That is why correlation is used for comparison and covariance mainly appears inside other calculations like PCA.',
      hinglish:
        'Dono measure karte hain ki do variables saath kaise move karte hain, par COVARIANCE unbounded hai aur do units ke product mein expressed, jo iski magnitude interpret karna impossible banata hai — 500 ka ek covariance tumhe direction batata hai par strength ke baare mein kuch nahi. CORRELATION covariance hai jo dono standard deviations se NORMALISED hai, -1 aur +1 ke beech ek unit-free value produce karte hue jahan magnitude directly interpretable hai. Isiliye correlation comparison ke liye use hota hai aur covariance mainly PCA jaise doosre calculations ke andar aata hai.',
    },
  },
  {
    question: 'What is skewness and why does it matter?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Skewness measures asymmetry in a distribution. RIGHT (positive) skew has a long tail toward high values, pulling the mean above the median — income and web session durations are classic examples. LEFT skew is the mirror image. It matters because many statistical methods assume symmetry, the mean stops being a representative summary, and models can be dominated by the tail. Remedies: report the median instead, apply a log transform, or use models robust to skewed inputs.',
      hinglish:
        'Skewness ek distribution mein asymmetry measure karta hai. RIGHT (positive) skew mein high values ki taraf ek lambi tail hoti hai, mean ko median ke upar kheenchte hue — income aur web session durations classic examples hain. LEFT skew iska mirror image hai. Ye isliye matter karta hai kyunki bahut statistical methods symmetry assume karte hain, mean ek representative summary rehna band kar deta hai, aur models tail se dominate ho sakte hain. Remedies: uske bajaye median report karo, ek log transform apply karo, ya skewed inputs ke liye robust models use karo.',
    },
  },
  {
    question: 'What is hypothesis testing and what are the steps?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Hypothesis testing decides whether data provides enough evidence to reject a default assumption. Steps: (1) state the NULL hypothesis (no effect) and the ALTERNATIVE. (2) Choose a significance level alpha BEFORE seeing results. (3) Pick the appropriate test for your data type and assumptions (t-test, chi-squared, ANOVA). (4) Compute the test statistic and p-value. (5) Reject the null if p is below alpha. Crucially, failing to reject is NOT proof the null is true — absence of evidence is not evidence of absence.',
      hinglish:
        'Hypothesis testing decide karta hai ki data ek default assumption reject karne ke liye kaafi evidence deta hai ya nahi. Steps: (1) NULL hypothesis (koi effect nahi) aur ALTERNATIVE batao. (2) Results dekhne se PEHLE ek significance level alpha choose karo. (3) Apne data type aur assumptions ke liye appropriate test chuno (t-test, chi-squared, ANOVA). (4) Test statistic aur p-value compute karo. (5) Agar p alpha se neeche hai to null reject karo. Crucially, reject na kar paana ye PROOF NAHI hai ki null true hai — evidence ki absence, absence ka evidence nahi hai.',
    },
  },
  {
    question: 'How do you decide whether a data science project is worth doing?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Assess four things before writing code. VALUE: what decision changes if this works, and what is that worth? A model nobody acts on has zero value regardless of accuracy. FEASIBILITY: does the necessary data exist, at sufficient quality and volume? BASELINE: what does the current approach achieve, and is beating it meaningfully plausible? COST: engineering time, infrastructure, and ongoing maintenance. Many projects fail not technically but because nobody defined what action the output would drive.',
      hinglish:
        'Code likhne se pehle chaar cheezein assess karo. VALUE: ye kaam kare to kaunsa decision badalta hai, aur uski keemat kya hai? Ek model jispe koi act nahi karta uski accuracy chahe kuch bhi ho, value zero hai. FEASIBILITY: kya zaroori data exist karta hai, sufficient quality aur volume pe? BASELINE: current approach kya achieve karta hai, aur use meaningfully beat karna plausible hai? COST: engineering time, infrastructure, aur ongoing maintenance. Bahut projects technically nahi balki isliye fail hote hain kyunki kisi ne define hi nahi kiya ki output kaunsa action drive karega.',
    },
  },
  {
    question: 'What is time series data and how does modelling it differ?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Time series data has an inherent temporal ORDER, which breaks the standard assumption that observations are independent. Consequences: you must NEVER split randomly (that leaks future into past) — use chronological or forward-chaining validation. You must handle seasonality, trend, and autocorrelation explicitly. Features often include lags and rolling windows, computed carefully to avoid using future information. Standard cross-validation, random shuffling, and ordinary train-test splits all produce misleadingly good results on time series.',
      hinglish:
        'Time series data mein ek inherent temporal ORDER hota hai, jo ye standard assumption todta hai ki observations independent hain. Consequences: tumhe KABHI randomly split nahi karna chahiye (wo future ko past mein leak karta hai) — chronological ya forward-chaining validation use karo. Tumhe seasonality, trend, aur autocorrelation explicitly handle karne padte hain. Features mein aksar lags aur rolling windows shamil hote hain, carefully compute kiye taaki future information use na ho. Standard cross-validation, random shuffling, aur ordinary train-test splits sab time series pe misleadingly achhe results produce karte hain.',
    },
  },
  {
    question: 'What is clustering and how do you choose the number of clusters?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Clustering groups similar points without labels — K-means (fast, assumes spherical clusters, needs k in advance), hierarchical (produces a dendrogram, no k needed upfront), and DBSCAN (finds arbitrary shapes and labels outliers, no k needed). To choose k: the ELBOW method plots within-cluster variance against k and looks for the bend, while SILHOUETTE score measures how well-separated clusters are. Neither is definitive — the honest answer is that the best k is usually the one that produces groups your domain experts find meaningful and actionable.',
      hinglish:
        'Clustering bina labels ke similar points group karta hai — K-means (fast, spherical clusters assume karta hai, k pehle chahiye), hierarchical (ek dendrogram produce karta hai, upfront k nahi chahiye), aur DBSCAN (arbitrary shapes dhundhta hai aur outliers label karta hai, k nahi chahiye). k choose karne ke liye: ELBOW method within-cluster variance ko k ke against plot karke bend dhundhta hai, jabki SILHOUETTE score measure karta hai ki clusters kitne well-separated hain. Koi bhi definitive nahi — honest jawab ye hai ki best k usually wo hai jo aise groups produce kare jinhe tumhare domain experts meaningful aur actionable paayein.',
    },
  },
  {
    question: 'What is the difference between a population and a sample?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The POPULATION is every member of the group you care about; a SAMPLE is the subset you actually measure. You almost always work with samples because measuring the whole population is impractical or impossible. This distinction drives all of inferential statistics: sample statistics (mean, standard deviation) are ESTIMATES of the true population parameters, always carrying uncertainty — which is precisely why confidence intervals and significance tests exist, and why a biased sample invalidates every conclusion drawn from it.',
      hinglish:
        'POPULATION us group ka har member hai jiski tumhe parwah hai; ek SAMPLE wo subset hai jise tum actually measure karte ho. Tum almost hamesha samples ke saath kaam karte ho kyunki poori population measure karna impractical ya impossible hai. Yahi distinction saari inferential statistics chalati hai: sample statistics (mean, standard deviation) true population parameters ke ESTIMATES hain, hamesha uncertainty rakhte hue — jo exactly wajah hai ki confidence intervals aur significance tests exist karte hain, aur ek biased sample usse nikala har conclusion invalid kar deta hai.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
