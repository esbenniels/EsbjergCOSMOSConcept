import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Fetch the service account key JSON file contents
cred = credentials.Certificate('esbjergcosmos-firebase-adminsdk-1g4w7-80aab7d0eb.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://esbjergcosmos-default-rtdb.firebaseio.com"
})

ref1 = db.reference("Results/122-27296")
ref2 = db.reference("Results/123-78643")

data = {
    "WPQR-1": {
        "NDT": {
            "Visual": {
                "Result": False,
                "Comments": "Nothing to Report"
            },
            "Ultrasonic": {
                "Result": True,
                "Comments": "Nothing to Report"
            },
            "Magnetic": {
                "Result": True,
                "Comments": "Nothing to Report"
            }
        }, 
        "DT": {
            "Tensile": {
                "UTSMin": 470,
                "Result": {
                    "-7-1D": 518,
                    "-7-1M": 493,
                    "-7-1R": 516,
                    "-7-2D": 520,
                    "-7-2M": 500,
                    "-7-2R": 524
                },
                "Comments": "All tensile strengths above UTS Min value"
            },
            "Bend": {
                "Specified": 180,
                "Diameter": 40,
                "Result": {
                    "227296-8-1": True,
                    "227296-8-2": False,
                    "227296-8-3": False,
                    "227296-8-4": True,
                    "227296-8-5": False,
                    "227296-8-6": True
                },
                "Comments": "Nothing to Report"
            },
            "Impact": {
                "Dimensions": "10x10x55 mm",
                "SpecifiedType": "KV2",
                "Temperature": -50,
                "Result": {
                    "VWT 0-2": 61,
                    "VHT 0-2 Old Weld": 50,
                    "VHT 2-2 Old Weld": 73,
                    "VHT 0-2 BM": 268,
                    "VHT 2-2 BM": 243, 
                    "VWT 0-50": 81,
                    "VHT 2-50 Old Weld": 52,
                    "VHT 2-50 BM": 164
                },
                "Comments": "Large energy variations dependent on notch placement"
            },
            "Macro": {
                "Result": True,
                "Standard": "EN ISO 5817:2014",
                "Comments": "Nothing to Report"
            },
            "Hardness": {
                "Type": "HV10",
                "Max": 350,
                "Result": {
                    "I": {
                        "BaseAvg": 214,
                        "HAZAvg": 238,
                        "WeldAvg": 252
                    },
                    "II": {
                        "BaseAvg": 216,
                        "HAZAvg": 240,
                        "WeldAvg": 249
                    }, 
                    "III": {
                        "BaseAvg": 215,
                        "HAZAvg": 246,
                        "WeldAvg": 247
                    }
                },
                "Comments": "Hardness generally higher in weld metal, lowest in base material"
            }
        }
    },
    "WPQR-2": {
        "NDT": {
            "Visual": {
                "Result": True,
                "Comments": ""
            },
            "Ultrasonic": {
                "Result": True,
                "Comments": ""
            },
            "Magnetic": {
                "Result": True,
                "Comments": ""
            }
        }, 
        "DT": {
            "Tensile": {
                "UTSMin": 470,
                "Result": {
                    "-7-1D": 518,
                    "-7-1M": 493,
                    "-7-1R": 516,
                    "-7-2D": 520,
                    "-7-2M": 500,
                    "-7-2R": 524
                },
                "Comments": ""
            },
            "Bend": {
                "Specified": 180,
                "Diameter": 40,
                "Result": {
                    "227296-8-1": True,
                    "227296-8-2": False,
                    "227296-8-3": False,
                    "227296-8-4": True
                },
                "Comments": ""
            },
            "Impact": {
                "Dimensions": "10x10x55 mm",
                "SpecifiedType": "KV2",
                "Temperature": -50,
                "Result": {
                    "VWT 0-2": 61,
                    "VHT 0-2 Old Weld": 50,
                    "VHT 2-2 Old Weld": 73,
                    "VHT 0-2 BM": 268,
                    "VHT 2-2 BM": 243, 
                    "VWT 0-50": 81,
                    "VHT 2-50 Old Weld": 52,
                    "VHT 2-50 BM": 164
                },
                "Comments": ""
            },
            "Macro": {
                "Result": True,
                "Standard": "EN ISO 5817:2014",
                "Comments": ""
            },
            "Hardness": {
                "Type": "HV10",
                "Max": 350,
                "Result": {
                    "I": {
                        "BaseAvg": 214,
                        "HAZAvg": 238,
                        "WeldAvg": 252
                    },
                    "II": {
                        "BaseAvg": 216,
                        "HAZAvg": 240,
                        "WeldAvg": 249
                    }, 
                    "III": {
                        "BaseAvg": 215,
                        "HAZAvg": 246,
                        "WeldAvg": 247
                    }
                },
                "Comments": ""
            }
        }
    }
}


ref1.set(data)
ref2.set(data)