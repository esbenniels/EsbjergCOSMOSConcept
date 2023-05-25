import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Fetch the service account key JSON file contents
cred = credentials.Certificate('esbjergcosmos-firebase-adminsdk-1g4w7-80aab7d0eb.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://esbjergcosmos-default-rtdb.firebaseio.com"
})

ref1 = db.reference("Tasks/123-55_()34")
ref2 = db.reference("Tasks/285-928_()572")
ref3 = db.reference("Tasks/9845-908_()0002")
ref4 = db.reference("Tasks/09-8829_()674")

data = {
    "ClientInfo": {
        "ContactEmail": "something@gmail.com",
        "ContactPhone": "12345678"
    }, 
    "PreparedBy": "ESNI",
    "NDT": "Udført",
    "AntalEmner": 2,
    "Dimension": "Ø219x3",
    "ReferenceNummer": "WPQR 3355.53",
    "Trækprøvning": {
        "Valid": True,
        "Antal": 2,
        "Prøve nmr": "26609-5-1, -6-1",
        "Overvulst slibes-bearbejdes": True,
        "Rodvulst slibes-bearbejdes": True,
        "Slibes let": True,
        "Lt": "200",
        "Lc": "SV+60",
        "f": "60",
        "b": "25",
        "b1": "37",
        "a": "gt",
        "R": "25",
        "Status": {
            "Cut": False,
            "Machined": False,
            "Ready for Testing": False
        }
    },
    "Bøjeprøvning": {
        "Valid": True,
        "Antal": 4,
        "Prøve nmr": "326609-5-1/2, -6-1/2",
        "Overvulst fjernes": True,
        "Rodvulst fjernes": True,
        "Slibes let": True,
        "a": "gt",
        "b": "14",
        "c": "Som mulig",
        "Status": {
            "Cut": False,
            "Machined": False,
            "Ready for Testing": False
        }
    },
    "Slagsejhedsprøvning": {
        "Valid": True,
        "Antal": 0,
        "Prøve nmr": "None",
        "Kærvtype": "None",
        "Prøvestandard": "None",
        "a": "None",
        "b": "None",
        "c": "None",
        "Prøver": {},
        "Status": {
            "Cut": False,
            "Machined": False,
            "Ready for Testing": False
        }
    }, 
    "Makroætsning": {
        "Valid": True,
        "Antal": 1,
        "Prøve nmr": "326609-5-1",
        "Slibes planparallel til hårdhedsmåling": True,
        "Spektralanalyse": False,
        "Korrosionsprøve": False,
        "Status": {
            "Cut": False,
            "Machined": False,
            "Ready for Testing": False
        }
    },
    "ImagePath": "None"
}

ref1.set(data)
ref2.set(data)
ref3.set(data)
ref4.set(data)