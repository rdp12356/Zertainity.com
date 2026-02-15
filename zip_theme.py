import zipfile
import os

def zip_theme(source_dir, output_filename):
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                # Calculate the archive name: path relative to source_dir
                archive_name = os.path.relpath(file_path, source_dir)
                print(f"Adding {archive_name}")
                zipf.write(file_path, archive_name)

if __name__ == "__main__":
    # Assuming code run from C:\Users\johan\Documents\Zertainity.com
    source = "shopify-theme"
    output = "Zertainity-Theme-v2.zip"
    
    if not os.path.exists(source):
        print(f"Error: {source} directory not found.")
    else:
        print(f"Zipping {source} to {output}...")
        zip_theme(source, output)
        print("Done.")
