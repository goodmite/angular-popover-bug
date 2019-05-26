export const pipeline_module = {
  "meta": {
    "limit": 1000,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 27
  },
  "objects": [
    {
      "description": "Extracts named entities from input text. For example input: Microsoft is headquartered at Redmond the output is org: Microsoft. Here Microsoft is recognized as an organization. Similarly the library can recognize common things such as nationalities, location, buildings, people, events, money, quantity etc.",
      "display_values": "Named Entity Recognition",
      "id": 1,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e34",
          "cons": " lower entity coverage, lower accuracy",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "This implementation is based on a fast, free and open-source library called Spacy",
          "display_values": {},
          "id": 1,
          "input_params": {},
          "is_paid": "free",
          "library": "spacy",
          "module": "ner",
          "pros": "no external calls, faster",
          "unique_name": "Spacy NER",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e36",
          "cons": "relatively more expensive, involves an external call, entity coverage is not consistent",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "This is a paid service by dandelion.eu",
          "display_values": {},
          "id": 3,
          "input_params": {},
          "is_paid": "paid",
          "library": "dandelion",
          "module": "ner",
          "pros": "contextual, slightly higher accuracy, improves over time",
          "unique_name": "Dandelion NER",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/1/",
      "unique_name": "ner"
    },
    {
      "description": "",
      "display_values": "Language Detection",
      "id": 2,
      "pipeline_modules": [
        {
          "_id": "5baa10ef39c5a6003deeaa31",
          "cons": "None",
          "contextual": false,
          "created_at": 1537872111000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 36,
          "input_params": {},
          "is_paid": "paid",
          "library": "google",
          "module": "language_detection",
          "pros": "Fast and reliable",
          "unique_name": "Google Language Detection",
          "updated_at": 1537872111000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/2/",
      "unique_name": "language_detection"
    },
    {
      "description": "",
      "display_values": "Machine Learning",
      "id": 3,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e44",
          "cons": "Data flows out of IMIbot.Adds to the bot's cost and latency",
          "contextual": true,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {
            "wit_access_token": {
              "display_value": "Wit Access token",
              "type": "text"
            }
          },
          "id": 17,
          "input_params": {
            "wit_access_token": ""
          },
          "is_paid": "paid",
          "library": "wit",
          "module": "Machine Learning",
          "pros": "Good accuracy in intent recognition.Less code to be written locally",
          "unique_name": "Wit.ai",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e56",
          "cons": "Data flows out of IMIbot.Adds to the bot's cost and latency",
          "contextual": true,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {
            "api_ai_access_token": {
              "display_value": "api.ai access token",
              "type": "text"
            }
          },
          "id": 35,
          "input_params": {
            "api_ai_access_token": ""
          },
          "is_paid": "paid",
          "library": "apiai",
          "module": "Machine Learning",
          "pros": "Good accuracy in intent recognition.Less code to be written locally.Data flows out of IMIbot.Adds to the bot's cost and latency",
          "unique_name": "Dialogflow",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/3/",
      "unique_name": "Machine Learning"
    },
    {
      "description": "This module helps extract units from text input",
      "display_values": "Units Recognition",
      "id": 4,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e55",
          "cons": "slightly lower accuracy",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 34,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "units",
          "pros": "no external calls, cheap",
          "unique_name": "IMIbot Units Recognition",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/4/",
      "unique_name": "units"
    },
    {
      "description": "This module takes an image url as an input and returns the text detected in the image as response. The image_type parameter which captures the type of the image being fed as input can take the following values:natural_imageTo be used if the input image contains objects in addition to text.document.To be used if OCR needs to be performed on structured documents.",
      "display_values": "OCR",
      "id": 5,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e3e",
          "cons": "slightly expensive, sometimes presents with spacing issues in the detected text",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {
            "image_type": {
              "display_value": "Natural Image",
              "type": "text"
            }
          },
          "id": 11,
          "input_params": {
            "image_type": "natural_image"
          },
          "is_paid": "paid",
          "library": "google",
          "module": "ocr",
          "pros": "text recognition accuarcy is pretty good even for images with bad lighting conditions, supports multiple languages, supports automatic language detection from image",
          "unique_name": "Google OCR",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/5/",
      "unique_name": "ocr"
    },
    {
      "description": "Converts a paragraph into an array of sentences.",
      "display_values": "Sentence Tokenization",
      "id": 6,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e46",
          "cons": "lower performance",
          "contextual": false,
          "created_at": 1535705344000,
          "default": true,
          "description": "A suite of libraries and programs for symbolic and statistical NLP for English written in the Python",
          "display_values": {},
          "id": 19,
          "input_params": {},
          "is_paid": "free",
          "library": "nltk",
          "module": "sentence_tokenization",
          "pros": "free, greater flexibility,no external calls, supports multiple languages",
          "unique_name": "NLTK Sentence Tokenization",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e47",
          "cons": "comparatively lesser flexibility, opinionated, only supports English",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 20,
          "input_params": {},
          "is_paid": "free",
          "library": "spacy",
          "module": "sentence_tokenization",
          "pros": "free, no external calls, faster",
          "unique_name": "Spacy Sentence Tokenization",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/6/",
      "unique_name": "sentence_tokenization"
    },
    {
      "description": "Takes an audio url and the language code as inputs and converts the recorded speech in the audio to text.",
      "display_values": "Speech to Text",
      "id": 7,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e51",
          "cons": "Expensive",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 30,
          "input_params": {},
          "is_paid": "paid",
          "library": "google",
          "module": "speechtotext",
          "pros": "Supports all the popular languages, great accuracy",
          "unique_name": "Google Speech to Text",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/7/",
      "unique_name": "speechtotext"
    },
    {
      "description": "This module picks and classifies entities from input text to predefined, custom entity classes.For example, if the bot developer has defined a custom entity called Metal and provided the values gold, sliver and platinum to it and a bot user enters the string Gold prices have declined. Then the bot pipeline module output for this text would recognize Gold as entity type Metal.",
      "display_values": "Custom Named Entity Recognition",
      "id": 8,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e3a",
          "cons": "None",
          "contextual": false,
          "created_at": 1535705344000,
          "default": true,
          "description": "",
          "display_values": {},
          "id": 7,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "custom_ners",
          "pros": " no external calls, faster",
          "unique_name": "IMIbot Custom NER",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/8/",
      "unique_name": "custom_ners"
    },
    {
      "description": "Detects if the input phrase falls under any of a large category set of small talk or commone sense intents like greetings, abuse, etc. The module also suggests an appropriate response.",
      "display_values": "Common Sense",
      "id": 9,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e3b",
          "cons": "",
          "contextual": false,
          "created_at": 1535705344000,
          "default": true,
          "description": "",
          "display_values": {},
          "id": 8,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "commonsense",
          "pros": "",
          "unique_name": "IMIbot Common Sense",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e3f",
          "cons": "",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {
            "model_type": {
              "display_value": "Model type",
              "type": "text"
            }
          },
          "id": 12,
          "input_params": {
            "model_type": "mitie_sklearn"
          },
          "is_paid": "paid",
          "library": "smalltalk",
          "module": "commonsense",
          "pros": "",
          "unique_name": "RASA CommonSense",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/9/",
      "unique_name": "commonsense"
    },
    {
      "description": "Parses a given sentence into an array of individual words (tokens).",
      "display_values": "Word Tokenization",
      "id": 10,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e45",
          "cons": "comparatively lesser flexibility, opinionated, only supports English",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "This implementation is based on a fast, free and open-source library",
          "display_values": {},
          "id": 18,
          "input_params": {},
          "is_paid": "Free",
          "library": "spacy",
          "module": "word_tokenization",
          "pros": " free, no external calls, faster",
          "unique_name": "Spacy Word Tokenization",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e52",
          "cons": "lower performance",
          "contextual": false,
          "created_at": 1535705344000,
          "default": true,
          "description": "",
          "display_values": {},
          "id": 31,
          "input_params": {},
          "is_paid": "free",
          "library": "nltk",
          "module": "word_tokenization",
          "pros": "free, greater flexibility,no external calls, supports multiple languages",
          "unique_name": "NLTK Word Tokenization",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/10/",
      "unique_name": "word_tokenization"
    },
    {
      "description": "Checks for mispelt words in a given sentence and sends the sentence back with those words corrected to the most likely right words.",
      "display_values": "Spell Check",
      "id": 11,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e38",
          "cons": "relatively more expensive, involves an external call, slightly slower",
          "contextual": false,
          "created_at": 1535705344000,
          "default": true,
          "description": "This is a Microsoft service and involves an external API call. It is machine learning based and is contextual.",
          "display_values": {},
          "id": 5,
          "input_params": {},
          "is_paid": "paid",
          "library": "azure",
          "module": "spell_check",
          "pros": "contextual, slightly higher accuracy, improves over time",
          "unique_name": "Microsoft Spell Check",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e42",
          "cons": "not contextual, slightly lower accuracy",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 15,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "spell_check",
          "pros": "cheaper, no external call, slightly faster",
          "unique_name": "IMIbot Spell Check",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/11/",
      "unique_name": "spell_check"
    },
    {
      "description": "This API translates text from the source to the target language.",
      "display_values": "Language Translation",
      "id": 12,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e37",
          "cons": "involves an external call",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {
            "output_language": {
              "display_value": "Output language",
              "type": "text"
            }
          },
          "id": 4,
          "input_params": {
            "output_language": "en"
          },
          "is_paid": "paid",
          "library": "google",
          "module": "language_translate",
          "pros": "low cost, medium accuracy",
          "unique_name": "Google Translate",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/12/",
      "unique_name": "language_translate"
    },
    {
      "description": "Generates a grammatical dependency graph or parse tree of a given sentence using the standard spacy vocabulary nomenclature.",
      "display_values": "Parse Tree Generation",
      "id": 13,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e39",
          "cons": "paid, needs external api calls",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 6,
          "input_params": {},
          "is_paid": "paid",
          "library": "google",
          "module": "parsetree",
          "pros": "more accurate, supports multiple languages",
          "unique_name": "Google Parse Tree",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e41",
          "cons": "comparatively lesser flexibility, opinionated, only supports English",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 14,
          "input_params": {},
          "is_paid": "free",
          "library": "spacy",
          "module": "parsetree",
          "pros": "free, no external calls, faster",
          "unique_name": "Spacy Parse Tree",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/13/",
      "unique_name": "parsetree"
    },
    {
      "description": "This module helps retrieve phrases from input text",
      "display_values": "Profanity Filter",
      "id": 14,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e43",
          "cons": " not contextual, slightly lower accuracy",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 16,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "profanity_filter",
          "pros": "cheaper, no external call, slightly faster",
          "unique_name": "IMIbot Profanity Filter",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/14/",
      "unique_name": "profanity_filter"
    },
    {
      "description": "Parses a given sentence for a mention of a number or a numeric quantity and extracts it in the response.",
      "display_values": "Number Recognition",
      "id": 15,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e3c",
          "cons": " not contextual, slightly lower accuracy",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "Parses a given sentence for a mention of one or more of the following metrics and the corresponding unit of measurement used.Metrics currently supported:Distance,Volume,CurrencyEach metric can be looked for individually by using the name of that metric as the library in the request body. If you use botman as the library, the module scans for all the supported metrics.",
          "display_values": {},
          "id": 9,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "numbers",
          "pros": "cheaper, no external call, slightly faster",
          "unique_name": "IMIbot Numbers Recognition",
          "updated_at": 1535705344000
        },
        {
          "_id": "5cb99278a6d3ec2002ef5e0c",
          "cons": "lower accuracy",
          "contextual": false,
          "created_at": 1555577344000,
          "default": false,
          "description": "Number detection for 6 languages - english,hindi,gujarati,marathi,tamil and bengali",
          "display_values": {
            "max_num_digits": {
              "default": 10,
              "display_value": "Max number of Digits",
              "type": "Number"
            },
            "source_language": {
              "default": "hi",
              "display_value": "Source Language",
              "type": "text"
            }
          },
          "id": 39,
          "input_params": {
            "max_num_digits": 10,
            "source_language": "hi"
          },
          "is_paid": "free",
          "library": "haptik",
          "module": "numbers",
          "pros": "free and no external calls",
          "unique_name": "Multilingual Number Detection",
          "updated_at": 1555577344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/15/",
      "unique_name": "numbers"
    },
    {
      "description": "Analyzes a given sentence or phrase for the sentiment expressed in it as one of three possibilities: negative, neutral and positive.",
      "display_values": "Sentiment Analysis",
      "id": 18,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e4c",
          "cons": "relatively more expensive, involves an external call, slightly slower",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "This is a Google service and involves an external API call.",
          "display_values": {},
          "id": 25,
          "input_params": {},
          "is_paid": "paid",
          "library": "google",
          "module": "sentiment",
          "pros": "contextual, slightly higher accuracy, improves over time",
          "unique_name": "Google Sentiment Analysis",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e4d",
          "cons": " not contextual, slightly lower accuracy",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "This implementation is based on an open-source project which takes a deterministic approach and is non-contextual in nature.",
          "display_values": {},
          "id": 26,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "sentiment",
          "pros": "cheaper, no external call, slightly faster",
          "unique_name": " IMIbot Sentiment Analysis",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/18/",
      "unique_name": "sentiment"
    },
    {
      "description": "Parses a given sentence for a mention of a date or time and extracts them into the most likely standard representations.",
      "display_values": "Time & Date Recognition",
      "id": 19,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e54",
          "cons": "",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "This implementation is based on an open-source project which takes a deterministic approach.",
          "display_values": {
            "extra_info": {
              "display_value": "extra information",
              "type": "text"
            },
            "future": {
              "display_value": "Future",
              "type": "text"
            }
          },
          "id": 33,
          "input_params": {
            "extra_info": false,
            "future": true
          },
          "is_paid": "free",
          "library": "botman",
          "module": "timedate",
          "pros": "free, no external call, very accurate",
          "unique_name": "IMIbot Date Time Recognition",
          "updated_at": 1535705344000
        },
        {
          "_id": "5cb99279a6d3ec2002ef5e0e",
          "cons": "lower accuracy",
          "contextual": false,
          "created_at": 1555577344000,
          "default": false,
          "description": "Datetime detection for 6 languages - english,hindi,gujarati,marathi,tamil and bengali",
          "display_values": {
            "source_language": {
              "default": "hi",
              "display_value": "Source Language",
              "type": "text"
            },
            "timezone": {
              "default": "Asia/Kolkata",
              "display_value": "Timezone",
              "type": "text"
            }
          },
          "id": 41,
          "input_params": {
            "source_language": "hi",
            "timezone": "Asia/Kolkata"
          },
          "is_paid": "free",
          "library": "haptik",
          "module": "timedate",
          "pros": "free and no external calls",
          "unique_name": "Multilingual Datetime Detection",
          "updated_at": 1555577344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/19/",
      "unique_name": "timedate"
    },
    {
      "description": "Parses a given sentence and assigns the most appropriate part-of-speech tag to each of the words in the sentence.",
      "display_values": "POS Tagging",
      "id": 20,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e40",
          "cons": "comparatively lesser flexibility, opinionated, only supports English",
          "contextual": false,
          "created_at": 1535705344000,
          "default": true,
          "description": "This implementation is based on a fast, free and open-source library",
          "display_values": {},
          "id": 13,
          "input_params": {},
          "is_paid": "free",
          "library": "spacy",
          "module": "pos",
          "pros": "free, no external calls, faster",
          "unique_name": "Spacy Parts of Speech",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e53",
          "cons": "paid, needs external api calls",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "A paid service by Google",
          "display_values": {},
          "id": 32,
          "input_params": {},
          "is_paid": "paid",
          "library": "google",
          "module": "pos",
          "pros": "more accurate, supports multiple languages",
          "unique_name": "Google Parts of Speech",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/20/",
      "unique_name": "pos"
    },
    {
      "description": "Determines whether the input phrase is a question or not. See examples for a better understanding",
      "display_values": "Question Detection",
      "id": 21,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e3d",
          "cons": "None",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "Abstraction over the framework given by Spacy",
          "display_values": {},
          "id": 10,
          "input_params": {},
          "is_paid": "free",
          "library": "spacy",
          "module": "quesdetect",
          "pros": "free, no external calls, faster",
          "unique_name": "Spacy Question Detection",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/21/",
      "unique_name": "quesdetect"
    },
    {
      "description": "Gets the lexemes of all words in your text. A lexeme is the base form of a word. For exapmple, the lexeme of running is run",
      "display_values": "Lemmatization",
      "id": 22,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e48",
          "cons": "slightly lower accuracy",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 21,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "lemmatization",
          "pros": "cheaper, no external call, slightly faster",
          "unique_name": "IMIbot Lemmatization",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e49",
          "cons": "slightly lower accuracy",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "This implementation is based on an free, fast and open-source library.",
          "display_values": {},
          "id": 22,
          "input_params": {},
          "is_paid": "Free",
          "library": "spacy",
          "module": "lemmatization",
          "pros": "cheaper,faster, does not involve and external call",
          "unique_name": "Spacy Lemmatization",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e4a",
          "cons": "relatively more expensive, involves an external call, slightly slower",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "This is a paid API.",
          "display_values": {},
          "id": 23,
          "input_params": {},
          "is_paid": "paid",
          "library": "google",
          "module": "lemmatization",
          "pros": "contextual, slightly higher accuracy",
          "unique_name": "Google Lemmatization",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/22/",
      "unique_name": "lemmatization"
    },
    {
      "description": "This module helps retrieve phrases from input text",
      "display_values": "Chunking",
      "id": 23,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e4b",
          "cons": "none",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 24,
          "input_params": {},
          "is_paid": "free",
          "library": "spacy",
          "module": "chunking",
          "pros": "free, no external calls, faster",
          "unique_name": "Spacy Chunking",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/23/",
      "unique_name": "chunking"
    },
    {
      "description": "Converts the given text into speech file. The module takes different additional arguments depneding on the library used.",
      "display_values": "Text to Speech",
      "id": 24,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e4e",
          "cons": "Higher latency relative to Polly from Amazon",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "Azure accepts lang , gender and voice_ms as additional parameters. Detailed documentation can be found at https://docs.microsoft.com/en-in/azure/cognitive-services/speech/api-reference-rest/bingvoiceoutput",
          "display_values": {
            "filetype": {
              "content": [
                "mp3"
              ],
              "default": "mp3",
              "display_value": "Output format",
              "type": "dropdown"
            },
            "gender": {
              "content": [
                "Female",
                "Male",
                "Male",
                "Female",
                "Male",
                "Female",
                "Male",
                "Male",
                "Female",
                "Female",
                "Male",
                "Male",
                "Female",
                "Female",
                "Female",
                "Female",
                "Female",
                "Female",
                "Male",
                "Male",
                "Female",
                "Female",
                "Male",
                "Female",
                "Female",
                "Male",
                "Female",
                "Female",
                "Male",
                "Female",
                "Male",
                "Female",
                "Female",
                "Female",
                "Male",
                "Female",
                "Female",
                "Male",
                "Male",
                "Female",
                "Female",
                "Male",
                "Male",
                "Male",
                "Male",
                "Male",
                "Female",
                "Female",
                "Male",
                "Female",
                "Female",
                "Male",
                "Female",
                "Female",
                "Female",
                "Female",
                "Male",
                "Female",
                "Male",
                "Female",
                "Male",
                "Female",
                "Male",
                "Male",
                "Female",
                "Male",
                "Male",
                "Female",
                "Male",
                "Female",
                "Female",
                "Male",
                "Female",
                "Female",
                "Male",
                "Female",
                "Female",
                "Male"
              ],
              "default": "Male",
              "display_value": "Gender",
              "type": "dropdown"
            },
            "lang": {
              "content": [
                "ar-EG*",
                "ar-SA",
                "bg-BG",
                "ca-ES",
                "cs-CZ",
                "da-DK",
                "de-AT",
                "de-CH",
                "de-DE",
                "de-DE",
                "de-DE",
                "el-GR",
                "en-AU",
                "en-AU",
                "en-CA",
                "en-CA",
                "en-GB",
                "en-GB",
                "en-GB",
                "en-IE",
                "en-IN",
                "en-IN",
                "en-IN",
                "en-US",
                "en-US",
                "en-US",
                "es-ES",
                "es-ES",
                "es-ES",
                "es-MX",
                "es-MX",
                "fi-FI",
                "fr-CA",
                "fr-CA",
                "fr-CH",
                "fr-FR",
                "fr-FR",
                "fr-FR",
                "he-IL",
                "hi-IN",
                "hi-IN",
                "hi-IN",
                "hr-HR",
                "hu-HU",
                "id-ID",
                "it-IT",
                "it-IT",
                "ja-JP",
                "ja-JP",
                "ja-JP",
                "ko-KR",
                "ms-MY",
                "nb-NO",
                "nl-NL",
                "pl-PL",
                "pt-BR",
                "pt-BR",
                "pt-PT",
                "ro-RO",
                "ru-RU",
                "ru-RU",
                "ru-RU",
                "sk-SK",
                "sl-SI",
                "sv-SE",
                "ta-IN",
                "th-TH",
                "tr-TR",
                "vi-VN",
                "zh-CN",
                "zh-CN",
                "zh-CN",
                "zh-HK",
                "zh-HK",
                "zh-HK",
                "zh-TW",
                "zh-TW",
                "zh-TW"
              ],
              "default": "en-GB",
              "display_value": "Language",
              "type": "dropdown"
            },
            "voice_ms": {
              "content": [
                "ar-EG, Hoda",
                "ar-SA, Naayf",
                "bg-BG, Ivan",
                "ca-ES, HerenaRUS",
                "cs-CZ, Jakub",
                "da-DK, HelleRUS",
                "de-AT, Michael",
                "de-CH, Karsten",
                "de-DE, Hedda",
                "de-DE, HeddaRUS",
                "de-DE, Stefan, Apollo",
                "el-GR, Stefanos",
                "en-AU, Catherine",
                "en-AU, HayleyRUS",
                "en-CA, Linda",
                "en-CA, HeatherRUS",
                "en-GB, Susan, Apollo",
                "en-GB, HazelRUS",
                "en-GB, George, Apollo",
                "en-IE, Sean",
                "en-IN, Heera, Apollo",
                "en-IN, PriyaRUS",
                "en-IN, Ravi, Apollo",
                "en-US, ZiraRUS",
                "en-US, JessaRUS",
                "en-US, BenjaminRUS",
                "es-ES, Laura, Apollo",
                "es-ES, HelenaRUS",
                "es-ES, Pablo, Apollo",
                "es-MX, HildaRUS",
                "es-MX, Raul, Apollo",
                "fi-FI, HeidiRUS",
                "fr-CA, Caroline",
                "fr-CA, HarmonieRUS",
                "fr-CH, Guillaume",
                "fr-FR, Julie, Apollo",
                "fr-FR, HortenseRUS",
                "fr-FR, Paul, Apollo",
                "he-IL, Asaf",
                "hi-IN, Kalpana, Apollo",
                "hi-IN, Kalpana",
                "hi-IN, Hemant",
                "hr-HR, Matej",
                "hu-HU, Szabolcs",
                "id-ID, Andika",
                "it-IT, Cosimo, Apollo",
                "it-IT, LuciaRUS",
                "ja-JP, Ayumi, Apollo",
                "ja-JP, Ichiro, Apollo",
                "ja-JP, HarukaRUS",
                "ko-KR, HeamiRUS",
                "ms-MY, Rizwan",
                "nb-NO, HuldaRUS",
                "nl-NL, HannaRUS",
                "pl-PL, PaulinaRUS",
                "pt-BR, HeloisaRUS",
                "pt-BR, Daniel, Apollo",
                "pt-PT, HeliaRUS",
                "ro-RO, Andrei",
                "ru-RU, Irina, Apollo",
                "ru-RU, Pavel, Apollo",
                "ru-RU, EkaterinaRUS",
                "sk-SK, Filip",
                "sl-SI, Lado",
                "sv-SE, HedvigRUS",
                "ta-IN, Valluvar",
                "th-TH, Pattara",
                "tr-TR, SedaRUS",
                "vi-VN, An",
                "zh-CN, HuihuiRUS",
                "zh-CN, Yaoyao, Apollo",
                "zh-CN, Kangkang, Apollo",
                "zh-HK, Tracy, Apollo",
                "zh-HK, TracyRUS",
                "zh-HK, Danny, Apollo",
                "zh-TW, Yating, Apollo",
                "zh-TW, HanHanRUS",
                "zh-TW, Zhiwei, Apollo"
              ],
              "default": "en-GB, George, Apollo",
              "display_value": "Voice",
              "type": "dropdown"
            }
          },
          "id": 27,
          "input_params": {
            "filetype": "",
            "gender": "",
            "lang": "",
            "voice_ms": ""
          },
          "is_paid": "paid",
          "library": "azure",
          "module": "texttospeech",
          "pros": "few Indic languages like Hindi, Tamil etc are also supported, supports multiple accents, supports SSML",
          "unique_name": "Microsoft Text to Speech",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e4f",
          "cons": "Limited language support",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "Amazon accepts voice parameter with the body and takes values from Id parameter located at http://docs.aws.amazon.com/polly/latest/dg/API_Voice.html",
          "display_values": {
            "filetype": {
              "content": [
                "mp3"
              ],
              "default": "mp3",
              "display_value": "Output format",
              "type": "dropdown"
            },
            "voice": {
              "content": [
                "Nicole",
                "Vitória",
                "Chantal",
                "Naja",
                "Lotte",
                "Léa",
                "Céline",
                "Vicki",
                "Marlene",
                "Aditi",
                "Dóra",
                "Raveena",
                "Aditi",
                "Carla",
                "Mizuki",
                "Seoyeon",
                "Zhiyu",
                "Liv",
                "Ewa",
                "Maja",
                "Inês",
                "Carmen",
                "Tatyana",
                "Conchita",
                "Astrid",
                "Filiz",
                "Amy",
                "Emma",
                "Joanna",
                "Salli",
                "Kendra",
                "Kimberly",
                "Ivy",
                "Penélope",
                "Gwyneth"
              ],
              "default": "Joey",
              "display_value": "Voice",
              "type": "dropdown"
            }
          },
          "id": 28,
          "input_params": {
            "filetype": "",
            "voice": ""
          },
          "is_paid": "paid",
          "library": "amazon",
          "module": "texttospeech",
          "pros": "Slightly faster",
          "unique_name": "Amazon Text to Speech",
          "updated_at": 1535705344000
        },
        {
          "_id": "5b8901000e0ff44f7e071e50",
          "cons": "",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {
            "filetype": {
              "content": [
                "mp3"
              ],
              "default": "mp3",
              "display_value": "Output format",
              "type": "dropdown"
            },
            "speech_language": {
              "content": [
                "af-ZA",
                "am-ET",
                "hy-AM",
                "az-AZ",
                "id-ID",
                "ms-MY",
                "bn-BD",
                "bn-IN",
                "ca-ES",
                "cs-CZ",
                "da-DK",
                "de-DE",
                "en-AU",
                "en-CA",
                "en-GH",
                "en-GB",
                "en-IN",
                "en-IE",
                "en-KE",
                "en-NZ",
                "en-NG",
                "en-PH",
                "en-ZA",
                "en-TZ",
                "en-US",
                "es-AR",
                "es-BO",
                "es-CL",
                "es-CO",
                "es-CR",
                "es-EC",
                "es-SV",
                "es-ES",
                "es-US",
                "es-GT",
                "es-HN",
                "es-MX",
                "es-NI",
                "es-PA",
                "es-PY",
                "es-PE",
                "es-PR",
                "es-DO",
                "es-UY",
                "es-VE",
                "eu-ES",
                "fil-PH",
                "fr-CA",
                "fr-FR",
                "gl-ES",
                "ka-GE",
                "gu-IN",
                "hr-HR",
                "zu-ZA",
                "is-IS",
                "it-IT",
                "jv-ID",
                "kn-IN",
                "km-KH",
                "lo-LA",
                "lv-LV",
                "lt-LT",
                "hu-HU",
                "ml-IN",
                "mr-IN",
                "nl-NL",
                "ne-NP",
                "nb-NO",
                "pl-PL",
                "pt-BR",
                "pt-PT",
                "ro-RO",
                "si-LK",
                "sk-SK",
                "sl-SI",
                "su-ID",
                "sw-TZ",
                "sw-KE",
                "fi-FI",
                "sv-SE",
                "ta-IN",
                "ta-SG",
                "ta-LK",
                "ta-MY",
                "te-IN",
                "vi-VN",
                "tr-TR",
                "ur-PK",
                "ur-IN",
                "el-GR",
                "bg-BG",
                "ru-RU",
                "sr-RS",
                "uk-UA",
                "he-IL",
                "ar-IL",
                "ar-JO",
                "ar-AE",
                "ar-BH",
                "ar-DZ",
                "ar-SA",
                "ar-IQ",
                "ar-KW",
                "ar-MA",
                "ar-TN",
                "ar-OM",
                "ar-PS",
                "ar-QA",
                "ar-LB",
                "ar-EG",
                "fa-IR",
                "hi-IN",
                "th-TH",
                "ko-KR",
                "cmn-Hant-TW",
                "yue-Hant-HK",
                "ja-JP",
                "cmn-Hans-HK",
                "cmn-Hans-CN"
              ],
              "default": "en-uk",
              "display_value": "Language",
              "type": "dropdown"
            }
          },
          "id": 29,
          "input_params": {
            "filetype": "",
            "speech_language": ""
          },
          "is_paid": "paid",
          "library": "google",
          "module": "texttospeech",
          "pros": "",
          "unique_name": "Google Text to Speech",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/24/",
      "unique_name": "texttospeech"
    },
    {
      "description": "Is used to expand contracted text ",
      "display_values": "Contractions",
      "id": 27,
      "pipeline_modules": [
        {
          "_id": "5cb092cc23865186fe631870",
          "cons": "None",
          "contextual": false,
          "created_at": 1554720111000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 37,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "expand",
          "pros": "Fast and reliable",
          "unique_name": "Pycontractions",
          "updated_at": 1554720111000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/27/",
      "unique_name": "expand"
    },
    {
      "description": "Detects phone numbers for 6 languages - english,hindi,gujarati,marathi,tamil and bengali",
      "display_values": "Phone Number Detection",
      "id": 28,
      "pipeline_modules": [
        {
          "_id": "5cb99277a6d3ec2002ef5e0b",
          "cons": "lower accuracy",
          "contextual": false,
          "created_at": 1555577344000,
          "default": false,
          "description": "Phone number detection for 6 languages - english,hindi,gujarati,marathi,tamil and bengali",
          "display_values": {
            "source_language": {
              "default": "hi",
              "display_value": "Source Language",
              "type": "text"
            }
          },
          "id": 38,
          "input_params": {
            "source_language": "hi"
          },
          "is_paid": "free",
          "library": "haptik",
          "module": "inerphnumdetection",
          "pros": "free and no external calls",
          "unique_name": "Multilingual Phone Number Detection",
          "updated_at": 1555577344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/28/",
      "unique_name": "inerphnumdetection"
    },
    {
      "description": "Detects numeric range/interval for 2 languages - english,hindi",
      "display_values": "Numeric Range Detection",
      "id": 29,
      "pipeline_modules": [
        {
          "_id": "5cb99278a6d3ec2002ef5e0d",
          "cons": "lower accuracy",
          "contextual": false,
          "created_at": 1555577344000,
          "default": false,
          "description": "Numeric Range/Interval detection for 2 languages - english,hindi",
          "display_values": {
            "source_language": {
              "default": "hi",
              "display_value": "Source Language",
              "type": "text"
            }
          },
          "id": 40,
          "input_params": {
            "source_language": "hi"
          },
          "is_paid": "free",
          "library": "haptik",
          "module": "inernumrangedetection",
          "pros": "free and no external calls",
          "unique_name": "Multilingual Number Range Detection",
          "updated_at": 1555577344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/29/",
      "unique_name": "inernumrangedetection"
    },
    {
      "description": "Detects emotions in a given text",
      "display_values": "Emotion Classifier",
      "id": 30,
      "pipeline_modules": [
        {
          "_id": "5cb99279a6d3ec2002ef5e0f",
          "cons": "lower accuracy",
          "contextual": false,
          "created_at": 1555577344000,
          "default": false,
          "description": "Detects top 5 emotions in a given text",
          "display_values": {},
          "id": 42,
          "input_params": {},
          "is_paid": "free",
          "library": "botman",
          "module": "emotionclassifier",
          "pros": "free and no external calls",
          "unique_name": "IMIbot Emotion Classifier",
          "updated_at": 1555577344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/30/",
      "unique_name": "emotionclassifier"
    },
    {
      "description": "Extracts the keywords representing the main theme of a given sentence",
      "display_values": "Main Theme",
      "id": 31,
      "pipeline_modules": [
        {
          "_id": "5b8901000e0ff44f7e071e35",
          "cons": "",
          "contextual": false,
          "created_at": 1535705344000,
          "default": false,
          "description": "",
          "display_values": {},
          "id": 2,
          "input_params": {},
          "is_paid": "paid",
          "library": "spacy",
          "module": "maintheme",
          "pros": "",
          "unique_name": "Main Theme",
          "updated_at": 1535705344000
        }
      ],
      "resource_uri": "/api/v1/moduledetails/31/",
      "unique_name": "maintheme"
    }
  ]
}