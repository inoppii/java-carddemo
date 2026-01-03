import os

def test_utility_docs_existence():
    assert os.path.exists("design_docs/CSUTLDTC.md"), "Document for CSUTLDTC is missing"

if __name__ == "__main__":
    test_utility_docs_existence()
    print("Phase 4 Tests Passed")
