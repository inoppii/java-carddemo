import os

def test_inventory_existence():
    assert os.path.exists("design_docs/inventory.md"), "Inventory file missing"

def test_inventory_content():
    with open("design_docs/inventory.md", "r") as f:
        content = f.read()
    
    # Check for some key files
    assert "CBACT01C.cbl" in content
    assert "COSGN00C.cbl" in content
    assert "CSUTLDTC.cbl" in content
    
    # Check for table structure
    assert "| プログラム名 | 種類 |" in content

if __name__ == "__main__":
    test_inventory_existence()
    test_inventory_content()
    print("Phase 1 Tests Passed")
