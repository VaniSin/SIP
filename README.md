# SIP
import zipfile
import os

# Define the path to the uploaded ZIP file
zip_path = "/mnt/data/grow-smart.zip"
extract_path = "/mnt/data/grow-smart"

# Extract the ZIP file
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(extract_path)

# List the extracted files and directories
extracted_files = []
for root, dirs, files in os.walk(extract_path):
    for file in files:
        extracted_files.append(os.path.relpath(os.path.join(root, file), extract_path))

extracted_files[:20]  # Show only the first 20 files for preview
