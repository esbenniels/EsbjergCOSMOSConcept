import zipfile
import xml.etree.ElementTree as ET

doc = zipfile.ZipFile('Værkstedsordre.docx').read('word/document.xml')
root = ET.fromstring(doc)

string = str(ET.tostring(root))

with open("xml.txt", "w") as filehandle: 
    filehandle.write(string)

# ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
# body = root.find('w:body', ns)  # find the XML "body" tag
# p_sections = body.findall('w:p', ns)  # under the body tag, find all the paragraph sections