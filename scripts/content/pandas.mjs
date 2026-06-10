// Pandas curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs / sql.mjs, consumed by scripts/seed.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Pandas',
  slug: 'pandas',
  description:
    'Data analysis ka king tool — DataFrames, cleaning, grouping aur analysis. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🐼',
  tags: ['pandas', 'python', 'data-science', 'dataframe', 'analysis'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 22,
};

const beginner = [
  {
    title: 'Pandas Basics',
    level: 'beginner',
    description: 'Pandas kya hai, Series vs DataFrame, import karna, DataFrame banana aur CSV padhna.',
    concepts: [
      {
        title: 'The Story of Pandas — What, Why & How',
        difficulty: 'easy',
        tags: ['intro', 'story', 'basics'],
        explanation: {
          english:
            'Meet Anjali, a data analyst at a growing e-commerce startup in Bengaluru. 📊 One Monday her manager drops a giant Excel sheet on her desk — 1 lakh rows of sales data from across India — and says "I need the top city by revenue before lunch." Anjali opens the file and Excel starts lagging. She tries sorting, the laptop fan screams. She manually scrolls, copies city totals into a side sheet, and three hours later she is still adding numbers, praying she did not miss a row. By the time she finds the answer (Mumbai, by the way), lunch is long gone. 😩\n\nNow imagine a different Monday. Anjali opens her laptop, writes five lines of code, hits run, and in under a second the screen prints: Mumbai — Rs 42,80,000. Done. She spends the rest of the morning sipping filter coffee. That magic tool is Pandas.\n\nSo WHAT is Pandas? Pandas is a Python library for data analysis. Its star feature is the DataFrame — a labeled, table-like structure (rows and columns, just like Excel) that lives in your code. You also get the Series, a single labeled column. Pandas is built on top of NumPy, so it is fast, and it is THE tool for data analysis in Python.\n\nWHY does it exist? Because real-world data is big and messy. Excel chokes on large files, and clicking around by hand is slow and error-prone. Pandas gives you Excel-like power but in code: it handles huge datasets, makes cleaning (missing values, duplicates) easy, and lets you group, filter, and merge data with a single line each. Best of all, your steps are written down — reproducible and shareable, not lost in random clicks.\n\nHOW does it work? The flow is simple: first you load data into a DataFrame (e.g. pd.read_csv on a file). Then you explore it (head, info, describe), clean it, and finally filter, group, or transform it using short, readable methods. You describe WHAT you want — "group by city, sum the revenue, sort descending" — and Pandas does the heavy lifting. That is how Anjali went from three hours to three seconds. 🚀',
          hinglish:
            'Milo Anjali se, Bengaluru ki ek badhti e-commerce startup mein data analyst. 📊 Ek Monday uska manager ek bada Excel sheet uske desk pe rakhta hai — poore India ki 1 lakh rows ki sales data — aur kehta hai "Lunch se pehle top city by revenue chahiye." Anjali file kholti hai aur Excel lag karne lagta hai. Sort karne ki koshish karti hai, laptop ka fan chillane lagta hai. Manually scroll karti hai, city totals ek side sheet mein copy karti hai, aur teen ghante baad bhi numbers add kar rahi hai, dua maangte hue ki koi row miss na ho gayi ho. Jab tak jawab milta hai (waise Mumbai), tab tak lunch kab ka khatam ho chuka hota hai. 😩\n\nAb ek alag Monday socho. Anjali laptop kholti hai, paanch lines code likhti hai, run dabati hai, aur ek second se bhi kam mein screen print karti hai: Mumbai — Rs 42,80,000. Ho gaya. Baaki subah woh filter coffee peeti hai. Yahi jaadui tool hai Pandas.\n\nToh Pandas hai KYA? Pandas Python ki ek library hai data analysis ke liye. Iska star feature hai DataFrame — ek labeled, table jaisi structure (rows aur columns, bilkul Excel jaisi) jo tumhare code mein rehti hai. Ek Series bhi milti hai, jo ek single labeled column hai. Pandas NumPy ke upar bana hai, isliye fast hai, aur Python mein data analysis ka THE tool hai.\n\nYe exist KYUN karta hai? Kyunki real-world data bada aur messy hota hai. Excel badi files pe atak jaata hai, aur haath se click karna slow aur galtiyon bhara hota hai. Pandas tumhe Excel jaisi power deta hai par code mein: ye huge datasets handle karta hai, cleaning (missing values, duplicates) aasan banata hai, aur grouping, filtering, merging ek-ek line mein karwa deta hai. Sabse acchi baat — tumhare steps likhe rehte hain, reproducible aur shareable, random clicks mein gum nahi.\n\nKAISE kaam karta hai? Flow simple hai: pehle data ko DataFrame mein load karo (jaise file pe pd.read_csv). Phir explore karo (head, info, describe), clean karo, aur aakhir mein filter, group ya transform karo chhote, readable methods se. Tum batate ho ki KYA chahiye — "city se group karo, revenue sum karo, descending sort karo" — aur Pandas saara bhaari kaam karta hai. Isi tarah Anjali teen ghante se teen second pe aa gayi. 🚀',
        },
        dailyLifeExample:
          'Anjali ka 1 lakh-row sales Excel sheet socho: haath se top city dhoondhne mein 3 ghante aur galti ka dar. Pandas mein 5 line code likho, run karo, aur 1 second mein answer — Mumbai. Wahi Excel wali soch, par code ki speed aur sachaai ke saath.',
        codeExample:
          'import pandas as pd\n\n# Load a big messy sales sheet into a DataFrame\ndf = pd.read_csv(\'sales.csv\')\n\n# Question: which city earned the most revenue?\n# Group by city, sum revenue, sort, take the top one\ntop = df.groupby(\'city\')[\'revenue\'].sum().sort_values(ascending=False)\nprint(top.head(1))\n\n# Output (example):\n# city\n# Mumbai    4280000\n# Name: revenue, dtype: int64\n\n# Three hours of Excel -> one line of Pandas.',
        keyPoints: [
          'Pandas is THE Python library for data analysis',
          'DataFrame = a labeled table (rows + columns) in code',
          'Series = a single labeled column',
          'Built on NumPy: fast, handles big data, easy cleaning/grouping/merging',
          'Flow: load -> explore -> clean -> filter/group/transform',
        ],
        quiz: [
          {
            question: 'What is the main data structure Pandas is known for?',
            options: [
              'A linked list',
              'The DataFrame, a labeled table of rows and columns',
              'A binary tree',
              'A plain Python dictionary only',
            ],
            correctIndex: 1,
          },
          {
            question: 'Pandas is built on top of which library?',
            options: ['Matplotlib', 'NumPy', 'Django', 'Flask'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is Pandas and why is it used in data analysis?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'Pandas is an open-source Python library for data manipulation and analysis. Its core structures are the Series (1D labeled array) and the DataFrame (2D labeled table). Built on NumPy, it makes loading data (CSV, Excel, SQL), cleaning missing values, filtering, grouping, merging, and reshaping fast and readable. It is widely used because it brings Excel-like power into reproducible code that scales to large datasets.',
              hinglish:
                'Pandas ek open-source Python library hai data manipulation aur analysis ke liye. Iski core structures hain Series (1D labeled array) aur DataFrame (2D labeled table). NumPy ke upar bana hai, isliye data load karna (CSV, Excel, SQL), missing values clean karna, filter, group, merge aur reshape karna fast aur readable ho jaata hai. Ye isliye popular hai kyunki ye Excel jaisi power ko reproducible code mein laata hai jo bade datasets pe scale karta hai.',
            },
          },
        ],
      },
      {
        title: 'Series vs DataFrame',
        difficulty: 'easy',
        tags: ['series', 'dataframe', 'structures'],
        explanation: {
          english:
            'Pandas has two main structures. A Series is a one-dimensional labeled array — think of a single column with an index. A DataFrame is two-dimensional — a full table made of multiple Series sharing the same index (one Series per column). You usually create a DataFrame from a dictionary, where each key becomes a column name and each value (a list) becomes that column data.',
          hinglish:
            'Pandas mein do main structures hain. Series ek one-dimensional labeled array hai — ek single column socho jiska apna index hai. DataFrame two-dimensional hai — ek poora table jo kai Series se milkar banta hai jo same index share karti hain (har column ke liye ek Series). Aam taur pe tum DataFrame ek dictionary se banate ho, jahan har key column ka naam banti hai aur har value (ek list) us column ka data banti hai.',
        },
        dailyLifeExample:
          'Series ek register ka single column hai jaise sirf "Marks" wala column. DataFrame poora register hai — Roll No, Naam aur Marks columns ek saath. Har column akeli ek Series hai; sab milkar table banate hain.',
        codeExample:
          'import pandas as pd\n\n# A Series: one labeled column\nmarks = pd.Series([88, 92, 75], index=[\'Aarav\', \'Priya\', \'Rohan\'])\nprint(marks)\n# Aarav    88\n# Priya    92\n# Rohan    75\n# dtype: int64\n\n# A DataFrame from a dictionary: keys -> columns, lists -> column values\ndata = {\n    \'name\': [\'Aarav\', \'Priya\', \'Rohan\'],\n    \'city\': [\'Pune\', \'Jaipur\', \'Kolkata\'],\n    \'marks\': [88, 92, 75],\n}\ndf = pd.DataFrame(data)\nprint(df)\n#     name     city  marks\n# 0  Aarav     Pune     88\n# 1  Priya   Jaipur     92\n# 2  Rohan  Kolkata     75',
        keyPoints: [
          'Series = 1D labeled array (a single column with an index)',
          'DataFrame = 2D table; each column is a Series',
          'Create a DataFrame from a dict: keys become columns',
          'Every row gets an index label (default 0, 1, 2, ...)',
        ],
        quiz: [
          {
            question: 'A Pandas Series is best described as...',
            options: [
              'A two-dimensional table',
              'A one-dimensional labeled array (a single column)',
              'A database connection',
              'A plotting function',
            ],
            correctIndex: 1,
          },
          {
            question: 'When you build a DataFrame from a dictionary, the dictionary keys become...',
            options: ['Row indexes', 'Column names', 'Data types', 'File names'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a Series and a DataFrame?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'A Series is a one-dimensional labeled array holding a single column of data with an index. A DataFrame is a two-dimensional labeled structure — a table of rows and columns where each column is itself a Series sharing a common row index. In short, a DataFrame is a collection of Series aligned by the same index.',
              hinglish:
                'Series ek one-dimensional labeled array hai jo single column data ko index ke saath rakhta hai. DataFrame ek two-dimensional labeled structure hai — rows aur columns ka table jahan har column khud ek Series hai aur sab ek common row index share karti hain. Short mein, DataFrame same index se aligned Series ka collection hai.',
            },
          },
        ],
      },
      {
        title: 'Reading CSV Files',
        difficulty: 'easy',
        tags: ['read_csv', 'io', 'load-data'],
        explanation: {
          english:
            'Most real data lives in files. pd.read_csv loads a comma-separated file straight into a DataFrame, automatically detecting columns and guessing data types. You can control parsing with parameters: sep for a different delimiter, usecols to load only some columns, nrows to read just the first few rows, and index_col to use a column as the row index. This single function is usually the first line of any analysis.',
          hinglish:
            'Zyadatar real data files mein hota hai. pd.read_csv ek comma-separated file ko seedhe DataFrame mein load karta hai, columns automatically detect karte hue aur data types guess karte hue. Tum parsing ko parameters se control kar sakte ho: alag delimiter ke liye sep, sirf kuch columns load karne ke liye usecols, sirf shuru ki kuch rows padhne ke liye nrows, aur kisi column ko row index banane ke liye index_col. Ye ek function aam taur pe har analysis ki pehli line hota hai.',
        },
        dailyLifeExample:
          'Socho tumhare paas "students.csv" file hai jo kisi ne WhatsApp pe bheji. read_csv us file ko ek line mein DataFrame bana deta hai — jaise Excel mein double-click karke kholna, par code mein, aur 10 lakh rows ho toh bhi smooth.',
        codeExample:
          'import pandas as pd\n\n# Load a CSV file into a DataFrame\ndf = pd.read_csv(\'students.csv\')\n\n# Read only the first 5 rows (handy for huge files)\nsample = pd.read_csv(\'students.csv\', nrows=5)\n\n# Load only specific columns\ncols = pd.read_csv(\'students.csv\', usecols=[\'name\', \'marks\'])\n\n# Use the id column as the row index\ndf2 = pd.read_csv(\'students.csv\', index_col=\'id\')\n\n# Tab-separated file? Use sep\ntsv = pd.read_csv(\'data.tsv\', sep=\'\\t\')',
        keyPoints: [
          'pd.read_csv loads a CSV file into a DataFrame',
          'Columns and dtypes are detected automatically',
          'usecols loads only chosen columns; nrows limits rows read',
          'index_col sets a column as the row index; sep changes the delimiter',
        ],
        quiz: [
          {
            question: 'Which function loads a CSV file into a DataFrame?',
            options: ['pd.load()', 'pd.read_csv()', 'pd.open_csv()', 'pd.from_file()'],
            correctIndex: 1,
          },
          {
            question: 'Which parameter limits how many rows read_csv loads?',
            options: ['limit', 'nrows', 'maxrows', 'top'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you read a large CSV file efficiently with Pandas?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Use pd.read_csv with helpful parameters. usecols loads only the columns you need, dtype lets you set compact types to save memory, and nrows reads a small sample first to inspect the data. For files too big to fit in memory, pass chunksize to iterate over the file in chunks and process each piece, or read in pieces and aggregate. These options avoid loading unnecessary data and prevent memory errors.',
              hinglish:
                'pd.read_csv ko helpful parameters ke saath use karo. usecols sirf zaroori columns load karta hai, dtype se compact types set karke memory bacha sakte ho, aur nrows pehle ek chhota sample padhta hai data dekhne ke liye. Jo files memory mein na samaayein, unke liye chunksize do taaki file chunks mein iterate ho aur har piece process ho, ya pieces mein padhke aggregate karo. Ye options bekaar data load hone se bachate hain aur memory errors rokte hain.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Exploring Data',
    level: 'beginner',
    description: 'Naye data ko samajhna — head/tail, info, describe, shape, columns aur dtypes.',
    concepts: [
      {
        title: 'First Look — head, tail, shape, columns',
        difficulty: 'easy',
        tags: ['explore', 'head', 'shape', 'columns'],
        explanation: {
          english:
            'When a DataFrame loads, your first job is to peek at it. df.head(n) shows the first n rows (default 5) and df.tail(n) the last n — perfect for a quick sanity check. df.shape returns a (rows, columns) tuple telling you the size. df.columns lists the column names, and df.index gives the row labels. These four are the instinctive first commands every analyst runs.',
          hinglish:
            'Jab DataFrame load hota hai, tumhara pehla kaam usme jhankna hota hai. df.head(n) pehli n rows dikhata hai (default 5) aur df.tail(n) aakhri n — quick sanity check ke liye perfect. df.shape ek (rows, columns) tuple deta hai jo size batata hai. df.columns column ke naam listing karta hai, aur df.index row labels deta hai. Ye chaar instinctive commands har analyst pehle chalata hai.',
        },
        dailyLifeExample:
          'Naya register haath mein aaya toh pehle tum upar ke kuch rows (head) dekhte ho ki kaun se columns hain, phir gin lete ho kitni entries hain (shape). Wahi cheez Pandas mein head() aur shape karte hain.',
        codeExample:
          'import pandas as pd\n\ndf = pd.read_csv(\'sales.csv\')\n\n# Peek at the first and last few rows\nprint(df.head())      # first 5 rows\nprint(df.head(3))     # first 3 rows\nprint(df.tail())      # last 5 rows\n\n# How big is the data? (rows, columns)\nprint(df.shape)       # e.g. (100000, 5)\n\n# What are the column names?\nprint(df.columns)     # Index([\'order_id\', \'city\', \'revenue\', ...])\n\n# What are the row labels?\nprint(df.index)',
        keyPoints: [
          'df.head(n) / df.tail(n) preview the first/last rows',
          'df.shape returns (rows, columns)',
          'df.columns lists column names; df.index lists row labels',
          'These are the quick first commands to understand new data',
        ],
        quiz: [
          {
            question: 'What does df.shape return?',
            options: [
              'The column names',
              'A (rows, columns) tuple giving the size',
              'The first five rows',
              'The data types',
            ],
            correctIndex: 1,
          },
          {
            question: 'How do you view the first 3 rows of a DataFrame df?',
            options: ['df.first(3)', 'df.head(3)', 'df.top(3)', 'df.rows(3)'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Which Pandas methods do you use to get a quick overview of a new dataset?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'I start with df.head() and df.tail() to eyeball the first and last rows, df.shape to see how many rows and columns there are, df.columns to read the column names, df.dtypes to check types, df.info() for a structural summary with non-null counts and memory, and df.describe() for summary statistics of numeric columns. Together they give a fast, complete first impression of the data.',
              hinglish:
                'Main df.head() aur df.tail() se pehli aur aakhri rows dekhta hoon, df.shape se rows aur columns ki ginti, df.columns se column ke naam, df.dtypes se types check karta hoon, df.info() se non-null counts aur memory ka structural summary, aur df.describe() se numeric columns ke summary statistics. Milkar ye data ka tezi se poora pehla impression de dete hain.',
            },
          },
        ],
      },
      {
        title: 'Summaries — info, describe, dtypes',
        difficulty: 'easy',
        tags: ['info', 'describe', 'dtypes', 'summary'],
        explanation: {
          english:
            'After a quick peek, you want a deeper summary. df.info() prints each column with its non-null count and dtype, plus memory usage — great for spotting missing values and wrong types. df.describe() computes summary statistics (count, mean, std, min, quartiles, max) for numeric columns; add include=\'all\' to also summarize text columns. df.dtypes shows the data type of every column, which matters because operations behave differently on numbers vs strings vs dates.',
          hinglish:
            'Quick peek ke baad tum ek gehra summary chahte ho. df.info() har column ko uske non-null count aur dtype ke saath print karta hai, saath mein memory usage — missing values aur galat types pakadne ke liye badhiya. df.describe() numeric columns ke summary statistics nikalta hai (count, mean, std, min, quartiles, max); include=\'all\' lagao toh text columns bhi summarise hote hain. df.dtypes har column ka data type dikhata hai, jo important hai kyunki numbers vs strings vs dates pe operations alag behave karte hain.',
        },
        dailyLifeExample:
          'Naye class register ka "report card" socho: info() batata hai har column mein kitni entries bhari hain aur kya kis type ki hai, describe() batata hai average marks, sabse kam aur sabse zyada — ek nazar mein poori class ki tasveer.',
        codeExample:
          'import pandas as pd\n\ndf = pd.read_csv(\'students.csv\')\n\n# Structure: columns, non-null counts, dtypes, memory\ndf.info()\n# <class \'pandas.core.frame.DataFrame\'>\n# RangeIndex: 3 entries, 0 to 2\n# Data columns (total 3 columns):\n#  #   Column  Non-Null Count  Dtype\n#  0   name    3 non-null      object\n#  1   city    3 non-null      object\n#  2   marks   3 non-null      int64\n\n# Summary stats for numeric columns\nprint(df.describe())\n#        marks\n# count    3.0\n# mean    85.0\n# min     75.0\n# max     92.0\n\n# Data type of each column\nprint(df.dtypes)',
        keyPoints: [
          'df.info() shows non-null counts, dtypes, and memory usage',
          'df.describe() gives count/mean/std/min/quartiles/max for numerics',
          'describe(include=\'all\') also summarizes object/text columns',
          'df.dtypes reveals each column type (int64, object, float64, ...)',
        ],
        quiz: [
          {
            question: 'Which method gives count, mean, std, min, and max for numeric columns?',
            options: ['df.info()', 'df.describe()', 'df.shape', 'df.head()'],
            correctIndex: 1,
          },
          {
            question: 'df.info() is especially useful for spotting...',
            options: [
              'The fastest CPU core',
              'Missing values (non-null counts) and wrong dtypes',
              'The plot colors',
              'The file name',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between df.info() and df.describe()?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'df.info() gives a structural summary: the number of rows, each column name, its non-null count, its dtype, and overall memory usage — ideal for spotting missing data and incorrect types. df.describe() gives a statistical summary: for numeric columns it reports count, mean, std, min, the quartiles, and max (and with include=\'all\' it summarizes categorical columns too). In short, info() describes the structure, describe() describes the values.',
              hinglish:
                'df.info() ek structural summary deta hai: rows ki ginti, har column ka naam, uska non-null count, uska dtype, aur overall memory usage — missing data aur galat types pakadne ke liye best. df.describe() ek statistical summary deta hai: numeric columns ke liye count, mean, std, min, quartiles aur max (aur include=\'all\' se categorical columns bhi). Short mein, info() structure batata hai, describe() values batata hai.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Selecting Data',
    level: 'intermediate',
    description: 'Columns chunna, loc vs iloc, boolean filtering aur query se data nikalna.',
    concepts: [
      {
        title: 'Selecting Columns and Rows (loc vs iloc)',
        difficulty: 'medium',
        tags: ['select', 'loc', 'iloc', 'indexing'],
        explanation: {
          english:
            'To pick a single column use df[\'col\'] (a Series); for several columns pass a list df[[\'a\', \'b\']] (a DataFrame). To select rows there are two key accessors. df.loc is label-based — you give it row labels and column names, and ranges are inclusive. df.iloc is position-based — you give it integer positions (0, 1, 2...) like list indexing, and ranges are exclusive of the end. Choosing the right one avoids confusion when your index is not just 0..n.',
          hinglish:
            'Ek single column lene ke liye df[\'col\'] (ek Series); kai columns ke liye list pass karo df[[\'a\', \'b\']] (ek DataFrame). Rows select karne ke do main accessors hain. df.loc label-based hai — isme row labels aur column names dete ho, aur ranges inclusive hoti hain. df.iloc position-based hai — isme integer positions (0, 1, 2...) dete ho jaise list indexing, aur ranges end ko chhodke hoti hain. Sahi wala chunna confusion bachata hai jab index sirf 0..n na ho.',
        },
        dailyLifeExample:
          'loc naam se dhoondhna hai — "Priya ki row do" (label). iloc seat number se dhoondhna hai — "third bench wala student" (position). Dono se same student mil sakta hai, par tareeka alag.',
        codeExample:
          'import pandas as pd\n\ndf = pd.DataFrame({\n    \'name\': [\'Aarav\', \'Priya\', \'Rohan\'],\n    \'city\': [\'Pune\', \'Jaipur\', \'Kolkata\'],\n    \'marks\': [88, 92, 75],\n}, index=[\'s1\', \'s2\', \'s3\'])\n\n# One column -> Series\nprint(df[\'marks\'])\n\n# Several columns -> DataFrame\nprint(df[[\'name\', \'marks\']])\n\n# loc: label-based (inclusive range)\nprint(df.loc[\'s2\'])                 # the row labeled s2\nprint(df.loc[\'s1\':\'s2\', \'name\'])    # rows s1..s2, name column\n\n# iloc: position-based (end-exclusive)\nprint(df.iloc[0])                   # first row by position\nprint(df.iloc[0:2, 0])              # rows 0,1 and column 0',
        keyPoints: [
          'df[\'col\'] -> Series; df[[\'a\',\'b\']] -> DataFrame',
          'loc selects by label (row/column names); ranges are inclusive',
          'iloc selects by integer position; ranges are end-exclusive',
          'Use loc with meaningful indexes, iloc for positional access',
        ],
        quiz: [
          {
            question: 'What is the difference between loc and iloc?',
            options: [
              'loc is faster; iloc is slower',
              'loc selects by label, iloc selects by integer position',
              'loc is for columns only, iloc for rows only',
              'There is no difference',
            ],
            correctIndex: 1,
          },
          {
            question: 'df[[\'name\', \'marks\']] returns...',
            options: [
              'A single Series',
              'A DataFrame with those two columns',
              'A list of strings',
              'An error',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the difference between loc and iloc in Pandas.',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'loc is label-based indexing: you pass row index labels and column names, and slice ranges include the end label. iloc is integer-position based: you pass zero-based positions like a Python list, and slice ranges exclude the end position. If your DataFrame has a default RangeIndex they often look similar, but with a custom index (e.g. dates or IDs) the distinction is crucial — loc finds by the actual label, iloc by ordinal position.',
              hinglish:
                'loc label-based indexing hai: tum row index labels aur column names pass karte ho, aur slice ranges end label ko include karti hain. iloc integer-position based hai: tum zero-based positions pass karte ho jaise Python list, aur slice ranges end position ko chhod deti hain. Agar DataFrame ka default RangeIndex ho toh dono ek jaise lagte hain, par custom index (jaise dates ya IDs) ke saath farak crucial hai — loc actual label se dhoondhta hai, iloc ordinal position se.',
            },
          },
        ],
      },
      {
        title: 'Boolean Filtering and query',
        difficulty: 'medium',
        tags: ['filter', 'boolean', 'query'],
        explanation: {
          english:
            'The most common task is keeping only rows that meet a condition. A comparison like df[\'marks\'] > 80 produces a boolean Series (True/False per row); putting it inside df[...] keeps the True rows. Combine conditions with & (and) and | (or), wrapping each in parentheses, and use isin for membership. The df.query method offers a readable string alternative: df.query(\'marks > 80 and city == "Pune"\'). Filtering never changes the original unless you reassign.',
          hinglish:
            'Sabse common kaam hai sirf woh rows rakhna jo condition meet karein. df[\'marks\'] > 80 jaisa comparison ek boolean Series banata hai (har row pe True/False); use df[...] ke andar daalo toh True rows bach jaati hain. Conditions ko & (and) aur | (or) se jodo, har ek ko parentheses mein wrap karke, aur membership ke liye isin use karo. df.query method ek readable string alternative deta hai: df.query(\'marks > 80 and city == "Pune"\'). Filtering original ko nahi badalti jab tak tum reassign na karo.',
        },
        dailyLifeExample:
          'Class mein teacher kehti hai "80 se zyada wale haath uthao" — wahi boolean filter hai: condition lagao, jo True hain wahi bachte hain. query() bas yahi baat English jaise sentence mein likhne ka tareeka hai.',
        codeExample:
          'import pandas as pd\n\ndf = pd.DataFrame({\n    \'name\': [\'Aarav\', \'Priya\', \'Rohan\', \'Sara\'],\n    \'city\': [\'Pune\', \'Jaipur\', \'Pune\', \'Kolkata\'],\n    \'marks\': [88, 92, 75, 81],\n})\n\n# Single condition: a boolean mask filters rows\ntoppers = df[df[\'marks\'] > 80]\n\n# Combine conditions with & and | (wrap each in parentheses)\npune_toppers = df[(df[\'marks\'] > 80) & (df[\'city\'] == \'Pune\')]\n\n# Membership with isin\nnorth = df[df[\'city\'].isin([\'Jaipur\', \'Delhi\'])]\n\n# Readable string form with query\nq = df.query(\'marks > 80 and city == "Pune"\')\nprint(q)',
        keyPoints: [
          'A comparison makes a boolean Series; df[mask] keeps True rows',
          'Combine with & and |, wrapping each condition in parentheses',
          'isin checks membership in a list of values',
          'df.query() filters with a readable string expression',
        ],
        quiz: [
          {
            question: 'How do you keep only rows where marks is greater than 80?',
            options: [
              'df.filter(marks > 80)',
              'df[df[\'marks\'] > 80]',
              'df.where(80)',
              'df.keep(\'marks\', 80)',
            ],
            correctIndex: 1,
          },
          {
            question: 'When combining two conditions in a boolean filter, you should...',
            options: [
              'Use the keywords and / or directly',
              'Use & or | and wrap each condition in parentheses',
              'Use + between them',
              'Only one condition is ever allowed',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How does boolean indexing work in Pandas, and when would you use query()?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Boolean indexing works by creating a boolean Series from a condition (e.g. df[\'age\'] > 30), where each element is True or False. Passing that mask into df[...] returns only the rows where the value is True. To combine conditions you use the bitwise operators & and | with each condition in parentheses, because Python and/or do not work element-wise. query() is an alternative that takes a string expression like df.query(\'age > 30 and city == "Pune"\'); it is more readable for complex filters and can reference column names directly without df[...] syntax.',
              hinglish:
                'Boolean indexing ek condition se boolean Series banata hai (jaise df[\'age\'] > 30), jahan har element True ya False hota hai. Us mask ko df[...] mein daalne se sirf True wali rows aati hain. Conditions jodne ke liye bitwise & aur | use karte ho har condition ko parentheses mein rakhke, kyunki Python ke and/or element-wise kaam nahi karte. query() ek alternative hai jo string expression leta hai jaise df.query(\'age > 30 and city == "Pune"\'); ye complex filters ke liye zyada readable hai aur column names ko seedhe reference kar sakta hai bina df[...] ke.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Cleaning Data',
    level: 'intermediate',
    description: 'Missing values handle karna, columns rename karna, types badalna aur duplicates hatana.',
    concepts: [
      {
        title: 'Handling Missing Values (isna, dropna, fillna)',
        difficulty: 'medium',
        tags: ['missing', 'isna', 'dropna', 'fillna'],
        explanation: {
          english:
            'Real data has gaps, shown as NaN. df.isna() returns a boolean mask of missing cells, and df.isna().sum() counts missing values per column. You then choose a strategy: df.dropna() removes rows (or columns with axis=1) that contain NaN, while df.fillna(value) replaces NaN with something sensible — a constant, the column mean, or a forward fill (method=\'ffill\'). Dropping loses data; filling keeps rows but introduces assumptions, so pick based on context.',
          hinglish:
            'Real data mein gaps hote hain, jo NaN ke roop mein dikhte hain. df.isna() missing cells ka boolean mask deta hai, aur df.isna().sum() har column ke missing values ginta hai. Phir tum strategy chunte ho: df.dropna() un rows ko hatata hai (ya axis=1 se columns) jisme NaN ho, jabki df.fillna(value) NaN ko kuch samajhdaar se replace karta hai — ek constant, column ka mean, ya forward fill (method=\'ffill\'). Dropna data khota hai; fillna rows rakhta hai par assumptions laata hai, isliye context dekhke chuno.',
        },
        dailyLifeExample:
          'Attendance register mein kuch khaane khaali reh gaye. dropna matlab us poori adhuri entry ko kaat dena. fillna matlab khaali jagah pe "Absent" likh dena — data bachta hai par ek assumption ke saath.',
        codeExample:
          'import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \'name\': [\'Aarav\', \'Priya\', \'Rohan\'],\n    \'marks\': [88, np.nan, 75],\n    \'city\': [\'Pune\', \'Jaipur\', np.nan],\n})\n\n# Where are the gaps? Count per column\nprint(df.isna().sum())\n\n# Drop rows that contain any NaN\nclean = df.dropna()\n\n# Fill missing marks with the column mean\ndf[\'marks\'] = df[\'marks\'].fillna(df[\'marks\'].mean())\n\n# Fill missing city with a placeholder\ndf[\'city\'] = df[\'city\'].fillna(\'Unknown\')\nprint(df)',
        keyPoints: [
          'Missing values appear as NaN',
          'df.isna().sum() counts missing values per column',
          'dropna() removes rows (or columns) with NaN',
          'fillna() replaces NaN with a constant, mean, or forward fill',
        ],
        quiz: [
          {
            question: 'Which method counts how many missing values each column has?',
            options: ['df.count()', 'df.isna().sum()', 'df.missing()', 'df.nulls()'],
            correctIndex: 1,
          },
          {
            question: 'df.fillna(0) does what?',
            options: [
              'Drops all rows with missing values',
              'Replaces every NaN with 0',
              'Counts the zeros',
              'Renames the columns',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What strategies do you use to handle missing data in Pandas?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'First I detect and quantify it with df.isna().sum() to see how much is missing per column. Then I choose a strategy based on context. If only a few rows are affected and the data is plentiful, dropna() removes them. If the column is important, I impute with fillna — using the mean or median for numeric data, the mode for categories, or forward/backward fill for time series. For structurally missing values a placeholder like "Unknown" can be meaningful. The key is to understand why data is missing before deciding, because dropping can bias results and imputing adds assumptions.',
              hinglish:
                'Pehle main df.isna().sum() se detect aur quantify karta hoon ki har column mein kitna missing hai. Phir context ke hisaab se strategy chunta hoon. Agar sirf kuch rows affected hain aur data kaafi hai, toh dropna() unhe hata deta hai. Agar column important hai, toh fillna se impute karta hoon — numeric ke liye mean ya median, categories ke liye mode, time series ke liye forward/backward fill. Structurally missing values ke liye "Unknown" jaisa placeholder meaningful ho sakta hai. Asli baat ye hai ki decide karne se pehle samjho data kyun missing hai, kyunki dropping results ko bias kar sakta hai aur imputing assumptions jodta hai.',
            },
          },
        ],
      },
      {
        title: 'Renaming, Types and Duplicates',
        difficulty: 'medium',
        tags: ['rename', 'astype', 'duplicates', 'clean'],
        explanation: {
          english:
            'Cleaning often means tidying structure. df.rename(columns={\'old\': \'new\'}) renames columns clearly. df[\'col\'].astype(\'int\') converts a column to another dtype — for example a numeric string column to int, or a column to category to save memory. For dates, pd.to_datetime parses strings into proper datetime. Duplicate rows are found with df.duplicated() and removed with df.drop_duplicates(), optionally on a subset of columns. Many methods return a new DataFrame, so reassign (or pass inplace=True) to keep the change.',
          hinglish:
            'Cleaning ka matlab aksar structure ko saaf karna hota hai. df.rename(columns={\'old\': \'new\'}) columns ko clearly rename karta hai. df[\'col\'].astype(\'int\') ek column ko doosre dtype mein badalta hai — jaise numeric string column ko int, ya column ko category mein taaki memory bache. Dates ke liye pd.to_datetime strings ko proper datetime mein parse karta hai. Duplicate rows df.duplicated() se milti hain aur df.drop_duplicates() se hatti hain, chaaho toh kuch columns ke subset pe. Bahut se methods naya DataFrame return karte hain, isliye reassign karo (ya inplace=True do) taaki change bana rahe.',
        },
        dailyLifeExample:
          'Register mein ek column ka naam "Mrks" likha hai — usko "Marks" karna rename hai. Marks "88" text mein bhare hain par jodne ke liye number chahiye — wo astype hai. Ek hi student do baar likh diya — wo duplicate, drop_duplicates se hatao.',
        codeExample:
          'import pandas as pd\n\ndf = pd.DataFrame({\n    \'Mrks\': [\'88\', \'92\', \'88\'],\n    \'naam\': [\'Aarav\', \'Priya\', \'Aarav\'],\n})\n\n# Rename columns to clear names\ndf = df.rename(columns={\'Mrks\': \'marks\', \'naam\': \'name\'})\n\n# Convert the marks column from string to int\ndf[\'marks\'] = df[\'marks\'].astype(\'int\')\n\n# Find duplicate rows\nprint(df.duplicated())\n\n# Remove duplicate rows, keeping the first occurrence\ndf = df.drop_duplicates()\nprint(df)',
        keyPoints: [
          'df.rename(columns={...}) renames columns',
          'astype() converts a column to another dtype (int, float, category)',
          'pd.to_datetime parses strings into datetime',
          'duplicated() finds and drop_duplicates() removes duplicate rows',
        ],
        quiz: [
          {
            question: 'Which method removes duplicate rows from a DataFrame?',
            options: ['df.unique()', 'df.drop_duplicates()', 'df.distinct()', 'df.dedup()'],
            correctIndex: 1,
          },
          {
            question: 'To convert a column of numeric strings to integers you use...',
            options: ['df.convert()', 'df[\'col\'].astype(\'int\')', 'df.toint()', 'df.cast(int)'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you detect and remove duplicate rows, and why might duplicates appear?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'df.duplicated() returns a boolean Series marking rows that are repeats of an earlier row; df.duplicated().sum() counts them. df.drop_duplicates() removes them, and you can pass subset=[\'col\'] to dedupe on specific columns and keep=\'first\'/\'last\'/False to control which copy is kept. Duplicates often appear from joining datasets, repeated data exports, double form submissions, or merging files, so checking for them is a standard cleaning step before analysis.',
              hinglish:
                'df.duplicated() ek boolean Series deta hai jo un rows ko mark karta hai jo pehle aa chuki row ki copy hain; df.duplicated().sum() unhe ginta hai. df.drop_duplicates() unhe hatata hai, aur tum subset=[\'col\'] dekar specific columns pe dedupe kar sakte ho aur keep=\'first\'/\'last\'/False se control kar sakte ho kaun si copy rakhni hai. Duplicates aksar datasets join karne, baar-baar data export, double form submission ya files merge karne se aate hain, isliye analysis se pehle inhe check karna standard cleaning step hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Transforming Data',
    level: 'intermediate',
    description: 'apply aur map se values badalna, derived columns banana aur sort_values se sort karna.',
    concepts: [
      {
        title: 'apply, map and Derived Columns',
        difficulty: 'medium',
        tags: ['apply', 'map', 'derived', 'transform'],
        explanation: {
          english:
            'Transforming means producing new values from existing ones. The simplest is vectorized arithmetic on a column: df[\'total\'] = df[\'price\'] * df[\'qty\'] creates a derived column. Series.map applies a function or dictionary element-wise to one column — great for relabeling categories. Series.apply runs a custom function on each value, and df.apply can run a function across rows or columns. Prefer vectorized operations when possible (they are fast); reach for apply when the logic is custom and cannot be vectorized.',
          hinglish:
            'Transform karna matlab maujooda values se nayi values banana. Sabse simple hai column pe vectorized arithmetic: df[\'total\'] = df[\'price\'] * df[\'qty\'] ek derived column banata hai. Series.map ek function ya dictionary ko element-wise ek column pe lagata hai — categories relabel karne ke liye badhiya. Series.apply har value pe ek custom function chalata hai, aur df.apply rows ya columns pe function chala sakta hai. Jab ho sake vectorized operations prefer karo (ye fast hote hain); apply tab use karo jab logic custom ho aur vectorize na ho sake.',
        },
        dailyLifeExample:
          'Shop ke bill mein "price x quantity = total" likhna derived column banana hai. "M/F" ko "Male/Female" mein badalna map hai — ek lookup table se replace. Har naam ko capital karna apply hai — har value pe ek chhota function.',
        codeExample:
          'import pandas as pd\n\ndf = pd.DataFrame({\n    \'item\': [\'pen\', \'book\', \'bag\'],\n    \'price\': [10, 50, 300],\n    \'qty\': [5, 2, 1],\n    \'grade\': [\'A\', \'B\', \'A\'],\n})\n\n# Derived column via vectorized arithmetic\ndf[\'total\'] = df[\'price\'] * df[\'qty\']\n\n# map: relabel categories using a dictionary\ndf[\'grade_label\'] = df[\'grade\'].map({\'A\': \'Excellent\', \'B\': \'Good\'})\n\n# apply: run a custom function on each value\ndf[\'item_upper\'] = df[\'item\'].apply(lambda x: x.upper())\nprint(df)',
        keyPoints: [
          'Vectorized arithmetic on columns creates derived columns (fast)',
          'Series.map applies a dict or function element-wise to one column',
          'Series.apply runs a custom function per value; df.apply across rows/cols',
          'Prefer vectorized ops; use apply only for custom non-vectorizable logic',
        ],
        quiz: [
          {
            question: 'Which is the best way to multiply two columns into a new column?',
            options: [
              'A Python for loop over rows',
              'Vectorized arithmetic: df[\'new\'] = df[\'a\'] * df[\'b\']',
              'df.multiply_loop()',
              'It is not possible in Pandas',
            ],
            correctIndex: 1,
          },
          {
            question: 'Series.map with a dictionary is commonly used to...',
            options: [
              'Sort the DataFrame',
              'Relabel/replace category values element-wise',
              'Read a CSV file',
              'Drop missing values',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between map, apply, and applymap in Pandas?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'map works only on a Series, applying a dictionary, Series, or function element-wise to transform each value — ideal for relabeling. apply is more general: on a Series it runs a function per element; on a DataFrame it runs a function along an axis, passing whole rows or columns. applymap (now often replaced by DataFrame.map in recent versions) applies a function element-wise to every cell of a DataFrame. Rule of thumb: map for one Series, apply for row/column-wise logic, and prefer vectorized operations over all three when the operation supports it, for speed.',
              hinglish:
                'map sirf Series pe kaam karta hai, ek dictionary, Series ya function ko element-wise lagake har value transform karta hai — relabeling ke liye ideal. apply zyada general hai: Series pe ye har element pe function chalata hai; DataFrame pe ek axis ke saath function chalata hai, poori rows ya columns pass karte hue. applymap (naye versions mein aksar DataFrame.map se replace) ek function ko DataFrame ke har cell pe element-wise lagata hai. Rule of thumb: ek Series ke liye map, row/column-wise logic ke liye apply, aur jab operation support kare toh speed ke liye teeno se pehle vectorized operations prefer karo.',
            },
          },
        ],
      },
      {
        title: 'Sorting with sort_values',
        difficulty: 'easy',
        tags: ['sort', 'sort_values', 'order'],
        explanation: {
          english:
            'To order rows, df.sort_values(\'col\') sorts ascending by that column; pass ascending=False for descending. Sort by multiple columns with a list, e.g. sort_values([\'city\', \'marks\'], ascending=[True, False]) sorts by city A-Z then marks high-to-low within each city. df.sort_index() sorts by the row index instead. Sorting returns a new DataFrame by default, so reassign to keep it. It is a key step before showing top-N results or building rankings.',
          hinglish:
            'Rows ko order karne ke liye df.sort_values(\'col\') us column se ascending sort karta hai; descending ke liye ascending=False do. Multiple columns se sort karo list dekar, jaise sort_values([\'city\', \'marks\'], ascending=[True, False]) city A-Z se phir har city ke andar marks high-to-low se sort karta hai. df.sort_index() index se sort karta hai. Sorting default mein naya DataFrame deta hai, isliye reassign karo. Top-N results dikhane ya rankings banane se pehle ye key step hai.',
        },
        dailyLifeExample:
          'Result sheet ko marks ke hisaab se ulta (zyada se kam) sort karna toppers ki list banane jaisa hai. Pehle position kis ki? Bas sort_values(ascending=False) aur head(1) — pehla naam topper.',
        codeExample:
          'import pandas as pd\n\ndf = pd.DataFrame({\n    \'name\': [\'Aarav\', \'Priya\', \'Rohan\', \'Sara\'],\n    \'city\': [\'Pune\', \'Jaipur\', \'Pune\', \'Jaipur\'],\n    \'marks\': [88, 92, 75, 81],\n})\n\n# Sort by marks, highest first\nranked = df.sort_values(\'marks\', ascending=False)\n\n# Top scorer\nprint(ranked.head(1))\n\n# Sort by city A-Z, then marks high-to-low within each city\nmulti = df.sort_values([\'city\', \'marks\'], ascending=[True, False])\nprint(multi)',
        keyPoints: [
          'sort_values(\'col\') sorts ascending; ascending=False for descending',
          'Pass a list of columns to sort by multiple keys',
          'ascending can be a list to set direction per column',
          'sort_index() sorts by the index; sorting returns a new DataFrame',
        ],
        quiz: [
          {
            question: 'How do you sort a DataFrame by the marks column from highest to lowest?',
            options: [
              'df.sort_values(\'marks\')',
              'df.sort_values(\'marks\', ascending=False)',
              'df.order(\'marks\')',
              'df.sort(\'marks\', desc=True)',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does passing a list to sort_values, like [\'city\', \'marks\'], do?',
            options: [
              'Throws an error',
              'Sorts by city first, then by marks within each city',
              'Sorts only the first column',
              'Sorts the columns alphabetically',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you find the top N rows by a column in Pandas?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'You can sort and slice: df.sort_values(\'col\', ascending=False).head(n) returns the top n rows by that column. A more direct and efficient option is df.nlargest(n, \'col\'), which finds the n largest without a full sort, and df.nsmallest(n, \'col\') for the smallest. nlargest is generally faster on large data because it does a partial selection instead of sorting everything.',
              hinglish:
                'Tum sort karke slice kar sakte ho: df.sort_values(\'col\', ascending=False).head(n) us column se top n rows deta hai. Ek zyada direct aur efficient option hai df.nlargest(n, \'col\'), jo bina poore sort ke n sabse badi rows nikalta hai, aur sabse choti ke liye df.nsmallest(n, \'col\'). nlargest bade data pe aam taur pe fast hota hai kyunki ye sab kuch sort karne ke bajay partial selection karta hai.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Grouping & Aggregation',
    level: 'advanced',
    description: 'groupby, agg, value_counts aur pivot_table se data ko summarise karna.',
    concepts: [
      {
        title: 'groupby and Aggregation (agg, value_counts)',
        difficulty: 'hard',
        tags: ['groupby', 'agg', 'value_counts', 'aggregate'],
        explanation: {
          english:
            'Grouping answers "for each category, what is the summary?". df.groupby(\'city\') splits rows into groups by the column value; chaining an aggregation like .sum(), .mean(), or .count() computes one number per group — the classic split-apply-combine pattern. df.groupby(\'city\').agg({\'revenue\': \'sum\', \'orders\': \'mean\'}) applies different aggregations to different columns at once. For a quick frequency count of a single column, df[\'city\'].value_counts() returns how many rows fall in each value, sorted by count. This is how Anjali found the top city in one line.',
          hinglish:
            'Grouping is sawaal ka jawab deti hai "har category ke liye summary kya hai?". df.groupby(\'city\') rows ko column value ke hisaab se groups mein baant deta hai; phir .sum(), .mean() ya .count() jaisi aggregation chain karo toh har group pe ek number milta hai — classic split-apply-combine pattern. df.groupby(\'city\').agg({\'revenue\': \'sum\', \'orders\': \'mean\'}) alag columns pe alag aggregations ek saath lagata hai. Ek column ki quick frequency count ke liye, df[\'city\'].value_counts() batata hai har value mein kitni rows hain, count se sorted. Isi tarah Anjali ne top city ek line mein dhoondhi.',
        },
        dailyLifeExample:
          'Sochо teacher har city ke students ka average marks chahti hai. Tum students ko city ke dher mein baant te ho (group), har dher ka average nikaalte ho (aggregate), aur ek chhoti table banti hai — har city ke saamne uska average. Wahi groupby().mean() hai.',
        codeExample:
          'import pandas as pd\n\ndf = pd.DataFrame({\n    \'city\': [\'Pune\', \'Jaipur\', \'Pune\', \'Jaipur\', \'Pune\'],\n    \'revenue\': [100, 200, 150, 50, 300],\n    \'orders\': [2, 3, 1, 1, 4],\n})\n\n# Total revenue per city (split-apply-combine)\nprint(df.groupby(\'city\')[\'revenue\'].sum())\n# city\n# Jaipur    250\n# Pune      550\n\n# Different aggregation per column\nsummary = df.groupby(\'city\').agg({\'revenue\': \'sum\', \'orders\': \'mean\'})\nprint(summary)\n\n# Quick frequency of a single column\nprint(df[\'city\'].value_counts())\n# Pune      3\n# Jaipur    2',
        keyPoints: [
          'groupby splits rows into groups by a column value',
          'Chain sum/mean/count for split-apply-combine aggregation',
          'agg({col: func}) applies different aggregations per column',
          'value_counts() counts how many rows fall in each value',
        ],
        quiz: [
          {
            question: 'What does df.groupby(\'city\')[\'revenue\'].sum() compute?',
            options: [
              'The total revenue across all cities combined',
              'The total revenue for each city separately',
              'The number of cities',
              'A sorted list of city names',
            ],
            correctIndex: 1,
          },
          {
            question: 'df[\'city\'].value_counts() returns...',
            options: [
              'The sum of the city column',
              'How many rows have each distinct city value',
              'The unique city names only',
              'The average revenue',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the split-apply-combine pattern with groupby in Pandas.',
            difficulty: 'hard',
            frequency: 'very-common',
            answer: {
              english:
                'Split-apply-combine is the model behind groupby. Split: Pandas partitions the DataFrame into groups based on the values of one or more keys (e.g. by city). Apply: it runs a function on each group independently — an aggregation like sum or mean (one value per group), a transformation (same shape, e.g. group-wise normalization), or a filter (keep/drop whole groups). Combine: the results are stitched back into a single Series or DataFrame indexed by the group keys. agg lets you apply multiple or per-column functions at once, making complex summaries concise.',
              hinglish:
                'Split-apply-combine groupby ke peeche ka model hai. Split: Pandas DataFrame ko ek ya zyada keys ki values ke hisaab se groups mein baant ta hai (jaise city se). Apply: har group pe alag se ek function chalta hai — sum ya mean jaisi aggregation (per group ek value), transformation (same shape, jaise group-wise normalization), ya filter (poore groups rakho/hatao). Combine: results wapas ek single Series ya DataFrame mein jud jaate hain jo group keys se indexed hota hai. agg se ek saath multiple ya per-column functions lag sakte hain, jisse complex summaries chhoti ban jaati hain.',
            },
          },
        ],
      },
      {
        title: 'Reshaping with pivot_table',
        difficulty: 'hard',
        tags: ['pivot_table', 'reshape', 'aggregate'],
        explanation: {
          english:
            'A pivot table reshapes long data into a grid, just like Excel pivot tables. df.pivot_table(index=\'city\', columns=\'month\', values=\'revenue\', aggfunc=\'sum\') puts cities down the rows, months across the columns, and the summed revenue in each cell. You choose the aggfunc (sum, mean, count...) and can add margins=True for row/column totals and fill_value=0 to replace missing combinations. It is the go-to tool for cross-tabulated summaries when you want categories on two axes at once.',
          hinglish:
            'Pivot table long data ko ek grid mein reshape karta hai, bilkul Excel pivot tables jaise. df.pivot_table(index=\'city\', columns=\'month\', values=\'revenue\', aggfunc=\'sum\') cities ko rows mein, months ko columns mein, aur har cell mein summed revenue rakhta hai. Tum aggfunc chunte ho (sum, mean, count...) aur margins=True se row/column totals, fill_value=0 se missing combinations replace kar sakte ho. Jab do axes pe ek saath categories chahiye, cross-tabulated summaries ke liye ye go-to tool hai.',
        },
        dailyLifeExample:
          'Sochо ek table jisme rows mein cities, columns mein mahine, aur har khaane mein us city-mahine ki sales. Excel mein isi ko pivot table kehte hain — Pandas mein pivot_table() ek line mein wahi grid bana deta hai.',
        codeExample:
          'import pandas as pd\n\ndf = pd.DataFrame({\n    \'city\': [\'Pune\', \'Pune\', \'Jaipur\', \'Jaipur\'],\n    \'month\': [\'Jan\', \'Feb\', \'Jan\', \'Feb\'],\n    \'revenue\': [100, 150, 200, 50],\n})\n\n# Cities as rows, months as columns, summed revenue in cells\npt = df.pivot_table(\n    index=\'city\',\n    columns=\'month\',\n    values=\'revenue\',\n    aggfunc=\'sum\',\n    fill_value=0,\n)\nprint(pt)\n# month   Feb  Jan\n# city\n# Jaipur   50  200\n# Pune    150  100\n\n# Add row/column totals with margins\ntotals = df.pivot_table(index=\'city\', values=\'revenue\', aggfunc=\'sum\', margins=True)\nprint(totals)',
        keyPoints: [
          'pivot_table reshapes data into an index x columns grid',
          'aggfunc chooses how cells are aggregated (sum, mean, count)',
          'margins=True adds row/column totals',
          'fill_value replaces missing index/column combinations',
        ],
        quiz: [
          {
            question: 'In pivot_table, what does the aggfunc parameter control?',
            options: [
              'The colors of the output',
              'How values in each cell are aggregated (sum, mean, count, ...)',
              'Which file to read',
              'The number of rows to display',
            ],
            correctIndex: 1,
          },
          {
            question: 'A pivot_table is most similar to which familiar tool?',
            options: [
              'An Excel pivot table',
              'A for loop',
              'A SQL CREATE TABLE',
              'A bar chart',
            ],
            correctIndex: 0,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between pivot, pivot_table, and groupby?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'pivot purely reshapes data from long to wide and does not aggregate, so it errors if there are duplicate index/column combinations. pivot_table is the more powerful version: it reshapes AND aggregates duplicates using an aggfunc (default mean), handles missing combinations with fill_value, and can add totals via margins. groupby is the general split-apply-combine engine producing a Series/DataFrame keyed by group; pivot_table is essentially a groupby followed by an unstack that spreads one grouping key across columns. Use groupby for flexible aggregation and pivot_table when you specifically want a two-dimensional cross-tabulated grid.',
              hinglish:
                'pivot sirf data ko long se wide reshape karta hai, aggregate nahi karta, isliye duplicate index/column combinations par error deta hai. pivot_table zyada powerful version hai: ye reshape bhi karta hai aur aggfunc (default mean) se duplicates aggregate bhi, fill_value se missing combinations handle karta hai, aur margins se totals jod sakta hai. groupby general split-apply-combine engine hai jo group se keyed Series/DataFrame deta hai; pivot_table asal mein ek groupby ke baad unstack hai jo ek grouping key ko columns mein faila deta hai. Flexible aggregation ke liye groupby use karo aur jab specifically two-dimensional cross-tabulated grid chahiye toh pivot_table.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Combining & Exporting',
    level: 'advanced',
    description: 'merge/join se data jodna, concat se stack karna, CSV export aur time series ki jhalak.',
    concepts: [
      {
        title: 'Combining Data — merge and concat',
        difficulty: 'hard',
        tags: ['merge', 'join', 'concat', 'combine'],
        explanation: {
          english:
            'Real analysis usually spans multiple tables. pd.merge(left, right, on=\'key\') joins two DataFrames on a shared key column, just like a SQL JOIN; how=\'inner\'/\'left\'/\'right\'/\'outer\' controls which rows are kept when keys do not match on both sides. pd.concat([df1, df2]) stacks DataFrames — vertically by default (more rows, same columns) or horizontally with axis=1 (more columns). Use merge to combine related information by a key, and concat to pile together pieces of the same shape, like monthly files into one.',
          hinglish:
            'Real analysis aksar kai tables mein faili hoti hai. pd.merge(left, right, on=\'key\') do DataFrames ko ek shared key column pe join karta hai, bilkul SQL JOIN jaise; how=\'inner\'/\'left\'/\'right\'/\'outer\' control karta hai ki keys dono taraf match na hone par kaun si rows rakhni hain. pd.concat([df1, df2]) DataFrames ko stack karta hai — default mein vertically (zyada rows, same columns) ya axis=1 se horizontally (zyada columns). Related information ko key se jodne ke liye merge use karo, aur same shape ke tukde ek saath dher karne ke liye concat, jaise monthly files ko ek mein.',
        },
        dailyLifeExample:
          'Ek register mein students ke naam aur Roll No hain, doosre mein Roll No aur marks. Dono ko Roll No se jodna merge hai — jaise SQL JOIN. Aur har mahine ki alag attendance sheet ko ek saath neeche-neeche chipkana concat hai.',
        codeExample:
          'import pandas as pd\n\nstudents = pd.DataFrame({\n    \'roll\': [1, 2, 3],\n    \'name\': [\'Aarav\', \'Priya\', \'Rohan\'],\n})\nmarks = pd.DataFrame({\n    \'roll\': [1, 2, 3],\n    \'marks\': [88, 92, 75],\n})\n\n# merge two tables on the shared key (like a SQL JOIN)\nfull = pd.merge(students, marks, on=\'roll\', how=\'inner\')\nprint(full)\n#    roll   name  marks\n# 0     1  Aarav     88\n# 1     2  Priya     92\n# 2     3  Rohan     75\n\n# concat stacks rows of same-shaped DataFrames\njan = pd.DataFrame({\'roll\': [4], \'name\': [\'Sara\']})\nall_students = pd.concat([students, jan], ignore_index=True)\nprint(all_students)',
        keyPoints: [
          'pd.merge joins DataFrames on a key, like a SQL JOIN',
          'how controls inner/left/right/outer join behavior',
          'pd.concat stacks DataFrames vertically (or axis=1 horizontally)',
          'merge combines by key; concat piles same-shaped pieces together',
        ],
        quiz: [
          {
            question: 'Which function joins two DataFrames on a shared key column, like a SQL JOIN?',
            options: ['pd.concat()', 'pd.merge()', 'pd.join_tables()', 'pd.stack()'],
            correctIndex: 1,
          },
          {
            question: 'pd.concat([df1, df2]) by default...',
            options: [
              'Joins on a key column',
              'Stacks the rows vertically (same columns, more rows)',
              'Deletes duplicate rows',
              'Sorts both DataFrames',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between merge and concat in Pandas?',
            difficulty: 'hard',
            frequency: 'very-common',
            answer: {
              english:
                'merge combines DataFrames based on the values of one or more key columns (or indexes), performing database-style joins — inner, left, right, or outer — to align related rows from different tables. concat simply glues DataFrames together along an axis: vertically (axis=0) to add more rows of the same columns, or horizontally (axis=1) to add more columns by aligning on the index. Use merge when you need to combine information about the same entities spread across tables; use concat when you are appending or stacking pieces that already share a structure, like combining monthly CSVs.',
              hinglish:
                'merge DataFrames ko ek ya zyada key columns (ya indexes) ki values ke aadhar par jodta hai, database-style joins karte hue — inner, left, right ya outer — taaki alag tables ki related rows align hon. concat sirf DataFrames ko ek axis ke saath chipkata hai: vertically (axis=0) same columns ki aur rows jodne ke liye, ya horizontally (axis=1) index pe align karke aur columns jodne ke liye. merge tab use karo jab same entities ki information alag tables mein faili ho; concat tab jab tum aise tukde append ya stack kar rahe ho jinki structure already same hai, jaise monthly CSVs ko jodna.',
            },
          },
        ],
      },
      {
        title: 'Exporting and a Peek at Time Series',
        difficulty: 'medium',
        tags: ['to_csv', 'export', 'time-series', 'plot'],
        explanation: {
          english:
            'After analysis you save results. df.to_csv(\'out.csv\', index=False) writes a DataFrame to a CSV file (index=False skips the row labels column); there are also to_excel and to_json. For time-based data, pd.to_datetime converts a column to datetime; setting it as the index lets you resample, e.g. df.resample(\'M\').sum() to roll daily data up into monthly totals. And for a quick visual, df.plot() (powered by Matplotlib) draws a chart in one call — df[\'revenue\'].plot(kind=\'bar\') for a bar chart. These close the analysis loop: load, clean, analyze, export, and visualize.',
          hinglish:
            'Analysis ke baad tum results save karte ho. df.to_csv(\'out.csv\', index=False) ek DataFrame ko CSV file mein likhta hai (index=False row labels column chhod deta hai); to_excel aur to_json bhi hain. Time-based data ke liye pd.to_datetime ek column ko datetime mein badalta hai; use index banane se tum resample kar sakte ho, jaise df.resample(\'M\').sum() daily data ko monthly totals mein roll up karne ke liye. Aur quick visual ke liye, df.plot() (Matplotlib se chalit) ek call mein chart banata hai — bar chart ke liye df[\'revenue\'].plot(kind=\'bar\'). Ye analysis loop poora karte hain: load, clean, analyze, export aur visualize.',
        },
        dailyLifeExample:
          'Saara hisaab nikalne ke baad final report ko ek nayi CSV mein save karna — jaise Excel mein "Save As". Aur daily sales ko mahine-mahine ke total mein badalna resample hai, jaise calendar ke har page ka jod nikalna.',
        codeExample:
          'import pandas as pd\n\ndf = pd.DataFrame({\n    \'date\': [\'2024-01-05\', \'2024-01-20\', \'2024-02-10\'],\n    \'revenue\': [100, 150, 200],\n})\n\n# Save results to a CSV (skip the index column)\ndf.to_csv(\'report.csv\', index=False)\n\n# Time series: parse dates and set as index\ndf[\'date\'] = pd.to_datetime(df[\'date\'])\nts = df.set_index(\'date\')\n\n# Roll daily data up into monthly totals\nmonthly = ts.resample(\'M\').sum()\nprint(monthly)\n\n# Quick chart (needs matplotlib): monthly[\'revenue\'].plot(kind=\'bar\')',
        keyPoints: [
          'df.to_csv(\'file.csv\', index=False) exports a DataFrame to CSV',
          'to_excel and to_json export to other formats',
          'pd.to_datetime + set_index enables time-series resampling',
          'df.plot() draws a quick chart via Matplotlib',
        ],
        quiz: [
          {
            question: 'How do you save a DataFrame to a CSV file without the index column?',
            options: [
              'df.save_csv(\'out.csv\')',
              'df.to_csv(\'out.csv\', index=False)',
              'df.export(\'out.csv\')',
              'df.write_csv(\'out.csv\')',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does df.resample(\'M\').sum() do on a datetime-indexed DataFrame?',
            options: [
              'Removes missing values',
              'Aggregates the data into monthly totals',
              'Sorts the rows by date',
              'Renames the columns',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How does Pandas handle time series data, and what is resampling?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Pandas has strong time-series support built on a datetime index. You convert columns with pd.to_datetime, then set the datetime column as the index so Pandas understands the time axis. With a DatetimeIndex you can slice by date ranges, use date-based selection, and resample. Resampling changes the frequency of the series: downsampling aggregates finer data into coarser buckets (e.g. daily to monthly with resample(\'M\').sum()), while upsampling creates a finer grid and fills gaps (e.g. with forward fill or interpolation). This makes it easy to compute rolling windows, period-over-period changes, and trend summaries.',
              hinglish:
                'Pandas mein time-series ka strong support hai jo datetime index pe bana hai. Tum columns ko pd.to_datetime se convert karte ho, phir datetime column ko index banate ho taaki Pandas time axis samjhe. DatetimeIndex ke saath tum date ranges se slice kar sakte ho, date-based selection use kar sakte ho, aur resample kar sakte ho. Resampling series ki frequency badalta hai: downsampling fine data ko coarser buckets mein aggregate karta hai (jaise daily se monthly resample(\'M\').sum() se), jabki upsampling finer grid banata hai aur gaps bharta hai (jaise forward fill ya interpolation se). Isse rolling windows, period-over-period changes aur trend summaries nikalna aasan ho jaata hai.',
            },
          },
        ],
      },
    ],
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];

export const generalInterviewQuestions = [
  {
    question: 'What are the advantages of using Pandas over plain Python lists or dictionaries for data analysis?',
    difficulty: 'medium',
    frequency: 'very-common',
    answer: {
      english:
        'Pandas provides labeled, table-like DataFrames built on NumPy, so operations are vectorized and far faster than Python loops over lists. It gives a huge toolkit out of the box: reading/writing CSV, Excel, SQL and JSON; handling missing data; filtering, grouping, merging, and reshaping; and time-series support — each in a line or two. It aligns data by index automatically, handles mixed types per column, and scales to large datasets that would be painful with raw lists or dicts. In short, Pandas turns verbose, error-prone manual code into concise, reproducible, and fast analysis.',
      hinglish:
        'Pandas labeled, table jaise DataFrames deta hai jo NumPy pe bane hain, isliye operations vectorized hote hain aur lists pe Python loops se kaafi fast. Ye box mein hi bada toolkit deta hai: CSV, Excel, SQL aur JSON padhna/likhna; missing data handle karna; filter, group, merge aur reshape; aur time-series support — har ek do-ek line mein. Ye data ko index se automatically align karta hai, per column mixed types handle karta hai, aur bade datasets pe scale karta hai jo raw lists ya dicts ke saath dard bhare hote. Short mein, Pandas verbose, galti bhare manual code ko concise, reproducible aur fast analysis mein badal deta hai.',
    },
  },
  {
    question: 'Explain the difference between a view and a copy in Pandas and the SettingWithCopyWarning.',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Some Pandas operations return a view (a window onto the original data that shares memory) while others return a copy (independent data). When you slice a DataFrame and then assign into the result, Pandas may not know whether you intended to modify the original or a copy, and it raises the SettingWithCopyWarning to flag that your change might not stick or might affect unexpected data. The safe practice is to use .loc for combined selection-and-assignment in one step (df.loc[mask, \'col\'] = value) and to call .copy() explicitly when you want an independent subset to modify. This avoids ambiguous chained assignments like df[mask][\'col\'] = value, which is the usual trigger of the warning.',
      hinglish:
        'Kuch Pandas operations view return karte hain (original data pe ek khidki jo memory share karti hai) jabki kuch copy return karte hain (independent data). Jab tum DataFrame slice karke result mein assign karte ho, Pandas ko shayad pata na ho ki tum original badalna chahte ho ya copy, isliye ye SettingWithCopyWarning deta hai batane ko ki tumhara change shayad na tike ya unexpected data ko affect kare. Safe practice ye hai ki ek hi step mein selection-and-assignment ke liye .loc use karo (df.loc[mask, \'col\'] = value) aur jab independent subset badalna ho toh .copy() explicitly call karo. Isse df[mask][\'col\'] = value jaisi ambiguous chained assignments se bacha jaata hai, jo aam taur pe is warning ki wajah hoti hai.',
    },
  },
];
