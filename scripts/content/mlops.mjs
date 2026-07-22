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
    frequency: 'very-common',
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
];
