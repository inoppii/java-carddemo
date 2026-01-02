import os

def test_phase2_content():
    with open("design_docs/basic_design.md", "r", encoding="utf-8") as f:
        content = f.read()
    
    expected_keywords = [
        "CardDemo", "COBOL", "CICS", "VSAM", # Legacy
        "Cloud Native", "Google Cloud Platform", "Node.js", "Java", "PostgreSQL", # Future
        "Customer", "Account", "Card", # Data Entities
        "REST API", "Cloud Pub/Sub" # Interfaces
    ]
    
    for kw in expected_keywords:
        assert kw in content, f"Keyword '{kw}' not found in basic_design.md"

if __name__ == "__main__":
    test_phase2_content()
    print("Phase 2 Tests Passed")
