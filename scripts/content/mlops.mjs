// MLOps course — advanced.
// Covers: ML lifecycle, experiment tracking, model serving/deployment, monitoring & retraining.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'MLOps',
  slug: 'mlops',
  description:
    'Production ML lifecycle — experiment tracking (MLflow, Weights & Biases), model serving aur deployment, CI/CD for models, monitoring, data/model drift detection aur retraining pipelines. AI ko reliably chalte rehna sikhata hai, English aur Hinglish mein.',
  icon: '🔧',
  tags: ['mlops', 'mlflow', 'deployment', 'monitoring', 'ci-cd'],
  difficulty: 'advanced',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 43,
};

const lifecycle = [
  {
    title: 'ML Lifecycle & Tracking',
    level: 'advanced',
    description: 'MLOps kya hai aur experiments track karna.',
    concepts: [
      {
        title: 'What is MLOps & the ML Lifecycle',
        difficulty: 'medium',
        tags: ['mlops', 'lifecycle', 'production'],
        explanation: {
          english:
            '**MLOps** is DevOps for machine learning — the practices and tools to reliably build, deploy, and maintain ML models in production. Building a model in a notebook is only the beginning; keeping it working for real users is the hard part.\n\nThe **ML lifecycle** is a loop, not a straight line:\n1. **Data** — collect, clean, and version your data\n2. **Train** — experiment with models and hyperparameters\n3. **Evaluate** — measure on held-out data\n4. **Deploy** — serve the model to users (API/batch)\n5. **Monitor** — watch performance, latency, and drift in production\n6. **Retrain** — when quality drops, go back with fresh data\n\nUnlike normal software, ML systems depend on *data* that changes over time — so they degrade silently. MLOps makes this loop automated, reproducible, and observable.',
          hinglish:
            '**MLOps** machine learning ke liye DevOps hai — wo practices aur tools jinse ML models ko production mein reliably build, deploy aur maintain karte hain. Notebook mein model banana sirf shuruaat hai; use real users ke liye chalte rakhna mushkil part hai.\n\n**ML lifecycle** ek loop hai, seedhi line nahi:\n1. **Data** — collect, clean aur version karo\n2. **Train** — models aur hyperparameters ke saath experiment karo\n3. **Evaluate** — held-out data pe measure karo\n4. **Deploy** — model users tak serve karo (API/batch)\n5. **Monitor** — production mein performance, latency aur drift dekho\n6. **Retrain** — jab quality gire, fresh data ke saath wapas jao\n\nNormal software ke ulat, ML systems *data* pe depend karte hain jo time ke saath badalta hai — toh ye silently degrade hote hain. MLOps is loop ko automated, reproducible aur observable banata hai.',
        },
        dailyLifeExample:
          'MLOps waise hai jaise ek restaurant sirf ek achhi dish banana nahi — balki roz same quality, fast service, fresh ingredients (data), aur customer feedback pe menu update karna. Ek baar biryani banana easy hai; roz 500 plates consistent dena MLOps hai.',
        codeExample:
          '# The ML lifecycle as a loop (conceptual)\n# data -> train -> evaluate -> deploy -> monitor -> (drift?) -> retrain -> ...\n#\n# Key difference from normal software:\n#   Normal app:   code changes -> behaviour changes\n#   ML system:    DATA changes -> behaviour changes (silently!)\n#\n# So MLOps adds: data versioning, experiment tracking,\n#               automated deployment, and production monitoring.',
        keyPoints: [
          'MLOps = DevOps practices for building, deploying, and maintaining ML',
          'The ML lifecycle is a loop: data → train → eval → deploy → monitor → retrain',
          'ML systems depend on data that changes, so they degrade silently over time',
          'A model in a notebook is not a product — production is the hard part',
          'MLOps makes the lifecycle automated, reproducible, and observable',
        ],
        quiz: [
          {
            question: 'Why do ML systems degrade over time even without code changes?',
            options: [
              'The code rots',
              'Real-world data changes, so the model becomes less accurate (drift)',
              'GPUs slow down',
              'They never degrade',
            ],
            correctIndex: 1,
          },
          {
            question: 'MLOps is best described as:',
            options: [
              'A single Python library',
              'DevOps practices and tools for the ML lifecycle in production',
              'A type of neural network',
              'A dataset format',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which stage comes right after "Deploy" in the ML lifecycle loop?',
            options: ['Data collection from scratch', 'Monitor', 'Delete the model', 'Nothing, the lifecycle ends'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Experiment Tracking (MLflow & W&B)',
        difficulty: 'medium',
        tags: ['mlflow', 'weights-and-biases', 'reproducibility', 'model-registry'],
        explanation: {
          english:
            'ML is highly experimental — you try many datasets, features, and hyperparameters. Without tracking, you quickly lose track of *which* run produced your best model. **Experiment tracking** logs every run\'s parameters, metrics, and artefacts so results are reproducible and comparable.\n\n**MLflow** (open-source) and **Weights & Biases (W&B)** are the popular tools. You log hyperparameters (learning rate, epochs), metrics (accuracy, loss), and artefacts (the trained model file, plots). A dashboard then lets you compare runs side by side.\n\nMLflow also provides a **Model Registry** — a versioned store of models with stages (Staging, Production). This is how teams promote a specific model version to production and roll back if needed.',
          hinglish:
            'ML bahut experimental hai — tum bahut saare datasets, features aur hyperparameters try karte ho. Tracking ke bina tum jaldi bhool jaate ho ki *kaunse* run ne best model banaya. **Experiment tracking** har run ke parameters, metrics aur artefacts log karta hai taaki results reproducible aur comparable ho.\n\n**MLflow** (open-source) aur **Weights & Biases (W&B)** popular tools hain. Tum hyperparameters (learning rate, epochs), metrics (accuracy, loss), aur artefacts (trained model file, plots) log karte ho. Ek dashboard phir runs ko side by side compare karne deta hai.\n\nMLflow ek **Model Registry** bhi deta hai — models ka versioned store stages ke saath (Staging, Production). Isse teams ek specific model version ko production mein promote karti hain aur zaroorat pe rollback karti hain.',
        },
        dailyLifeExample:
          'Experiment tracking waise hai jaise cooking mein har baar recipe ka note rakhna — kitna namak, kitni aanch, kitni der — taaki jo dish sabse achhi bani, use dobara exactly bana sako. Bina notes ke tum bhool jaoge kya kiya tha.',
        codeExample:
          '# Track an experiment with MLflow\n# pip install mlflow\nimport mlflow\n\nwith mlflow.start_run():\n    mlflow.log_param("learning_rate", 0.001)\n    mlflow.log_param("epochs", 10)\n\n    # ... train your model here ...\n    accuracy = 0.92\n\n    mlflow.log_metric("accuracy", accuracy)\n    mlflow.log_artifact("model.pkl")   # save the trained model\n# Compare all runs in the MLflow UI: `mlflow ui`',
        keyPoints: [
          'ML is experimental — tracking prevents losing your best configuration',
          'Log parameters, metrics, and artefacts for every run',
          'MLflow (open-source) and Weights & Biases are the popular tools',
          'Dashboards let you compare runs side by side',
          'A Model Registry versions models and manages Staging/Production stages',
        ],
        quiz: [
          {
            question: 'What is the main purpose of experiment tracking?',
            options: [
              'To make training slower',
              'To log parameters/metrics/artefacts so runs are reproducible and comparable',
              'To replace the dataset',
              'To deploy the app',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does an MLflow Model Registry provide?',
            options: [
              'A place to store raw images only',
              'Versioned models with stages like Staging and Production',
              'A GPU',
              'A web browser',
            ],
            correctIndex: 1,
          },
          {
            question: 'Besides metrics, what else should a good experiment tracking log include?',
            options: [
              'Nothing else is needed',
              'Hyperparameters and artefacts (like the trained model file)',
              'Only the final accuracy number',
              'The developer\'s personal notes app',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const deployMonitor = [
  {
    title: 'Deploy, Monitor & Retrain',
    level: 'advanced',
    description: 'Model serving, CI/CD, monitoring aur drift detection.',
    concepts: [
      {
        title: 'Serving & Deploying Models',
        difficulty: 'hard',
        tags: ['serving', 'api', 'docker', 'ci-cd'],
        explanation: {
          english:
            'A trained model file is useless until it can answer requests. **Serving** wraps the model behind an interface so applications can use it.\n\nTwo main patterns:\n- **Online (real-time)** — a REST/gRPC API returns predictions per request (e.g. FastAPI serving a model). Needs low latency.\n- **Batch** — score large datasets on a schedule (e.g. nightly recommendations).\n\n**Packaging & deployment:** wrap the model + code in a **Docker** container for reproducibility, then deploy to a server, Kubernetes, or a managed endpoint (SageMaker, Vertex AI). **CI/CD for models** automates test → build → deploy so a validated model ships safely, with the ability to roll back.\n\nAlso consider **versioning the model** (so requests map to a known version) and strategies like **canary** or **shadow** deployment to test a new model on real traffic before full rollout.',
          hinglish:
            'Trained model file tab tak bekaar hai jab tak wo requests ka answer na de sake. **Serving** model ko ek interface ke peeche wrap karti hai taaki applications use kar sakein.\n\nDo main patterns:\n- **Online (real-time)** — ek REST/gRPC API per request predictions deta hai (jaise FastAPI se model serve karna). Low latency chahiye.\n- **Batch** — bade datasets ko schedule pe score karo (jaise nightly recommendations).\n\n**Packaging & deployment:** model + code ko **Docker** container mein wrap karo reproducibility ke liye, phir server, Kubernetes, ya managed endpoint (SageMaker, Vertex AI) pe deploy karo. **CI/CD for models** test → build → deploy automate karti hai taaki validated model safely ship ho, rollback ki ability ke saath.\n\n**Model versioning** bhi socho (taaki requests ek known version pe map ho) aur **canary** ya **shadow** deployment jaise strategies — naye model ko full rollout se pehle real traffic pe test karne ke liye.',
        },
        dailyLifeExample:
          'Model serve karna waise hai jaise ek chef ko kitchen se nikaal ke ek proper restaurant counter pe bithana — ab customers (apps) order (request) de sakte hain aur turant dish (prediction) paa sakte hain. Docker waise hai jaise poori kitchen ko ek container mein pack karna taaki kahin bhi same taste mile.',
        codeExample:
          '# Serve a model with FastAPI (online, real-time)\n# pip install fastapi uvicorn\nfrom fastapi import FastAPI\nimport joblib\n\napp = FastAPI()\nmodel = joblib.load("model.pkl")\n\n@app.post("/predict")\ndef predict(features: list[float]):\n    pred = model.predict([features])[0]\n    return {"prediction": float(pred), "model_version": "1.3.0"}\n\n# Then containerise with Docker and deploy behind CI/CD.',
        keyPoints: [
          'Serving exposes a model so apps can get predictions (REST/gRPC)',
          'Online serving = per-request low latency; batch = scheduled bulk scoring',
          'Package with Docker for reproducible deployment anywhere',
          'CI/CD for models automates test → build → deploy with rollback',
          'Use versioning and canary/shadow rollouts to ship new models safely',
        ],
        quiz: [
          {
            question: 'What is "online" (real-time) model serving?',
            options: [
              'Scoring a huge dataset once a night',
              'Returning predictions per request via an API with low latency',
              'Training the model live',
              'Storing the model in a database',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why containerise a model with Docker before deployment?',
            options: [
              'To make it larger',
              'For reproducible, consistent deployment across environments',
              'To delete dependencies',
              'It is not needed',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is a "shadow" deployment used for?',
            options: [
              'Deleting the old model immediately',
              'Testing a new model on real production traffic without it affecting the actual response users see',
              'Hiding the model from monitoring tools',
              'Training a model at night only',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Monitoring, Drift & Retraining',
        difficulty: 'hard',
        tags: ['monitoring', 'drift', 'retraining', 'observability'],
        explanation: {
          english:
            'Once live, a model must be **monitored** — this is what separates a demo from a real system. You track two kinds of signals:\n- **Operational**: latency, throughput, error rate, cost (like any service)\n- **Model quality**: prediction distribution, accuracy on labelled samples, and **drift**\n\n**Drift** is the silent killer. **Data drift** means the input distribution changed (e.g. new user behaviour, new products). **Concept drift** means the relationship between inputs and the correct output changed (e.g. fraud patterns evolve). Either way, a once-accurate model quietly gets worse.\n\nWhen monitoring detects drift or a quality drop below a threshold, a **retraining pipeline** kicks in: gather fresh labelled data, retrain, evaluate against the current model, and — only if better — promote the new version. Automating this loop is the heart of mature MLOps.',
          hinglish:
            'Live hone ke baad model ko **monitor** karna zaroori hai — yahi ek demo ko real system se alag karta hai. Tum do tarah ke signals track karte ho:\n- **Operational**: latency, throughput, error rate, cost (kisi bhi service ki tarah)\n- **Model quality**: prediction distribution, labelled samples pe accuracy, aur **drift**\n\n**Drift** silent killer hai. **Data drift** matlab input distribution badal gaya (jaise naya user behaviour, naye products). **Concept drift** matlab inputs aur correct output ka relationship badal gaya (jaise fraud patterns evolve hote hain). Dono cases mein, ek kabhi-accurate model chupchaap kharaab ho jaata hai.\n\nJab monitoring drift ya quality drop threshold ke neeche detect karti hai, ek **retraining pipeline** chalti hai: fresh labelled data lo, retrain karo, current model se evaluate karo, aur — sirf agar better ho — naya version promote karo. Is loop ko automate karna mature MLOps ka dil hai.',
        },
        dailyLifeExample:
          'Drift waise hai jaise ek dukaan ka best-seller: 2 saal pehle jo chalu tha, aaj customers ka taste badal gaya (data drift). Agar dukaandar monitor nahi karega aur stock update nahi karega, sales gir jayegi. MLOps model ki "sales" monitor karke time pe "stock" (retrain) update karta hai.',
        codeExample:
          '# Simple drift check: compare live feature mean vs training baseline\nimport numpy as np\n\ntrain_mean = 35.0          # avg user age during training\nlive_mean = np.mean(live_ages)   # avg age in production now\n\ndrift = abs(live_mean - train_mean) / train_mean\nif drift > 0.20:               # >20% shift\n    print("Data drift detected -> trigger retraining pipeline")\nelse:\n    print("Distribution stable")',
        keyPoints: [
          'Monitor both operational signals (latency, errors) and model quality',
          'Data drift = input distribution changes; concept drift = input→output relationship changes',
          'Drift makes an accurate model silently degrade over time',
          'Retraining pipeline: gather fresh data → retrain → evaluate → promote if better',
          'Automating detect-and-retrain is the core of mature MLOps',
        ],
        quiz: [
          {
            question: 'What is data drift?',
            options: [
              'The model code changing',
              'The input data distribution changing over time vs training',
              'The GPU overheating',
              'A type of loss function',
            ],
            correctIndex: 1,
          },
          {
            question: 'What should typically trigger a retraining pipeline?',
            options: [
              'Every single request',
              'Detected drift or model quality dropping below a threshold',
              'A code comment',
              'Nothing — models never need retraining',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the difference between data drift and concept drift?',
            options: [
              'They are the same thing',
              'Data drift is the input distribution changing; concept drift is the input-to-output relationship changing',
              'Data drift only happens in images; concept drift only in text',
              'Concept drift is fixed by adding more RAM',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is model drift and how do you handle it?',
            answer: {
              english:
                'Model drift is the degradation of a deployed model\'s performance over time. Data drift is when the input distribution shifts; concept drift is when the input-to-output relationship changes. You handle it by monitoring production predictions and quality metrics, detecting drift against a baseline, and triggering an automated retraining pipeline that gathers fresh data, retrains, evaluates against the current model, and promotes the new version only if it performs better.',
              hinglish:
                'Model drift deployed model ki performance ka time ke saath degrade hona hai. Data drift tab hai jab input distribution shift hota hai; concept drift tab jab input-to-output relationship badalta hai. Ise handle karne ke liye production predictions aur quality metrics monitor karo, baseline ke against drift detect karo, aur ek automated retraining pipeline trigger karo jo fresh data le, retrain kare, current model se evaluate kare, aur naya version sirf tab promote kare jab wo better perform kare.',
            },
          },
        ],
      },
      {
        title: 'Feature Stores: Consistent Features for Training & Serving',
        difficulty: 'hard',
        tags: ['feature-store', 'training-serving-skew', 'feature-engineering'],
        explanation: {
          english:
            "A sneaky, common production bug is **training-serving skew**: the code that computes a feature during training (e.g. in a Python notebook using Pandas) is subtly different from the code that computes it at inference time (e.g. in a Java backend), so the model sees slightly different values in production than it learned from — silently hurting accuracy.\n\nA **feature store** solves this by centralising feature computation and storage in one place, used by both training and serving. It typically has two sides: an **offline store** (historical feature values, for training, often on cheap bulk storage) and an **online store** (low-latency, current feature values, for real-time serving, often backed by a fast key-value database). The SAME feature definition/pipeline populates both, so training and serving are guaranteed to see consistent, correctly-computed features. Popular examples: Feast (open-source), Tecton, and cloud-native options (SageMaker Feature Store, Vertex AI Feature Store).",
          hinglish:
            "Ek chhupa hua, common production bug hai **training-serving skew**: training ke time feature compute karne wala code (jaise Python notebook mein Pandas se) inference time pe feature compute karne wale code (jaise Java backend mein) se thoda alag hota hai, isliye model production mein thode alag values dekhta hai jinse usne seekha tha — chupchaap accuracy kharab karta hai.\n\nEk **feature store** ise solve karta hai feature computation aur storage ko ek jagah centralise karke, jo training aur serving dono use karte hain. Iske typically do sides hote hain: ek **offline store** (historical feature values, training ke liye, aksar cheap bulk storage pe) aur ek **online store** (low-latency, current feature values, real-time serving ke liye, aksar ek fast key-value database se backed). SAME feature definition/pipeline dono ko populate karti hai, isliye training aur serving guaranteed consistent, correctly-computed features dekhte hain. Popular examples: Feast (open-source), Tecton, aur cloud-native options (SageMaker Feature Store, Vertex AI Feature Store).",
        },
        dailyLifeExample:
          'Training-serving skew waise hai jaise ek recipe book mein "1 cup chai patti" likha ho, par kitchen mein ek alag measuring cup use ho raha ho jo actually 1.5 cups ke barabar hai — dish (prediction) test kitchen (training) se thodi alag ban jaati hai restaurant (production) mein. Feature store ek single, shared measuring cup hai jo dono jagah use hoti hai.',
        codeExample:
          '# Conceptual feature store usage (Feast-style)\n# Define a feature once:\n# user_avg_order_value = FeatureView(\n#     name="user_avg_order_value",\n#     entities=["user_id"],\n#     source=orders_table,\n# )\n\n# Training: fetch historical values (offline store) for many users/times\n# training_df = store.get_historical_features(entity_df, features=["user_avg_order_value"])\n\n# Serving: fetch current value (online store) for one user, low-latency\n# live_features = store.get_online_features(features=["user_avg_order_value"], entity_rows=[{"user_id": 42}])\n# -> SAME feature definition used in both, so no skew',
        keyPoints: [
          'Training-serving skew: feature computed differently in training vs production hurts accuracy silently',
          'A feature store centralises feature computation so training and serving stay consistent',
          'Offline store: historical features for training; online store: low-latency current features for serving',
          'The same feature pipeline populates both stores, eliminating skew',
          'Popular tools: Feast (open-source), Tecton, SageMaker/Vertex AI Feature Store',
        ],
        quiz: [
          {
            question: 'What is "training-serving skew"?',
            options: [
              'The model taking too long to train',
              'A feature being computed differently at training time vs at serving/inference time, causing accuracy loss',
              'A GPU running out of memory',
              'Two different datasets having different sizes',
            ],
            correctIndex: 1,
          },
          {
            question: 'What problem does a feature store primarily solve?',
            options: [
              'It makes models train faster',
              'It centralises feature computation so training and serving use consistent, correctly-computed features',
              'It replaces the need for a model entirely',
              'It stores only images',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the difference between a feature store\'s offline and online store?',
            options: [
              'There is no difference',
              'Offline stores historical features for training; online stores low-latency current features for real-time serving',
              'Offline is for images, online is for text',
              'Online store is only used during training',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Data Versioning & Reproducibility',
        difficulty: 'medium',
        tags: ['dvc', 'data-versioning', 'reproducibility', 'lineage'],
        explanation: {
          english:
            "Git versions code well, but it's a poor fit for large datasets and model files (multi-GB binary blobs). Yet reproducibility demands you know EXACTLY which data version produced a given model — if you can't reproduce a training run, you can't debug it or safely roll back.\n\nTools like **DVC (Data Version Control)** solve this: it stores small pointer files in Git (like Git-LFS) while the actual large data/model files live in cheap storage (S3, GCS, etc.). Running `dvc add data.csv` creates a small `.dvc` metadata file you commit normally, while the real data is pushed to remote storage. This gives you **data lineage**: for any model, you can trace back exactly which code version + data version + hyperparameters produced it — essential for debugging, audits, and compliance (e.g. 'which data trained the model that made this decision?').",
          hinglish:
            "Git code ko achhe se version karta hai, par bade datasets aur model files (multi-GB binary blobs) ke liye poor fit hai. Par reproducibility maangti hai ki tumhe EXACTLY pata ho kaunsi data version ne ek given model banaya — agar training run reproduce nahi kar sakte, toh use debug nahi kar sakte ya safely rollback nahi kar sakte.\n\n**DVC (Data Version Control)** jaise tools ise solve karte hain: ye chhote pointer files Git mein store karte hain (Git-LFS jaisa), jabki actual bade data/model files cheap storage (S3, GCS, etc.) mein rehte hain. `dvc add data.csv` chalane se ek chhota `.dvc` metadata file banta hai jo tum normally commit karte ho, jabki real data remote storage pe push hota hai. Isse **data lineage** milti hai: kisi bhi model ke liye, tum exactly trace kar sakte ho ki kaunsa code version + data version + hyperparameters ne use banaya — debugging, audits aur compliance ke liye essential (jaise 'is decision wale model ko kaunse data ne train kiya tha?').",
        },
        dailyLifeExample:
          'Data versioning waise hai jaise ek recipe ke saath ye bhi note karna ki ingredients kis dukaan se, kis din khareede gaye the — agar dish kabhi galat bane, tum exactly trace kar sakte ho ki kaunsa batch ingredients ka istemaal hua tha.',
        codeExample:
          '# DVC basic workflow\n# pip install dvc\n# dvc init\n# dvc add data/train.csv          # creates data/train.csv.dvc (small, goes in Git)\n# git add data/train.csv.dvc .gitignore\n# git commit -m "Track training data v1"\n# dvc remote add -d storage s3://my-bucket/dvc-store\n# dvc push                        # uploads actual data to S3\n#\n# Later, reproduce an exact past state:\n# git checkout <commit>   # gets the .dvc pointer for that version\n# dvc pull                # pulls the matching data from storage',
        keyPoints: [
          'Git is a poor fit for large datasets/model binaries; DVC (or similar) fills that gap',
          'DVC stores small pointer files in Git while real data lives in cheap remote storage (S3/GCS)',
          'This gives full data lineage: trace which code + data + hyperparameters produced a given model',
          'Reproducibility is essential for debugging, rollback, audits, and compliance',
          'Without data versioning, "which data trained this model" becomes unanswerable over time',
        ],
        quiz: [
          {
            question: 'Why is Git alone usually a poor fit for versioning large training datasets?',
            options: [
              'Git cannot store any files',
              'Git is optimised for text/code diffs, not large multi-GB binary blobs, making repos huge and slow',
              'Git deletes files automatically',
              'Datasets cannot be stored on computers',
            ],
            correctIndex: 1,
          },
          {
            question: 'How does a tool like DVC typically work alongside Git?',
            options: [
              'It replaces Git entirely',
              'It stores small pointer/metadata files in Git while the actual large data lives in remote storage like S3',
              'It stores everything directly inside Git commits',
              'It has no relationship with Git',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does data lineage (tracing code + data + hyperparameters for a model) matter?',
            options: [
              'It does not matter in practice',
              'It enables debugging, safe rollback, and compliance/audit answers like "what data trained this model"',
              'It only matters for very small projects',
              'It replaces the need for monitoring',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'A/B Testing & Canary Deployments for ML Models',
        difficulty: 'hard',
        tags: ['ab-testing', 'canary', 'statistical-significance', 'rollout'],
        explanation: {
          english:
            "Offline evaluation (test-set accuracy) tells you a new model looks better on paper — but the only way to know it's ACTUALLY better for real users is testing it on real traffic, carefully.\n\n**Canary deployment**: route a small percentage of traffic (e.g. 5%) to the new model version while most traffic still goes to the old one. Watch operational and quality metrics closely; if healthy, gradually increase the percentage until full rollout — if something's wrong, only a small slice of users was affected, and you roll back instantly.\n\n**A/B testing**: split traffic between model A (control) and model B (challenger) and compare a business metric (click-through rate, revenue, task success) — not just model accuracy. Crucially, use **statistical significance** testing before declaring a winner: a 2% lift measured on a tiny sample could easily be random noise. Run the test long enough and on enough traffic to be confident the difference is real, not chance.",
          hinglish:
            "Offline evaluation (test-set accuracy) batati hai ki naya model paper pe better lagta hai — par ye janne ka asli tareeka ki wo real users ke liye ACTUALLY better hai, use real traffic pe carefully test karna hai.\n\n**Canary deployment**: traffic ka ek chhota percentage (jaise 5%) naye model version ko route karo jabki zyadatar traffic purane pe hi jaaye. Operational aur quality metrics closely dekho; agar healthy hai, percentage gradually badhao jab tak full rollout na ho — agar kuch galat hai, sirf users ka ek chhota slice affected hua, aur tum instantly rollback kar sakte ho.\n\n**A/B testing**: traffic ko model A (control) aur model B (challenger) mein split karo aur ek business metric compare karo (click-through rate, revenue, task success) — sirf model accuracy nahi. Crucially, winner declare karne se pehle **statistical significance** testing use karo: ek chhote sample pe measure kiya gaya 2% lift aasani se random noise ho sakta hai. Test ko itni der aur itne traffic pe chalao ki confident ho sako ki difference real hai, chance nahi.",
        },
        dailyLifeExample:
          'Canary deployment waise hai jaise ek naye restaurant dish ko pehle sirf kuch tables ko serve karna, poore menu mein daalne se pehle — agar log bimaar padein, sirf chand log affected hote hain. A/B testing waise hai jaise aadhe customers ko purani recipe aur aadhe ko nayi dekar dekhna kaun zyada order repeat karta hai — sirf taste (accuracy) nahi, actual behaviour (business metric) compare karo.',
        codeExample:
          '# Simple statistical significance check for an A/B test (conceptual)\nfrom scipy import stats\n\n# conversions out of visitors for each group\na_conversions, a_total = 120, 5000   # control (old model)\nb_conversions, b_total = 140, 5000   # challenger (new model)\n\n_, p_value = stats.proportions_ztest(\n    [a_conversions, b_conversions], [a_total, b_total]\n)\n\nif p_value < 0.05:\n    print("Statistically significant difference -> safe to declare a winner")\nelse:\n    print("Not significant yet -> could be random noise, keep testing")',
        keyPoints: [
          'Canary deployment: route a small % of traffic to a new model, expand gradually if healthy',
          'A/B testing: split traffic between control and challenger, compare business metrics not just accuracy',
          'Always check statistical significance before declaring an A/B test winner — small samples can mislead',
          'Canary limits blast radius if something goes wrong; A/B testing measures real impact scientifically',
          'Offline test-set accuracy alone is not proof a model is better in production',
        ],
        quiz: [
          {
            question: 'What is the main purpose of a canary deployment?',
            options: [
              'To delete the old model immediately',
              'To route a small percentage of real traffic to a new model version, limiting risk if something goes wrong',
              'To test the model only offline',
              'To skip evaluation entirely',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why is statistical significance important before declaring an A/B test winner?',
            options: [
              'It is not important, any measured difference is proof enough',
              'A small measured difference on limited traffic could just be random noise, not a real improvement',
              'It only matters for very large companies',
              'Statistical significance guarantees the model has no bugs',
            ],
            correctIndex: 1,
          },
          {
            question: 'In A/B testing for ML models, what should typically be compared, not just accuracy?',
            options: [
              'Nothing else matters besides accuracy',
              'Real business/behavioural metrics like click-through rate, revenue, or task success',
              'The size of the model file',
              'The programming language used',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const curriculum = [
  ...lifecycle,
  ...deployMonitor,
];

export const generalInterviewQuestions = [
  {
    question: 'What is MLOps and why is it needed?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'MLOps applies DevOps principles to machine learning: automating and standardising the lifecycle of building, deploying, monitoring, and retraining models in production. It is needed because ML systems depend on data that changes over time, so they degrade silently — MLOps makes the process reproducible, observable, and reliable, turning a one-off notebook model into a maintainable product.',
      hinglish:
        'MLOps DevOps principles ko machine learning pe apply karta hai: production mein models build, deploy, monitor aur retrain karne ke lifecycle ko automate aur standardise karna. Ye zaroori hai kyunki ML systems data pe depend karte hain jo time ke saath badalta hai, toh ye silently degrade hote hain — MLOps process ko reproducible, observable aur reliable banata hai, ek one-off notebook model ko maintainable product mein badalta hai.',
    },
  },
  {
    question: 'What tools are commonly used for experiment tracking?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'MLflow (open-source) and Weights & Biases (W&B) are the most common. They log hyperparameters, metrics, and artefacts for each run so experiments are reproducible and comparable, and MLflow additionally offers a Model Registry to version and stage models for production.',
      hinglish:
        'MLflow (open-source) aur Weights & Biases (W&B) sabse common hain. Ye har run ke hyperparameters, metrics aur artefacts log karte hain taaki experiments reproducible aur comparable ho, aur MLflow additionally ek Model Registry deta hai models ko version aur stage karne ke liye production ke waaste.',
    },
  },

  // ─── MLOps Foundations ───────────────────────────────────────────
  {
    question: 'What is MLOps and how does it differ from DevOps?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'MLOps applies DevOps discipline to machine learning, but adds concerns DevOps never had. In DevOps, behaviour changes only when CODE changes. In ML, behaviour also changes when DATA changes — so a model can silently degrade with zero code deployments. MLOps therefore adds: data versioning, experiment tracking, model registries, drift monitoring, and automated retraining pipelines on top of standard CI/CD.',
      hinglish:
        'MLOps DevOps discipline ko machine learning pe apply karta hai, par wo concerns add karta hai jo DevOps ke paas kabhi nahi the. DevOps mein, behaviour sirf tab badalta hai jab CODE badalta hai. ML mein, behaviour tab bhi badalta hai jab DATA badalta hai — isliye ek model zero code deployments ke saath silently degrade ho sakta hai. Isliye MLOps standard CI/CD ke upar add karta hai: data versioning, experiment tracking, model registries, drift monitoring, aur automated retraining pipelines.',
    },
  },
  {
    question: 'What are the stages of the ML lifecycle?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'It is a LOOP, not a line: (1) Data collection and cleaning, (2) Feature engineering, (3) Model training and experimentation, (4) Evaluation on held-out data, (5) Deployment to serve predictions, (6) Monitoring in production, (7) Retraining when quality drops — then back to step 1. Treating it as a one-way pipeline is the classic mistake: most of the real work happens after the first deployment, not before it.',
      hinglish:
        'Ye ek LOOP hai, ek line nahi: (1) Data collection aur cleaning, (2) Feature engineering, (3) Model training aur experimentation, (4) Held-out data pe evaluation, (5) Predictions serve karne ke liye deployment, (6) Production mein monitoring, (7) Quality girne pe retraining — phir wapas step 1. Ise ek one-way pipeline maanna classic mistake hai: asli kaam ka zyadatar hissa pehle deployment ke BAAD hota hai, pehle nahi.',
    },
  },
  {
    question: 'Why is experiment tracking necessary in ML?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'ML development involves dozens or hundreds of runs with different hyperparameters, features, and data versions. Without tracking, you quickly lose the answer to "which exact configuration produced my best model?" — and cannot reproduce it. Experiment tracking logs parameters, metrics, and artefacts for every run, giving you a searchable, comparable history. It is the difference between engineering and guessing.',
      hinglish:
        'ML development mein dozens ya sau runs hote hain different hyperparameters, features, aur data versions ke saath. Tracking ke bina, tum jaldi "kaunsi exact configuration ne mera best model banaya?" ka jawab kho dete ho — aur use reproduce nahi kar sakte. Experiment tracking har run ke parameters, metrics, aur artefacts log karta hai, ek searchable, comparable history dete hue. Ye engineering aur guessing ke beech ka difference hai.',
    },
  },
  {
    question: 'What is a Model Registry and why do you need one?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A Model Registry is a versioned store of trained models with lifecycle STAGES (None → Staging → Production → Archived). It answers the questions production teams actually need: which model version is live right now, who approved it, what data trained it, and what do I roll back to if it fails. Without a registry, "the current model" ends up as an untracked file on someone\'s machine — unauditable and impossible to roll back safely.',
      hinglish:
        'Ek Model Registry trained models ka ek versioned store hai lifecycle STAGES ke saath (None → Staging → Production → Archived). Ye wo sawaal answer karta hai jo production teams ko actually chahiye: kaunsa model version abhi live hai, kisne approve kiya, kaunse data ne train kiya, aur fail hone pe main kis pe rollback karoon. Registry ke bina, "current model" kisi ki machine pe ek untracked file ban jaata hai — unauditable aur safely rollback karna impossible.',
    },
  },
  {
    question: 'What is the difference between online and batch inference?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'ONLINE (real-time) inference serves one prediction per request via an API, with strict latency requirements (tens of milliseconds) — used for fraud checks at checkout or live recommendations. BATCH inference scores a large dataset on a schedule and stores results for later lookup — used for nightly recommendation refreshes or monthly churn scores. Batch is far cheaper and simpler; choose online only when the prediction genuinely must reflect this instant.',
      hinglish:
        'ONLINE (real-time) inference ek API ke through per request ek prediction serve karta hai, strict latency requirements ke saath (das milliseconds) — checkout pe fraud checks ya live recommendations ke liye use hota hai. BATCH inference ek schedule pe ek bade dataset ko score karta hai aur results baad mein lookup ke liye store karta hai — nightly recommendation refreshes ya monthly churn scores ke liye. Batch bahut sasta aur simple hai; online sirf tab choose karo jab prediction ko genuinely is instant ko reflect karna hi ho.',
    },
  },
  {
    question: 'What is model drift and what are its types?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Drift is the silent degradation of a deployed model over time. DATA DRIFT (covariate shift) means the input distribution changed — new user demographics, new product categories — while the underlying relationship holds. CONCEPT DRIFT means the relationship between inputs and the correct output changed — fraud tactics evolve, so the same signals no longer indicate fraud. Data drift can often be fixed by retraining on fresh data; concept drift may require rethinking features entirely.',
      hinglish:
        'Drift ek deployed model ka time ke saath silent degradation hai. DATA DRIFT (covariate shift) matlab input distribution badal gaya — naye user demographics, naye product categories — jabki underlying relationship hold karta hai. CONCEPT DRIFT matlab inputs aur correct output ka relationship badal gaya — fraud tactics evolve hote hain, isliye wahi signals ab fraud indicate nahi karte. Data drift aksar fresh data pe retrain karke fix ho jaata hai; concept drift ke liye features poori tarah rethink karne pad sakte hain.',
    },
  },
  {
    question: 'How do you detect data drift in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Compare the live input distribution against a stored training BASELINE. Simple approaches: track summary statistics (mean, standard deviation, null rate) per feature and alert when they move beyond a threshold. Statistical approaches: use the Kolmogorov-Smirnov test for continuous features, chi-squared for categorical, or Population Stability Index (PSI). Also monitor the PREDICTION distribution — if your model suddenly predicts "fraud" 10x more often, something upstream changed even if you cannot yet see it in the inputs.',
      hinglish:
        'Live input distribution ko ek stored training BASELINE ke against compare karo. Simple approaches: per feature summary statistics (mean, standard deviation, null rate) track karo aur alert karo jab wo ek threshold ke aage jaayein. Statistical approaches: continuous features ke liye Kolmogorov-Smirnov test, categorical ke liye chi-squared, ya Population Stability Index (PSI) use karo. PREDICTION distribution bhi monitor karo — agar tumhara model achanak 10x zyada baar "fraud" predict kare, upstream kuch badla hai chahe tum use inputs mein abhi na dekh sako.',
    },
  },
  {
    question: 'What should you monitor for a model in production?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Three layers. OPERATIONAL: latency (p50/p95/p99), throughput, error rate, resource usage, cost — the same as any service. DATA: input schema violations, null rates, feature distribution drift, out-of-range values. MODEL QUALITY: prediction distribution, confidence scores, and — where ground-truth labels eventually arrive — actual accuracy over time. Teams that monitor only the operational layer discover model failures from angry users rather than dashboards.',
      hinglish:
        'Teen layers. OPERATIONAL: latency (p50/p95/p99), throughput, error rate, resource usage, cost — kisi bhi service jaisa. DATA: input schema violations, null rates, feature distribution drift, out-of-range values. MODEL QUALITY: prediction distribution, confidence scores, aur — jahan ground-truth labels eventually aate hain — time ke saath actual accuracy. Wo teams jo sirf operational layer monitor karti hain, model failures dashboards ke bajaye gusse wale users se pata karti hain.',
    },
  },
  {
    question: 'What is a training-serving skew?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Training-serving skew is when a feature is computed DIFFERENTLY during training than at inference time, so the model receives values it was never trained on. Classic cause: training features computed in a Python/Pandas notebook, serving features re-implemented in Java/Go by another team — a subtle difference in rounding, timezone handling, or null defaults silently destroys accuracy. It is notoriously hard to debug because nothing errors; the model just quietly performs worse. Feature stores exist primarily to eliminate this.',
      hinglish:
        'Training-serving skew tab hai jab ek feature training ke dauraan inference time se ALAG compute hota hai, isliye model wo values receive karta hai jinpe wo kabhi train nahi hua. Classic cause: training features ek Python/Pandas notebook mein compute hue, serving features doosri team ne Java/Go mein re-implement kiye — rounding, timezone handling, ya null defaults mein ek subtle difference silently accuracy destroy kar deta hai. Ise debug karna notoriously mushkil hai kyunki kuch error nahi karta; model bas chupchaap kharaab perform karta hai. Feature stores primarily isi ko eliminate karne ke liye exist karte hain.',
    },
  },
  {
    question: 'What is a feature store?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A feature store centralises feature computation and storage so training and serving use the exact same definitions, eliminating skew. It has two halves: an OFFLINE store holding historical feature values for training (usually on cheap bulk storage, optimised for large scans) and an ONLINE store holding current values for low-latency serving (usually a fast key-value store). The same pipeline populates both. Popular options: Feast (open-source), Tecton, and cloud-native offerings from AWS SageMaker and Vertex AI.',
      hinglish:
        'Ek feature store feature computation aur storage ko centralise karta hai taaki training aur serving exactly same definitions use karein, skew eliminate karte hue. Iske do halves hain: ek OFFLINE store jo training ke liye historical feature values rakhta hai (usually cheap bulk storage pe, bade scans ke liye optimised) aur ek ONLINE store jo low-latency serving ke liye current values rakhta hai (usually ek fast key-value store). Wahi pipeline dono ko populate karti hai. Popular options: Feast (open-source), Tecton, aur AWS SageMaker aur Vertex AI ke cloud-native offerings.',
    },
  },
  {
    question: 'What is CI/CD for machine learning, and how does it differ from software CI/CD?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Software CI/CD tests and ships CODE. ML CI/CD must handle three moving parts — code, data, and model — so it adds stages: data validation (schema/quality checks), model training, model EVALUATION against the currently deployed model (never promote a worse model), and only then deployment. It also needs Continuous TRAINING (CT): pipelines that retrain automatically on fresh data or on a drift alert, which has no equivalent in traditional CI/CD.',
      hinglish:
        'Software CI/CD CODE test aur ship karta hai. ML CI/CD ko teen moving parts handle karne padte hain — code, data, aur model — isliye ye stages add karta hai: data validation (schema/quality checks), model training, currently deployed model ke against model EVALUATION (kabhi ek kharab model promote na karo), aur uske baad hi deployment. Isse Continuous TRAINING (CT) bhi chahiye: pipelines jo fresh data pe ya ek drift alert pe automatically retrain karein, jiska traditional CI/CD mein koi equivalent nahi hai.',
    },
  },
  {
    question: 'What is a canary deployment for an ML model?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A canary deployment routes a small slice of live traffic (say 5%) to the new model while the rest continues hitting the old one. You watch operational and quality metrics closely; if healthy, you progressively increase the share to 25%, 50%, 100%. If something breaks, only a small fraction of users were affected and rollback is instant. It is the standard way to validate a model against real traffic without betting the whole system on it.',
      hinglish:
        'Ek canary deployment live traffic ka ek chhota slice (maano 5%) naye model pe route karta hai jabki baaki purane pe jaata rehta hai. Tum operational aur quality metrics closely dekhte ho; agar healthy hai, tum share progressively 25%, 50%, 100% badhate ho. Agar kuch toota, sirf users ka ek chhota fraction affected hua aur rollback instant hai. Ye real traffic ke against ek model validate karne ka standard tareeka hai bina poore system ko uspe daav pe lagaye.',
    },
  },
  {
    question: 'What is a shadow deployment?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'In a shadow (or "dark launch") deployment, the new model receives a COPY of real production traffic and its predictions are logged — but never returned to users, who continue getting the old model\'s output. This lets you compare the new model against the old one on genuine live data with ZERO user risk. The tradeoff is cost (you run inference twice) and that you cannot measure downstream business impact, since nobody ever acts on the shadow predictions.',
      hinglish:
        'Ek shadow (ya "dark launch") deployment mein, naya model real production traffic ki ek COPY receive karta hai aur uski predictions log hoti hain — par users ko kabhi return nahi hoti, jinhe purane model ka output milta rehta hai. Isse tum naye model ko purane ke against genuine live data pe compare kar sakte ho ZERO user risk ke saath. Tradeoff cost hai (tum inference do baar chalate ho) aur ye ki tum downstream business impact measure nahi kar sakte, kyunki koi shadow predictions pe act hi nahi karta.',
    },
  },
  {
    question: 'What is A/B testing for ML models and why is statistical significance important?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A/B testing splits live traffic between the current model (control) and the new one (challenger), then compares a BUSINESS metric — click-through rate, revenue, conversion — not just offline accuracy. Statistical significance matters because a 2% lift measured over a few hundred users is well within the range of random noise; acting on it means shipping changes that do nothing. You must run long enough, on enough traffic, to be confident the difference is real before declaring a winner.',
      hinglish:
        'A/B testing live traffic ko current model (control) aur naye (challenger) ke beech split karta hai, phir ek BUSINESS metric compare karta hai — click-through rate, revenue, conversion — sirf offline accuracy nahi. Statistical significance matter karti hai kyunki kuch sau users pe measure kiya 2% lift random noise ki range mein hi hai; uspe act karna matlab aise changes ship karna jo kuch nahi karte. Winner declare karne se pehle tumhe itni der, itne traffic pe chalana padta hai ki tum confident ho ki difference real hai.',
    },
  },
  {
    question: 'Why is data versioning important, and why is Git not enough?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Reproducing a model requires knowing the exact CODE and the exact DATA that produced it — without both, you cannot debug a regression or roll back safely. Git handles code well but is poor for multi-gigabyte binary datasets: repos become enormous and slow, and diffs are meaningless. Tools like DVC solve this by committing small pointer files to Git while the actual data lives in cheap object storage (S3/GCS), giving you full data lineage without bloating the repository.',
      hinglish:
        'Ek model reproduce karne ke liye exact CODE aur exact DATA jaanna zaroori hai jisne use banaya — dono ke bina, tum ek regression debug nahi kar sakte ya safely rollback nahi kar sakte. Git code achhe se handle karta hai par multi-gigabyte binary datasets ke liye poor hai: repos enormous aur slow ho jaate hain, aur diffs meaningless hote hain. DVC jaise tools ise solve karte hain Git mein chhote pointer files commit karke jabki actual data cheap object storage (S3/GCS) mein rehta hai, tumhe repository bloat kiye bina full data lineage dete hue.',
    },
  },
  {
    question: 'What is model reproducibility and what do you need to guarantee it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Reproducibility means re-running training gives you the same model. You need to pin ALL of: the code version (Git commit), the data version (DVC hash or snapshot), the hyperparameters, the library versions (requirements lock file), the random SEED (weight init and data shuffling are stochastic), and ideally the container image and hardware. Miss any one — especially the seed or library versions — and you get a different model, making it impossible to tell whether a change helped or you just got a luckier initialisation.',
      hinglish:
        'Reproducibility matlab training dobara chalane se wahi model milta hai. Tumhe ye SAB pin karna padta hai: code version (Git commit), data version (DVC hash ya snapshot), hyperparameters, library versions (requirements lock file), random SEED (weight init aur data shuffling stochastic hain), aur ideally container image aur hardware. Inme se koi ek chhoot jaaye — especially seed ya library versions — aur tumhe ek different model milta hai, jisse ye batana impossible ho jaata hai ki ek change ne madad ki ya tumhe bas ek luckier initialisation mila.',
    },
  },
  {
    question: 'What triggers a retraining pipeline?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Three common triggers. SCHEDULED: retrain weekly/monthly regardless — simple and predictable, but wasteful if nothing changed and too slow if drift is fast. PERFORMANCE-BASED: retrain when a monitored metric (accuracy, drift score) crosses a threshold — efficient but requires reliable monitoring and ground-truth labels. DATA-VOLUME-BASED: retrain once N new labelled examples accumulate. Mature setups combine scheduled retraining as a floor with drift-triggered retraining for fast response.',
      hinglish:
        'Teen common triggers. SCHEDULED: har hafte/mahine retrain karo chahe kuch bhi ho — simple aur predictable, par kuch na badle to waste aur drift fast ho to bahut slow. PERFORMANCE-BASED: jab ek monitored metric (accuracy, drift score) ek threshold cross kare tab retrain karo — efficient par reliable monitoring aur ground-truth labels chahiye. DATA-VOLUME-BASED: N naye labelled examples accumulate hone pe retrain karo. Mature setups scheduled retraining ko ek floor ke roop mein aur drift-triggered retraining ko fast response ke liye combine karte hain.',
    },
  },
  {
    question: 'How do you decide whether to promote a newly trained model to production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Never promote automatically on "training finished". Gate promotion on: (1) offline evaluation on a held-out set showing the new model beats the CURRENT production model, not just some fixed baseline; (2) no regression on important data SLICES (a model can improve overall while getting worse for a key user segment); (3) fairness/bias checks; (4) operational checks — model size and latency within budget. Then validate on real traffic via canary or A/B before full rollout.',
      hinglish:
        'Kabhi "training finished" pe automatically promote mat karo. Promotion ko in pe gate karo: (1) held-out set pe offline evaluation dikhaye ki naya model CURRENT production model ko beat karta hai, sirf kisi fixed baseline ko nahi; (2) important data SLICES pe koi regression na ho (ek model overall improve kar sakta hai jabki ek key user segment ke liye kharab ho); (3) fairness/bias checks; (4) operational checks — model size aur latency budget ke andar. Phir full rollout se pehle canary ya A/B se real traffic pe validate karo.',
    },
  },
  {
    question: 'What is model rollback and why must it be planned in advance?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Rollback is reverting to a previous known-good model version when the new one misbehaves. It must be planned in advance because during an incident you need it to be a single fast action, not an investigation. Requirements: every model version and its artefacts retained in a registry (not overwritten), the serving layer able to switch versions by config rather than redeploy, and the associated preprocessing/feature code versioned alongside — rolling back the model but not its feature pipeline silently reintroduces skew.',
      hinglish:
        'Rollback ek previous known-good model version pe wapas jaana hai jab naya misbehave kare. Ise pehle se plan karna zaroori hai kyunki ek incident ke dauraan tumhe ise ek single fast action chahiye, ek investigation nahi. Requirements: har model version aur uske artefacts ek registry mein retained (overwrite nahi), serving layer versions ko redeploy ke bajaye config se switch kar sake, aur associated preprocessing/feature code saath mein versioned — model rollback karna par uski feature pipeline nahi, silently skew wapas le aata hai.',
    },
  },
  {
    question: 'What is the difference between MLflow, Kubeflow, and Airflow?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'They solve different problems and are often used together. MLFLOW is ML-specific tracking and model management: log experiments, compare runs, register/stage models. AIRFLOW is a general-purpose workflow ORCHESTRATOR — scheduling DAGs of tasks (used widely for data and retraining pipelines, not ML-specific). KUBEFLOW is an ML platform built on Kubernetes, providing pipelines, distributed training, and serving in a containerised environment. A typical stack: Airflow or Kubeflow orchestrates the pipeline, MLflow tracks the experiments inside it.',
      hinglish:
        'Ye different problems solve karte hain aur aksar saath use hote hain. MLFLOW ML-specific tracking aur model management hai: experiments log karo, runs compare karo, models register/stage karo. AIRFLOW ek general-purpose workflow ORCHESTRATOR hai — tasks ke DAGs schedule karna (data aur retraining pipelines ke liye widely use hota hai, ML-specific nahi). KUBEFLOW Kubernetes pe built ek ML platform hai, jo pipelines, distributed training, aur serving ek containerised environment mein deta hai. Ek typical stack: Airflow ya Kubeflow pipeline orchestrate karta hai, MLflow uske andar experiments track karta hai.',
    },
  },
  {
    question: 'Why containerise ML models with Docker?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'ML has notoriously fragile dependencies — specific Python, CUDA, cuDNN, and library versions that must align exactly. A container packages the model with its entire environment so it runs identically on a laptop, in CI, and in production, eliminating "works on my machine". It also gives you reproducible deployments, easy rollback (deploy a previous image tag), and horizontal scaling via any container orchestrator.',
      hinglish:
        'ML ki dependencies notoriously fragile hain — specific Python, CUDA, cuDNN, aur library versions jo exactly align hone chahiye. Ek container model ko uske poore environment ke saath package karta hai taaki wo ek laptop pe, CI mein, aur production mein identically chale, "works on my machine" eliminate karte hue. Ye reproducible deployments, easy rollback (ek previous image tag deploy karo), aur kisi bhi container orchestrator se horizontal scaling bhi deta hai.',
    },
  },
  {
    question: 'How do you serve an ML model as an API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Wrap the model behind an HTTP endpoint that accepts input, runs the SAME preprocessing used in training, calls predict, and returns the result as JSON. Common tools: FastAPI (flexible, Python-native), plus purpose-built servers like TorchServe, TensorFlow Serving, or NVIDIA Triton that add batching, versioning, and GPU management for free. Load the model ONCE at startup — a very common performance bug is reloading it inside the request handler.',
      hinglish:
        'Model ko ek HTTP endpoint ke peeche wrap karo jo input accept kare, training mein use hua WAHI preprocessing chalaye, predict call kare, aur result JSON ke roop mein return kare. Common tools: FastAPI (flexible, Python-native), plus TorchServe, TensorFlow Serving, ya NVIDIA Triton jaise purpose-built servers jo batching, versioning, aur GPU management free mein add karte hain. Model ko startup pe EK BAAR load karo — ek bahut common performance bug use request handler ke andar reload karna hai.',
    },
  },
  {
    question: 'What is request batching in model serving and why does it help?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Batching collects several incoming requests within a small time window (say 10ms) and runs them through the model as ONE forward pass. Because GPUs are massively parallel, processing 32 requests together often takes barely longer than processing one — so throughput rises dramatically at the cost of a few milliseconds of added latency per request. The tradeoff is tuned via max batch size and max wait time; tight latency SLOs need small windows, high-throughput batch workloads can afford larger ones.',
      hinglish:
        'Batching ek chhote time window (maano 10ms) ke andar kai incoming requests collect karta hai aur unhe model se EK forward pass mein chalata hai. Kyunki GPUs massively parallel hain, 32 requests ko saath process karna aksar ek ko process karne se mushkil se zyada time leta hai — isliye throughput dramatically badhta hai per request kuch milliseconds added latency ke cost pe. Tradeoff max batch size aur max wait time se tune hota hai; tight latency SLOs ko chhote windows chahiye, high-throughput batch workloads bade afford kar sakte hain.',
    },
  },
  {
    question: 'How do you reduce inference cost and latency in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Model-side: quantisation (FP32 to INT8), pruning, and knowledge distillation to a smaller student model; compile with TensorRT or ONNX Runtime. Serving-side: request batching, caching repeated predictions, and autoscaling replicas to actual traffic instead of over-provisioning. Architecture-side: route easy cases to a small fast model and only escalate hard ones to the large model (cascading), and prefer batch inference over online wherever the use case allows.',
      hinglish:
        'Model-side: quantisation (FP32 se INT8), pruning, aur ek chhote student model tak knowledge distillation; TensorRT ya ONNX Runtime se compile karo. Serving-side: request batching, repeated predictions cache karna, aur replicas ko over-provisioning ke bajaye actual traffic pe autoscale karna. Architecture-side: easy cases ko ek chhote fast model pe route karo aur sirf hard wale bade model pe escalate karo (cascading), aur jahan use case allow kare wahan online ke bajaye batch inference prefer karo.',
    },
  },
  {
    question: 'What is a data pipeline and what makes a good one?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A data pipeline moves and transforms data from sources into a form models can consume. A good one is: IDEMPOTENT (re-running produces the same result, so retries are safe), OBSERVABLE (you can see where it failed and why), VALIDATED (schema and quality checks fail loudly rather than passing bad data downstream), INCREMENTAL (processes only new data rather than everything), and VERSIONED (the transformation logic is in Git). Silent partial failure is the worst outcome — a pipeline that half-succeeds trains a model on incomplete data.',
      hinglish:
        'Ek data pipeline data ko sources se ek aise form mein move aur transform karti hai jise models consume kar sakein. Ek achhi pipeline: IDEMPOTENT hai (dobara chalane se wahi result, isliye retries safe hain), OBSERVABLE (tum dekh sakte ho kahan aur kyun fail hua), VALIDATED (schema aur quality checks loudly fail hote hain, bura data downstream pass karne ke bajaye), INCREMENTAL (sab kuch ke bajaye sirf naya data process karti hai), aur VERSIONED (transformation logic Git mein hai). Silent partial failure sabse bura outcome hai — ek pipeline jo aadhi succeed hoti hai, model ko incomplete data pe train karati hai.',
    },
  },
  {
    question: 'What is data validation in an ML pipeline?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Data validation checks incoming data against expectations BEFORE it reaches training or inference: correct schema and types, values within expected ranges, null rates within tolerance, category values in the known set, and no unexpected duplicates. Failing loudly here prevents the far more expensive outcome of silently training on corrupt data and shipping a broken model. Tools like Great Expectations or TensorFlow Data Validation codify these checks as testable assertions.',
      hinglish:
        'Data validation incoming data ko expectations ke against check karta hai training ya inference tak pahunchne se PEHLE: correct schema aur types, expected ranges ke andar values, tolerance ke andar null rates, known set mein category values, aur koi unexpected duplicates nahi. Yahan loudly fail hona us bahut zyada expensive outcome se bachata hai jisme silently corrupt data pe train karke ek broken model ship ho jaaye. Great Expectations ya TensorFlow Data Validation jaise tools in checks ko testable assertions ke roop mein codify karte hain.',
    },
  },
  {
    question: 'What is model explainability and why does MLOps care about it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Explainability is the ability to say WHY a model made a specific prediction. MLOps cares for three practical reasons: regulatory compliance (credit and hiring decisions often legally require an explanation), debugging (feature attributions reveal when a model has latched onto a spurious signal), and stakeholder trust (teams will not adopt a system they cannot interrogate). SHAP and LIME are the standard tools, producing per-prediction feature attributions.',
      hinglish:
        'Explainability ye batane ki ability hai ki ek model ne ek specific prediction KYUN banayi. MLOps teen practical wajahon se care karta hai: regulatory compliance (credit aur hiring decisions ko aksar legally ek explanation chahiye), debugging (feature attributions reveal karte hain jab ek model ek spurious signal pe latch kar gaya ho), aur stakeholder trust (teams ek aisa system adopt nahi karengi jise wo interrogate na kar sakein). SHAP aur LIME standard tools hain, per-prediction feature attributions produce karte hue.',
    },
  },
  {
    question: 'How do you handle bias and fairness in production ML?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Treat it as an ongoing monitoring problem, not a one-time audit. Steps: identify protected attributes and relevant subgroups; evaluate metrics PER SLICE rather than only in aggregate (a model at 92% overall can be at 60% for one group); pick an explicit fairness definition suited to the context (equal opportunity, demographic parity — these are mathematically incompatible, so you must choose); and re-check after every retrain, since drift can reintroduce bias. Document the tradeoffs made, because there is no single objectively fair model.',
      hinglish:
        'Ise ek ongoing monitoring problem samjho, ek one-time audit nahi. Steps: protected attributes aur relevant subgroups identify karo; metrics ko PER SLICE evaluate karo sirf aggregate mein nahi (92% overall wala model ek group ke liye 60% pe ho sakta hai); context ke hisaab se ek explicit fairness definition choose karo (equal opportunity, demographic parity — ye mathematically incompatible hain, isliye choose karna padta hai); aur har retrain ke baad phir check karo, kyunki drift bias wapas la sakta hai. Kiye gaye tradeoffs document karo, kyunki koi ek objectively fair model nahi hota.',
    },
  },
  {
    question: 'What is the difference between offline and online evaluation?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'OFFLINE evaluation scores the model on a static held-out dataset — fast, cheap, repeatable, and safe, but it only measures accuracy on historical data. ONLINE evaluation measures the model on live traffic against BUSINESS outcomes (revenue, engagement, conversion). The two frequently disagree: a model with better offline accuracy can perform worse in production because offline metrics ignore latency, feedback loops, and user behaviour. Offline evaluation is a gate to decide what is worth testing online; only online evaluation tells you what actually works.',
      hinglish:
        'OFFLINE evaluation model ko ek static held-out dataset pe score karta hai — fast, sasta, repeatable, aur safe, par ye sirf historical data pe accuracy measure karta hai. ONLINE evaluation model ko live traffic pe BUSINESS outcomes (revenue, engagement, conversion) ke against measure karta hai. Ye dono frequently disagree karte hain: better offline accuracy wala model production mein kharab perform kar sakta hai kyunki offline metrics latency, feedback loops, aur user behaviour ignore karte hain. Offline evaluation ek gate hai ye decide karne ke liye ki online test karne layak kya hai; sirf online evaluation batata hai ki actually kya kaam karta hai.',
    },
  },
  {
    question: 'What is a feedback loop in ML systems and why is it dangerous?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A feedback loop occurs when a model\'s own predictions influence the data it later trains on. A recommender that only surfaces popular items generates engagement data showing those items are popular, reinforcing the bias and burying everything else — the model progressively narrows the world it can see. In predictive policing, patrolling a flagged area produces more recorded incidents there, "confirming" the prediction. Mitigations: inject exploration/randomisation, log counterfactuals, and monitor for shrinking diversity in outputs.',
      hinglish:
        'Ek feedback loop tab hota hai jab ek model ki khud ki predictions us data ko influence karti hain jispe wo baad mein train hota hai. Ek recommender jo sirf popular items dikhaata hai, aisa engagement data generate karta hai jo dikhata hai ki wahi items popular hain, bias reinforce karte hue aur baaki sab dabate hue — model progressively us duniya ko sankuchit karta hai jise wo dekh sakta hai. Predictive policing mein, ek flagged area mein patrol karna wahan zyada recorded incidents produce karta hai, prediction ko "confirm" karte hue. Mitigations: exploration/randomisation inject karo, counterfactuals log karo, aur outputs mein ghatti diversity ke liye monitor karo.',
    },
  },
  {
    question: 'What is shadow mode vs champion-challenger?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Both compare a new model against the incumbent, but differ in exposure. SHADOW MODE: the challenger sees copied traffic and its predictions are only logged, never served — zero user risk, but no measurable business impact. CHAMPION-CHALLENGER: the challenger actually serves a slice of real traffic, so you can measure genuine business outcomes, at the cost of exposing some users to a potentially worse model. Typical progression: shadow first to catch crashes and obvious quality problems, then champion-challenger to prove business value.',
      hinglish:
        'Dono ek naye model ko incumbent ke against compare karte hain, par exposure mein differ karte hain. SHADOW MODE: challenger copied traffic dekhta hai aur uski predictions sirf log hoti hain, kabhi serve nahi hoti — zero user risk, par koi measurable business impact nahi. CHAMPION-CHALLENGER: challenger actually real traffic ka ek slice serve karta hai, isliye tum genuine business outcomes measure kar sakte ho, kuch users ko ek potentially kharab model pe expose karne ke cost pe. Typical progression: pehle shadow crashes aur obvious quality problems pakadne ke liye, phir champion-challenger business value prove karne ke liye.',
    },
  },
  {
    question: 'How do you version an ML model properly?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A model version must bundle more than the weights file. Record: the model artefact itself, the training code commit, the training data version/hash, the hyperparameters, the preprocessing/feature code version, the evaluation metrics, and the environment (library versions, container image). A registry stores these together under one version ID. Versioning only the .pkl file is the common mistake — you end up with a model nobody can reproduce, audit, or safely roll back to.',
      hinglish:
        'Ek model version ko weights file se zyada bundle karna padta hai. Record karo: model artefact khud, training code commit, training data version/hash, hyperparameters, preprocessing/feature code version, evaluation metrics, aur environment (library versions, container image). Ek registry inhe ek version ID ke under saath store karta hai. Sirf .pkl file version karna common mistake hai — tumhare paas ek aisa model reh jaata hai jise koi reproduce, audit, ya safely rollback nahi kar sakta.',
    },
  },
  {
    question: 'What is technical debt specific to ML systems?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'ML systems accumulate forms of debt that normal software does not, described in Google\'s "Hidden Technical Debt in ML" paper. Examples: ENTANGLEMENT (changing one feature changes everything else — "CACE: Changing Anything Changes Everything"), undeclared CONSUMERS (other teams silently depending on your model output), DATA DEPENDENCIES that are unversioned and unstable, GLUE CODE (most of the codebase becomes plumbing around a small model), and PIPELINE JUNGLES of accreted transformation steps nobody fully understands.',
      hinglish:
        'ML systems aise forms of debt accumulate karte hain jo normal software nahi karta, jo Google ke "Hidden Technical Debt in ML" paper mein describe kiye gaye hain. Examples: ENTANGLEMENT (ek feature badalna baaki sab badal deta hai — "CACE: Changing Anything Changes Everything"), undeclared CONSUMERS (doosri teams silently tumhare model output pe depend karti hain), DATA DEPENDENCIES jo unversioned aur unstable hain, GLUE CODE (codebase ka zyadatar hissa ek chhote model ke around plumbing ban jaata hai), aur accreted transformation steps ke PIPELINE JUNGLES jinhe koi poori tarah nahi samajhta.',
    },
  },
  {
    question: 'What is the difference between horizontal and vertical scaling for model serving?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'VERTICAL scaling means a bigger machine — more CPU/RAM or a stronger GPU. It is simple and sometimes necessary (a large model may not fit otherwise), but has a hard ceiling and a single point of failure. HORIZONTAL scaling means more replicas behind a load balancer — effectively unlimited capacity and fault tolerance, and the standard approach for stateless inference services. Practical note: with GPUs, vertical often matters first (the model must fit in VRAM), then you scale horizontally for throughput.',
      hinglish:
        'VERTICAL scaling matlab ek badi machine — zyada CPU/RAM ya ek stronger GPU. Ye simple hai aur kabhi necessary bhi (ek bada model warna fit na ho), par iski ek hard ceiling aur ek single point of failure hai. HORIZONTAL scaling matlab ek load balancer ke peeche zyada replicas — effectively unlimited capacity aur fault tolerance, aur stateless inference services ke liye standard approach. Practical note: GPUs ke saath, vertical aksar pehle matter karta hai (model VRAM mein fit hona chahiye), phir throughput ke liye horizontally scale karte ho.',
    },
  },
  {
    question: 'What is GPU utilisation and why is low utilisation a problem?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'GPU utilisation is the percentage of time the GPU is actually computing rather than idle. Low utilisation during training usually means the GPU is STARVED — waiting on data loading, CPU-side preprocessing, or slow disk I/O rather than doing maths. Since GPUs are the dominant cost in ML, running at 30% utilisation effectively wastes most of your spend. Fixes: more data-loader workers, prefetching, caching preprocessed data, larger batch sizes, and moving augmentation onto the GPU.',
      hinglish:
        'GPU utilisation wo percentage of time hai jab GPU actually compute kar raha hai, idle rehne ke bajaye. Training ke dauraan low utilisation usually matlab GPU STARVED hai — data loading, CPU-side preprocessing, ya slow disk I/O ka wait kar raha hai, maths karne ke bajaye. Kyunki ML mein GPUs dominant cost hain, 30% utilisation pe chalna effectively tumhara zyadatar spend waste karta hai. Fixes: zyada data-loader workers, prefetching, preprocessed data cache karna, bade batch sizes, aur augmentation GPU pe move karna.',
    },
  },
  {
    question: 'What is distributed training and what are its main strategies?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Distributed training splits work across multiple GPUs or machines. DATA PARALLELISM is the common case: every device holds a full copy of the model, processes a different slice of the batch, and gradients are averaged across devices — simple and effective when the model fits on one GPU. MODEL PARALLELISM splits the model itself across devices, needed when it is too large to fit — including pipeline parallelism (different layers on different devices) and tensor parallelism (splitting individual layers).',
      hinglish:
        'Distributed training kaam ko multiple GPUs ya machines mein split karti hai. DATA PARALLELISM common case hai: har device model ki ek poori copy rakhta hai, batch ka ek different slice process karta hai, aur gradients devices ke across average hote hain — simple aur effective jab model ek GPU pe fit ho. MODEL PARALLELISM model ko khud devices mein split karta hai, jab wo fit hone ke liye bahut bada ho tab zaroori — pipeline parallelism (different devices pe different layers) aur tensor parallelism (individual layers split karna) included.',
    },
  },
  {
    question: 'What are the security concerns specific to ML systems?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Beyond normal application security: DATA POISONING (an attacker corrupts training data to implant a backdoor or degrade accuracy), ADVERSARIAL EXAMPLES (tiny crafted input perturbations that flip a prediction), MODEL EXTRACTION (repeated API queries used to clone your model), MEMBERSHIP INFERENCE (determining whether a specific person\'s record was in the training set — a privacy breach), and PROMPT INJECTION for LLM-based systems. Mitigations include input validation, rate limiting, output filtering, and treating training data provenance as a security boundary.',
      hinglish:
        'Normal application security ke alawa: DATA POISONING (ek attacker training data corrupt karke ek backdoor implant karta hai ya accuracy degrade karta hai), ADVERSARIAL EXAMPLES (tiny crafted input perturbations jo ek prediction palat dete hain), MODEL EXTRACTION (repeated API queries tumhara model clone karne ke liye), MEMBERSHIP INFERENCE (ye determine karna ki ek specific person ka record training set mein tha ya nahi — ek privacy breach), aur LLM-based systems ke liye PROMPT INJECTION. Mitigations mein input validation, rate limiting, output filtering, aur training data provenance ko ek security boundary maanna shamil hai.',
    },
  },
  {
    question: 'What is the difference between DataOps, MLOps, and LLMOps?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'DATAOPS focuses on reliable data pipelines: ingestion, quality, lineage, and availability — everything upstream of modelling. MLOPS covers the model lifecycle: training, versioning, deployment, monitoring, retraining. LLMOPS is the newer variant for large language models, where you usually do not train the base model — so the emphasis shifts to prompt versioning and evaluation, RAG pipelines, token cost and latency management, output guardrails, and hallucination monitoring rather than gradient-based retraining.',
      hinglish:
        'DATAOPS reliable data pipelines pe focus karta hai: ingestion, quality, lineage, aur availability — modelling se upstream sab kuch. MLOPS model lifecycle cover karta hai: training, versioning, deployment, monitoring, retraining. LLMOPS large language models ke liye newer variant hai, jahan tum usually base model train nahi karte — isliye emphasis prompt versioning aur evaluation, RAG pipelines, token cost aur latency management, output guardrails, aur hallucination monitoring pe shift ho jaata hai, gradient-based retraining ke bajaye.',
    },
  },
  {
    question: 'How do you estimate and control the cost of an ML system?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Break cost into: TRAINING (GPU-hours x instance price, usually spiky), INFERENCE (usually the dominant ongoing cost — requests x cost per request), STORAGE (datasets, model artefacts, logs), and DATA TRANSFER. Controls: use spot/preemptible instances for interruptible training, autoscale inference to real traffic with scale-to-zero for low-traffic services, right-size the model (a distilled model may be 90% as good at 10% of the cost), cache repeated predictions, and set budget alerts before the bill arrives.',
      hinglish:
        'Cost ko break karo: TRAINING (GPU-hours x instance price, usually spiky), INFERENCE (usually dominant ongoing cost — requests x per request cost), STORAGE (datasets, model artefacts, logs), aur DATA TRANSFER. Controls: interruptible training ke liye spot/preemptible instances use karo, inference ko real traffic pe autoscale karo low-traffic services ke liye scale-to-zero ke saath, model right-size karo (ek distilled model 10% cost pe 90% achha ho sakta hai), repeated predictions cache karo, aur bill aane se pehle budget alerts set karo.',
    },
  },
  {
    question: 'What is a golden dataset and why should you maintain one?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A golden dataset is a small, carefully curated, human-verified set of examples with known-correct answers, held FIXED over time. Because it never changes, it gives you a stable yardstick: every model version is evaluated against the identical bar, so improvements and regressions are genuinely comparable across months. It should deliberately include hard cases, edge cases, and known past failures — a regression suite for your model, exactly analogous to unit tests for code.',
      hinglish:
        'Ek golden dataset ek chhota, carefully curated, human-verified set of examples hai known-correct answers ke saath, jo time ke saath FIXED rakha jaata hai. Kyunki ye kabhi nahi badalta, ye tumhe ek stable yardstick deta hai: har model version identical bar ke against evaluate hota hai, isliye improvements aur regressions mahinon ke across genuinely comparable hote hain. Isme deliberately hard cases, edge cases, aur known past failures include hone chahiye — tumhare model ke liye ek regression suite, exactly code ke unit tests ke analogous.',
    },
  },
  {
    question: 'How do you handle a model that performs well offline but poorly in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Work through the usual suspects in order: (1) TRAINING-SERVING SKEW — is preprocessing identical in both paths? (2) DATA LEAKAGE — did a feature unavailable at prediction time leak into training, inflating offline scores? (3) DISTRIBUTION SHIFT — does live traffic actually match your test set? (4) TEST SET CONTAMINATION — was the test set used for tuning, making its score optimistic? (5) METRIC MISMATCH — are you optimising accuracy while the business cares about revenue? Log real production inputs and re-score them offline to localise the gap.',
      hinglish:
        'Usual suspects ko order mein dekho: (1) TRAINING-SERVING SKEW — preprocessing dono paths mein identical hai? (2) DATA LEAKAGE — koi feature jo prediction time pe available nahi tha, training mein leak hua, offline scores inflate karte hue? (3) DISTRIBUTION SHIFT — live traffic actually tumhare test set se match karta hai? (4) TEST SET CONTAMINATION — test set tuning ke liye use hua, uska score optimistic banate hue? (5) METRIC MISMATCH — tum accuracy optimise kar rahe ho jabki business ko revenue chahiye? Real production inputs log karo aur unhe offline re-score karo gap localise karne ke liye.',
    },
  },
  {
    question: 'What is data leakage and how do you prevent it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Data leakage is when information unavailable at real prediction time sneaks into training, producing impressive offline scores that collapse in production. Classic forms: TARGET leakage (a feature that is effectively a proxy for the answer, like "payment_received" when predicting churn), TEMPORAL leakage (using future information for a past prediction), and PREPROCESSING leakage (fitting a scaler or imputer on the full dataset BEFORE splitting, so test statistics bleed into training). Prevention: split first then preprocess inside a pipeline, and for time series always split chronologically.',
      hinglish:
        'Data leakage tab hai jab real prediction time pe unavailable information training mein ghus jaati hai, impressive offline scores produce karte hue jo production mein collapse ho jaate hain. Classic forms: TARGET leakage (ek feature jo effectively answer ka proxy hai, jaise churn predict karte waqt "payment_received"), TEMPORAL leakage (ek past prediction ke liye future information use karna), aur PREPROCESSING leakage (split karne se PEHLE full dataset pe ek scaler ya imputer fit karna, isliye test statistics training mein bleed ho jaate hain). Prevention: pehle split karo phir ek pipeline ke andar preprocess karo, aur time series ke liye hamesha chronologically split karo.',
    },
  },
  {
    question: 'What is the role of unit and integration testing in ML pipelines?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Beyond testing code correctness, ML needs tests for DATA and MODEL behaviour. Unit tests: feature transformation functions produce expected outputs, edge cases (nulls, zeros, extreme values) are handled. Data tests: schema, ranges, null rates. Model tests: it can overfit a tiny batch (proving the training loop works), predictions stay within valid bounds, known-critical examples still get correct answers, and inference latency is within budget. Integration tests exercise the whole pipeline end to end on a small sample.',
      hinglish:
        'Code correctness test karne ke alawa, ML ko DATA aur MODEL behaviour ke liye tests chahiye. Unit tests: feature transformation functions expected outputs dete hain, edge cases (nulls, zeros, extreme values) handle hote hain. Data tests: schema, ranges, null rates. Model tests: ye ek tiny batch overfit kar sakta hai (proving training loop kaam karta hai), predictions valid bounds ke andar rehti hain, known-critical examples ko abhi bhi correct answers milte hain, aur inference latency budget ke andar hai. Integration tests poori pipeline ko ek chhote sample pe end to end exercise karte hain.',
    },
  },
  {
    question: 'What is an SLA/SLO for an ML service?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An SLO is an internal target; an SLA is a customer-facing promise (usually with consequences). For ML services they cover both operational and quality dimensions: "p99 latency under 200ms", "99.9% availability", and — distinctively for ML — "accuracy above 85% measured weekly on labelled samples". Setting the internal SLO tighter than the external SLA gives you an error budget: room to detect and fix degradation before you breach the customer promise.',
      hinglish:
        'Ek SLO ek internal target hai; ek SLA ek customer-facing promise hai (usually consequences ke saath). ML services ke liye ye operational aur quality dono dimensions cover karte hain: "p99 latency 200ms se kam", "99.9% availability", aur — ML ke liye distinctively — "labelled samples pe weekly measure ki gayi accuracy 85% se upar". Internal SLO ko external SLA se tighter set karna tumhe ek error budget deta hai: customer promise breach karne se pehle degradation detect aur fix karne ki room.',
    },
  },
  {
    question: 'How do you approach labelling data for a production ML system?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Labelling is usually the real bottleneck, not modelling. Key practices: write a precise labelling GUIDELINE (ambiguity produces inconsistent labels, which caps achievable accuracy), measure inter-annotator AGREEMENT to detect a confusing task definition, use multiple annotators with adjudication for hard cases, and adopt ACTIVE LEARNING — let the model surface the examples it is least confident about so annotators spend effort where it matters most. Where possible, capture labels implicitly from user behaviour (clicks, returns, corrections).',
      hinglish:
        'Labelling usually asli bottleneck hoti hai, modelling nahi. Key practices: ek precise labelling GUIDELINE likho (ambiguity inconsistent labels produce karti hai, jo achievable accuracy cap kar deti hai), ek confusing task definition detect karne ke liye inter-annotator AGREEMENT measure karo, hard cases ke liye adjudication ke saath multiple annotators use karo, aur ACTIVE LEARNING adopt karo — model ko wo examples surface karne do jinke baare mein wo sabse kam confident hai taaki annotators wahan effort lagayein jahan sabse zyada matter karta hai. Jahan possible ho, user behaviour se labels implicitly capture karo (clicks, returns, corrections).',
    },
  },
  {
    question: 'What does a mature MLOps maturity model look like?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Google\'s widely-used framing has three levels. LEVEL 0 (manual): notebooks, hand-run training, manual deployment, no monitoring — every step is a person. LEVEL 1 (ML pipeline automation): the training pipeline is automated and reproducible, with continuous training triggered on new data, though deployment is still manual. LEVEL 2 (full CI/CD automation): pipelines themselves are built, tested, and deployed automatically; model promotion is gated on automated evaluation; monitoring closes the loop back into retraining. Most teams are at level 0 or 1 and overestimate where they are.',
      hinglish:
        'Google ka widely-used framing teen levels rakhta hai. LEVEL 0 (manual): notebooks, haath se chalayi training, manual deployment, koi monitoring nahi — har step ek insaan hai. LEVEL 1 (ML pipeline automation): training pipeline automated aur reproducible hai, naye data pe triggered continuous training ke saath, chahe deployment abhi bhi manual hai. LEVEL 2 (full CI/CD automation): pipelines khud automatically build, test, aur deploy hoti hain; model promotion automated evaluation pe gated hai; monitoring loop ko retraining tak wapas band karta hai. Zyadatar teams level 0 ya 1 pe hain aur overestimate karti hain ki wo kahan hain.',
    },
  },
  {
    question: 'What is model staleness and how is it different from drift?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'STALENESS is about the model\'s AGE — how long since it was last trained, so how out of date its knowledge is. DRIFT is about the WORLD having changed relative to the training data. They are related but distinct: a model can be stale (trained a year ago) yet still accurate if the domain is stable, or freshly trained yet already drifting if the environment shifts fast. Track both: staleness is trivially measurable (a timestamp), drift needs distribution comparison.',
      hinglish:
        'STALENESS model ki UMAR ke baare mein hai — pichhli training se kitna time hua, isliye uska knowledge kitna out of date hai. DRIFT is baare mein hai ki DUNIYA training data ke relative badal gayi. Ye related par distinct hain: ek model stale ho sakta hai (ek saal pehle trained) par abhi bhi accurate agar domain stable hai, ya freshly trained hoke bhi already drift kar raha ho agar environment fast shift kare. Dono track karo: staleness trivially measurable hai (ek timestamp), drift ko distribution comparison chahiye.',
    },
  },
  {
    question: 'How do you handle model dependencies between multiple models in production?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'When one model consumes another\'s output, you create a CASCADE: an upstream change silently alters downstream behaviour. Practices: treat each model output as a versioned CONTRACT with a documented schema and expected distribution; never let a downstream team depend on your output without declaring it (undeclared consumers are a classic ML debt); test the full chain end to end, not just each model in isolation; and when retraining an upstream model, re-validate every downstream consumer before promoting it.',
      hinglish:
        'Jab ek model doosre ka output consume karta hai, tum ek CASCADE banate ho: ek upstream change silently downstream behaviour badal deta hai. Practices: har model output ko ek versioned CONTRACT samjho ek documented schema aur expected distribution ke saath; kabhi ek downstream team ko apne output pe depend na karne do bina declare kiye (undeclared consumers ek classic ML debt hai); poori chain ko end to end test karo, sirf har model ko isolation mein nahi; aur ek upstream model retrain karte waqt, promote karne se pehle har downstream consumer re-validate karo.',
    },
  },
];
