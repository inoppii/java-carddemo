import os

def test_batch_docs_existence():
    programs = [
        "CBACT01C", "CBACT02C", "CBACT03C", "CBACT04C",
        "CBCUS01C", "CBTRN01C", "CBTRN02C", "CBTRN03C",
        "CBIMPORT", "CBEXPORT", "CBSTM03A", "CBSTM03B"
    ]
    for p in programs:
        path = f"design_docs/{p}.md"
        assert os.path.exists(path), f"Document for {p} is missing"

if __name__ == "__main__":
    test_batch_docs_existence()
    print("Phase 3 Tests Passed")
