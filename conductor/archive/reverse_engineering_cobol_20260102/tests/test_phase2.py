import os

def test_online_docs_existence():
    programs = [
        "COSGN00C", "COMEN01C", "COADM01C",
        "COACTVWC", "COACTUPC", "COUSR00C",
        "COUSR01C", "COUSR02C", "COUSR03C",
        "COCRDLIC", "COCRDSLC", "COCRDUPC",
        "COTRN00C", "COTRN01C", "COTRN02C",
        "CORPT00C", "COBIL00C", "COBSWAIT"
    ]
    for p in programs:
        path = f"design_docs/{p}.md"
        assert os.path.exists(path), f"Document for {p} is missing"

def test_common_report_existence():
    assert os.path.exists("design_docs/common_copybooks.md"), "Common copybooks report is missing"

if __name__ == "__main__":
    test_online_docs_existence()
    test_common_report_existence()
    print("Phase 2 Tests Passed")
