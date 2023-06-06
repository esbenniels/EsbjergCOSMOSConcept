import os
import zipfile
import re
import xml.dom.minidom

print(os.listdir('wordDocuments'))

document = zipfile.ZipFile('wordDocuments/test.docx')
xmldoc = ZipFile.read()