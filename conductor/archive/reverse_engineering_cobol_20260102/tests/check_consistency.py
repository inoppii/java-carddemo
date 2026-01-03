import os
import re

def check_consistency():
    docs_dir = "design_docs"
    files = [f for f in os.listdir(docs_dir) if f.endswith(".md")]
    
    issues = []
    
    # Exclude list
    exclude_files = ["inventory.md", "common_copybooks.md"]

    for f in files:
        if f in exclude_files:
            continue

        path = os.path.join(docs_dir, f)
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()
            
            # Check for "移行への考慮事項" section
            if "## 6. 移行への考慮事項" not in content and "## 5. 移行への考慮事項" not in content and "## 4. 移行への考慮事項" not in content:
                 issues.append(f"{f}: Missing '移行への考慮事項' section")

    if issues:
        print("Issues found:")
        for i in issues:
            print(f"- {i}")
        exit(1)
    else:
        print("Consistency check passed.")

if __name__ == "__main__":
    check_consistency()